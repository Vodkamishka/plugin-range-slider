import view from './mvc/view';
import {model} from './mvc/model';
import controller from './mvc/controller';
import panel from './components/panel/panel';

(($: any) => {
  $.fn.slider = function (options: any) {
    const classView = new view(this, options);
    const classModel = new model();
    return new controller(classView, classModel);
  };

})(jQuery);

$('.wrapper').each((index, element) => {
  const classPanel = new panel($(element));
});
