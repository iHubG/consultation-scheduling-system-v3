import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Link, useForm, usePage } from '@inertiajs/react';

type PageProps = {
    roles: string[];
    permissions: string[];
};

const breadcrumbs = [
    { title: 'Users', href: '/users' },
    { title: 'Create', href: '/users/create' },
];

export default function Create() {
    const { roles, permissions } = usePage<PageProps>().props;

    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [] as string[],
        permissions: [] as string[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/users');
    };

    const toggleArrayValue = (field: 'roles' | 'permissions', value: string) => {
        const prev = form.data[field];
        const updated = prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
        form.setData(field, updated);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Card className="mx-auto mt-6 w-full">
                <CardHeader>
                    <CardTitle className="text-xl">Create User</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6 flex gap-5">
                        <div className="flex flex-col gap-8 w-[50%]">
                             {/* Name */}
                            <div>
                                <label htmlFor="name" className="mb-1 block font-semibold">
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={form.data.name}
                                    onChange={(e) => form.setData('name', e.target.value)}
                                    placeholder="Enter name"
                                />
                                {form.errors.name && <p className="mt-1 text-red-600">{form.errors.name}</p>}
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
                                {form.errors.email && <p className="mt-1 text-red-600">{form.errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="mb-1 block font-semibold">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={form.data.password}
                                    onChange={(e) => form.setData('password', e.target.value)}
                                    placeholder="Enter password"
                                />
                                {form.errors.password && <p className="mt-1 text-red-600">{form.errors.password}</p>}
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
                                    placeholder="Confirm password"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-8 w-[50%]">
                            {/* Roles */}
                            <div>
                                <label className="mb-2 block font-semibold">Roles</label>
                                <div className="flex flex-wrap gap-3">
                                    {roles.map((role) => (
                                        <label key={role} className="flex cursor-pointer items-center gap-2 select-none" htmlFor={`role-${role}`}>
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
                                        <label key={perm} className="flex cursor-pointer items-center gap-2 select-none" htmlFor={`perm-${perm}`}>
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
                                    Create User
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
