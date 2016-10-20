(function () {
    var Router = function() {

        this.get = function (name, action) {
            var url = document.URL.split('#')[1];
            if (name == url) {
                console.log('URL CURRENT:', name);
                action();
            }
            else {
                console.log('URL init:', name);
            }
        };

        this.goTo = function(url) {
            window.location.href = url;
        };

        this.goBack = function() {
            window.history.back();
        };

    };

    maidenRouter = new Router();
})();
