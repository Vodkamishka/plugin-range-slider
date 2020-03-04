import { controller, view, model } from './script.test';

describe('Тестирование Controller', function () {

    beforeEach(() => {
        spyOn(controller.model, 'subscribe');
        spyOn(controller.view, 'addEventListeners');
        spyOn(controller.model, 'sendDataFromControllerToModel');
       });

    it('Создается экземпляр класса Controller', () => {
        expect(controller).toBeDefined(); 
    });
    it('Переменным класса Controller присваиваются передаваемые аргументы', () => {
        expect(controller.view).toBe(view); 
        expect(controller.model).toBe(model); 
    });
    it('Проверка результата выполнения функции init', () => {
        controller.init();
        expect(controller.model.subscribe).toHaveBeenCalled();
        expect(controller.model.sendDataFromControllerToModel).toHaveBeenCalled();
    });
    it('Проверка функции controllerState', () => {
        controller.controllerState();
        expect(controller.view.addEventListeners).toHaveBeenCalled()
    });
})  

