<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $name = $request->query('name');

        $products = Product::where('product.name', 'like', '%' . $name . '%')->paginate(8);

        return response()->json($products);
    }

    public function getProduct($product_id) {
        $product = Product::select('product.id', 'product.name', 'product.description', 'product.price', 'product.stock', 'product.image_url', 'c.name as category_name')
            ->join('category as c', 'product.category_id', '=', 'c.id')
            ->where('product.id', $product_id)
            ->get();
            
        return response()->json($product);
    }

    public function getProductsByCategory($category_id) {
        $products = Product::where('category_id', $category_id)
            ->paginate(8);

        return response()->json($products);
    }
    
}