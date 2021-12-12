import express, { Request, Response } from "express";
import { Collection } from "mongodb";
import { client } from "./database/connect";
import bodyParser, { BodyParser } from "body-parser";

const app = express();
const port = 4000;

app.use(bodyParser.json());

const dbName = "skytale";

app.get('/get/prs/', async(req: Request, res: Response) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("pull_requests");
        const result = await collection.find({}).toArray();
        res.json(result);

    } catch(error) {
        res.json({"message": "something went wrong with the connection..."});
    }
    
   
});

app.post("/post/prs/", async(req: Request, res: Response) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('pull_requests');
        const body = {
            no: req.body.no,
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            status: req.body.status,
            labels: req.body.labels,
            date: req.body.date
        }
        const result = await collection.insertOne(body);
        res.send(result);
    } catch (error) {
        res.send(error);
    }

});

app.post("/filter/status/", async(req: Request, res: Response) => {
    const status = req.body.status;
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('pull_requests');
        let result;
        if (status === "All") {
            result = await collection.find({}).toArray();
        } else {
            result = await collection.find({
                status
            }).toArray();
        }
        
        res.json(result);
    } catch (error) {
        res.json({"message": "something went wrong with the connection..."});
    }
});

app.post("/filter/label/", async(req: Request, res: Response) => {
    const label = req.body.label;
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('pull_requests');
        const result = await collection.find({
            labels: { "$all" : [label] }
        }).toArray();
        console.log(result);
        res.json(result);
    } catch (error) {
        res.json({"message": "something went wrong with the connection..."});
    }
});

app.listen(port, () => {console.log(`server is listening at http://localhost:${port}`)});