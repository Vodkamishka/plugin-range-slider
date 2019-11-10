
const assert = require('chai').assert
let script = require('../script')
const jsdom  = require('jsdom')
const {JSDOM} = jsdom
global.document = new JSDOM('<html><body></body></html>').window.document

let View = script.View
let Model = script.Model
let Controller = script.Controller
let createElement = script.createElement

describe('Check plugin', function () {


    it ('function createElement should create and return div ', function () {
        let result = createElement('div')
        assert.equal(result, '<div></div>')
    })
})


