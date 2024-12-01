<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function getProduct($product_id) {
        $product = Product::where('id', $product_id)->get();
        return response()->json($product);     
    }

    public function getProductsByCategory($category_id) {
        $products = Product::where('category_id', $category_id)->get();
        return response()->json($products);
    }
    
}