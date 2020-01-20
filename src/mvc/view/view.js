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
        this.mousedown = function (event, func, ball, vertical) {
            var ballCoords = _this.getCoords(ball);
            var shift = vertical ? event.pageY - ballCoords.top : event.pageX - ballCoords.left;
            var mousemove = function (e) {
                var left = vertical ? e.pageY - shift - _this.$sliderCoords.top : e.pageX - shift - _this.$sliderCoords.left;
                func(left);
            };
            var mouseup = function () {
                $(document).off('mousemove', mousemove);
                $(document).off('mouseup', mouseup);
            };
            $(document).on('mousemove', mousemove);
            $(document).on('mouseup', mouseup);
        };
        /*mousedowns = (event, ball, props, property, f) => {
            let ballCoords = this.getCoords(ball);
            let shift = event.pageX - ballCoords.left;
                let mousemove = (e) => {
                    let left = e.pageX - shift - this.$sliderCoords.left
                    props[property] = left
                    f(props)
                }
                let mouseup = () => {
                    $(document).off('mousemove', mousemove)
                    $(document).off('mouseup', mouseup)
                }
            $(document).on('mousemove', mousemove)
            $(document).on('mouseup', mouseup)
        }*/
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
        this.render = function (data) {
            var value1 = data.value1, value2 = data.value2, min = data.min, max = data.max, step = data.step, disableValues = data.disableValues, vertical = data.vertical, oneRunner = data.oneRunner, left = data.left, right = data.right;
            var renderHtml = [['$begin', min], ['$end', max], ['$num1', value1], ['$num2', value2]];
            var renderVal = [['$min', min], ['$max', max], ['$value1', value1], ['$value2', value2], ['$step', step]];
            var renderCss = [/*['$ball1', 'left', left], ['$ball2', 'left', right], */ ['$between', vertical ? 'height' : 'width', right - left]];
            renderHtml.forEach(function (el) { return _this["" + el[0]].html(el[1]); });
            renderVal.forEach(function (el) { return _this["" + el[0]].val(el[1]); });
            renderCss.forEach(function (el) { return _this["" + el[0]].css(el[1], el[2]); });
            //this.$between.css(vertical ? 'top' : 'left', left + this.$ball1.width()/2)
            _this.disableValuesOverBalls(disableValues);
            _this.sliderVertical(vertical);
            _this.eneblaOneRunners(oneRunner);
            _this.balls(_this.$ball1, _this.$ball2, left, right, vertical, _this.$between);
        };
        this.sendDataToController = function () { return _this.data; };
        this.addEventListenersBalls = function (props) {
            //this.$ball1.mousedown((event) => this.mousedown(event, props.dispatchBallValueFirst, this.$ball1))
            //this.$ball2.mousedown((event) => this.mousedown(event, props.dispatchBallValueSecond, this.$ball2))
        };
        this.addEventListeners = function (f, dispatchBallValueFirst, dispatchBallValueSecond) {
            var _a = _this.data, min = _a.min, max = _a.max, step = _a.step, disableValues = _a.disableValues, vertical = _a.vertical, oneRunner = _a.oneRunner, widthScale = _a.widthScale;
            var props = { left: '', right: '', widthScale: widthScale, min: min, max: max, step: step, disableValues: disableValues, vertical: vertical, oneRunner: oneRunner };
            _this.$min.change(function () {
                props['min'] = _this.$min.val();
                f(props);
            });
            _this.$max.change(function () {
                props['max'] = _this.$max.val();
                f(props);
            });
            _this.$value1.change(function () {
                props['value1'] = _this.$value1.val();
                f(props);
            });
            _this.$value2.change(function () {
                props['value2'] = _this.$value2.val();
                f(props);
            });
            _this.$step.change(function () {
                props['step'] = _this.$step.val();
                f(props);
            });
            _this.$disableValues.change(function () {
                props['disableValues'] = !props.disableValues;
                f(props);
            });
            _this.$rotate.change(function () {
                props['vertical'] = !props.vertical;
                props['widthScale'] = _this.$scale.width();
                console.log(props);
                f(props);
            });
            _this.$toggle.change(function () {
                props['oneRunner'] = !props.oneRunner;
                f(props);
            });
            _this.$ball1.mousedown(function (event) { return _this.mousedown(event, dispatchBallValueFirst, _this.$ball1, props.vertical); });
            _this.$ball2.mousedown(function (event) { return _this.mousedown(event, dispatchBallValueSecond, _this.$ball2, props.vertical); });
            //this.$ball1.mousedown(() => this.mousedowns(event, this.$ball1, props, 'left', f))
            //this.$ball2.mousedown(() => this.mousedowns(event, this.$ball2, props, 'right', f))
        };
        this.disableValuesOverBalls = function (disableValues) {
            disableValues ? _this.$num1.addClass('slider__num_hide') : _this.$num1.removeClass('slider__num_hide');
            disableValues ? _this.$num2.addClass('slider__num_hide') : _this.$num2.removeClass('slider__num_hide');
        };
        this.sliderVertical = function (vertical) {
            vertical ? _this.$range.addClass('slider__range_vertical') : _this.$range.removeClass('slider__range_vertical');
            vertical ? _this.$scale.addClass('slider__scale_vertical') : _this.$scale.removeClass('slider__scale_vertical');
            vertical ? _this.$between.addClass('slider__between_vertical') : _this.$between.removeClass('slider__between_vertical');
            vertical ? _this.$begin.addClass('slider__begin_vertical') : _this.$begin.removeClass('slider__begin_vertical');
            vertical ? _this.$end.addClass('slider__end_vertical') : _this.$end.removeClass('slider__end_vertical');
            vertical ? _this.$num1.addClass('slider__num_vertical') : _this.$num1.removeClass('slider__num_vertical');
            vertical ? _this.$num2.addClass('slider__num_vertical') : _this.$num2.removeClass('slider__num_vertical');
        };
        this.eneblaOneRunners = function (oneRunner) {
            oneRunner ? _this.$ball1.addClass('slider__ball_hide') : _this.$ball1.removeClass('slider__ball_hide');
            oneRunner ? _this.$value1.addClass('slider__value_white') : _this.$value1.removeClass('slider__value_white');
        };
        this.balls = function (ball1, ball2, left, right, vertical, between) {
            ball1.css({ 'left': vertical ? '50%' : left, 'transform': vertical ? 'translateX(-50%) translateY(0%)' : 'translateX(0%) translateY(-50%)',
                'top': vertical ? left : '50%'
            });
            ball2.css({ 'left': vertical ? '50%' : right, 'transform': vertical ? 'translateX(-50%) translateY(0%)' : 'translateX(0%) translateY(-50%)',
                'top': vertical ? right : '50%'
            });
            between.css({ 'left': vertical ? '0' : +left + +_this.$ball1.width() / 2, 'top': vertical ? +left + +_this.$ball1.width() / 2 : '0'
            });
            between.css(vertical ? 'width' : 'height', '0.75rem');
        };
        this.$slider = $slider;
        this.init();
    }
    return View;
}());
exports["default"] = View;
