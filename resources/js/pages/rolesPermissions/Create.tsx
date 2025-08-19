import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';

type PageProps = {
  permissions: string[];
};

export default function Create({ permissions }: PageProps) {
  const form = useForm({
    name: '',
    permissions: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post('/roles-permissions');
  };

  const togglePermission = (permission: string) => {
    const prev = form.data.permissions as string[];
    const updated = prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission];
    form.setData('permissions', updated);
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Roles & Permissions', href: '/roles-permissions' },  { title: 'Create Role', href: `/roles-permissions/create` },]}>
      <Card className="mx-auto mt-6 w-full">
        <CardHeader>
          <CardTitle>Create Role</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Role Name
              </label>
              <Input
                id="name"
                type="text"
                value={form.data.name}
                onChange={(e) => form.setData('name', e.target.value)}
                placeholder="Enter role name"
              />
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
              Create Role
            </Button>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
