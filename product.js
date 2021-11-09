export default class Product {
    constructor(code, name, amount, cost){
       this.code  = code;
       this.name = name.toUpperCase();
       this.amount = amount;
       this.cost = cost;
       this.siguiente = null;
       this.anterior = null;
    }

    //Lectura

    getCode(){
        return Number(this.code);
    }

    getName(){
        return this.name;
    }

    getAmount(){
        return this.amount;
    }

    getCost(){
        return this.cost;
    }

    getTotalCost(){
        return this.amount * this.cost;
    }

    //Escritura

    setCode(code){
        this.code = code;
        return this.code;
    }

    setName(name){
        this.name = name;
        return this.name;
    }

    setAmount(amount){
        this.amount = amount;
        return this.amount;
    }

    setCost(cost){
        this.cost = cost;
        return this.cost;
    }

    infoHtml(){
        return `<div>
                    <p>Código: ${this.getCode()}</p>
                    <p>Nombre: ${this.getName()}</p>
                    <p>Cantidad: ${this.getAmount()}</p>
                    <p>Costo Individual: $${this.getCost()}</p>
                    <p>Costo Total: $${this.getTotalCost()}</p>
                </div>`;
    }
}