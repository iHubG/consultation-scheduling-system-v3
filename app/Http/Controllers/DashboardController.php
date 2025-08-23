<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\RecentActivity;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // 🚫 Block inactive users from accessing dashboard
        if (!$user || $user->status !== 'active') {
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
            $systemStats = [
                'totalUsers' => User::count(),
                'students' => User::whereHas('roles', fn ($q) => $q->where('name', 'student'))->count(),
                'faculty' => User::whereHas('roles', fn ($q) => $q->where('name', 'faculty'))->count(),
                // Uncomment these when ready to track consultations
                // 'activeConsultations' => Consultation::where('status', 'active')->count(),
                // 'completedToday' => Consultation::whereDate('completed_at', today())->count(),
                // 'pendingRequests' => Consultation::where('status', 'pending')->count(),
                'systemUptime' => 99.9, // Static value for now
                'monthlyGrowth' => 12.5, // Static value for now
            ];

            $recentActivity = RecentActivity::latest()->limit(10)->get();

            $props['systemStats'] = $systemStats;
            $props['recentActivity'] = $recentActivity;
        }

        return Inertia::render('dashboard', $props);
    }
}
