$(document).ready(function () {
  var myVar = setInterval(function () {
    myTimer();
  }, 1000);

  function myTimer() {
    var d = new Date();
    document.getElementById("hora").innerHTML = d.toLocaleTimeString();
  }

  let lastScroll = $(window).scrollTop();

  $(window).scroll(function () {
    const currentScroll = $(window).scrollTop();
    if (currentScroll > lastScroll) {
      // scroll down
      $(".navbar").attr(
        "style",
        "position: fixed; z-index: 10; background: radial-gradient(ellipse at bottom, #1b2735 0%, #191f24 100%); width: 100%; top: 0px;"
      );
    }
    if (currentScroll == 0) {
      $(".navbar").attr("style", "background-color: transparent;");
    }

    // scroll update
    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  });
});
window.callbellSettings = {
  token: "e3jAUu2rKC8FurrZoQxumen6",
};

(function () {
  var w = window;
  var ic = w.callbell;
  if (typeof ic === "function") {
    ic("reattach_activator");
    ic("update", callbellSettings);
  } else {
    var d = document;
    var i = function () {
      i.c(arguments);
    };
    i.q = [];
    i.c = function (args) {
      i.q.push(args);
    };
    w.Callbell = i;
    var l = function () {
      var s = d.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src =
        "https://dash.callbell.eu/include/" +
        window.callbellSettings.token +
        ".js";
      var x = d.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
    };
    if (w.attachEvent) {
      w.attachEvent("onload", l);
    } else {
      w.addEventListener("load", l, false);
    }
  }
})();
