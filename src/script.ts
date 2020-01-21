import View from './mvc/view/view';
import Model from './mvc//model/model';
import Controller from './mvc/controller/controller';

(function ($: any) {
    $.fn.slider = function (options: any) {
        this.each((index: number, element: HTMLElement) => {    
        const view = new View($(element))
        const model = new Model()
        new Controller(view, model)
    })
    }
   
   $('.slider').slider()

}(jQuery))