
(() => {

if (window !== undefined) window.onload = function () {

    let wrapper:NodeListOf<HTMLElement> | null  = document.querySelectorAll('.wrapper')
    
    if (wrapper !== null){wrapper.forEach((el:HTMLElement) => {
        let random: number = Math.floor(Math.random()*10000000000000)
        el.id = random.toString()
        const view = new View(random)
        const model = new Model()
        const controller = new Controller()
    })}
    }



})()

interface Props {
    class?: string
    type?: string
    value?: string
    min?: string
    max?: string
}

function createElement(tag: string, props: Props, ...children: any) {
    let element: any
    element = document.createElement(tag)
    element.classList.add(`${props.class}`)
    element.type = props.type
    element.setAttribute('value', props.value)
   
    children.forEach((el: any) => {
        if (typeof el === 'string') {el = document.createTextNode(el)}
        element.appendChild(el)
    }) 
    return element
}

class View {
    wrapper: HTMLElement | null
    between!: HTMLElement | null
    begin!: HTMLElement | null
    end!: HTMLElement | null
   
    constructor(random: number) { 
       this.wrapper = document.getElementById(random.toString()) 
       this.create()
       if ( this.wrapper !== null) {
            this.between = this.wrapper.querySelector('.between')
            this.begin = this.wrapper.querySelector('.begin')
            this.end = this.wrapper.querySelector('.end')
        }
     } 
    create () {
        if (this.wrapper !== null){
            let num1:HTMLElement = createElement('div', {class: 'num1'})
            let num2:HTMLElement = createElement('div', {class: 'num2'})
            let between:HTMLElement = createElement('div', {class: 'between'})
            let begin:HTMLElement = createElement('div', {class: 'begin'})
            let end:HTMLElement = createElement('div', {class: 'end'})
            
            let slider1:HTMLInputElement = createElement('input', {class: 'slider1', type: 'range',  value: '5000'})
            let slider2:HTMLInputElement = createElement('input', {class: 'slider2', type: 'range', value: '15000'})

            let range:HTMLElement = createElement('div', {class: 'range'}, slider1, slider2, between, begin, end, num1, num2)

            let p:HTMLElement = createElement('p', {class: 'p'}, "Панель конфигурации:")

            let min:HTMLInputElement = createElement('input', {class: 'min', type: 'text', value: '0'})
            let labelMin:HTMLElement = createElement('label', {class: 'label'}, 'Мин. диапазона', min)
            let max:HTMLInputElement = createElement('input', {class: 'max', type: 'text', value: '25000'})
            let labelMax:HTMLElement = createElement('label', {class: 'label'}, 'Макс. диапазона', max)
            let value1:HTMLInputElement = createElement('input', {class: 'value1', type: 'text', value: '5000'})
            let labelVal1:HTMLElement = createElement('label', {class: 'labelVal1'}, 'Значение 1', value1)
            let value2:HTMLInputElement = createElement('input', {class: 'value2', type: 'text', value: '15000'})
            let labelVal2:HTMLElement = createElement('label', {class: 'labelVal2'}, 'Значение 2', value2)
            let flag1:HTMLInputElement = createElement('input', {class: 'flag1', type: 'checkbox', value: ''})
            let labelFlag1:HTMLElement = createElement('label', {class: 'labelFlag1'}, 'Откл. бегунок 1', flag1)
            let flag2:HTMLInputElement = createElement('input', {class: 'flag2', type: 'checkbox', value: ''})
            let labelFlag2:HTMLElement = createElement('label', {class: 'labelFlag2'}, 'Откл. бегунок 2', flag2)
            let inpNum1:HTMLInputElement = createElement('input', {class: 'inpNum1', type: 'checkbox', value: ''})
            let labelNum1:HTMLElement = createElement('label', {class: 'labelNum1'}, 'Откл. значение 1', inpNum1)
            let inpNum2:HTMLInputElement = createElement('input', {class: 'inpNum2', type: 'checkbox', value: ''})
            let labelNum2:HTMLElement = createElement('label', {class: 'labelNum2'}, 'Откл. значение 2', inpNum2)
            let rotate:HTMLInputElement = createElement('input', {class: 'rotateSlider', type: 'checkbox', value: ''})
            let labelRotate:HTMLElement = createElement('label', {class: 'labelRotate'}, 'Вкл. вертикальный вид', rotate)
            let step:HTMLInputElement = createElement('input', {class: 'step', type: 'text', value: ''})
            let labelStep:HTMLElement = createElement('label', {class: 'label'}, 'Размер шага 1', step)
            let step2:HTMLInputElement = createElement('input', {class: 'step2', type: 'text', value: ''})
            let labelStep2:HTMLElement = createElement('label', {class: 'label'}, 'Размер шага 2', step2)
            
            let panel:HTMLElement = createElement('div', {class: 'panel'}, p, labelMin, labelMax, labelVal1, 
            labelVal2, labelFlag1, labelFlag2, labelNum1, labelNum2, labelRotate, labelStep, labelStep2)

            this.wrapper.appendChild(panel)
            this.wrapper.appendChild(range)
        }
    }
    viewBetween = (left: number,  betwWidth: number) => {
        if (this.between !== null){
            this.between.style.marginLeft = left + 'px'
            this.between.style.width = betwWidth + 'px'
        }
    }
   
    
}




class Model {

}

class Controller {
    
}
  
  var module!: NodeModule
  
  if (module !== undefined) module.exports = {
      View, 
      Model, 
      Controller,
      createElement
  }

