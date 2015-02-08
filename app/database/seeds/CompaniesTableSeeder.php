<?php

use Faker\Factory as Faker;

class CompaniesTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		foreach(range(1, 100) as $index)
		{
			Company::create([
				'user_id' => rand(1, 100),
				'name' => $faker->name,
				'email' => $faker->email,
				'address' => $faker->address,
				'phone' => $faker->phoneNumber,
				'postal_code' => $faker->postcode,
				'country' => $faker->country,
				'photo' => $faker->fileExtension,
				'price' => $faker->randomFloat($nbMaxDecimals = 2, $min = 0, $max = NULL),
			]);
		}
	}

}