<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
 public function index()
{
    $paginator = User::with('roles', 'permissions')
        ->oldest()
        ->paginate(20);

    $transformed = $paginator->getCollection()->map(fn($user) => [
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'status' => $user->status,
        'roles' => $user->getRoleNames()->toArray(),
        'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
    ]);

    $paginator->setCollection($transformed);

    return Inertia::render('users/Index', [
        'users' => $paginator,
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
