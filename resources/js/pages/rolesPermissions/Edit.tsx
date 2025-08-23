import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';

type PageProps = {
    role: {
        id: number;
        name: string;
        permissions: string[];
    };
    permissions: string[];
};

export default function Edit({ role, permissions }: PageProps) {
    const form = useForm({
        name: role.name,
        permissions: role.permissions,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(`/roles-permissions/${role.id}`);
    };

    const togglePermission = (permission: string) => {
        const prev = form.data.permissions as string[]; // <-- get current value
        const updated = prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission];

        form.setData('permissions', updated); // <-- pass the actual array
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Roles & Permissions', href: '/roles-permissions' },
                { title: 'Edit Role', href: `/roles-permissions/${role.id}/edit` },
            ]}
        >
            <Card className="mx-auto mt-6 w-full">
                <CardHeader>
                    <CardTitle>Edit Role</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                Role Name
                            </label>
                            <Input id="name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
                            {form.errors.name && <p className="text-sm text-red-500">{form.errors.name}</p>}
                        </div>

                        <div className="mt-6">
                            <label className="mb-2 block text-sm font-medium">Permissions</label>
                            <div className="grid grid-cols-2 gap-2">
                                {permissions.map((permission) => (
                                    <div key={permission} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={permission}
                                            checked={form.data.permissions.includes(permission)}
                                            onCheckedChange={() => togglePermission(permission)}
                                        />
                                        <label htmlFor={permission} className="text-sm">
                                            {permission}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {form.errors.permissions && <p className="text-sm text-red-500">{form.errors.permissions}</p>}
                        </div>

                        <Button type="submit" className="mt-6" disabled={form.processing}>
                            Update Role
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
