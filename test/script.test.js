import panel from '../src/components/panel/panel';
import view from '../src//mvc/view';
import {model} from '../src/mvc/model';
import controller from '../src/mvc/controller';

const wrapper = $(`
    <div class = "wrapper" data-options ='{"value1":"5000","value2":"15000","min":"0","max":"25000","step":"50","disableValues":false,"vertical":false,"oneRunner":false}'>
      <div class = "wrapper__slider">
        <div class = "slider js-slider">
        </div>
      </div>
    </div>
`);

$('body').append(wrapper);

(($) => {
  $.fn.slider = function (options) {
    const classView = new view(this, options);
    const classModel = new model();
    return new controller(classView, classModel);
  };

})(jQuery);

const classController = new panel($('.wrapper')).slider;
const classView = classController.view;
const classModel = classController.model;

export {classController as controller,  classView as view, classModel as model}
