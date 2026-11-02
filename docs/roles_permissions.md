# Roles & Permissions Matrix

| Module | Admin | Principal | Teacher | Student | Parent | Accountant | HR |
|----------|---------|------------|------------|------------|------------|---------------|------|
| Users | CRUD | Read | No | No | No | No | Read |
| Students | CRUD | Read | Read | Read Self | Read Child | No | No |
| Employees | CRUD | Read | Read | No | No | Read | CRUD |
| Attendance | CRUD | Read | Create/Update | Read | Read Child | No | Read |
| Marks | CRUD | Read | Create/Update | Read | Read Child | No | No |
| Fees | CRUD | Read | No | Read | Read Child | CRUD | No |
| Payroll | CRUD | Read | No | No | No | CRUD | CRUD |
| Reports | CRUD | Read | Limited | Limited | Limited | Finance | HR |
| Settings | CRUD | No | No | No | No | No | No |

---

CRUD

Create

Read

Update

Delete