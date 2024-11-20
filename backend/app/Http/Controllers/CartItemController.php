<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
    public function index($session_id)
    {
        $cart = CartItem::select('name', 'description', 'price', 'stock', 'image_url', 'quantity')
        ->join('cart as c', 'cartItem.cart_id', '=', 'c.id')
        ->join('product as p', 'cartItem.product_id', '=', 'p.id')
        ->where('c.session_id', $session_id)
        ->get();
        return response()->json($cart);
    }
}