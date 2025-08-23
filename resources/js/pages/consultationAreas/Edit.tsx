import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';

type PageProps = {
    consultationArea: {
        id: number;
        building: string;
        room: string;
    };
};

export default function Edit({ consultationArea }: PageProps) {
    const form = useForm({
        building: consultationArea.building,
        room: consultationArea.room,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(`/consultation-areas/${consultationArea.id}`);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Consultation Areas', href: '/consultation-areas' },
                { title: 'Edit Consultation Area', href: `/consultation-areas/${consultationArea.id}/edit` },
            ]}
        >
            <Card className="mx-auto mt-6 w-full">
                <CardHeader>
                    <CardTitle>Update Consultation Area</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label htmlFor="building_name" className="text-sm font-medium">
                                Building Name
                            </label>
                            <Input
                                id="building_name"
                                type="text"
                                value={form.data.building}
                                onChange={(e) => form.setData('building', e.target.value)}
                                placeholder="Enter building name"
                            />
                            {form.errors.building && <p className="text-sm text-red-500">{form.errors.building}</p>}
                        </div>

                        <div className="space-y-2 mt-6">
                            <label htmlFor="room_name" className="text-sm font-medium">
                                Room Name
                            </label>
                            <Input
                                id="room_name"
                                type="text"
                                value={form.data.room}
                                onChange={(e) => form.setData('room', e.target.value)}
                                placeholder="Enter room name"
                            />
                            {form.errors.room && <p className="text-sm text-red-500">{form.errors.room}</p>}
                        </div>

                        <Button type="submit" className="mt-6" disabled={form.processing}>
                            Update Consultation Area
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
