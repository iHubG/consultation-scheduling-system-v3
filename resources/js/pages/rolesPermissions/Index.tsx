import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useCan from '@/hooks/useCan';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const USE_FAKE_LOADING = false;

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Roles & Permissions', href: '/roles-permissions' }];

export default function Index() {
  type Role = {
    id: number;
    name: string;
    permissions: string[];
  };

  type PageProps = {
    roles: Role[];
    permissions: string[];
    flash?: {
      success?: string;
      error?: string;
    };
  };

  const { roles: initialRoles, flash } = usePage<PageProps>().props;
  const { can } = useCan();

  const [roles, setRoles] = useState<Role[] | null>(USE_FAKE_LOADING ? null : initialRoles);
  const [loading, setLoading] = useState(USE_FAKE_LOADING);

  useEffect(() => {
    if (flash?.success) toast.success(flash.success);
    if (flash?.error) toast.error(flash.error);
  }, [flash]);

  useEffect(() => {
    if (!USE_FAKE_LOADING) return;

    const timer = setTimeout(() => {
      setRoles(initialRoles);
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, [initialRoles]);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this role?')) {
      router.delete(`/roles-permissions/${id}`);
    }
  };

  const roleTextColors: Record<string, string> = {
    admin: 'text-red-600',
    faculty: 'text-blue-600',
    student: 'text-green-600',
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Roles & Permissions" />
      <Card className="mx-auto mt-6 w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-xl">Roles & Permissions</CardTitle>
          {can('role.create') && (
            <Link href="/roles-permissions/create">
              <Button size="icon" className="h-8 w-8" aria-label="Create Role">
                <Plus className="h-4 w-4" />
              </Button>
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
              {loading || !roles
                ? Array.from({ length: 5 }).map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {Array.from({ length: 3 }).map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <Skeleton className="h-4 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className={`${roleTextColors[role.name] ?? 'text-foreground'} font-medium`}>
                        {role.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {role.permissions.join(', ')}
                      </TableCell>
                      <TableCell className="space-x-2 text-right">
                        {can('role.edit') && (
                          <Link href={`/roles-permissions/${role.id}/edit`}>
                            <Button variant="blue" size="icon" className="h-8 w-8" aria-label="Edit">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                        {can('role.delete') && (
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleDelete(role.id)}
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
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
