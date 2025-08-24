import { useForm} from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Pagination from '@/components/Pagination';
import AppLayout from '@/layouts/app-layout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { type BreadcrumbItem, type Consultation, type Paginated } from '@/types';
import { toast } from 'sonner';  

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Student Consultations', href: '/student/request' },
];

type PageProps = {
  consultations: Paginated<Consultation>;
  authUserRole: string;
};

export default function Request({ consultations, authUserRole }: PageProps) {
  const requestForm = useForm();

  const handleRequestToJoin = (id: number) => {
    if (confirm('Request to join this consultation?')) {
      requestForm.post(`/consultations/${id}/request-to-join`, {
        preserveScroll: true,
        onSuccess: () => toast.success('Requested consultation successfully.'),
        onError: () => toast.error('Unable to request consultation.'),
      });
    }
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

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Card className="mx-auto mt-6 w-full">
        <CardHeader>
          <CardTitle className="text-xl">Available Consultations</CardTitle>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <Table className="w-full text-sm">
            <TableHeader>
              <TableRow>
                <TableHead>Faculty</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consultations.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                    No consultations available at the moment.
                  </TableCell>
                </TableRow>
              ) : (
                consultations.data.map((consultation) => (
                  <TableRow key={consultation.id}>
                    <TableCell className="font-medium">{consultation.faculty_name}</TableCell>
                    <TableCell>
                      {consultation.area.building} | Room {consultation.area.room}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{consultation.reason}</TableCell>
                    <TableCell>{formatDate(consultation.date)}</TableCell>
                    <TableCell>{formatTime(consultation.start_time)}</TableCell>
                    <TableCell>{consultation.duration} mins</TableCell>
                    <TableCell className="capitalize">{consultation.status}</TableCell>
                    <TableCell className="text-right">
                      {authUserRole === 'student' &&
                      !consultation.student_name &&
                      consultation.status === 'pending' ? (
                        <Button
                          variant="blue"
                          size="sm"
                          onClick={() => handleRequestToJoin(consultation.id)}
                          disabled={requestForm.processing}
                        >
                          Request
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">
                          {consultation.student_name ? 'Already requested' : 'Unavailable'}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="mt-6 flex justify-center">
            <Pagination data={consultations} />
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
