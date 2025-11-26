<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserGelanggang extends Model
{
    use HasFactory;

    protected $table = 'users_gelanggangs';

    protected $fillable = [
        'user_id',
        'gelanggang_id',
    ];

    // Relasi dengan model User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relasi dengan model Gelanggang
    public function gelanggang()
    {
        return $this->belongsTo(Gelanggang::class, 'gelanggang_id');
    }
}
