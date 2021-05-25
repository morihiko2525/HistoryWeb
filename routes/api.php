<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\HistoryController;
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

Route::post("/event/add",[EventController::class, 'addEvent']);

Route::post("/event/update",[EventController::class, 'updateEvent']);

Route::post("/event/delete", [EventController::class, 'deleteEvent']);

Route::post("/history/create",[HistoryController::class, 'store']);

Route::get("/getMyHistories/{id}",[HistoryController::class, 'getMyHistories']);

Route::get("/getHistoryData/{id}",[HistoryController::class, 'getHistoryData']);

Route::get("/getAllHistories",[HistoryController::class, 'getAllHistories']);


//User
Route::post("/signup", [UsersController::class, 'signup']);
Route::get("/login_init",[UsersController::class, 'login_init']);
Route::post("/login", [UsersController::class, 'login']);
Route::get("/logout", [UsersController::class, 'logout']);
Route::get("/is_me", [UsersController::class, 'is_me']);
Route::get("/fetch_userdata", [UsersController::class, 'getUserData']);