class Controller {
    view: any
    model: any
    constructor (view:any, model: any) {
        this.view = view
        this.model = model
        this.init()
}
    init = () => {
        let functions = [this.controllerNum, this.addEvent, this.controllerBetween, this.controllerSetValue, 
            this.controllerHideNum, this.controllerRotate]
        functions.forEach(el => el())
        let first_options = this.getDataFromView()
        this.sendDataToModel(first_options)
        this.controllerSubscribe()
        this.controllerMin()
        this.controllerMax()
        this.controllerValueFirst()
        this.controllerValueSecond()
    }
    calls = () => {
        this.controllerBetween()
        this.controllerNum()
    }
    f = () => {
        let functions = [this.controllerBetween, this.controllerNum, this.controllerValue, this.controllerStep]
        functions.forEach(el => el())  
    }
    
    getDataFromView = () => this.view.sendDataToController() 
    sendDataToModel = (options: any) => this.model.getDataFromController(options)
    controllerSubscribe = () => this.model.subscribe(this.view.render)
    controllerMin = () => this.view.addEventListenerMin(this.model.dispatchMin)
    controllerMax = () => this.view.addEventListenerMax(this.model.dispatchMax)
    controllerValueFirst = () => this.view.addEventListenerValueFirst(this.model.dispatchValueFirst)
    controllerValueSecond = () => this.view.addEventListenerValueSecond(this.model.dispatchValueSecond)

    
    controllerBetween = () => this.model.modelBetween (this.view.viewBetween)
    controllerStep = () => this.model.modelStep (this.view.viewStep)
    controllerCreate = () => this.model.modelCreate (this.view.viewCreate)
    controllerNum = () => this.model.modelNum (this.view.viewNum)
    controllerValue = () => this.model.modelValue(this.view.viewValue)
    controllerHideNum = () => this.model.modelHideNum(this.view.viewHideNum)
    controllerRotate = () => this.model.modelRotate(this.view.viewRotate, this.controllerBetween)
    controllerSetValue = () => this.model.modelSetValue(this.view.viewValue, this.calls)
    addEvent = () => this.model.modelAddEvent(this.f)
}

export default Controller;