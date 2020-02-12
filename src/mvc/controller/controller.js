"use strict";
exports.__esModule = true;
var Controller = /** @class */ (function () {
    function Controller(view, model) {
        var _this = this;
        this.init = function () {
            // tslint:disable-next-line:variable-name
            var first_options = _this.view.sendDatafromViewToController();
            _this.model.subscribe(_this.view.render, first_options.render);
            _this.model.sendDataFromControllerToModel(first_options);
            first_options.addEventListeners(_this.model.dispatchState);
            _this.controllerState();
        };
        this.controllerState = function () { return _this.view.addEventListeners(_this.model.dispatchBallValueFirst, _this.model.dispatchBallValueSecond, _this.model.getState); };
        this.view = view;
        this.model = model;
        this.init();
    }
    return Controller;
}());
exports["default"] = Controller;
