<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\NewUserRegistered;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with('roles', 'permissions');

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('role') && $request->role !== 'all') {
            $query->whereHas('roles', function ($q) use ($request) {
                $q->where('name', $request->role);
            });
        }

        switch ($request->input('sort')) {
            case 'latest':
                $query->latest();
                break;
            case 'name':
                $query->orderBy('name');
                break;
            default:
                $query->oldest();
                break;
        }

        $paginator = $query->paginate(10)->withQueryString();

        $transformed = $paginator->getCollection()->map(fn($user) => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'status' => $user->status,
            'created_at' => $user->created_at,
            'roles' => $user->getRoleNames()->toArray(),
            'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
        ]);

        $paginator->setCollection($transformed);

        return Inertia::render('users/Index', [
            'users' => $paginator,
            'filters' => (object) request()->only(['search', 'status', 'role', 'sort']),
        ]);
    }



    public function create()
    {
        return Inertia::render('users/Create', [
            'roles' => Role::pluck('name'),
            'permissions' => Permission::pluck('name'),
        ]);
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
            'status' => 'in:active,inactive',
            'roles' => 'array',
            'permissions' => 'array',
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'status' => $data['status'] ?? 'active',
        ]);

        if (!empty($data['roles'])) {
            $user->syncRoles($data['roles']);
        }

        if (!empty($data['permissions'])) {
            $user->syncPermissions($data['permissions']);
        }

        $admins = User::role('admin')->get();
        Notification::send($admins, new NewUserRegistered($user));


        return redirect()->route('users.index')->with('success', 'User created.');
    }

    public function edit(User $user)
    {
        return Inertia::render('users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'status' => $user->status,
                'roles' => $user->roles->pluck('name'),
                'permissions' => $user->permissions->pluck('name'),
            ],
            'roles' => Role::pluck('name'),
            'permissions' => Permission::pluck('name'),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:6|confirmed',
            'status' => 'required|in:active,inactive',
            'roles' => 'array',
            'permissions' => 'array',
        ]);

        $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'status' => $data['status'],
            ...(isset($data['password']) && $data['password'] ? ['password' => bcrypt($data['password'])] : []),
        ]);

        if (isset($data['roles'])) {
            $user->syncRoles($data['roles']);
        }

        if (isset($data['permissions'])) {
            $user->syncPermissions($data['permissions']);
        }

        return redirect()->route('users.index')->with('success', 'User updated.');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with('success', 'User deleted.');
    }
}
