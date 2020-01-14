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
        this.controllerMin()
        this.controllerMax()
        this.controllerValueFirst()
        this.controllerValueSecond()
        this.controllerDisableValues()
        this.controllerVerticalView()
    }
   
    getDataFromView = () => this.view.sendDataToController() 
    sendDataToModel = (options: any) => this.model.getDataFromController(options)
    controllerSubscribe = () => this.model.subscribe(this.view.render)
    controllerBalls = () => this.view.addEventListenerBalls(this.model.dispatchBallValueFirst, this.model.dispatchBallValueSecond)
    controllerMin = () => this.view.addEventListenerMin(this.model.dispatchMin)
    controllerMax = () => this.view.addEventListenerMax(this.model.dispatchMax)
    controllerValueFirst = () => this.view.addEventListenerValueFirst(this.model.dispatchValueFirst)
    controllerValueSecond = () => this.view.addEventListenerValueSecond(this.model.dispatchValueSecond)
    controllerDisableValues = () => this.view.addEventListenersDisableValues(this.model.dispatchDisableValues)
    controllerVerticalView = () => this.view.addEventListenersVerticalView(this.model.dispatchVerticalView)

}

export default Controller;