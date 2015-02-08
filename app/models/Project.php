<?php

class Project extends \Eloquent {

	protected $table = 'projects';

	protected $fillable = [
		'company_id',
		'name',
		'description',
		'view_count',
		'budget',
		'start_time',
		'end_time'
	];

	public function company()
	{
		return $this->belongsTo('Company');
	}

}