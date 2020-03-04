import { Panel } from '../src/components/panel/panel';
import { View } from '../src/slider/mvc/view';
import { Model } from '../src/slider/mvc/model';
import { Controller } from '../src/slider/mvc/controller';

const wrapper = $(`
    <div class = "wrapper" data-options ='{"value1": 5000,"value2": 15000, "min": 0,"max": 25000,"step": 50,"disableValues":false,"vertical":false,"oneRunner":false}'>
      <div class = "wrapper__slider">
        <div class = "slider js-slider">
        </div>
      </div>
    </div>
`);

$('body').append(wrapper);

(($) => {
  $.fn.slider = function (options) {
    const classView = new View(this, options);
    const classModel = new Model();
    return new Controller(classView, classModel);
  };

})(jQuery);

const classController = new Panel($('.wrapper')).slider;
const classView = classController.view;
const classModel = classController.model;

export {classController as controller,  classView as view, classModel as model}
