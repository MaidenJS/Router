<?php

use Acme\Modules\Company\Repositories\ProjectRepositoryInterface;

class ProjectsController extends ApiController {

	protected $projectRepository;

	function __construct(ProjectRepositoryInterface $projectRepository)
	{
		$this->projectRepository = $projectRepository;
	}

	/**
	 * Display a listing of projects
	 *
	 * @return Response
	 */
	public function index()
	{
		$projects = $this->projectRepository->getAll();

		return $this->responseSuccess($projects);
	}

	/**
	 * Display the specified project.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$project = $this->projectRepository->getById($id);

		return $this->responseSuccess($project);
	}

	/**
	 * Store a newly created project in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$input = [];

		$project = $this->projectRepository->create($input);

		return $this->responseSuccess($project);
	}

	/**
	 * Update the specified project in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$input = [];

		$project = $this->projectRepository->update($id, $input);

		return $this->responseSuccess($project);
	}

	/**
	 * Remove the specified project from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$project = $this->projectRepository->delete($id);

		return $this->responseSuccess($project);
	}

}
