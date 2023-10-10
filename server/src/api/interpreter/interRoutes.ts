import express from "express";
import { QCObject, QCResponseObject } from "../interfaces";
import { QCObjectSchema } from "../schema";
// TODO import interpeter files
const router = express.Router();


router.get('/test', /*async*/ (req, res) => {
    // TODO const response = await interpreter.interpret(req.body)
    res.status(200).json({message: 'SEXOOOO'});
});

router.post('/interpret', /*async*/ (req, res) => {
    const { error, value } = QCObjectSchema.validate(req.body);
    if (error){
        res.status(400).send('Invalid JSON structure');
        return;
    }

    const qcObj = value as QCObject;

    // TODO add return logic here
    /*
     * const response: QCResponseObject = await parseFile(qcObj)
     */

    res.status(200).json({message: "accepted"})
});



export { router };
