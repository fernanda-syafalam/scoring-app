<?php

namespace Database\Seeders;

use App\Models\Partai;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $role =['Admin','Operator','Ketua','Dewan','Juri Pertama','Juri Kedua','Juri Ketiga','Guest'];
        foreach ($role as $item) {
            Role::create([
                'name'=>$item
            ]);
        }
         \App\Models\User::factory(20)->create();
         User::create([
             'name'=>'admin',
             'username'=>'admin',
             'active' => true,
             'role_id'=> 1,
             'password' => Hash::make('password'),
         ]);
        Partai::factory(20)->create();
    }

}
