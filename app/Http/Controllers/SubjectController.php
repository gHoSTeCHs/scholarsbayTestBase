<?php

namespace App\Http\Controllers;

use App\Models\College;
use App\Models\Department;
use App\Models\School;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attributes = request()->validate([
            'name' => 'required',
            'code' => 'required',
            'school' => 'required',
            'college' => 'required',
            'department' => 'required',
        ]);

        $school = School::query()->where('name', $attributes['school'])->first();
        $college = College::query()->where('name', $attributes['college'])->first();
        $department = Department::query()->where('name', $attributes['department'])->first();

        $subject = Subject::query()->create([
            'title' => $attributes['name'],
            'code' => $attributes['code'],
            'school_id' => $school->id,
            'college_id' => $college->id,
            'department_id' => $department->id,
        ]);

        $directory = 'schools/' . $school->abbreviation . '/colleges/' . $college->abbreviation . '/departments/' . $department->name . '/subjects/' . $subject->code;

        if (!file_exists($directory)) {
            Storage::makeDirectory($directory);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $subject)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subject $subject)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subject $subject)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
        //
    }
}
