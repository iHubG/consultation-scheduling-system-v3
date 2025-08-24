import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';

type Faculty = {
    id: number;
    name: string;
};

type Area = {
    id: number;
    building: string;
    room: string;
};

type PageProps = {
    faculty: Faculty[];
    areas: Area[];
};

export default function Create({ faculty, areas }: PageProps) {
    const form = useForm({
        faculty_id: '',
        consultation_area_id: '',
        date: '',
        start_time: '',
        duration: '',
        reason: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/consultations');
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Consultations', href: '/consultations' },
                { title: 'Create Consultation', href: '/consultations/create' },
            ]}
        >
            <Card className="mx-auto mt-6 w-full">
                <CardHeader>
                    <CardTitle>Create Consultation</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Faculty */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Faculty</label>
                            <Select value={form.data.faculty_id} onValueChange={(value) => form.setData('faculty_id', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select faculty" />
                                </SelectTrigger>
                                <SelectContent>
                                    {faculty.map((f) => (
                                        <SelectItem key={f.id} value={String(f.id)}>
                                            {f.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.errors.faculty_id && <p className="text-sm text-red-500">{form.errors.faculty_id}</p>}
                        </div>

                        {/* Area */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Consultation Area</label>
                            <Select value={form.data.consultation_area_id} onValueChange={(value) => form.setData('consultation_area_id', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select consultation area" />
                                </SelectTrigger>
                                <SelectContent>
                                    {areas.map((area) => (
                                        <SelectItem key={area.id} value={String(area.id)}>
                                            {area.building} - {area.room}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.errors.consultation_area_id && <p className="text-sm text-red-500">{form.errors.consultation_area_id}</p>}
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Date</label>
                            <Input type="date" value={form.data.date} onChange={(e) => form.setData('date', e.target.value)} />
                            {form.errors.date && <p className="text-sm text-red-500">{form.errors.date}</p>}
                        </div>

                        {/* Start Time */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Start Time</label>
                            <Input type="time" value={form.data.start_time} onChange={(e) => form.setData('start_time', e.target.value)} />
                            {form.errors.start_time && <p className="text-sm text-red-500">{form.errors.start_time}</p>}
                        </div>

                        {/* Duration */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Duration (minutes)</label>
                            <Input
                                type="number"
                                min={10}
                                max={60}
                                value={form.data.duration}
                                onChange={(e) => form.setData('duration', e.target.value)}
                                placeholder="Enter duration in minutes"
                            />
                            {form.errors.duration && <p className="text-sm text-red-500">{form.errors.duration}</p>}
                        </div>

                        {/* Reason */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Reason for Consultation</label>
                            <Textarea
                                rows={4}
                                value={form.data.reason}
                                onChange={(e) => form.setData('reason', e.target.value)}
                                placeholder="Briefly explain the reason for this consultation"
                            />
                            {form.errors.reason && <p className="text-sm text-red-500">{form.errors.reason}</p>}
                        </div>

                        <Button type="submit" disabled={form.processing}>
                            Submit Consultation Request
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
