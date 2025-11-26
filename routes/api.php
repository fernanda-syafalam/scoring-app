<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Lightweight ping endpoint for latency measurement - CRITICAL: bypass all middleware
Route::match(['get', 'head', 'options'], '/ping', function () {
    return response()->noContent();
})->withoutMiddleware(['api', 'throttle:api', \App\Http\Middleware\VerifyCsrfToken::class]);
