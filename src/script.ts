import View from './mvc/view';
import Model from './mvc/model';
import Controller from './mvc/controller';
import Panel from './components/panel/panel';

(($: any) => {
  $.fn.slider = function (options: any) {
    const view = new View(this, options);
    const model = new Model();
    const controller = new Controller(view, model);
  };

})(jQuery);

$('.wrapper').each((index, element) => {
  const panel = new Panel($(element));
});
