<?php

namespace App\Http\Controllers;

use App\Models\UserGelanggang;
use Illuminate\Http\Request;

class MatchChairmanController extends Controller
{
    public function index()
    {
        if (env("MANAGEMENT_ROLE")){
            $this->authorize("chairman");
        }
        $gelangang = UserGelanggang::where('user_id', auth()->user()->id)->first();
        return view('match-chairman', [
            'title' => 'Match Chairman',
            'gelanggang' => $gelangang,
        ]);
    }
}
