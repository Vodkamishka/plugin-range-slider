class Controller {
  view: any;
  model: any;
  constructor (view:any, model: any) {
    this.view = view;
    this.model = model;
    this.init();
  }
  init = () => {
    this.model.subscribe(this.view.render);
        // tslint:disable-next-line:variable-name
    const first_options = this.view.sendDatafromViewToController();
    this.model.sendDataFromControllerToModel(first_options);
    this.controllerState();
  }
  controllerState = () => this.view.addEventListeners(
        this.model.dispatchState,
        this.model.dispatchBallValueFirst,
        this.model.dispatchBallValueSecond,
    )
}

export default Controller;
