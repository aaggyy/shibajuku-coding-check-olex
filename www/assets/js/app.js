const button = document.querySelector(".js-button__hamburger");
const body = document.querySelector("body");
const grobalNav = document.querySelector(".js-grobalNav");
const mediaQuery = matchMedia("(max-width: 767px)");

//グローバルメニューのアクセシビリティ
button.addEventListener("click", () => {
  body.classList.toggle("is-drawerActive");
  const isExpanded = button.getAttribute("aria-expanded") !== "false";
  button.setAttribute("aria-expanded", !isExpanded);
});

//メディアクエリに応じてのグローバルメニューのちらつき予防
mediaQuery.addEventListener("change", mediaQueryChange);

function mediaQueryChange(mediaQuery) {
  if (mediaQuery.matches === false) {
    const drawerActive = document.querySelector(".is-drawerActive");
    if (drawerActive !== null) {
      body.classList.remove("is-drawerActive");
    }
  }

  if (mediaQuery.matches === true) {
    setTimeout(() => {
      grobalNav.classList.add("js-none");
    }, 0);
    setTimeout(() => {
      grobalNav.classList.remove("js-none");
    }, 1000);
  }
}
mediaQueryChange(mediaQuery);

//スクロール感知
const appearItems = document.querySelectorAll(".appear");
const cb = function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("inview"); //各要素を監視し、クラス付与
      //ここをforEachで回して各要素にクラスを付与するコードを書くと、
      //要素を感知した瞬間、全ての要素にクラスを付与してしまう。
      //そのため、entry.targetで監視している要素が
      //それぞれ侵入してきたタイミングでクラス付与するようにする
      observer.unobserve(entry.target); //監視の停止
    } else {
      // console.log("出た");
      // appearItems.forEach((appearItem) => {
      //   appearItem.classList.remove("inview");
      // });
    }
  });
};
const io = new IntersectionObserver(cb);
appearItems.forEach((appearItem) => {
  io.observe(appearItem);
});

//文字アニメーション関数
function strAnimation(target) {
  const elems = document.querySelectorAll(target);
  elems.forEach((elem) => {
    const str = elem.textContent.split("");
    let concatStr = "";
    for (let c of str) {
      concatStr += `<span class="char">${c}</span>`;
    }
    elem.innerHTML = concatStr;
    io.observe(elem);
  });
}

strAnimation(".js-heroTitle");
strAnimation(".js-headingTitle");
strAnimation(".js-footerTextItem");

// 写真アニメーション関数
function imgAnimation(target) {
  const elems = document.querySelectorAll(target);
  elems.forEach((elem) => {
    io.observe(elem);
  });
}

imgAnimation(".js-heroImages");
imgAnimation(".js-sectionImage");
//heroImageを一つずつ表示
// const heroImages = document.querySelectorAll(".js-heroImages");
// heroImages.forEach((elem) => {
//   io.observe(elem);
// });

// const footerTextItems = document.querySelectorAll(".js-footerTextItem");
// footerTextItems.forEach((elem) => {
//   const str = elem.textContent.split("");
//   let concatStr = "";
//   for (let c of str) {
//     concatStr += `<span class="char">${c}</span>`;
//   }
//   elem.innerHTML = concatStr;
//   io.observe(elem);
// });
// const footerStr = footerText.textContent.split("");
// let concatStr = "";
// for (let c of footerStr) {
//   concatStr += `<span class="char">${c}</span>`;
// }
// // console.log(concatStr);
// footerText.innerHTML = concatStr;
// io.observe(footerText);
