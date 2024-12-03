<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    protected $table = 'shipping';

    public $timestamps = false;

    protected $fillable = [
        'order_id',
        'full_name',
        'address',
        'city',
        'postal_code',
        'phone_number',
        'email',
        'shipping_date',
        'expected_delivery_date',
        'tracking_number',
    ];
}
