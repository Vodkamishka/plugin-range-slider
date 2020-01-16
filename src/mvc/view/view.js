"use strict";
exports.__esModule = true;
var View = /** @class */ (function () {
    function View($slider) {
        var _this = this;
        this.init = function () {
            _this.findDom();
            _this.getData();
            _this.sendDataToController();
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
                var domNames = [['$scale', 'scale'], ['$ball1', 'ball_first'], ['$ball2', 'ball_second'], ['$ball1', 'ball_first'], ['$min', 'min'],
                    ['$max', 'max'], ['$value1', 'value_first'], ['$value2', 'value_second'], ['$step', 'step'], ['$range', 'range'], ['$num1', 'num_first'],
                    ['$num2', 'num_second'], ['$between', 'between'], ['$begin', 'begin'], ['$end', 'end'], ['$disableValues', 'values-runners'],
                    ['$rotate', 'rotate'], ['$toggle', 'one-toggle'],
                ];
                domNames.forEach(function (el) { return _this["" + el[0]] = _this.$slider.find(".slider__" + el[1]); });
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
        this.render = function (_a) {
            var value1 = _a.value1, value2 = _a.value2, min = _a.min, max = _a.max, step = _a.step, disableValues = _a.disableValues, vertical = _a.vertical, oneRunner = _a.oneRunner, left = _a.left, right = _a.right;
            var renderHtml = [['$begin', min], ['$end', max], ['$num1', value1], ['$num2', value2]];
            var renderVal = [['$min', min], ['$max', max], ['$value1', value1], ['$value2', value2], ['$step', step]];
            var renderCss = [['$ball1', 'left', left], ['$ball2', 'left', right], ['$between', 'width', right - left]];
            renderHtml.forEach(function (el) { return _this["" + el[0]].html(el[1]); });
            renderVal.forEach(function (el) { return _this["" + el[0]].val(el[1]); });
            renderCss.forEach(function (el) { return _this["" + el[0]].css(el[1], el[2]); });
            _this.$between.css('left', left + _this.$ball1.width() / 2);
            _this.disableValuesOverBalls(disableValues);
            _this.sliderVertical(vertical);
            _this.eneblaOneRunners(oneRunner);
        };
        this.sendDataToController = function () { return _this.data; };
        this.addEventListeners = function (props) {
            _this.$ball1.mousedown(function (event) { return _this.mousedown(event, props.dispatchBallValueFirst, _this.$ball1); });
            _this.$ball2.mousedown(function (event) { return _this.mousedown(event, props.dispatchBallValueSecond, _this.$ball2); });
            _this.$min.change(function () { return props.dispatchMin(_this.$min.val()); });
            _this.$max.change(function () { return props.dispatchMax(_this.$max.val()); });
            _this.$value1.change(function () { return props.dispatchValueFirst(_this.$value1.val()); });
            _this.$value2.change(function () { return props.dispatchValueSecond(_this.$value2.val()); });
            _this.$disableValues.change(function () { return props.dispatchDisableValues(); });
            _this.$rotate.change(function () { return props.dispatchVerticalView(); });
            _this.$toggle.change(function () { return props.dispatchOneToggle(); });
            _this.$step.change(function () { return props.dispatchStep(_this.$step.val()); });
        };
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
