import Panel from '../src/components/panel/panel';
import View from '../src//mvc/view';
import Model from '../src/mvc/model';
import Controller from '../src/mvc/controller';

const wrapper = $(`
    <div class = "wrapper" data-options ='{"value1":"5000","value2":"15000","min":"0","max":"25000","step":"50","disableValues":false,"vertical":false,"oneRunner":false}'>
      <div class = "wrapper__slider">
        <div class = "slider">
        </div>
      </div>
    </div>
`);

$('body').append(wrapper);

(($) => {
  $.fn.slider = function (options) {
    const view = new View(this, options);
    const model = new Model();
    return new Controller(view, model);
  };

})(jQuery);

const controller = new Panel($('.wrapper')).slider;


