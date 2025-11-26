<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function login()
    {
        if (Auth::user()){
            return back();
        }
        return view('/login', ['title' => 'LOGIN']);
    }

    public function authenticate(Request $request): \Illuminate\Http\RedirectResponse
    {
        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $menu = $this->getMenu();
            return redirect()->intended("/" . $menu);
        }

        return back()->with('error', 'Login failed!');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/login');
    }

    private function getMenu()
    {
        $managementRole = [
            "management" => ["Admin"],
            "juri" => ['Juri Pertama', 'Juri Kedua', 'Juri Ketiga'],
            "ketua_pertandingan" => ["Ketua"],
            "dewan" => ['Dewan'],
            'papan_score' => ['Guest']
        ];

        $user = Auth::user();
        $role = Role::findOrFail($user['role_id']);
        $thisMenu = 'management';
        foreach ($managementRole as $menu => $roles) {
            foreach ($roles as $item) {
                if ($item === $role['name'] && config('app_settings.management_role_enabled')) {
                    $thisMenu = $menu;
                    break;
                }
            }
        }

        return $thisMenu;

    }
}
