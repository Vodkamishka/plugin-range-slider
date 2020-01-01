"use strict";
exports.__esModule = true;
var view_1 = require("./mvc/view");
var model_1 = require("./mvc/model");
var controller_1 = require("./mvc/controller");
(function ($) {
    $.fn.slider = function (options) {
        var settings = $.extend({
            value1: 5000,
            value2: 15000,
            min: 0,
            max: 25000,
            step: 50
        }, options);
        this.each(function (index, value) {
            var view = new view_1["default"](value, settings);
            var model = new model_1["default"](value);
            new controller_1["default"](view, model);
        });
    };
    $('.slider').slider();
}(jQuery));
var module;
if (module !== undefined)
    module.exports = {
        View: view_1["default"],
        Model: model_1["default"],
        Controller: controller_1["default"]
    };
