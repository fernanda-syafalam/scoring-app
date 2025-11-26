<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePartaiRequest;
use App\Http\Requests\UpdatePartaiRequest;
use App\Imports\PartaiImport;
use App\Models\Gelanggang;
use App\Models\Partai;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Maatwebsite\Excel\Facades\Excel;

class PartaiController extends Controller
{
    public function index()
    {
        if (config('app_settings.management_role_enabled')){
            $this->authorize("adtor");
        }

        // Get kelas from config and transform to objects
        $kelas = collect(config('app_settings.kelas'))->map(function($value) {
            return (object)['name' => $value, 'value' => $value];
        })->toArray();

        $search = request('search') ?? '';

        $partais = Partai::with('gelanggang')
            ->when($search, function($query) use ($search) {
                return $query->where('id', 'like', "%{$search}%")
                    ->orWhere('babak', 'ilike', "%{$search}%")
                    ->orWhere('jenis_kelamin', 'ilike', "%{$search}%")
                    ->orWhere('sudut_biru', 'ilike', "%{$search}%")
                    ->orWhere('sudut_merah', 'ilike', "%{$search}%")
                    ->orWhere('contingen_sudut_biru', 'ilike', "%{$search}%")
                    ->orWhere('contingen_sudut_merah', 'ilike', "%{$search}%");
            })
            ->orderBy('id', 'asc')
            ->paginate(10);

        $gelanggangs = Gelanggang::orderBy('id', 'asc')->get();

        return view('management.pertandingan.pertandingan', [
            'title' => 'pertandingan',
            'kelas' => $kelas,
            'partais' => $partais,
            'gelanggangs' => $gelanggangs
        ]);
    }
    public function create(StorePartaiRequest $request)
    {
        Partai::create($request->validated());

        return redirect('/management/pertandingan')->with('success', 'Pertandingan berhasil ditambahkan!');
    }

    public function edit(UpdatePartaiRequest $request, $id)
    {
        $partai = Partai::findOrFail($id);
        $partai->update($request->validated());

        return redirect('/management/pertandingan')->with('success', 'Pertandingan berhasil diperbarui!');
    }

    public function destroy($id)
    {
        Partai::destroy($id);
        return redirect('management/pertandingan')->with('success', 'Pertandingan berhasil dihapus!');
    }

    public function import(Request $request)
    {
        $file = $request->file('excel_file');
        $import = new PartaiImport();
        Excel::import($import, $file);

        $message = $import->getMessage();
        if (!empty($message)) {
            return redirect('management/pertandingan')->with('error', $message);
        } else {
        return redirect('management/pertandingan')->with('success', 'Data imported successfully!');
        }
    }
}
