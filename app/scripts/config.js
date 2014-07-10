require.config({
  paths: {
    "underscore"    : "../bower_components/underscore/underscore",
    "jquery"        : "../bower_components/jquery/dist/jquery",
    "backbone"      : "../bower_components/backbone/backbone",
    "handlebars"    : "../bower_components/handlebars/handlebars.min",
    "text"          : "../bower_components/requirejs-text/text",
    "tweenmax"      : "../bower_components/greensock-js/TweenMax.min",
    "timelinemax"   : "../bower_components/greensock-js/TimelineMax.min",
    "draggable"     : "../bower_components/greensock-js/utils/Draggable.min",
    "iscroll"       : "../bower_components/iscroll/build/iscroll"
  },

  shim: {

    underscore: {
      exports: '_'
    },

    backbone: {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    },

    handlebars: {
      exports: 'Handlebars'
    },

    tweenmax: {
      exports: 'TweenMax'
    },

    timelinemax: {
      deps: ['tweenmax'],
      exports: 'TimelineMax'
    },

    draggable: {
      deps: ['tweenmax'],
      exports: 'Draggable'
    },

    iscroll: {
      deps: ['jquery'],
      exports: 'IScroll'
    }
  },

  deps: ["main"]
});
