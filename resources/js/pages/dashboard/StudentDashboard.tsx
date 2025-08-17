import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, usePage } from '@inertiajs/react';
import { ClipboardList, CalendarPlus, Users } from 'lucide-react';
import { type SharedData } from '@/types';

export default function StudentDashboard() {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen space-y-6 bg-gray-50 p-6 dark:bg-gray-900">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome, {auth.user.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your consultations and explore available faculty.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarPlus className="h-5 w-5 text-blue-500" />
                            Request Consultation
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            Schedule a consultation with your preferred faculty member.
                        </p>
                        <Link href="/consultations/request">
                            <Button className="w-full">Start Request</Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ClipboardList className="h-5 w-5 text-purple-500" />
                            View Consultation Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            Track your upcoming and completed consultations.
                        </p>
                        <Link href="/consultations/status">
                            <Button className="w-full" variant="outline">View Status</Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-green-500" />
                            Browse Faculty & Areas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            Explore faculty members and their consultation specialties.
                        </p>
                        <Link href="/consultation-areas">
                            <Button className="w-full" variant="outline">Explore</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
