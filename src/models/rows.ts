import mongoose, { Schema, Document } from 'mongoose';

interface RowDoc extends Document {
    Latitud: string;
    Longitud: string;
    ID: string;
    Titulo: string;
    Anunciante: string;
    Descripcion: string;
    Reformado: string;
    Telefonos: string;
    Tipo: string;
    Precio: string;
    Direccion: string;
    Provincia: string;
    Ciudad: string;
    Habitaciones: string;
    Baños: string;
    Parking: string;
    Amueblado: string;
    Planta: string;
    Exterior: string;
    Interior: string;
    Ascensor: string;
    Fecha: string;
    Calle: string;
    Barrio: string;
    Distrito: string;
    Terraza: string;
    Trastero: string;
    Piscina: string;
    Jardín: string;
    Plantas: string;
    Balcón: string;
}

interface Row {
    Latitud: string;
    Longitud: string;
    ID: string;
    Titulo: string;
    Anunciante: string;
    Descripcion: string;
    Reformado: string;
    Telefonos: string;
    Tipo: string;
    Precio: string;
    Direccion: string;
    Provincia: string;
    Ciudad: string;
    Habitaciones: string;
    Baños: string;
    Parking: string;
    Amueblado: string;
    Planta: string;
    Exterior: string;
    Interior: string;
    Ascensor: string;
    Fecha: string;
    Calle: string;
    Barrio: string;
    Distrito: string;
    Terraza: string;
    Trastero: string;
    Piscina: string;
    Jardín: string;
    Plantas: string;
    Balcón: string;
}

interface RowModelInterface extends mongoose.Model<RowDoc>{
    build(attr: Row): RowDoc
}

const rowSchema = new mongoose.Schema({
    Latitud: {
        type: String,
        require: true
    },
    Longitud: {
        type: String,
        require: false
    },
    ID: {
        type: String,
        require: false
    },
    Titulo: {
        type: String,
        require: false
    },
    Habitaciones: {
        type: String,
        require: false
    },
    Precio: {
        type: String,
        require: false
    },
    Tipo: {
        type: String,
        require: false
    }
});

rowSchema.statics.build = (attr: Row) => {
    return new RowsSchema(attr);
};

const RowsSchema = mongoose.model<RowDoc, RowModelInterface>('rows', rowSchema);

export { RowsSchema };