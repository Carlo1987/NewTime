<?php


use Illuminate\Support\Facades\Route;




Route::post('/register', 'App\Http\Controllers\AuthController@register');  
Route::post('/login', 'App\Http\Controllers\AuthController@login');
Route::get('/getUsers' , 'App\Http\Controllers\UserController@getUsers');


Route::group(['middleware'=>'auth:sanctum'] , function(){

    Route::get('/getUser', 'App\Http\Controllers\UserController@getUser');
    Route::put('/editUser', 'App\Http\Controllers\UserController@editUser');
    Route::delete('/deleteUser', 'App\Http\Controllers\UserController@deleteUser');
    Route::get('/logout', 'App\Http\Controllers\AuthController@logout');

});

