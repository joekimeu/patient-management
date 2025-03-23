# Generating SQL schema and sample data for Guardian Angel Health Agency

# Define the schema in SQL
sql_schema = """
-- Patients Table
CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(10),
    phone VARCHAR(15),
    address TEXT,
    insurance_id INTEGER,
    primary_provider_id INTEGER,
    care_plan_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (insurance_id) REFERENCES insurance(insurance_id),
    FOREIGN KEY (primary_provider_id) REFERENCES employees(employee_id),
    FOREIGN KEY (care_plan_id) REFERENCES care_plans(care_plan_id)
);

-- Employees Table
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    npi_number VARCHAR(20),
    phone VARCHAR(15),
    email VARCHAR(150),
    hire_date DATE,
    status VARCHAR(20) DEFAULT 'active'
);

-- Scheduling Table
CREATE TABLE scheduling (
    schedule_id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL,
    employee_id INTEGER NOT NULL,
    service_code_id INTEGER NOT NULL,
    visit_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'scheduled',
    visit_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (service_code_id) REFERENCES service_codes(service_code_id)
);

-- Care Plans Table
CREATE TABLE care_plans (
    care_plan_id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    authorized_hours_per_week INTEGER NOT NULL,
    service_code_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (service_code_id) REFERENCES service_codes(service_code_id)
);

-- Service Codes Table
CREATE TABLE service_codes (
    service_code_id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    description VARCHAR(255) NOT NULL,
    rate DECIMAL(10, 2) NOT NULL,
    payer_id INTEGER NOT NULL,
    FOREIGN KEY (payer_id) REFERENCES insurance(insurance_id)
);

-- Insurance Table
CREATE TABLE insurance (
    insurance_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    coverage_type VARCHAR(50) NOT NULL,
    policy_number VARCHAR(50)
);

-- Billing Table
CREATE TABLE billing (
    billing_id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL,
    service_code_id INTEGER NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    claim_reference VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (service_code_id) REFERENCES service_codes(service_code_id)
);

-- Exceptions Table
CREATE TABLE exceptions (
    exception_id SERIAL PRIMARY KEY,
    visit_id INTEGER NOT NULL,
    exception_type VARCHAR(50) NOT NULL,
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (visit_id) REFERENCES scheduling(schedule_id)
);
"""

# Sample data to insert into the schema
sample_data = """
-- Insert Sample Insurance Data
INSERT INTO insurance (name, coverage_type, policy_number) 
VALUES ('Aetna', 'Medicaid', 'POL12345'), 
       ('Molina', 'Medicaid', 'POL67890'),
       ('CareSource', 'Medicaid', 'POL54321');

-- Insert Sample Employee Data
INSERT INTO employees (first_name, last_name, role, npi_number, phone, email, hire_date, status) 
VALUES ('John', 'Doe', 'Nurse', '1234567890', '555-1234', 'john@example.com', '2022-01-10', 'active'),
       ('Jane', 'Smith', 'Therapist', '0987654321', '555-5678', 'jane@example.com', '2023-03-15', 'active');

-- Insert Sample Patient Data
INSERT INTO patients (first_name, last_name, dob, gender, phone, address, insurance_id, primary_provider_id) 
VALUES ('Alice', 'Johnson', '1980-04-23', 'Female', '555-1111', '123 Main St', 1, 1),
       ('Bob', 'Williams', '1975-08-15', 'Male', '555-2222', '456 Oak St', 2, 2);

-- Insert Sample Service Codes
INSERT INTO service_codes (code, description, rate, payer_id) 
VALUES ('T1019', 'Personal Care Services', 45.00, 1),
       ('G0156', 'Home Health Aide Services', 50.00, 2);

-- Insert Sample Care Plans
INSERT INTO care_plans (patient_id, start_date, end_date, authorized_hours_per_week, service_code_id) 
VALUES (1, '2024-01-01', '2024-06-30', 10, 1),
       (2, '2024-02-15', '2024-08-15', 15, 2);

-- Insert Sample Scheduling Data
INSERT INTO scheduling (patient_id, employee_id, service_code_id, visit_date, start_time, end_time, status) 
VALUES (1, 1, 1, '2024-03-01', '09:00', '11:00', 'completed'),
       (2, 2, 2, '2024-03-02', '10:00', '12:00', 'scheduled');

-- Insert Sample Billing Data
INSERT INTO billing (patient_id, service_code_id, amount, status) 
VALUES (1, 1, 450.00, 'pending'),
       (2, 2, 500.00, 'paid');

-- Insert Sample Exceptions
INSERT INTO exceptions (visit_id, exception_type, resolved) 
VALUES (1, 'Unauthorized Service', FALSE);
"""

# Save schema and sample data to file
with open("/mnt/data/guardian_angel_schema.sql", "w") as f:
    f.write(sql_schema + "\n" + sample_data)

"/mnt/data/guardian_angel_schema.sql"
