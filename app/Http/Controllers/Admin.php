<?php

namespace App\Http\Controllers;

use App\Models\Match;
use App\Models\User;
use Illuminate\Http\Request;

class Admin extends Controller
{
    public function index()
    {
        return view('admin.index',[
            'title' => 'test'
        ]);
    }

    public function getUser()
    {

        return view('admin.users.users', [
           'title' => 'List Users',
            'data' => User::paginate(10)
        ]);
    }

    public function getMatches()
    {
        return view('admin.matches',[
            'title' => 'List Matches',
            'data' => collect(Match::paginate(5))->all()
        ]);
    }
}
