<?php

namespace App\Providers;

use App\Models\Consultation;
use App\Policies\ConsultationPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Consultation::class => ConsultationPolicy::class,
    ];

    public function boot(): void
    {
        //
    }
}
