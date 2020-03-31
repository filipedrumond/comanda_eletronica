let bodyClass = function ($) {
    let path = window.location.pathname;
    let classNames = path.split("/");
    classNames.forEach(e => {
        if (!e) return;
        let className = `r-${e}`
        $("body").addClass(className);
    });
}
module.exports = bodyClass;