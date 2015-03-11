<?php

class CompanyRoutesTest extends EliteTestingFramework {

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testGetAllCompanies()
    {
        $this->apiCall('GET', 'api/v1/companies');
    }

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testGetACompanyById()
    {
        $this->apiCall('GET', 'api/v1/companies/1');
    }

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testCreateACompany()
    {

    }

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testUpdateACompany()
    {

    }

}