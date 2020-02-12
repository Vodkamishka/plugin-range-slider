"use strict";
exports.__esModule = true;
var Panel = /** @class */ (function () {
    function Panel(element) {
        var _this = this;
        this.init = function () {
            _this.findDom();
            _this.getDataFromAttr();
            _this.slider = _this.$wrapper.slider(_this.data);
        };
        this.getDataFromAttr = function () {
            if (_this.$wrapper)
                _this.data = JSON.parse(_this.$wrapper.attr('data-options'));
            _this.data.render = _this.render;
            _this.data.addEventListeners = _this.addEventListeners;
        };
        this.findDom = function () {
            if (_this.$wrapper) {
                var panel = ['min', 'max', 'step', 'vertical', ['value1', 'value_first'], ['value2', 'value_second'],
                    ['disableValues', 'values-runners'], ['oneRunner', 'one-runner']];
                // tslint:disable-next-line:ter-arrow-parens
                panel.forEach(function (el) {
                    typeof el === 'string' ? _this["$" + el] = _this.$wrapper.find(".panel__" + el) : _this["$" + el[0]] = _this.$wrapper.find(".panel__" + el[1]);
                });
            }
        };
        this.addEventListeners = function (dispatchState) {
            var _a = _this.data, min = _a.min, max = _a.max, step = _a.step, disableValues = _a.disableValues, vertical = _a.vertical, oneRunner = _a.oneRunner, widthScale = _a.widthScale, ballWidth = _a.ballWidth;
            var props = { min: min, max: max, step: step, disableValues: disableValues, vertical: vertical, oneRunner: oneRunner, widthScale: widthScale, ballWidth: ballWidth };
            var propsArray = ['min', 'max', 'value1', 'value2', 'step'];
            var properties = ['disableValues', 'vertical', 'oneRunner'];
            // tslint:disable-next-line:ter-arrow-parens
            propsArray.forEach(function (el) {
                _this["$" + el].change(function () {
                    props[el] = _this["$" + el].val();
                    dispatchState(props);
                });
            });
            // tslint:disable-next-line:ter-arrow-parens
            properties.forEach(function (el) {
                _this["$" + el].change(function () {
                    props[el] = !props[el];
                    dispatchState(props);
                });
            });
        };
        this.render = function (data) {
            var value1 = data.value1, value2 = data.value2, min = data.min, max = data.max, step = data.step, oneRunner = data.oneRunner;
            var renderVal = [['min', min], ['max', max], ['value1', value1], ['value2', value2], ['step', step]];
            renderVal.forEach(function (el) { return _this["$" + el[0]].val(el[1]); });
            oneRunner ? _this.$value1.addClass('panel__value_white') : _this.$value1.removeClass('panel__value_white');
        };
        this.$wrapper = element;
        this.init();
    }
    return Panel;
}());
exports["default"] = Panel;
