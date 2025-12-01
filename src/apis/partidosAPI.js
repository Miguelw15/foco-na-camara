import { API_URL } from "../../config";

export default class PartidosAPI{    
    constructor(){
        this.controller = null;
        this.signal = null;
    }

    __setupController(){
        if (this.controller) {
            this.controller.abort();
        }

        this.controller = new AbortController();
        this.signal = this.controller.signal;
    }

    async getPartidos(){
        try {

            this.__setupController();
            const response = await fetch(`${API_URL}/partidos?itens=30`,{signal:this.signal});

            if (!response.ok) throw new Error('Erro na requisição dos partidos');

            const partidos = await response.json()

            const partidosDetails = Promise.all(partidos.dados.map(async (element)=>{
                const responseDetails = await fetch(`${API_URL}/partidos/${element.id}`);
                return await responseDetails.json()
            }))
            
            return partidosDetails;
        }
        catch(error){
            console.error(error.message)
        }
    }

    async getPartido(id){
        try {
            this.__setupController();
            const response = await fetch(`${API_URL}/partidos/${id}`,{signal:this.signal});

            if (!response.ok) throw new Error("Erro na requisição do partido");

            return response.json()
        }
        catch(error) {
            console.error(error.message)
        }
    }
}