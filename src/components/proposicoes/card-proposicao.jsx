import LinesEllipsis from "react-lines-ellipsis";
import "../../styles/proposicoes.css";
import { useNavigate } from "react-router-dom";

export default function CardProposicao({data}) {
    const navigate = useNavigate();
    return (
            <div id={data?.id} className="card-prop">
                <div className="card-prop-tittle">
                    {`${data?.siglaTipo} ${data?.numero}/${data?.ano}`}
                </div>

                <div className="card-prop-ementa">
                    <LinesEllipsis text={data?.ementa} maxLine="3"/>
                </div>

                <div className="card-prop-data">
                    <LinesEllipsis text={[
                    data?.statusProposicao?.descricaoSituacao,
                    data?.statusProposicao?.descricaoTramitacao
                    ].filter(Boolean).join(" - ")}
                    maxLine="1">
                    </LinesEllipsis>
                </div>

                <div className="card-prop-last-row">
                    <p>{`${data?.statusProposicao?.dataHora?.split("T")[0].replaceAll('-', '/')} - ${data?.statusProposicao?.dataHora?.split("T")[1]}`}</p>
                    <button onClick={() => navigate(`/proposicoes/${data?.id}`)} className="view-more">
                        VER MAIS
                    </button>
                </div>
 
            </div>
                
    );
}

