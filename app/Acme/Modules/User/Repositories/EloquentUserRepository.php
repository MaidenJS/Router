<?php namespace Acme\Modules\User\Repositories;

use User, Auth;

class EloquentUserRepository implements UserRepositoryInterface {

    private $userModel;

    /**
     * @var Auth
     */
    private $authModel;

    /**
     * @param User $userModel
     * @param Auth $authModel
     */
    function __construct(
        User $userModel,
        Auth $authModel
    )
    {
        $this->userModel = $userModel;
        $this->authModel = $authModel;
    }

    /**
     * @param $input
     */
    public function register(array $input)
    {
        return $this->userModel->create($input);
    }

    /**
     * @param $credentials
     * @return mixed
     */
    public function login(array $credentials)
    {
        return Auth::attempt($credentials);
    }

    /**
     * @return mixed
     */
    public function logout()
    {
        return Auth::logout();
    }

    /**
     * @var User
     */
    public function getAuthUser()
    {
        return Auth::user();
    }

}