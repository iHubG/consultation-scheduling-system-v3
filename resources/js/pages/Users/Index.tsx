import { Link, router, usePage } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import Pagination from '@/components/Pagination';
import SearchUsers from '@/components/SearchUsers';
import FilterUsers from '@/components/FilterUsers';
import useCan from '@/hooks/useCan';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Paginated, type User } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Users', href: '/users' },
];

type PageProps = {
  users: Paginated<User>;
  flash?: {
    success?: string;
    error?: string;
  };
};

const USE_FAKE_LOADING = false;

export default function Index() {
  const { users: initialUsers, flash } = usePage<PageProps>().props;
  const { can } = useCan();

  const [users, setUsers] = useState<Paginated<User> | null>(USE_FAKE_LOADING ? null : initialUsers);
  const [loading, setLoading] = useState(USE_FAKE_LOADING);

  useEffect(() => {
    if (flash?.success) toast.success(flash.success);
    if (flash?.error) toast.error(flash.error);
  }, [flash]);

  useEffect(() => {
    if (!USE_FAKE_LOADING) return;

    const timer = setTimeout(() => {
      setUsers(initialUsers);
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, [initialUsers]);

  const deleteUser = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      router.delete(`/users/${id}`);
    }
  };

  type RoleType = 'admin' | 'faculty' | 'student';

  const roleStyles: Record<RoleType, string> = {
    admin: 'bg-red-100 text-red-800',
    faculty: 'bg-blue-100 text-blue-800',
    student: 'bg-green-100 text-green-800',
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Card className="mx-auto mt-6 w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-5">
          <CardTitle className="text-xl">Users</CardTitle>
          <SearchUsers  />
          <FilterUsers />
          {can('user.create') && (
            <Link href="/users/create">
              <Button variant="default" size="icon" aria-label="Create User">
                <Plus className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <Table className="w-full text-sm">
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading || !users ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <TableCell key={i}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                users.data.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'active' ? 'active' : 'destructive'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.roles?.map((role, i) => (
                        <Badge
                          key={i}
                          variant="default"
                          className={roleStyles[role as RoleType] ?? 'bg-gray-100 text-gray-800'}
                        >
                          {role}
                        </Badge>
                      )) ?? ''}
                    </TableCell>
                    <TableCell className="break-words whitespace-normal text-muted-foreground">
                      {user.permissions?.join(', ') ?? ''}
                    </TableCell>
                    <TableCell className="space-x-2 text-right">
                      {can('user.edit') && (
                        <Link href={`/users/${user.id}/edit`}>
                          <Button variant="blue" size="icon" className="h-8 w-8" aria-label="Edit">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      {can('user.delete') && (
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => deleteUser(user.id)}
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="mt-6">
            {users && <Pagination data={users} />}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
