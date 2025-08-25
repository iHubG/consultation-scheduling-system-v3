import Pagination from '@/components/Pagination';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Consultation, type Paginated } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'My Appointments', href: '/student/appointments' }];

type PageProps = {
    consultations: Paginated<Consultation>;
};

const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(dateString));

const formatTime = (time: string) =>
    new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

export default function Appointments() {
    const { consultations } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Appointments" />

            <Card className="mx-auto mt-6 w-full">
                <CardHeader>
                    <CardTitle className="text-xl">My Appointments</CardTitle>
                </CardHeader>

                <CardContent className="overflow-x-auto">
                    <Table className="w-full text-sm">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Faculty</TableHead>
                                <TableHead>Area</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {consultations.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                                        You have no consultations yet.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                consultations.data.map((consultation) => (
                                    <TableRow key={consultation.id}>
                                        <TableCell className="font-medium">{consultation.faculty_name}</TableCell>
                                        <TableCell>
                                            {consultation.area.building} | Room {consultation.area.room}
                                        </TableCell>
                                        <TableCell>{formatDate(consultation.date)}</TableCell>
                                        <TableCell>{formatTime(consultation.start_time)}</TableCell>
                                        <TableCell>{consultation.duration} mins</TableCell>
                                        <TableCell className="break-words whitespace-normal text-muted-foreground">{consultation.reason}</TableCell>
                                        <TableCell>
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
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    <div className="mt-6">{consultations && <Pagination data={consultations} />}</div>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
