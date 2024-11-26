<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CategoryController;

Route::get('/categories', [CategoryController::class, 'index']);


use App\Http\Controllers\ProductController;

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product_id}', [ProductController::class, 'getProduct']);
Route::get('/products/category/{category_id}', [ProductController::class, 'getProductsByCategory']);


use App\Http\Controllers\CartItemController;

Route::get('/cart/session/{session_id}', [CartItemController::class, 'getCartBySession']);
Route::get('/cart/user/{user_id}', [CartItemController::class, 'getCartByUser']);