<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    public $timestamps = false;

    protected $table = 'cart';

    protected $fillable = [
        'user_id',
        'session_id',
        'expires_at',
    ];
}
