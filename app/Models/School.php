<?php

namespace App\Models;

use Database\Factories\SchoolFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class School extends Model
{
    /** @use HasFactory<SchoolFactory> */
    use HasFactory;

    protected $guarded =  [];

    public function levels(): HasMany
    {
        return $this->hasMany(Level::class);
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }
}
