<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Models\ConsultationArea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Show a list of available consultations for students to request.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        // Fetch consultations that are:
        // - status 'pending'
        // - student_id is null (no student assigned yet)
        $query = Consultation::with('area', 'faculty')
            ->where('status', 'pending')
            ->whereNull('student_id');

        // Optional: filter by area
        if ($request->filled('area_id')) {
            $query->where('consultation_area_id', $request->input('area_id'));
        }

        // Optional: sort (latest/oldest)
        $sort = $request->query('sort', 'latest');
        if ($sort === 'oldest') {
            $query->orderBy('created_at', 'asc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $consultations = $query->paginate(10)->through(function ($consultation) {
            return [
                'id' => $consultation->id,
                'faculty_name' => $consultation->faculty->name ?? 'N/A',
                'student_name' => null, // explicitly null since student_id is null here
                'area' => [
                    'building' => $consultation->area->building ?? 'N/A',
                    'room' => $consultation->area->room ?? 'N/A',
                ],
                'date' => $consultation->date,
                'start_time' => $consultation->start_time,
                'duration' => $consultation->duration,
                'reason' => $consultation->reason,
                'status' => $consultation->status,
            ];
        });

        // Load consultation areas for filter dropdown if needed
        $areas = ConsultationArea::all();

        return Inertia::render('student/Request', [
            'consultations' => $consultations,
            'areas' => $areas,
            'filters' => [
                'area_id' => $request->input('area_id'),
                'sort' => $sort,
            ],
            'authUserRole' => $user->roles->pluck('name')->first() ?? 'student', // pass the role to frontend
        ]);
    }

    /**
     * Handle student's request to join a consultation.
     */
    public function requestToJoin(Consultation $consultation)
    {
        $user = Auth::user();

        if (!$user->hasRole('student')) {
            return redirect()->back()->with('error', 'Only students can request consultations.');
        }

        if ($consultation->student_id !== null) {
            return redirect()->back()->with('error', 'This consultation already has a student assigned.');
        }

        if ($consultation->status !== 'pending') {
            return redirect()->back()->with('error', 'You can only request consultations that are pending.');
        }

        // Assign the student to the consultation
        $consultation->update([
            'student_id' => $user->id,
        ]);

        return redirect()->back()->with('success', 'Consultation request submitted successfully.');
    }

    public function appointments(Request $request)
{
    $user = Auth::user();

    // Fetch consultations assigned to this student
    $query = Consultation::with('area', 'faculty')
        ->where('student_id', $user->id)
        ->orderBy('date', 'desc')
        ->orderBy('start_time', 'desc');

    // Optional filtering and sorting can be added here if needed

    $consultations = $query->paginate(10)->through(function ($consultation) {
        return [
            'id' => $consultation->id,
            'faculty_name' => $consultation->faculty->name ?? 'N/A',
            'area' => [
                'building' => $consultation->area->building ?? 'N/A',
                'room' => $consultation->area->room ?? 'N/A',
            ],
            'date' => $consultation->date,
            'start_time' => $consultation->start_time,
            'duration' => $consultation->duration,
            'reason' => $consultation->reason,
            'status' => $consultation->status,
        ];
    });

    return Inertia::render('student/Appointments', [
        'consultations' => $consultations,
        'authUserRole' => $user->roles->pluck('name')->first() ?? 'student',
    ]);
}

}
