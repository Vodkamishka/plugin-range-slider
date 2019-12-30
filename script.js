var View = /** @class */ (function () {
    function View(value, settings) {
        var _this = this;
        this.create = function () {
            var _a = _this.settings, value1 = _a.value1, value2 = _a.value2, min = _a.min, max = _a.max, step = _a.step;
            var panel = "<div class=\"slider__panel\" ><label class=\"slider__label\">min<input class=\"slider__min\" type=\"number\" value=" + min + "></label><label class=\"slider__label\">max<input class=\"slider__max\" type=\"number\" value=" + max + "></label><label class=\"slider__label\">value1<input class=\"slider__value1\" type=\"number\" value=" + value1 + "></label><label class=\"slider__label\">value2<input class=\"slider__value2\" type=\"number\" value=" + value2 + "></label><label class=\"slider__label\">disable values<input class=\"slider__valuesRunners\" type=\"checkbox\" value=\"\"></label><label class=\"slider__label\">change view<input class=\"slider__rotate\" type=\"checkbox\" value=\"\"></label><label class=\"slider__label\">step<input class=\"slider__step\" type=\"number\" value=''></label></div>";
            var range = "<div class=\"slider__range\" ><input class=\"slider_first\" type=\"range\" value=" + value1 + " step=" + step + " min=" + min + " max=" + max + "><input class=\"slider_second\" type=\"range\" value=" + value2 + " step=" + step + " min=" + min + " max=" + max + "><div class=\"slider__between\" ></div><div class=\"slider__begin\" ></div><div class=\"slider__end\" ></div><div class=\"slider__num_first\" ></div><div class=\"slider__num_second\" ></div></div>";
            if (_this.wrapper !== null)
                $(_this.wrapper).html(range + panel);
        };
        this.viewBetween = function (left, betwWidth, el) {
            el.style.marginLeft = left + 'px';
            el.style.width = betwWidth + 'px';
        };
        this.viewStep = function (slider1, slider2, step) {
            slider1.step = step.value || _this.settings.step;
            slider2.step = step.value || _this.settings.step;
        };
        this.viewScale = function (minVal, maxVal, el, el2, slider1, slider2) {
            $(el).html(minVal);
            slider1.min = minVal;
            slider2.min = minVal;
            $(el2).html(maxVal);
            slider1.max = maxVal;
            slider2.max = maxVal;
        };
        this.viewNum = function (el, num, left) {
            el.innerHTML = num.toString();
            el.style.marginLeft = left.toString() + 'px';
        };
        this.viewValue = function (el, num) { return el.value = num.toString(); };
        this.viewHideNum = function (el) { return el.classList.toggle('slider_white'); };
        this.viewRotate = function (f) {
            var _a = f(), range = _a.range, num1 = _a.num1, num2 = _a.num2, slider1 = _a.slider1, slider2 = _a.slider2;
            range.classList.toggle('slider_vertical');
            num1.classList.toggle('slider__rotateReverse');
            num2.classList.toggle('slider__rotateReverse');
            slider1.classList.toggle('slider_short');
            slider2.classList.toggle('slider_short');
        };
        this.wrapper = value;
        this.settings = settings;
        this.create();
    }
    return View;
}());
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
(function ($) {
    $.fn.slider = function (options) {
        var settings = $.extend({
            value1: 5000,
            value2: 15000,
            min: 0,
            max: 25000,
            step: 50
        }, options);
        this.each(function (index, value) {
            var view = new View(value, settings);
            var model = new Model(value);
            new Controller(view, model);
        });
    };
    $('.slider').slider();
}(jQuery));
var module;
if (module !== undefined)
    module.exports = {
        View: View,
        Model: Model,
        Controller: Controller
    };
