<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConsultationArea extends Model
{
    use HasFactory;

    protected $fillable = ['building', 'room'];
}
