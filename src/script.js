"use strict";
exports.__esModule = true;
var view_1 = require("./mvc/view/view");
var model_1 = require("./mvc//model/model");
var controller_1 = require("./mvc/controller/controller");
(function ($) {
    $.fn.slider = function (options) {
        this.each(function (index, element) {
            var view = new view_1["default"]($(element));
            var model = new model_1["default"](element);
            new controller_1["default"](view, model);
        });
    };
    $('.slider').slider();
}(jQuery));