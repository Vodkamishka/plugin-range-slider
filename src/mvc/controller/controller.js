"use strict";
exports.__esModule = true;
var Controller = /** @class */ (function () {
    function Controller(view, model) {
        var _this = this;
        this.init = function () {
            _this.controllerSubscribe();
            var first_options = _this.getDataFromView();
            _this.sendDataToModel(first_options);
            //this.controllerBalls()
            _this.controllerState();
        };
        this.getDataFromView = function () { return _this.view.sendDataToController(); };
        this.sendDataToModel = function (options) { return _this.model.getDataFromController(options); };
        this.controllerSubscribe = function () { return _this.model.subscribe(_this.view.render); };
        this.controllerBalls = function () { return _this.view.addEventListenersBalls({
            dispatchBallValueFirst: _this.model.dispatchBallValueFirst,
            dispatchBallValueSecond: _this.model.dispatchBallValueSecond
        }); };
        this.controllerState = function () { return _this.view.addEventListeners(_this.model.dispatchState, _this.model.dispatchBallValueFirst, _this.model.dispatchBallValueSecond); };
        this.view = view;
        this.model = model;
        this.init();
    }
    return Controller;
}());
exports["default"] = Controller;
