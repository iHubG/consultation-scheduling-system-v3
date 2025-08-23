<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Carbon\Carbon;

class RecentActivity extends Model
{
    protected $fillable = ['action', 'user', 'type'];

    protected $appends = ['time'];

    public function getTimeAttribute()
    {
        return Carbon::parse($this->created_at)->diffForHumans();
    }
}
