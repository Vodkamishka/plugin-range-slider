const calcLeftRight = (state, value, min, max, widthScale) => (value - min)* widthScale/(max - min) - state.ballWidth/2;
const widthStep = (state) => state.step* state.widthScale/(state.max - state.min)
const calcValue = (state, leftOrRight) => Math.round((+leftOrRight + +state.ballWidth/2) * (state.max - state.min) / state.widthScale + +state.min)

const reducer = (action: {type: any; amount: any; }, state: any) => {
    switch (action.type){
        case 'LOAD_FIRST_DATA': 
            return {
                ...state,
                ...action.amount,
                left: action.amount.oneRunner ? -action.amount.ballWidth/2 : calcLeftRight(action.amount, action.amount.value1, action.amount.min, action.amount.max, action.amount.widthScale),
                right: calcLeftRight(action.amount, action.amount.value2, action.amount.min, action.amount.max, action.amount.widthScale)
            }
        case 'CHANGE_BALL_VALUE_FIRST':
            if (action.amount <= 0 - state.ballWidth/2) {action.amount = 0 - state.ballWidth/2}
            if (action.amount >= state.right - widthStep(state)) {action.amount = state.right - widthStep(state)}
            return {
                ...state,
                left: action.amount,
                value1: calcValue(state, action.amount)
            }
        case 'CHANGE_BALL_VALUE_SECOND':
            if (action.amount >= state.widthScale - state.ballWidth/2) {action.amount = state.widthScale - state.ballWidth/2} 
            if (action.amount <= state.left) {action.amount = state.left}
            return {
                ...state,
                right: action.amount,
                value2: calcValue(state, action.amount)
            }
       
        case 'CHANGE_STATE':
            let {value1, value2, min, max, step, disableValues, vertical, oneRunner} = action.amount

            step = +step <= 0 ? state.step : step
            step = +step >= +max ? state.step : step

            value1 = value1 || state.value1
            value2 = value2 || state.value2

            let widthScale = state.widthScale 
            if (vertical !== state.vertical && vertical === true) widthScale = widthScale/3
            if (vertical !== state.vertical && vertical === false) widthScale = widthScale*3

            let left = state.left
            let right = state.right

            if (+value1 >= value2 - step || +value1 < +min) value1 = state.value1
            if (+value2 <= +value1 + +step || +value2 > +max) value2 = state.value2
            
            if (+min >= +max + +step) min = state.min
            value1 = (+min >= +value1) ? min : value1
            if (+min >+value2) {
                value1 = min
                value2 = +min + +step
            }

            if (+max <= +min + +step) max = state.max
            value2 = (+max <= +value2) ? max: value2
            if (+max <= +value1) {
                value2 = max
                value1 = max - step
            }

            if (min !== state.min || max!== state.max || vertical !== state.vertical || value1 !== state.value1 || 
            value2 !== state.value2) {              
                left = calcLeftRight (state, value1, min, max, widthScale)
                right = calcLeftRight (state, value2, min, max, widthScale)       
            }
            
            return {
                
                ...state,
                min,
                max,
                disableValues,
                vertical,
                oneRunner,
                step,
                value1: oneRunner ? 0 : value1,
                value2,
                left: oneRunner ? -state.ballWidth/2 : left,
                right, 
                widthScale
              
            }
        default: 
            return state;
    }
}


export default reducer;