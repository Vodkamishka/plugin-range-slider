"use strict";
exports.__esModule = true;
var Model = /** @class */ (function () {
    function Model(value) {
        var _this = this;
        this.modelBetween = function (viewBetween) {
            var _a = _this.helper(), left = _a.left, betwLength = _a.betwLength, between = _a.between;
            viewBetween(left, betwLength, between);
        };
        this.modelStep = function (viewStep) {
            var _a = _this.helper(), slider1 = _a.slider1, slider2 = _a.slider2, step = _a.step;
            viewStep(slider1, slider2, step);
        };
        this.modelScale = function (viewScale) {
            var _a = _this.helper(), slider1 = _a.slider1, slider2 = _a.slider2, min = _a.min, max = _a.max, begin = _a.begin, end = _a.end;
            viewScale(min.val(), max.val(), begin, end, slider1, slider2);
        };
        this.helper = function () {
            var w;
            if (_this.wrapper !== null)
                w = $(_this.wrapper);
            var elementsDom = {};
            var arrayDom = ['slider__range', 'slider__rotate', 'slider_first', 'slider_second', 'slider__begin', 'slider__end', 'slider__between', 'slider__num_first',
                'slider__num_second', 'slider__valuesRunners', 'slider__step'];
            arrayDom.forEach(function (el) {
                if (w !== null)
                    elementsDom[el] = w.find("." + el).get(0);
            });
            var slider__range = elementsDom.slider__range, slider__rotate = elementsDom.slider__rotate, slider_first = elementsDom.slider_first, slider_second = elementsDom.slider_second, slider__begin = elementsDom.slider__begin, slider__end = elementsDom.slider__end, slider__between = elementsDom.slider__between, slider__num_first = elementsDom.slider__num_first, slider__num_second = elementsDom.slider__num_second, slider__valuesRunners = elementsDom.slider__valuesRunners, slider__step = elementsDom.slider__step;
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
            }
            var widthScale = Math.abs(Number(max.val()) - Number(min.val()));
            var betwLength = widthSlider * Math.abs(val1 - val2) / widthScale;
            var left = (val1 - Number(min.val())) * widthSlider / widthScale;
            var leftNoChanged = left;
            var right = (val2 - Number(min.val())) * widthSlider / widthScale;
            if (val2 > val1) {
                left = left;
            }
            else {
                left = right;
            }
            return { left: left, right: right, leftNoChanged: leftNoChanged, value1: value1, value2: value2, num1: slider__num_first, num2: slider__num_second, slider1: slider_first, slider2: slider_second, betwLength: betwLength, between: slider__between, min: min, max: max,
                begin: slider__begin, end: slider__end, val1: val1, val2: val2, valuesRunners: slider__valuesRunners, range: slider__range, rotateSlider: slider__rotate, step: slider__step, widthSlider: widthSlider };
        };
        this.wrapper = value;
    }
    Model.prototype.modelAddEvent = function (functions) {
        var _a = this.helper(), slider1 = _a.slider1, slider2 = _a.slider2;
        slider1.addEventListener('input', functions);
        slider2.addEventListener('input', functions);
    };
    Model.prototype.modelNum = function (viewNum) {
        var _a = this.helper(), num1 = _a.num1, num2 = _a.num2, val1 = _a.val1, val2 = _a.val2, right = _a.right, leftNoChanged = _a.leftNoChanged;
        viewNum(num1, val1, leftNoChanged);
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
        var _a = this.helper(), valuesRunners = _a.valuesRunners, num1 = _a.num1, num2 = _a.num2;
        valuesRunners.addEventListener('change', function () { return f(num1); });
        valuesRunners.addEventListener('change', function () { return f(num2); });
    };
    Model.prototype.modelRotate = function (f, controllerBetween) {
        var _this = this;
        var _a = this.helper(), range = _a.range, rotateSlider = _a.rotateSlider;
        if (range !== null && rotateSlider !== null)
            rotateSlider.addEventListener('change', function () {
                f(_this.helper);
                controllerBetween();
            });
    };
    return Model;
}());
exports["default"] = Model;
