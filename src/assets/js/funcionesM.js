function iniciarMenuLateral() {
  document.addEventListener("DOMContentLoaded", function () {
    let elems = document.querySelectorAll(".sidenav");
    let instances = M.Sidenav.init(elems, {});
  });
}

let onloadCallback = function () {
  grecaptcha.render("idRecaptcha", {
    sitekey: "6LekzdolAAAAAKGOPqKYvfMQu-zsLgF4We2lfzEa",
  });
};

iniciarMenuLateral();

function seleccionador() {
  document.addEventListener("DOMContentLoaded", function () {
    let elems = document.querySelectorAll("select");
    let instances = M.FormSelect.init(elems);
  });
}
