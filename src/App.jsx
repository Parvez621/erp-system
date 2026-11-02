import React, { useEffect, useMemo, useState } from 'react';
import { changePassword, getCurrentUser, isDemoMode, signIn, signOut } from './api/auth';
import {
  BookOpen, LayoutDashboard, Users, GraduationCap, CalendarCheck, BookMarked,
  ClipboardList, Wallet, MessageSquare, ChartNoAxesCombined, Settings, Search,
  Bell, ChevronDown, CalendarDays, Plus, ArrowUpRight, MoreHorizontal, Filter,
  Menu, X, LogOut, LockKeyhole, Mail, Eye, EyeOff, Check, Clock3, FileText,
  UserRound, School, Sparkles, ChevronLeft, ChevronRight, Upload, Download, FileSpreadsheet, AlertCircle, Building2, ClipboardCheck, Megaphone, ShieldCheck, Save, Pencil
} from 'lucide-react';

const navItems = [
  ['Dashboard', LayoutDashboard], ['Schools', Building2], ['Users', ShieldCheck], ['Students', Users], ['Teachers', GraduationCap],
  ['Classes', BookOpen], ['Subjects', BookMarked], ['Attendance', CalendarCheck], ['Academics', BookMarked],
  ['Timetable', CalendarDays], ['Exams', ClipboardList], ['Fees', Wallet], ['Homework', ClipboardCheck], ['Communication', MessageSquare],
  ['Profile', UserRound], ['Reports', ChartNoAxesCombined], ['Settings', Settings], ['Help centre', Sparkles]
];
const initialStudents = [
  { name: 'Aarav Sharma', admissionNo: '2026-0101', roll: '101', className: '10', section: 'A', status: 'Active', color: 'coral' },
  { name: 'Aanya Verma', admissionNo: '2026-0102', roll: '102', className: '10', section: 'A', status: 'Active', color: 'lilac' },
  { name: 'Arjun Patel', admissionNo: '2026-0103', roll: '103', className: '10', section: 'A', status: 'Active', color: 'blue' },
  { name: 'Diya Singh', admissionNo: '2026-0104', roll: '104', className: '10', section: 'B', status: 'Active', color: 'orange' },
  { name: 'Kabir Khan', admissionNo: '2026-0105', roll: '105', className: '10', section: 'B', status: 'Active', color: 'mint' },
  { name: 'Meera Joshi', admissionNo: '2026-0106', roll: '106', className: '10', section: 'B', status: 'Active', color: 'rose' },
  { name: 'Rohan Das', admissionNo: '2026-0107', roll: '107', className: '10', section: 'C', status: 'Active', color: 'teal' },
  { name: 'Saanvi Gupta', admissionNo: '2026-0108', roll: '108', className: '10', section: 'C', status: 'Active', color: 'gold' }
];
const events = [
  { icon: CalendarDays, title: 'Science Exhibition', detail: '25 Oct 2026', tone: 'mint' },
  { icon: Users, title: 'Parent–Teacher Meeting', detail: '12 Nov 2026', tone: 'blue' },
  { icon: BookOpen, title: 'Annual Day', detail: '20 Dec 2026', tone: 'lilac' }
];
const announcements = [
  { icon: ClipboardList, title: 'Annual Day Rehearsal', detail: 'Tomorrow, 9:00 AM', tone: 'lilac' },
  { icon: FileText, title: 'Fee submission deadline', detail: '31 Oct 2026', tone: 'mint' },
  { icon: Users, title: 'Parent–Teacher Meeting', detail: '12 Nov 2026', tone: 'blue' },
  { icon: Bell, title: 'School will remain closed', detail: 'On 2 Nov 2026', tone: 'rose' }
];

