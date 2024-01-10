export class listaEscenario{

    idEscenario: number
    idRelacion: number
    nombreEscenario: string
    envios: {
        nombre: string
    }
    ordenanteResponse: {
        idOrdenante: number,
        banco: string,
        tipoCuenta: string,
        cuenta: string,
        nombre: string,
        rfc: string
    }
    beneficiarioResponse: {
        idBeneficiario: number,
        banco: string,
        tipoCuenta: string,
        cuenta: string,
        nombre: string,
        rfc: string,
        modulo: null
    }
    detalleOrdenResponse: {
        cantidad: number,
        tipoPago: string,
        monto: number,
        concepto: string,
        modulo: null,
        segundos: number,
        registro: true,
        ampliado: true,
        firmador: true,
        id_Escenario: number,
        id_Cert: number,
        idDetalle: number,
        certificacion: false
    }
    dataSourceResponse: {
        id: number,
        ip: string,
        puerto: string,
        base: string,
        usuario: null,
        pass: null,
        descripcion: string,
        clave: string,
        estado: number
    }
    firmadorResponse: {
        id: number,
        ip: string,
        puerto: string,
        usuario: null,
        pass: null,
        descripcion: string
    }

}