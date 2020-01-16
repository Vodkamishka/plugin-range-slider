class Controller {
    view: any
    model: any
    constructor (view:any, model: any) {
        this.view = view
        this.model = model
        this.init()
}
    init = () => {
        this.controllerSubscribe()
        let first_options = this.getDataFromView()
        this.sendDataToModel(first_options)
        this.controllerBalls()
        
    }
   
    getDataFromView = () => this.view.sendDataToController() 
    sendDataToModel = (options: any) => this.model.getDataFromController(options)
    controllerSubscribe = () => this.model.subscribe(this.view.render)

    controllerBalls = () => this.view.addEventListeners({
        dispatchBallValueFirst: this.model.dispatchBallValueFirst,
        dispatchBallValueSecond: this.model.dispatchBallValueSecond,
        dispatchMin: this.model.dispatchMin,
        dispatchMax: this.model.dispatchMax,
        dispatchValueFirst: this.model.dispatchValueFirst,
        dispatchValueSecond: this.model.dispatchValueSecond,
        dispatchDisableValues: this.model.dispatchDisableValues,
        dispatchVerticalView: this.model.dispatchVerticalView,
        dispatchOneToggle: this.model.dispatchOneToggle,
        dispatchStep: this.model.dispatchStep
    })
}

export default Controller;