import { DetalleMatriz } from "./detalle";

export class MatrizCuentas {
    tipoCertificacion:string;
    idBase:number;
        encabezadoMatriz:{
            numCiclos:number,
            segundos:number
        }
        ordenanteMatriz:{
            banco:String,
            tipoCuenta:String,
            cuenta:String,
            nombre:String,
            rfc:String
        }
        detalleMatriz:DetalleMatriz[]
        
}

