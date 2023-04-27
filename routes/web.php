<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return view('welcome');
    /* return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]); */
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/laravel_interview/{perPage}', [ProductController::class, 'products'])->name('products');
Route::get('/laravel_interview', [ProductController::class, 'products'])->name('products');
Route::post('/laravel_interview', [ProductController::class, 'store'])->name('store.product');

Route::get('/laravel_interview/edit/{id}', [ProductController::class, 'edit'])->name('product.edit');
Route::put('/laravel_interview/update/{id}', [ProductController::class, 'update'])->name('product.update');
Route::delete('/laravel_interview/{id}', [ProductController::class, 'destroy'])->name('product.delete');

Route::get('/react_interview', function () {
    return Inertia::render('Products/ListProducts');
});


require __DIR__.'/auth.php';
