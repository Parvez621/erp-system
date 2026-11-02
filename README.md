# EduCore School ERP — frontend review build

A responsive React + Vite frontend prototype based on `School_ERP_Frontend_Handoff_Guide.docx`. The visual direction is intentionally unchanged: minimal white surfaces, quiet blue accents, rounded cards, restrained charts, and a collapsible mobile sidebar.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Demo mode

The default `.env.example` setting is `VITE_DEMO_MODE=true`. Copy `.env.example` to `.env` if you want to configure it explicitly. In demo mode:

- Sign-in is a local preview and accepts the prefilled credentials; it does not authenticate anyone.
- The role dropdown lets you inspect planned role navigation for platform admin, school admin, teacher, and student/shared student-parent account.
- Student rows, dashboard figures, staff, classes, timetable, exams, fees, notices, and reports are sample data.
- Add/edit-like module actions and student CSV import change local React state only. They do not persist after refresh or upload personal data.
- The student-parent portal is one shared account experience, not a separate parent role, matching the handoff guide.

## Included frontend workflows

- Login screen with password visibility, loading/error states, role preview, and a mobile layout.
- Shared responsive application shell, mobile navigation, school context, account menu/logout affordance, global search and page headings.
- Dashboard overview, illustrative attendance trend, announcements, events and quick actions.
- Student directory, search, class/status filters, manual admission-number entry (string, preserving leading zeroes), student form, duplicate check against current local records, status/deactivation confirmation, CSV template download, local CSV preview and row validation feedback.
- Staff/teacher, platform schools, users/roles, classes/sections, subjects, attendance, timetable, exams/results, fees, homework, notices/communication, reports, profile and settings workspaces.
- Student/parent and teacher portal-style dashboard with timetable, attendance, exam, homework, fee and notice navigation.
- Account security form; in non-demo mode it calls the documented change-password path.
- Responsive desktop/tablet/mobile layouts, horizontally scrollable wide tables, form labels, focus styles, and empty/search states.

## Authentication API wiring

A shared Axios client is in `src/api/client.js`; auth operations are in `src/api/auth.js`. Set the environment variables in `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_DEMO_MODE=false
```

The auth client uses `withCredentials: true`, keeps an access token in memory only, never reads the HttpOnly refresh cookie, attempts a refresh after a 401, and exposes login, current-user, logout and change-password functions.

**Important: confirm the backend contract before turning demo mode off.** The handoff guide says the auth paths are known but specifically instructs the frontend developer to verify the actual mount prefix, login payload, token response field, `/auth/me` response, change-password payload, CORS, cookie flags and error shape in the existing Express code. The client currently supports common access-token response field names, but it cannot guarantee compatibility with an unseen backend.

Known auth paths from the guide:

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `PATCH /api/v1/auth/change-password`

## Why non-auth modules are not making API calls yet

The handoff guide explicitly labels student, staff, classes, attendance, timetable, exams, fees, notices/homework, reports and schools endpoint patterns as **proposed, not confirmed live**. No backend repository or actual route/schema definitions were included with the handoff document. To avoid inventing endpoints or silently assuming fields/permissions, these screens are complete reviewable UI prototypes using visibly labelled sample data. They must be connected after checking the Express routers and Zod schemas. Backend authorization and tenant isolation remain authoritative; frontend role filtering is only a UX aid.

## Known gaps before production

1. Inspect the actual backend repository and confirm all endpoint methods, paths, payloads, response shapes, pagination, status enums and permissions.
2. Connect student CRUD and CSV upload; return row-level validation results and do not silently skip invalid records.
3. Connect school/staff/users/academic structure/attendance/timetable/exams/fees/homework/notices/reports APIs.
4. Replace every illustrative number/sample record with API data and add loading, error, unauthorized, empty and retry states to each module.
5. Implement server-backed student profiles, edit/deactivate flow, pagination and CSV invalid-row download once supported by the backend.
6. Verify token refresh and logout behavior, change-password payload, CORS, cookie security, role claims and multi-tenant isolation.
7. Run desktop/mobile and keyboard-accessibility testing with real backend roles and realistic data.

This build is intended for your visual and workflow review before backend integration; it is not a production-ready ERP by itself.
