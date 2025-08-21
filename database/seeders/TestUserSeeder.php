<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 100; $i++) {
            $email = "faculty{$i}@example.com";

            if (!User::where('email', $email)->exists()) {
                $user = User::create([
                    'name' => "Faculty User {$i}",
                    'email' => $email,
                    'password' => Hash::make('password'),
                ]);

                $user->assignRole('faculty');
            }
        }

        for ($i = 1; $i <= 100; $i++) {
            $email = "student{$i}@example.com";

            if (!User::where('email', $email)->exists()) {
                $user = User::create([
                    'name' => "Student User {$i}",
                    'email' => $email,
                    'password' => Hash::make('password'),
                ]);

                $user->assignRole('student');
            }
        }
    }
}
