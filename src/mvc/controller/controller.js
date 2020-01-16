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
            _this.controllerMin();
            _this.controllerMax();
            _this.controllerValueFirst();
            _this.controllerValueSecond();
            _this.controllerDisableValues();
            _this.controllerVerticalView();
            _this.controllerOneRunner();
            _this.controllerStep();
        };
        this.getDataFromView = function () { return _this.view.sendDataToController(); };
        this.sendDataToModel = function (options) { return _this.model.getDataFromController(options); };
        this.controllerSubscribe = function () { return _this.model.subscribe(_this.view.render); };
        this.controllerBalls = function () { return _this.view.addEventListenerBalls(_this.model.dispatchBallValueFirst, _this.model.dispatchBallValueSecond); };
        this.controllerMin = function () { return _this.view.addEventListenerMin(_this.model.dispatchMin); };
        this.controllerMax = function () { return _this.view.addEventListenerMax(_this.model.dispatchMax); };
        this.controllerValueFirst = function () { return _this.view.addEventListenerValueFirst(_this.model.dispatchValueFirst); };
        this.controllerValueSecond = function () { return _this.view.addEventListenerValueSecond(_this.model.dispatchValueSecond); };
        this.controllerDisableValues = function () { return _this.view.addEventListenerDisableValues(_this.model.dispatchDisableValues); };
        this.controllerVerticalView = function () { return _this.view.addEventListenerVerticalView(_this.model.dispatchVerticalView); };
        this.controllerOneRunner = function () { return _this.view.addEventListenerOneToggle(_this.model.dispatchOneToggle); };
        this.controllerStep = function () { return _this.view.addEventListenerStep(_this.model.dispatchStep); };
        this.view = view;
        this.model = model;
        this.init();
    }
    return Controller;
}());
exports["default"] = Controller;
