<?php namespace Acme\Modules\Company\Repositories;

class EloquentProjectRepository implements ProjectRepositoryInterface {

    private $projectModel;

    function __construct(Project $projectModel)
    {
        $this->projectModel = $projectModel;
    }

    public function getAll()
    {
        return $this->projectModel->all();
    }

    public function getById($id)
    {
        return $this->projectModel->find($id);
    }

    public function create($input)
    {
        return $this->projectModel->create($input);
    }

    public function update($id, $input)
    {
        return $this->projectModel->find($id)->update($input);
    }

    public function delete($id)
    {
        return $this->projectModel->destroy($id);
    }

}