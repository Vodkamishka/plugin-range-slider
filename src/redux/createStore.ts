function createStore (reducer: (arg0: any, arg1: any) => any) {
    let state: any;
    let callbacks: any[] = []

    const getState = () => state

    const dispatch = (action: any) => {
        state = reducer(action, state)
        callbacks.forEach(callback => callback())
    }

    const subscribe = (callback: any) => {
        callbacks.push(callback)
        return callbacks.filter(cb => cb !== callback)
    }
    
    return {getState, dispatch, subscribe}
}

export default createStore;