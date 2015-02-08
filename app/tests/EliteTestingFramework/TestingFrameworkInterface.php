<?php namespace EliteTestingFramework\tests;

/**
 * Interface TestingFrameworkInterface
 * @package EliteTestingFramework\tests
 */
interface TestingFrameworkInterface {

    public function apiCall($method, $route, array $input = []);

    public function seeInDb($table, array $fields = []);

    public function dontSeeInDb($table, array $fields = []);

}