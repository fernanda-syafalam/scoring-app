<?php

namespace App\Http\Controllers;

use App\Models\UserGelanggang;
use Illuminate\Http\Request;

class JuryController extends Controller
{
    public function index()
    {
        if (env("MANAGEMENT_ROLE")){
            $this->authorize("jury");
        }
        $gelangang = UserGelanggang::where('user_id', auth()->user()->id)->first();
        return view('jury', [
            'title' => 'jury',
            'gelanggang'=>$gelangang
        ]);
    }
}
