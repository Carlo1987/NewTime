<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    
    public function register(Request $request){

        $rules_validate = [
            'name' => 'required|string|regex:/^[a-zA-Z\s]+$/',
            'surname' => 'required|string|regex:/^[a-zA-Z\s]+$/',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed'
        ];

        $error_messages =  [
            'name.required' => 'Nome obbligatorio',
            'name.string' => 'Nome deve essere una stringa',
            'name.regex' => 'Il nome non può contenere numeri',

            'surname.required' => 'Cognome obbligatorio',
            'surname.string' => 'Cognome deve essere una stringa',
            'surname.regex' => 'Il cognome non può contenere numeri',

            'email.required' => 'Email obbligatoria',
            'email.email' => 'Email non valida',
            'email.unique' => 'Email già registrata',

            'password.required' => 'Password obbligatoria',
            'password.string' => 'Formato password non valido',
            'password.min' => 'La password deve avere almeno 8 caratteri',
            'password.confirmed' => 'Hai inserito due password diverse'
        ];

        $validator = Validator::make($request->all(),$rules_validate,$error_messages);

        if($validator->fails()){
            return response()->json([                
                'errors' => $validator->errors()
             ], 422);
         } 
 

        $validate_data = $validator->validated();

        User::create([
            'name' => $validate_data['name'],
            'surname' => $validate_data['surname'],
            'email' => $validate_data['email'],
            'password' => Hash::make($validate_data['password']),
            'status' => 'new_user'
        ]);

        return response()->json([
            'message' => 'Utente registrato!'
            ], 201);
    }





    public function login(Request $request){

        $rules_validate = [
            'email' => 'required|email',
            'password' => 'required|string|min:8'
        ];

        $error_messages =  [
            'email.required' => 'Email obbligatoria',
            'email.email' => 'Email non valida',

            'password.required' => 'Password obbligatoria',
            'password.string' => 'Formato password non valido',
            'password.min' => 'La password deve avere almeno 8 caratteri',
        ];

        $validator = Validator::make($request->all(),$rules_validate,$error_messages);


        if($validator->fails()){
            return response()->json([                
                'errors' => $validator->errors()
             ], 422);
        }


        $validate_data = $validator->validated();

        $user = User::where('email',$validate_data['email'])->first();

        if(!$user){
            return response()->json([
                'message' => 'Email errata'
            ], 401);
        }


        if(!Hash::check($validate_data['password'],$user->password)){
            return response()->json([
                'message' => 'Password errata'
            ], 401);
        }



        $token = $user->createToken('auth_token')->plainTextToken;

        $user = User::where('email', $validate_data['email'])->first();
       
        return response()->json([
            'token' => $token,
            'user' => array(
                'name' => $user->name,
                'surname' => $user->surname,
                'email' => $user->email,
                'status' => $user->status
            )
        ]);
    }




    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => true
        ]);
    }

}
