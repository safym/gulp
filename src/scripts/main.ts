const MODAL_SELECTOR = "#modal";

const handleClick = (event: MouseEvent) => {
  const dialog = document.querySelector(MODAL_SELECTOR) as HTMLDialogElement;
  const form = dialog.querySelector("form") as HTMLFormElement;

  const isBuyButton = (event.target as HTMLElement).dataset?.buybutton;

  if (isBuyButton && !dialog.open) {
    dialog.showModal();
  } else {
    const target = event.target as HTMLElement;

    if (target.id === "modalConfirm") {
      form.submit();
      dialog.close();
      alert("Confirmed!");
    } else if (target.id === "modalCancel") {
      form.reset();
      dialog.close();
    }
  }
};

window.document.addEventListener("click", handleClick);
