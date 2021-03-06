<?php

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
/*
Route::get('/', function () {
    return view('welcome');
});*/
Route::get('/{any}', function(){
    return view('app');
})->where('any', '.*'); 

/*
Route::get('/create', function () {
    return view('create_history');
});*/
Route::get('/create', 'HistoryController@create')->name('histories.create');

Route::post('/create', 'HistoryController@store')->name('histories.store');

Route::get('/history_view/{id}', 'EventController@index')->name('events.index');

Route::post('/history_view', 'EventController@store')->name('events.store');

Route::get('/history_view/{id}/edit', 'EventController@edit')->name('events.edit');

Route::post('/history_view/edit', 'EventController@update')->name('events.update');

Route::post('/history_view/destroy', 'EventController@destroy')->name('events.destroy');

Route::get('/userpage', 'UsersController@index')->name('userpage.index');
/*
Route::get('/history_view', function () {
    return view('history_view');
});*/

// ユーザ登録
Route::get('signup', 'Auth\RegisterController@showRegistrationForm')->name('signup.get');
Route::post('signup', 'Auth\RegisterController@register')->name('signup.post');

//認証
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login')->name('login.post');
Route::get('logout', 'Auth\LoginController@logout')->name('logout.get');

Route::group(['middleware' => ['auth']], function () {
    Route::resource('users', 'UsersController', ['only' => ['index', 'show']]);
});

Route::get('/auth/{service}', 'OAuthLoginController@getGoogleAuth')->where('service', 'google');
Route::get('/auth/callback/google', 'OAuthLoginController@authGoogleCallback');
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
