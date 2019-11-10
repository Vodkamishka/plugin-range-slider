(function () {
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
            this.wrapper = document.getElementById(random.toString());
            this.create();
            if (this.wrapper !== null) {
                this.between = this.wrapper.querySelector('.between');
                this.begin = this.wrapper.querySelector('.begin');
                this.end = this.wrapper.querySelector('.end');
            }
            console.log(11111);
        }
        View.prototype.create = function () {
            if (this.wrapper !== null) {
                var num1 = createElement('div', { "class": 'num1' });
                var num2 = createElement('div', { "class": 'num2' });
                var between = createElement('div', { "class": 'between' });
                var begin = createElement('div', { "class": 'begin' });
                var end = createElement('div', { "class": 'end' });
                var slider1 = createElement('input', { "class": 'slider1', type: 'range', min: '0', max: '25000', value: '5000' });
                var slider2 = createElement('input', { "class": 'slider2', type: 'range', min: '0', max: '25000', value: '15000' });
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
        function Model() {
        }
        return Model;
    }());
    var Controller = /** @class */ (function () {
        function Controller() {
        }
        return Controller;
    }());
    /* module.exports = {
        View,
        Model,
        Controller,
        createElement
    }*/
    window.onload = function () {
        var wrapper = document.querySelectorAll('.wrapper');
        if (wrapper !== null) {
            wrapper.forEach(function (el) {
                var random = Math.floor(Math.random() * 10000000000000);
                el.id = random.toString();
                var view = new View(random);
                var model = new Model();
                var controller = new Controller();
            });
        }
    };
})();
