<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
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

Route::get('/event',function (Request $request) {
	
	$events = App\Event::all();
	
	return response()->json(['events' => $events]);

});

//User
Route::post("/signup", [UserController::class, 'signup']);
Route::get("/login_init",[UserController::class, 'login_init']);
Route::post("/login", [UserController::class, 'login']);
Route::get("/logout", [UserController::class, 'logout']);
Route::get("/is_me", [UserController::class, 'is_me']);
