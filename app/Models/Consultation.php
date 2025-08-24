<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Consultation extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'faculty_id',
        'consultation_area_id',
        'date',
        'start_time',
        'duration',
        'reason',
        'status',
    ];

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function faculty()
    {
        return $this->belongsTo(User::class, 'faculty_id');
    }

    public function area()
    {
        return $this->belongsTo(ConsultationArea::class, 'consultation_area_id');
    }
}

