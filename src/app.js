(function() {

    maidenRouter.get('/', function() {
        document.write('you are current on page: home');

        $.get('src/templates/home.html', function(templates) {
            var template = $(templates).filter('#tpl-greeting').html();
            $('#app').append(Mustache.render(template, {
                name: "hi",
                timeNow: "time now"
            }));
        });
    });

    maidenRouter.get('/about', function() {
        //console.log('about page');
    });

    maidenRouter.get('/contact', function() {
        //console.log('about page');
    });

})();