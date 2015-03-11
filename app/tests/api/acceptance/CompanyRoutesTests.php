<?php

class CompanyRoutesTest extends EliteTestingFramework {

    /**
     * Setup
     *
     */
    public function setUp()
    {
        parent::setUp();

        Auth::loginUsingId(1);
    }

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testGetAllCompanies()
    {
        $this->apiCall('GET', '/api/v1/companies');
    }

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testGetACompanyById()
    {
        $this->apiCall('GET', '/api/v1/companies/1');
    }

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testCreateACompany()
    {
        $input = [
            'name' => 'new',
            'email' => 'new@new.com',
            'address' => 'new address',
            'phone' => '1231231231',
            'postal_code' => '123 123',
            'country' => 'canada',
            'photo' => 'photo url',
            'price' => 1111
        ];
        $this->apiCall('POST', '/api/v1/companies', $input);
    }

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testUpdateACompany()
    {

    }

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testDeleteACompany()
    {

    }

}