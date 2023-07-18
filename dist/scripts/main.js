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
window.document.addEventListener("click", handleClick);
