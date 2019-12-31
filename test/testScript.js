
let chai = require('chai')
const expect = require('chai').expect
chai.use(require('chai-dom'))
const assert = require('chai').assert
var should = require('chai').should()
const $ = global.jQuery = require('jquery')
global.window = window
global.$ = require('jquery')
let script = require('../src/script.js')
const jsdom  = require('jsdom')
const {JSDOM} = jsdom
const dom = new JSDOM(`<html><body><div class="wrapper"></div></body></html>`)
global.window = dom.window
global.document = dom.window.document

let {View, Model, Controller} = script

let settings = {
    value1: 6000,
    value2: 57777,
    min: 2000,
    max: 60000,
    step1: 200,
    step2: 600
}

let pan = `<div class="panel" ><p class="p" >Панель конфигурации:</p><label class="label" >Мин. диапазона<input class="min" type="text" value="0"></label><label class="label" >Макс. диапазона<input class="max" type="text" value="25000"></label><label class="labelVal1" >Значение 1<input class="value1" type="text" value="5000"></label><label class="labelVal2" >Значение 2<input class="value2" type="text" value="15000"></label><label class="labelFlag1" >Откл. бегунок 1<input class="flag1" type="checkbox" value=""></label><label class="labelFlag2" >Откл. бегунок 2<input class="flag2" type="checkbox" value=""></label><label class="labelNum1" >Откл. значение 1<input class="inpNum1" type="checkbox" value=""></label><label class="labelNum2" >Откл. значение 2<input class="inpNum2" type="checkbox" value=""></label><label class="labelRotate" >Вкл. вертикальный вид<input class="rotateSlider" type="checkbox" value=""></label><label class="label" >Размер шага 1<input class="step1" type="text" value=""></label><label class="label" >Размер шага 2<input class="step2" type="text" value=""></label></div>`
let ran = `<div class="range" ><input class="slider1" type="range" value="5000" step="8" min="0" max="25000"><input class="slider2" type="range" value="15000" step="8" min="0" max="25000"><div class="between" ></div><div class="begin" ></div><div class="end" ></div><div class="num1" ></div><div class="num2" ></div></div>` 
let wrapper = `<div class = "wrapper">${pan}${ran}</div>`
$('body').append(wrapper).html()

let view = new View (wrapper, settings)
let model = new Model (wrapper)
let controller = new Controller (view, model)

const {left, right, leftNoChanged, value1, value2, num1, num2, slider1, slider2, betwLength, step1, step2,
between, min, max, begin, end, val1, val2, flag1, flag2, inpNum1, inpNum2, range, rotateSlider} = model.helper()  

describe('View', function () {

    it("test function create that create different div and input tag elements this different properties", function () {
        view.create()
        range.should.be.an('HTMLDivElement')
    })
    it ('test function viewBetween that rules interval between balls', function () {
        view.viewBetween(10, 85, between)
        assert.equal(between.style._values['margin-left'], '10px')
        assert.equal(between.style._values['width'], '85px')
    })
    it ('test function viewStep that set step of slider', function () {
        view.viewStep(slider1, slider2, step1, step2) 
        assert.equal(slider1.step, '200')
        assert.equal(slider2.step, '600')
    })
    it ('test function viewScale that show begin and end of scale', function () {
        view.viewScale("0", "25000", begin, end, slider1, slider2)
        assert.equal(begin.innerHTML, '0')
        assert.equal(end.innerHTML, '25000')
        assert.equal(slider1.min, '0')
        assert.equal(slider2.min, '0')
        assert.equal(slider1.max, '25000')
        assert.equal(slider2.max, '25000')
    })
    it ('test function viewNum that show numbers over slider balls', function () {
        view.viewNum(num1, 5000, 46)
        view.viewNum(num2, 15000, 146)
        assert.equal(num1.innerHTML, '5000')
        assert.equal(num1.style._values['margin-left'], '46px')
    })
    it ('test function viewValue, that transfers the values of the sliders to the panel', function () {
        view.viewValue (value1.get(0), 5000)
        view.viewValue (value2.get(0), 15000)
        assert.equal(value1.val(), '5000')
        assert.equal(value2.val(), '15000')
    })
    it ('test function viewHideBall, that hides balls, between ad values in panel', function () {
        view.viewHideBall(slider2, num2, value2.get(0), between)
        slider2.should.have.class('hide')
        between.should.have.class('hide')
        num2.should.have.class('white')
        value2.get(0).should.have.class('white')
    })
    it ('test function viewHideNum that hide number upper ball of slider', function () {
        view.viewHideNum(num1)
        num1.should.have.class('white')
    })
    it ('test function viewRotate that rotate slider', function () {
        view.viewRotate(range, num1, num2)
        range.should.have.class('rotate')
        num1.should.have.class('rotateReverse')
        num2.should.have.class('rotateReverse')
    })
})

