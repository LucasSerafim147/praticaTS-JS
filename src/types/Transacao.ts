import { TipoTransacao } from "./TipoTransacao.js";



export type Transacao ={
    transacao: TipoTransacao;
    nome:string;
    valor:number;
    quantidade:number
}