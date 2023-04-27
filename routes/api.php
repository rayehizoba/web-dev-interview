<?php

use App\Http\Controllers\ProductController;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/react_interview/{perPage}', [ProductController::class, 'productsApi']);
Route::post('/react_interview', [ProductController::class, 'storeApi'])->name('store.product');
Route::delete('/react_interview/{id}', [ProductController::class, 'destroyApi'])->name('product.delete');
Route::patch('/react_interview/update/{id}', [ProductController::class, 'updateApi'])->name('product.updateApi');