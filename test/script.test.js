import View from '../src/mvc/view.ts';
import Model from '../src/mvc/model.ts';
import Controller from '../src/mvc/controller.ts';
import Panel from '../src/components/panel/panel'


const wrapper = $(`
    <div class = "wrapper">
      <div class = "wrapper__slider">
        <div class = "slider">
        </div>
      </div>
    </div>
    
`);

const options = {
  value1: '5000', 
  value2: '15000', 
  min: '0', 
  max: '25000', 
  step: '50', 
  disableValues: true, 
  vertical: false, 
  oneRunner: false
}

$('body').append(wrapper);
let $wrapper = $('body').find('.wrapper');


const view = new View ($wrapper, options);
const model = new Model ();
const controller = new Controller (view, model);
new Panel($wrapper)

export {view, model, controller}


