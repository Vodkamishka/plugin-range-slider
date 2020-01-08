"use strict";
exports.__esModule = true;
var view_1 = require("./mvc/view/view");
var model_1 = require("./mvc//model/model");
var controller_1 = require("./mvc/controller/controller");
(function ($) {
    $.fn.slider = function (options) {
        var settings = $.extend({
            value1: 5000,
            value2: 15000,
            min: 0,
            max: 25000,
            step: 50
        }, options);
        this.each(function (index, element) {
            var view = new view_1["default"]($(element), settings);
            var model = new model_1["default"](element);
            new controller_1["default"](view, model);
        });
    };
    $('.slider').slider();
}(jQuery));
