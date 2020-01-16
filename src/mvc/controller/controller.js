"use strict";
exports.__esModule = true;
var Controller = /** @class */ (function () {
    function Controller(view, model) {
        var _this = this;
        this.init = function () {
            _this.controllerSubscribe();
            var first_options = _this.getDataFromView();
            _this.sendDataToModel(first_options);
            _this.controllerBalls();
        };
        this.getDataFromView = function () { return _this.view.sendDataToController(); };
        this.sendDataToModel = function (options) { return _this.model.getDataFromController(options); };
        this.controllerSubscribe = function () { return _this.model.subscribe(_this.view.render); };
        this.controllerBalls = function () { return _this.view.addEventListeners({
            dispatchBallValueFirst: _this.model.dispatchBallValueFirst,
            dispatchBallValueSecond: _this.model.dispatchBallValueSecond,
            dispatchMin: _this.model.dispatchMin,
            dispatchMax: _this.model.dispatchMax,
            dispatchValueFirst: _this.model.dispatchValueFirst,
            dispatchValueSecond: _this.model.dispatchValueSecond,
            dispatchDisableValues: _this.model.dispatchDisableValues,
            dispatchVerticalView: _this.model.dispatchVerticalView,
            dispatchOneToggle: _this.model.dispatchOneToggle,
            dispatchStep: _this.model.dispatchStep
        }); };
        this.view = view;
        this.model = model;
        this.init();
    }
    return Controller;
}());
exports["default"] = Controller;
