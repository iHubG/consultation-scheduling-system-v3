<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('consultations', function (Blueprint $table) {
            $table->id();

            // Foreign keys
            $table->foreignId('student_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->foreignId('faculty_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('consultation_area_id')->constrained()->onDelete('cascade');

            // Core fields
            $table->date('date');
            $table->time('start_time'); 
            $table->unsignedSmallInteger('duration'); // duration in minutes
            $table->text('reason');
            $table->enum('status', ['pending', 'approved', 'declined'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultations');
    }
};
