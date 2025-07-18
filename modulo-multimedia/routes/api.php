<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ResourceTypeController;

Route::get('/test-api', function () {
    return response()->json(['message' => 'API funcionando correctamente']);
});

Route::apiResource('tags', App\Http\Controllers\TagController::class);
Route::apiResource('posts', PostController::class);
Route::apiResource('resources', App\Http\Controllers\ResourceController::class);
Route::apiResource('resource-types', ResourceTypeController::class);
Route::apiResource('comments', App\Http\Controllers\CommentController::class);
