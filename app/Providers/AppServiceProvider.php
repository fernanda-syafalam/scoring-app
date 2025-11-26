<?php

namespace App\Providers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // ========================================
        // DATABASE SLOW QUERY LOGGING
        // ========================================
        // Log queries that take longer than 500ms (configurable)
        // Helps identify latency bottlenecks caused by slow database queries
        if (app()->environment('local') || env('DB_QUERY_LOGGING', false)) {
            DB::listen(function ($query) {
                $slowQueryThreshold = intval(env('DB_SLOW_QUERY_MS', 500)); // Default 500ms

                if ($query->time > $slowQueryThreshold) {
                    Log::warning('⚠️ SLOW DATABASE QUERY', [
                        'duration_ms' => $query->time,
                        'sql' => $query->sql,
                        'bindings' => $query->bindings,
                        'threshold_ms' => $slowQueryThreshold,
                    ]);
                }

                // Log all queries if in ultra-verbose debug mode
                if (env('DB_QUERY_DEBUG', false)) {
                    Log::debug('Database Query', [
                        'duration_ms' => $query->time,
                        'sql' => $query->sql,
                    ]);
                }
            });
        }

        // ========================================
        // ROLE-BASED AUTHORIZATION GATES
        // ========================================
        $managementRole = [
            "admin"=>["Admin"],
            "adtor"=>["Admin","Operator"],
            "juri"=>['Juri Pertama',"Juri Kedua","Juri Ketiga"],
            "ketua"=>["Ketua"],
            "dewan"=>['Dewan'],
            'guest'=>['Guest'],
            'operator'=>['Operator']
        ];
        foreach ($managementRole as $access => $roles) {
            Gate::define($access, function (User $users) use ($roles) {
               $role = Role::findOrFail($users['role_id']);
               return $this->checkIsRole($roles, $role);
            });
        }
    }

    private function checkIsRole($roles, $role)
    {
        $isTrue = false;
        foreach ( $roles as $item) {
            if ($item === $role['name'] && env("MANAGEMENT_ROLE")){
                $isTrue = true;
                break;
            }
        }
        return $isTrue;
    }
}
