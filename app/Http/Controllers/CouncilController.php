<?php

namespace App\Http\Controllers;

use App\Models\UserGelanggang;
use Illuminate\Http\Request;

class CouncilController extends Controller
{
    public function index()
    {
        if (env("MANAGEMENT_ROLE")){
            $this->authorize("council");
        }
        $gelangang = UserGelanggang::where('user_id', auth()->user()->id)->first();
        return view('council', [
            'title' => 'council',
            'gelangang'=>$gelangang
        ]);
    }
}
