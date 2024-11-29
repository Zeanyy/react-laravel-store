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
Route::middleware('auth:sanctum')->get('/cart/user', [CartItemController::class, 'getCartByUser']);


use App\Http\Controllers\AuthController;

Route::middleware('auth:sanctum')->get('/checkLogin', [AuthController::class, 'checkLogin']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/logout', [AuthController::class, 'logout']);

Route::delete('/cart/{cartId}/item/{productId}/remove', [CartItemController::class, 'removeItem']);
Route::put('/cart/{cartId}/item/{productId}/quantity/{newQuantity}', [CartItemController::class, 'changeQuantity']);