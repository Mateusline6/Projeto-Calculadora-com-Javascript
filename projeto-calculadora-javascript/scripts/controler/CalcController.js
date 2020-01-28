class CalcController {

    constructor() {
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {

        this.setDisplayDateTime();

        setInterval(() => {

            this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
                day: "2-digit",
                month: "long",
                year: "numeric"

            });

            this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
        }, 1000);

        //So teste
        /*setTimeout(()=>{

            clearInterval(internal);

        }, 10000);*/

    }

    // metodo de click 
    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);
        });

    }


    //-------------------------------------------------------------------------------------

    clearALL() {

        this._operation = [];
    }
    clearEntry() {

        this._operation.pop();
    }
    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;

    }

    isOperator(value) {
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);

    }

    pushOperation(value) {

        this._operation.push(value);

        if (this._operation.length > 3) {

            this.Calc();

        }
    }

    Calc() {

        let last = this._operation.pop();
        let result = eval(this._operation.join(""));
        this._operation = [result, last];
        this.setLastNumberToDisplay();

    }

    setLastNumberToDisplay(){
        let lastNumber;

        for(let i = this._operation.length-1; i >= 0; i--){

            if(!this.isOperator(this._operation[i])){

                lastNumber = this._operation[i];
                break;
            }

        }
            this.displayCalc = lastNumber;
    }



// add nova operação 
    addOperation(value) {
        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {

                this.setLastOperation(value);
            }
            else if (isNaN(value)) {

            } else {

                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }

        } else {

            if (this.isOperator(value)) {
                this.pushOperation(value);
            }

            // modificando o numero 
            else {
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                this.setLastNumberToDisplay();

            }

        }
    }
    setError() {

        this.displayCalc = "ERROR";
    }

    // ------------------------------------------------------------------------------------

    execBtn(value) {

        switch (value) {
            case 'ac':
                this.clearALL();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                this.addOperation('+');
                break;

            case 'subtracao':
                this.addOperation('-');
                break;

            case 'divisao':
                this.addOperation('/');
                break;

            case 'multiplicacao':
                this.addOperation('*');
                break;

            case 'porcento':
                this.addOperation('%');
                break;

            case 'igual':

                break;

            case 'ponto':
                this.addOperation('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;

        }

    }

    // --------------------------------------------------------------------------


    initButtonsEvents() {

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        // fazendo uma verificação em todos os Buttons da DOM.
        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, "click drag", e => {

                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(textBtn);

            });



            // mundando o cursor para uma mãozinha.
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {

                btn.style.cursor = "pointer";

            });

        });
    }

    //---------------------------------------------------------------------------------------


    // metodo para set a data e a hora. no display 
    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }
    get displayTime() {

        return this._timeEl.innerHTML;

    }

    set displayTime(value) {

        return this._timeEl.innerHTML = value;
    }


    get displayDate() {

        return this._dateEl.innerHTML;

    }
    set displayDate(value) {

        return this._dateEl.innerHTML = value;

    }


    get displayCalc() {

        return this._displayCalcEl.innerHTML;


    }

    set displayCalc(value) {

        this._displayCalcEl.innerHTML = value;

    }

    get currentDate() {

        return new Date();

    }

    set currentDate(data) {

        this._currentDate = data;

    }

}

