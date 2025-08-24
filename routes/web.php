<?php


use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ConsultationAreasController;
use App\Http\Controllers\RolesPermissionsController;
use App\Http\Controllers\ConsultationsController;
use App\Http\Controllers\StudentController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('roles-permissions', RolesPermissionsController::class);
    Route::resource('consultation-areas', ConsultationAreasController::class);
    Route::resource('consultations', ConsultationsController::class);
    Route::post('/consultations/{consultation}/approve', [ConsultationsController::class, 'approve'])->name('consultations.approve');
    Route::post('/consultations/{consultation}/decline', [ConsultationsController::class, 'decline'])->name('consultations.decline');
    Route::post('/consultations/{consultation}/request', [ConsultationsController::class, 'requestToJoin'])->middleware('auth');

    Route::middleware(['auth', 'role:student'])->group(function () {
        Route::get('/student/request', [StudentController::class, 'index'])->name('student.request');
        Route::post('/consultations/{consultation}/request-to-join', [StudentController::class, 'requestToJoin'])->name('consultations.requestToJoin');
         Route::get('/student/appointments', [StudentController::class, 'appointments'])->name('student.appointments');
    });
});

Route::prefix('roles-permissions')->name('roles-permissions.')->middleware('auth')->group(function () {
    Route::get('/available', [RolesPermissionsController::class, 'getAvailableRolesAndPermissions'])->name('available');
    Route::post('/assign/{user}', [RolesPermissionsController::class, 'assignToUser'])->name('assign');
});


Route::fallback(function () {
    return Inertia::render('NotFound')->toResponse(request())->setStatusCode(404);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
