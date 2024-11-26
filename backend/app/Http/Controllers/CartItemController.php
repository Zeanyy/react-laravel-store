<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
    public function index()
    {
        
    }

    public function getCartBySession($session_id) {
        return $this->getCart($session_id, 'session_id');
    }
    
    public function getCartByUser($user_id) {
        return $this->getCart($user_id, 'user_id');
    }

    private function getCart($id, $type) {
        $cart = CartItem::select('name', 'description', 'price', 'stock', 'image_url', 'quantity')
            ->join('cart as c', 'cartItem.cart_id', '=', 'c.id')
            ->join('product as p', 'cartItem.product_id', '=', 'p.id')
            ->where("c.$type", $id)
            ->get();
        return response()->json($cart);
    }
}