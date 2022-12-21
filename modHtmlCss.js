/**
    *@param html html text
    *@param css css text
    *@param htmlVar html variables to change
    *@param cssVar css variables to change
    *@returns object with modified html and css {html,css}
**/

const mod = (html, css, htmlVar, cssVar) => {
    
    var countVar = countVariables(html)
    console.log("🚀 ~ file: modHtmlCss.js:12 ~ mod ~ countVar", countVar)
    var keysUser = Object.keys(htmlVar)
    var missingVar = countVar.filter((variable) =>
        !keysUser.includes(variable)
    )
    if (missingVar.length > 0) {
        console.log(`missing variables in html -> ${missingVar.join(', ')}`)
        return { err: 'missing keys - html' }
    }
    var countVar = countVariables(css)
    var keysUser = Object.keys(cssVar)
    var missingVar = countVar.filter((variable) =>
        !keysUser.includes(variable))
    if (missingVar.length > 0) {
        console.log(`missing variables in css -> ${missingVar.join(', ')}`)
        return { err: 'missing keys - css' }
    }
    
    var modHtml = html.replace(/\${'([^']*)'}/g, (match, key) =>
        htmlVar[key]
    )
    var modCss = css.replace(/\${'([^']*)'}/g, (match, key) => cssVar[key])
    return { modHtml, modCss }
}

const countVariables = (file) => {
    const matches = file?.match(/\${'([^']*)'}/g);
    console.log("🚀 ~ file: modHtmlCss.js:39 ~ countVariables ~ matches", matches)
    if (!matches) {
        return []
    }
    return matches.map((match) => match.slice(3, -2))
}

module.exports = mod