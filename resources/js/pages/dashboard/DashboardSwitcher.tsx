import AdminDashboard from './AdminDashboard';
import FacultyDashboard from './FacultyDashboard';
import StudentDashboard from './StudentDashboard';
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

export default function DashboardSwitcher() {
  const { auth } = usePage<SharedData>().props;
  const roles = auth.user?.roles ?? []; // fallback to empty array if undefined

  if (roles.includes('admin')) return <AdminDashboard />;
  if (roles.includes('faculty')) return <FacultyDashboard />;
  return <StudentDashboard />;
}
