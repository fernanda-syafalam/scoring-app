<?php

namespace App\Http\Controllers;

use App\Models\UserGelanggang;
use Illuminate\Http\Request;

class KetuaPertandinganController extends Controller
{
    public function index()
    {
        if (config('app_settings.management_role_enabled')){
            $this->authorize("ketua");
        }
        $gelangang = UserGelanggang::where('user_id', auth()->user()->id)->first();
        return view('ketuaPertandingan', [
            'title' => 'ketua pertandingan',
            'gelanggang' => $gelangang,
        ]);
    }
}
