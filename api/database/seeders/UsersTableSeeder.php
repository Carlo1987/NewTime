<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class UsersTableSeeder extends Seeder
{

    private $password;


    public function __construct() {
        $this->password = '12345678';
    }


    public function run(): void
    {

        User::firstOrCreate(
            ['email' => 'carlo@gmail.com'],
            [
            'name' => 'Carlo',
            'surname' => 'Loi',
            'password' => Hash::make($this->password),
            'status' => 'default'
        ]);
        
        User::firstOrCreate(
            ['email' => 'mario@gmail.com'],
            [
            'name' => 'Mario',
            'surname' => 'Fois',
            'password' => Hash::make($this->password),
            'status' => 'default'
        ]);

    }
}
