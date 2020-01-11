"use strict";
exports.__esModule = true;
var Controller = /** @class */ (function () {
    function Controller(view, model) {
        var _this = this;
        this.init = function () {
            var functions = [_this.controllerNum, _this.addEvent, _this.controllerBetween, _this.controllerSetValue,
                _this.controllerHideNum, _this.controllerRotate];
            functions.forEach(function (el) { return el(); });
            var first_options = _this.getDataFromView();
            _this.sendDataToModel(first_options);
            _this.controllerSubscribe();
            _this.controllerMin();
            _this.controllerMax();
            _this.controllerValueFirst();
            _this.controllerValueSecond();
        };
        this.calls = function () {
            _this.controllerBetween();
            _this.controllerNum();
        };
        this.f = function () {
            var functions = [_this.controllerBetween, _this.controllerNum, _this.controllerValue, _this.controllerStep];
            functions.forEach(function (el) { return el(); });
        };
        this.getDataFromView = function () { return _this.view.sendDataToController(); };
        this.sendDataToModel = function (options) { return _this.model.getDataFromController(options); };
        this.controllerSubscribe = function () { return _this.model.subscribe(_this.view.render); };
        this.controllerMin = function () { return _this.view.addEventListenerMin(_this.model.dispatchMin); };
        this.controllerMax = function () { return _this.view.addEventListenerMax(_this.model.dispatchMax); };
        this.controllerValueFirst = function () { return _this.view.addEventListenerValueFirst(_this.model.dispatchValueFirst); };
        this.controllerValueSecond = function () { return _this.view.addEventListenerValueSecond(_this.model.dispatchValueSecond); };
        this.controllerBetween = function () { return _this.model.modelBetween(_this.view.viewBetween); };
        this.controllerStep = function () { return _this.model.modelStep(_this.view.viewStep); };
        this.controllerCreate = function () { return _this.model.modelCreate(_this.view.viewCreate); };
        this.controllerNum = function () { return _this.model.modelNum(_this.view.viewNum); };
        this.controllerValue = function () { return _this.model.modelValue(_this.view.viewValue); };
        this.controllerHideNum = function () { return _this.model.modelHideNum(_this.view.viewHideNum); };
        this.controllerRotate = function () { return _this.model.modelRotate(_this.view.viewRotate, _this.controllerBetween); };
        this.controllerSetValue = function () { return _this.model.modelSetValue(_this.view.viewValue, _this.calls); };
        this.addEvent = function () { return _this.model.modelAddEvent(_this.f); };
        this.view = view;
        this.model = model;
        this.init();
    }
    return Controller;
}());
exports["default"] = Controller;
