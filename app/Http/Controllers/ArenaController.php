<?php

namespace App\Http\Controllers;

use App\Models\Gelanggang;
use App\Models\Partai;
use App\Models\User;
use App\Models\UserGelanggang;
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
            'jury1U' => $userData['Jury 1U'],
            'jury2U' => $userData['Jury 2U'],
            'jury3U' => $userData['Jury 3U'],
            'councilU' => $userData['CouncilU'],
            'operatorU' => $userData['OperatorU'],
            'chairmanU' => $userData['ChairmanU'],
            'guestU' => $userData['GuestU'],
            'jury1C' => $userData['Jury 1C'],
            'jury2C' => $userData['Jury 2C'],
            'jury3C' => $userData['Jury 3C'],
            'councilC' => $userData['CouncilC'],
            'guestC' => $userData['GuestC'],
            'operatorC' => $userData['OperatorC'],
            'chairmanC' => $userData['ChairmanC'],
        ]);
    }

    public function getUserData()
    {
        $roles = ['Jury 1', 'Jury 2', 'Jury 3', 'Council', 'Operator','Chairman', 'Guest'];

        $userData = [];

        foreach ($roles as $role) {
            $userData[$role . 'U'] = User::whereHas('role', function ($query) use ($role) {
                $query->where('name', $role);
            })->get();
            $userData[$role . 'C'] = User::whereHas('role', function ($query) use ($role) {
                $query->where('name', $role);
            })->whereNotIn('id', function ($query) {
                $query->select('user_id')->from('user_arenas');
            })->get();
        }

        return $userData;
    }


    public function listArenas()
    {
        $search = \request('search') ?? '';

        $arenas = DB::table('arenas')
            ->select([
                'arenas.id as id',
                'arenas.name',
            ])
            ->leftJoin('user_arenas', 'user_arenas.arena_id', '=', 'arenas.id')
            ->leftJoin('users', 'users.id', '=', 'user_arenas.user_id')
            ->leftJoin('roles', 'roles.id', '=', 'users.role_id')
            ->groupBy('arenas.id', 'arenas.name');

        if ($search != ''){
            $arenas->where('arenas.name', 'like', '%'.$search.'%');
        }

        $arenas = $arenas->get();

        $arenas->transform(function ($row) {
            $roles = DB::table('user_arenas')
                ->select('roles.name')
                ->join('users', 'users.id', '=', 'user_arenas.user_id')
                ->join('roles', 'roles.id', '=', 'users.role_id')
                ->where('user_arenas.arena_id', $row->id)
                ->pluck('name')
                ->implode(', ');

            $users = DB::table('user_arenas')
                ->select('users.name')
                ->join('users', 'users.id', '=', 'user_arenas.user_id')
                ->where('user_arenas.arena_id', $row->id)
                ->pluck('name')
                ->implode(', ');

            $row->role_name = $roles;
            $row->user_name = $users;

            return $row;
        });

        $result = [];

        foreach ($arenas as $row) {
            $arena_id = $row->id;
            $arena_name = $row->name;
            $role_names = explode(', ', $row->role_name);
            $user_names = explode(', ', $row->user_name);

            if (!isset($result[$arena_id])) {
                $result[$arena_id] = [
                    "id" => $arena_id,
                    "name" => $arena_name,
                    "user_roles" => [],
                ];
            }
            foreach ($role_names as $index => $role_name) {
                $result[$arena_id]['user_roles'][] = [
                    "role_name" => $role_name,
                    "user_name" => $user_names[$index] ?? "",
                ];
            }
        }

        $response = array_values($result);

        return $response;
    }

    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
        ]);
        Gelanggang::create([
            'name' => $validatedData['name'],
        ]);

        return redirect('/management/arena')->with('success', 'Arena added successfully!');
    }

    public function edit(Request $request,$id)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'jury1' => 'required',
            'jury2' => 'required',
            'jury3' => 'required',
            'council' => 'required',
            'chairman' => 'required',
            'operator' => 'required',
            'guest' => 'required',
        ]);

        $arena = Gelanggang::findOrFail($id);
        $arena->update(['name' => $validatedData['name']]);

        $roles = [
            'Jury 1' => 'jury1',
            'Jury 2' => 'jury2',
            'Jury 3' => 'jury3',
            'Council' => 'council',
            'Chairman' => 'chairman',
            'Operator' => 'operator',
            'Guest' => 'guest',
        ];

        foreach ($roles as $roleName => $fieldName) {
            $userId = $validatedData[$fieldName];

            $userRole = UserGelanggang::where('arena_id', $id)
                ->whereHas('user', function ($query) use ($roleName) {
                    $query->whereHas('role', function ($subquery) use ($roleName) {
                        $subquery->where('name', $roleName);
                    });
                })->first();

            if ($userRole) {
                $userRole->update(['user_id' => $userId]);
            } else {
                UserGelanggang::create([
                    'arena_id' => $id,
                    'user_id' => $userId,
                ]);
            }
        }

        return redirect('/management/arena')->with('success', 'Arena updated successfully!');

    }

    public function destroy($id)
    {
        Gelanggang::destroy($id);
        UserGelanggang::where('arena_id', $id)->delete();
        return redirect('/management/arena')->with('success', 'Arena deleted successfully!');
    }
}
