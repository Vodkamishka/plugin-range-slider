"use strict";
exports.__esModule = true;
var View = /** @class */ (function () {
    function View(value, settings) {
        var _this = this;
        this.create = function () {
            var _a = _this.settings, value1 = _a.value1, value2 = _a.value2, min = _a.min, max = _a.max, step = _a.step;
            var panel = "<div class=\"slider__panel\" ><label class=\"slider__label\">min<input class=\"slider__min\" type=\"number\" value=" + min + "></label><label class=\"slider__label\">max<input class=\"slider__max\" type=\"number\" value=" + max + "></label><label class=\"slider__label\">value1<input class=\"slider__value1\" type=\"number\" value=" + value1 + "></label><label class=\"slider__label\">value2<input class=\"slider__value2\" type=\"number\" value=" + value2 + "></label><label class=\"slider__label\">disable values<input class=\"slider__valuesRunners\" type=\"checkbox\" value=\"\"></label><label class=\"slider__label\">change view<input class=\"slider__rotate\" type=\"checkbox\" value=\"\"></label><label class=\"slider__label\">step<input class=\"slider__step\" type=\"number\" value=" + step + "></label></div>";
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
exports["default"] = View;
