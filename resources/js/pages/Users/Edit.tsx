import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import AppLayout from '@/layouts/app-layout';
import { Link, useForm, usePage } from '@inertiajs/react';

type PageProps = {
    user: {
        id: number;
        name: string;
        email: string;
        status: string;
        roles: string[];
        permissions: string[];
    };
    roles: string[];
    permissions: string[];
};

const breadcrumbs = [
    { title: 'Users', href: '/users' },
    { title: 'Edit', href: '#' },
];

export default function Edit() {
    const { user, roles, permissions } = usePage<PageProps>().props;

    const form = useForm({
        name: user.name || '',
        email: user.email || '',
        status: user.status || 'inactive',
        password: '',
        password_confirmation: '',
        roles: user.roles || [],
        permissions: user.permissions || [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(`/users/${user.id}`);
    };

    const toggleArrayValue = (field: 'roles' | 'permissions', value: string) => {
        const current = form.data[field];
        const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
        form.setData(field, updated);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Card className="mx-auto mt-6 w-full">
                <CardHeader>
                    <CardTitle className="text-xl">Edit User</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex gap-5 space-y-6">
                        <div className="flex w-[50%] flex-col gap-8">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="mb-1 block font-semibold">
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    value={form.data.name}
                                    onChange={(e) => form.setData('name', e.target.value)}
                                    placeholder="Enter name"
                                />
                                {form.errors.name && <p className="text-sm text-red-500">{form.errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="mb-1 block font-semibold">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={form.data.email}
                                    onChange={(e) => form.setData('email', e.target.value)}
                                    placeholder="Enter email"
                                />
                                {form.errors.email && <p className="text-sm text-red-500">{form.errors.email}</p>}
                            </div>

                            {/* Status */}
                            <div>
                                <label htmlFor="status" className="mb-1 block font-semibold">
                                    Status
                                </label>
                                <Select value={form.data.status} onValueChange={(value) => form.setData('status', value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.errors.status && <p className="text-sm text-red-500">{form.errors.status}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="mb-1 block font-semibold">
                                    Password (optional)
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={form.data.password}
                                    onChange={(e) => form.setData('password', e.target.value)}
                                    placeholder="Leave blank to keep current password"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="password_confirmation" className="mb-1 block font-semibold">
                                    Confirm Password
                                </label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={form.data.password_confirmation}
                                    onChange={(e) => form.setData('password_confirmation', e.target.value)}
                                    placeholder="Confirm new password"
                                />
                            </div>
                        </div>

                        <div className="flex w-[50%] flex-col gap-8">
                            {/* Roles */}
                            <div>
                                <label className="mb-2 block font-semibold">Roles</label>
                                <div className="flex flex-wrap gap-3">
                                    {roles.map((role) => (
                                        <label key={role} htmlFor={`role-${role}`} className="flex cursor-pointer items-center gap-2 select-none">
                                            <Checkbox
                                                id={`role-${role}`}
                                                checked={form.data.roles.includes(role)}
                                                onCheckedChange={() => toggleArrayValue('roles', role)}
                                            />
                                            <span>{role}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Permissions */}
                            <div>
                                <label className="mb-2 block font-semibold">Permissions</label>
                                <div className="flex flex-wrap gap-3">
                                    {permissions.map((perm) => (
                                        <label key={perm} htmlFor={`perm-${perm}`} className="flex cursor-pointer items-center gap-2 select-none">
                                            <Checkbox
                                                id={`perm-${perm}`}
                                                checked={form.data.permissions.includes(perm)}
                                                onCheckedChange={() => toggleArrayValue('permissions', perm)}
                                            />
                                            <span>{perm}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <Button type="submit" disabled={form.processing}>
                                    Update User
                                </Button>
                                <Link href="/users">
                                    <Button variant="outline">Cancel</Button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
