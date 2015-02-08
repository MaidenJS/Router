<?php namespace Acme\Modules\User\Commands\Register;

use Acme\Modules\User\Repositories\UserRepositoryInterface;
use Laracasts\Commander\CommandHandler;
// use Laracasts\Commander\Events\DispatchableTrait;

class RegisterUserCommandHandler implements CommandHandler{

    /**
     * @var UserRepositoryInterface
     */
    private $userRepository;

    /**
     * @param UserRepositoryInterface $userRepository
     */
    function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @param $command
     * @return mixed
     */
    public function handle($command)
    {
        // manipulate the input
        $input = [
            'email' => $command->email,
            'password' => $command->password
        ];

        // store it in the database
        $user = $this->userRepository->register($input);

        // fire the events that should occur after
        // sends an email to the user
        // Event::fire('myEvent'); //var_dump('sends an email top the user');

        // returns the response object
        return $user;
    }

}