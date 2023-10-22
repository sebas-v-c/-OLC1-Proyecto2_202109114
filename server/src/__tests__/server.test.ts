import { describe, expect, test } from '@jest/globals';
import app from "../api/server";
import supertest from 'supertest';

const request = supertest(app);
//const req = request('http://localhost:5000/');

describe("Api Test QueryCrypter", function() {
    it("Testing API under /api/interpreter/test", async function(){
        const res = await request.get('/api/interpreter/test');

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("OK");
    });

    it("POST to API under /api/interpreter/interpret", async function() {
        const res = await request.post('/api/interpreter/interpret').send({
            name: "Main.qc",
            content: "SELECT * FROM table1 WHERE name = \"HOLA\""
        });

        expect(res.body.message).toBe("accepted");
    })
});
