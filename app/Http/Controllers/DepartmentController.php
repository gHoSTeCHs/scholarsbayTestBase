<?php

namespace App\Http\Controllers;

use App\Models\College;
use App\Models\Department;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DepartmentController extends Controller
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
        $attributes = $request->validate([
           'name' => 'required',
           'abbreviation' => 'required',
           'school' => 'required',
           'college' =>  'required'
        ]);

        $school = School::query()->where('name', $attributes['school'])->first();
        $college = College::query()->where('name', $attributes['college'])->first();

        $department = Department::query()->create([
            'school_id' => $school->id,
            'college_id' => $college->id,
            'name' => $attributes['name'],
            'abbreviation' => $attributes['abbreviation'],
        ]);

        $directory = 'schools/' . $school->abbreviation. '/colleges/' . $college->abbreviation . '/departments/' .$attributes['name'];

        if(!file_exists($directory)){
            Storage::makeDirectory($directory);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $department)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Department $department)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        //
    }
}
