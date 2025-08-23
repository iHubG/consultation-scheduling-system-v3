import AreasFilters from '@/components/AreasFilters';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useCan from '@/hooks/useCan';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type ConsultationAreas, type Paginated } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Consultation Areas', href: '/consultation-areas' }];

type PageProps = {
    consultationAreas: Paginated<ConsultationAreas>;
    flash?: {
        success?: string;
        error?: string;
    };
};

const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(dateString));

export default function Index() {
    const { flash, consultationAreas } = usePage<PageProps>().props;
    const { can } = useCan();

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this consultation area?')) {
            router.delete(`/consultation-areas/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Consultation Areas" />

            <Card className="mx-auto mt-6 w-full">
                <CardHeader className="flex flex-row items-center justify-between gap-5 space-y-0">
                    <CardTitle className="text-xl font-semibold">Consultation Areas</CardTitle>
                    <div className="flex flex-col gap-5 md:flex-row">
                        <AreasFilters />
                        {can('area.create') && (
                            <Link href="/consultation-areas/create">
                                <Button size="sm" className="h-8">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Area
                                </Button>
                            </Link>
                        )}
                    </div>
                </CardHeader>

                <CardContent>
                    {consultationAreas.data.length === 0 ? (
                        <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
                            No consultation areas have been created yet.
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {consultationAreas.data.map((area) => (
                                <Card key={area.id} className="bg-purple-100">
                                    <CardHeader>
                                        <CardTitle className="text-base">
                                            Building: <span className="font-medium">{area.building}</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            Room: <span className="font-medium">{area.room}</span>
                                        </p>
                                        <p className="mt-2 text-xs text-muted-foreground">Created: {formatDate(area.created_at)}</p>
                                        <p className="text-xs text-muted-foreground">Updated: {formatDate(area.updated_at)}</p>
                                        <div className="mt-4 flex space-x-2">
                                            {can('area.edit') && (
                                                <Link href={`/consultation-areas/${area.id}/edit`}>
                                                    <Button variant="blue" size="icon" className="h-8 w-8" aria-label="Edit">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            )}
                                            {can('area.delete') && (
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => handleDelete(area.id)}
                                                    aria-label="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                    <div className="mt-6">{consultationAreas && <Pagination data={consultationAreas} />}</div>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
