import view from './mvc/view';
import {model} from './mvc/model';
import controller from './mvc/controller';
import Panel from './components/panel/panel';

(($: any) => {
  $.fn.slider = function (options: any) {
    const views = new view(this, options);
    const models = new model();
    return new controller(views, models);
  };

})(jQuery);

$('.wrapper').each((index, element) => {
  const panel = new Panel($(element));
});
