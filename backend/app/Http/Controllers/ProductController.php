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

    public function getByCategory($category_id) {
        $products = Product::where('category_id', $category_id)->get();
        return response()->json($products);     
    }

}