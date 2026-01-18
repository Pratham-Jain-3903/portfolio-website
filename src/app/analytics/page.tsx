"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  Users,
  Eye,
  Clock,
  TrendingUp,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Moon,
  Sun,
  Activity,
  ArrowLeft,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardStats {
  totalSessions: number;
  returningVisitors: number;
  bounceRate: number;
  deepEngagementRate: number;
  avgPageLoadTime: number;
  sectionPopularity: { section: string; avgTimeMs: number; visits: number }[];
  topInteractions: { element: string; count: number }[];
  feedbackSummary: { positive: number; negative: number; comments: string[] };
  themePreferences: { light: number; dark: number };
  totalPageViews: number;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16'];

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ElementType;
  trend?: 'up' | 'down' | 'neutral';
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <Badge variant={trend === 'up' ? 'default' : trend === 'down' ? 'destructive' : 'secondary'} className="mt-2">
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Skeleton className="h-12 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/analytics/dashboard');
      if (!res.ok) throw new Error('Failed to fetch analytics');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const themeData = stats
    ? [
        { name: 'Dark', value: stats.themePreferences.dark, color: '#1e293b' },
        { name: 'Light', value: stats.themePreferences.light, color: '#f8fafc' },
      ]
    : [];

  const sectionData = stats?.sectionPopularity.map((s) => ({
    name: s.section.charAt(0).toUpperCase() + s.section.slice(1).replace(/-/g, ' '),
    time: Math.round(s.avgTimeMs / 1000),
    visits: s.visits,
  })) || [];

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Error Loading Analytics</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={fetchStats} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
              <Button variant="ghost" className="mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Track visitor engagement and site performance metrics
            </p>
          </div>
          <Button onClick={fetchStats} variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Sessions"
            value={stats.totalSessions}
            description="Unique visitor sessions"
            icon={Users}
            trend="neutral"
          />
          <StatCard
            title="Page Views"
            value={stats.totalPageViews}
            description="Total page views"
            icon={Eye}
            trend="up"
          />
          <StatCard
            title="Returning Visitors"
            value={`${stats.returningVisitors}%`}
            description="Users who came back"
            icon={TrendingUp}
            trend="up"
          />
          <StatCard
            title="Avg Load Time"
            value={`${stats.avgPageLoadTime}ms`}
            description="Page load performance"
            icon={Clock}
            trend={stats.avgPageLoadTime < 1000 ? 'up' : 'down'}
          />
        </div>

        {/* Engagement Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.bounceRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Visitors who left quickly
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Deep Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.deepEngagementRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Highly engaged visitors
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Feedback Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4 text-green-500" />
                  <span className="text-lg font-bold">{stats.feedbackSummary.positive}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsDown className="h-4 w-4 text-red-500" />
                  <span className="text-lg font-bold">{stats.feedbackSummary.negative}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                User sentiment
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Section Popularity */}
          <Card>
            <CardHeader>
              <CardTitle>Section Popularity</CardTitle>
              <CardDescription>Average time spent per section</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="time" fill="#3b82f6" name="Avg Time (s)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Theme Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Theme Preferences</CardTitle>
              <CardDescription>User theme selections</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={themeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {themeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color === '#f8fafc' ? '#cbd5e1' : undefined} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Interactions */}
        <Card>
          <CardHeader>
            <CardTitle>Top Interactions</CardTitle>
            <CardDescription>Most clicked elements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.topInteractions.slice(0, 5).map((interaction, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{interaction.element}</span>
                  </div>
                  <Badge variant="secondary">{interaction.count} clicks</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Comments */}
        {stats.feedbackSummary.comments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
              <CardDescription>User comments and suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.feedbackSummary.comments.slice(0, 5).map((comment, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                    <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm">{comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
