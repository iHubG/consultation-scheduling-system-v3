import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, usePage } from '@inertiajs/react';
import { Calendar, ClipboardCheck, Clock} from 'lucide-react';
import { type SharedData } from '@/types';

export default function FacultyDashboard() {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen space-y-6 bg-gray-50 p-6 dark:bg-gray-900">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome, {auth.user.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your schedule and consultations with students.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-blue-500" />
                            Manage Schedule
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            Set your available consultation slots.
                        </p>
                        <Link href="/faculty/schedule">
                            <Button className="w-full">Set Schedule</Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ClipboardCheck className="h-5 w-5 text-purple-500" />
                            Consultation Requests
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            Approve or decline student requests.
                        </p>
                        <Link href="/faculty/requests">
                            <Button className="w-full" variant="outline">Manage Requests</Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-orange-500" />
                            Consultation History
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            Review your completed and upcoming consultations.
                        </p>
                        <Link href="/faculty/history">
                            <Button className="w-full" variant="outline">View History</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
