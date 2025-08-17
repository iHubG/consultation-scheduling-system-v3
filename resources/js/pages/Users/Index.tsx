import { Link, usePage, router } from '@inertiajs/react';
import useCan from '@/hooks/useCan';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Index() {
    type User = {
        id: number;
        name: string;
        email: string;
        roles: string[];
        permissions: string[];
    };

    type PageProps = {
        users: {
            data: User[];
        };
    };

    const { users } = usePage<PageProps>().props;
    const { can } = useCan();

    function deleteUser(id: number) {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(`/users/${id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Users</h1>
                {can('user.create') && (
                    <Link
                        href="/users/create"
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Create User
                    </Link>
                )}
            </div>

            <table className="w-full border-collapse border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Roles</th>
                        <th className="border px-4 py-2">Permissions</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.data.map((user: User) => (
                        <tr key={user.id}>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.roles.join(', ')}</td>
                            <td className="border px-4 py-2">{user.permissions.join(', ')}</td>
                            <td className="border px-4 py-2 space-x-2">
                                {can('user.edit') && (
                                    <Link
                                        href={`/users/${user.id}/edit`}
                                        className="px-2 py-1 bg-yellow-500 text-white rounded"
                                    >
                                        Edit
                                    </Link>
                                )}
                                {can('user.delete') && (
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="px-2 py-1 bg-red-600 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </AppLayout>
    );
}
