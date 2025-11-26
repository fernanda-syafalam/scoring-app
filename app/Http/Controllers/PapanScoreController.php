<?php

namespace App\Http\Controllers;

use App\Models\UserGelanggang;
use Illuminate\Http\Request;

class PapanScoreController extends Controller
{
    public function index()
    {
        if (config('app_settings.management_role_enabled')){
            $this->authorize("guest");
        }
        $gelangang = UserGelanggang::where('user_id', auth()->user()->id)->first();
        return view('papanScore', [
            'title' => 'papan score',
            'gelangang'=>$gelangang
        ]);
    }
}
