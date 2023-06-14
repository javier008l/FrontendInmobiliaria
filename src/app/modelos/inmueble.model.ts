export class InmuebleModel {
    id?: number;
    direccion?: string;
    costo?: number;
    foto?: string;
    foto1?: string;
    foto2?: string;
    foto3?: string;
    tipoInmuebleId?: number;
    ciudadId?: number;
    paraVenta?: boolean;
    paraAlquiler?: boolean;
    correoAsesor?: string;
    fecha?: Date;
}