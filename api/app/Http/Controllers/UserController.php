<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class UserController extends Controller
{

    protected $user;



    public function __construct(Request $request)
    {
        $this->user = $request->user();
    }



    public function getUsers(){
        $users = User::all();

        return response()->json([
            $users
        ]);
    }




    public function editUser(Request $request){

        $rules_validate = [
            'name' => 'required|string|regex:/^[a-zA-Z\s]+$/',
            'surname' => 'required|string|regex:/^[a-zA-Z\s]+$/',
            'email' => 'required|email',
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


        if($this->user->status == 'default' && !Hash::check($validate_data['password'] , $this->user->password )){
            return response()->json([
                'message' => 'La password di questo Utente non può essere modificata'
            ], 409);
        } 


        $data = [
            'name' => $validate_data['name'],
            'surname' => $validate_data['surname'],
            'email' => $validate_data['email'],
            'password' => Hash::make($validate_data['password'])
        ];


        $this->user->update($data);

        return response()->json([
            'message' => 'Utente aggiornato!',
            'user' => array(
                'name' => $this->user->name,
                'surname' => $this->user->surname,
                'email' => $this->user->email,
                'status' => $this->user->status
            )
            ], 201);
    }




    public function deleteUser(){

        if($this->user->status == 'default'){
            return response()->json([
                'message' => 'Questo utente non può essere cancellato'
            ], 409);
        }

        $this->user->tokens()->delete();
        $this->user->delete();

        return response()->json([
            'status' => true
            ], 201);        
    }

}
