<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartItemController extends Controller
{
    public function getCartBySession($session_id) {
        return $this->getCartItems($session_id, 'session_id');
    }
    
    public function getCartByUser() {
        return $this->getCartItems(Auth::id(), 'user_id');
    }

    private function getCartItems($id, $type) {
        $data = CartItem::select('p.id', 'p.name', 'p.description', 'p.price', 'p.stock', 'p.image_url', 'quantity')
            ->join('cart as c', 'ci.cart_id', '=', 'c.id')
            ->join('product as p', 'ci.product_id', '=', 'p.id')
            ->where("c.$type", $id)
            ->get();
        $cartId = $this->getCartId($id, $type);
        return response()->json(['id' => $cartId, 'data'=>$data]);
    }

    private function getCartId($id, $type) {
        return DB::table('cart')
        ->where("$type", $id)
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
}