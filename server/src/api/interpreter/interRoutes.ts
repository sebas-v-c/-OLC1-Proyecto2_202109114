import express from "express";
import { QCObject, isQCObject } from "../interfaces";
// TODO import interpeter files
const router = express.Router();


router.get('/test', /*async*/ (req, res) => {
    // TODO const response = await interpreter.interpret(req.body)
    res.status(200).json({message: 'OK'});
});

router.post('/interpret', /*async*/ (req, res) => {
    if (!isQCObject(req.body)){
        res.status(400).send('Invalid JSON structure');
        return;
    }

    const qcObj = req.body as QCObject;

    // TODO add return logic here
    /*
     * const response: QCResponseObject = await parseFile(qcObj)
     */

    res.status(200).json({message: "accpeted"})
});

router.get('/interpret', /*async*/ (req, res) => {
    if (!isQCObject(req.body)){
        res.status(400).send('Invalid JSON structure');
        return;
    }

    // TODO add return logic here

});


export { router };
