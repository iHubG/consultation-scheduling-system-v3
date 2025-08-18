<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // 🚫 Block inactive users from dashboard
        if ($user->status !== 'active') {
            Auth::logout();
            return redirect()->route('login')->with('status', 'Your account is pending approval.');
        }

        $props = [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roles' => $user->getRoleNames(),
                ],
            ],
        ];

        if ($user->hasRole('admin')) {
            // ✅ You can implement these later
            $systemStats = [
                'totalUsers' => User::count(),
                'students' => User::whereHas('roles', fn ($q) => $q->where('name', 'student'))->count(),
                'faculty' => User::whereHas('roles', fn ($q) => $q->where('name', 'faculty'))->count(),
                // 'activeConsultations' => Consultation::where('status', 'active')->count(),
                // 'completedToday' => Consultation::whereDate('completed_at', today())->count(),
                // 'pendingRequests' => Consultation::where('status', 'pending')->count(),
                'systemUptime' => 99.9,
                'monthlyGrowth' => 12.5,
            ];

            $recentActivity = [
                ['id' => 1, 'action' => 'New student registration', 'user' => 'John Doe', 'time' => '2 min ago', 'type' => 'user'],
                ['id' => 2, 'action' => 'Consultation completed', 'user' => 'Dr. Smith', 'time' => '15 min ago', 'type' => 'consultation'],
                ['id' => 3, 'action' => 'System settings updated', 'user' => 'Admin', 'time' => '1 hour ago', 'type' => 'system'],
                ['id' => 4, 'action' => 'New consultation area created', 'user' => 'Admin', 'time' => '2 hours ago', 'type' => 'area'],
            ];

            // Pass them to frontend
            $props['systemStats'] = $systemStats;
            $props['recentActivity'] = $recentActivity;
        }

        return Inertia::render('dashboard', $props);
    }
}
