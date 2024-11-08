<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseTopic extends Model
{
    /** @use HasFactory<\Database\Factories\CourseTopicFactory> */
    use HasFactory;

    protected $guarded = [];

    public function course(){
        return $this->belongsTo(Course::class);
    }

    public function courseSection()
    {
        return $this->belongsTo(CourseSection::class);
    }
}
