const calcDisp = document.querySelector('h1'); //Header on calc display
const inputBtn = document.querySelectorAll('button'); //get all the buttons
const clearBtn = document.getElementById('clear-btn'); //button to clear the display
//Calc Variables
let valueA = 0;
let nextVal = false;
let valueOp = '';

function numberVal(number){
    //Display ing the vales
    //We want to make sure that we can have a string of values 
    //const displayVal = calcDisp.textContent;
    //calcDisp.textContent = displayVal === '0' ? number : displayVal + number; //If it is not '0' add display value plus the number

    //Reset display after operator is used
    if(nextVal){
        calcDisp.textContent = number;
        nextVal = false;
    }else{
        const displayVal = calcDisp.textContent;
        calcDisp.textContent = displayVal === '0' ? number : displayVal + number;
    }
}

function limitDec(){
    //Limit decimal inputs
    //also do not allow for a decimal to be pressed after operator
    if(nextVal){
        return;
    }

    if(!calcDisp.textContent.includes('.')){
        calcDisp.textContent = `${calcDisp.textContent}.`;
    }
}

//calculations
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  
    '=': (firstNumber, secondNumber) => secondNumber,
}

function Ops(operator){
    const currentVal = Number(calcDisp.textContent);
    //Prevent multiple operator inputs.
    if(valueOp && nextVal){
        return;
    }
    //Assign the first value
    if(!valueA){
        valueA = currentVal;
    } else{
        const calc = calculate[valueOp](valueA, currentVal);
        calcDisp.textContent = calc;
        valueA = calc;
    }
    //get the next value 
    nextVal = true;
    valueOp = operator;
    
}

//Add in the ActionListeners for all of the buttons 
inputBtn.forEach((inputBt) => {
    if(inputBt.classList.length === 0){
        inputBt.addEventListener('click', () => numberVal(inputBt.value));
    } else if(inputBt.classList.contains('operator')){
        inputBt.addEventListener('click', () => Ops(inputBt.value));
    } else if(inputBt.classList.contains('decimal')){
        inputBt.addEventListener('click', () => limitDec());
    }
});


//Reseting the display, and all of the associated values

function reset(){
    calcDisp.textContent = '0';
    valueA = 0;
    nextVal = false;
    valueOp = '';
}

clearBtn.addEventListener('click', reset);