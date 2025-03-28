import { TipoTransacao } from "./TipoTransacao";



export type Transacao ={
    transacao: TipoTransacao;
    nome:string;
    valor:number;
    quantidade:number
}