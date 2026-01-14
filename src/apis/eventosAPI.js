import { API_URL } from "@/../config.js";


export default class EventosAPI {

    async getEventos(itens=10,codTipoEvento=null,codSituacao=null){
        try {
            const response = await fetch(`${API_URL}/eventos?itens=${itens}${codTipoEvento? `&codTipoEvento=${codTipoEvento}`:""}${codSituacao? `&codSituacao=${codSituacao}` : ""}`);

            if (!response) throw new Error("Erro na requisição dos eventos");

            const data = await response.json();
            return data.dados;
        }
        catch(error){
            console.error(error.message);
        }
    }

    async getEvento(id){
        try {
            const response = await fetch(`${API_URL}/eventos/${id}`);
            if (!response) throw new Error("Erro na requisição do evento");
            const data = await response.json();
            return data.dados;
        }
        catch (error) {
            console.error(error.message);
        }
    }

}