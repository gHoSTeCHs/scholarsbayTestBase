<?php

namespace App\Models;

use Database\Factories\CollegeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class College extends Model
{
    /** @use HasFactory<CollegeFactory> */
    use HasFactory;

    protected $guarded = [];
}
