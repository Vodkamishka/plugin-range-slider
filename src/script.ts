import View from './mvc/view/view';
import Model from './mvc//model/model';
import Controller from './mvc/controller/controller';


(function ($: any) {
    $.fn.slider = function (options: any) {
       let settings = $.extend({
           value1: 5000,
           value2: 15000,
           min: 0,
           max: 25000,
           step: 50,
       }, options)
       this.each((index: number, element: HTMLElement) => {    
        const view = new View($(element), settings)
        const model = new Model(element)
        new Controller(view, model)
    })
    }
   
   $('.slider').slider()

}(jQuery))








