"use strict";
exports.__esModule = true;
var createStore_1 = require("../../redux/createStore");
var reducer_1 = require("../../redux/reducer");
var actionCreators_1 = require("../../redux/actionCreators");
var Model = /** @class */ (function () {
    function Model() {
        var _this = this;
        this.sendDataFromControllerToModel = function (options) { return _this.store.dispatch(actionCreators_1.loadFirstData(options)); };
        this.subscribe = function (render) { return _this.store.subscribe(function () { return render(_this.store.getState()); }); };
        this.dispatchBallValueFirst = function (left) { return _this.store.dispatch(actionCreators_1.changeBallValueFirst(left)); };
        this.dispatchBallValueSecond = function (right) { return _this.store.dispatch(actionCreators_1.changeBallValueSecond(right)); };
        this.dispatchState = function (options) { return _this.store.dispatch(actionCreators_1.changeState(options)); };
        this.store = createStore_1["default"](reducer_1["default"]);
    }
    return Model;
}());
exports["default"] = Model;
