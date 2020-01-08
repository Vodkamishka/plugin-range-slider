"use strict";
exports.__esModule = true;
var createStore_1 = require("../../redux/createStore");
var reducer_1 = require("../../redux/reducer");
var actionCreators_1 = require("../../redux/actionCreators");
var initialState = {
    min: '0',
    max: '25000',
    value1: '5000',
    value2: '15000',
    disabaleValues: false,
    vertical: false,
    oneRunner: false,
    step: '50'
};
var store = createStore_1["default"](reducer_1["default"]);
store.dispatch(actionCreators_1.loadFirstData(initialState));
console.log(store.getState());
var Model = /** @class */ (function () {
    function Model(value) {
        var _this = this;
        this.modelBetween = function (viewBetween) {
            var _a = _this.helper(), left = _a.left, betwLength = _a.betwLength;
            viewBetween(left, betwLength);
        };
        this.modelStep = function (viewStep) {
            var _a = _this.helper(), slider1 = _a.slider1, slider2 = _a.slider2, step = _a.step;
            viewStep(slider1, slider2, step);
        };
        this.modelScale = function (viewScale) {
            var _a = _this.helper(), min = _a.min, max = _a.max;
            viewScale(min.val(), max.val());
        };
        this.getFirstOptionsFromController = function (options) {
            console.log(222);
        };
        this.helper = function () {
            var w;
            if (_this.wrapper !== null)
                w = $(_this.wrapper);
            var elementsDom = {};
            var arrayDom = ['slider__rotate', 'slider_first', 'slider_second', 'slider__num_first',
                'slider__num_second', 'slider__valuesRunners', 'slider__step'];
            arrayDom.forEach(function (el) {
                if (w !== null)
                    elementsDom[el] = w.find("." + el).get(0);
            });
            var slider__rotate = elementsDom.slider__rotate, slider_first = elementsDom.slider_first, slider_second = elementsDom.slider_second, slider__num_first = elementsDom.slider__num_first, slider__num_second = elementsDom.slider__num_second, slider__valuesRunners = elementsDom.slider__valuesRunners, slider__step = elementsDom.slider__step;
            var value1;
            var value2;
            var val1;
            var val2;
            var max;
            var min;
            var widthSlider;
            if (w !== null) {
                value1 = w.find('.slider__value1');
                value2 = w.find('.slider__value2');
                val1 = Number(w.find('.slider_first').val());
                val2 = Number(w.find('.slider_second').val());
                min = w.find('.slider__min');
                max = w.find('.slider__max');
                widthSlider = Number(w.find('.slider_first').width());
                if (val1 > val2 - 10) {
                    w.find('.slider_first').val(String(val2 - 10));
                }
                if (val2 < val1 + 10) {
                    w.find('.slider_second').val(String(val1 + 10));
                }
            }
            var widthScale = Math.abs(Number(max.val()) - Number(min.val()));
            var betwLength = widthSlider * Math.abs(val1 - val2) / widthScale - 20;
            var left = (val1 - Number(min.val())) * widthSlider / widthScale;
            var leftNoChanged = left;
            var right = (val2 - Number(min.val())) * widthSlider / widthScale;
            return { left: left, right: right, leftNoChanged: leftNoChanged, value1: value1, value2: value2, num1: slider__num_first, num2: slider__num_second, slider1: slider_first, slider2: slider_second, betwLength: betwLength, min: min, max: max,
                val1: val1, val2: val2, valuesRunners: slider__valuesRunners, rotateSlider: slider__rotate, step: slider__step, widthSlider: widthSlider };
        };
        this.wrapper = value;
    }
    Model.prototype.modelAddEvent = function (functions) {
        var _a = this.helper(), slider1 = _a.slider1, slider2 = _a.slider2;
        slider1.addEventListener('input', functions);
        slider2.addEventListener('input', functions);
    };
    Model.prototype.modelNum = function (viewNum) {
        var _a = this.helper(), num1 = _a.num1, num2 = _a.num2, val1 = _a.val1, val2 = _a.val2, right = _a.right, left = _a.left;
        viewNum(num1, val1, left);
        viewNum(num2, val2, right);
    };
    Model.prototype.modelValue = function (viewValue) {
        var _a = this.helper(), value1 = _a.value1, value2 = _a.value2, val1 = _a.val1, val2 = _a.val2;
        viewValue(value1.get(0), val1);
        viewValue(value2.get(0), val2);
    };
    Model.prototype.modelSetValue = function (viewValue, functions) {
        var _a = this.helper(), slider1 = _a.slider1, slider2 = _a.slider2, value1 = _a.value1, value2 = _a.value2;
        var func = function () {
            viewValue(slider1, Number(value1.val()));
            viewValue(slider2, Number(value2.val()));
            functions();
        };
        func();
        value1.get(0).addEventListener('change', func);
        value2.get(0).addEventListener('change', func);
    };
    Model.prototype.modelSetScale = function (functions) {
        this.helper().min.get(0).addEventListener("change", functions);
        this.helper().max.get(0).addEventListener("change", functions);
    };
    Model.prototype.modelHideNum = function (f) {
        var valuesRunners = this.helper().valuesRunners;
        valuesRunners.addEventListener('change', function () { return f(); });
    };
    Model.prototype.modelRotate = function (f, controllerBetween) {
        var rotateSlider = this.helper().rotateSlider;
        if (rotateSlider !== null)
            rotateSlider.addEventListener('change', function () {
                f();
                controllerBetween();
            });
    };
    return Model;
}());
exports["default"] = Model;
