import pg from 'pg'

const { Pool } = pg

let pool: pg.Pool | null = null

export const getPgPool = (): pg.Pool | null => {
	const connectionString = process.env.DATABASE_URL
	if (!connectionString) return null
	if (!pool) {
		pool = new Pool({ connectionString })
	}
	return pool
}

export const POSTGRES_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS customers (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(32) NOT NULL CHECK (role IN ('Client', 'Operator', 'Agent', 'Admin')),
  initials VARCHAR(8) NOT NULL,
  customer_id VARCHAR(64) REFERENCES customers(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS requests (
  id VARCHAR(64) PRIMARY KEY,
  number VARCHAR(32) UNIQUE NOT NULL,
  title TEXT,
  description TEXT,
  customer_id VARCHAR(64) REFERENCES customers(id) ON DELETE SET NULL,
  category_id VARCHAR(64) REFERENCES categories(id) ON DELETE SET NULL,
  assignee_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'new',
  priority VARCHAR(32) NOT NULL DEFAULT 'normal',
  created_at VARCHAR(128) NOT NULL,
  due_date VARCHAR(128) NOT NULL,
  resolution_text TEXT,
  waiting_reason TEXT,
  close_reason TEXT
);

CREATE TABLE IF NOT EXISTS comments (
  id VARCHAR(64) PRIMARY KEY,
  request_id VARCHAR(64) NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
  author VARCHAR(255) NOT NULL,
  time VARCHAR(32) NOT NULL,
  text TEXT NOT NULL
);
`
