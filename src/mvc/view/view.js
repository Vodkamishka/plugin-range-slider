"use strict";
exports.__esModule = true;
var View = /** @class */ (function () {
    function View($slider) {
        var _this = this;
        this.init = function () {
            _this.findDom();
            _this.getData();
            _this.sendDataToController();
            _this.render(_this.data);
        };
        this.findDom = function () {
            if (_this.$slider) {
                _this.$slider1 = _this.$slider.find('.slider_first');
                _this.$slider2 = _this.$slider.find('.slider_second');
                _this.$min = _this.$slider.find('.slider__min');
                _this.$max = _this.$slider.find('.slider__max');
                _this.$value1 = _this.$slider.find('.slider__value_first');
                _this.$value2 = _this.$slider.find('.slider__value_second');
                _this.$step = _this.$slider.find('.slider__step');
                _this.$range = _this.$slider.find('.slider__range');
                _this.$num1 = _this.$slider.find('.slider__num_first');
                _this.$num2 = _this.$slider.find('.slider__num_second');
                _this.$between = _this.$slider.find('.slider__between');
                _this.$begin = _this.$slider.find('.slider__begin');
                _this.$end = _this.$slider.find('.slider__end');
            }
        };
        this.getData = function () {
            if (_this.$slider !== null) {
                var options = _this.$slider.attr('data-options');
                _this.data = JSON.parse(options);
            }
        };
        this.render = function (data) {
            console.log(data);
            var value1 = data.value1, value2 = data.value2, min = data.min, max = data.max, step = data.step;
            _this.$begin.html(min);
            _this.$end.html(max);
            _this.$min.val(min);
            _this.$max.val(max);
            _this.$slider1.val(value1);
            _this.$slider2.val(value2);
            _this.$value1.val(value1);
            _this.$value2.val(value2);
            _this.$step.val(step);
            _this.$slider1.attr({
                'min': min,
                'max': max,
                'step': step
            });
            _this.$slider2.attr({
                'min': min,
                'max': max,
                'step': step
            });
        };
        this.addEventListenerMin = function (f) {
            _this.$min.change(function () { return f(_this.$min.val()); });
        };
        this.addEventListenerMax = function (f) {
            _this.$max.change(function () { return f(_this.$max.val()); });
        };
        this.addEventListenerValueFirst = function (f) {
            _this.$value1.change(function () { return f(_this.$value1.val()); });
        };
        this.addEventListenerValueSecond = function (f) {
            _this.$value2.change(function () { return f(_this.$value2.val()); });
        };
        this.sendDataToController = function () { return _this.data; };
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
        this.init();
    }
    return View;
}());
exports["default"] = View;
