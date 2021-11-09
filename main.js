import Inventory from "./inventory.js";
import Product from "./product.js";

class App{
    constructor(){
        this.inventory = new Inventory();
        this.btnAdd = document.getElementById('btnRegister');
        this.btnDlt = document.getElementById('btnDelete');
        this.btnSrch = document.getElementById('btnSrch');
        this.btnList = document.getElementById('btnList');
        this.btnListInver = document.getElementById('btnListInverse');
        this.btnPosition = document.getElementById('btnPosition')

        this.actions = document.getElementById('actions')

        this.btnAdd.addEventListener('click', this.addProduct);
        this.btnDlt.addEventListener('click', this.deleteProduct);
        this.btnList.addEventListener('click', this.listProducts);
        this.btnListInver.addEventListener('click', this.listInverse);
        this.btnSrch.addEventListener('click', this.searchProduct);
    }

    addProduct = () => {
        let product = this._createProduct();

        if(!product){
            this.actions.innerHTML = "";
            return this.actions.innerHTML += 'No se registró el producto. Todos los campos son requeridos.';
        }

        let added = this.inventory.add(product);

        if(!added){
            this.actions.innerHTML = "";
            return this.actions.innerHTML = "No se registró el producto. Producto ya registrado.";
        }

        this.actions.innerHTML = "";
        console.log(this.inventory);
        return this.actions.innerHTML = `Se agrego nuevo producto. El producto ${product.getCode()} fue registrado con éxito.`;
    }

    deleteProduct = () => {
        let inpCode = document.getElementById('insertCode');
        let code = inpCode.value;

        let deleteProduct = this.inventory.delete(code);


        if(!code){
            this.actions.innerHTML = "";
            return this.actions.innerHTML += 'No se ha borrado ningún producto. Ingrese un código de producto';
        } else if(!deleteProduct){
            inpCode.value = "";
            this.actions.innerHTML = "";
            return this.actions.innerHTML += 'Null';
        } else {
            inpCode.value = "";
            deleteProduct;
            this.actions.innerHTML = "";

            return this.actions.innerHTML += `El producto ${code} ha sido eliminado exitosamente.`;
        }
    }

    listProducts = () => {
        let temp = this.inventory.inicio;
        let table = document.getElementById('table');
        this._cleaTable();
        this.actions.innerHTML = "";

        if(!this.inventory.inicio){
            this.actions.innerHTML = "";
            return this.actions.innerHTML += `No hay ningún producto registrado`;
        } else {
            while(temp != null){

                let row = table.insertRow(-1);
                let colCode = row.insertCell(0);
                let colName = row.insertCell(1);
                let colAmount = row.insertCell(2);
                let colCost = row.insertCell(3);
                let colTotalCost = row.insertCell(4);

                row.setAttribute('id', `row${temp.code}`);
                colCode.setAttribute('id', `colCode${temp.code}`);
                colName.setAttribute('id', `colName${temp.code}`);
                colAmount.setAttribute('id', `colAmount${temp.code}`);
                colCost.setAttribute('id', `colCost${temp.code}`);
                colTotalCost.setAttribute('id', `colTotalCost${temp.code}`);

                colCode.innerHTML = temp.code;
                colName.innerHTML = temp.name;
                colAmount.innerHTML = temp.amount;
                colCost.innerHTML = "$" + temp.cost;
                colTotalCost.innerHTML =  `$${temp.getTotalCost()}`;

                temp = temp.siguiente;
            }
            this.actions.innerHTML += `Se muestra la tabla.`;
        }
    }

    listInverse = () => {
        let temp = this.inventory.inicio;
        let table = document.getElementById('table');
        this._cleaTable();
        this.actions.innerHTML = "";

        if(!this.inventory.inicio){
            this.actions.innerHTML = "";
            return this.actions.innerHTML += `No hay ningún producto registrado`;
        } else {
            while(temp != null){

                let row = table.insertRow(1);
                let colCode = row.insertCell(0);
                let colName = row.insertCell(1);
                let colAmount = row.insertCell(2);
                let colCost = row.insertCell(3);
                let colTotalCost = row.insertCell(4);

                row.setAttribute('id', `row${temp.code}`);
                colCode.setAttribute('id', `colCode${temp.code}`);
                colName.setAttribute('id', `colName${temp.code}`);
                colAmount.setAttribute('id', `colAmount${temp.code}`);
                colCost.setAttribute('id', `colCost${temp.code}`);
                colTotalCost.setAttribute('id', `colTotalCost${temp.code}`);

                colCode.innerHTML = temp.code;
                colName.innerHTML = temp.name;
                colAmount.innerHTML = temp.amount;
                colCost.innerHTML = "$" + temp.cost;
                colTotalCost.innerHTML =  `$${temp.getTotalCost()}`;

                temp = temp.siguiente;
            }
            this.actions.innerHTML += `Se muestra la tabla invertida.`; 
        }
    }
    searchProduct = () => {
        let inpCode = document.getElementById('insertCodeSearch');
        let code = inpCode.value;
        let searchProduct = this.inventory.search(code);

        if(!code){
            this.actions.innerHTML = "";
            return this.actions.innerHTML += 'Ingrese un código de producto';
        } else if(!searchProduct){
            inpCode.value = "";
            this.actions.innerHTML = "";
            return this.actions.innerHTML += `No se encontró ningún producto con ese código.`;
        } else {
            inpCode.value = "";
            this.actions.innerHTML = "";
            this.actions.innerHTML += searchProduct.infoHtml();
        }
    }

    //Private
    _createProduct() {
        let inpCode = document.querySelector('#txtCode');
        let inpName = document.querySelector('#txtName');
        let inpAmount = document.querySelector('#txtAmount');
        let inpCost = document.querySelector('#txtCost');

        let code = inpCode.value;
        let name = inpName.value;
        let amount = inpAmount.value;
        let cost = inpCost.value;

        if(code && name && amount && cost){
            inpCode.value = '';
            inpName.value = '';
            inpAmount.value = '';
            inpCost.value = '';

            return new Product(code, name, amount, cost);
        }

        return null;
    }

    _cleaTable(){
        let table = document.getElementById('table');
        table.innerHTML = '<tr><th>Código</th><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Precio Total</th></tr>'
    }

}

new App();