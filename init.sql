CREATE TABLE IF NOT EXISTS analytics_sessions (
  session_id TEXT PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  referrer TEXT,
  user_agent TEXT,
  screen_resolution TEXT,
  is_returning_visitor BOOLEAN NOT NULL DEFAULT FALSE,
  entry_section TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_performance (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES analytics_sessions(session_id) ON DELETE CASCADE,
  page_load_time INTEGER NOT NULL DEFAULT 0,
  largest_contentful_paint DOUBLE PRECISION NOT NULL DEFAULT 0,
  first_input_delay DOUBLE PRECISION NOT NULL DEFAULT 0,
  cumulative_layout_shift DOUBLE PRECISION NOT NULL DEFAULT 0,
  ttfb INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_section_views (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES analytics_sessions(session_id) ON DELETE CASCADE,
  section_name TEXT NOT NULL,
  time_viewed_ms INTEGER NOT NULL DEFAULT 0,
  scroll_depth DOUBLE PRECISION NOT NULL DEFAULT 0,
  entered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_engagement (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES analytics_sessions(session_id) ON DELETE CASCADE,
  bounced_early BOOLEAN NOT NULL DEFAULT FALSE,
  deep_engagement BOOLEAN NOT NULL DEFAULT FALSE,
  downloaded_resume BOOLEAN NOT NULL DEFAULT FALSE,
  clicked_contact BOOLEAN NOT NULL DEFAULT FALSE,
  sections_viewed TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  average_time_per_section INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_interactions (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  type TEXT NOT NULL,
  element TEXT NOT NULL,
  section_context TEXT,
  event_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_theme_preferences (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES analytics_sessions(session_id) ON DELETE CASCADE,
  preferred_theme TEXT NOT NULL,
  system_theme TEXT,
  event_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_resume_downloads (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT,
  source TEXT,
  event_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_agent TEXT,
  referer TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_resume_download_forms (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT,
  name TEXT,
  company TEXT,
  email TEXT,
  source TEXT,
  event_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_agent TEXT,
  referer TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_feedback (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT,
  sentiment TEXT NOT NULL,
  triggered_by TEXT,
  message TEXT,
  section_context TEXT,
  time_to_feedback INTEGER NOT NULL DEFAULT 0,
  event_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_performance_session_id
  ON analytics_performance(session_id);

CREATE INDEX IF NOT EXISTS idx_analytics_section_views_session_id
  ON analytics_section_views(session_id);

CREATE INDEX IF NOT EXISTS idx_analytics_section_views_section_name
  ON analytics_section_views(section_name);

CREATE INDEX IF NOT EXISTS idx_analytics_engagement_session_id
  ON analytics_engagement(session_id);

CREATE INDEX IF NOT EXISTS idx_analytics_interactions_session_id
  ON analytics_interactions(session_id);

CREATE INDEX IF NOT EXISTS idx_analytics_interactions_type
  ON analytics_interactions(type);

CREATE INDEX IF NOT EXISTS idx_analytics_interactions_element
  ON analytics_interactions(element);

CREATE INDEX IF NOT EXISTS idx_analytics_theme_preferences_session_id
  ON analytics_theme_preferences(session_id);

CREATE INDEX IF NOT EXISTS idx_analytics_feedback_session_id
  ON analytics_feedback(session_id);

CREATE INDEX IF NOT EXISTS idx_analytics_feedback_sentiment
  ON analytics_feedback(sentiment);