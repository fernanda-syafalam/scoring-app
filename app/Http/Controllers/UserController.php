<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Application|Factory|View
     */
    public function index()
    {
        if (config('app_settings.management_role_enabled')){
            $this->authorize("admin");
        }

        $search = request('search') ?? '';

        $users = User::with(['role', 'gelanggang'])
            ->when($search, function($query) use ($search) {
                return $query->where('name', 'ilike', "%{$search}%")
                            ->orWhere('username', 'ilike', "%{$search}%");
            })
            ->latest()
            ->paginate(10);

        $roles = Role::all();

        return view('management.users.users', [
            'title' => 'users',
            'data' => $users,
            'roles' => $roles
        ]);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param StoreUserRequest $request
     * @return Application|RedirectResponse|Redirector
     */
    public function create(StoreUserRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['password'] = Hash::make($validatedData['password']);

        User::create($validatedData);

        return redirect('/management')->with('success', 'Pengguna berhasil ditambahkan!');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param UpdateUserRequest $request
     * @param int $id
     * @return Application|RedirectResponse|Redirector
     */
    public function edit(UpdateUserRequest $request, $id)
    {
        $validatedData = $request->validated();
        $user = User::findOrFail($id);

        if (!empty($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        } else {
            unset($validatedData['password']);
        }

        $user->update($validatedData);

        return redirect('/management')->with('success', 'Pengguna berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return RedirectResponse
     */
    public function destroy($id)
    {
        User::destroy($id);
        return redirect('management')->with('success', 'Pengguna berhasil dihapus!');
    }
}
