// tslint:disable-next-line:import-name
import View from './mvc/view';
// tslint:disable-next-line:import-name
import Model from './mvc/model';
// tslint:disable-next-line:import-name
import Controller from './mvc/controller';
// tslint:disable-next-line:import-name
import Panel from './components/panel/panel';

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
