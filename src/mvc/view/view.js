"use strict";
exports.__esModule = true;
var View = /** @class */ (function () {
    function View($slider) {
        var _this = this;
        this.init = function () {
            _this.findDom();
            _this.getDataFromAttr();
        };
        this.getCoords = function (elem) {
            var box = elem[0].getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        };
        this.mousedown = function (dispatchBall, props) {
            var vertical = props.vertical, step = props.step, widthScale = props.widthScale, max = props.max, min = props.min, ballWidth = props.ballWidth;
            var stepLength = vertical ? step * widthScale / ((max - min) * 3) : step * widthScale / (max - min);
            var mousemove = function (e) {
                var left = vertical ? e.pageY - _this.$sliderCoords.top : e.pageX - _this.$sliderCoords.left;
                left = stepLength * Math.round(left / stepLength) - ballWidth / 2;
                dispatchBall(left);
            };
            var mouseup = function () {
                $(document).off('mousemove', mousemove);
                $(document).off('mouseup', mouseup);
            };
            $(document).on('mousemove', mousemove);
            $(document).on('mouseup', mouseup);
        };
        this.findDom = function () {
            if (_this.$slider) {
                var domNames = ['scale', 'min', 'max', 'step', 'range', 'between', 'begin', 'end', 'vertical', ['ball1', 'ball_first'],
                    ['ball2', 'ball_second'], ['ball1', 'ball_first'], ['value1', 'value_first'], ['value2', 'value_second'],
                    ['num1', 'num_first'], ['num2', 'num_second'], ['disableValues', 'values-runners'], ['oneRunner', 'one-runner']];
                domNames.forEach(function (el) {
                    typeof el === 'string' ? _this["$" + el] = _this.$slider.find(".slider__" + el) : _this["$" + el[0]] = _this.$slider.find(".slider__" + el[1]);
                });
            }
        };
        this.getDataFromAttr = function () {
            if (_this.$slider !== null) {
                _this.data = JSON.parse(_this.$slider.attr('data-options'));
                _this.data.widthScale = _this.$scale.width();
                _this.data.ballWidth = _this.$ball1.width();
                _this.$sliderCoords = _this.getCoords(_this.$scale);
            }
        };
        this.render = function (data) {
            var value1 = data.value1, value2 = data.value2, min = data.min, max = data.max, step = data.step, disableValues = data.disableValues, vertical = data.vertical, oneRunner = data.oneRunner, left = data.left, right = data.right;
            var renderHtml = [['begin', min], ['end', max], ['num1', value1], ['num2', value2]];
            var renderVal = [['min', min], ['max', max], ['value1', value1], ['value2', value2], ['step', step]];
            var renderCss = [['between', vertical ? 'height' : 'width', right - left], ['between', vertical ? 'width' : 'height', '0.75rem'],
                ['between', 'left', vertical ? '0' : +left + +_this.$ball1.width() / 2], ['between', 'top', vertical ? +left + +_this.$ball1.width() / 2 : '0'],
                ['ball1', 'left', vertical ? '50%' : left], ['ball1', 'transform', vertical ? 'translateX(-50%) translateY(0%)' : 'translateX(0%) translateY(-50%)'],
                ['ball1', 'top', vertical ? left : '50%'], ['ball2', 'left', vertical ? '50%' : right],
                ['ball2', 'transform', vertical ? 'translateX(-50%) translateY(0%)' : 'translateX(0%) translateY(-50%)'], ['ball2', 'top', vertical ? right : '50%']];
            renderHtml.forEach(function (el) { return _this["$" + el[0]].html(el[1]); });
            renderVal.forEach(function (el) { return _this["$" + el[0]].val(el[1]); });
            renderCss.forEach(function (el) { return _this["$" + el[0]].css(el[1], el[2]); });
            _this.disableValuesOverBalls(disableValues);
            _this.sliderVertical(vertical);
            _this.enableOneBall(oneRunner);
        };
        this.sendDatafromViewToController = function () { return _this.data; };
        this.addEventListeners = function (changeState, dispatchBallValueFirst, dispatchBallValueSecond) {
            var _a = _this.data, min = _a.min, max = _a.max, step = _a.step, disableValues = _a.disableValues, vertical = _a.vertical, oneRunner = _a.oneRunner, widthScale = _a.widthScale, ballWidth = _a.ballWidth;
            var props = { min: min, max: max, step: step, disableValues: disableValues, vertical: vertical, oneRunner: oneRunner, widthScale: widthScale, ballWidth: ballWidth };
            var propsArray = ['min', 'max', 'value1', 'value2', 'step'];
            var properties = ['disableValues', 'vertical', 'oneRunner'];
            propsArray.forEach(function (el) {
                _this["$" + el].change(function () {
                    props[el] = _this["$" + el].val();
                    changeState(props);
                });
            });
            properties.forEach(function (el) {
                _this["$" + el].change(function () {
                    props[el] = !props[el];
                    changeState(props);
                });
            });
            _this.$ball1.mousedown(function () { return _this.mousedown(dispatchBallValueFirst, props); });
            _this.$ball2.mousedown(function () { return _this.mousedown(dispatchBallValueSecond, props); });
        };
        this.disableValuesOverBalls = function (disableValues) {
            disableValues ? _this.$num1.addClass('slider__num_hide') : _this.$num1.removeClass('slider__num_hide');
            disableValues ? _this.$num2.addClass('slider__num_hide') : _this.$num2.removeClass('slider__num_hide');
        };
        this.sliderVertical = function (vertical) {
            var verticalArray = ['range', 'scale', 'between', 'begin', 'end'];
            verticalArray.forEach(function (el) { return vertical ? _this["$" + el].addClass("slider__" + el + "_vertical") : _this["$" + el].removeClass("slider__" + el + "_vertical"); });
            vertical ? _this.$num1.addClass("slider__num_vertical") : _this.$num1.removeClass("slider__num_vertical");
            vertical ? _this.$num2.addClass("slider__num_vertical") : _this.$num2.removeClass("slider__num_vertical");
        };
        this.enableOneBall = function (oneRunner) {
            oneRunner ? _this.$ball1.addClass('slider__ball_hide') : _this.$ball1.removeClass('slider__ball_hide');
            oneRunner ? _this.$value1.addClass('slider__value_white') : _this.$value1.removeClass('slider__value_white');
        };
        this.$slider = $slider;
        this.init();
    }
    return View;
}());
exports["default"] = View;
