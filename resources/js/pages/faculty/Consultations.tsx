import ConsultationsFilter from '@/components/ConsultationsFilter';
import Pagination from '@/components/Pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useCan from '@/hooks/useCan';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Consultation, type Paginated } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Faculty Consultations', href: '/faculty/consultations' }];

type PageProps = {
    consultations: Paginated<Consultation>;
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

const formatTime = (time24: string) =>
    new Date(`1970-01-01T${time24}`).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

export default function Consultations() {
    const { flash, consultations } = usePage<PageProps>().props;
    const { can } = useCan();
    const cellClass = 'align-center break-words whitespace-normal max-w-xs min-h-[3.5rem] ';

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this consultation?')) {
            router.delete(`/consultations/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Consultations" />

            <Card className="mx-auto mt-6 w-full">
                <CardHeader className="flex flex-col items-center justify-between gap-5 space-y-0 md:flex-row">
                    <CardTitle className="text-xl font-semibold">Consultations</CardTitle>
                    <div className="flex flex-col gap-5 md:flex-row">
                        <ConsultationsFilter />
                        {can('consultation.create') && (
                            <Link href="/consultations/create">
                                <Button size="sm" className="h-8">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Consultation
                                </Button>
                            </Link>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="overflow-x-auto">
                    {consultations.data.length === 0 ? (
                        <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">No consultations available yet.</div>
                    ) : (
                        <Table className="w-full text-sm">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Faculty</TableHead>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Area</TableHead>
                                    <TableHead>Reason</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {consultations.data.map((consultation, index) => (
                                    <TableRow key={consultation.id}>
                                        <TableCell className={cellClass}>
                                            {(consultations.current_page - 1) * consultations.per_page + index + 1}
                                        </TableCell>

                                        <TableCell className={cellClass}>{consultation.faculty_name}</TableCell>
                                        <TableCell className={cellClass}>{consultation.student_name ?? 'No Student Assigned Yet'}</TableCell>
                                        <TableCell className={cellClass}>
                                            {consultation.area?.building} — Room {consultation.area?.room}
                                        </TableCell>
                                        <TableCell className="max-w-[100px] truncate whitespace-nowrap" title={consultation.reason}>
                                            {consultation.reason}
                                        </TableCell>

                                        <TableCell className={cellClass}>{formatDate(consultation.date)}</TableCell>
                                        <TableCell className={cellClass}>{formatTime(consultation.start_time)}</TableCell>
                                        <TableCell className={cellClass}>{consultation.duration} mins</TableCell>
                                        <TableCell className={cellClass}>
                                            <Badge
                                                variant={
                                                    consultation.status === 'approved'
                                                        ? 'active'
                                                        : consultation.status === 'declined'
                                                          ? 'destructive'
                                                          : consultation.status === 'completed'
                                                            ? 'active'
                                                            : 'secondary'
                                                }
                                            >
                                                {consultation.status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="align-center min-h-[3.5rem] text-right">
                                            <div className="flex flex-wrap justify-end gap-2">
                                                {can('consultation.edit') && (
                                                    <Link href={`/consultations/${consultation.id}/edit`}>
                                                        <Button variant="blue" size="icon" className="h-8 w-8" aria-label="Edit">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                )}
                                                {can('consultation.delete') && (
                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => handleDelete(consultation.id)}
                                                        aria-label="Delete"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}

                    <div className="mt-6">{consultations && <Pagination data={consultations} />}</div>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
