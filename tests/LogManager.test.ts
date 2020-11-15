import { LogManager } from '../src/libraries/LogManager.ts';

test("Test Method 'readFile'", async()=>{
    let logManager = new LogManager();
    await logManager.readFile()
    .then((result)=>{
        let resultTest = true;
        if(result === false || (!Array.isArray(result))){
            resultTest = false;
        }
        expect(resultTest).toBe(true);
    })
})

test("Test Method 'writeFile'", async()=>{
    let logManager = new LogManager();
    let writeData = [{"projecao":212383591,"data_projecao":"2020-11-17T11:00:50.000Z","data_pesquisa":"2020-11-15T16:28:01.000Z"}];
    await logManager.writeFile(writeData)
    .then((result)=>{
        expect(result).toBe(true);
    })
})

test("Test Method 'getLogs'", async()=>{
    let logManager = new LogManager();
    await logManager.getLogs()
    .then((result)=>{
        let resultTest = true;
        if(result === false || (!Array.isArray(result))){
            resultTest = false;
        }
        expect(resultTest).toBe(true);
    })
})