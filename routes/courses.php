<?php

use App\Http\Controllers\CourseController;
use App\Models\Subject;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/courses' , function(){
    $courses = Subject::all();

    return Inertia::render('Courses/Index', [
        'courses' => $courses
    ]);
})->name('courses')->middleware('auth');

Route::get('/courses/{title}', [CourseController::class, 'show'] )->name('courses.show');
Route::get('/course/create', [CourseController::class, 'create'] )->name('courses.upload');
