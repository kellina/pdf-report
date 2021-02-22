const express = require('express')
const ejs = require('ejs')
const path = require('path')
const puppeteer = require('puppeteer')
const { response } = require('express')
const app = express()

// TODO This passenger list can be from the database.
const passengers = [
    {
        name: 'Joyce',
        flightNumber: 7859,
        time: '18h00',
    },
    {
        name: 'Brock',
        flightNumber: 7859,
        time: '18h00',
    },
    {
        name: 'Eve',
        flightNumber: 7859,
        time: '18h00',
    }
]

app.get('/pdf', async (req, res) => {
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    await page.goto('http://localhost:3000/', {
        waitUntil: 'networkidle0'
    })

    const pdf = await page.pdf({
        printBackground: true,
        format: 'letter',
        margin: {
            top: '20px',
            bottom: '40px',
            left: '20px',
            right: '20px'
        }
    })
      await browser.close()

      res.contentType('application/pdf')
      return res.send(pdf)
  })

app.get('/', (req, res) => {

    const filePath = path.join(__dirname, 'print.ejs')
    ejs.renderFile(filePath, { passengers }, (err, html) => {
        if(err) {
            return res.send('Error reading the file');
        }
               
        return res.send(html);
    })
})

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
