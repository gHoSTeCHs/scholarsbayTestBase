<?php

use App\Models\Course;
use App\Models\CourseSection;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('course_topics', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Subject::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(CourseSection::class)->constrained()->cascadeOnDelete();
            $table->string('topic');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_topics');
    }
};
