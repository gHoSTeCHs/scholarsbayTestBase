<?php

namespace App\Http\Controllers;

use App\Models\Course;
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
        //
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
        try {
            // Sanitize the course title and build the file path
            $courseSlug = Str::slug($title);
            $courseTitle = str_replace('-', ' ', $courseSlug);
            $markdownFile = "{$this->basePath}/{$courseTitle}/installation.md";

            // Check if the file exists
            if (!Storage::disk('public')->exists($markdownFile)) {
                return redirect()
                    ->route('courses.index')
                    ->with('error', 'Course content not found.');
            }

            // Get the markdown content
            $markdownContent = Storage::disk('public')->get($markdownFile);

            // Configure the markdown converter with security options
            $converter = new CommonMarkConverter([
                'html_input' => 'strip',  // Strips HTML for security
                'allow_unsafe_links' => false,  // Prevents unsafe links
                'max_nesting_level' => 100,  // Prevents deeply nested elements
            ]);

            // Convert markdown to HTML
            $htmlContent = (string) $converter->convert($markdownContent);

            // Get additional course information
            $lastModified = Storage::disk('public')->lastModified($markdownFile);

            return Inertia::render('Courses/Show', [
                'course' => [
                    'title' => $courseTitle,
                    'content' => $markdownContent,
                    'lastModified' => Carbon::createFromTimestamp($lastModified)->diffForHumans(),
                    'slug' => $courseSlug,
                ]
            ]);



        } catch (\Exception $e) {
            report($e); // Log the error

            return redirect()
                ->route('courses.index')
                ->with('error', 'Unable to load course content.');
        }
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        //
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
