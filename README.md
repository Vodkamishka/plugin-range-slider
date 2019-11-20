# Range slider plugin tdd mvc typescript

[Демонстрация](https://vodkamishka.github.io/plugin-range-slider/) | [Репозиторий](https://github.com/Vodkamishka/plugin-range-slider)

Тестовое задание для Fullstack Development

## Описание

Слайдер с двумя бегунками с возможностью менять значения в панели конфигурации.

## Архитектура приложения

При написаниии приложения использовались принципы построения MVC архитектуры.

Плагин делится на три слоя, представленных в виде классов View, Model и Controller. View и Model ничего не знают друг о друге. Класс Controller знает о существовании View и Model, имеет зависимость - получает их в качестве аргументов. На выходе получается подвид MVC - MVP с пассивным View слоем.

Слой View используется для отображения приложения, в него в качестве аргументов передаются элементы DOM и значения, которые надо присвоить стилевым свойствам элементов.

Слой Model получает значения DOM элементов и передает их в Controller.

Слой Controller непосредственно управляет приложением. Он получает значения из Model, передает их в View.

## Класс View 

состоит из следующих методов:

create -  создает элементы DOM c возможностью задать класс, значения value, тип и детей элемента.

viewBetween - управляет отображением интервала между бегунками.

viewScale - отображает минимум и максимум слайдера.

viewNum - отвечает за отображение значений над бегунками.

viewValue - универсальная функция. Отображает значения бегунков в панели конфигурации в полях значение 1 и значение 2, также используется для изменений значений бегунков через ввод значений в панели конфигурации и для изменений минимума и максимума слайдера.

viewHideBall - метод используется для скрытия бегунка слайдера.

viewHideNum - скрывает значение над бегунком.

viewRotate - переводит слайдер в вертикальное положение.

## Методы класса Model:

modelAddEvent - привязывает addEventListener к слайдеру - при измении значений бегунка запускается функция, переданная в качестве аргумента.

modelBetween - запускает функцию, переданную в качестве аргумента, с двумя значениями - левой границей и длиной интервала между бегунками.

modelScale - вызывает функцию с двумя аргументами - минимум и максимум сладера.

modelNum - запускается функция с тремя аргументами - тэгдив элемент, в котором будет отображаться данные бегунка, значение бегунка и левая граница элемента.

modelValue - производит вызов функции с двумя аргументами - тегинпут элемент в панели конфигурации, отображающий значение бегунка и данные бугунка.

modelSetValue - данный метод используется для смены значений бегунков через панель конфигурации. При изменение значение полей Значение 1 и Значение 2 в панели конфигурации запускается ряд методов, отвественных за поведение бегунков и отображения их значений.

modelSetScale - применяется для смены максимума и минимума слайдера.

modelHideBall - осуществляет подписку на checkbox элемент. При изменнении чекбокса запускается функции с див-элементом в качестве аргумента, отображающим значение бегунка.

modelHideNum - метод используется для скрытия значения над бегунком.

modelRotate - подписывает checkbox элемент rotateSlider на addEventListener. При измениении срабатывает функция с тремя аргументами - див элементы - range - контейнер для слайдеров и num1, num2 - элементы, отображащие значения над бегунками.

helper - производит манипуляции с DOM элементами и возвращает на выходе ряд значений, используемых в других функцияч Model.

## Класс Controller

Методы Controller запускают соответствующие методы Model.

## Запуск тестов

`npm test`

## UML диаграмма 

находится в корне каталога.