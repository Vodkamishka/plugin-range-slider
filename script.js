(function () {
    if (window !== undefined)
        window.onload = function () {
            var wrapper = document.querySelectorAll('.wrapper');
            if (wrapper !== null) {
                wrapper.forEach(function (el) {
                    var random = Math.floor(Math.random() * 10000000000000);
                    el.id = random.toString();
                    var view = new View(random);
                    var model = new Model(random);
                    var controller = new Controller(view, model);
                });
            }
        };
})();
function createElement(tag, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var element;
    element = document.createElement(tag);
    element.classList.add("" + props["class"]);
    element.type = props.type;
    element.setAttribute('value', props.value);
    children.forEach(function (el) {
        if (typeof el === 'string') {
            el = document.createTextNode(el);
        }
        element.appendChild(el);
    });
    return element;
}
var View = /** @class */ (function () {
    function View(random) {
        var _this = this;
        this.viewBetween = function (left, betwWidth) {
            if (_this.between !== null) {
                _this.between.style.marginLeft = left + 'px';
                _this.between.style.width = betwWidth + 'px';
            }
        };
        this.viewScale = function (begin, end) {
            if (_this.begin !== null) {
                _this.begin.innerHTML = begin;
            }
            if (_this.end !== null) {
                _this.end.innerHTML = end;
            }
        };
        this.wrapper = document.getElementById(random.toString());
        this.create();
        if (this.wrapper !== null) {
            this.between = this.wrapper.querySelector('.between');
            this.begin = this.wrapper.querySelector('.begin');
            this.end = this.wrapper.querySelector('.end');
        }
    }
    View.prototype.create = function () {
        if (this.wrapper !== null) {
            var num1 = createElement('div', { "class": 'num1' });
            var num2 = createElement('div', { "class": 'num2' });
            var between = createElement('div', { "class": 'between' });
            var begin = createElement('div', { "class": 'begin' });
            var end = createElement('div', { "class": 'end' });
            var slider1 = createElement('input', { "class": 'slider1', type: 'range', value: '5000' });
            var slider2 = createElement('input', { "class": 'slider2', type: 'range', value: '15000' });
            var range = createElement('div', { "class": 'range' }, slider1, slider2, between, begin, end, num1, num2);
            var p = createElement('p', { "class": 'p' }, "Панель конфигурации:");
            var min = createElement('input', { "class": 'min', type: 'text', value: '0' });
            var labelMin = createElement('label', { "class": 'label' }, 'Мин. диапазона', min);
            var max = createElement('input', { "class": 'max', type: 'text', value: '25000' });
            var labelMax = createElement('label', { "class": 'label' }, 'Макс. диапазона', max);
            var value1 = createElement('input', { "class": 'value1', type: 'text', value: '5000' });
            var labelVal1 = createElement('label', { "class": 'labelVal1' }, 'Значение 1', value1);
            var value2 = createElement('input', { "class": 'value2', type: 'text', value: '15000' });
            var labelVal2 = createElement('label', { "class": 'labelVal2' }, 'Значение 2', value2);
            var flag1 = createElement('input', { "class": 'flag1', type: 'checkbox', value: '' });
            var labelFlag1 = createElement('label', { "class": 'labelFlag1' }, 'Откл. бегунок 1', flag1);
            var flag2 = createElement('input', { "class": 'flag2', type: 'checkbox', value: '' });
            var labelFlag2 = createElement('label', { "class": 'labelFlag2' }, 'Откл. бегунок 2', flag2);
            var inpNum1 = createElement('input', { "class": 'inpNum1', type: 'checkbox', value: '' });
            var labelNum1 = createElement('label', { "class": 'labelNum1' }, 'Откл. значение 1', inpNum1);
            var inpNum2 = createElement('input', { "class": 'inpNum2', type: 'checkbox', value: '' });
            var labelNum2 = createElement('label', { "class": 'labelNum2' }, 'Откл. значение 2', inpNum2);
            var rotate = createElement('input', { "class": 'rotateSlider', type: 'checkbox', value: '' });
            var labelRotate = createElement('label', { "class": 'labelRotate' }, 'Вкл. вертикальный вид', rotate);
            var step = createElement('input', { "class": 'step', type: 'text', value: '' });
            var labelStep = createElement('label', { "class": 'label' }, 'Размер шага 1', step);
            var step2 = createElement('input', { "class": 'step2', type: 'text', value: '' });
            var labelStep2 = createElement('label', { "class": 'label' }, 'Размер шага 2', step2);
            var panel = createElement('div', { "class": 'panel' }, p, labelMin, labelMax, labelVal1, labelVal2, labelFlag1, labelFlag2, labelNum1, labelNum2, labelRotate, labelStep, labelStep2);
            this.wrapper.appendChild(panel);
            this.wrapper.appendChild(range);
        }
    };
    return View;
}());
var Model = /** @class */ (function () {
    function Model(random) {
        var _this = this;
        this.modelBetween = function (f) { return f(_this.helper().left, _this.helper().betwLength); };
        this.modelScale = function (f) { return f(_this.helper().min.value, _this.helper().max.value); };
        this.wrapper = document.getElementById(random.toString());
        if (this.wrapper !== null) {
            var f = function (element) {
                if (_this.wrapper !== null)
                    return _this.wrapper.querySelector(element);
            };
            this.range = f('.range');
            this.val1 = f('.value1');
            this.val2 = f('.value2');
            this.min = f('.min');
            this.max = f('.max');
            this.slider1 = f('.slider1');
            this.slider2 = f('.slider2');
            this.flag1 = f('.flag1');
            this.flag2 = f('.flag2');
            this.num1 = f('.num1');
            this.num2 = f('.num2');
            this.inpNum1 = f('.inpNum1');
            this.inpNum2 = f('.inpNum2');
            this.step = f('.step');
            this.step2 = f('.step2');
            this.rotateSlider = f('.rotateSlider');
        }
    }
    Model.prototype.modelAddEvent = function (f) {
        var $ = this.helper();
        console.log($);
        if ($.el !== null)
            $.el.addEventListener('input', f);
        if ($.el2 !== null)
            $.el2.addEventListener('input', f);
    };
    Model.prototype.helper = function () {
        var el = this.slider1;
        var el2 = this.slider2;
        var val1 = this.val1;
        var val2 = this.val2;
        var min;
        if (this.min !== null)
            min = this.min;
        var max;
        if (this.max !== null)
            max = this.max;
        var num1 = this.num1;
        var num2 = this.num2;
        var slWidth;
        var widthScale;
        var value;
        var value2;
        var betwLength;
        if (el !== null && el2 !== null && this.step !== null && this.step2 !== null) {
            slWidth = 266;
            widthScale = Math.abs(Number(max.value) - Number(min.value));
            value = Number(el.value);
            value2 = Number(el2.value);
            betwLength = slWidth * Math.abs(value - value2) / widthScale;
            el.min = min.value;
            el2.min = min.value;
            el.max = max.value;
            el2.max = max.value;
            el.step = this.step.value;
            el2.step = this.step2.value;
        }
        if (val1 !== null)
            val1.addEventListener('input', function () {
                if (val1 !== null)
                    value = Number(val1.value);
            });
        if (val2 !== null)
            val2.addEventListener('input', function () {
                if (val2 !== null)
                    value = Number(val2.value);
            });
        var left = (value - Number(min.value)) * slWidth / widthScale;
        var right = (value2 - Number(min.value)) * slWidth / widthScale;
        if (value2 > value) {
            left = left;
        }
        else {
            left = right;
        }
        return { el: el, el2: el2, slWidth: slWidth, widthScale: widthScale, betwLength: betwLength, value: value, value2: value2, left: left, right: right, min: min, max: max, num1: num1, num2: num2, val1: val1, val2: val2 };
    };
    return Model;
}());
var Controller = /** @class */ (function () {
    function Controller(view, model) {
        var _this = this;
        this.f = function () {
            _this.controllerBetween();
        };
        this.addEvent = function () { return _this.model.modelAddEvent(_this.f); };
        this.controllerBetween = function () { return _this.model.modelBetween(_this.view.viewBetween); };
        this.view = view;
        this.model = model;
        this.controllerBetween();
        this.addEvent();
    }
    return Controller;
}());
var module;
if (module !== undefined)
    module.exports = {
        View: View,
        Model: Model,
        Controller: Controller,
        createElement: createElement
    };
