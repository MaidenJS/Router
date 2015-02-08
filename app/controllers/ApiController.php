<?php

use Acme\Modules\User\UserTrait;
use Laracasts\Commander\CommanderTrait;

class ApiController extends \BaseController {

    use CommanderTrait;

    use UserTrait;

    /**
     * Main Response used in the controllers for 200 and other 200s responses
     *
     * @param array $data
     * @param int $code
     *
     * @return mixed
     */
    public function responseSuccess($data = [], $code = 200)
    {
        $response = [
            'success' => true,
            'code' => 200,
            'data' => $data
        ];

        return Response::json($response, $code);
    }

}