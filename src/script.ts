import View from './mvc/view';
import Model from './mvc/model';
import Controller from './mvc/controller';
import Panel from './mvc/panel';

// tslint:disable-next-line:only-arrow-functions
(function ($: any) {
  $.fn.slider = function (options: any) {
    const view = new View(this, options);
    const model = new Model();
      // tslint:disable-next-line:no-unused-expression
    new Controller(view, model);
  };

}(jQuery));

$('.wrapper').each((index, element) => {
  // tslint:disable-next-line:no-unused-expression
  new Panel($(element));
});
