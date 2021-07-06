import express, { Request, Response } from 'express';
const pdf = require("pdf-creator-node");
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

import { RowsSchema } from '../models/rows';

const router = express.Router();

router.get('/loadData', [], (req: Request, res: Response) => {
    fs.createReadStream('assets/resource_accommodation.csv')
        .pipe(csv())
        .on('data', async (row: any) => {
            const data = RowsSchema.build(row);
            await data.save();
        })
        .on('end', () => {
            console.log('Archivo procesado');
        });
    return res.send('información cargada');
});

router.get('/findRangePriceAndNumRooms', [], async (req: Request, res: Response) => {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const numRoom = req.query.numRoom;

    let filters: any = {
        "Habitaciones": numRoom,
        "Precio": { "$lte": maxPrice, "$gte": minPrice }
    }

    const data = await RowsSchema.find(filters);

    return res.send(data);
});

router.get('/createReport', [], async (req: Request, res: Response) => {
    const latitud = req.query.latitud;
    const longitud = req.query.longitud;
    const tipo = req.query.tipo;

    let filters: any = {
        "Latitud": latitud,
        "Longitud": longitud
    }

    const data = await RowsSchema.find(filters).lean();

    if (tipo == 'PDF') {

        // Read HTML Template
        var html = fs.readFileSync("src/reports/view-pdf.html", "utf8");

        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "45mm",
                contents: '<div style="text-align: center;">Author: Javier Moreno</div>'
            },
            footer: {
                height: "28mm",
                contents: {
                    first: 'Cover page',
                    2: 'Second page', // Any page number is working. 1-based index
                    default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                    last: 'Last Page'
                }
            }
        };

        var document = {
            html: html,
            data: {
                rows: data,
            },
            path: "src/reports/pdf/" + new Date() + ".pdf",
            type: "",
        };

        pdf.create(document, options)
            .then((res: any) => {
                res.send(res);
            })
            .catch((error: any) => {
                return res.send(error);
            });
    } else if (tipo == 'CSV') {
        const csvWriter = createCsvWriter({
            path: "src/reports/csv/" + new Date() + ".csv",
            header: [
                { id: 'Latitud', title: 'Latitud' },
                { id: 'Longitud', title: 'Longitud' },
                { id: 'ID', title: 'ID' },
                { id: 'Titulo', title: 'Titulo' },
                { id: 'Tipo', title: 'Tipo' },
                { id: 'Precio', title: 'Precio' },
                { id: 'Habitaciones', title: 'Habitaciones' },
            ]
        });

        csvWriter.writeRecords(data).then(() => {
            return res.send('reporte generado');
        });
    }
});



export { router as Router };