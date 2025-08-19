<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Controllers\Controller;

class RolesPermissionsController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('permission:role.view', ['only' => ['index']]);
    //     $this->middleware('permission:role.create', ['only' => ['create', 'store']]);
    //     $this->middleware('permission:role.edit', ['only' => ['edit', 'update']]);
    //     $this->middleware('permission:role.delete', ['only' => ['destroy']]);
    // }

    /**
     * Display a listing of roles and permissions
     */
    public function index()
    {
        $roles = Role::with('permissions')->get()->map(fn ($role) => [
            'id' => $role->id,
            'name' => $role->name,
            'permissions' => $role->permissions->pluck('name'),
        ]);

        $permissions = Permission::all()->pluck('name');

        return Inertia::render('rolesPermissions/Index', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Show the form for creating a new role
     */
    public function create()
    {
        $permissions = Permission::all()->pluck('name');

        return Inertia::render('rolesPermissions/Create', [
            'permissions' => $permissions,
        ]);
    }

    /**
     * Store a newly created role in storage
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:roles,name',
            'permissions' => 'array',
        ]);

        $role = Role::create(['name' => $data['name']]);

        if (!empty($data['permissions'])) {
            $role->syncPermissions($data['permissions']);
        }

        return redirect()->route('roles-permissions.index')->with('success', 'Role created.');
    }

    /**
     * Show the form for editing the specified role
     */
    public function edit(Role $rolesPermission)
    {
        $role = $rolesPermission->load('permissions');

        $permissions = Permission::all()->pluck('name');

        return Inertia::render('rolesPermissions/Edit', [
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions->pluck('name'),
            ],
            'permissions' => $permissions,
        ]);
    }

    /**
     * Update the specified role in storage
     */
    public function update(Request $request, Role $rolesPermission)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:roles,name,' . $rolesPermission->id,
            'permissions' => 'array',
        ]);

        $rolesPermission->update(['name' => $data['name']]);

        $rolesPermission->syncPermissions($data['permissions'] ?? []);

        return redirect()->route('roles-permissions.index')->with('success', 'Role updated.');
    }

    /**
     * Remove the specified role from storage
     */
    public function destroy(Role $rolesPermission)
    {
        $rolesPermission->delete();

        return redirect()->route('roles-permissions.index')->with('success', 'Role deleted.');
    }
}
