<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Shipping;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index(Request $request) {

        DB::beginTransaction();

        try {
            $order = Order::create([
                'user_id' => Auth::check() ? Auth::id() : null,
                'order_date' => now(),
                'total_price' => $request['total_price'],
            ]);
    
            foreach($request['cart_data'] as $product) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product['id'],
                    'quantity' => $product['quantity'],
                    'unit_price' => $product['price'],
                ]);
            }
    
            $formData = $request['form_data'];
            $shipping = Shipping::create([
                'order_id' => $order->id,
                'full_name' => $formData['fullName'],
                'address' => $formData['address'],
                'city' => $formData['city'],
                'postal_code' => $formData['postalCode'],
                'phone_number' => $formData['phoneNumber'],
                'email' => $formData['email'],
                'shipping_date' => now(),
                'expected_delivery_date' => now()->addDay(5),
                'tracking_number' => $this->generateUniqueTrackingNumber(),
            ]);

            DB::commit();

            return response()->json(['message' => 'Order and items were saved successfully']);

        } catch(\Exception $e) {
            
            DB::rollBack();

            return response()->json(['error' => 'Failed to save the order: ' . $e->getMessage()], 400);
        }
    }

    private function generateUniqueTrackingNumber()
    {
        do {
            $trackingNumber = Str::random(6);
        } while (Shipping::where('tracking_number', $trackingNumber)->exists());

        return $trackingNumber;
    }

    public function validateForm(Request $request) {
        $validated = $request->validate([
            'fullName' => 'required|max:255',
            'address' => 'required|max:255',
            'postalCode' => 'required|digits:5',
            'city' => 'required|max:255',
            'phoneNumber' => 'required|digits:9',
            'email' => 'required|email|max:255',
        ], [
            'fullName.required' => 'Imię i nazwisko są wymagane',
            'address.required' => 'Adres jest wymagany',
            'postalCode.required' => 'Kod pocztowy jest wymagany',
            'postalCode.digits' => 'Kod pocztowy musi zawierać dokładnie 5 cyfr',
            'city.required' => 'Miejscowość jest wymagana',
            'phoneNumber.required' => 'Numer telefonu jest wymagany',
            'phoneNumber.digits' => 'Numer telefonu musi składać się z 9 cyfr',
            'email.required' => 'Adres e-mail jest wymagany.',
            'email.email' => 'Podaj poprawny adres e-mail',
        ]);
    
        return response()->json(['message' => 'Formularz został poprawnie przesłany']);
    }
}
