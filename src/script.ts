import { View } from './slider/mvc/view';
import { Model } from './slider/mvc/model';
import { Controller } from './slider/mvc/controller';
import { Panel, IOptions } from './components/panel/panel';

(($: JQuerySupport) => {
  $.fn.slider = function (options: IOptions) {
    const view = new View(this, options);
    const model = new Model();
    return new Controller(view, model);
  };

})(jQuery);

$('.wrapper').each((index, element) => {
  const panel = new Panel($(element));
});
