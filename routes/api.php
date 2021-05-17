<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventController;
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
/*
Route::get('/event',function (Request $request) {
	
	//$events = App\Event::all();
	EventController::class , ''
	return response()->json(['events' => $events]);

});*/
/*
Route::get('/event', function (Request $request){
    $events = EventController::getAllEvents();
    return response()->json(['events' => $events]);
});
*/
Route::get("/event",[EventController::class, 'getAllEvents']);

Route::get("/event/{id}",[EventController::class, 'index']);

Route::post("history/create", function(Request $request){
	$events = App\Event::all();
	return response()->json(['events' => $events]);
});
//User
Route::post("/signup", [UserController::class, 'signup']);
Route::get("/login_init",[UserController::class, 'login_init']);
Route::post("/login", [UserController::class, 'login']);
Route::get("/logout", [UserController::class, 'logout']);
Route::get("/is_me", [UserController::class, 'is_me']);
