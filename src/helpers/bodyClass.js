let bodyClass = function ($, layout = 'l-layout') {
    let path = window.location.pathname;
    let classNames = path.split("/");
    if(layout) $('body').addClass(layout);
    classNames.forEach(e => {
        if (!e) return;
        let className = `r-${e}`
        $('body').addClass(className);
    });
}
module.exports = bodyClass;