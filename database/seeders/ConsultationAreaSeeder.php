<?php

namespace Database\Seeders;

use App\Models\ConsultationArea;
use Illuminate\Database\Seeder;

class ConsultationAreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $count = 20; 

        for ($i = 1; $i <= $count; $i++) {
            ConsultationArea::create([
                'building' => 'Building ' . chr(64 + ceil($i / 5)), 
                'room' => str_pad((100 + $i), 3, '0', STR_PAD_LEFT), 
            ]);
        }
    }
}
