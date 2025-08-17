import { useForm, Link, usePage } from '@inertiajs/react';

export default function Edit() {
    type PageProps = {
        user: {
            id: number;
            name: string;
            email: string;
            roles: string[];
            permissions: string[];
        };
        roles: string[];
        permissions: string[];
    };

    const { user, roles, permissions } = usePage<PageProps>().props;

    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
        roles: user.roles || [],
        permissions: user.permissions || [],
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/users/${user.id}`);
    }

    function toggleArrayValue(field: 'roles' | 'permissions', value: string) {
        setData(field, data[field].includes(value)
            ? data[field].filter(v => v !== value)
            : [...data[field], value]);
    }

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Edit User</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="border w-full p-2"
                    />
                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className="border w-full p-2"
                    />
                    {errors.email && <div className="text-red-500">{errors.email}</div>}
                </div>

                <div>
                    <label>Password (leave blank to keep current)</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        className="border w-full p-2"
                    />
                </div>

                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={e => setData('password_confirmation', e.target.value)}
                        className="border w-full p-2"
                    />
                </div>

                <div>
                    <label>Roles</label>
                    <div className="flex flex-wrap gap-2">
                        {roles.map((role: string) => (
                            <label key={role} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    checked={data.roles.includes(role)}
                                    onChange={() => toggleArrayValue('roles', role)}
                                />
                                {role}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label>Permissions</label>
                    <div className="flex flex-wrap gap-2">
                        {permissions.map((perm: string) => (
                            <label key={perm} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    checked={data.permissions.includes(perm)}
                                    onChange={() => toggleArrayValue('permissions', perm)}
                                />
                                {perm}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Update
                    </button>
                    <Link href="/users" className="px-4 py-2 bg-gray-500 text-white rounded">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
