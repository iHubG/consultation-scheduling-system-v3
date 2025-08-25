<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Consultation;

class FacultyController extends Controller
{
    //
    public function index(Request $request)
    {
        $user = Auth::user();

        // Ensure this is only accessible to faculty (optional extra guard)
        if (!$user->hasRole('faculty')) {
            abort(403, 'Unauthorized');
        }

        $sort = $request->query('sort');

        $query = Consultation::with(['area', 'student', 'faculty'])
            ->where('faculty_id', $user->id); // 🔒 Only this faculty's consultations

        switch ($sort) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        $consultations = $query->paginate(10)->through(fn($consultation) => [
            'id' => $consultation->id,
            'date' => $consultation->date,
            'start_time' => $consultation->start_time,
            'duration' => $consultation->duration,
            'reason' => $consultation->reason,
            'status' => $consultation->status,
            'area' => [
                'building' => $consultation->area->building,
                'room' => $consultation->area->room,
            ],
            'faculty_name' => $consultation->faculty?->name,
            'student_name' => $consultation->student?->name,
        ])->withQueryString();

        return Inertia::render('faculty/Consultations', [
            'consultations' => $consultations,
            'filters' => [
                'sort' => $sort,
            ],
        ]);
    }

    public function requests(Request $request)
    {
        $user = Auth::user();

        $consultations = Consultation::with(['area', 'student'])
            ->where('faculty_id', $user->id)
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(fn($consultation) => [
                'id' => $consultation->id,
                'date' => $consultation->date,
                'start_time' => $consultation->start_time,
                'duration' => $consultation->duration,
                'reason' => $consultation->reason,
                'student_name' => $consultation->student?->name,
                'area' => [
                    'building' => $consultation->area->building,
                    'room' => $consultation->area->room,
                ],
            ]);

        return Inertia::render('faculty/Requests', [
            'consultations' => $consultations,
        ]);
    }

    public function history(Request $request)
    {
        $user = Auth::user();

        $consultations = Consultation::with(['area', 'student'])
            ->where('faculty_id', $user->id)
            ->whereIn('status', ['approved', 'declined', 'completed']) // adjust based on your statuses
            ->orderBy('date', 'desc')
            ->paginate(10)
            ->through(fn($consultation) => [
                'id' => $consultation->id,
                'date' => $consultation->date,
                'start_time' => $consultation->start_time,
                'duration' => $consultation->duration,
                'reason' => $consultation->reason,
                'status' => $consultation->status,
                'student_name' => $consultation->student?->name,
                'area' => [
                    'building' => $consultation->area->building,
                    'room' => $consultation->area->room,
                ],
            ]);

        return Inertia::render('faculty/History', [
            'consultations' => $consultations,
        ]);
    }



}
