(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    const viewport = root.querySelector(".carousel__viewport");
    const track = root.querySelector(".carousel__track");
    const slides = Array.from(track.children);
    const prev = root.querySelector(".carousel__prev");
    const next = root.querySelector(".carousel__next");
    const dotsWrap = root.querySelector(".carousel__dots");
    if (!slides.length) return;

    let index = 0;
    let per = 1;
    let timer = 0;

    const dots = slides.map(function (_, i) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "carousel__dot";
      button.setAttribute("aria-label", "Kuva " + (i + 1));
      button.addEventListener("click", function () {
        go(i);
        restart();
      });
      dotsWrap.appendChild(button);
      return button;
    });

    function perView() {
      if (window.innerWidth < 800) return 1;
      return Math.min(3, slides.length);
    }

    function maxIndex() {
      return Math.max(slides.length - per, 0);
    }

    function layout() {
      per = perView();
      const width = viewport.clientWidth / per;
      slides.forEach(function (slide) {
        slide.style.width = width + "px";
      });
      go(index);
    }

    function go(n) {
      const max = maxIndex();
      if (n > max) index = 0;
      else if (n < 0) index = max;
      else index = n;
      const width = viewport.clientWidth / per;
      track.style.transform = "translateX(" + -index * width + "px)";
      dots.forEach(function (dot, i) {
        const active = i === index;
        dot.classList.toggle("is-active", active);
        if (active) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    }

    function restart() {
      window.clearInterval(timer);
      if (reduce || slides.length <= per) return;
      timer = window.setInterval(function () {
        go(index + 1);
      }, 5000);
    }

    prev.addEventListener("click", function () {
      go(index - 1);
      restart();
    });
    next.addEventListener("click", function () {
      go(index + 1);
      restart();
    });
    root.addEventListener("mouseenter", function () {
      window.clearInterval(timer);
    });
    root.addEventListener("mouseleave", restart);
    window.addEventListener("resize", layout);
    layout();
    restart();
  });
})();
