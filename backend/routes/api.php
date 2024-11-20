<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CategoryController;

Route::get('/categories', [CategoryController::class, 'index']);


use App\Http\Controllers\ProductController;

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{category_id}', [ProductController::class, 'getByCategory']);


use App\Http\Controllers\CartItemController;

Route::get('/cart/{cart_id}', [CartItemController::class, 'index']);