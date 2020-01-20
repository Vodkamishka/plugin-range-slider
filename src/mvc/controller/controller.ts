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
        //this.controllerBalls()
        this.controllerState()
    }
   
    getDataFromView = () => this.view.sendDataToController() 
    sendDataToModel = (options: any) => this.model.getDataFromController(options)
    controllerSubscribe = () => this.model.subscribe(this.view.render)

    controllerBalls = () => this.view.addEventListenersBalls({
        dispatchBallValueFirst: this.model.dispatchBallValueFirst,
        dispatchBallValueSecond: this.model.dispatchBallValueSecond,
    })

    controllerState = () => this.view.addEventListeners(this.model.dispatchState, this.model.dispatchBallValueFirst, this.model.dispatchBallValueSecond)
}

export default Controller;