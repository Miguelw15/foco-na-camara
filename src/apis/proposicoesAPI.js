import { API_URL } from "@/../config.js";


export default class ProposicoesAPI{

    async getPropsFromKeyword(keyword) {
        try {
            const getProps = await fetch(`${API_URL}/proposicoes?keywords=${keyword}`);
            if (!getProps.ok) throw new Error("Erro na requisição de proposições com palavra chave");

            const props = await getProps.json();
            return props.dados;
        }
        catch(error) {
            console.error(error.message);
        }
    }
    async getPropsRelated(idProposicao, qtd=10){
        try {

            const getProps = await fetch(`${API_URL}/proposicoes/${idProposicao}/relacionadas`);
            if (!getProps.ok) throw new Error('Erro na requisição de proposições relacionadas');

            const props = await getProps.json();
            props.dados = props.dados.slice(0,qtd)
            
            return props;
            
        }
        catch(error){
            console.error(error.message)
        }
    }

    async getPropsInDate(quantidadeDeProps, typeProps, dataInicio, dataFim) {
        try {

            
            const query = typeProps.map(t => `siglaTipo=${t}`).join("&");
            const url = `${API_URL}/proposicoes?${query}&ordenarPor=ano&ordem=DESC${quantidadeDeProps ? `&itens=${quantidadeDeProps}` : ''}${dataInicio ? `&dataInicio=${dataInicio}` : ''}${dataFim ? `&dataFim=${dataFim}` : ''}`;
            const getProps = await fetch(url);
            
            if (!getProps.ok) throw new Error('Erro na requisição das proposições');

            const dataProp = await getProps.json();

            const data = await Promise.all(
            dataProp.dados.map(async (element) => {
                const response = await fetch(element.uri);
                const prop = await response.json();
                return prop;
            })
            );

            return data;

        } catch (error) {
            console.error(error.message);
        }
    }


    async getTemas(idProposicao){
        try {
            const themeResponse = await fetch(`${API_URL}/proposicoes/${idProposicao}/temas`);
            
            if (!themeResponse.ok) throw new Error('Erro na requisição do tema');

            const themeJson = themeResponse.json();

            return themeJson;
        }
        catch(error) {
            console.error(error.message);
        }
    }

    async getAuthors(idProposicao){
        try {
            const authorResponse = await fetch(`${API_URL}/proposicoes/${idProposicao}/autores`);

            if (!authorResponse.ok) throw new Error('Erro na requisição do(s) autor(res) da proposição');

            const authorJson = await authorResponse.json();

            return authorJson;
        }
        catch(error) {
            console.error(error.message);
        }
    }

    async getProp(idProposicao) {
        try {
            const propResponse = await fetch(`${API_URL}/proposicoes/${idProposicao}`);
            
            if (!propResponse.ok) throw new Error('Erro na requisição da proposição');

            const propJson = await propResponse.json();
            return propJson.dados;
        }
        catch(error){
            console.error(error.message,idProposicao);
        }
    }

    async getState(idProposicao){
        try {
            const tramResponse = await fetch(`${API_URL}/proposicoes/${idProposicao}/tramitacoes`,{signal:this.signal});
            if (!tramResponse.ok) throw new Error('Erro na requisição do estado de tramitação');

            const tramJson = await tramResponse.json();
            const state = tramJson.dados[tramJson.dados.length-1];
            
            return state;
        }
        catch(error) {
            console.error(error.message);
        }
    }
    
}