<!doctype html>
<html ng-app="app">

    <head>
        <title> Wiseproject </title>

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="wp is awesome">
        <meta name="author" content="yichen">
        <link href="app/images/favicon.ico" rel="shortcut icon">

        <!-- CSS -->
        <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css">

        <!-- BUILD CSS -->
        <link href="app/build/vendor.css" rel="stylesheet" type="text/css">
        <link href="app/build/app.css" rel="stylesheet" type="text/css"/>
    </head>

    <body>

        <!------------ Navbar ------------>
        <div ng-include="'app/scripts/modules/layout/navbar/views/navbar.html'"></div>

        <!------------ Main ------------>
        <div class="container">
            <div class="span12 ui-view-container">
                <div class="well" ui-view></div>
            </div>
        </div>

        <!------------ Footer ------------>
        <!--<div ng-include="'app/scripts/modules/layout/footer/views/footer.html'"></div>-->

        <!-- CSRF Tokens -->
        <div> <?php //echo Session::token(); ?> </div>
        <div> <?php //echo csrf_token(); ?> </div>

        <!-- BUILD JS -->
        <script src="app/build/vendor.js"></script>
        <script src="app/build/app.js"></script>

    </body>
    
</html>
