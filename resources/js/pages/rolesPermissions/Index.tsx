// resources/js/Pages/RolesPermissions/Index.tsx

import { Link, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import useCan from '@/hooks/useCan';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Roles & Permissions', href: '/roles-permissions' },
];

export default function Index() {
  type Role = {
    id: number;
    name: string;
    permissions: string[];
  };

  type PageProps = {
  roles: Role[];
  permissions: string[];
};


  const { roles } = usePage<PageProps>().props;
  const { can } = useCan();

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this role?')) {
      router.delete(`/roles-permissions/${id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Card className="mx-auto mt-6 w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-xl">Roles & Permissions</CardTitle>
          {can('role.create') && (
            <Link href="/roles-permissions/create">
              <Button>Create Role</Button>
            </Link>
          )}
        </CardHeader>
        <CardContent className="overflow-x-auto">
  <Table className="w-full text-sm">
    <TableHeader>
      <TableRow>
        <TableHead className="w-1/4">Role</TableHead>
        <TableHead className="w-1/2">Permissions</TableHead>
        <TableHead className="w-1/4 text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {roles.map((role) => (
        <TableRow key={role.id}>
          <TableCell className="font-medium">{role.name}</TableCell>
          <TableCell className="text-muted-foreground">
            {role.permissions.join(', ')}
          </TableCell>
          <TableCell className="text-right space-x-2">
            {can('role.edit') && (
              <Link href={`/roles-permissions/${role.id}/edit`}>
                <Button variant="outline" size="sm">Edit</Button>
              </Link>
            )}
            {can('role.delete') && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(role.id)}
              >
                Delete
              </Button>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</CardContent>


      </Card>
    </AppLayout>
  );
}
