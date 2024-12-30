<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        User::firstOrCreate(
            ['email' => 'carlo@gmail.com'],
            [
            'name' => 'Carlo',
            'surname' => 'Loi',
            'password' => Hash::make('12345678'),
            'status' => 'default'
        ]);
        
        User::firstOrCreate(
            ['email' => 'mario@gmail.com'],
            [
            'name' => 'Mario',
            'surname' => 'Fois',
            'password' => Hash::make('12345678'),
            'status' => 'default'
        ]);

    }
}
