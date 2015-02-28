<?php

use Acme\Modules\User\UserTrait;
use Laracasts\Commander\CommanderTrait;

class ApiController extends \BaseController {

    use CommanderTrait;

    use UserTrait;

    /**
     * Status Code List
     *
     *
     *
     */

    /**
     * Main Response used in the controllers for 200 and other 200s responses
     *
     * @param array $data
     * @param string $message
     * @param int $code = 200
     * @param array $headers
     * @param int options
     *
     * @return mixed
     */
    public function response($data = [], $message = 'Custom Response Message.', $code = 200, $headers = [], $options = 0)
    {
        $response = [
            'success' => true,
            'message' => $message,
            'code' => $code,
            'data' => $data
        ];

        return Response::json($response, $code, $headers, $options);
    }

}