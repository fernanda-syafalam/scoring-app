<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // Define authorization gates based on user roles
        Gate::define('admin', function ($user) {
            return $user->role && $user->role->name === 'Admin';
        });

        Gate::define('adtor', function ($user) {
            return $user->role && in_array($user->role->name, ['Admin', 'Operator']);
        });

        Gate::define('juri', function ($user) {
            return $user->role && in_array($user->role->name, ['Juri Pertama', 'Juri Kedua', 'Juri Ketiga']);
        });

        Gate::define('ketua', function ($user) {
            return $user->role && $user->role->name === 'Ketua';
        });

        Gate::define('dewan', function ($user) {
            return $user->role && $user->role->name === 'Dewan';
        });

        Gate::define('operator', function ($user) {
            return $user->role && $user->role->name === 'Operator';
        });

        Gate::define('guest', function ($user) {
            return $user->role && $user->role->name === 'Guest';
        });
    }
}
