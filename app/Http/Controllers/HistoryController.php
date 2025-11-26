<?php

namespace App\Http\Controllers;

use App\Models\Partai;
use App\Models\Record;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function index()
    {
        if (config('app_settings.management_role_enabled')){
            $this->authorize("adtor") ;
        }
        $record = Record::latest();
        return view('management.history.history', [
            'title' => 'history',
            'data' => $record->paginate(10)
            ]);
    }
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'partai' => 'required|unique:log_pertandingan',
            'kelas' => 'required',
            'jenis_kelamin' => 'required',
            'sudut_biru' => 'required',
            'sudut_merah' => 'required',
            'kontingen_merah' => 'required',
            'kontingen_biru' => 'required',
            'babak' => 'required',
            'pemenang' => 'required',
            'round_time' => 'required',
        ]);
        $pertandingan = Partai::findOrFail($validatedData['partai']);
        $pertandingan->update(['status'=>false]);

        Record::create($validatedData);
    }

    public function destroy($id)
    {
        Record::destroy($id);
        Record::where("partai", $id)->delete();
        return redirect('/management/history')->with('success', 'Riwayat pertandingan berhasil dihapus!');
    }
}
