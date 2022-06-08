<?php

use App\Http\Controllers\AddressTypeController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\CityDistrictController;
use App\Http\Controllers\PersonalController;
use App\Http\Controllers\PhoneController;
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

Route::prefix('personal')->group(function () {
    Route::get('/control', [PersonalController::class, 'index']);
    Route::post('/new', [PersonalController::class, 'store']);
    Route::post('/add-phone', [PhoneController::class, 'store']);
    Route::post('/addtype', [AddressTypeController::class, 'store']);
    Route::get('/address', [CityDistrictController::class, 'index']);
});
