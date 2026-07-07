# School ERP System
## Software Requirements Specification (SRS)

---

# 1. Introduction

## 1.1 Purpose

The School ERP System is a web-based enterprise application designed to manage the day-to-day administrative, academic, financial, and communication activities of schools and colleges.

The system provides a centralized platform for managing students, employees, attendance, examinations, finance, and institutional operations while maintaining secure role-based access.

---

## 1.2 Objectives

- Digitize school administration
- Reduce paperwork
- Centralize institutional data
- Improve communication
- Automate attendance and examination workflows
- Generate reports and analytics
- Secure data using role-based authentication

---

# 2. Stakeholders

- School Administration
- Principal
- Teachers
- Students
- Parents
- Accountant
- HR Department
- Librarian (Future)
- IT Administrator

---

# 3. User Roles

## Admin
Permissions:
- Full System Access
- Manage Users
- Manage Students
- Manage Employees
- Manage Departments
- Configure System
- View Reports

---

## Principal

Permissions:
- View Reports
- Monitor Attendance
- View Student Performance
- Approve Leave Requests

---

## Teacher

Permissions:
- Mark Attendance
- Upload Marks
- View Assigned Students
- View Timetable

---

## Student

Permissions:
- View Attendance
- View Marks
- View Fee Status
- View Notices
- Update Limited Profile

---

## Parent

Permissions:
- View Child Attendance
- View Child Marks
- View Fee Details
- Receive Notifications

---

## Accountant

Permissions:
- Fee Collection
- Salary Management
- Expense Tracking
- Financial Reports

---

## HR

Permissions:
- Employee Management
- Leave Management
- Payroll
- Recruitment Records

---

# 4. Functional Modules

## Phase 1

- Authentication
- Authorization (RBAC)
- User Management

---

## Phase 2

Student Management

Features

- Admission
- Student Profiles
- Class Allocation
- Parent Details
- Document Upload

---

## Phase 3

Employee Management

Features

- Teachers
- Staff
- Departments
- Salary Details
- Leave Management

---

## Phase 4

Attendance

Student Attendance

Employee Attendance

Attendance Reports

---

## Phase 5

Examination

Subjects

Exams

Marks

Grades

Report Cards

---

## Phase 6

Accounts

Fee Collection

Expenses

Payroll

Receipts

Financial Reports

---

## Future Modules

Library

Transport

Hostel

Inventory

Learning Management System

AI Analytics

Bus Tracking

Face Recognition Attendance

---

# 5. Non Functional Requirements

Performance

- Response time < 2 seconds

Security

- JWT Authentication
- Password Hashing
- HTTPS
- Role-Based Access

Scalability

- Support 10,000+ users

Reliability

- Daily Database Backup

Availability

- 99.9% uptime

---

# 6. Technology Stack

Frontend

- React
- Tailwind CSS
- Redux Toolkit

Backend

- Node.js
- Express

Database

- PostgreSQL

ORM

- Prisma

Authentication

- JWT
- bcrypt

Storage

- Cloudinary / AWS S3

Deployment

- Docker
- Nginx
- Render
- Vercel

---

# 7. Assumptions

- Institution provides official email IDs
- Admin creates all users
- Students cannot self-register
- Parents are linked to students

---

# 8. Constraints

- Internet required
- Browser-based system
- Mobile responsive 