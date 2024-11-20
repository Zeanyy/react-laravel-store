<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
    public function index($cartId)
    {
        $cart = CartItem::where('cart_id', $cartId)->get();
        return response()->json($cart);
    }
}