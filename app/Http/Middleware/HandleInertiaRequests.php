<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => [
                'message' => trim($message), 
                'author' => trim($author)
            ],

            // ✅ Pass auth user info with roles & permissions
            'auth' => [
                'user' => fn () => $request->user()
                    ? [
                        'id' => $request->user()->id,
                        'name' => $request->user()->name,
                        'email' => $request->user()->email,
                        'roles' => $request->user()->getRoleNames(), // e.g. ["admin"]
                        'permissions' => $request->user()->getAllPermissions()->pluck('name'), // e.g. ["user.view", "user.create"]
                    ]
                    : null,
            ],

            // Ziggy routes
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],

            // Sidebar state
            'sidebarOpen' => 
                ! $request->hasCookie('sidebar_state') || 
                $request->cookie('sidebar_state') === 'true',
        ];
    }
}
