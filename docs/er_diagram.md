# Entity Relationship Diagram (ERD)

## Purpose

This document defines the relationships between all entities in the School ERP System.

---

# Core Entities

- Users
- Roles
- Students
- Parents
- Employees
- Departments
- Classes
- Sections
- Subjects
- Attendance
- Attendance Records
- Exams
- Marks
- Fee Structures
- Fee Payments
- Payroll
- Expenses
- Notifications
- Audit Logs

---

# Relationships

User (1) -------- (1) Student

User (1) -------- (1) Employee

Department (1) ---- (*) Employees

Class (1) -------- (*) Students

Section (1) ------ (*) Students

Teacher (1) ------ (*) Subjects

Subject (*) ------ (*) Students

Student (1) ------ (*) Attendance

Student (1) ------ (*) Marks

Exam (1) --------- (*) Marks

Student (1) ------ (*) Fee Payments

Employee (1) ----- (*) Payroll

User (1) -------- (*) Notifications

User (1) -------- (*) Audit Logs

---

# Cardinality

One-to-One

- User → Student
- User → Employee

One-to-Many

- Department → Employees
- Class → Students
- Student → Attendance
- Student → Marks

Many-to-Many

- Students ↔ Subjects
- Teachers ↔ Subjects

---

# Notes

- Every Student must have exactly one User account.
- Every Employee must have exactly one User account.
- Authentication is centralized in the Users table.
- Business-specific data is stored in separate profile tables.