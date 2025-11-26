<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Management Role Feature Flag
    |--------------------------------------------------------------------------
    |
    | This option controls whether role-based authorization is enabled.
    | When set to true, the application will enforce role-based access control.
    | When false, authorization checks are bypassed (useful for development/demo).
    |
    */

    'management_role_enabled' => env('MANAGEMENT_ROLE', false),

    /*
    |--------------------------------------------------------------------------
    | Role Definitions
    |--------------------------------------------------------------------------
    |
    | Define all available roles and their route mappings for dashboard access.
    |
    */

    'roles' => [
        'admin' => [
            'name' => 'Admin',
            'dashboard_route' => 'management',
        ],
        'juri_pertama' => [
            'name' => 'Juri Pertama',
            'dashboard_route' => 'juri',
        ],
        'juri_kedua' => [
            'name' => 'Juri Kedua',
            'dashboard_route' => 'juri',
        ],
        'juri_ketiga' => [
            'name' => 'Juri Ketiga',
            'dashboard_route' => 'juri',
        ],
        'ketua' => [
            'name' => 'Ketua',
            'dashboard_route' => 'ketua_pertandingan',
        ],
        'dewan' => [
            'name' => 'Dewan',
            'dashboard_route' => 'dewan',
        ],
        'guest' => [
            'name' => 'Guest',
            'dashboard_route' => 'papan_score',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Kelas (Class) Definitions
    |--------------------------------------------------------------------------
    |
    | Available competition classes for matches.
    |
    */

    'kelas' => ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],

];
