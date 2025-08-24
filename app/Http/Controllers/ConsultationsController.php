<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Models\ConsultationArea;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ConsultationsController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $sort = $request->query('sort');

        $query = Consultation::with(['area', 'student', 'faculty']);

        // Filter by student
        if ($user->hasRole('student')) {
            $query->where('student_id', $user->id);
        }

        // Optional filter: area
        if ($request->filled('area_id')) {
            $query->where('consultation_area_id', $request->area_id);
        }

        switch ($sort) {
            case 'latest':
                $query->orderBy('created_at', 'desc');
                break;
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        return Inertia::render('consultations/Index', [
            'consultations' => $query->paginate(10)->through(fn($consultation) => [
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
            ])->withQueryString(),

            'filters' => [
                'sort' => $sort,
            ],
        ]);
    }


    public function create()
    {
        $areas = ConsultationArea::all();
        $faculty = User::whereHas('roles', function ($q) {
            $q->where('name', 'faculty');
        })->get(['id', 'name']);

        return Inertia::render('consultations/Create', [
            'areas' => $areas,
            'faculty' => $faculty,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'faculty_id' => 'required|exists:users,id',
            'consultation_area_id' => 'required|exists:consultation_areas,id',
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'duration' => 'required|integer|min:10|max:60',
            'reason' => 'required|string|max:1000',
        ]);

        Consultation::create([
            'faculty_id' => $request->faculty_id,
            'consultation_area_id' => $request->consultation_area_id,
            'date' => $request->date,
            'start_time' => $request->start_time,
            'duration' => $request->duration,
            'reason' => $request->reason,
            'status' => 'pending',
        ]);

        return redirect()->route('consultations.index')->with('success', 'Consultation request submitted.');
    }

    public function edit(Consultation $consultation)
    {
        $this->authorize('edit', $consultation);

        return Inertia::render('consultations/Edit', [
            'consultation' => $consultation->load('area', 'faculty', 'student'),
        ]);
    }

    public function update(Request $request, Consultation $consultation)
    {
        $this->authorize('edit', $consultation);

        $request->validate([
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'duration' => 'required|integer|min:10|max:60',
            'reason' => 'required|string|max:1000',
        ]);

        $consultation->update([
            'date' => $request->date,
            'start_time' => $request->start_time,
            'duration' => $request->duration,
            'reason' => $request->reason,
        ]);

        return redirect()->route('consultations.index')->with('success', 'Consultation updated.');
    }

    public function destroy(Consultation $consultation)
    {
        $this->authorize('delete', $consultation);

        $consultation->delete();

        return redirect()->back()->with('success', 'Consultation deleted.');
    }

    public function approve(Consultation $consultation)
    {
        $this->authorize('approve', $consultation);

        $consultation->update([
            'status' => 'approved',
        ]);

        return redirect()->back()->with('success', 'Consultation approved.');
    }

    public function decline(Consultation $consultation)
    {
        $this->authorize('approve', $consultation);

        $consultation->update(['status' => 'declined']);

        return redirect()->back()->with('success', 'Consultation declined.');
    }

    public function requestToJoin(Consultation $consultation)
    {
        $user = Auth::user();

        if ($user->hasRole('student') && is_null($consultation->student_id) && $consultation->status === 'pending') {
            $consultation->update([
                'student_id' => $user->id,
                'status' => 'pending', 
            ]);

            return redirect()->back()->with('success', 'Requested consultation successfully.');
        }

        return redirect()->back()->with('error', 'Unable to request consultation.');
    }
}
