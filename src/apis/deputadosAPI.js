import { API_URL } from "@/../config";


export default class DeputadosAPI{
    constructor(){
        this.controler = null;
        this.signal = null;
    }

    _setupController(){
        if (this.controler) this.controler.abort();
        this.controler = new AbortController();
        this.signal = this.controler.signal;
        console.log(API_URL)
    }

    async getDeputados(itens=15, partido=null){
        try {
            this._setupController();
            const response = await fetch(`${API_URL}/deputados?itens=${itens}&${partido?`siglaPartido=${partido}`:''}`,{signal:this.signal})
            if (!response.ok) throw new Error('Erro na requisição dos deputados');

            const data = await response.json();

            return data.dados;
        }

        catch(error){
            console.error(error.message);
        }
    }

    async getDeputado(id){
        try {

            this._setupController();

            console.log(id)

            const response = await fetch(`${API_URL}/deputados/${id}`,{signal:this.signal});
            if (!response.ok) throw new Error('Erro na requisição do deputado');

            const data = await response.json();

            return data.dados;
        }
        catch(error){
            console.error(error.message);
        }
    }

}
