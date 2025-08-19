<?php

use App\Http\Controllers\RolesPermissionsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('roles-permissions', RolesPermissionsController::class);
});

Route::prefix('roles-permissions')->name('roles-permissions.')->middleware('auth')->group(function () {
    Route::get('/available', [RolesPermissionsController::class, 'getAvailableRolesAndPermissions'])->name('available');
    Route::post('/assign/{user}', [RolesPermissionsController::class, 'assignToUser'])->name('assign');
});


Route::fallback(function () {
    return Inertia::render('NotFound')->toResponse(request())->setStatusCode(404);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
