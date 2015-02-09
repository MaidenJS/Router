# WiseProject [![Build Status](https://travis-ci.org/yichenzhu1337/my_esports_world.svg?branch=master)](https://travis-ci.org/yichenzhu1337/my_esports_world) #
Wiseproject provides a platform for companies to find vendors for sourcing contracts.

## Repository Information & Guide ##

### API Documentation ###
- API docs: https://speca.io/yichenzhu1337/wiseproject-api/

### Server Details ###
- Domain Name: http://www.wiseproject.ca/
- IP Address: 104.131.109.224
- Username: forge
- Sudo Password: 2mm6ZVfJWpsfInNd2L27
- Database Name: forge
- Database Username: forge
- Database Password: OWuIFrEalK0jGAJ0wE5F

### Database Configuration ###
1. create a file called ".env.php"
2. copy and paste:
```
<?php
    return [
        'DB_HOST' => 'localhost',
        'DB_NAME' => 'wiseproject',
        'DB_USERNAME' => 'root',
        'DB_PASSWORD' => 'root'
    ];
```

### Backend Setup and Update ###
1. Install Laravel: "composer install"
2. update Laravel: "composer update"
3. Migrate your database: "php artisan migrate"
4. Seed your database: "php artisan db:seed"
5. Autoload All files: "composer dump-autoload -o"

### Frontend Setup and Update ###
1. Install node_modules: "npm install" in root folder
2. Install bower_components: "cd public", "bower install", "bower list"
3. Update bower_components: "cd public", "bower update", "bower list"

### Running Gulp ###
1. "gulp build --dev" or gulp build --prod"
2. "gulp watch --dev"

### Running the application ###
1. type "php artisan serve" on the command line to start the server
2. host is at: "localhost:8000"
3. run gulp and watcher: "gulp watch --dev"
4. access api via the prefix: "localhost:8000/api/v1/*route-name*"

### Testing with PHPUnit ###
1. Windows Aliasing: (at)DOSKEY phpunit=vendor\bin\phpunit
2. Linux Aliasing: alias phpunit=vendor\bin\phpunit
3. type "phpunit" on the command line

### Testing with Codeception ###
1. Windows Aliasing: (at)DOSKEY cc=vendor\bin\codecept
2. Linux Aliasing: alias cc=vendor\bin\codecept
3. "cc run [suite]"