function Logo() { return <div className="brand"><span className="brand-mark"><BookOpen size={19} /></span><span>EduCore</span></div>; }
function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@educore.school');
  const [previewRole, setPreviewRole] = useState('SCHOOL_ADMIN');
  const [password, setPassword] = useState('educore123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e) { e.preventDefault(); if (!email.trim() || !password.trim()) { setError('Enter your email and password to continue.'); return; } setError(''); setBusy(true); try { await onLogin(previewRole, email, password); } catch (err) { setError(err?.response?.data?.message || err?.response?.data?.error || err.message || 'Unable to sign in. Check the API configuration and try again.'); } finally { setBusy(false); } }
  return <main className="login-page">
    <section className="login-art">
      <div className="art-top"><Logo /><span className="art-label">SCHOOL MANAGEMENT, SIMPLIFIED</span></div>
      <div className="art-copy"><div className="eyebrow"><Sparkles size={14} /> A calmer way to run your school</div><h1>More time for<br /><em>what matters.</em></h1><p>One thoughtful workspace for your students, teachers, attendance and everyday school operations.</p>
        <div className="art-preview"><div className="preview-head"><span className="preview-dot" /><span className="preview-dot" /><span className="preview-dot" /><span className="preview-title">Your school at a glance</span></div><div className="preview-stats"><div><span>Students</span><b>842</b><small>Across all classes</small></div><div><span>Attendance</span><b>92%</b><small>Today's average</small></div></div><div className="preview-bars"><span style={{ height: '34%' }} /><span style={{ height: '55%' }} /><span style={{ height: '44%' }} /><span style={{ height: '76%' }} /><span style={{ height: '60%' }} /><span style={{ height: '92%' }} /><span style={{ height: '70%' }} /><span style={{ height: '82%' }} /></div></div>
      </div><div className="art-footer"><span><Check size={14} /> Simple by design</span><span><Check size={14} /> Built for every screen</span></div>
    </section>
    <section className="login-panel"><div className="login-mobile-brand"><Logo /></div><div className="login-box"><div className="login-icon"><LockKeyhole size={21} /></div><p className="kicker">WELCOME BACK</p><h2>Sign in to EduCore</h2><p className="login-subtitle">Sign in with the account provided by your school.</p>
      <form onSubmit={submit} className="login-form"><label htmlFor="email">Email address</label><div className="field"><Mail size={17} /><input id="email" type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@school.edu" /></div><label htmlFor="previewRole">Preview role</label><div className="field role-field"><UserRound size={17} /><select id="previewRole" value={previewRole} onChange={e => setPreviewRole(e.target.value)}><option value="SUPER_ADMIN">Platform administrator</option><option value="SCHOOL_ADMIN">School administrator</option><option value="TEACHER">Teacher</option><option value="STUDENT">Student / parent</option></select></div><div className="password-label"><label htmlFor="password">Password</label><button type="button" className="text-button" onClick={() => setError('For this frontend demo, use the prefilled credentials.')}>Forgot password?</button></div><div className="field"><LockKeyhole size={17} /><input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" /><button className="icon-button" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>{error && <p className="form-error">{error}</p>}<button className="primary-button login-submit" type="submit" disabled={busy}>{busy ? (isDemoMode ? 'Opening preview…' : 'Signing in…') : 'Sign in'} {!busy && <ArrowUpRight size={17} />}</button></form>
      <div className="demo-note"><span className="demo-dot" /><div><b>{isDemoMode ? 'Preview mode' : 'Secure sign-in'}</b><span>{isDemoMode ? 'No backend is called. Choose a role to inspect its navigation and sample screens.' : 'Sign-in uses the configured API. The server must return a valid session and /auth/me user profile.'}</span></div></div><p className="login-privacy">By signing in, you agree to your school's acceptable use policy.</p></div><div className="login-copyright">© 2026 EduCore <span>•</span> Designed for focused school days</div></section>
  </main>;
}
function Sidebar({ active, setActive, open, setOpen, onLogout, role, userEmail }) {
  return <><div className={`sidebar-scrim ${open ? 'show' : ''}`} onClick={() => setOpen(false)} /><aside className={`sidebar ${open ? 'sidebar-open' : ''}`}><div className="sidebar-brand"><Logo /><button className="icon-button close-menu" onClick={() => setOpen(false)} aria-label="Close menu"><X size={19} /></button></div><div className="school-switcher"><div className="school-icon"><School size={17} /></div><div><b>Greenwood High</b><span>Academic year 2026–27</span></div><ChevronDown size={15} /></div><nav className="nav-list" aria-label="Main navigation">{navItems.filter(([label]) => role === 'SUPER_ADMIN' ? ['Dashboard', 'Schools', 'Users', 'Reports', 'Settings', 'Help centre'].includes(label) : role === 'TEACHER' ? ['Dashboard', 'Students', 'Classes', 'Subjects', 'Attendance', 'Academics', 'Timetable', 'Exams', 'Homework', 'Communication', 'Reports', 'Settings', 'Profile'].includes(label) : role === 'STUDENT' ? ['Dashboard', 'Profile', 'Timetable', 'Attendance', 'Exams', 'Homework', 'Fees', 'Communication', 'Settings'].includes(label) : role === 'SCHOOL_ADMIN' ? ['Dashboard', 'Students', 'Teachers', 'Classes', 'Subjects', 'Attendance', 'Academics', 'Timetable', 'Exams', 'Fees', 'Homework', 'Communication', 'Reports', 'Settings', 'Profile', 'Help centre'].includes(label) : true).map(([label, Icon]) => <button key={label} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => { setActive(label); setOpen(false); }}><Icon size={17} /><span>{label}</span>{label === 'Communication' && <span className="nav-count">3</span>}</button>)}</nav><div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><Sparkles size={17} /></div><b>Need a hand?</b><span>Visit the help centre for quick answers.</span><button onClick={() => setActive('Help centre')}>Open help centre <ArrowUpRight size={13} /></button></div><button className="sidebar-user" onClick={onLogout}><div className="avatar admin-avatar">{(userEmail.split('@')[0] || 'U').slice(0, 2).toUpperCase()}</div><div className="user-meta"><b>{userEmail.split('@')[0] || 'User'}</b><span>{roleLabel(role)}</span></div><LogOut size={16} /></button></div></aside></>;
}
function Topbar({ setMenuOpen, query, setQuery, role, userEmail }) { return <header className="topbar"><button className="icon-button mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu size={21} /></button><div className="global-search"><Search size={16} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search students, classes..." aria-label="Search" /><kbd>⌘ K</kbd></div><div className="top-actions"><button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><span /></button><div className="top-user"><div className="avatar admin-avatar">{(userEmail.split('@')[0] || 'U').slice(0, 2).toUpperCase()}</div><div><b>{userEmail.split('@')[0] || 'User'}</b><span>{roleLabel(role)}</span></div><ChevronDown size={15} /></div></div></header>; }
function PageHeading({ eyebrow = 'OVERVIEW', title, subtitle, action }) { return <div className="page-heading"><div><p className="kicker">{eyebrow}</p><h1>{title}</h1><p className="page-subtitle">{subtitle}</p></div>{action}</div>; }
function StatCard({ icon: Icon, label, value, note, tone, trend }) { return <article className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={19} /></div><span className="stat-label">{label}</span><div className="stat-value">{value}</div><div className="stat-note"><span className={trend === 'neutral' ? 'neutral' : ''}>{note}</span></div></article>; }
function MiniList({ items }) { return <div className="mini-list">{items.map(({ icon: Icon, title, detail, tone }) => <div className="mini-row" key={title}><div className={`mini-icon ${tone}`}><Icon size={16} /></div><div className="mini-copy"><b>{title}</b><span>{detail}</span></div></div>)}</div>; }
function AttendanceChart() { const points = [68, 78, 72, 81, 91, 79, 87]; const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; return <div className="chart-wrap"><div className="chart-y"><span>100%</span><span>75%</span><span>50%</span><span>25%</span></div><div className="chart-main"><div className="chart-grid"><i /><i /><i /><i /></div><svg viewBox="0 0 560 170" preserveAspectRatio="none" role="img" aria-label="Attendance trend line for the week"><defs><linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3478f6" stopOpacity=".15" /><stop offset="100%" stopColor="#3478f6" stopOpacity="0" /></linearGradient></defs><path d={`M ${points.map((p, i) => `${i * 93.3 + 5} ${155 - (p - 40) * 2.2}`).join(' L ')} L 565 170 L 5 170 Z`} fill="url(#areaFill)" /><polyline points={points.map((p, i) => `${i * 93.3 + 5},${155 - (p - 40) * 2.2}`).join(' ')} fill="none" stroke="#3478f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />{points.map((p, i) => <circle key={i} cx={i * 93.3 + 5} cy={155 - (p - 40) * 2.2} r="3.4" fill="#fff" stroke="#3478f6" strokeWidth="2" />)}</svg><div className="chart-x">{labels.map(l => <span key={l}>{l}</span>)}</div></div></div>; }
function Dashboard({ setActive }) { return <><PageHeading title="Good morning, Parvez" subtitle="Here's what's happening at Greenwood High School." action={<button className="date-chip"><CalendarDays size={15} /> <span>Tuesday, 27 Oct 2026</span><ChevronDown size={14} /></button>} /><div className="phase-note dashboard-demo-note"><span className="phase-note-dot" /><span><b>Preview data</b> — dashboard figures and school activity are illustrative placeholders until connected to the backend.</span></div><div className="stats-grid"><StatCard icon={Users} label="Total students" value="842" note="↑ 12 this month" tone="blue" /><StatCard icon={GraduationCap} label="Teachers" value="48" note="↑ 2 this month" tone="lilac" /><StatCard icon={BookOpen} label="Active classes" value="28" note="Across 6 grades" tone="amber" trend="neutral" /><StatCard icon={ChartNoAxesCombined} label="Attendance" value="92%" note="↑ 3.2% this week" tone="mint" /></div><div className="dashboard-grid"><section className="panel attendance-panel"><div className="panel-heading"><div><h3>Attendance overview</h3><p>Daily attendance across the school</p></div><button className="select-chip" onClick={() => setActive('Attendance')}>This week <ChevronDown size={14} /></button></div><AttendanceChart /><div className="chart-legend"><span><i className="legend-blue" /> Attendance rate</span><span className="legend-summary"><b>92%</b> weekly average</span></div></section><section className="panel announcements-panel"><div className="panel-heading"><div><h3>Announcements</h3><p>Keep up with what's coming up</p></div><button className="link-button" onClick={() => setActive('Communication')}>View all</button></div><MiniList items={announcements} /></section><section className="panel events-panel"><div className="panel-heading"><div><h3>Upcoming events</h3><p>Mark your calendar</p></div><button className="link-button" onClick={() => setActive('Communication')}>View all</button></div><MiniList items={events} /></section><section className="panel quick-panel"><div className="panel-heading"><div><h3>Quick actions</h3><p>Common tasks, one click away</p></div></div><div className="quick-actions"><button onClick={() => setActive('Attendance')}><span className="quick-icon blue"><CalendarCheck size={19} /></span><b>Mark attendance</b><span>Record today's status</span></button><button onClick={() => setActive('Students')}><span className="quick-icon mint"><UserRound size={19} /></span><b>Add student</b><span>Register a new student</span></button><button onClick={() => setActive('Communication')}><span className="quick-icon amber"><FileText size={19} /></span><b>Create notice</b><span>Share an announcement</span></button></div></section></div></>; }
function Avatar({ student }) { return <div className={`avatar student-avatar ${student.color}`}>{student.name.split(' ').map(s => s[0]).join('').slice(0, 2)}</div>; }
function parseCsvLine(line) {
  const cells = []; let cell = ''; let quoted = false;
  for (let i = 0; i < line.length; i++) { const ch = line[i]; if (ch === '"' && quoted && line[i + 1] === '"') { cell += '"'; i++; } else if (ch === '"') { quoted = !quoted; } else if (ch === ',' && !quoted) { cells.push(cell.trim()); cell = ''; } else { cell += ch; } }
  cells.push(cell.trim()); return cells;
}

function Students({ students, setStudents, query }) {
  const [classFilter, setClassFilter] = useState('All classes');
  const [statusFilter, setStatusFilter] = useState('All status');
  const [localQuery, setLocalQuery] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editingAdmission, setEditingAdmission] = useState(null);
  const [showImport, setShowImport] = useState(false);
  const [importMessage, setImportMessage] = useState('');
  const [formError, setFormError] = useState('');
  const blankForm = { admissionNo: '', firstName: '', lastName: '', dob: '', className: '10', section: 'A', guardian: '', address: '' };
  const [form, setForm] = useState(blankForm);
  const [importPreview, setImportPreview] = useState([]);
  const [importSummary, setImportSummary] = useState(null);
  const [importFileName, setImportFileName] = useState('');
  const filtered = useMemo(() => students.filter(s => {
    const haystack = `${s.name} ${s.admissionNo || ''} ${s.roll} ${s.className} ${s.section}`.toLowerCase();
    return haystack.includes((localQuery || query).toLowerCase()) &&
      (classFilter === 'All classes' || s.className === classFilter) &&
      (statusFilter === 'All status' || s.status === statusFilter);
  }), [students, query, localQuery, classFilter, statusFilter]);

  function addStudent(e) {
    e.preventDefault();
    const admissionNo = form.admissionNo.trim();
    const guardianContact = form.guardian.trim();

    if (!admissionNo || !form.firstName.trim()) {
      setFormError('Admission number and first name are required.');
      return;
    }

    if (!/^\d{10}$/.test(guardianContact)) {
      setFormError('Guardian contact must contain exactly 10 digits.');
      return;
    }
    if (students.some(s => (s.admissionNo || '').toLowerCase() === admissionNo.toLowerCase() && s.admissionNo !== editingAdmission)) {
      setFormError('That admission number already exists in this demo school.'); return;
    }
    const name = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
    if (editingAdmission) {
      setStudents(prev => prev.map(s => s.admissionNo === editingAdmission ? { ...s, name, admissionNo, roll: admissionNo, className: form.className, section: form.section, dob: form.dob, guardian: form.guardian.trim(), address: form.address.trim() } : s));
    } else {
      setStudents(prev => [...prev, { name, admissionNo, roll: admissionNo, className: form.className, section: form.section, status: 'Active', color: ['blue', 'mint', 'lilac', 'coral'][prev.length % 4], dob: form.dob, guardian: form.guardian.trim(), address: form.address.trim() }]);
    }
    setForm(blankForm); setFormError(''); setShowAdd(false); setEditingAdmission(null);
  }

  function downloadTemplate() {
    const csv = 'admissionNumber,firstName,lastName,dateOfBirth,class,section,guardianContact,address\n2026-0109,Sample,Student,2012-05-14,10,A,9876543210,School Road';
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a'); a.href = url; a.download = 'educore-student-import-template.csv'; a.click(); URL.revokeObjectURL(url);
  }

  async function readCsv(file) {
    if (!file) return;
    setImportFileName(file.name); setImportMessage(''); setImportPreview([]); setImportSummary(null);
    if (!file.name.toLowerCase().endsWith('.csv')) { setImportMessage('Choose a .csv file.'); return; }
    if (file.size > 5 * 1024 * 1024) { setImportMessage('File is larger than 5 MB.'); return; }
    const raw = await file.text();
    const lines = raw.split(/\r?\n/).filter(line => line.trim());
    const rows = lines.slice(1).map((line, i) => {
      const cols = parseCsvLine(line);
      const guardian = (cols[6] || '').replace(/\D/g, '');
      const error = !cols[0]
        ? 'Missing admission number'
        : !cols[1]
          ? 'Missing first name'
          : !/^\d{10}$/.test(guardian)
            ? 'Guardian contact must contain exactly 10 digits'
            : '';

      return {
        row: i + 2,
        admissionNo: cols[0] || '',
        firstName: cols[1] || '',
        lastName: cols[2] || '',
        className: cols[4] || '',
        section: cols[5] || '',
        guardian,
        address: cols[7] || '',
        error,
      };
    });
    setImportPreview(rows);
    setImportMessage(rows.length ? `${rows.length} row(s) read locally. Nothing has been sent to the server.` : 'No data rows found. Check the CSV template.');
  }

  function importPreviewRows() {
    const existing = new Set(students.map(s => (s.admissionNo || '').toLowerCase()));
    const seen = new Set(existing);
    const checked = importPreview.map(r => { const key = (r.admissionNo || '').toLowerCase(); const error = r.error || (seen.has(key) ? 'Duplicate admission number' : ''); if (key) seen.add(key); return { ...r, error }; });
    const valid = checked.filter(r => !r.error);
    const rejected = checked.filter(r => r.error);
    setImportSummary({ total: checked.length, imported: valid.length, rejected: rejected.length, errors: rejected });
    if (!valid.length) { setImportMessage('No valid rows to add. Review the rejected rows and fix the errors.'); setImportPreview(checked); return; }
    setStudents(prev => [...prev, ...valid.map((r, i) => ({
      name: `${r.firstName} ${r.lastName}`.trim(), admissionNo: r.admissionNo, roll: r.admissionNo,
      className: r.className || '10', section: r.section || 'A', status: 'Active',
      color: ['blue', 'mint', 'lilac', 'coral'][(prev.length + i) % 4],
      guardian: r.guardian,
      address: r.address || '',
    }))]);
    setImportMessage(`${valid.length} row(s) added to the local demo only; ${rejected.length} row(s) rejected. Backend CSV import is not connected.`);
    setImportPreview(checked.filter(r => r.error));
  }

  return <>
    <PageHeading eyebrow="SCHOOL DIRECTORY" title="Students" subtitle="Manage admissions, student records and school placements."
      action={<div className="heading-actions"><button className="secondary-button" onClick={() => { setShowImport(true); setImportMessage(''); }}><Upload size={16} /><span>Import CSV</span></button><button className="primary-button" onClick={() => { setEditingAdmission(null); setForm(blankForm); setShowAdd(true); setFormError(''); }}><Plus size={17} /><span>Add student</span></button></div>} />
    <div className="phase-note"><span className="phase-note-dot" /><span><b>Frontend preview</b> — student records are local demo data. Connect the confirmed backend contract before using real school records.</span></div>
    <section className="panel directory-panel">
      <div className="table-toolbar">
        <div className="table-search"><Search size={16} /><input aria-label="Search students" placeholder="Search by name, admission number or class..." value={localQuery || query} onChange={e => setLocalQuery(e.target.value)} /></div>
        <select value={classFilter} onChange={e => setClassFilter(e.target.value)} aria-label="Filter by class"><option>All classes</option>{['6', '7', '8', '9', '10', '11', '12'].map(c => <option key={c} value={c}>{`Class ${c}`}</option>)}</select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} aria-label="Filter by status"><option>All status</option><option>Active</option><option>Inactive</option><option>Transferred</option><option>Graduated</option></select>
        <button className="filter-button" aria-label="Clear filters" onClick={() => { setClassFilter('All classes'); setStatusFilter('All status'); }}><Filter size={16} /></button>
      </div>
      <div className="table-scroll"><table><thead><tr><th>Admission no.</th><th>Student name</th><th>Class</th><th>Section</th><th>Status</th><th>Guardian contact</th><th>Actions</th></tr></thead>
        <tbody>{filtered.map(s => <tr key={s.admissionNo || s.roll}><td className="muted-cell admission-cell">{s.admissionNo || s.roll}</td><td><div className="student-name"><Avatar student={s} /><span>{s.name}</span></div></td><td>{s.className}</td><td>{s.section}</td><td><span className={`status-pill ${s.status === 'Active' ? 'status-active' : 'status-inactive'}`}><i />{s.status}</span></td><td className="muted-cell">{s.guardian || '—'}</td><td><div className="student-row-actions"><button className="secondary-button student-status-action" onClick={() => { setEditingAdmission(s.admissionNo); const names = s.name.split(' '); setForm({ admissionNo: s.admissionNo || '', firstName: names[0] || '', lastName: names.slice(1).join(' '), dob: s.dob || '', className: s.className || '10', section: s.section || 'A', guardian: s.guardian || '', address: s.address || '' }); setFormError(''); setShowAdd(true); }}>Edit</button><button className="secondary-button student-status-action" onClick={() => { const next = s.status === 'Active' ? 'Inactive' : 'Active'; if (window.confirm(`${next === 'Inactive' ? 'Deactivate' : 'Reactivate'} ${s.name}?`)) setStudents(prev => prev.map(item => item.admissionNo === s.admissionNo ? { ...item, status: next } : item)); }}>{s.status === 'Active' ? 'Deactivate' : 'Reactivate'}</button></div></td></tr>)}</tbody>
      </table>{filtered.length === 0 && <div className="empty-state">No students match these filters. Try a different search or clear filters.</div>}</div>
      <div className="table-footer"><span>Showing <b>{filtered.length}</b> of {students.length} demo records</span><span className="table-footer-note">Admission numbers are entered manually.</span></div>
    </section>
    {showAdd && <div className="modal-backdrop" onClick={() => setShowAdd(false)}><section className="modal student-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="add-student-title">
      <div className="modal-head"><div><p className="kicker">STUDENT RECORD</p><h2 id="add-student-title">{editingAdmission ? 'Edit student' : 'Add a student'}</h2><p className="modal-subtitle">Enter the student's school admission details.</p></div><button className="icon-button" onClick={() => setShowAdd(false)} aria-label="Close dialog"><X size={18} /></button></div>
      <form onSubmit={addStudent}>
        <div className="form-grid"><div className="form-field full-field"><label htmlFor="admission-number">Admission number <span>*</span></label><input id="admission-number" value={form.admissionNo} onChange={e => setForm({ ...form, admissionNo: e.target.value })} placeholder="e.g. 2026-0109" required /><small>Enter manually. Leading zeros are preserved.</small></div>
          <div className="form-field"><label htmlFor="first-name">First name <span>*</span></label><input id="first-name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} placeholder="First name" required /></div>
          <div className="form-field"><label htmlFor="last-name">Last name</label><input id="last-name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} placeholder="Last name" /></div>
          <div className="form-field"><label htmlFor="student-dob">Date of birth</label><input id="student-dob" type="date" value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} /></div>
          <div className="form-field">
            <label htmlFor="guardian-contact">Guardian contact <span>*</span></label>
            <input
              id="guardian-contact"
              type="tel"
              name="guardian"
              value={form.guardian}
              onChange={e => {
                const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                setForm(prev => ({ ...prev, guardian: digits }));
                setFormError('');
              }}
              placeholder="Enter 10-digit mobile number"
              inputMode="numeric"
              pattern="[0-9]{10}"
              maxLength={10}
              autoComplete="tel-national"
              aria-describedby="guardian-contact-help"
              required
            />
            <small id="guardian-contact-help">Enter exactly 10 digits, without a country code.</small>
          </div>
          <div className="form-field"><label htmlFor="student-class">Class</label><select id="student-class" value={form.className} onChange={e => setForm({ ...form, className: e.target.value })}>{['6', '7', '8', '9', '10', '11', '12'].map(c => <option key={c} value={c}>{`Class ${c}`}</option>)}</select></div>
          <div className="form-field"><label htmlFor="student-section">Section</label><select id="student-section" value={form.section} onChange={e => setForm({ ...form, section: e.target.value })}>{['A', 'B', 'C'].map(c => <option key={c}>{c}</option>)}</select></div>
          <div className="form-field full-field"><label htmlFor="student-address">Address</label><textarea id="student-address" rows="2" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Student's residential address" /></div></div>
        {formError && <p className="form-error"><AlertCircle size={14} />{formError}</p>}
        <div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowAdd(false)}>Cancel</button><button type="submit" className="primary-button"><Plus size={16} />{editingAdmission ? 'Save changes' : 'Add student'}</button></div>
      </form>
    </section></div>}
    {showImport && <div className="modal-backdrop" onClick={() => setShowImport(false)}><section className="modal import-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="import-title">
      <div className="modal-head"><div><p className="kicker">BULK ADMISSIONS</p><h2 id="import-title">Import students</h2><p className="modal-subtitle">Preview a CSV before adding demo rows.</p></div><button className="icon-button" onClick={() => setShowImport(false)} aria-label="Close dialog"><X size={18} /></button></div>
      <div className="import-drop"><FileSpreadsheet size={25} /><b>{importFileName || 'Choose a CSV file'}</b><span>CSV only · Maximum 5 MB</span><label className="secondary-button file-pick">Browse files<input type="file" accept=".csv,text/csv" onChange={e => readCsv(e.target.files?.[0])} /></label></div>
      <button className="template-link" onClick={downloadTemplate}><Download size={15} /> Download sample CSV template</button>
      {importMessage && <p className="import-message">{importMessage}</p>}
      {importPreview.length > 0 && <><div className="import-preview-head"><b>Preview</b><span>{importPreview.length} row(s)</span></div><div className="import-preview-table"><table><thead><tr><th>Row</th><th>Admission no.</th><th>Name</th><th>Class</th><th>Section</th><th>Validation</th></tr></thead><tbody>{importPreview.slice(0, 8).map(r => <tr key={r.row}><td>{r.row}</td><td>{r.admissionNo || 'Missing'}</td><td>{`${r.firstName} ${r.lastName}`.trim() || 'Missing'}</td><td>{r.className || '—'}</td><td>{r.section || '—'}</td><td>{r.error || 'Ready'}</td></tr>)}</tbody></table></div><div className="modal-actions"><button className="secondary-button" onClick={() => setImportPreview([])}>Clear preview</button><button className="primary-button" onClick={importPreviewRows}>Add valid demo rows</button></div></>}
      <p className="integration-warning">Backend CSV import is not connected. This preview only changes local demo state; it does not upload student data.</p>
    </section></div>}
  </>;
}

