import View from './mvc/view';
import Model from './mvc/model';
import Controller from './mvc/controller';


(function ($: any) {
    $.fn.slider = function (options: any) {
       let settings = $.extend({
           value1: 5000,
           value2: 15000,
           min: 0,
           max: 25000,
           step: 50,
       }, options)
       
       this.each((index: number, value: HTMLElement) => {    
           const view = new View(value, settings)
           const model = new Model(value)
           new Controller(view, model)
       })
    }
   
   $('.slider').slider()

}(jQuery))


var module!: NodeModule

if (module !== undefined) module.exports = {
    View, 
    Model, 
    Controller
}



