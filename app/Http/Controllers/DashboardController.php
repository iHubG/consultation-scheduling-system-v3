<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Consultation;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user->hasRole('admin')) {
            abort(403);
        }

        $systemStats = [
            'totalUsers' => User::count(),
            'students' => User::whereHas('roles', fn ($q) => $q->where('name', 'student'))->count(),
            'faculty' => User::whereHas('roles', fn ($q) => $q->where('name', 'faculty'))->count(),
            // 'activeConsultations' => Consultation::where('status', 'active')->count(),
            // 'completedToday' => Consultation::whereDate('completed_at', today())->count(),
            // 'pendingRequests' => Consultation::where('status', 'pending')->count(),
            'systemUptime' => 99.9, // Static for now
            'monthlyGrowth' => 12.5, // Placeholder, or calculate based on user growth
        ];

        $recentActivity = [
            ['id' => 1, 'action' => 'New student registration', 'user' => 'John Doe', 'time' => '2 min ago', 'type' => 'user'],
            ['id' => 2, 'action' => 'Consultation completed', 'user' => 'Dr. Smith', 'time' => '15 min ago', 'type' => 'consultation'],
            ['id' => 3, 'action' => 'System settings updated', 'user' => 'Admin', 'time' => '1 hour ago', 'type' => 'system'],
            ['id' => 4, 'action' => 'New consultation area created', 'user' => 'Admin', 'time' => '2 hours ago', 'type' => 'area'],
        ];

        return Inertia::render('dashboard', [
            'role' => 'admin',
            'systemStats' => $systemStats,
            'recentActivity' => $recentActivity,
        ]);
    }
}

