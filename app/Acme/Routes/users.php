<?php

Route::post('/users/register', 'UsersController@register');

Route::post('/users/login', 'UsersController@login');

Route::post('/users/logout', 'UsersController@logout');

Route::get('/users/get-auth', 'UsersController@getAuthUser');