-- Optional ShopSense product-analytics extension.
-- Run after restoring ecommerce.sql:
-- psql -U postgres -d ecommerce -f shopsense_analytics.sql

CREATE TABLE IF NOT EXISTS analytics_events (
  event_id BIGSERIAL PRIMARY KEY,
  user_id INTEGER NULL,
  session_id VARCHAR(255) NOT NULL,
  event_name VARCHAR(100) NOT NULL,
  page_url TEXT NULL,
  product_id INTEGER NULL,
  category_id INTEGER NULL,
  experiment_key VARCHAR(100) NULL,
  experiment_variant VARCHAR(50) NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_product ON analytics_events(product_id);

CREATE TABLE IF NOT EXISTS product_experiments (
  experiment_id SERIAL PRIMARY KEY,
  experiment_key VARCHAR(100) UNIQUE NOT NULL,
  hypothesis TEXT NOT NULL,
  primary_metric VARCHAR(100) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'draft',
  started_at TIMESTAMPTZ NULL,
  ended_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO product_experiments (experiment_key,hypothesis,primary_metric,status)
VALUES ('product_cta_copy_v1','A more direct purchase CTA increases checkout progression without increasing abandonment.','checkout_started','demo')
ON CONFLICT (experiment_key) DO NOTHING;
