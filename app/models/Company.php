<?php

class Company extends \Eloquent {

	protected $table = 'companies';

	protected $fillable = [
		'name',
		'email',
		'address',
		'phone',
		'postal_code',
		'country',
		'photo_path',
		'price'
	];

}