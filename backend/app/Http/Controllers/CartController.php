<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function getCartBySession($session_id) {
        return $this->getCartItems($session_id, 'session_id');
    }
    
    public function getCartByUser() {
        return $this->getCartItems(Auth::id(), 'user_id');
    }

    private function getCartItems($id, $type) {
        $data = CartItem::select('p.id', 'p.name', 'p.description', 'p.price', 'p.stock', 'p.image_url', 'quantity')
            ->join('cart as c', 'cartItem.cart_id', '=', 'c.id')
            ->join('product as p', 'cartItem.product_id', '=', 'p.id')
            ->where("c.$type", $id)
            ->get();
        $cartId = $this->getCartId($id, $type);
        return response()->json(['id' => $cartId, 'data'=>$data]);
    }

    private function getCartId($id, $type) {
        return Cart::where("$type", $id)
        ->value('id');
    }

    public function removeItem($cartId, $productId) {
        $deleted = CartItem::where('cart_id', $cartId)
            ->where('product_id', $productId)
            ->delete();
        if ($deleted) {
            return response()->json(['message' => 'Item removed successfully']);
        } else {
            return response()->json(['message' => 'Item not found in cart'], 404);
        }
    }

    public function changeQuantity($cartId, $productId, $newQuantity)
    {
        $updated = CartItem::where('cart_id', $cartId)
            ->where('product_id', $productId)
            ->update(['quantity' => $newQuantity]);
        if ($updated) {
            return response()->json(['message' => 'Quantity updated successfully']);
        } else {
            return response()->json(['error' => 'Failed to update quantity'], 400);
        }
    }

    public function addItemAuth($productId, $type) {
        $id = Auth::id();
        return $this->addItem($productId, $type, $id);
    }

    public function addItemNoAuth($productId, $type, $id) {
        $cart = Cart::where($type.'_id', $id)
            ->first();

        if(!$cart) {
            $cart = Cart::create([
                'session_id' => $id,
                'expires_at' => now()->addDay(1),
            ]);
        }
        return $this->addItem($productId, $type, $id);
    }

    private function addItem($productId, $type, $id) {
        $cartId = $this->getCartId($id, $type.'_id');

        $item = CartItem::where('cart_id', $cartId)
            ->where('product_id', $productId)
            ->first();

        if($item) {
            $item->quantity += 1;
            $item->save();
        } else {
            $item = CartItem::create([
                'cart_id' => $cartId,
                'product_id' => $productId,
                'quantity' => 1
            ]);
        }
        if ($item) {
            return response()->json(['message' => 'Item added successfully']);
        } else {
            return response()->json(['error' => 'Failed to add item'], 400);
        }
    }
}