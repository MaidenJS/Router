<?php namespace Acme\Modules\User;

use Auth;

trait UserTrait {

    function getAuthUser()
    {
        return Auth::user();
    }

}