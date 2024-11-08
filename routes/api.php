<?php

use App\Http\Controllers\CourseApiController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    Route::get('/courses', [CourseApiController::class, 'index']);
    Route::get('/courses/{id}', [CourseApiController::class, 'show']);
    Route::post('/course/create', [CourseApiController::class, 'uploadCourse'] )->name('courses.store');
});
