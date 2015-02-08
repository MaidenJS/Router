<?php namespace EliteTestingFramework\tests;

/**
 * Laravel specific testing framework for functional/db tests
 *
 * Dependencies:
 *	- Laravel 4.*
 *	- Mockery 0.9.*
 */
class EliteTestingFramework extends TestCase implements TestingFrameworkInterface {

	/**
	 * Used specifically by Mockery library
	 */
	public function tearDown()
	{
		Mockery::close();
	}

	/**
	 * Main Testing tool for API Acceptance testing
	 *
	 * Example:
	 * - $this->apiCall('GET', 'api/v1/companies/1');
	 * - $this->apiCall('POST', 'api/v1/companies', ['name' => 'myawesomecompanyname']);
	 *
	 * @param string $method
	 * @param string $route
	 * @param array $input
	 */
	public function apiCall($method, $route, array $input = [])
	{
		$response = $this->call($method, $route, $input);
		$content = $response->getContent();
		$data = json_decode($content);
		$this->assertJson($content);
		$this->assertTrue($data->success);
		$this->assertTrue($this->client->getResponse()->isOk());
	}

	/**
	 * Used specifically by Mockery library
	 *
	 * @param $table
	 * @param array $fields
	 */
	public function seeInDb($table, array $fields = [])
	{
		/*
		Example call:
		$this->seeInDb('users', [
			'first_name' => 'david',
			'last_name' => 'cooper'
		]);
		*/

		// input
		// $table = 'users';
		// $fields = [
		//	'first_name' => 'david',
		//	'last_name' => 'cooper'
		// ];
		// Setting up the SQL and Where clause
		$query = 'SELECT * FROM ' . $table . ' WHERE ';
		foreach ($fields as $field => $value)
		{
			$query .= $field . '=' . $value . ' AND ';
		}
		$query = substr($query, 0, -5);
		// Peroforming the SQL statement
		$result = DB::statement(DB::raw($query));
		// If there is more than 1 row, then it means the data exists in the db
		$count = count($result) > 0 ?: false;
		// assertions
		$this->assertTrue($count);
	}

	/**
	 * What I do not see in db
	 *
	 * @param $table
	 * @param array $fields
	 * @return int
	 */
	public function dontSeeInDb($table, array $fields = [])
	{
		return 1;
	}

}