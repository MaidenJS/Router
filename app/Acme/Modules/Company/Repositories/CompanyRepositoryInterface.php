<?php namespace Acme\Modules\Company\Repositories;

interface CompanyRepositoryInterface {

    public function getAll();

    public function getById($id);

    public function create($input);

    public function update($id, $input);

    public function delete($id);

}