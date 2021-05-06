require('dotenv').config(); 
//const { rejects } = require('assert');
const fs = require('fs'); 
const moment = require("moment");
const {Builder, By, Key, until} = require('selenium-webdriver'); 
const { get } = require('selenium-webdriver/http');

const express = require("express");
const app = express();
var cors = require('cors');

app.use(express.json());
app.use(cors());

let data = [];

const GetDateFormat = (date) => { 
    var month = (date.getMonth() + 1).toString();
    month = month.length > 1 ? month: '0' + month; 
    var day = date.getDate().toString(); 
    day = day.length > 1 ? day : '0' + day; 
    return month + '/' + day + '/' + date.getFullYear(); 
}

const minDate = (date) => {
    let newDate = moment(date, "YYYY-MM-DD");
    newDate = newDate.subtract(2,'days').format("YYYY-MM-DD") 
    return newDate;
}

const maxDate = (date) => {
    let newDate = moment(date, "YYYY-MM-DD");
    newDate = newDate.add(3,'days').format("YYYY-MM-DD") 
    return newDate;
}

var dateObj = new Date(); 
var dateFormat = GetDateFormat(dateObj); // 07/05/2016 
let driver = new Builder().forBrowser('chrome').build(); 

const getIntoBdP = async (date, response) => {
    await driver.get("https://www.intermatico.com/ebanking/seguridad/login.htm").then( async () => {
        await driver.findElement(By.id("username")).sendKeys(`${process.env.BDP_USER}\n`).then(async () => {
            await driver.findElement(By.id("password")).sendKeys(`${process.env.BDP_USER_PASSWORD}\n`).then(async () => { 
                await driver.findElement(By.name("_eventId_aceptar")).click().then(async () => {
                    await driver.findElement(By.id("centrecontent")).then(async () => {
                        await driver.wait(until.elementLocated(By.className("jmesa")),2000).then(async () => {
                            await driver.wait(until.elementLocated(By.id("table_1_row1")),2000).click().then(async () => {
                                await driver.wait(until.elementLocated(By.id("solapa_movimientos")),5000).click().then(async () => {
                                /*    let fechaDesde = await driver.wait(until.elementLocated(By.id("fechaDesde")));
                                    let fechaHasta = await driver.wait(until.elementLocated(By.id("fechaHasta")));
                                    driver.executeScript("arguments[0].removeAttribute('readonly') ",fechaDesde);
                                    driver.executeScript("arguments[0].removeAttribute('readonly') ",fechaHasta);
                                    driver.executeScript(`arguments[0].value='${minDate(date)}';`, fechaDesde);
                                    driver.executeScript(`arguments[0].value='${maxDate(date)}';`, fechaHasta);
                                    await driver.findElement(By.name("_eventId_consultar")).click().then(async () => { 
                                       await driver.wait(until.elementLocated(By.id("table_1")),5000).findElements(By.css("tr")).then(async (rowList) =>{
                                           const recolectData = async (rowList) => {                                             
                                                for(var i=1 ; i < rowList.length; i++){
                                                    await rowList[i].findElements(By.css("td")).then(async (colValue) => {
                                                        await colValue[0].getText().then(async (coltxt) => {
                                                            await colValue[4].getText().then( async (coltxt2) => {
                                                                const newData = {
                                                                    fecha: coltxt,
                                                                    numero: coltxt2
                                                                }
                                                                data = [... data, newData]                                                                    
                                                            })
                                                        })
                                                    })                                                          
                                                }     
                                            }
                                            const jsonData = async(rowList) => {
                                                await recolectData(rowList);
                                                fs.writeFile('data.json', JSON.stringify(data),'utf8', (err) => { 
                                                    if (err) throw err; 
                                                    console.log('The file has been saved!'); 
                                                });
                                                response.status(202).json(data); 
                                            }
                                            jsonData(rowList);      
                                        })
                                    })     */                               
                                })
                            })
                        })
                    })
                })
            })
        })
    })
};

const getData = async (date, response) => {
    
    await driver.findElement(By.id("centrecontent")).then(async () => {
        data = [];
        console.log(date);
        let fechaDesde = await driver.wait(until.elementLocated(By.id("fechaDesde")));
        let fechaHasta = await driver.wait(until.elementLocated(By.id("fechaHasta")));
        driver.executeScript("arguments[0].removeAttribute('readonly') ",fechaDesde);
        driver.executeScript("arguments[0].removeAttribute('readonly') ",fechaHasta);
        driver.executeScript(`arguments[0].value='${minDate(date)}';`, fechaDesde);
        driver.executeScript(`arguments[0].value='${maxDate(date)}';`, fechaHasta);
        await driver.findElement(By.name("_eventId_consultar")).click().then(async () => { 
            await driver.wait(until.elementLocated(By.id("table_1")),5000).findElements(By.css("tr")).then(async (rowList) =>{
                const recolectData = async (rowList) => {                                             
                    for(var i=1 ; i < rowList.length; i++){
                        await rowList[i].findElements(By.css("td")).then(async (colValue) => {
                            await colValue[0].getText().then(async (coltxt) => {
                                await colValue[4].getText().then( async (coltxt2) => {
                                    const newData = {
                                        fecha: coltxt,
                                        numero: coltxt2
                                    }
                                    
                                    data = [... data, newData]
                                })
                            })
                        })                                                          
                    }     
                }
                const jsonData = async(rowList) => {
                    await recolectData(rowList);
                    fs.writeFile('data.json', JSON.stringify(data),'utf8', (err) => { 
                        if (err) throw err; 
                        console.log('The file has been saved!'); 
                    });
                    response.status(202).json(data); 
                }
                jsonData(rowList);      
            })
        })
    })
}

const main = async () => {
    await getIntoBdP()
    app.get('/api/data/:date', async (request,response) => {
        const date = (request.params.date).toString();
        await getData(date, response);
    });
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); //Como puede existir una pequenia latencia se establece n callback que se ejecute cuando termine el servidor de levantarce
});

main();
