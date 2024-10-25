<?php

namespace App\Http\Controllers;

use App\Models\College;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CollegeController extends Controller
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
            'abbreviation' => 'required',
            'school' => 'required',
        ]);

        $school = School::query()->where('name', $attributes['school'])->first();

        $college = College::query()->create([
            'name' => $attributes['name'],
            'abbreviation' => $attributes['abbreviation'],
            'school_id' => $school->id,
        ]);

        $directory = 'schools/' . $school->abbreviation . '/colleges/' . $attributes['abbreviation'];

        if (!file_exists($directory)) {
            Storage::makeDirectory($directory);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(College $college)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(College $college)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, College $college)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(College $college)
    {
        //
    }
}
