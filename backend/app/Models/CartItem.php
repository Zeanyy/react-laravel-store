<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    public $timestamps = false;

    protected $table = 'cartItem';

    protected $fillable = [
        'cart_id',
        'product_id',
        'quantity'
    ];
}
