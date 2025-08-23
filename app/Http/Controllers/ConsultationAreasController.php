<?php

namespace App\Http\Controllers;

use App\Models\ConsultationArea;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RecentActivity;
use Illuminate\Support\Facades\Auth;

class ConsultationAreasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sort = $request->query('sort');

        $query = ConsultationArea::query();

        switch ($sort) {
            case 'name':
                $query->orderBy('building')->orderBy('room');
                break;
            case 'latest':
                $query->latest();
                break;
            case 'oldest':
                $query->oldest();
                break;
        }

        $consultationAreas = $query->paginate(10)->withQueryString();

        return Inertia::render('consultationAreas/Index', [
            'consultationAreas' => $consultationAreas,
            'filters' => [
                'sort' => $sort,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('consultationAreas/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'building' => 'required|string|max:255',
            'room' => 'required|string|max:255',
        ]);

        $area = ConsultationArea::create($validated);

        RecentActivity::create([
            'action' => 'Created consultation area: ' . $area->building . ' ' . $area->room,
            'user' => Auth::user()?->name ?? 'System',
            'type' => 'area',
        ]);

        return redirect()->route('consultation-areas.index')
            ->with('success', 'Consultation area created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $area = ConsultationArea::findOrFail($id);

        return Inertia::render('consultationAreas/Edit', [
            'consultationArea' => $area,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $area = ConsultationArea::findOrFail($id);

        $validated = $request->validate([
            'building' => 'required|string|max:255',
            'room' => 'required|string|max:255',
        ]);

        $area->update($validated);

        RecentActivity::create([
            'action' => 'Updated consultation area: ' . $area->building . ' ' . $area->room,
            'user' => Auth::user()?->name ?? 'System',
            'type' => 'area',
        ]);

        return redirect()->route('consultation-areas.index')
            ->with('success', 'Consultation area updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $area = ConsultationArea::findOrFail($id);
        $areaName = $area->building . ' ' . $area->room;

        $area->delete();

        RecentActivity::create([
            'action' => 'Deleted consultation area: ' . $areaName,
            'user' => Auth::user()?->name ?? 'System',
            'type' => 'area',
        ]);

        return redirect()->route('consultation-areas.index')
            ->with('success', 'Consultation area deleted successfully.');
    }
}
