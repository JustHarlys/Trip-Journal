import express from 'express';
import bodyParser from 'body-parser';
import sql from 'mssql';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173'
}));

const dbConfig = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    server: process.env.DATABASE_SERVER,
    database: process.env.DATABASE,
    options: {
        trustServerCertificate: true,
        enableArithAbort: true,
    }
};

sql.connect(dbConfig, (err) => {
    if (err) {
        console.log('Error conecting to the database', err)
        return;
    }
    console.log('Connected to database')
});

app.post('/saveTrip', async(req, res) => {
    const { title, location, startDate, endDate, description, img} = req.body;
    const query = 'INSERT INTO trips (title, location, startDate, endDate, description, img) VALUES (@title, @location, @startDate, @endDate, @description, @img)';

    try {
        const request = new sql.Request();
        request.input('title', sql.VarChar, title)
        request.input('location', sql.VarChar, location)
        request.input('startDate', sql.VarChar, startDate)
        request.input('endDate', sql.VarChar, endDate)
        request.input('description', sql.VarChar, description)
        request.input('img', sql.VarChar, img)

        await request.query(query);
        res.send('Trip Data Inserted');
    } catch (err) {
        console.log('SQL Error', err);
        res.status(500).send('Error inserting data')
    }
});

app.get('/getTrip', async(req, res) => {
    try {
        const result = await sql.query`SELECT * FROM trips`;
        res.json(result.recordset);
    } catch(err) {
        console.log('SQL Error', err);
        res.status(500).send('Error Fetching Data');
    }
});

app.put('/updateTrip/:id', async (req, res) => {
    const { id } = req.params;
    const { title, location, startDate, endDate, description, img} = req.body;
    const query = 'UPDATE trips SET title = @title, location = @location, startDate = @startDate, endDate = @endDate, description = @description, img = @img';

    try {
        const request = new sql.Request();
        request.input('id', sql.Int, id)
        request.input('title', sql.NChar, title)
        request.input('location', sql.NChar, location)
        request.input('startDate', sql.NChar, startDate)
        request.input('endDate', sql.NChar, endDate)
        request.input('description', sql.NChar, description)
        request.input('img', sql.NChar, img)

        await request.query(query)
        res.send('Trip Data Updated')
    } catch (err) {
        console.log('SQL Error', err)
        res.status(500).send('Error Updating Data')
    } 
});

app.delete('/deleteTrip/:id', async(req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM trips where id = @id';

    try {
        const request = new sql.Request();
        request.input('id', sql.Int, id);

        await request.query(query);
        res.send('Trip Data Deleted');
    } catch (err) {
        console.log('SQL Error', err);
        res.status(500).send('Error Deleting Data')
    }
});

app.listen(port, ()=> {
    console.log(`Server running on port: ${port}`)
})