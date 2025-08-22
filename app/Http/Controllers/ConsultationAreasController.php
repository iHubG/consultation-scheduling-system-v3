<?php

namespace App\Http\Controllers;

use App\Models\ConsultationArea;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConsultationAreasController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('permission:area.view', ['only' => ['index']]);
    //     $this->middleware('permission:area.create', ['only' => ['create', 'store']]);
    //     $this->middleware('permission:area.edit', ['only' => ['edit', 'update']]);
    //     $this->middleware('permission:area.delete', ['only' => ['destroy']]);
    // }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $consultationAreas = ConsultationArea::paginate(10);

        return Inertia::render('consultationAreas/Index', [
            'consultationAreas' => $consultationAreas,
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

        ConsultationArea::create($validated);

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

        return redirect()->route('consultation-areas.index')
            ->with('success', 'Consultation area updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $area = ConsultationArea::findOrFail($id);

        $area->delete();

        return redirect()->route('consultation-areas.index')
            ->with('success', 'Consultation area deleted successfully.');
    }
}