function Attendance({ students }) {
  const [statuses, setStatuses] = useState(() =>
    Object.fromEntries(
      students.map((student, index) => [
        student.roll,
        index === 2 ? "Absent" : "Present"
      ])
    )
  );

  const [saved, setSaved] = useState(false);

  const presentCount = Object.values(statuses).filter(
    status => status === "Present"
  ).length;

  const absentCount = students.length - presentCount;

  const markAttendance = (roll, isPresent) => {
    setStatuses(previous => ({
      ...previous,
      [roll]: isPresent ? "Present" : "Absent"
    }));
    setSaved(false);
  };

  return (
    <>
      <PageHeading
        eyebrow="DAILY RECORDS"
        title="Attendance"
        subtitle="Mark students present or absent using the checkboxes."
        action={
          <button className="secondary-button">
            <CalendarDays size={16} />
            24 Oct 2026
          </button>
        }
      />

      <div className="attendance-filters">
        <select aria-label="Select class">
          <option>Class 10</option>
          {["6", "7", "8", "9", "11", "12"].map(className => (
            <option key={className}>Class {className}</option>
          ))}
        </select>

        <select aria-label="Select section">
          <option>Section A</option>
          <option>Section B</option>
          <option>Section C</option>
        </select>

        <div className="segmented">
          <button className="selected">Class view</button>
          <button>Subject view</button>
        </div>
      </div>

      <div className="attendance-counts">
        <div>
          <span className="count-icon blue">
            <Users size={17} />
          </span>
          <div>
            <small>Total students</small>
            <b>{students.length}</b>
          </div>
        </div>

        <div>
          <span className="count-icon mint">
            <Check size={17} />
          </span>
          <div>
            <small>Present</small>
            <b>{presentCount}</b>
          </div>
        </div>

        <div>
          <span className="count-icon rose">
            <UserRound size={17} />
          </span>
          <div>
            <small>Absent</small>
            <b>{absentCount}</b>
          </div>
        </div>
      </div>

      <section className="panel directory-panel">
        <div className="panel-heading attendance-table-heading">
          <div>
            <h3>Class 10 · Section A</h3>
            <p>Saturday, 24 October 2026</p>
          </div>
          <span className="status-pill status-active">
            In progress
          </span>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll no.</th>
                <th>Present</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {students.slice(0, 8).map(student => {
                const isPresent =
                  statuses[student.roll] === "Present";

                return (
                  <tr key={student.roll}>
                    <td>
                      <div className="student-name">
                        <Avatar student={student} />
                        <span>{student.name}</span>
                      </div>
                    </td>

                    <td className="muted-cell">
                      {student.roll}
                    </td>

                    <td>
                      <label className="attendance-toggle">
                        <input
                          type="checkbox"
                          checked={isPresent}
                          onChange={event =>
                            markAttendance(
                              student.roll,
                              event.target.checked
                            )
                          }
                          aria-label={`Mark ${student.name} present`}
                        />
                        <span className="attendance-toggle-ui">
                          <Check size={14} />
                        </span>
                      </label>
                    </td>

                    <td>
                      <span
                        className={`attendance-status ${isPresent ? "is-present" : "is-absent"
                          }`}
                      >
                        {isPresent ? "Present" : "Absent"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="attendance-save-row">
          {saved && (
            <span className="saved-message" role="status">
              <Check size={15} />
              Attendance saved for this demo
            </span>
          )}

          <button
            className="primary-button"
            onClick={() => setSaved(true)}
          >
            Save attendance
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>
    </>
  );
}

function Academics({ setActive }) { const classes = [['6', '120', 'mint'], ['7', '118', 'blue'], ['8', '115', 'amber'], ['9', '110', 'mint'], ['10', '98', 'blue'], ['11', '64', 'lilac'], ['12', '52', 'amber']]; return <><PageHeading eyebrow="LEARNING & CURRICULUM" title="Academics" subtitle="Manage classes, subjects and the school timetable." action={<button className="primary-button" onClick={() => setActive('Classes')}><Plus size={17} /> Add class</button>} /><section className="panel academic-panel"><div className="academic-tabs"><button className="tab-active">Classes</button><button onClick={() => setActive('Academics')}>Subjects</button><button>Timetable</button><button>Assignments</button></div><div className="class-grid">{classes.map(([c, n, tone]) => <button className="class-card" key={c}><div className={`class-icon ${tone}`}><BookOpen size={19} /></div><ChevronDown className="class-arrow" size={16} /><b>Class {c}</b><span>{c === '11' || c === '12' ? '2' : '3'} sections <i /> {n} students</span></button>)}</div></section></>; }
const roleLabel = (role) => ({ SUPER_ADMIN: 'Platform administrator', SCHOOL_ADMIN: 'School administrator', TEACHER: 'Teacher', STUDENT: 'Student / parent' })[role] || 'School administrator';

const moduleSeed = {
  Schools: { eyebrow: 'PLATFORM ADMINISTRATION', subtitle: 'Manage school tenants and their active status.', columns: ['School', 'School code', 'Academic year', 'Status'], rows: [['Greenwood High School', 'GHS-001', '2026–27', 'Active'], ['Northfield Public School', 'NPS-002', '2026–27', 'Active'], ['Riverdale Academy', 'RA-003', '2026–27', 'Setup']] },
  Subjects: { eyebrow: 'ACADEMIC STRUCTURE', subtitle: 'Maintain subjects and align them with classes and assigned teachers.', columns: ['Subject', 'Subject code', 'Class scope', 'Status'], rows: [['Mathematics', 'MATH-01', '6–10', 'Active'], ['Science', 'SCI-01', '6–10', 'Active'], ['English', 'ENG-01', '6–12', 'Active']] },
  Homework: { eyebrow: 'LEARNING & COMMUNICATION', subtitle: 'Review assignments and homework shared with classes.', columns: ['Assignment', 'Class', 'Due date', 'Status'], rows: [['Science worksheet', 'Class 10', '29 Oct 2026', 'Assigned'], ['Reading log', 'Class 8', '30 Oct 2026', 'Draft'], ['Algebra practice', 'Class 9', '31 Oct 2026', 'Assigned']] },
  Profile: { eyebrow: 'ACCOUNT', subtitle: 'Review account details and linked student access.', columns: ['Field', 'Details', 'Source', 'Status'], rows: [['Name', 'Parvez Saifi', 'Demo account', 'Preview'], ['Role', 'School administrator', 'Selected at login', 'Preview'], ['School', 'Greenwood High', 'Demo tenant', 'Preview']] },
  Teachers: { eyebrow: 'PEOPLE & ACCESS', subtitle: 'Manage staff profiles and their school roles.', columns: ['Staff member', 'Employee ID', 'Department', 'Status'], rows: [['Anita Mehra', 'T-001', 'Mathematics', 'Active'], ['Rahul Kapoor', 'T-002', 'Science', 'Active'], ['Sana Ali', 'T-003', 'English', 'Active']] },
  Users: { eyebrow: 'PLATFORM ACCESS', subtitle: 'Review accounts and role assignments across the platform.', columns: ['User', 'Role', 'School scope', 'Status'], rows: [['School Admin', 'SCHOOL_ADMIN', 'Greenwood High', 'Active'], ['Teacher Account', 'TEACHER', 'Greenwood High', 'Active'], ['Student Account', 'STUDENT', 'Linked student', 'Active']] },
  Classes: { eyebrow: 'ACADEMIC STRUCTURE', subtitle: 'Organize academic years, classes, sections and class teachers.', columns: ['Class', 'Sections', 'Students', 'Class teacher'], rows: [['Class 8', 'A, B, C', '115', 'Anita Mehra'], ['Class 9', 'A, B, C', '110', 'Rahul Kapoor'], ['Class 10', 'A, B, C', '98', 'Sana Ali']] },
  Timetable: { eyebrow: 'SCHOOL DAY', subtitle: 'View periods and the class timetable. Scheduling conflicts need backend validation.', columns: ['Time', 'Monday', 'Tuesday', 'Wednesday'], rows: [['08:30–09:15', 'Mathematics', 'Science', 'English'], ['09:15–10:00', 'English', 'Mathematics', 'Science'], ['10:15–11:00', 'Science', 'English', 'Mathematics']] },
  Exams: { eyebrow: 'ASSESSMENT', subtitle: 'Set up exams, enter marks and review published results.', columns: ['Assessment', 'Classes', 'Date', 'Status'], rows: [['Unit Test 1', '6–10', '05 Nov 2026', 'Scheduled'], ['Mid-term Examination', '6–12', '18 Nov 2026', 'Draft'], ['Practical Assessment', '9–12', '24 Nov 2026', 'Scheduled']] },
  Fees: { eyebrow: 'FINANCE', subtitle: 'Review fee plans, student ledgers, receipts and outstanding dues.', columns: ['Fee item', 'Class scope', 'Due date', 'Status'], rows: [['Term 2 tuition', 'All classes', '31 Oct 2026', 'Due'], ['Transport fee', 'Selected students', '05 Nov 2026', 'Due'], ['Library fee', '6–12', '15 Nov 2026', 'Paid']] },
  Communication: { eyebrow: 'SCHOOL UPDATES', subtitle: 'Draft notices and homework, then target the right classes or audience.', columns: ['Message', 'Audience', 'Publish date', 'Status'], rows: [['Annual Day rehearsal', 'All school', '26 Oct 2026', 'Published'], ['Science worksheet', 'Class 10', '27 Oct 2026', 'Draft'], ['Parent–Teacher Meeting', 'Parents & students', '12 Nov 2026', 'Scheduled']] },
  Reports: { eyebrow: 'INSIGHTS & EXPORTS', subtitle: 'Prepare attendance, student, fee and academic reports.', columns: ['Report', 'Data scope', 'Last prepared', 'Action'], rows: [['Student directory', 'Students', 'Not generated', 'Prepare'], ['Attendance summary', 'Attendance', 'Not generated', 'Prepare'], ['Outstanding fees', 'Fees', 'Not generated', 'Prepare']] },
  Settings: { eyebrow: 'PREFERENCES & SECURITY', subtitle: 'Configure school details, account preferences and security options.', columns: ['Setting', 'Description', 'Current value', 'Status'], rows: [['School profile', 'Name and contact details', 'Greenwood High', 'Review'], ['Academic year', 'Current academic period', '2026–27', 'Active'], ['Account security', 'Password and session', 'Managed by server', 'Review']] },
  'Help centre': { eyebrow: 'SUPPORT', subtitle: 'Find help for common workflows and implementation status.', columns: ['Topic', 'Description', 'Status', ''], rows: [['Student admissions', 'Manual admission number and student profiles', 'Available', 'Open'], ['CSV import', 'Preview and validate spreadsheet rows', 'Demo only', 'Open'], ['Account access', 'Sign-in and role permissions', 'Backend pending', 'Open']] }
};
const moduleActions = {
  Schools: ['Add school', 'School name', 'School code'], Teachers: ['Add staff member', 'Full name', 'Employee ID'], Users: ['Invite user', 'Email address', 'Role'],
  Classes: ['Add class', 'Class name', 'Academic year'], Subjects: ['Add subject', 'Subject name', 'Subject code'], Homework: ['Create assignment', 'Assignment title', 'Due date'], Profile: ['Update profile', 'Display name', 'Contact email'], Timetable: ['Add period', 'Period name', 'Start time'], Exams: ['Create exam', 'Exam name', 'Exam date'],
  Fees: ['Add fee item', 'Fee name', 'Amount (₹)'], Communication: ['Create notice', 'Notice title', 'Audience'], Reports: ['Prepare report', 'Report name', 'Date range'],
  Settings: ['Save setting', 'Setting name', 'Value'], 'Help centre': ['Contact support', 'Subject', 'Message']
};
function DataWorkspace({ active, role }) {
  const config = moduleSeed[active] || moduleSeed.Classes;
  const [rows, setRows] = useState(config.rows);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [modal, setModal] = useState(false);
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [notice, setNotice] = useState('');
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState('Overview');
  const action = moduleActions[active] || ['Add item', 'Name', 'Details'];
  const filtered = rows.filter(row => row.join(' ').toLowerCase().includes(search.toLowerCase()) && (status === 'All' || row.some(cell => String(cell).toLowerCase() === status.toLowerCase())));
  function addRow(e) { e.preventDefault(); if (!first.trim()) { setNotice('Enter the required name before saving.'); return; } setRows(old => [[first.trim(), second.trim() || '—', active === 'Timetable' ? 'Not scheduled' : 'Draft', 'Demo'], ...old]); setFirst(''); setSecond(''); setModal(false); setNotice(`${action[0]} saved in this local preview. It has not been sent to the backend.`); }
  function exportRows() { const csv = [config.columns, ...filtered].map(row => row.map(v => '"' + String(v ?? '').replaceAll('"', '""') + '"').join(',')).join('\n'); const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' })); const a = document.createElement('a'); a.href = url; a.download = `educore-${active.toLowerCase().replaceAll(' ', '-')}.csv`; a.click(); URL.revokeObjectURL(url); }
  return <><PageHeading eyebrow={config.eyebrow} title={active} subtitle={config.subtitle} action={<div className="heading-actions"><button className="secondary-button" onClick={exportRows}><Download size={15} /> Export CSV</button><button className="primary-button" onClick={() => { setModal(true); setNotice('') }}><Plus size={16} />{action[0]}</button></div>} />
    <div className="phase-note"><span className="phase-note-dot" /><span><b>Preview workspace.</b> The rows shown are sample data for review. This module is not connected to a verified API yet; changes remain in this browser session.</span></div>
    <div className="stats-grid module-stats"><StatCard icon={BookOpen} label="Records shown" value={rows.length} note="Preview records" tone="blue" trend="neutral" /><StatCard icon={Check} label="Filtered results" value={filtered.length} note="Based on current filters" tone="mint" trend="neutral" /><StatCard icon={ShieldCheck} label="Access role" value={role === 'SUPER_ADMIN' ? 'Platform' : role === 'TEACHER' ? 'Teacher' : role === 'STUDENT' ? 'Portal' : 'School admin'} note="Demo permissions only" tone="lilac" trend="neutral" /><StatCard icon={Clock3} label="Integration" value="Pending" note="API contract required" tone="amber" trend="neutral" /></div>
    <section className="panel directory-panel"><div className="module-tabs">{['Overview', 'Activity', 'Configuration'].map(t => <button key={t} className={tab === t ? 'tab-active' : ''} onClick={() => setTab(t)}>{t}</button>)}</div>
      {tab === 'Overview' ? <><div className="table-toolbar"><div className="table-search"><Search size={15} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${active.toLowerCase()}...`} /></div><select value={status} onChange={e => setStatus(e.target.value)} aria-label="Filter records"><option value="All">All records</option><option value="Active">Active</option><option value="Draft">Draft</option><option value="Paid">Paid</option><option value="Due">Due</option><option value="Published">Published</option><option value="Scheduled">Scheduled</option></select><button className="secondary-button export-mobile" onClick={exportRows}><Download size={15} /> Export</button></div>
        <div className="table-scroll"><table><thead><tr>{config.columns.map(c => <th key={c || 'action'}>{c}</th>)}<th>Actions</th></tr></thead><tbody>{filtered.map((row, i) => <tr key={row.join('-') + i}>{row.map((cell, j) => <td key={j}>{j === row.length - 1 ? <span className={`status-pill ${String(cell).toLowerCase() === 'active' || String(cell).toLowerCase() === 'paid' || String(cell).toLowerCase() === 'published' ? 'status-active' : 'status-pending'}`}>{cell}</span> : cell}</td>)}<td><button className="icon-button row-action" aria-label={`View ${row[0]}`} onClick={() => setSelected(row)}><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="empty-state">No records match your search. Try changing the filters.</div>}</div><div className="table-footer"><span>Showing {filtered.length} of {rows.length} preview records</span><span className="table-footer-note">Pagination connects when the API contract is confirmed.</span></div></> : <div className="module-info"><div className="placeholder-icon">{tab === 'Activity' ? <Clock3 size={23} /> : <Settings size={23} />}</div><h3>{tab === 'Activity' ? 'Recent activity' : 'Module configuration'}</h3><p>{tab === 'Activity' ? 'This demo records changes made in the current view only. An authoritative audit trail must come from the backend.' : 'Field rules, school scope and permissions must be aligned with the backend schemas before production use.'}</p></div>}</section>
    {modal && <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setModal(false) }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="module-modal-title"><div className="modal-header"><div><p className="kicker">{active.toUpperCase()}</p><h2 id="module-modal-title">{action[0]}</h2><p className="modal-subtitle">Create a local preview record.</p></div><button className="icon-button" onClick={() => setModal(false)} aria-label="Close"><X size={19} /></button></div><form onSubmit={addRow}><div className="form-grid"><div className="form-field full-field"><label>{action[1]} <span>*</span></label><input autoFocus value={first} onChange={e => setFirst(e.target.value)} required placeholder={action[1]} /></div><div className="form-field full-field"><label>{action[2]}</label>{active === 'Users' ? <select value={second} onChange={e => setSecond(e.target.value)}><option value="">Select role</option><option>SUPER_ADMIN</option><option>SCHOOL_ADMIN</option><option>TEACHER</option><option>STUDENT</option></select> : <input value={second} onChange={e => setSecond(e.target.value)} placeholder={action[2]} />}</div></div>{notice && <p className="import-message">{notice}</p>}<div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setModal(false)}>Cancel</button><button className="primary-button" type="submit"><Save size={15} /> Save preview</button></div><p className="integration-warning">This action only updates the local prototype. No API request or persistent record is created.</p></form></section></div>}
    {selected && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setSelected(null) }}><section className="modal" role="dialog" aria-modal="true"><div className="modal-header"><div><p className="kicker">RECORD DETAILS</p><h2>{selected[0]}</h2></div><button className="icon-button" onClick={() => setSelected(null)} aria-label="Close"><X size={19} /></button></div><div className="detail-list">{config.columns.map((c, i) => <div key={c || i}><span>{c || 'Details'}</span><b>{selected[i] || '—'}</b></div>)}</div><div className="modal-actions"><button className="secondary-button" onClick={() => setSelected(null)}>Close</button><button className="primary-button" onClick={() => { setSelected(null); setNotice('Editing requires the verified backend update contract.') }}><Pencil size={15} /> Edit</button></div></section></div>}
  </>;
}

function PlatformDashboard({ setActive }) { return <><PageHeading eyebrow="PLATFORM OVERVIEW" title="School network" subtitle="Manage tenant schools, platform users and operational health." action={<button className="primary-button" onClick={() => setActive('Schools')}><Plus size={16} /> Add school</button>} /><div className="phase-note"><span className="phase-note-dot" /><span><b>Preview data.</b> These counts are illustrative until school and user APIs are connected.</span></div><div className="stats-grid"><StatCard icon={Building2} label="Schools" value="12" note="Across the platform" tone="blue" trend="neutral" /><StatCard icon={Check} label="Active schools" value="10" note="2 setup / review" tone="mint" trend="neutral" /><StatCard icon={Users} label="User accounts" value="1,284" note="All demo tenants" tone="lilac" trend="neutral" /><StatCard icon={ShieldCheck} label="Platform status" value="Healthy" note="Illustrative status" tone="amber" trend="neutral" /></div><div className="dashboard-grid"><section className="panel"><div className="panel-heading"><div><h3>School tenants</h3><p>Recent school setup activity</p></div><button className="link-button" onClick={() => setActive('Schools')}>View schools</button></div><MiniList items={[{ icon: Building2, title: 'Greenwood High School', detail: 'Active · 2026–27', tone: 'blue' }, { icon: Building2, title: 'Northfield Public School', detail: 'Active · 2026–27', tone: 'mint' }, { icon: Building2, title: 'Riverdale Academy', detail: 'Setup in progress', tone: 'amber' }]} /></section><section className="panel"><div className="panel-heading"><div><h3>Platform actions</h3><p>Common administration tasks</p></div></div><div className="portal-actions"><button onClick={() => setActive('Schools')}><Building2 size={18} /> Manage schools <ArrowUpRight size={15} /></button><button onClick={() => setActive('Users')}><ShieldCheck size={18} /> Review roles & users <ArrowUpRight size={15} /></button><button onClick={() => setActive('Reports')}><ChartNoAxesCombined size={18} /> Platform reports <ArrowUpRight size={15} /></button></div></section></div></>; }

function PortalDashboard({ role, setActive }) { return <><PageHeading eyebrow="YOUR SCHOOL PORTAL" title={role === 'TEACHER' ? 'Welcome back, Teacher' : 'Welcome to your learning space'} subtitle="A focused view of your schedule, attendance, assignments and school updates." /><div className="phase-note"><span className="phase-note-dot" /><span><b>Portal preview.</b> This uses sample information. Student and parent share the same planned account permissions, as specified in the handoff guide.</span></div><div className="stats-grid"><StatCard icon={CalendarCheck} label="Attendance" value="94%" note="Illustrative summary" tone="mint" trend="neutral" /><StatCard icon={BookOpen} label="Classes today" value="5" note="Sample timetable" tone="blue" trend="neutral" /><StatCard icon={ClipboardList} label="Assignments" value="3" note="Preview items" tone="lilac" trend="neutral" /><StatCard icon={Wallet} label="Fee status" value="Due" note="Sample status only" tone="amber" trend="neutral" /></div><div className="dashboard-grid"><section className="panel"><div className="panel-heading"><div><h3>Quick access</h3><p>Open your school information</p></div></div><div className="portal-actions"><button onClick={() => setActive('Timetable')}><CalendarDays size={18} /> View timetable <ArrowUpRight size={15} /></button><button onClick={() => setActive('Attendance')}><CalendarCheck size={18} /> Attendance history <ArrowUpRight size={15} /></button><button onClick={() => setActive('Exams')}><ClipboardList size={18} /> Exams & results <ArrowUpRight size={15} /></button><button onClick={() => setActive('Communication')}><Megaphone size={18} /> Notices & homework <ArrowUpRight size={15} /></button></div></section><section className="panel"><div className="panel-heading"><div><h3>Latest notice</h3><p>School communication</p></div></div><MiniList items={announcements.slice(0, 3)} /></section></div></>; }

function AccountSecurity() {
  const [current, setCurrent] = useState(''); const [next, setNext] = useState(''); const [confirm, setConfirm] = useState(''); const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
  async function submit(e) { e.preventDefault(); setMessage(''); if (next.length < 8) { setMessage('Use at least 8 characters for the new password.'); return; } if (next !== confirm) { setMessage('The new password and confirmation do not match.'); return; } setBusy(true); try { await changePassword({ currentPassword: current, newPassword: next }); setMessage(isDemoMode ? 'Password form validated locally. No password was changed.' : 'Password change request succeeded.'); setCurrent(''); setNext(''); setConfirm(''); } catch (err) { setMessage(err?.response?.data?.message || err.message || 'Unable to change password.'); } finally { setBusy(false); } }
  return <section className="panel security-panel"><div className="panel-heading"><div><h3>Account security</h3><p>Change your account password</p></div><div className="stat-icon blue"><LockKeyhole size={18} /></div></div><form onSubmit={submit} className="security-form"><div className="form-field"><label htmlFor="current-password">Current password <span>*</span></label><input id="current-password" type="password" value={current} onChange={e => setCurrent(e.target.value)} required autoComplete="current-password" /></div><div className="form-field"><label htmlFor="new-password">New password <span>*</span></label><input id="new-password" type="password" value={next} onChange={e => setNext(e.target.value)} required minLength={8} autoComplete="new-password" /><small>Use at least 8 characters; server policy remains authoritative.</small></div><div className="form-field"><label htmlFor="confirm-password">Confirm new password <span>*</span></label><input id="confirm-password" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required minLength={8} autoComplete="new-password" /></div>{message && <p className={message.includes('succeeded') ? 'saved-message' : 'import-message'}>{message}</p>}<button className="primary-button" disabled={busy} type="submit"><Save size={15} />{busy ? 'Saving…' : 'Change password'}</button></form><p className="integration-warning">The change-password API path is documented, but confirm its exact payload and error contract against the backend before disabling demo mode.</p></section>;
}

function GenericPage({ active, role }) { if (active === 'Academics') return <DataWorkspace active="Classes" role={role} />; if (active === 'Settings') return <><DataWorkspace active={active} role={role} /><AccountSecurity /></>; return <DataWorkspace active={active} role={role} />; }
function App() {
  const [authenticated, setAuthenticated] = useState(false); const [role, setRole] = useState('SCHOOL_ADMIN'); const [userEmail, setUserEmail] = useState('admin@educore.school'); const [checkingSession, setCheckingSession] = useState(!isDemoMode);
  useEffect(() => { if (isDemoMode) { setCheckingSession(false); return; } getCurrentUser().then(user => { if (user) { setRole(user.role); setUserEmail(user.email); setAuthenticated(true); } }).catch(() => { }).finally(() => setCheckingSession(false)); const onExpired = () => { setAuthenticated(false); setActive('Dashboard'); }; window.addEventListener('educore:session-expired', onExpired); return () => window.removeEventListener('educore:session-expired', onExpired); }, []);
  const [active, setActive] = useState('Dashboard'); const [menuOpen, setMenuOpen] = useState(false); const [query, setQuery] = useState(''); const [students, setStudents] = useState(initialStudents); const [globalQuery, setGlobalQuery] = useState(''); const pageQuery = query || globalQuery;
  async function login(selectedRole, email, password) { const result = await signIn({ email, password, role: selectedRole }); const user = result.user; setRole(user.role || selectedRole || 'SCHOOL_ADMIN'); setUserEmail(user.email || email || ''); setAuthenticated(true); setActive('Dashboard'); }
  async function logout() { try { await signOut(); } catch { } setAuthenticated(false); setActive('Dashboard'); setQuery(''); setGlobalQuery(''); }
  if (checkingSession) return <main className="session-check"><div className="brand"><span className="brand-mark"><BookOpen size={19} /></span><span>EduCore</span></div><p>Checking your session…</p></main>;
  if (!authenticated) return <Login onLogin={login} />;
  const allowed = role === 'SUPER_ADMIN' ? ['Dashboard', 'Schools', 'Users', 'Reports', 'Settings', 'Help centre'] : role === 'TEACHER' ? ['Dashboard', 'Students', 'Classes', 'Subjects', 'Attendance', 'Academics', 'Timetable', 'Exams', 'Homework', 'Communication', 'Reports', 'Settings', 'Profile'] : role === 'STUDENT' ? ['Dashboard', 'Profile', 'Timetable', 'Attendance', 'Exams', 'Homework', 'Fees', 'Communication', 'Settings'] : role === 'SCHOOL_ADMIN' ? ['Dashboard', 'Students', 'Teachers', 'Classes', 'Subjects', 'Attendance', 'Academics', 'Timetable', 'Exams', 'Fees', 'Homework', 'Communication', 'Reports', 'Settings', 'Profile', 'Help centre'] : navItems.map(n => n[0]);
  const safeActive = allowed.includes(active) ? active : 'Dashboard';
  return <div className="app-shell"><Sidebar active={safeActive} setActive={setActive} open={menuOpen} setOpen={setMenuOpen} onLogout={logout} role={role} userEmail={userEmail} /><main className="main-area"><Topbar setMenuOpen={setMenuOpen} query={globalQuery} setQuery={setGlobalQuery} role={role} userEmail={userEmail} /><div className="content-area">{safeActive === 'Dashboard' ? (role === 'STUDENT' || role === 'TEACHER' ? <PortalDashboard role={role} setActive={setActive} /> : role === 'SUPER_ADMIN' ? <PlatformDashboard setActive={setActive} /> : <Dashboard setActive={setActive} />) : safeActive === 'Students' ? <Students students={students} setStudents={setStudents} query={pageQuery} /> : safeActive === 'Attendance' ? <Attendance students={students} /> : safeActive === 'Academics' ? <Academics setActive={setActive} /> : <GenericPage active={safeActive} role={role} />}<footer className="app-footer"><span>© 2026 EduCore</span><span>{roleLabel(role)} · Preview mode</span></footer></div></main></div>;
}
export default App;
