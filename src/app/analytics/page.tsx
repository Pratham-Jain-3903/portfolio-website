"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

interface DashboardData {
  success: boolean;
  message: string;
  timestamp: string;
  data: {
    overview: {
      totalSessions: number;
      totalPageViews: number;
      totalInteractions: number;
      totalResumeDownloads: number;
      averageTimeOnSite: number;
      bounceRate: number;
    };
    recentSessions: any[];
    topSections: any[];
    deviceBreakdown: {
      mobile: number;
      tablet: number;
      desktop: number;
    };
    themePreference: {
      light: number;
      dark: number;
    };
    message: string;
  };
}

export default function AnalyticsDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/analytics/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center h-[50vh]">
            <p className="text-muted-foreground">Loading analytics dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Error</CardTitle>
              <CardDescription>Failed to load dashboard data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{error}</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-20 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track visitor engagement and site performance metrics
          </p>
          {dashboardData?.timestamp && (
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date(dashboardData.timestamp).toLocaleString()}
            </p>
          )}
        </div>

        {dashboardData?.data.message && (
          <Card className="border-blue-500 bg-blue-50 dark:bg-blue-950">
            <CardContent className="pt-6">
              <p className="text-sm">{dashboardData.data.message}</p>
            </CardContent>
          </Card>
        )}

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dashboardData?.data.overview.totalSessions || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Unique visitor sessions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dashboardData?.data.overview.totalPageViews || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Total page views</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Interactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dashboardData?.data.overview.totalInteractions || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">User interactions tracked</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Resume Downloads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dashboardData?.data.overview.totalResumeDownloads || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Total resume downloads</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Avg. Time on Site</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dashboardData?.data.overview.averageTimeOnSite || 0}s</div>
              <p className="text-xs text-muted-foreground mt-1">Average session duration</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dashboardData?.data.overview.bounceRate || 0}%</div>
              <p className="text-xs text-muted-foreground mt-1">Visitors who left quickly</p>
            </CardContent>
          </Card>
        </div>

        {/* Device Breakdown */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Device Breakdown</CardTitle>
              <CardDescription>Visitor device types</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Mobile</span>
                <span className="text-2xl font-bold">{dashboardData?.data.deviceBreakdown.mobile || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Tablet</span>
                <span className="text-2xl font-bold">{dashboardData?.data.deviceBreakdown.tablet || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Desktop</span>
                <span className="text-2xl font-bold">{dashboardData?.data.deviceBreakdown.desktop || 0}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theme Preference</CardTitle>
              <CardDescription>User theme selections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Light Mode</span>
                <span className="text-2xl font-bold">{dashboardData?.data.themePreference.light || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Dark Mode</span>
                <span className="text-2xl font-bold">{dashboardData?.data.themePreference.dark || 0}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
