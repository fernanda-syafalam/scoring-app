<?php

namespace App\Http\Controllers;

use App\Models\UserGelanggang;
use Illuminate\Http\Request;

class JuriController extends Controller
{
    public function index()
    {
        if (config('app_settings.management_role_enabled')){
            $this->authorize("juri");
        }
        $gelangang = UserGelanggang::where('user_id', auth()->user()->id)->first();
        return view('juri', [
            'title' => 'juri',
            'gelanggang'=>$gelangang
        ]);
    }
}
