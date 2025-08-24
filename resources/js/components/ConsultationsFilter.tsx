import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';


export default function ConsultationsFilter() {

    const { filters = {} } = usePage<SharedData>().props;

    const normalizedFilters = Array.isArray(filters) ? {} : filters;

    const [sortOrder, setSortOrder] = useState(normalizedFilters.sort || '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                '/consultations',
                {
                    sort: sortOrder === 'all' ? '' : sortOrder,
                },
                { preserveState: true, replace: true, preserveScroll: true },
            );
        }, 300);

        return () => clearTimeout(timeout);
    }, [sortOrder]);
    return (
        <div className="flex flex-wrap gap-4">

            <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Sort</SelectLabel>
                        <SelectItem value="latest">Latest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
