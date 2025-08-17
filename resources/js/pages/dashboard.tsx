import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import DashboardSwitcher from '@/pages/dashboard/DashboardSwitcher';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

export default function Dashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <DashboardSwitcher />
    </AppLayout>
  );
}
