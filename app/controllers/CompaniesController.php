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

		return $this->response(
            $data = $companies,
            $message = 'List of all companies in the db.',
            $code = 200
        );
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

        return $this->response(
            $data = $company,
            $message = 'Lists the specified company by id in the db.',
            $code = 200
        );
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

        return $this->response(
            $data = $company,
            $message = 'Company created.',
            $code = 200
        );
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

		return $this->response(
            $data = $company,
            $message = 'Company updated.',
            $code = 201
        );
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

        return $this->response(
            $data = $company,
            $message = 'Company deleted.',
            $code = 200
        );
	}

}