describe('Model', function () {

    it ('test function modelBetween that starts function viewBetween', function () {
        model.modelBetween(view.viewBetween)
        assert.equal(between.style._values['margin-left'], '10px')
        assert.equal(between.style._values['width'], '85px')
    })
    it ('test function modelStep that starts function viewStep', function () {
        model.modelStep(view.viewStep)
        assert.equal(slider1.step, '200')
        assert.equal(slider2.step, '600')
    })
    it ("test function modelScale that starts function viewScale", function () {
        model.modelScale(view.viewScale)
        assert.equal(begin.innerHTML, '0')
        assert.equal(end.innerHTML, '25000')
        assert.equal(slider1.min, '0')
        assert.equal(slider2.min, '0')
        assert.equal(slider1.max, '25000')
        assert.equal(slider2.max, '25000')
    })
    it ('test function modelNum that starts function viewNum', function () {
        model.modelNum(view.viewNum)
        assert.equal(num1.innerHTML, '5000')
        assert.equal(num1.style._values['margin-left'], '46px')
        assert.equal(num2.innerHTML, '15000')
        assert.equal(num2.style._values['margin-left'], '146px')
    })
    it ('test function modelValue that starts function viewValue', function () {
        model.modelValue(view.viewValue)
        assert.equal(value1.val(), '5000')
        assert.equal(value2.val(), '15000')
    })
    it ('test function modelSetValue that starts viewValue and functions controllerBetween and controllerNum', function () {
        let calls = () => {
            controller.controllerBetween()
            controller.controllerNum()
        }
        model.modelSetValue(view.viewValue, calls)
        assert.equal(slider1.value, '5000')
        assert.equal(slider2.value, '15000')
        assert.equal(between.style._values['margin-left'], '10px')
        assert.equal(between.style._values['width'], '85px')
        assert.equal(num1.innerHTML, '5000')
        assert.equal(num1.style._values['margin-left'], '46px')
        assert.equal(num2.innerHTML, '15000')
        assert.equal(num2.style._values['margin-left'], '146px')
    })
    it ('test function modelSetScale that starts functions controllerBetween,controllerNum, controllerValue, controllerScale', function () {
        let f = () => {
            this.controllerBetween()
            this.controllerNum()
            this.controllerValue()
            this.controllerScale()
        }
        model.modelSetScale(f)
        assert.equal(begin.innerHTML, '0')
        assert.equal(end.innerHTML, '25000')
        assert.equal(between.style._values['margin-left'], '10px')
        assert.equal(between.style._values['width'], '85px')
        assert.equal(num1.innerHTML, '5000')
        assert.equal(num1.style._values['margin-left'], '46px')
        assert.equal(num2.innerHTML, '15000')
        assert.equal(num2.style._values['margin-left'], '146px')
    })
    it ("test function modelHideBall that starts function viewHideBall", function () {
        model.modelHideBall(view.viewHideBall)
        slider2.should.have.class('hide')
        between.should.have.class('hide')
        num2.should.have.class('white')
        value2.get(0).should.have.class('white')
    })
    it ("test function modelHideNum that connect addEventListener to inpNum which starts function viewHideNum", function () {
        model.modelHideNum(view.viewHideNum)
        num1.should.have.class('white')
    })
    it ("test function modelRotate that connect addEventListener to rotateSlider which starts function viewRotate", function () {
        model.modelRotate(view.viewRotate)
        range.should.have.class('rotate')
        num1.should.have.class('rotateReverse')
        num2.should.have.class('rotateReverse')
    })
    it ('test function helper that use for helping in work with DOM', function () {
        assert.equal(left, 53.2)
        assert.equal(right, 159.6)
        assert.equal(leftNoChanged, 53.2)
        value1.get(0).should.be.an('HTMLInputElement')
        assert.equal(value1.val(), '5000')
        value2.get(0).should.be.an('HTMLInputElement')
        assert.equal(value2.val(), '15000')
        num1.should.be.an('HTMLDivElement')
        num2.should.be.an('HTMLDivElement')
        slider1.should.be.an('HTMLInputElement')
        slider1.should.have.class('slider1')
        slider2.should.be.an('HTMLInputElement')
        slider2.should.have.class('slider2')
        assert.equal(betwLength, 106.4)
        between.should.be.an('HTMLDivElement')
        min.get(0).should.be.an('HTMLInputElement')
        assert.equal(min.val(), '0')
        max.get(0).should.be.an('HTMLInputElement')
        assert.equal(max.val(), '25000')
        begin.should.be.an('HTMLDivElement')
        end.should.be.an('HTMLDivElement')
        assert.equal(val1, 5000)
        assert.equal(val2, 15000)
        flag1.should.be.an('HTMLInputElement')
        flag2.should.be.an('HTMLInputElement')
        inpNum1.should.be.an('HTMLInputElement')
        inpNum2.should.be.an('HTMLInputElement')
        range.should.be.an('HTMLDivElement')
        rotateSlider.should.be.an('HTMLInputElement')
        step1.should.be.an('HTMLInputElement')
        step2.should.be.an('HTMLInputElement')
    })
})

