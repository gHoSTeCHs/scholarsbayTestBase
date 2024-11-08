<?php

namespace App\Models;

use Database\Factories\SubjectFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subject extends Model
{
    /** @use HasFactory<SubjectFactory> */
    use HasFactory;

    protected $guarded = [];

    public function sections(): HasMany
    {
        return $this->hasMany(CourseSection::class, 'course_id');
    }


}
