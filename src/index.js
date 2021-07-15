function eval() {
    // Do not use eval!!!
    return;
}



const operations = {
    '+' : 2,
    '-' : 2,
    '*' : 3,
    '/' : 3
}
const operationBrackets = {
    '(' : ')'
}

const operationsAll = {
    '+' : 2,
    '-' : 2,
    '*' : 3,
    '/' : 3,
    '(' : 1
}

function expressionCalculator(expr) {
   let splitCalc = splitCalculstionString(expr);
   let exp = expressionCalculation(splitCalc);
   let result = calculationPolish(exp);
   if(Number.isInteger(result)){
    return result;
}
return Number(result.toFixed(4));

}
function calculationPolish(array){
const result = [];
for(let i=0,length = array.length;i <length;i++){
    if(!isNaN(array[i])){ result.push(array[i])
    continue;
    }
    if(operations[array[i]]){
let num2 = result.pop();
let num1 = result.pop(); 

switch(true){
    case array[i] === '+':
        result.push(num1+num2);
        break;
    case array[i] === '-':
        result.push(num1 - num2);
        break;
    case array[i] === '*':
        result.push(num1 * num2);
        break;
    case array[i] === '/':
        if(num2 ===0) throw new Error('TypeError: Division by zero.');
        result.push((num1 / num2));
        break;

}
    }
}
return result[0];
}

function expressionCalculation (exp){
const exitArray = [];
const stackArray = [];
for(let i =0 ,length = exp.length; i <length; i++){
    if(!isNaN(exp[i])) {
        exitArray.push(exp[i])
        continue;
    }
    if(stackArray.length === 0 && operations[exp[i]]){
        stackArray.push(exp[i]);
        continue;
    }
    if(operationBrackets[exp[i]]){
        stackArray.push(exp[i]);
        continue;
    }
if((stackArray.length > 0) && (operations[exp[i]]) && (operationsAll[exp[i]] > operationsAll[stackArray[stackArray.length-1]])){
    stackArray.push(exp[i]);
    continue; 
}
if((stackArray.length > 0) && (operations[exp[i]]) && (operationsAll[exp[i]] <= operationsAll[stackArray[stackArray.length-1]])){

    let element = stackArray.pop();
    exitArray.push(element);
    stackArray.push(exp[i]);
    continue;
}
if(exp[i] === ')'){
    while(stackArray[stackArray.length-1] !== '('){
        let element =  stackArray.pop();
        exitArray.push(element);
        
    }
    stackArray.pop();
    continue;
}

}
return exitArray.concat(stackArray.reverse());

}

function splitCalculstionString (str){
    if(typeof str === 'string'){
const validBrackets = [];
let stringNumber ='';
const resultArray = [];
for(let i =0, length = str.length;i<length; i++){
    if(str[i] === ' ') continue;
    if(!isNaN(+str[i])){
        stringNumber += str[i];
        continue;
    }
   if(operations[str[i]] || str[i] ==='(' || str[i] === ')'){
    if(str[i] ==='('){validBrackets.push(str[i])}
    if(str[i] === ')') {
        let bracket = validBrackets.pop();
        if(!bracket) throw new Error('ExpressionError: Brackets must be paired');
    }

       if(stringNumber.length === 0){
        resultArray.push(str[i]);
       }
       else {
        resultArray.push(+stringNumber, str[i]);
        stringNumber ='';
       }
   }
}
if(!isNaN(+stringNumber) && stringNumber !== '') resultArray.push(+stringNumber);
if(validBrackets.length !== 0) throw new Error('ExpressionError: Brackets must be paired');
return resultArray;
    }
    return [];
}




module.exports = {
    expressionCalculator,expressionCalculation, splitCalculstionString, calculationPolish
}