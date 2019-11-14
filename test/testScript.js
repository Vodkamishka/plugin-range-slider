let chai = require('chai')
const expect = require('chai').expect
chai.use(require('chai-dom'))
const assert = require('chai').assert
var should = require('chai').should()

let script = require('../script.js')
const jsdom  = require('jsdom')
const {JSDOM} = jsdom
const dom = new JSDOM('<html><body><div class="wrapper" id="23"></div></body></html>')
global.window = dom.window
global.document = dom.window.document
let View = script.View
let view = new View(23)
let Model = script.Model
let Controller = script.Controller
let createElement = script.createElement

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
        let between = document.querySelector('.between')
        assert.equal(between.style._values['margin-left'], '10px')
        assert.equal(between.style._values['width'], '85px')
    })
})
