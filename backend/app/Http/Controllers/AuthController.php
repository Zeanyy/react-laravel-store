<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use App\Models\User;

class AuthController extends Controller
{
    public function checkLogin(Request $request)
    {
        if (Auth::check()) {
            return response()->json(200);
        }
        
        return response()->json(401);
    }
    
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ], [
            'email.required' => 'E-mail jest wymagany.',
            'email.email' => 'Podaj poprawny adres e-mail.',
            'password.required' => 'Hasło jest wymagane.',
        ]);

        if (Auth::attempt(['email' => $validated['email'], 'password' => $validated['password']])) {
            $user = Auth::user();
            $token = $user->createToken('Store')->plainTextToken;

            return response()->json(['message' => 'Zalogowano pomyślnie!', 'token' => $token], 200);
        }

        return response()->json(['errors' => ['global' => 'Nieprawidłowy email lub hasło.']], 401);
    }

    public function register(Request $request) {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:user',
            'password' => 'required|min:8|confirmed',
        ], [
            'name.required' => 'Nazwa jest wymagana.',
            'email.required' => 'E-mail jest wymagany.',
            'email.email' => 'Podaj prawidłowy adres e-mail.',
            'email.unique' => 'Ten e-mail jest już zajęty.',
            'password.required' => 'Hasło jest wymagane.',
            'password.min' => 'Hasło musi mieć co najmniej 8 znaków.',
            'password.confirmed' => 'Hasła nie są takie same.',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        DB::table('cart')->insert([
            'user_id' => $user->id,
        ]);

        return $this->login($request);
    }

    public function logout(Request $request) {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
    }
}
