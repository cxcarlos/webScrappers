require('dotenv').config(); 
const {Builder, By, Key, until} = require('selenium-webdriver'); 

// const myFn = async () 
// let driver = await new Builder().forBrowser('chrome).build(); 
// await driver.get(lihttps://www.google.com"); 
// await driver.findElement(By.name('W)).sendkeys("Seleniumn,Key.RETURN) 
// 1 9 10 11 // myFn(); 12 13 


const GetDateFormat = (date) => { 
    var month = (date.getMonth() + 1).toString();
    month = month.length > 1 ? month: '0' + month; 
    var day = date.getDate().toString(); 
    day = day.length > 1 ? day : '0' + day; 
    return month + '/' + day + '/' + date.getFullYear(); 
} 

var dateObj = new Date(); 
var dateFormat = GetDateFormat(dateObj); // 07/05/2016 
let driver = new Builder().forBrowser('chrome').build(); 

const getIntoBdP = async () => {
    await driver.get("https://www.intermatico.com/ebanking/seguridad/login.htm").then( async () => {
        await driver.findElement(By.id("username")).sendKeys(`${process.env.BDP_USER}\n`).then(async () => {
            await driver.findElement(By.id("password")).sendKeys(`${process.env.BDP_USER_PASSWORD}\n`).then(async () => { 
                await driver.findElement(By.name("_eventId_aceptar")).click().then(async () => {
                    await driver.findElement(By.id("centrecontent")).then(async () => {
                        await driver.wait(until.elementLocated(By.className("jmesa")),2000).then(async () => {
                            await driver.wait(until.elementLocated(By.id("table_1_row1")),2000).click().then(async () => {
                                await driver.wait(until.elementLocated(By.id("solapa_movimientos")),5000).click().then(async () => {
                                    let fechaDesde = await driver.wait(until.elementLocated(By.id("fechaDesde")));
                                    let fechaHasta = await driver.wait(until.elementLocated(By.id("fechaHasta")));
                                    driver.executeScript("arguments[0].removeAttribute('readonly') ",fechaDesde);
                                    driver.executeScript("arguments[0].removeAttribute('readonly') ",fechaHasta);
                                })
                            })
                        })
                    })
                })
            })
        })
    })
};

getIntoBdP();