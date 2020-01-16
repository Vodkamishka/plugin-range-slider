"use strict";
exports.__esModule = true;
var createStore_1 = require("../../redux/createStore");
var reducer_1 = require("../../redux/reducer");
var actionCreators_1 = require("../../redux/actionCreators");
var Model = /** @class */ (function () {
    function Model() {
        var _this = this;
        this.getDataFromController = function (options) {
            _this.store.dispatch(actionCreators_1.loadFirstData(options));
            _this.store.dispatch(actionCreators_1.calculateLeftFromValue());
        };
        this.subscribe = function (f) { return _this.store.subscribe(function () { return f(_this.store.getState()); }); };
        this.dispatchBallValueFirst = function (left) { return _this.store.dispatch(actionCreators_1.changeBallValueFirst(left)); };
        this.dispatchBallValueSecond = function (right) { return _this.store.dispatch(actionCreators_1.changeBallValueSecond(right)); };
        this.dispatchMin = function (min) {
            _this.store.dispatch(actionCreators_1.changeMin(min));
            _this.store.dispatch(actionCreators_1.calculateLeftFromValue());
        };
        this.dispatchMax = function (max) {
            _this.store.dispatch(actionCreators_1.changeMax(max));
            _this.store.dispatch(actionCreators_1.calculateLeftFromValue());
        };
        this.dispatchValueFirst = function (value) {
            _this.store.dispatch(actionCreators_1.changeValueFirst(value));
            _this.store.dispatch(actionCreators_1.calculateLeftFromValue());
        };
        this.dispatchValueSecond = function (value) {
            _this.store.dispatch(actionCreators_1.changeValueSecond(value));
            _this.store.dispatch(actionCreators_1.calculateLeftFromValue());
        };
        this.dispatchDisableValues = function () { return _this.store.dispatch(actionCreators_1.disableRunnersValues()); };
        this.dispatchVerticalView = function () { return _this.store.dispatch(actionCreators_1.toggleVerticalPosition()); };
        this.dispatchOneToggle = function () {
            _this.store.dispatch(actionCreators_1.enableOneRunner());
            //this.store.dispatch(madeLeftZero())
        };
        this.dispatchStep = function (step) { return _this.store.dispatch(actionCreators_1.changeStep(step)); };
        this.store = createStore_1["default"](reducer_1["default"]);
    }
    return Model;
}());
exports["default"] = Model;
