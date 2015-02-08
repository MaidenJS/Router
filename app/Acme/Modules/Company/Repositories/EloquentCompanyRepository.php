<?php namespace Acme\Modules\Company\Repositories;

use Company;

class EloquentCompanyRepository implements CompanyRepositoryInterface {

    /**
     * @var Company
     */
    private $companyModel;

    /**
     * @param Company $companyModel
     */
    function __construct(Company $companyModel)
    {
        $this->companyModel = $companyModel;
    }

    public function getAll()
    {
        return $this->companyModel->all();
    }

    public function getById($id)
    {
        return $this->companyModel->find($id);
    }

    public function create($input)
    {
        return $this->companyModel->create($input);
    }

    public function update($id, $input)
    {
        return $this->companyModel->find($id)->update($input);
    }

    public function delete($id)
    {
        return $this->companyModel->delete($id);
    }

}