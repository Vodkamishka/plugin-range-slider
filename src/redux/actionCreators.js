"use strict";
exports.__esModule = true;
var actions_1 = require("./actions");
var loadFirstData = function (data) { return ({ type: actions_1.LOAD_FIRST_DATA, amount: data }); };
exports.loadFirstData = loadFirstData;
var changeBallValueFirst = function (left) { return ({ type: actions_1.CHANGE_BALL_VALUE_FIRST, amount: left }); };
exports.changeBallValueFirst = changeBallValueFirst;
var changeBallValueSecond = function (right) { return ({ type: actions_1.CHANGE_BALL_VALUE_SECOND, amount: right }); };
exports.changeBallValueSecond = changeBallValueSecond;
var changeState = function (props) {
    return { type: actions_1.CHANGE_STATE, amount: props };
};
exports.changeState = changeState;
