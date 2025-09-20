<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Arena extends Model
{
    use HasFactory;
    protected $table = 'arenas';
    protected $guarded =['id'];
    public function matches(){
        return $this->belongsToMany(Match::class);
    }

    public function users(){
        return $this->belongsToMany(User::class, 'user_arenas');
    }
}
