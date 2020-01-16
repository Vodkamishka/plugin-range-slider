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
        this.getCoords = function (elem) {
            var box = elem[0].getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        };
        this.mousedown = function (event, func, ball) {
            var ballCoords = _this.getCoords(ball);
            var shift = event.pageX - ballCoords.left;
            var mousemove = function (e) {
                var left = e.pageX - shift - _this.$sliderCoords.left;
                func(left);
            };
            $(document).mousemove(mousemove);
            $(document).mouseup(function () { return $(document).off('mousemove'); });
        };
        this.findDom = function () {
            if (_this.$slider) {
                _this.$scale = _this.$slider.find(".slider__scale");
                _this.$ball1 = _this.$slider.find(".slider__ball_first");
                _this.$ball2 = _this.$slider.find(".slider__ball_second");
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
                _this.$disableValues = _this.$slider.find('.slider__values-runners');
                _this.$rotate = _this.$slider.find('.slider__rotate');
                _this.$toggle = _this.$slider.find('.slider__one-toggle');
            }
        };
        this.getData = function () {
            if (_this.$slider !== null) {
                var options = _this.$slider.attr('data-options');
                _this.data = JSON.parse(options);
                _this.data.widthScale = _this.$scale.width();
                _this.data.ballWidth = _this.$ball1.width();
                _this.$sliderCoords = _this.getCoords(_this.$scale);
            }
        };
        this.render = function (data) {
            var value1 = data.value1, value2 = data.value2, min = data.min, max = data.max, step = data.step, disableValues = data.disableValues, vertical = data.vertical, oneRunner = data.oneRunner, left = data.left, right = data.right;
            console.log(step);
            _this.$begin.html(min);
            _this.$end.html(max);
            _this.$min.val(min);
            _this.$max.val(max);
            _this.$num1.html(value1);
            _this.$num2.html(value2);
            _this.$value1.val(value1);
            _this.$value2.val(value2);
            _this.$step.val(step);
            _this.disableValuesOverBalls(disableValues);
            _this.sliderVertical(vertical);
            _this.$ball1.css('left', left);
            _this.$ball2.css('left', right);
            _this.$between.css({ 'left': left + _this.$ball1.width() / 2, 'width': right - left });
            _this.eneblaOneRunners(oneRunner);
        };
        this.sendDataToController = function () { return _this.data; };
        this.addEventListenerBalls = function (func, func2) {
            _this.$ball1.mousedown(function (event) { return _this.mousedown(event, func, _this.$ball1); });
            _this.$ball2.mousedown(function (event) { return _this.mousedown(event, func2, _this.$ball2); });
        };
        this.addEventListenerMin = function (f) { return _this.$min.change(function () { return f(_this.$min.val()); }); };
        this.addEventListenerMax = function (f) { return _this.$max.change(function () { return f(_this.$max.val()); }); };
        this.addEventListenerValueFirst = function (f) { return _this.$value1.change(function () { return f(_this.$value1.val()); }); };
        this.addEventListenerValueSecond = function (f) { return _this.$value2.change(function () { return f(_this.$value2.val()); }); };
        this.addEventListenerDisableValues = function (f) { return _this.$disableValues.change(function () { return f(); }); };
        this.addEventListenerVerticalView = function (f) { return _this.$rotate.change(function () { return f(); }); };
        this.addEventListenerOneToggle = function (f) { return _this.$toggle.change(function () { return f(); }); };
        this.addEventListenerStep = function (f) { return _this.$step.change(function () { return f(_this.$step.val()); }); };
        this.disableValuesOverBalls = function (disableValues) {
            disableValues ? _this.$num1.addClass('slider__num_hide') : _this.$num1.removeClass('slider__num_hide');
            disableValues ? _this.$num2.addClass('slider__num_hide') : _this.$num2.removeClass('slider__num_hide');
        };
        this.sliderVertical = function (vertical) {
            vertical ? _this.$range.addClass('slider_vertical') : _this.$range.removeClass('slider_vertical');
            vertical ? _this.$num1.addClass('slider__rotate-reverse') : _this.$num1.removeClass('slider__rotate-reverse');
            vertical ? _this.$num2.addClass('slider__rotate-reverse') : _this.$num2.removeClass('slider__rotate-reverse');
            //vertical ? this.$slider1.addClass('slider_short') : this.$slider1.removeClass('slider_short')
            //vertical ? this.$slider2.addClass('slider_short') : this.$slider2.removeClass('slider_short')
        };
        this.eneblaOneRunners = function (oneRunner) {
            oneRunner ? _this.$ball1.addClass('slider__ball_hide') : _this.$ball1.removeClass('slider__ball_hide');
            oneRunner ? _this.$value1.addClass('slider__value_white') : _this.$value1.removeClass('slider__value_white');
        };
        this.$slider = $slider;
        this.init();
    }
    return View;
}());
exports["default"] = View;
