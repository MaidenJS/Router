<?php namespace Acme\Modules\User\Commands\Register;

use Acme\Modules\User\Validation\RegisterUserValidation;

class RegisterUserValidator {

    protected $registrationValidation;

    function __construct(RegisterUserValidation $registerUserValidation)
    {
        $this->registerUserValidation = $registerUserValidation;
    }

    public function validate($command)
    {
        $credentials = [
            'email' => $command->email,
            'password' => $command->password
        ];

        $this->registerUserValidation->validate($credentials);
    }

} 