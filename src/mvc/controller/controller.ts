class Controller {
  view: any;
  model: any;
  constructor (view:any, model: any) {
    this.view = view;
    this.model = model;
    this.init();
  }
  init = () => {
        // tslint:disable-next-line:variable-name
    const first_options = this.view.sendDatafromViewToController();
    this.model.subscribe(this.view.render, first_options.render);
    this.model.sendDataFromControllerToModel(first_options);
    first_options.addEventListeners(this.model.dispatchState);
    this.controllerState();
  }
  controllerState = () => this.view.addEventListeners(this.model.dispatchBallValueFirst, this.model.dispatchBallValueSecond, this.model.getState);
}

export default Controller;
