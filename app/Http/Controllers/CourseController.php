<?php

namespace App\Http\Controllers;

use App\Models\College;
use App\Models\Course;
use App\Models\CourseSection;
use App\Models\CourseTopic;
use App\Models\Department;
use App\Models\School;
use App\Models\Subject;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use League\CommonMark\CommonMarkConverter;
use League\CommonMark\Exception\CommonMarkException;

class CourseController extends Controller
{
    protected string $basePath = 'schools/MOUAU/colleges/COLPAS/departments/Computer Science/subjects';

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
        return Inertia::render('Courses/Create', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     * @throws CommonMarkException
     */
    public function show($title)
    {
        $subject = Subject::query()->where('code', $title)->first();
        $department = Department::query()->where('id', $subject->department_id)->first();
        $college = College::query()->where('id', $subject->college_id)->first();
        $school = School::query()->where('id', $subject->school_id)->first();

        $sections = CourseSection::query()->where('course_id', $subject->id)->with('topics')->get();

        try {
            $courseSlug = Str::slug($title);
            $courseTitle = str_replace('-', ' ', $courseSlug);

            $markdownFile = 'schools/' . $school->abbreviation . '/colleges/' . $college->abbreviation . '/departments/' . $department->name . '/subjects/' . $subject->code . '/introduction.md';

            if (!Storage::disk('public')->exists($markdownFile)) {
                return redirect()
                    ->route('courses.index')
                    ->with('error', 'Course content not found.');
            }

            $markdownContent = Storage::disk('public')->get($markdownFile);
            $converter = new CommonMarkConverter();
            $htmlContent = (string)$converter->convert($markdownContent);

            $lastModified = Storage::disk('public')->lastModified($markdownFile);

            return Inertia::render('Courses/Show', [
                'course' => [
                    'title' => $courseTitle,
                    'content' => $htmlContent,
                    'lastModified' => Carbon::createFromTimestamp($lastModified)->diffForHumans(),
                    'slug' => $courseSlug,
                    'sections' => $sections
                ]
            ]);


        } catch (\Exception $e) {
            report($e);

            return redirect()
                ->route('courses')
                ->with('error', 'Unable to load course content.');
        }
    }

    public function fetchTopic($title, $topic)
    {
        $courseTitle = Str::upper($title);
        $subject = Subject::query()->where('code', $courseTitle)->first();
        $department = Department::query()->where('id', $subject->department_id)->first();
        $college = College::query()->where('id', $subject->college_id)->first();
        $school = School::query()->where('id', $subject->school_id)->first();

        $sections = CourseSection::query()->where('course_id', $subject->id)->with('topics')->get();
        $selectedTopic = CourseTopic::query()->where('course_id', $subject->id)->where('topic', $topic)->first();

        try {
            $markdownFile = 'schools/' . $school->abbreviation . '/colleges/' . $college->abbreviation . '/departments/' . $department->name . '/subjects/' . $subject->code . '/' . $topic . '.md';

            $markdownContent = Storage::disk('public')->get($markdownFile);
            $converter = new CommonMarkConverter();
            try {
                $htmlContent = (string)$converter->convert($markdownContent);
            } catch (CommonMarkException $e) {
                report($e);
            }
            $lastModified = Storage::disk('public')->lastModified($markdownFile);


            return Inertia::render('Courses/Show', [
                'course' => [
                    'title' => $courseTitle,
                    'content' => $htmlContent ? $htmlContent : null,
                    'lastModified' => Carbon::createFromTimestamp($lastModified)->diffForHumans(),
                    'slug' => '',
                    'sections' => $sections
                ]
            ]);

        } catch (\Exception $e) {
            report($e);

            return redirect('');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */

    public function edit(Course $course)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        //
    }
}
