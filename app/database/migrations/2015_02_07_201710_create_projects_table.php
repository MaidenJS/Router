<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProjectsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('projects', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('company_id')->unsigned();
			//$table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');

			$table->string('name');
			$table->text('description');
			$table->integer('view_count');
			$table->decimal('budget', 10, 2);
			$table->dateTime('start_time');
			$table->dateTime('end_time');

			$table->softDeletes();
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
		Schema::drop('projects');
	}

}
