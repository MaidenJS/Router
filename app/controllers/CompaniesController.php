<?php

use Acme\Modules\Company\Repositories\CompanyRepositoryInterface;

class CompaniesController extends ApiController {

	/**
	 * @var CompanyRepositoryInterface
	 */
	protected $companyRepository;

	/**
	 * @param CompanyRepositoryInterface $companyRepository
	 */
	function __construct(CompanyRepositoryInterface $companyRepository)
	{
		$this->companyRepository = $companyRepository;
	}

	/**
	 * Display a listing of the resource.
	 * GET /companies
	 *
	 * @return Response
	 */
	public function index()
	{
		$companies = $this->companyRepository->getAll();

		return $this->responseSuccess($companies);
	}

	/**
	 * Display the specified resource.
	 * GET /companies/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$company = $this->companyRepository->getById($id);

		return $this->responseSuccess($company);
	}

	/**
	 * Store a newly created resource in storage.
	 * POST /companies
	 *
	 * @return Response
	 */
	public function store()
	{
		$input = [];

		$company = $this->companyRepository->create($input);

		return $this->responseSuccess($company);
	}

	/**
	 * Update the specified resource in storage.
	 * PUT /companies/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$company = $this->companyRepository->update($id, []);

		return $this->responseSuccess($company);
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /companies/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$company = $this->companyRepository->delete($id);

		return $this->responseSuccess($company);
	}

}