<?php

use App\Http\Controllers\PuppeteerController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// ========================================
// OPTIMIZATION: Handle favicon requests efficiently
// Prevent repeated logging and overhead
// ========================================
Route::get('/favicon.ico', function () {
    return response()->file(public_path('favicon.ico'), ['Cache-Control' => 'public, max-age=31536000']);
})->withoutMiddleware([\App\Http\Middleware\VerifyCsrfToken::class]);

Route::get('/score', function () {
    return view('scoring');
});

// Broadcast event routes
Route::post('/score-event', [\App\Http\Controllers\BroadcastController::class, 'scoreEvent']);
Route::post('/score-update', [\App\Http\Controllers\BroadcastController::class, 'scoreUpdate']);
Route::post('/drop-verification', [\App\Http\Controllers\BroadcastController::class, 'dropVerification']);
Route::post('/operator-update', [\App\Http\Controllers\BroadcastController::class, 'operatorUpdate']);
Route::post('/ketua-pertandingan-update', [\App\Http\Controllers\BroadcastController::class, 'ketuaPertandinganUpdate']);
Route::post('/verif-update', [\App\Http\Controllers\BroadcastController::class, 'verifUpdate']);
Route::post('/penalty', [\App\Http\Controllers\BroadcastController::class, 'penalty']);
Route::post('/winner', [\App\Http\Controllers\BroadcastController::class, 'winner']);

Route::get('/register', [\App\Http\Controllers\UserController::class, 'index']);
Route::post('/register', [\App\Http\Controllers\UserController::class, 'create']);

Route::get('admin', [\App\Http\Controllers\Admin::class, 'index'])->middleware('auth');
Route::get('admin/users', [\App\Http\Controllers\Admin::class, 'getUser'])->middleware('auth');
Route::get('admin/users/{user:id}/edit', [\App\Http\Controllers\UserController::class, 'edit'])->middleware('auth');
Route::delete('admin/users/{user:id}', [\App\Http\Controllers\UserController::class, 'destroy'])->middleware('auth');

Route::get('/', [\App\Http\Controllers\AuthController::class, 'login'])->name('home');
Route::get('/login', [\App\Http\Controllers\AuthController::class, 'login'])->name('login');
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'authenticate']);
Route::get('/logout', [\App\Http\Controllers\AuthController::class, 'logout'])->name('logout');

Route::get('/management', [\App\Http\Controllers\UserController::class, 'index'])->middleware('auth');
Route::post('/create-user', [\App\Http\Controllers\UserController::class, 'create'])->middleware('auth');
Route::put('/edit-user/{id}', [\App\Http\Controllers\UserController::class, 'edit'])->middleware('auth');
Route::delete('/delete-user/{id}', [\App\Http\Controllers\UserController::class, 'destroy'])->middleware('auth');

Route::get('/management/pertandingan', [\App\Http\Controllers\PartaiController::class, 'index'])->middleware('auth');
Route::post('/create-pertandingan', [\App\Http\Controllers\PartaiController::class, 'create'])->middleware('auth');
Route::put('/edit-pertandingan/{id}', [\App\Http\Controllers\PartaiController::class, 'edit'])->middleware('auth');
Route::delete('/delete-pertandingan/{id}', [\App\Http\Controllers\PartaiController::class, 'destroy'])->middleware('auth');
Route::post('/management/import-pertandingan', [\App\Http\Controllers\PartaiController::class, 'import'])->middleware('auth');

Route::get('/management/gelanggang', [\App\Http\Controllers\GelanggangController::class, 'index'])->middleware('auth');
Route::post('/management/create-gelanggang', [\App\Http\Controllers\GelanggangController::class, 'create'])->middleware('auth');
Route::put('/management/edit-gelanggang/{id}', [\App\Http\Controllers\GelanggangController::class, 'edit'])->middleware('auth');
Route::delete('/management/delete-gelanggang/{id}', [\App\Http\Controllers\GelanggangController::class, 'destroy'])->middleware('auth');

Route::get('/management/history', [\App\Http\Controllers\HistoryController::class, 'index'])->middleware('auth');
Route::post('/create-history', [\App\Http\Controllers\HistoryController::class, 'create'])->middleware('auth');
Route::delete('/delete-history/{id}', [\App\Http\Controllers\HistoryController::class, 'destroy'])->middleware('auth');

Route::get('/juri', [\App\Http\Controllers\JuriController::class, 'index'])->middleware('auth');

Route::get('/dewan', [\App\Http\Controllers\DewanController::class, 'index'])->middleware('auth');

Route::get('/papan_score', [\App\Http\Controllers\PapanScoreController::class, 'index'])->middleware('auth');

Route::get('/ketua_pertandingan', [\App\Http\Controllers\KetuaPertandinganController::class, 'index'])->middleware('auth');

Route::get('/operator', [\App\Http\Controllers\OperatorController::class, 'index'])->middleware('auth');

Route::get('/download/partai', [\App\Http\Controllers\Data::class, 'getDownloadExcel']);
