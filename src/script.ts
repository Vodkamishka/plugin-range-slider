import View from './mvc/view/view';
import Model from './mvc//model/model';
import Controller from './mvc/controller/controller';

// tslint:disable-next-line:only-arrow-functions
(function ($: any) {
  $.fn.slider = function (options: any) {
    this.each((index: number, element: HTMLElement) => {
      const view = new View($(element));
      const model = new Model();
      // tslint:disable-next-line:no-unused-expression
      new Controller(view, model);
    });
  };
  $('.slider').slider();

}(jQuery));
