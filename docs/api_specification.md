# REST API Specification

## Authentication

POST    /api/auth/login

POST    /api/auth/logout

POST    /api/auth/refresh-token

POST    /api/auth/forgot-password

POST    /api/auth/reset-password

POST    /api/auth/change-password

GET     /api/auth/profile

---

## Users

GET     /api/users

GET     /api/users/:id

POST    /api/users

PUT     /api/users/:id

DELETE  /api/users/:id

---

## Students

GET     /api/students

GET     /api/students/:id

POST    /api/students

PUT     /api/students/:id

DELETE  /api/students/:id

---

## Employees

GET

POST

PUT

DELETE

---

## Attendance

GET

POST

PUT

DELETE

---

## Exams

GET

POST

PUT

DELETE

---

## Marks

GET

POST

PUT

DELETE

---

## Fees

GET

POST

PUT

DELETE

---

## Notifications

GET

POST

PUT

DELETE

---

# Standard Response Format

Success

{
    "success": true,
    "message": "",
    "data": {}
}

Error

{
    "success": false,
    "message": "",
    "errors": []
}