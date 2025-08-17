import { capitalizeFirst } from '@/utils';

interface RoleBadgeProps {
  role: string;
}

export default function RoleBadge({ role }: RoleBadgeProps) {
  const roleClassMap: Record<string, string> = {
    admin: 'bg-red-100 text-red-800',
    faculty: 'bg-blue-100 text-blue-800',
    student: 'bg-green-100 text-green-800',
  };

  const badgeClass =
    roleClassMap[role.toLowerCase()] || 'bg-gray-100 text-gray-800';

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${badgeClass}`}
    >
      {capitalizeFirst(role)}
    </span>
  );
}
