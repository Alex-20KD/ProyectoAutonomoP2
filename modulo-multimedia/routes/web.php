<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ResourceController;

Route::get('/test-web', function () {
    return 'Web funcionando correctamente';
});

Route::resource('resources', ResourceController::class);
