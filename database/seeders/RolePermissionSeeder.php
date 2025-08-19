<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolePermissionSeeder extends Seeder
{
    public function run()
    {
        // Permissions
        $permissions = [
            // User permissions
            'user.view',
            'user.create',
            'user.edit',
            'user.delete',

            // Role & Permission management
            'role.view',
            'role.create',
            'role.edit',
            'role.delete',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Roles
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $faculty = Role::firstOrCreate(['name' => 'faculty']);
        $student = Role::firstOrCreate(['name' => 'student']);

        // Assign permissions to roles
        $admin->syncPermissions($permissions); // Admin gets all permissions
        $faculty->syncPermissions(['user.view', 'user.edit']); // Faculty limited to user view/edit
        $student->syncPermissions(['user.view']); // Student only user view

        // Create sample users
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            ['name' => 'Admin User', 'password' => bcrypt('password')]
        );
        $adminUser->assignRole('admin');

        $facultyUser = User::firstOrCreate(
            ['email' => 'faculty@example.com'],
            ['name' => 'Faculty User', 'password' => bcrypt('password')]
        );
        $facultyUser->assignRole('faculty');

        $studentUser = User::firstOrCreate(
            ['email' => 'student@example.com'],
            ['name' => 'Student User', 'password' => bcrypt('password')]
        );
        $studentUser->assignRole('student');
    }
}
