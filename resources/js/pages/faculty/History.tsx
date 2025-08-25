import Pagination from '@/components/Pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Consultation, type Paginated } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Consultation History', href: '/faculty/history' }];

type PageProps = {
    consultations: Paginated<Consultation>;
    flash?: { success?: string; error?: string };
};

const formatDate = (d: string) => new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(d));
const formatTime = (t: string) => new Date(`1970-01-01T${t}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

export default function History() {
    const { flash, consultations } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Consultation History" />

            <Card className="mx-auto mt-6 w-full">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Consultation History</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    {consultations.data.length === 0 ? (
                        <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">No consultation history found.</div>
                    ) : (
                        <Table className="w-full text-sm">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Area</TableHead>
                                    <TableHead>Reason</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {consultations.data.map((c, i) => (
                                    <TableRow key={c.id}>
                                        <TableCell>{(consultations.current_page - 1) * consultations.per_page + i + 1}</TableCell>
                                        <TableCell>{c.student_name ?? 'No Student'}</TableCell>
                                        <TableCell>
                                            {c.area.building} — Room {c.area.room}
                                        </TableCell>
                                        <TableCell className="max-w-[120px] truncate" title={c.reason}>
                                            {c.reason}
                                        </TableCell>
                                        <TableCell>{formatDate(c.date)}</TableCell>
                                        <TableCell>{formatTime(c.start_time)}</TableCell>
                                        <TableCell className="flex items-center gap-3">
                                            <Badge
                                                variant={
                                                    c.status === 'approved'
                                                        ? 'active'
                                                        : c.status === 'declined'
                                                          ? 'destructive'
                                                          : c.status === 'completed'
                                                            ? 'active'
                                                            : 'secondary'
                                                }
                                            >
                                                {c.status}
                                            </Badge>

                                            {c.status === 'approved' && (
                                                <Button
                                                    size="xs"
                                                    className="text-xs p-1"
                                                    variant="blue"
                                                    onClick={() => router.post(`/consultations/${c.id}/complete`)}
                                                >
                                                    Mark as Completed
                                                </Button>
                                            )}
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
