CREATE TABLE IF NOT EXISTS profiles (
  id text PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL,
  summary text NOT NULL,
  about text NOT NULL,
  career_direction text NOT NULL,
  specialties jsonb NOT NULL DEFAULT '[]'::jsonb,
  languages jsonb NOT NULL DEFAULT '[]'::jsonb,
  location text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  phone_url text NOT NULL,
  resume_url text NOT NULL,
  site_url text NOT NULL,
  metrics jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS navigation_items (
  navigation_group text NOT NULL,
  label text NOT NULL,
  href text NOT NULL,
  sort_order integer NOT NULL,
  PRIMARY KEY (navigation_group, label)
);

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS social_links (
  platform text PRIMARY KEY,
  label text NOT NULL,
  url text NOT NULL,
  sort_order integer NOT NULL
);

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS section_content (
  section_key text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL
);

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS skill_categories (
  id text PRIMARY KEY,
  title text NOT NULL,
  skills jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL
);

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS projects (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  short_description text NOT NULL,
  full_description text NOT NULL,
  business_problem text NOT NULL,
  requirements jsonb NOT NULL DEFAULT '[]'::jsonb,
  solution text NOT NULL,
  role text NOT NULL,
  tech_stack jsonb NOT NULL DEFAULT '[]'::jsonb,
  implementation jsonb NOT NULL DEFAULT '[]'::jsonb,
  technical_decisions jsonb NOT NULL DEFAULT '[]'::jsonb,
  challenges jsonb NOT NULL DEFAULT '[]'::jsonb,
  results jsonb NOT NULL DEFAULT '[]'::jsonb,
  lessons_learned jsonb NOT NULL DEFAULT '[]'::jsonb,
  architecture_image text NOT NULL,
  cover_image text NOT NULL,
  screenshots jsonb NOT NULL DEFAULT '[]'::jsonb,
  github_url text NOT NULL,
  demo_url text NOT NULL,
  case_study_url text NOT NULL,
  featured boolean NOT NULL DEFAULT false,
  status text NOT NULL CHECK (status IN ('placeholder', 'in-progress', 'completed')),
  start_date text NOT NULL,
  end_date text NOT NULL,
  sort_order integer NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- statement-breakpoint
CREATE INDEX IF NOT EXISTS projects_featured_sort_idx
  ON projects (featured, sort_order);

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS workflows (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  tool text NOT NULL,
  image text NOT NULL,
  input text NOT NULL,
  process text NOT NULL,
  output text NOT NULL,
  related_project_slug text NOT NULL,
  sort_order integer NOT NULL
);

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS experiences (
  id text PRIMARY KEY,
  company text NOT NULL,
  position text NOT NULL,
  start_date text NOT NULL,
  end_date text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  responsibilities jsonb NOT NULL DEFAULT '[]'::jsonb,
  technologies jsonb NOT NULL DEFAULT '[]'::jsonb,
  achievements jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL
);

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS education (
  id text PRIMARY KEY,
  institution text NOT NULL,
  degree text NOT NULL,
  field text NOT NULL,
  start_date text NOT NULL,
  end_date text NOT NULL,
  description text NOT NULL,
  sort_order integer NOT NULL
);

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS certifications (
  id text PRIMARY KEY,
  name text NOT NULL,
  issuer text NOT NULL,
  issued_at text NOT NULL,
  credential_url text NOT NULL,
  sort_order integer NOT NULL
);
