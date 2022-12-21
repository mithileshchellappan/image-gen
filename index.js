const mod = require('./modHtmlCss')
const screenshot = require('./screeenshot')
const fsPromises = require('fs/promises')
const fs = require('fs')
const path = require('path')
var variables = {
    html: {
        'title-1': 'Head',
        'title-2': 'godzi',
        'title-3':'main',
        'name-1':'name',
        'name-2':'name',
        'name-3':'name',


    },
    css: {
        normall: 'normal'
    }
}

const main = async (folderName, variables) => {
    const folderPath = path.resolve(`./templates/${folderName}/`)
    const htmlPath = `${__dirname}/templates/${folderName}/${folderName}.html`
    const cssPath = `${__dirname}/templates/${folderName}/${folderName}.css`
   
    const html = (await fsPromises.readFile(htmlPath)).toString()


    const css = (await fsPromises.readFile(cssPath)).toString()
    var { html: htmlVar, css: cssVar } = variables

    const codes = mod(html, css, htmlVar, cssVar)
    if (codes.err) {
        return console.log(codes.err)
    }
    var { modHtml, modCss } = codes
    var copyHtmlPath = `${__dirname}/templates/${folderName}/${folderName}_copy.html`

    var copyCssPath = `${__dirname}/templates/${folderName}/${folderName}_copy.css`
    var htmlStream = fs.createWriteStream(copyHtmlPath)
    var cssStream = fs.createWriteStream(copyCssPath)
    htmlStream.write(modHtml)
    cssStream.write(modCss)

    await screenshot(copyHtmlPath, copyCssPath)

    fs.unlink(copyCssPath,()=>{})
    fs.unlink(copyHtmlPath,()=>{})
}

main('page', variables)