"use strict";
exports.__esModule = true;
var View = /** @class */ (function () {
    function View($slider, settings) {
        var _this = this;
        this.init = function () {
            _this.created();
            _this.searchedDomElements();
            _this.sendFirstOptionsToController();
            _this.loadedFirstOptionsToInputs();
        };
        this.created = function () {
            var _a = _this.settings, value1 = _a.value1, value2 = _a.value2, min = _a.min, max = _a.max, step = _a.step;
            var panel = "<div class=\"slider__panel\" ><label class=\"slider__label\">min<input class=\"slider__min\" type=\"number\" value=" + min + "></label><label class=\"slider__label\">max<input class=\"slider__max\" type=\"number\" value=" + max + "></label><label class=\"slider__label\">value1<input class=\"slider__value1\" type=\"number\" value=" + value1 + "></label><label class=\"slider__label\">value2<input class=\"slider__value2\" type=\"number\" value=" + value2 + "></label><label class=\"slider__label\">disable values<input class=\"slider__valuesRunners\" type=\"checkbox\" value=\"\"></label><label class=\"slider__label\">change view<input class=\"slider__rotate\" type=\"checkbox\" value=\"\"></label><label class=\"slider__label\">step<input class=\"slider__step\" type=\"number\" value=" + step + "></label></div>";
            var range = "<div class=\"slider__range\" ><input class=\"slider_first\" type=\"range\" value=" + value1 + " step=" + step + " min=" + min + " max=" + max + "><input class=\"slider_second\" type=\"range\" value=" + value2 + " step=" + step + " min=" + min + " max=" + max + "><div class=\"slider__between\" ></div><div class=\"slider__begin\" ></div><div class=\"slider__end\" ></div><div class=\"slider__num_first\" ></div><div class=\"slider__num_second\" ></div></div>";
            if (_this.$slider !== null)
                $(_this.$slider).html(range + panel);
        };
        this.searchedDomElements = function () {
            if (_this.$slider !== null) {
                _this.$between = _this.$slider.find('.slider__between');
                _this.$slider1 = _this.$slider.find('.slider_first');
                _this.$slider2 = _this.$slider.find('.slider_second');
                _this.$step = _this.$slider.find('.slider__step');
                _this.$range = _this.$slider.find('.slider__range');
                _this.$num1 = _this.$slider.find('.slider__num_first');
                _this.$num2 = _this.$slider.find('.slider__num_second');
                _this.$begin = _this.$slider.find('.slider__begin');
                _this.$end = _this.$slider.find('.slider__end');
                _this.$min = _this.$slider.find('.slider__min');
                _this.$max = _this.$slider.find('.slider__max');
            }
        };
        this.loadedFirstOptionsToInputs = function () {
            if (_this.$slider !== null) {
                var options = _this.$slider.attr('data-options');
                var _a = JSON.parse(options), value1 = _a.value1, value2 = _a.value2, min = _a.min, max = _a.max, step = _a.step;
                if (_this.$begin !== null && _this.$begin !== undefined && _this.$end !== null && _this.$end !== undefined
                    && _this.$min !== null && _this.$min !== undefined && _this.$max !== null && _this.$max !== undefined) {
                    _this.$begin.html(min || _this.$min.val());
                    _this.$end.html(max || _this.$max.val());
                }
            }
        };
        this.sendFirstOptionsToController = function () {
            if (_this.$slider !== null) {
                return _this.$slider.attr('data-options');
            }
        };
        this.viewBetween = function (left, betwWidth) {
            if (_this.$between !== null && _this.$between !== undefined) {
                _this.$between.css({ 'marginLeft': left + 16 + 'px', 'width': betwWidth + 'px' });
            }
        };
        this.viewStep = function (slider1, slider2, step) {
            if (_this.$slider1 !== null && _this.$slider1 !== undefined && _this.$slider2 !== null && _this.$slider2 !== undefined && _this.$step !== null && _this.$step !== undefined) {
                slider1.step = _this.$step.val() || _this.settings.step;
                slider2.step = _this.$step.val() || _this.settings.step;
            }
        };
        this.viewScale = function (minVal, maxVal) {
            if (_this.$slider1 !== null && _this.$slider1 !== undefined && _this.$slider2 !== null && _this.$slider2 !== undefined &&
                _this.$begin !== null && _this.$begin !== undefined && _this.$end !== null && _this.$end !== undefined) {
                _this.$begin.html(minVal);
                _this.$slider1.data('min', minVal);
                _this.$slider2.data('min', minVal);
                _this.$end.html(maxVal);
                _this.$slider1.data('max', maxVal);
                _this.$slider2.data('max', maxVal);
            }
        };
        this.viewNum = function (el, num, left) {
            el.innerHTML = num.toString();
            el.style.marginLeft = left.toString() + 'px';
        };
        this.viewValue = function (el, num) { return el.value = num.toString(); };
        this.viewHideNum = function () {
            if (_this.$num1 !== null && _this.$num1 !== undefined && _this.$num2 !== null && _this.$num2 !== undefined) {
                _this.$num1.toggleClass('slider_white');
                _this.$num2.toggleClass('slider_white');
            }
        };
        this.viewRotate = function () {
            if (_this.$range !== null && _this.$range !== undefined && _this.$num1 !== null && _this.$num1 !== undefined &&
                _this.$num2 !== null && _this.$num2 !== undefined && _this.$slider1 !== null && _this.$slider1 !== undefined &&
                _this.$slider2 !== null && _this.$slider2 !== undefined) {
                _this.$range.toggleClass('slider_vertical');
                _this.$num1.toggleClass('slider__rotateReverse');
                _this.$num2.toggleClass('slider__rotateReverse');
                _this.$slider1.toggleClass('slider_short');
                _this.$slider2.toggleClass('slider_short');
            }
        };
        this.$slider = $slider;
        this.settings = settings;
        this.init();
    }
    return View;
}());
exports["default"] = View;
