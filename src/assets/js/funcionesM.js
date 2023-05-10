function iniciarMenuLateral() {
  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll(".sidenav");
    var instances = M.Sidenav.init(elems, {});
  });
}

var onloadCallback = function () {
  grecaptcha.render("idRecaptcha", {
    sitekey: "6LekzdolAAAAAKGOPqKYvfMQu-zsLgF4We2lfzEa",
  });
};

iniciarMenuLateral();
