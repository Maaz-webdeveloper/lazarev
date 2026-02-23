function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,

    // for tablet smooth
    tablet: { smooth: true },

    // for mobile
    smartphone: { smooth: true },
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}
locomotiveAnimation();

function loadingAnimation() {
  var tl = gsap.timeline();
  tl.from("#page1", {
    opacity: 0.2,
    duration: 0.2,
    delay: 0.2,
  });
  tl.from("#page1", {
    transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
    borderRadius: "150px",
    duration: 2,
    ease: "expo.out",
  });
  tl.from("nav", {
    opacity: 0,
    delay: -0.2,
  });
  tl.from("#page1 h1, #page1 p, #page1 div", {
    opacity: 0,
    duration: 0.5,
    stagger: 0.2,
  });
}
loadingAnimation();
function navAnimation() {
  var nav = document.querySelector("nav");

  nav.addEventListener("mouseenter", function () {
    let tl = gsap.timeline();

    tl.to("#nav-bottom", {
      height: "21vh",
      duration: 0.5,
    });
    tl.to(".nav-part2 h5", {
      display: "block",
      duration: 0.1,
    });
    tl.to(".nav-part2 h5 span", {
      y: 0,
      // duration:0.3,
      stagger: {
        amount: 0.5,
      },
    });
  });
  nav.addEventListener("mouseleave", function () {
    let tl = gsap.timeline();
    tl.to(".nav-part2 h5 span", {
      y: 25,
      stagger: {
        amount: 0.2,
      },
    });
    tl.to(".nav-part2 h5", {
      display: "none",
      duration: 0.1,
    });
    tl.to("#nav-bottom", {
      height: 0,
      duration: 0.2,
    });
  });
}
navAnimation();

function mobileMenuToggle() {
  var menuIcon = document.querySelector(".menu-icon");
  var nav = document.querySelector("nav");

  if (menuIcon) {
    menuIcon.addEventListener("click", function () {
      nav.classList.toggle("nav-open");
    });
  }
}
mobileMenuToggle();

function Page2Animation() {
  var rightElems = document.querySelectorAll(".right-elem");

  rightElems.forEach(function (elem) {
    // Desktop mouse animations
    elem.addEventListener("mouseenter", function () {
      gsap.to(elem.childNodes[3], {
        opacity: 1,
        scale: 1,
      });
    });
    elem.addEventListener("mouseleave", function () {
      gsap.to(elem.childNodes[3], {
        opacity: 0,
        scale: 0,
      });
    });
    elem.addEventListener("mousemove", function (dets) {
      gsap.to(elem.childNodes[3], {
        x: dets.x - elem.getBoundingClientRect().x - 90,
        y: dets.y - elem.getBoundingClientRect().y - 215,
      });
    });

    // Mobile touch animations
    elem.addEventListener("touchstart", function () {
      gsap.to(elem.childNodes[3], {
        opacity: 1,
        scale: 1,
        duration: 0.3,
      });
    });
    elem.addEventListener("touchend", function () {
      gsap.to(elem.childNodes[3], {
        opacity: 0,
        scale: 0,
        duration: 0.3,
      });
    });
  });

  // Scroll animation for mobile
  if (window.innerWidth <= 480) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          const img = entry.target.querySelector("img");
          if (entry.isIntersecting) {
            gsap.to(img, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
            });
          } else {
            gsap.to(img, {
              opacity: 0,
              scale: 0.8,
              duration: 0.5,
            });
          }
        });
      },
      { threshold: 0.5 },
    );

    rightElems.forEach(function (elem) {
      observer.observe(elem);
    });
  }
}
Page2Animation();

function page3VideoAnimation() {
  var page3Center = document.querySelector(".page3-center");
  var video = document.querySelector("#page3 video");

  page3Center.addEventListener("click", function () {
    video.play();
    gsap.to(video, {
      transform: "scaleX(1) scaleY(1)",
      opacity: 1,
      borderRadius: 0,
    });
  });
  video.addEventListener("click", function () {
    video.pause();
    gsap.to(video, {
      transform: "scaleX(0.7) scaleY(0)",
      opacity: 0,
      borderRadius: "30px",
    });
  });
}
page3VideoAnimation();

var sections = document.querySelectorAll(".sec-right");

sections.forEach(function (elem) {
  // Desktop hover animations
  elem.addEventListener("mouseenter", function () {
    elem.childNodes[3].style.opacity = 1;
    elem.childNodes[3].play();
  });
  elem.addEventListener("mouseleave", function () {
    elem.childNodes[3].style.opacity = 0;
    elem.childNodes[3].load();
  });
});
page3VideoAnimation();

function page6Animations() {
  gsap.from("#btm6-part2 h4", {
    x: 0,
    duration: 1,
    scrollTrigger: {
      trigger: "#btm6-part2",
      scroller: "#main",
      // markers:true,
      start: "top 80%",
      end: "top 10%",
      scrub: true,
    },
  });
}
page6Animations();
// Mobile scroll animation for page4 videos
if (window.innerWidth <= 480) {
  const videoObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        const video = entry.target.querySelector("video");
        if (entry.isIntersecting) {
          video.style.opacity = 1;
          video.play();
        } else {
          video.style.opacity = 0;
          video.load();
        }
      });
    },
    { threshold: 0.5 },
  );

  sections.forEach(function (elem) {
    videoObserver.observe(elem);
  });
}
