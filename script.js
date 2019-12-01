var View = /** @class */ (function () {
    function View(value, settings) {
        var _this = this;
        this.create = function () {
            var _a = _this.settings, value1 = _a.value1, value2 = _a.value2, min = _a.min, max = _a.max, step1 = _a.step1, step2 = _a.step2;
            var panel = "<div class=\"panel\" ><p class=\"p\" >\u041F\u0430\u043D\u0435\u043B\u044C \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438:</p><label class=\"label\" >\u041C\u0438\u043D. \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0430<input class=\"min\" type=\"text\" value=" + min + "></label><label class=\"label\" >\u041C\u0430\u043A\u0441. \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0430<input class=\"max\" type=\"text\" value=" + max + "></label><label class=\"labelVal1\" >\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 1<input class=\"value1\" type=\"text\" value=" + value1 + "></label><label class=\"labelVal2\" >\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 2<input class=\"value2\" type=\"text\" value=" + value2 + "></label><label class=\"labelFlag1\" >\u041E\u0442\u043A\u043B. \u0431\u0435\u0433\u0443\u043D\u043E\u043A 1<input class=\"flag1\" type=\"checkbox\" value=\"\"></label><label class=\"labelFlag2\" >\u041E\u0442\u043A\u043B. \u0431\u0435\u0433\u0443\u043D\u043E\u043A 2<input class=\"flag2\" type=\"checkbox\" value=\"\"></label><label class=\"labelNum1\" >\u041E\u0442\u043A\u043B. \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 1<input class=\"inpNum1\" type=\"checkbox\" value=\"\"></label><label class=\"labelNum2\" >\u041E\u0442\u043A\u043B. \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 2<input class=\"inpNum2\" type=\"checkbox\" value=\"\"></label><label class=\"labelRotate\" >\u0412\u043A\u043B. \u0432\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u0438\u0434<input class=\"rotateSlider\" type=\"checkbox\" value=\"\"></label><label class=\"label\" >\u0420\u0430\u0437\u043C\u0435\u0440 \u0448\u0430\u0433\u0430 1<input class=\"step\" type=\"text\" value=\"\"></label><label class=\"label\" >\u0420\u0430\u0437\u043C\u0435\u0440 \u0448\u0430\u0433\u0430 2<input class=\"step2\" type=\"text\" value=\"\"></label></div>";
            var range = "<div class=\"range\" ><input class=\"slider1\" type=\"range\" value=" + value1 + " step=" + step1 + " min=" + min + " max=" + max + "><input class=\"slider2\" type=\"range\" value=" + value2 + " step=" + step2 + " min=" + min + " max=" + max + "><div class=\"between\" ></div><div class=\"begin\" ></div><div class=\"end\" ></div><div class=\"num1\" ></div><div class=\"num2\" ></div></div>";
            if (_this.wrapper !== null)
                $(_this.wrapper).html(panel + range);
        };
        this.viewBetween = function (left, betwWidth, el) {
            el.style.marginLeft = left + 'px';
            el.style.width = betwWidth + 'px';
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
        this.viewHideBall = function (slider, num, val, between) {
            slider.classList.toggle('hide');
            if (slider.parentNode !== null && slider.parentNode.querySelectorAll('.hide').length < 2 && between !== null)
                between.classList.toggle('hide');
            num.classList.toggle('white');
            val.classList.toggle('white');
        };
        this.viewHideNum = function (el) { return el.classList.toggle('white'); };
        this.viewRotate = function (el, el2, el3) {
            el.classList.toggle('rotate');
            el2.classList.toggle('rotateReverse');
            el3.classList.toggle('rotateReverse');
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
        this.modelScale = function (viewScale) {
            var _a = _this.helper(), slider1 = _a.slider1, slider2 = _a.slider2, min = _a.min, max = _a.max, begin = _a.begin, end = _a.end;
            viewScale(min.val(), max.val(), begin, end, slider1, slider2);
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
    Model.prototype.modelHideBall = function (f) {
        var _a = this.helper(), flag1 = _a.flag1, flag2 = _a.flag2, slider1 = _a.slider1, slider2 = _a.slider2, num1 = _a.num1, num2 = _a.num2, value1 = _a.value1, value2 = _a.value2, between = _a.between;
        flag1.addEventListener('change', function () { return f(slider1, num1, value1.get(0), between); });
        flag2.addEventListener('change', function () { return f(slider2, num2, value2.get(0), between); });
    };
    Model.prototype.modelHideNum = function (f) {
        var _a = this.helper(), inpNum1 = _a.inpNum1, inpNum2 = _a.inpNum2, num1 = _a.num1, num2 = _a.num2;
        inpNum1.addEventListener('change', function () { return f(num1); });
        inpNum2.addEventListener('change', function () { return f(num2); });
    };
    Model.prototype.modelRotate = function (f) {
        var _a = this.helper(), range = _a.range, rotateSlider = _a.rotateSlider, num1 = _a.num1, num2 = _a.num2;
        if (range !== null && rotateSlider !== null)
            rotateSlider.addEventListener('change', function () { return f(range, num1, num2); });
    };
    Model.prototype.helper = function () {
        var w;
        if (this.wrapper !== null)
            w = $(this.wrapper);
        var elementsDom = {};
        var arrayDom = ['range', 'rotateSlider', 'slider1', 'slider2', 'begin', 'end', 'between', 'num1', 'num2', 'flag1', 'flag2', 'inpNum1', 'inpNum2'];
        arrayDom.forEach(function (el) {
            if (w !== null)
                elementsDom[el] = w.find("." + el).get(0);
        });
        var range = elementsDom.range, rotateSlider = elementsDom.rotateSlider, slider1 = elementsDom.slider1, slider2 = elementsDom.slider2, begin = elementsDom.begin, end = elementsDom.end, between = elementsDom.between, num1 = elementsDom.num1, num2 = elementsDom.num2, flag1 = elementsDom.flag1, flag2 = elementsDom.flag2, inpNum1 = elementsDom.inpNum1, inpNum2 = elementsDom.inpNum2;
        var value1;
        var value2;
        var val1;
        var val2;
        var max;
        var min;
        if (w !== null) {
            value1 = w.find('.value1');
            value2 = w.find('.value2');
            val1 = Number(w.find('.slider1').val());
            val2 = Number(w.find('.slider2').val());
            min = w.find('.min');
            max = w.find('.max');
        }
        var widthScale = Math.abs(Number(max.val()) - Number(min.val()));
        var betwLength = 266 * Math.abs(val1 - val2) / widthScale;
        var left = (val1 - Number(min.val())) * 266 / widthScale;
        var leftNoChanged = left;
        var right = (val2 - Number(min.val())) * 266 / widthScale;
        if (val2 > val1) {
            left = left;
        }
        else {
            left = right;
        }
        return { left: left, right: right, leftNoChanged: leftNoChanged, value1: value1, value2: value2, num1: num1, num2: num2, slider1: slider1, slider2: slider2, betwLength: betwLength, between: between, min: min, max: max, begin: begin, end: end, val1: val1, val2: val2, flag1: flag1, flag2: flag2, inpNum1: inpNum1, inpNum2: inpNum2, range: range, rotateSlider: rotateSlider };
    };
    return Model;
}());
var Controller = /** @class */ (function () {
    function Controller(view, model) {
        var _this = this;
        this.init = function () {
            var functions = [_this.controllerScale, _this.controllerNum, _this.addEvent, _this.controllerBetween, _this.controllerSetValue,
                _this.controllerSetScale, _this.controllerHideBall, _this.controllerHideNum, _this.controllerRotate];
            functions.forEach(function (el) { return el(); });
        };
        this.calls = function () {
            _this.controllerBetween();
            _this.controllerNum();
        };
        this.f = function () {
            var functions = [_this.controllerBetween, _this.controllerNum, _this.controllerValue, _this.controllerScale];
            functions.forEach(function (el) { return el(); });
        };
        this.controllerBetween = function () { return _this.model.modelBetween(_this.view.viewBetween); };
        this.controllerCreate = function () { return _this.model.modelCreate(_this.view.viewCreate); };
        this.controllerScale = function () { return _this.model.modelScale(_this.view.viewScale); };
        this.controllerNum = function () { return _this.model.modelNum(_this.view.viewNum); };
        this.controllerValue = function () { return _this.model.modelValue(_this.view.viewValue); };
        this.controllerHideBall = function () { return _this.model.modelHideBall(_this.view.viewHideBall); };
        this.controllerHideNum = function () { return _this.model.modelHideNum(_this.view.viewHideNum); };
        this.controllerRotate = function () { return _this.model.modelRotate(_this.view.viewRotate); };
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
            step1: 8,
            step2: 8
        }, options);
        this.each(function (index, value) {
            var view = new View(value, settings);
            var model = new Model(value);
            new Controller(view, model);
        });
    };
    $('.wrapper').slider();
}(jQuery));
var module;
if (module !== undefined)
    module.exports = {
        View: View,
        Model: Model,
        Controller: Controller
    };
