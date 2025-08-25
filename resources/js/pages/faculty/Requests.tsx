import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Consultation, type Paginated } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Consultation Requests', href: '/faculty/requests' }];

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

export default function ConsultationRequests() {
  const { flash, consultations } = usePage<PageProps>().props;

  useEffect(() => {
    if (flash?.success) toast.success(flash.success);
    if (flash?.error) toast.error(flash.error);
  }, [flash]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Consultation Requests" />

      <Card className="mx-auto mt-6 w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Pending Requests</CardTitle>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          {consultations.data.length === 0 ? (
            <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
              No pending consultation requests.
            </div>
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
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {consultations.data.map((consultation, index) => (
                  <TableRow key={consultation.id}>
                    <TableCell>{(consultations.current_page - 1) * consultations.per_page + index + 1}</TableCell>
                    <TableCell>{consultation.student_name ?? 'No Student'}</TableCell>
                    <TableCell>{consultation.area?.building} — Room {consultation.area?.room}</TableCell>
                    <TableCell className="max-w-[120px] truncate" title={consultation.reason}>
                      {consultation.reason}
                    </TableCell>
                    <TableCell>{formatDate(consultation.date)}</TableCell>
                    <TableCell>{formatTime(consultation.start_time)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="blue"
                          onClick={() => router.post(`/consultations/${consultation.id}/approve`)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => router.post(`/consultations/${consultation.id}/decline`)}
                        >
                          Decline
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </AppLayout>
  );
}
