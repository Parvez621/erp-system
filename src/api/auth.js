import api, { setAccessToken } from './client';

const demoMode = String(import.meta.env.VITE_DEMO_MODE ?? 'true').toLowerCase() !== 'false';
export const isDemoMode = demoMode;

function normalizeUser(payload = {}) {
  const user = payload.user || payload.data?.user || payload.data || payload;
  const role = user.role || user.userRole || user.account?.role || 'SCHOOL_ADMIN';
  return {
    id: user.id || user.userId || null,
    email: user.email || user.emailAddress || '',
    name: user.name || user.fullName || user.displayName || user.email || 'User',
    role: String(role).toUpperCase() === 'PARENT' ? 'STUDENT' : String(role).toUpperCase(),
    school: user.school?.name || user.schoolName || 'Your school',
    raw: user,
  };
}

export async function signIn({ email, password, role }) {
  if (demoMode) {
    return { user: { email, name: email.split('@')[0] || 'Demo user', role: role || 'SCHOOL_ADMIN', school: 'Greenwood High' }, demo: true };
  }
  const { data } = await api.post('/auth/login', { email, password });
  const token = data?.accessToken || data?.access_token || data?.token || data?.data?.accessToken || data?.data?.access_token;
  if (token) setAccessToken(token);
  // The handoff guide lists /auth/me as the source of truth for role and school scope.
  const me = await api.get('/auth/me');
  return { user: normalizeUser(me.data), demo: false };
}

export async function getCurrentUser() {
  if (demoMode) return null;
  try {
    const { data } = await api.get('/auth/me');
    return normalizeUser(data);
  } catch (error) {
    if (error.response?.status === 401) return null;
    throw error;
  }
}

export async function signOut() {
  if (!demoMode) {
    try { await api.post('/auth/logout'); } finally { setAccessToken(null); }
  }
  setAccessToken(null);
}

export async function changePassword({ currentPassword, newPassword }) {
  if (demoMode) return { demo: true };
  // Confirm these field names against the server's Zod schema before production.
  const { data } = await api.patch('/auth/change-password', { currentPassword, newPassword });
  return data;
}
