<?php

use Faker\Factory as Faker;

class ProjectsTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		foreach(range(1, 100) as $index)
		{
			Project::create([
				'company_id' => rand(1, 50),
				'name' => $faker->name,
				'description' => $faker->paragraph(5),
				'view_count' => $faker->randomDigitNotNull,
				'budget' => $faker->randomFloat($nbMaxDecimals = 2, $min = 0, $max = NULL),
				'start_time' => $faker->dateTime,
				'end_time' => $faker->dateTime
			]);
		}
	}

}