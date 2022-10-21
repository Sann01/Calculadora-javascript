let previousOpText = document.querySelector("#previous-op");
let currentOpText = document.querySelector("#current-op");
let buttons = document.querySelectorAll("#buttons-container button");

class calculator{
    constructor(previousOpText,currentOpText){
        this.previousOpText=previousOpText
        this.currentOpText=currentOpText
        this.currentOp = ""
    }
    addDigit(digit){
        if(digit === "." && currentOpText.innerText.includes(".")){
            return ;
        }
       this.currentOp = digit;
       this.updatescreen()
    }
    processOp(operation){

        if(this.currentOpText.innerText === "" && operation !== "C"){
            if(this.previousOpText.innerText !== ""){
                this.changeoperation(operation);
            }return;
        }

         let opvalue;
         let previous = +this.previousOpText.innerText.split(" ")[0];
         let current = +this.currentOpText.innerText;

         switch(operation){
            case "+":
                opvalue = previous + current
                this.updatescreen(opvalue, operation, current, previous);
            break;
            case "-":
                opvalue = previous - current
                this.updatescreen(opvalue, operation, current, previous);
            break;
            case "*":
                opvalue = previous * current
                this.updatescreen(opvalue, operation, current, previous);
            break;
            case "/":
                opvalue = previous /  current
                this.updatescreen(opvalue, operation, current, previous);
            break;
            case "DEL":
                this.processDelOperator();
            break;
            case "CE":
                this.processClearCurrentOperation();
            break;
            case "C":
                this.processClearOperation();
            break;
            case "=":
                this.processEqualOperator();
            break;
            default:
                return;
        }
    }
    updatescreen(opvalue = null, operation = null,current = null, previous = null){
        
        if(opvalue === null){
            this.currentOpText.innerText += this.currentOp;
        }else{
            if(previous === 0){
                opvalue = current
            }
            this.previousOpText.innerText = `${opvalue} ${operation}`
            this.currentOpText.innerText = "";
        }
    }
    changeoperation(operation){
        let mathOp = ["+", "-", "*", "/"]
        if(!mathOp.includes(operation)){
            return
        }
        this.previousOpText.innerText = this.previousOpText.innerText.slice(0, -1) + operation; 
    }

    processDelOperator(){
        this.currentOpText.innerText =this.currentOpText.innerText.slice(0, -1)
    }
    processClearCurrentOperation(){
        this.currentOpText.innerText = "";
    }
    processClearOperation(){
        this.currentOpText.innerText = "";
        this.previousOpText.innerText = "";
    }

    processEqualOperator(){
        let operation = previousOpText.innerText.split(" ")[1]
        this.processOp(operation)
    }
}

let calcular = new calculator(previousOpText,currentOpText);
buttons.forEach((btn) =>{
    btn.addEventListener("click",(e) => {
        let value = e.target.innerText;
        if(+value>=0 || value === "."){
            calcular.addDigit(value);
        }else{
            calcular.processOp(value);
        }
    });
});

