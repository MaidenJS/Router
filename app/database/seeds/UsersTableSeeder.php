<?php

use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder {

    public function run()
    {
        $faker = Faker::create();

        User::create([
            'email' => 'yichen@yichen.com',
            'password' => 'yichen'
        ]);

        foreach(range(1, 49) as $index)
        {
            User::create([
                'email' => $faker->email,
                'password' => 'password'
            ]);
        }
    }

}