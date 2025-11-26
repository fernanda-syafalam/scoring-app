<?php

namespace App\Http\Controllers;

use App\Models\Partai;
use App\Models\UserGelanggang;
use Illuminate\Http\Request;

class OperatorController extends Controller
{
    public function index()
    {
        if (config('app_settings.management_role_enabled')){
            $this->authorize("operator");
        }
        $partai = Partai::where('status', true)
            ->orderBy('id', 'asc');
        $idToSkip = $partai->paginate(1)[0]->id??null;

        $gelangang = UserGelanggang::where('user_id', auth()->user()->id)->first();
        return view('operator', [
            'title' => 'operator',
            'partai_pertama'=>$partai->paginate(1)??null,
            'partai_kedua'=>$partai->where('id', '!=', $idToSkip)->where('status',true)->paginate(1)??null,
            'gelanggang'=>$gelangang
        ]);
    }
}
