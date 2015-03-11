<?php

class Company extends \Eloquent {

	protected $table = 'companies';

	protected $fillable = [
        'user_id',
		'name',
		'email',
		'address',
		'phone',
		'postal_code',
		'country',
		'photo',
		'price'
	];

}