-- Financial Health Score - MySQL Database Schema
-- Created for IDBI Innovate 2026

-- Create Database
CREATE DATABASE IF NOT EXISTS financial_health_score;
USE financial_health_score;

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  business_type VARCHAR(100),
  industry VARCHAR(100),
  address TEXT,
  gst_number VARCHAR(15),
  pan_number VARCHAR(20),
  aadhaar_number VARCHAR(20),
  business_profile_complete BOOLEAN DEFAULT FALSE,
  data_authorization_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_gst_number (gst_number)
);

-- ============================================
-- GST DATA TABLE
-- ============================================
CREATE TABLE gst_data (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  gst_number VARCHAR(15) NOT NULL,
  registration_status VARCHAR(50),
  business_turnover DECIMAL(15,2),
  filing_status VARCHAR(50),
  compliance_score INT,
  last_fetched TIMESTAMP,
  data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_gst (user_id, gst_number),
  INDEX idx_user_id (user_id)
);

-- ============================================
-- UPI/AA DATA TABLE
-- ============================================
CREATE TABLE upi_data (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  consent_id VARCHAR(255),
  consent_status VARCHAR(50),
  total_inflow DECIMAL(15,2),
  total_outflow DECIMAL(15,2),
  avg_transaction DECIMAL(10,2),
  transaction_frequency INT,
  monthly_average DECIMAL(15,2),
  consistency_score INT,
  last_fetched TIMESTAMP,
  data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_upi (user_id),
  INDEX idx_user_id (user_id)
);

-- ============================================
-- EPFO DATA TABLE
-- ============================================
CREATE TABLE epfo_data (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  employee_count INT,
  payroll_consistency INT,
  avg_monthly_payroll DECIMAL(15,2),
  growth_trend VARCHAR(50),
  last_fetched TIMESTAMP,
  data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_epfo (user_id),
  INDEX idx_user_id (user_id)
);

-- ============================================
-- FINANCIAL HEALTH SCORE TABLE
-- ============================================
CREATE TABLE financial_health_scores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  total_score INT,
  revenue_score INT,
  stability_score INT,
  compliance_score INT,
  growth_score INT,
  risk_level VARCHAR(50),
  confidence_level DECIMAL(5,2),
  score_breakdown JSON,
  recommendations JSON,
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_generated_at (generated_at)
);

-- ============================================
-- LOAN ELIGIBILITY TABLE
-- ============================================
CREATE TABLE loan_eligibility (
  id INT PRIMARY KEY AUTO_INCREMENT,
  score_id INT NOT NULL,
  user_id INT NOT NULL,
  personal_loan_eligible BOOLEAN,
  personal_loan_amount DECIMAL(15,2),
  personal_loan_rate DECIMAL(5,2),
  business_loan_eligible BOOLEAN,
  business_loan_amount DECIMAL(15,2),
  business_loan_rate DECIMAL(5,2),
  working_capital_eligible BOOLEAN,
  working_capital_amount DECIMAL(15,2),
  working_capital_rate DECIMAL(5,2),
  home_loan_eligible BOOLEAN,
  home_loan_amount DECIMAL(15,2),
  home_loan_rate DECIMAL(5,2),
  auto_loan_eligible BOOLEAN,
  auto_loan_amount DECIMAL(15,2),
  auto_loan_rate DECIMAL(5,2),
  msme_scheme_eligible BOOLEAN,
  msme_scheme_amount DECIMAL(15,2),
  msme_scheme_rate DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (score_id) REFERENCES financial_health_scores(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);

-- ============================================
-- LOAN APPLICATIONS TABLE
-- ============================================
CREATE TABLE loan_applications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  loan_type VARCHAR(100) NOT NULL,
  loan_amount DECIMAL(15,2) NOT NULL,
  tenure_months INT,
  status VARCHAR(50) DEFAULT 'PENDING',
  application_data JSON,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP NULL,
  reviewed_by VARCHAR(255),
  review_comments TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status)
);

-- ============================================
-- SCORE HISTORY TABLE
-- ============================================
CREATE TABLE score_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  score_id INT NOT NULL,
  total_score INT,
  risk_level VARCHAR(50),
  snapshot_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (score_id) REFERENCES financial_health_scores(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at)
);

-- ============================================
-- DATA REFRESH LOG
-- ============================================
CREATE TABLE data_refresh_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  data_source VARCHAR(50),
  status VARCHAR(50),
  error_message TEXT,
  refreshed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_refreshed_at (refreshed_at)
);

-- ============================================
-- ADMIN TABLE (OPTIONAL)
-- ============================================
CREATE TABLE admin_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'ADMIN',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_score_created ON financial_health_scores(created_at DESC);
CREATE INDEX idx_score_user_created ON financial_health_scores(user_id, created_at DESC);
CREATE INDEX idx_loan_created ON loan_applications(created_at DESC);
CREATE INDEX idx_history_user ON score_history(user_id, created_at DESC);

-- ============================================
-- VIEWS (OPTIONAL)
-- ============================================
CREATE VIEW user_latest_score AS
SELECT
  u.id,
  u.email,
  u.business_name,
  fhs.total_score,
  fhs.risk_level,
  fhs.generated_at,
  fhs.id as score_id
FROM users u
LEFT JOIN financial_health_scores fhs ON u.id = fhs.user_id
WHERE fhs.id = (
  SELECT id FROM financial_health_scores
  WHERE user_id = u.id
  ORDER BY generated_at DESC
  LIMIT 1
);

-- ============================================
-- Verify Tables Created
-- ============================================
-- SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'financial_health_score';
