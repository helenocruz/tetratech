import 'jest'
import request from 'supertest';

beforeEach(async () => {
    jest.setTimeout(10000)
});

describe("Test API Routers", ()=>{
    test("Test EndPoint '/logs'", async() => {
        await request('http://localhost:8080')
        .get('/logs')
        .then((respose)=>{
            expect(respose.status).toBe(200);
        })
        .catch((error)=>{
            expect(error.respose).toBe(200);
        })
    });
    
    test("Test EndPoint '/consult'", async() => {
        await request('http://localhost:8080')
        .get('/consult')
        .then((respose)=>{
            expect(respose.status).toBe(200);
        })
        .catch((error)=>{
            expect(error.respose).toBe(200);
        })
    });
});
