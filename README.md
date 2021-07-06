# node-interview

-- Para iniciar el comando es 
    npm start

-- Lista de endpoints
    Cargar la informacion en la base de datos
     > GET http://localhost:3000/loadData

    2. Filtrar data. (Para consultar por rango de precio y numero de habitacion)
     > GET http://localhost:3000/findRangePriceAndNumRooms?minPrice=700&maxPrice=800&numRoom=2

    4. Reportes data. (Para generar el reporte en PDF o CSV)
     > http://localhost:3000/createReport?latitud=40.365843&longitud=-3.5884521&tipo=CSV


-- El archivo con la informacion se encuentra en la carpeta "assets"

-- Los reportes en PDF se almacenan en la ruta "src/reports/pdf

-- Los reportes en CSV se almacenan en la ruta "src/reports/csv