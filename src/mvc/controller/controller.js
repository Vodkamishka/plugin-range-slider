"use strict";
exports.__esModule = true;
var Controller = /** @class */ (function () {
    function Controller(view, model) {
        var _this = this;
        this.init = function () {
            _this.model.subscribe(_this.view.render);
            // tslint:disable-next-line:variable-name
            var first_options = _this.view.sendDatafromViewToController();
            _this.model.sendDataFromControllerToModel(first_options);
            _this.controllerState();
        };
        this.controllerState = function () { return _this.view.addEventListeners(_this.model.dispatchState, _this.model.dispatchBallValueFirst, _this.model.dispatchBallValueSecond); };
        this.view = view;
        this.model = model;
        this.init();
    }
    return Controller;
}());
exports["default"] = Controller;
