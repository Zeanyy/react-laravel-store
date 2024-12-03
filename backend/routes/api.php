<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CategoryController;

Route::get('/categories', [CategoryController::class, 'index']);


use App\Http\Controllers\ProductController;

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product_id}', [ProductController::class, 'getProduct']);
Route::get('/products/category/{category_id}', [ProductController::class, 'getProductsByCategory']);

use App\Http\Controllers\CartController;

Route::get('/cart/session/{session_id}', [CartController::class, 'getCartBySession']);
Route::middleware('auth:sanctum')->get('/cart/user', [CartController::class, 'getCartByUser']);

Route::delete('/cart/{cartId}/remove/{productId}', [CartController::class, 'removeItem']);
Route::put('/cart/{cartId}/update/{productId}/{newQuantity}', [CartController::class, 'changeQuantity']);

Route::middleware('auth:sanctum')->post('/cart/add/{productId}/{type}/', [CartController::class, 'addItemAuth']);
Route::post('/cart/add/{productId}/{type}/{id}', [CartController::class, 'addItemNoAuth']);


use App\Http\Controllers\AuthController;

Route::middleware('auth:sanctum')->get('/checkLogin', [AuthController::class, 'checkLogin']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/logout', [AuthController::class, 'logout']);

use App\Http\Controllers\OrderController;

Route::middleware('auth:sanctum')->post('/order/user', [OrderController::class, 'index']);
Route::post('/order/guest', [OrderController::class, 'index']);
Route::post('/order/validate', [OrderController::class, 'validateForm']);
