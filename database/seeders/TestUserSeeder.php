<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    public function run(): void
    {
        // Create 10 faculty users
        for ($i = 1; $i <= 10; $i++) {
            $user = User::create([
                'name' => "Faculty User {$i}",
                'email' => "faculty{$i}@example.com",
                'password' => Hash::make('password'),
            ]);

            $user->assignRole('faculty');
        }

        // Create 10 student users
        for ($i = 1; $i <= 10; $i++) {
            $user = User::create([
                'name' => "Student User {$i}",
                'email' => "student{$i}@example.com",
                'password' => Hash::make('password'),
            ]);

            $user->assignRole('student');
        }
    }
}
