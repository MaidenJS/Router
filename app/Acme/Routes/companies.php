<?php

Route::resource('/companies', 'CompaniesController', [
    'only' => [
        'index',
        'show',
        'store',
        'update',
        'destroy'
    ]
]);