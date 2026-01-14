import { API_URL } from "@/../config.js";


export default class DeputadosAPI{

    async getDeputados({itens=null,nome=null, partido=null}){
        try {
            const response = await fetch(`${API_URL}/deputados?${itens? `itens=${itens}`: ""}${nome? `&nome=${nome}` : ""}${partido?`&siglaPartido=${partido}`:''}`)
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

            const response = await fetch(`${API_URL}/deputados/${id}`);
            if (!response.ok) throw new Error('Erro na requisição do deputado');

            const data = await response.json();

            return data.dados;
        }
        catch(error){
            console.error(error);
        }
    }

}
