var MODAL_SELECTOR = "#modal";
var handleClick = function (event) {
    var _a;
    var dialog = document.querySelector(MODAL_SELECTOR);
    var form = dialog.querySelector("form");
    var isBuyButton = (_a = event.target.dataset) === null || _a === void 0 ? void 0 : _a.buybutton;
    if (isBuyButton && !dialog.open) {
        dialog.showModal();
    }
    else {
        var target = event.target;
        if (target.id === "modalConfirm") {
            form.submit();
            dialog.close();
            alert("Confirmed!");
        }
        else if (target.id === "modalCancel") {
            form.reset();
            dialog.close();
        }
    }
};
var toggleScrollToTop = function () {
    var scrollToTop = document.querySelector('.scrollToTop');
    // console.log('scroll')
    if (window.pageYOffset > 100) {
        scrollToTop.classList.add('scrollToTop-show');
    }
    else {
        scrollToTop.classList.remove('scrollToTop-show');
    }
};
var scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
window.document.addEventListener("click", handleClick);
window.addEventListener('scroll', toggleScrollToTop);
document.querySelector('.scrollToTop').addEventListener('click', scrollToTop);
