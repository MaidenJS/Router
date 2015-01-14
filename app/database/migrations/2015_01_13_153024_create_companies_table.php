<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCompaniesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('companies', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name', 255);
			$table->string('email', 255);
			$table->string('address', 255);
			$table->string('phone', 255);
			$table->string('postal_code', 255);
			$table->string('country', 255);
			$table->string('photo_path', 255);
			$table->decimal('price', 9, 2);
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('companies');
	}

}