describe("Controller", function () {

    it('test function controllerBetween that starts function modelBetween', function () {
        controller.controllerBetween()
        assert.equal(between.style._values['margin-left'], '10px')
        assert.equal(between.style._values['width'], '85px')
    })
    it ('test function controllerStep that starts function modelStep', function () {
        controller.controllerStep()
        assert.equal(slider1.step, '200')
        assert.equal(slider2.step, '600')
    })
    it('test function controllerScale that starts function modelScale', function () {
        controller.controllerScale()
        assert.equal(begin.innerHTML, '0')
        assert.equal(end.innerHTML, '25000')
    })
    it('test function controllerNum that starts function modelNum', function () {
        controller.controllerNum()
        assert.equal(num1.innerHTML, '5000')
        assert.equal(num1.style._values['margin-left'], '46px')
        assert.equal(num2.innerHTML, '15000')
        assert.equal(num2.style._values['margin-left'], '146px')
    })
    it('test function controllerValue that starts function modelValue', function () {
        controller.controllerValue()
        assert.equal(value1.val(), '5000')
        assert.equal(value2.val(), '15000')
    })
    it('test function controllerSetValue that starts function modelSetValue', function () {
        controller.controllerSetValue()
        assert.equal(slider1.value, '5000')
        assert.equal(slider2.value, '15000')
        assert.equal(between.style._values['margin-left'], '10px')
        assert.equal(between.style._values['width'], '85px')
        assert.equal(num1.innerHTML, '5000')
        assert.equal(num1.style._values['margin-left'], '46px')
        assert.equal(num2.innerHTML, '15000')
        assert.equal(num2.style._values['margin-left'], '146px')
    })
    it('test function controllerSetScale that starts function modelSetScale', function () {
        controller.controllerSetScale()
        assert.equal(begin.innerHTML, '0')
        assert.equal(end.innerHTML, '25000')
        assert.equal(between.style._values['margin-left'], '10px')
        assert.equal(between.style._values['width'], '85px')
        assert.equal(num1.innerHTML, '5000')
        assert.equal(num1.style._values['margin-left'], '46px')
        assert.equal(num2.innerHTML, '15000')
        assert.equal(num2.style._values['margin-left'], '146px')
    })
    it('test function controllerHideBall that starts function modelHideBall', function () {
        controller.controllerHideBall()
        slider2.should.have.class('hide')
        between.should.have.class('hide')
        num2.should.have.class('white')
        value2.get(0).should.have.class('white')
    })
    it("test function controllerHideNum that starts function modelHideNum", function () {
        controller.controllerHideNum()
        num1.should.have.class('white')
    })
    it("test function controllerRotate that starts function modelRotate", function () {
        controller.controllerRotate()
        range.should.have.class('rotate')
        num1.should.have.class('rotateReverse')
        num2.should.have.class('rotateReverse')
    })
})