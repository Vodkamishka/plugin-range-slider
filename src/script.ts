import View from './mvc/view';
import {Model} from './mvc/model';
import Controller from './mvc/controller';
import {Panel, Data} from './components/panel/panel';

(($: JQuerySupport) => {
  $.fn.slider = function (options: Data) {
    const view = new View(this, options);
    const model = new Model();
    return new Controller(view, model);
  };

})(jQuery);

$('.wrapper').each((index, element) => {
  const classPanel = new Panel($(element));
});

