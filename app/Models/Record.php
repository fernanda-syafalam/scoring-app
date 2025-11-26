<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    use HasFactory;

    protected $table = 'log_pertandingan';

    protected $fillable = [
        'partai',
        'kelas',
        'jenis_kelamin',
        'sudut_biru',
        'sudut_merah',
        'kontingen_merah',
        'kontingen_biru',
        'babak',
        'pemenang',
        'round_time',
    ];
}
