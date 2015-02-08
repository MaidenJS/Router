<?php namespace Acme\Modules\Project;

use Illuminate\Support\ServiceProvider;

class ProjectServiceProvider extends ServiceProvider {

    /**
     * Registers and Binds all the relevant interfaces in the IOC container;
     * making sure all Repositories and any modules and/or utilities will
     * automatically be resolved via the IOC container
     */
    public function register()
    {
        $this->app->bind(
            'Acme\Modules\Project\Repositories\ProjectRepositoryInterface',
            'Acme\Modules\Project\Repositories\EloquentProjectRepository'
        );
    }
}