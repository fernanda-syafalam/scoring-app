<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserArena extends Model
{
    use HasFactory;

    protected $table = 'user_arenas';

    protected $guarded = ['id'];
}
