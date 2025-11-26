<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gelanggang extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_gelanggang',
    ];

    public function partai(){
        return $this->belongsToMany(Partai::class);
    }

    public function user(){
        return $this->belongsToMany(User::class);
    }
}
