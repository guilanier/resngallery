define(function(require, exports, module) {
    'use strict';

    // External dependencies.
    var Backbone = require('backbone');
    var $        = require('jquery');
    var app      = require('app');
    var AppView  = require('views/appView');
    var Background = require('utils/background');

    // Defining the application router.
    var Router = Backbone.Router.extend({

        routes: {
            ''  : 'index',
            '/' : 'index',
            'details/:id' : 'goDetails'
        },

        initialize: function () {

            $(document).on('click', 'a[href^="/"]', function (event) {
                var href = $(event.currentTarget).attr('href');

                // chain 'or's for other black list routes
                var passThrough = href.indexOf('sign_out') >= 0;

                // Allow shift+click for new tabs, etc.
                if(!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey){

                    event.preventDefault();
                    
                    // Remove leading slashes and hash bangs (backward compatablility)
                    var url = href.replace(/^\//,'').replace('\#\!\/','');

                    // Instruct Backbone to trigger routing events
                    app.router.navigate(url, { trigger: true });
                }
            });

            this.setup();
        },

        index: function() {
            this.appView.closeDetails();
        },

        setup: function () {
            
            if (!this.appView) {
                this.appView = new AppView( { el: '#app' } );
            }
        },

        goDetails: function (id_) {
            
            this.setup();
            this.appView.openDetails(id_);
        }

    });

    module.exports = Router;
});
