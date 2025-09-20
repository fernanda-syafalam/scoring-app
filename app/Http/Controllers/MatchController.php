<?php

namespace App\Http\Controllers;

use App\Imports\PartaiImport;
use App\Models\Gelanggang;
use App\Models\Partai;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Maatwebsite\Excel\Facades\Excel;

class MatchController extends Controller
{
    public function index()
    {
        if (env("MANAGEMENT_ROLE")){
            $this->authorize("adtor");
        }
        $classes =[
            (object)[
                'name'=>'A',
                'value'=>'A'
            ],(object)[
                'name'=>'B',
                'value'=>'B'
            ],(object)[
                'name'=>'C',
                'value'=>'C'
            ],(object)[
                'name'=>'D',
                'value'=>'D'
            ],(object)[
                'name'=>'E',
                'value'=>'E'
            ],(object)[
                'name'=>'F',
                'value'=>'F'
            ],(object)[
                'name'=>'G',
                'value'=>'G'
            ],(object)[
                'name'=>'H',
                'value'=>'H'
            ],(object)[
                'name'=>'I',
                'value'=>'I'
            ],
        ];
        $matches = Partai::orderBy('id', 'asc');
        $arenas = Gelanggang::orderBy('id', 'asc');
        $search = \request('search') ?? '';
        if ($search != ''){
            $matches->where('id','like', '%'.$search.'%')
                ->orWhereRaw("LOWER(round) LIKE ?", ['%' . strtolower($search) . '%'])
                ->orWhereRaw("LOWER(gender) LIKE ?", ['%' . strtolower($search) . '%'])
                ->orWhereRaw("LOWER(blue_corner) LIKE ?", ['%' . strtolower($search) . '%'])
                ->orWhereRaw("LOWER(red_corner) LIKE ?", ['%' . strtolower($search) . '%'])
                ->orWhereRaw("LOWER(blue_corner_contingent) LIKE ?", ['%' . strtolower($search) . '%'])
                ->orWhereRaw("LOWER(red_corner_contingent) LIKE ?", ['%' . strtolower($search) . '%']);

        }
        return view('management.match.match', [
            'title' => 'Match',
            'classes'=>$classes,
            'matches'=>$matches->paginate(10),
            'arenas'=>$arenas
        ]);
    }
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|unique:matches',
            'round' => 'required',
            'blue_corner'=> 'required|max:100|min:3',
            'red_corner'=> 'required|max:100|min:3',
            'blue_corner_contingent'=> 'required|max:100|min:3',
            'red_corner_contingent'=> 'required|max:100|min:3',
            'class'=> 'required|max:2',
            'gender'=> 'required|max:12|min:3',
        ]);
        Partai::create($validatedData);


        return redirect('/management/match')->with('success', 'Match added successfully!');
    }

    public function edit(Request $request,$id)
    {
        $validatedData = $request->validate([
            'round' => 'required',
            'blue_corner'=> 'required|max:100|min:3',
            'red_corner'=> 'required|max:100|min:3',
            'blue_corner_contingent'=> 'required|max:100|min:3',
            'red_corner_contingent'=> 'required|max:100|min:3',
            'class'=> 'required|max:2|min:1',
            'gender'=> 'required',
        ]);
        $match = Partai::findOrFail($id);
        $match->update($validatedData);

        return redirect('/management/match')->with('success', 'Match updated successfully.');
    }
    public function destroy($id)
    {
        Partai::destroy($id);
        return redirect('management/match')->with('success', 'Match deleted successfully');
    }

    public function import(Request $request)
    {
        $file = $request->file('excel_file');
        $import = new PartaiImport();
        Excel::import($import, $file);

        $message = $import->getMessage();
        if (!empty($message)) {
            return redirect('management/match')->with('error', $message);
        } else {
        return redirect('management/match')->with('success', 'Data imported successfully!');
        }
    }
}
