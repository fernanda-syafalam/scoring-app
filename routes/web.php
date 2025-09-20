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

Route::get('/score', function () {
    return view('scoring');
});

Route::post('/score-event', function (\Illuminate\Http\Request $request) {
    event(new \App\Events\Scoring($request->message));
    return null;
});

Route::post('/score-update', function (\Illuminate\Http\Request $request) {
    event(new \App\Events\ScoringUpdate($request->message));
    return null;
});

Route::post('/drop-verification', function (\Illuminate\Http\Request $request) {
    event(new \App\Events\DropVerification($request->message));
    return null;
});

Route::post('/operator-update', function (\Illuminate\Http\Request $request) {
    event(new \App\Events\Operator($request->message));
    return null;
});

Route::post('/match-chairman-update', function (\Illuminate\Http\Request $request) {
    event(new \App\Events\MatchChairman($request->message));
    return null;
});

Route::post('/verif-update', function (\Illuminate\Http\Request $request) {
    event(new \App\Events\Operator($request->message));
    return null;
});

Route::post('/penalty', function (\Illuminate\Http\Request $request) {
    event(new \App\Events\FoulIndicator($request->message));
    return null;
});

Route::post('/winner', function (\Illuminate\Http\Request $request) {
    event(new \App\Events\WinnerEvent($request->message));
    return null;
});

Route::get('/register', [\App\Http\Controllers\UserController::class, 'index']);
Route::post('/register', [\App\Http\Controllers\UserController::class, 'create']);

Route::get('admin', [\App\Http\Controllers\Admin::class, 'index'])->middleware('auth');
Route::get('admin/users', [\App\Http\Controllers\Admin::class, 'getUser'])->middleware('auth');
Route::get('admin/matches', [\App\Http\Controllers\Admin::class, 'getMatches'])->middleware('auth');
Route::get('admin/users/{user:id}/edit', [\App\Http\Controllers\UserController::class, 'edit'])->middleware('auth');
Route::delete('admin/users/{user:id}', [\App\Http\Controllers\UserController::class, 'destroy'])->middleware('auth');

Route::get('/', [\App\Http\Controllers\AuthController::class, 'login'])->name('login');
Route::get('/login', [\App\Http\Controllers\AuthController::class, 'login'])->name('login');
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'authenticate']);
Route::get('/logout', [\App\Http\Controllers\AuthController::class, 'logout'])->name('logout');

Route::get('/management', [\App\Http\Controllers\UserController::class, 'index'])->middleware('auth');
Route::post('/create-user', [\App\Http\Controllers\UserController::class, 'create'])->middleware('auth');
Route::put('/edit-user/{id}', [\App\Http\Controllers\UserController::class, 'edit'])->middleware('auth');
Route::delete('/delete-user/{id}', [\App\Http\Controllers\UserController::class, 'destroy'])->middleware('auth');

Route::get('/management/match', [\App\Http\Controllers\MatchController::class, 'index'])->middleware('auth')->middleware('auth');
Route::post('/create-match', [\App\Http\Controllers\MatchController::class, 'create'])->middleware('auth');
Route::put('/edit-match/{id}', [\App\Http\Controllers\MatchController::class, 'edit'])->middleware('auth');
Route::delete('/delete-match/{id}', [\App\Http\Controllers\MatchController::class, 'destroy'])->middleware('auth');
Route::post('/management/import-match', [\App\Http\Controllers\MatchController::class, 'import'])->middleware('auth');

Route::get('/management/arena', [\App\Http\Controllers\ArenaController::class, 'index'])->middleware('auth')->middleware('auth');
Route::post('/management/create-arena', [\App\Http\Controllers\ArenaController::class, 'create'])->middleware('auth');
Route::put('/management/edit-arena/{id}', [\App\Http\Controllers\ArenaController::class, 'edit'])->middleware('auth');
Route::delete('/management/delete-arena/{id}', [\App\Http\Controllers\ArenaController::class, 'destroy'])->middleware('auth');

Route::get('/management/history', [\App\Http\Controllers\HistoryController::class, 'index'])->middleware('auth')->middleware('auth');
Route::post('/create-history', [\App\Http\Controllers\HistoryController::class, 'create'])->middleware('auth')->middleware('auth');
Route::delete('/delete-history/{id}', [\App\Http\Controllers\HistoryController::class, 'destroy'])->middleware('auth');

Route::get('/jury', [\App\Http\Controllers\JuryController::class, 'index'])->middleware('auth');

Route::get('/council', [\App\Http\Controllers\CouncilController::class, 'index'])->middleware('auth');

Route::get('/scoreboard', [\App\Http\Controllers\ScoreboardController::class, 'index'])->middleware('auth');

Route::get('/match-chairman', [\App\Http\Controllers\MatchChairmanController::class, 'index'])->middleware('auth');

Route::get('/operator', [\App\Http\Controllers\OperatorController::class, 'index'])->middleware('auth');

Route::get('/download/match', [\App\Http\Controllers\Data::class, 'getDownloadExcel']);
