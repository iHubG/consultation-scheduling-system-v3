<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Inertia::share([
            'auth' => fn () => [
                'user' => Auth::check() ? Auth::user() : null,
            ],

            'notifications' => fn () => Auth::check()
                ? Auth::user()->unreadNotifications->map(function ($notification) {
                    return [
                        'id' => $notification->id,
                        'title' => $notification->data['title'] ?? '',
                        'description' => $notification->data['description'] ?? '',
                        'time' => $notification->created_at->diffForHumans(),
                        'link' => $notification->data['link'] ?? null,
                    ];
                })
                : [],
        ]);
    }
}
