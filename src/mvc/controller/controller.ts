class Controller {
    view: any
    model: any
    constructor (view:any, model: any) {
        this.view = view
        this.model = model
        this.init()
}
    init = () => {
        let functions = [this.controllerScale, this.controllerNum, this.addEvent, this.controllerBetween, this.controllerSetValue, 
            this.controllerSetScale, this.controllerHideNum, this.controllerRotate]
        functions.forEach(el => el())
        let first_options = this.getFirstOptionsFromView()
        this.sendFirstOptionsToModel(first_options)
    }
    calls = () => {
        this.controllerBetween()
        this.controllerNum()
    }
    f = () => {
        let functions = [this.controllerBetween, this.controllerNum, this.controllerValue, this.controllerScale, this.controllerStep]
        functions.forEach(el => el())  
    }
    getFirstOptionsFromView = () => this.view.sendFirstOptionsToController() 
    sendFirstOptionsToModel = (options: any) => this.model.getFirstOptionsFromController(options)
    
    controllerBetween = () => this.model.modelBetween (this.view.viewBetween)
    controllerStep = () => this.model.modelStep (this.view.viewStep)
    controllerCreate = () => this.model.modelCreate (this.view.viewCreate)
    controllerScale = () => this.model.modelScale (this.view.viewScale)
    controllerNum = () => this.model.modelNum (this.view.viewNum)
    controllerValue = () => this.model.modelValue(this.view.viewValue)
    controllerHideNum = () => this.model.modelHideNum(this.view.viewHideNum)
    controllerRotate = () => this.model.modelRotate(this.view.viewRotate, this.controllerBetween)
    controllerSetValue = () => this.model.modelSetValue(this.view.viewValue, this.calls)
    controllerSetScale = () => this.model.modelSetScale(this.f)
    addEvent = () => this.model.modelAddEvent(this.f)
}

export default Controller;