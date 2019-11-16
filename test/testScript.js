let chai = require('chai')
const expect = require('chai').expect
chai.use(require('chai-dom'))
const assert = require('chai').assert
var should = require('chai').should()

let script = require('../script.js')
const jsdom  = require('jsdom')
const {JSDOM} = jsdom
let random = Math.random() * 10
const dom = new JSDOM(`<html><body><div class="wrapper" id=${random}></div></body></html>`)
global.window = dom.window
global.document = dom.window.document

let View = script.View
let view = new View(random)
let Model = script.Model
let model = new Model(random)
let Controller = script.Controller
let controller = new Controller(view, model)

let createElement = script.createElement

let between = document.querySelector('.between')
let begin = document.querySelector('.begin')
let end = document.querySelector('.end')
let num1 = document.querySelector('.num1')
let num2 = document.querySelector('.num2')
let val1 = document.querySelector('.value1')
let val2 = document.querySelector('.value2')
let slider1 = document.querySelector('.slider1')
let slider2 = document.querySelector('.slider2')

describe('check function createElement', function () {
  
    it ('test how function create element input this his properties', function () {
        let slider = createElement('input', {class: 'slider', type: 'range', value: '15000'})
        slider.should.be.an('HTMLInputElement')
        slider.should.have.class('slider')
        expect(slider).to.have.attribute('type', 'range')
        slider.should.have.value('15000') 
    })
    it ('test how funtion create element div this one child', function () {
        let slider = createElement('input', {class: 'slider', type: 'range', value: '70000'})
        let range = createElement('div', {class: 'Range'}, slider)
        range.should.be.an('HTMLDivElement')
        range.should.have.html('<input class="slider" type="range" value="70000">')
    })

})

describe('View', function () {

    it ('test function viewBetween', function () {
        view.viewBetween(10, 85)
        assert.equal(between.style._values['margin-left'], '10px')
        assert.equal(between.style._values['width'], '85px')
    })
    it ('test function viewScale that show begin and end of scale', function () {
        view.viewScale(100, 500)
        assert.equal(begin.innerHTML, '100')
        assert.equal(end.innerHTML, '500')
    })
    it ('test function viewNum that show numbers over slider balls', function () {
        view.viewNum(num1, 5000, 46)
        assert.equal(num1.innerHTML, '5000')
        assert.equal(num1.style._values['margin-left'], '46px')
    })
    it ('test function viewValue, that transfers the values of the sliders to the panel', function () {
        view.viewValue(val1, 5000)
        view.viewValue(val2, 15000)
        assert.equal(val1.value, '5000')
        assert.equal(val2.value, '15000')
    })
})

describe('Model', function () {

    it ('test function helper that use for helping in work with DOM', function () {
        let $ = model.helper()
        $.el.should.be.an('HTMLInputElement')
        $.el.should.have.class('slider1')
        $.el2.should.be.an('HTMLInputElement')
        $.el2.should.have.class('slider2')
        assert.equal($.slWidth, 266)
        assert.equal($.widthScale, 25000)
        assert.equal($.betwLength, 106.4)
        assert.equal($.value, 5000)
        assert.equal($.value2, 15000)
        assert.equal($.left, 53.2)
        assert.equal($.right, 159.6)
        $.min.should.be.an('HTMLInputElement')
        assert.equal($.min.value, '0')
        $.max.should.be.an('HTMLInputElement')
        assert.equal($.max.value, '25000')
        $.num1.should.be.an('HTMLDivElement')
        $.num2.should.be.an('HTMLDivElement')
        $.val1.should.be.an('HTMLInputElement')
        assert.equal($.val1.value, '5000')
        $.val2.should.be.an('HTMLInputElement')
        assert.equal($.val2.value, '15000')
    })

    it ('test function modelBetween that starts function viewBetween', function () {
        model.modelBetween(view.viewBetween)
        assert.equal(between.style._values['margin-left'], '53.2px')
        assert.equal(between.style._values['width'], '106.4px')
    })
    it ("test function modelScale that starts function viewScale", function () {
        model.modelScale(view.viewScale)
        assert.equal(begin.innerHTML, '0')
        assert.equal(end.innerHTML, '25000')
    })
    it ('test function modelNum that starts function viewNum', function () {
        model.modelNum(view.viewNum)
        assert.equal(num1.innerHTML, '5000')
        assert.equal(num1.style._values['margin-left'], '53.2px')
        assert.equal(num2.innerHTML, '15000')
        assert.equal(num2.style._values['margin-left'], '159.6px')
    })
    it ('test function modelValue that starts function viewValue', function () {
        model.modelValue(view.viewValue)
        assert.equal(val1.value, '5000')
        assert.equal(val2.value, '15000')
    })
    it ('test function modelSetValue that starts viewValue and functions controllerBetween and controllerNum', function () {
        let calls = () => {
            controller.controllerBetween()
            controller.controllerNum()
        }
        model.modelSetValue(view.viewValue, calls)
        assert.equal(slider1.value, '5000')
        assert.equal(slider2.value, '15000')
        assert.equal(between.style._values['margin-left'], '53.2px')
        assert.equal(between.style._values['width'], '106.4px')
        assert.equal(num1.innerHTML, '5000')
        assert.equal(num1.style._values['margin-left'], '53.2px')
        assert.equal(num2.innerHTML, '15000')
        assert.equal(num2.style._values['margin-left'], '159.6px')
    })
    
})

describe("Controller", function () {

    it('test function controllerBetween that starts function modelBetween', function () {
        controller.controllerBetween()
        assert.equal(between.style._values['margin-left'], '53.2px')
        assert.equal(between.style._values['width'], '106.4px')
    })
    it('test function controllerScale that starts function modelScale', function () {
        controller.controllerScale()
        assert.equal(begin.innerHTML, '0')
        assert.equal(end.innerHTML, '25000')
    })
    it('test function controllerNum that starts function modelNum', function () {
        controller.controllerNum()
        assert.equal(num1.innerHTML, '5000')
        assert.equal(num1.style._values['margin-left'], '53.2px')
        assert.equal(num2.innerHTML, '15000')
        assert.equal(num2.style._values['margin-left'], '159.6px')
    })
    it('test function controllerValue that starts function modelValue', function () {
        controller.controllerValue()
        assert.equal(val1.value, '5000')
        assert.equal(val2.value, '15000')
    })
})