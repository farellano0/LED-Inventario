export default class Inventory {

    constructor(){
        this.inicio = null;
        this.length = 0;
    }

    add(nuevo){
        if(this.length < 20){
            if(this.inicio == null){
                this.inicio = nuevo;
                this.length++;
                return this.inicio;
            } else if(this.search(nuevo.getCode())){
                return null;
            } else {
                this._add(nuevo, this.inicio);
                this.length++
                return this.inicio;
            }
        }
    }

    _add(nuevo, ultimo) {
        if(nuevo.code < ultimo.code){
            let aux = ultimo;
            let an = ultimo.anterior;

            if(ultimo.anterior != null){
                ultimo.anterior.siguiente = nuevo;
            }

            ultimo = nuevo;
            ultimo.siguiente = aux;
            ultimo.anterior = an;
            ultimo.siguiente.anterior = ultimo;

            if(ultimo.code < this.inicio.code){
                this.inicio = ultimo;
            }
        } else if(ultimo.siguiente == null){
            ultimo.siguiente = nuevo;
            nuevo.anterior = ultimo
        } else {
            this._add(nuevo, ultimo.siguiente);
        }
    }
    
    search(codigo){
        if(!this.inicio){
            return null;
        }
        
        let aux = this.inicio;

        while(aux != null){
            if(aux.getCode() == codigo){
                return aux;
            }
            aux = aux.siguiente;
        }

        return null;
    }

    delete(codigo){
        let eliminado = null;

        if(!this.inicio){
            return null;
        }
        if(this.inicio.code == codigo){
            eliminado = this.inicio;
            this.inicio = this.inicio.siguiente;
            this.inicio.anterior = null;
            this.length --;
            return eliminado;
        } else {
            let an = this.inicio;
            let ac = this.inicio.siguiente;
            let sig = ac.siguiente;

            while(ac != null){
                if(ac.code == codigo){
                    eliminado = ac;
                    an.siguiente = ac.siguiente;
                    sig.anterior = an;
                    eliminado.siguiente = null;
                    this.length --;
                    return eliminado;
                } else {
                    an = ac;
                    ac = ac.siguiente;
                    if(sig.siguiente != null){
                        sig = sig.siguiente;
                    }
                }
            }
        }
        return eliminado;
    }
}