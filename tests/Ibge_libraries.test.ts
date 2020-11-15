import 'jest'
import { Ibge } from '../src/libraries/Ibge.ts';

beforeEach(async () => {
    jest.setTimeout(10000)
});

test("Test Method 'calcProjecaoPopulacional'", async()=>{
    let ibge = new Ibge();
    let value_1 = ibge.calcProjecaoPopulacional(1,1,1)
    let value_2 = ibge.calcProjecaoPopulacional(1,1,0)
    expect(value_1).toBe(2);
    expect(value_2).toBe(false);
})

test("Test Method 'getDataIbge'", async()=>{
    let ibge = new Ibge();
    await ibge.getDataIbge()
    .then((result)=>{
        expect(result.localidade).toBe("BR");
    })
})

test("Test Method 'getProjecaoPopulacional'", async()=>{
    let ibge = new Ibge();
    await ibge.getProjecaoPopulacional()
    .then((result)=>{
        expect(result.status).toBe(200);
    })
})