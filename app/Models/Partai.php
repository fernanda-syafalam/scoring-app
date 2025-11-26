<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partai extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'babak',
        'gelanggang_id',
        'sudut_merah',
        'sudut_biru',
        'contingen_sudut_merah',
        'contingen_sudut_biru',
        'kelas',
        'jenis_kelamin',
        'status',
    ];

    public function gelanggang(){
        return $this->belongsTo(Gelanggang::class,'gelanggang_id');
    }
}
