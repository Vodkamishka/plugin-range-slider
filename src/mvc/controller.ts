import View from './view';
import {Model} from './model';

class Controller {
  view: View;
  model: Model;
  constructor (view: View, model: Model) {
    this.view = view;
    this.model = model;
    this.init();
  }
  init = () => {
    const firstOptions = this.view.sendDatafromViewToController();
    this.model.subscribe(this.view.render, firstOptions.render);
    this.model.sendDataFromControllerToModel(firstOptions);
    firstOptions.addEventListeners(this.model.dispatchState);
    this.controllerState();
  }
  controllerState = () => this.view.addEventListeners(this.model.dispatchBallValueFirst,
                                                      this.model.dispatchBallValueSecond,
                                                      this.model.getState)
}

export default Controller;
