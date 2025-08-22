import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const roles = ['admin', 'faculty', 'student'];

export default function SearchAndFilterUsers() {
    console.log('Page props:', usePage().props);

    const { filters = {} } = usePage<SharedData>().props;

    const normalizedFilters = Array.isArray(filters) ? {} : filters;

    const [search, setSearch] = useState(normalizedFilters.search || '');
    const [status, setStatus] = useState(normalizedFilters.status || '');
    const [role, setRole] = useState(normalizedFilters.role || '');
    const [sortOrder, setSortOrder] = useState(normalizedFilters.sort || '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                '/users',
                {
                    search,
                    status: status === 'all' ? '' : status,
                    role: role === 'all' ? '' : role,
                    sort: sortOrder === 'all' ? '' : sortOrder,
                },
                { preserveState: true, replace: true, preserveScroll: true },
            );
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, status, role, sortOrder]);
    return (
        <div className="flex flex-wrap gap-4">
            <Input className="w-[200px]" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} />

            <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="all">All</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Role</SelectLabel>
                        {roles.map((r) => (
                            <SelectItem key={r} value={r}>
                                {r.charAt(0).toUpperCase() + r.slice(1)}
                            </SelectItem>
                        ))}
                        <SelectItem value="all">All</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Sort</SelectLabel>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="latest">Latest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
