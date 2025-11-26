<?php

namespace App\Http\Controllers;

use App\Models\UserGelanggang;
use Illuminate\Http\Request;

class DewanController extends Controller
{
    public function index()
    {
        if (config('app_settings.management_role_enabled')){
            $this->authorize("dewan");
        }
        $gelangang = UserGelanggang::where('user_id', auth()->user()->id)->first();
        return view('dewan', [
            'title' => 'dewan',
            'gelangang'=>$gelangang
        ]);
    }
}
