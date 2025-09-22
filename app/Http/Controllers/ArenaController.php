<?php

namespace App\Http\Controllers;

use App\Models\Arena;
use App\Models\User;
use App\Models\UserArena;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArenaController extends Controller
{
    public function index(Request $request)
    {
        if (env("MANAGEMENT_ROLE")){
            $this->authorize("admin");
        }
        $arenas = $this->listArenas();
        $userData = $this->getUserData();
        return view('management.arena.arena', [
            'title' => 'Arena',
            'arenas' => $arenas,
            'users' => $userData,
        ]);
    }

    public function getUserData()
    {
        $roles = Role::whereIn('name', ['Jury 1', 'Jury 2', 'Jury 3', 'Council', 'Operator', 'Chairman', 'Guest'])->get();
        $userData = [];

        foreach ($roles as $role) {
            $users = User::where('role_id', $role->id)->get();
            $assignedUserIds = UserArena::pluck('user_id');

            $userData[$role->name] = [
                'all' => $users,
                'unassigned' => $users->whereNotIn('id', $assignedUserIds),
            ];
        }

        return $userData;
    }


    public function listArenas()
    {
        $search = request('search') ?? '';

        $arenas = Arena::with(['users.role'])
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', '%' . $search . '%');
            })
            ->get();

        return $arenas->map(function ($arena) {
            return [
                'id' => $arena->id,
                'name' => $arena->name,
                'user_roles' => $arena->users->map(function ($user) {
                    return [
                        'role_name' => $user->role->name,
                        'user_name' => $user->name,
                    ];
                }),
            ];
        });
    }

    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|unique:arenas',
        ]);
        Arena::create($validatedData);

        return redirect('/management/arena')->with('success', 'Arena added successfully!');
    }

    public function edit(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'users' => 'required|array',
        ]);

        $arena = Arena::findOrFail($id);
        $arena->update(['name' => $validatedData['name']]);

        $arena->users()->sync($validatedData['users']);

        return redirect('/management/arena')->with('success', 'Arena updated successfully!');
    }

    public function destroy($id)
    {
        Arena::destroy($id);
        return redirect('/management/arena')->with('success', 'Arena deleted successfully!');
    }
}
