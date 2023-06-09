<?php

use App\Http\Controllers\CityController;
use App\Http\Controllers\CountryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('countries')->group(function () {
    Route::get('/', [CountryController::class, 'index']);
    Route::get('/{id}', [CountryController::class, 'show']);
    Route::middleware('auth:sanctum')->post('/', [CountryController::class, 'store']);
    Route::middleware('auth:sanctum')->put('/{id}', [CountryController::class, 'update']);
    Route::middleware('auth:sanctum')->delete('/{id}', [CountryController::class, 'destroy']);
});

Route::prefix('cities')->group(function () {
    Route::get('/', [CityController::class, 'index']);
    Route::get('/{id}', [CityController::class, 'show']);
    Route::middleware('auth:sanctum')->post('/', [CityController::class, 'store']);
    Route::middleware('auth:sanctum')->put('/{id}', [CityController::class, 'update']);
    Route::middleware('auth:sanctum')->delete('/{id}', [CityController::class, 'destroy']);
});
