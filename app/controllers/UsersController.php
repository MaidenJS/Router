<?php

use Acme\Modules\User\Commands\Register\RegisterUserCommand;
use Acme\Modules\User\Repositories\UserRepositoryInterface;

class UsersController extends ApiController {

    /**
     * @var UserRepositoryInterface
     */
    protected $userRepository;

    /**
     * @param UserRepositoryInterface $userRepository
     */
    function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Registering a user will do the following:
     * 1. validate the the input
     * 2. sanitize the information (trim, strlower, strval)
     * 3. store the user in the database (handle the actual command)
     * 4. send events
     *    - send a welcoming email
     *    - add user to mailing list
     *    - log the user in
     * 5. redirect OR response in json
     *
     * Request:
     * @string email
     * @string password
     * @string password_confirmation ???
     *
     * @return Response
     */
    public function register()
    {
        $input = Input::only('email', 'password');

        $command = $this->execute(RegisterUserCommand::class, $input, [
            'Acme\Modules\User\Commands\Register\RegisterUserSanitizer'
        ]);

        return $this->responseSuccess($command);
    }

    /**
     * Logs the user in
     *
     * Request:
     * @email
     * @password
     *
     * @return Response
     */
    public function login()
    {
        $credentials = Input::only('email', 'password');

        //$this->registrationValidation->validate($credentials);

        $user = $this->userRepository->login($credentials);

        return $this->responseSuccess($user);
    }

    /**
     * Logs the user out
     *
     */
    public function logout()
    {
        return $this->responseSuccess($this->userRepository->logout());
    }

    /**
     * Returns the currently authenticated user and their information
     *
     * @return mixed
     */
    public function getAuthUser()
    {
        return $this->responseSuccess($this->userRepository->getAuthUser());
    }

}
