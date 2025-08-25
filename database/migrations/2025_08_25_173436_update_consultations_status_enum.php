<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Modify the enum to add 'completed'
        DB::statement("ALTER TABLE consultations MODIFY status ENUM('pending', 'approved', 'declined', 'completed') DEFAULT 'pending'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Rollback to original enum without 'completed'
        DB::statement("ALTER TABLE consultations MODIFY status ENUM('pending', 'approved', 'declined') DEFAULT 'pending'");
    }
};
