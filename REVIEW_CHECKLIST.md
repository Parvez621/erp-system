# EduCore review checklist

Use this checklist while checking the frontend locally. The current build intentionally labels sample records and non-auth module changes as preview-only.

## 1. Start-up and login
- [1 ] `npm install` completes without dependency errors.
- [1] `npm run dev` opens the app without a Vite overlay or browser console errors.
- [1 ] Email and password are required; show/hide password works.
- [1 ] Try each preview role: Platform administrator, School administrator, Teacher, Student / parent.
- [1 ] Confirm each role gets the expected sidebar. Student and parent are one shared account experience.
- [1 ] Sign out from the bottom of the sidebar and confirm you return to login.

## 2. Responsive layout
Test with browser dev tools at approximately 320px, 375px, 430px, 768px, 1024px and desktop width.
- [1] Login page fits vertically and controls remain reachable on a phone.
- [1] Mobile menu opens and closes; tapping the scrim closes it.
- [1] No page-level horizontal overflow; wide data tables may scroll within their table container.
- [1] Add/edit dialogs fit within the viewport and can scroll on a short phone screen.
- [1 ] Buttons and inputs are large enough to tap; text remains readable.

## 3. Student records
- [1 ] Search by student name, admission number and class.
- [1 ] Filter by class and status; clear filters and test the empty state.
- [1 ] Add a student with a manually entered admission number such as `00017`; confirm leading zeroes are preserved.
- [ 1] Try a duplicate admission number; confirm a useful validation error appears.
- [1 ] Edit a student and save changes; confirm the row updates.
- [ 1] Deactivate and reactivate a student; confirm a confirmation prompt appears.
- [1 ] Download the sample CSV template.
- [ ] Import a valid CSV, a CSV with a missing admission number/name, a duplicate row, a duplicate of an existing student, a non-CSV file and a file over the size limit.
- [ ] Confirm import reports invalid rows instead of silently treating partial import as full success.

## 4. Module navigation and preview actions
- [ ] Dashboard quick actions open Attendance, Students and Communication.
- [ ] Schools, users, teachers, classes, subjects, timetable, exams, fees, homework, communication, reports, profile and settings open their own workspace.
- [ ] Search and filter records in the generic workspaces; open a row detail, create a preview record and export CSV.
- [ ] Attendance statuses change, summary counts update, and save feedback appears.
- [ ] Academics class cards and the timetable route are reachable.
- [ ] Settings password form validates minimum length and matching confirmation. In demo mode it must clearly say no real password changed.
- [ ] Student/parent and teacher dashboards expose the expected portal shortcuts.

## 5. Important limitations to verify, not assume
- [ ] Data is demo data; reload the page and confirm local edits are not presented as persistent server records.
- [ ] Demo login is not security. Never use it for real student information.
- [ ] Before setting `VITE_DEMO_MODE=false`, compare `src/api/auth.js` and `src/api/client.js` with the actual Express routes and Zod schemas.
- [ ] Confirm API prefix, login body/response, access-token field, `/auth/me` shape, refresh cookie/CORS settings, logout behavior and change-password payload.
- [ ] Student/staff/school/attendance/timetable/exam/fees/homework/notice/report endpoints are not connected because the handoff guide marks these routes as proposed and no backend repository was supplied.
- [ ] Backend must enforce role permissions and tenant isolation; frontend navigation filtering is not a security boundary.

## 6. Definition of done for this review build
- [ ] No runtime errors or broken navigation.
- [ ] Desktop and phone layouts are acceptable.
- [ ] Labels, empty states, validation and preview-only notices are clear.
- [ ] Any visual/workflow changes are noted before API integration begins.
