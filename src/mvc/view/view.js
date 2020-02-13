"use strict";
exports.__esModule = true;
var View = /** @class */ (function () {
    function View($wrapper, options) {
        var _this = this;
        this.init = function () {
            _this.createSlider();
            _this.findDom();
            _this.loadOptionsToThisData();
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
        this.clicker = function (e, props, dispatch) {
            var click = function () {
                var vertical = props.vertical, widthScale = props.widthScale, ballWidth = props.ballWidth;
                var left = vertical ? e.pageY - _this.$sliderCoords.top - -ballWidth / 2 : e.pageX - _this.$sliderCoords.left - ballWidth / 2;
                left < widthScale / 2 ? dispatch.dispatchBallValueFirst(left) : dispatch.dispatchBallValueSecond(left);
            };
            var mouseup = function () {
                $(document).off('click', click);
                $(document).off('mouseup', mouseup);
            };
            $(document).on('click', click);
            $(document).on('mouseup', mouseup);
        };
        this.findDom = function () {
            if (_this.$wrapper) {
                var domNames = ['scale', 'between', 'begin', 'end', ['ball1', 'ball_first'], ['ball2', 'ball_second'],
                    ['ball1', 'ball_first'], ['num1', 'num_first'], ['num2', 'num_second']];
                // tslint:disable-next-line:ter-arrow-parens
                domNames.forEach(function (el) {
                    typeof el === 'string' ? _this["$" + el] = _this.$wrapper.find(".slider__" + el) : _this["$" + el[0]] = _this.$wrapper.find(".slider__" + el[1]);
                });
            }
        };
        this.loadOptionsToThisData = function () {
            if (_this.$wrapper) {
                _this.data = _this.options;
                _this.data.widthScale = _this.$scale.width();
                _this.data.ballWidth = _this.$ball1.width();
                _this.$sliderCoords = _this.getCoords(_this.$scale);
            }
        };
        this.render = function (data) {
            var value1 = data.value1, value2 = data.value2, min = data.min, max = data.max, step = data.step, disableValues = data.disableValues, vertical = data.vertical, oneRunner = data.oneRunner, left = data.left, right = data.right;
            var renderHtml = [['begin', min], ['end', max], ['num1', value1], ['num2', value2]];
            var renderCss = [['between', vertical ? 'height' : 'width', right - left], ['between', vertical ? 'width' : 'height', '0.75rem'],
                ['between', 'left', vertical ? '0' : +left + +_this.$ball1.width() / 2], ['between', 'top', vertical ? +left + +_this.$ball1.width() / 2 : '0'],
                ['ball1', 'left', vertical ? '0' : left], ['ball1', 'transform', vertical ? 'translateX(-30%) translateY(0%)' : 'translateX(0%) translateY(-50%)'],
                ['ball1', 'top', vertical ? left : '50%'], ['ball2', 'left', vertical ? '0' : right],
                ['ball2', 'transform', vertical ? 'translateX(-30%) translateY(0%)' : 'translateX(0%) translateY(-50%)'], ['ball2', 'top', vertical ? right : '50%']];
            renderHtml.forEach(function (el) { return _this["$" + el[0]].html(el[1]); });
            renderCss.forEach(function (el) { return _this["$" + el[0]].css(el[1], el[2]); });
            _this.disableValuesOverBalls(disableValues);
            _this.sliderVertical(vertical);
            _this.enableOneBall(oneRunner);
        };
        this.sendDatafromViewToController = function () { return _this.data; };
        this.addEventListeners = function (dispatchBallValueFirst, dispatchBallValueSecond, getState) {
            _this.$ball1.mousedown(function () { return _this.mousedown(dispatchBallValueFirst, getState()); });
            _this.$ball2.mousedown(function () { return _this.mousedown(dispatchBallValueSecond, getState()); });
            _this.$scale.on('click', function (e) { return _this.clicker(e, getState(), { dispatchBallValueFirst: dispatchBallValueFirst, dispatchBallValueSecond: dispatchBallValueSecond }); });
        };
        this.disableValuesOverBalls = function (disableValues) {
            disableValues ? _this.$num1.addClass('slider__num_hide') : _this.$num1.removeClass('slider__num_hide');
            disableValues ? _this.$num2.addClass('slider__num_hide') : _this.$num2.removeClass('slider__num_hide');
        };
        this.sliderVertical = function (vertical) {
            var verticalArray = ['range', 'scale', 'between', 'begin', 'end'];
            verticalArray.forEach(function (el) { return vertical ? _this["$" + el].addClass("slider__" + el + "_vertical") : _this["$" + el].removeClass("slider__" + el + "_vertical"); });
            vertical ? _this.$num1.addClass('slider__num_vertical') : _this.$num1.removeClass('slider__num_vertical');
            vertical ? _this.$num2.addClass('slider__num_vertical') : _this.$num2.removeClass('slider__num_vertical');
        };
        this.enableOneBall = function (oneRunner) { return oneRunner ? _this.$ball1.addClass('slider__ball_hide') : _this.$ball1.removeClass('slider__ball_hide'); };
        this.$wrapper = $wrapper;
        this.options = options;
        this.init();
    }
    View.prototype.createSlider = function () {
        this.$range = this.$wrapper.find('.slider__range');
        var slider = $("\n      <div class=\"slider__scale\">\n        <div class=\"slider__between\"></div>\n        <div class=\"slider__begin\"></div>\n        <div class=\"slider__end\"></div>\n      </div>\n      <div class=\"slider__ball_first\">\n        <div class=\"slider__num_first\"></div>\n      </div>\n      <div class=\"slider__ball_second\">\n        <div class=\"slider__num_second\"></div>\n      </div>\n    ");
        this.$range.append(slider);
    };
    return View;
}());
exports["default"] = View;
