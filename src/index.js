require('dotenv').config(); 
const {Builder, By, Key} = require('selenium-webdriver'); 
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
        await driver.findElement(By.id("username")).sendkeys(`${process.env.BDP_USER}\n`).then(async () => {
            await driver.findElement(By.id("password")).sendKeys(`${process.env.BDP_USER_PASSWORD}\n`).then(async () => { 
                await driver.findElement(By.name("_eventId_aceptar")).click().then(async () => {
                    await driver.findElement(By.className("contenedor-formulario")).then(async () => {
                        await driver.findElement(By.name("separador-inferior-blanco")).then(async () => {
                            console.log("Me") 
                        })
                    })
                })
            })
        })
    })
};

getIntoBdP();