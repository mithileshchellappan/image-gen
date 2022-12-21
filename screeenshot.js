const puppet = require('puppeteer')
const path = require('path')
const screenshot = async (html,css) => {
    
    const browser = await puppet.launch({
        
        headless: false,
        args: ['--no-sandbox', '--disable-dev-shm-usage']
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1960, height: 1080 })
    await page.goto(`file://${html}`)
    // await page.setContent(html,{waitUntil:'networkidle0'})


	// await page.addStyleTag({ path: css })
    // await page.evaluate(async(css)=>{
    //     console.log(css)
    //     const style = document.createElement('style')
    //     style.type = 'text/css'
    //     style.appendChild(document.createTextNode(css));
    //     const promise = new Promise((resolve,reject)=>{
    //         style.onload = resolve;
    //         style.onerror=reject
    //     })
    //     document.head.appendChild(style)
    //     await promise
    // })
    
	await page.waitForTimeout(1000)
	await page.screenshot({ path: `./pic2.png`,fullPage:true,captureBeyondViewport:true })
	await browser.close()
}

module.exports = screenshot