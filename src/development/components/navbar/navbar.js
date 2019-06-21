/* global document */
import SmoothScroll from "smooth-scroll";
import NavScrollSpy from "nav-scroll-spy";

class Navbar {
  constructor(navbar) {
    this.navbar = navbar;
    this.scroll = this.scroll.bind(this);
  }
  scroll(event) {
    const navbarPos = this.navbar.getBoundingClientRect().top;

    if (navbarPos < 0) {
      this.navbar.classList.add("uxb-navbar_sticky");
    } else {
      this.navbar.classList.remove("uxb-navbar_sticky");
    }
  }
  init() {
    const smoothScrollInit = new SmoothScroll('a[href*="#"]', {
      speed: 500,
      speedAsDuration: true,
      offset: 64
    });
    let spy = new NavScrollSpy({
      offset: 65
    });
    spy.init();
    window.addEventListener("scroll", this.scroll);
  }
}

function navbarInit() {
  const navbars = document.querySelectorAll(".js-navbar");
  if (navbars.length === 0) {
    return null;
  }
  for (let i = 0; i < navbars.length; i += 1) {
    const navbar = new Navbar(navbars[i]);
    navbar.init();
  }
  return null;
}

export default navbarInit;
