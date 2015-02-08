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
        <link href="app/styles/main.css" rel="stylesheet" type="text/css"/>
    </head>

    <body ng-app="app">

        <!------------ Navbar ------------>
        <div ng-include="'app/scripts/modules/layout/navbar/views/navbar.html'"></div>

        <!------------ Main ------------>
        <div class="container page-wrap">
            <div ui-view></div>
        </div>

        <!------------ Footer ------------>
        <div ng-include="'app/scripts/modules/layout/footer/views/footer.html'"></div>

        <!-- CSRF Tokens -->
        <div> <?php echo Session::token(); ?> </div>
        <div> <?php echo csrf_token(); ?> </div>

        <!-- JS -->
        <script src="app/build/vendor.js"></script>
        <script src="app/build/app.js"></script>

    </body>
    
</html>
