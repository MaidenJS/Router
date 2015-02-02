<!doctype html>
<html>

    <head>
        <title> Wiseproject </title>

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="wp is awesome">
        <meta name="author" content="yichen">

        <!-- CSS -->
        <link rel="shortcut icon" href="app/images/favicon.ico">
        <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css">
        <link href="app/css/styles.css" rel="stylesheet" type="text/css"/>
        <link href="app/css/animations.css" rel="stylesheet" type="text/css"/>
    </head>

    <body ng-app="app">

        <div> <?php echo Session::token(); ?> </div>
        <div> <?php echo csrf_token(); ?> </div>

    </body>
    
</html>
