"use strict";
exports.__esModule = true;
var Controller = /** @class */ (function () {
    function Controller(view, model) {
        var _this = this;
        this.init = function () {
            var functions = [_this.controllerScale, _this.controllerNum, _this.addEvent, _this.controllerBetween, _this.controllerSetValue,
                _this.controllerSetScale, _this.controllerHideNum, _this.controllerRotate];
            functions.forEach(function (el) { return el(); });
        };
        this.calls = function () {
            _this.controllerBetween();
            _this.controllerNum();
        };
        this.f = function () {
            var functions = [_this.controllerBetween, _this.controllerNum, _this.controllerValue, _this.controllerScale, _this.controllerStep];
            functions.forEach(function (el) { return el(); });
        };
        this.controllerBetween = function () { return _this.model.modelBetween(_this.view.viewBetween); };
        this.controllerStep = function () { return _this.model.modelStep(_this.view.viewStep); };
        this.controllerCreate = function () { return _this.model.modelCreate(_this.view.viewCreate); };
        this.controllerScale = function () { return _this.model.modelScale(_this.view.viewScale); };
        this.controllerNum = function () { return _this.model.modelNum(_this.view.viewNum); };
        this.controllerValue = function () { return _this.model.modelValue(_this.view.viewValue); };
        this.controllerHideNum = function () { return _this.model.modelHideNum(_this.view.viewHideNum); };
        this.controllerRotate = function () { return _this.model.modelRotate(_this.view.viewRotate, _this.controllerBetween); };
        this.controllerSetValue = function () { return _this.model.modelSetValue(_this.view.viewValue, _this.calls); };
        this.controllerSetScale = function () { return _this.model.modelSetScale(_this.f); };
        this.addEvent = function () { return _this.model.modelAddEvent(_this.f); };
        this.view = view;
        this.model = model;
        this.init();
    }
    return Controller;
}());
exports["default"] = Controller;
