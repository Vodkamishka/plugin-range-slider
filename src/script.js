"use strict";
exports.__esModule = true;
var view_1 = require("./mvc/view/view");
var model_1 = require("./mvc/model/model");
var controller_1 = require("./mvc/controller/controller");
var panel_1 = require("./mvc/panel/panel");
// tslint:disable-next-line:only-arrow-functions
(function ($) {
    $.fn.slider = function (options) {
        var view = new view_1["default"](this, options);
        var model = new model_1["default"]();
        // tslint:disable-next-line:no-unused-expression
        new controller_1["default"](view, model);
    };
}(jQuery));
$('.wrapper').each(function (index, element) {
    // tslint:disable-next-line:no-unused-expression
    new panel_1["default"]($(element));
});
