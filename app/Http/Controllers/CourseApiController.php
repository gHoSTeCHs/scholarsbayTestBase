<?php

namespace App\Http\Controllers;

use App\Models\College;
use App\Models\CourseSection;
use App\Models\CourseTopic;
use App\Models\Department;
use App\Models\School;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class CourseApiController extends Controller
{
    //
    public function index()
    {
        $courses = Subject::query()->with('sections')->get();
        return (json_encode($courses));
    }

    public function getSubjectSections($subject_id)
    {
        dd($subject_id);
    }

    public function uploadCourse(Request $request)
    {
        $attributes = request()->validate([
            'course' => 'required',
            'section' => 'required',
            'topic' => 'required',
            'markdown_file' => 'required',
        ]);

        $section = CourseSection::query()->where('title', $attributes['section'])->first();
        $subject = Subject::query()->where('code', $request['course'])->first();
        $department = Department::query()->where('id', $subject->department_id)->first();
        $college = College::query()->where('id', $department->college_id)->first();
        $school = School::query()->where('id', $college->school_id)->first();

        $directory = 'schools/' . $school->abbreviation . '/colleges/' . $college->abbreviation . '/departments/' . $department->name . '/subjects/' . $subject->code . '/';

        if (request()->hasFile('markdown_file')) {
            $fileName = Str::lower($attributes['topic']) . '.md';

            Storage::disk('public')
                ->putFileAs($directory, request()
                    ->file('markdown_file'),
                    $fileName);
            $upload = CourseTopic::query()->create([
                'subject_id' => $subject->id,
                'course_section_id' => $section->id,
                'topic' => Str::lower($attributes['topic']),
            ]);
        }


    }
}
