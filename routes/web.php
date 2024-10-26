<?php

use App\Http\Controllers\CollegeController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\SubjectController;
use App\Models\College;
use App\Models\Department;
use App\Models\School;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $schools = School::all();
    $colleges = College::all();
    $departments = Department::all();

    return Inertia::render('Dashboard', [
        'schools' => $schools,
        'colleges' => $colleges,
        'departments' => $departments
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/schools', [SchoolController::class, 'store'])->name('schools.store');
Route::post('/colleges', [CollegeController::class, 'store'])->name('colleges.store');
Route::post('/departments', [DepartmentController::class, 'store'])->name('departments.store');
Route::post('/subjects', [SubjectController::class, 'store'])->name('subjects.store');

require __DIR__ . '/auth.php';
