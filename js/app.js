function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  },
};
function isIE() {
  ua = navigator.userAgent;
  var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
  return is_ie;
}
if (isIE()) {
  document.querySelector("html").classList.add("ie");
}
if (isMobile.any()) {
  document.querySelector("html").classList.add("_touch");
}

// Получить цифры из строки
//parseInt(itemContactpagePhone.replace(/[^\d]/g, ''))

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
  if (support === true) {
    document.querySelector("html").classList.add("_webp");
  } else {
    document.querySelector("html").classList.add("_no-webp");
  }
});

function ibg() {
  if (isIE()) {
    let ibg = document.querySelectorAll("._ibg");
    for (var i = 0; i < ibg.length; i++) {
      if (ibg[i].querySelector("img") && ibg[i].querySelector("img").getAttribute("src") != null) {
        ibg[i].style.backgroundImage = "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
      }
    }
  }
}
ibg();

window.addEventListener("load", function () {
  if (document.querySelector(".wrapper")) {
    setTimeout(function () {
      document.querySelector(".wrapper").classList.add("_loaded");
    }, 0);
  }
});

let unlock = true;

//=================
//ActionsOnHash
if (location.hash) {
  const hsh = location.hash.replace("#", "");
  if (document.querySelector(".popup_" + hsh)) {
    popup_open(hsh);
  } else if (document.querySelector("div." + hsh)) {
    _goto(document.querySelector("." + hsh), 500, "");
  }
}
//=================
//Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
  let delay = 500;
  let menuBody = document.querySelector(".menu__body");
  iconMenu.addEventListener("click", function (e) {
    if (unlock) {
      body_lock(delay);
      iconMenu.classList.toggle("_active");
      menuBody.classList.toggle("_active");
    }
  });
}
function menu_close() {
  let iconMenu = document.querySelector(".icon-menu");
  let menuBody = document.querySelector(".menu__body");
  iconMenu.classList.remove("_active");
  menuBody.classList.remove("_active");
}
//=================
//BodyLock
function body_lock(delay) {
  let body = document.querySelector("body");
  if (body.classList.contains("_lock")) {
    body_lock_remove(delay);
  } else {
    body_lock_add(delay);
  }
}
function body_lock_remove(delay) {
  let body = document.querySelector("body");
  if (unlock) {
    let lock_padding = document.querySelectorAll("._lp");
    setTimeout(() => {
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index];
        el.style.paddingRight = "0px";
      }
      body.style.paddingRight = "0px";
      body.classList.remove("_lock");
    }, delay);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}
function body_lock_add(delay) {
  let body = document.querySelector("body");
  if (unlock) {
    let lock_padding = document.querySelectorAll("._lp");
    for (let index = 0; index < lock_padding.length; index++) {
      const el = lock_padding[index];
      el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
    }
    body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
    body.classList.add("_lock");

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}
//=================
// LettersAnimation
let title = document.querySelectorAll("._letter-animation");
if (title) {
  for (let index = 0; index < title.length; index++) {
    let el = title[index];
    let txt = el.innerHTML;
    let txt_words = txt.replace("  ", " ").split(" ");
    let new_title = "";
    for (let index = 0; index < txt_words.length; index++) {
      let txt_word = txt_words[index];
      let len = txt_word.length;
      new_title = new_title + "<p>";
      for (let index = 0; index < len; index++) {
        let it = txt_word.substr(index, 1);
        if (it == " ") {
          it = "&nbsp;";
        }
        new_title = new_title + "<span>" + it + "</span>";
      }
      el.innerHTML = new_title;
      new_title = new_title + "&nbsp;</p>";
    }
  }
}
//=================
//Tabs
let tabs = document.querySelectorAll("._tabs");

const tabClick = (container, itemClass) => {
  for (let index = 0; index < tabs.length; index++) {
    let tab = container[index];
    let tabs_items = tab.querySelectorAll(itemClass);
    let tabs_blocks = tab.querySelectorAll("._tabs-block");
    for (let index = 0; index < tabs_items.length; index++) {
      let tabs_item = tabs_items[index];
      tabs_item.addEventListener("click", function (e) {
        for (let index = 0; index < tabs_items.length; index++) {
          let tabs_item = tabs_items[index];
          tabs_item.classList.remove("_active");
          tabs_blocks[index].classList.remove("_active");
          activeIndex = index;
        }
        tabs_item.classList.add("_active");
        tabs_blocks[index].classList.add("_active");
        e.preventDefault();
      });
    }
  }
};

tabClick(tabs, "._tabs-item");

//=================
//Gallery
let gallery = document.querySelectorAll("._gallery");
if (gallery) {
  gallery_init();
}
function gallery_init() {
  for (let index = 0; index < gallery.length; index++) {
    const el = gallery[index];
    lightGallery(el, {
      counter: false,
      selector: "a",
      download: false,
    });
  }
}
//=================
//SearchInList
function search_in_list(input) {
  let ul = input.parentNode.querySelector("ul");
  let li = ul.querySelectorAll("li");
  let filter = input.value.toUpperCase();

  for (i = 0; i < li.length; i++) {
    let el = li[i];
    let item = el;
    txtValue = item.textContent || item.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      el.style.display = "";
    } else {
      el.style.display = "none";
    }
  }
}
//=================
//Popups
let popup_link = document.querySelectorAll("._popup-link");
let popups = document.querySelectorAll(".popup");
for (let index = 0; index < popup_link.length; index++) {
  const el = popup_link[index];
  el.addEventListener("click", function (e) {
    if (unlock) {
      let item = el.getAttribute("href").replace("#", "");
      let video = el.getAttribute("data-video");
      popup_open(item, video);
    }
    e.preventDefault();
  });
}
for (let index = 0; index < popups.length; index++) {
  const popup = popups[index];
  popup.addEventListener("click", function (e) {
    if (!e.target.closest(".popup__body")) {
      popup_close(e.target.closest(".popup"));
    }
  });
}
function popup_open(item, video = "") {
  let activePopup = document.querySelectorAll(".popup._active");
  if (activePopup.length > 0) {
    popup_close("", false);
  }
  let curent_popup = document.querySelector(".popup_" + item);
  if (curent_popup && unlock) {
    if (video != "" && video != null) {
      let popup_video = document.querySelector(".popup_video");
      popup_video.querySelector(".popup__video").innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    }
    if (!document.querySelector(".menu__body._active")) {
      body_lock_add(500);
    }
    curent_popup.classList.add("_active");
    history.pushState("", "", "#" + item);
  }
}
function popup_close(item, bodyUnlock = true) {
  if (unlock) {
    if (!item) {
      for (let index = 0; index < popups.length; index++) {
        const popup = popups[index];
        let video = popup.querySelector(".popup__video");
        if (video) {
          video.innerHTML = "";
        }
        popup.classList.remove("_active");
      }
    } else {
      let video = item.querySelector(".popup__video");
      if (video) {
        video.innerHTML = "";
      }
      item.classList.remove("_active");
    }
    if (!document.querySelector(".menu__body._active") && bodyUnlock) {
      body_lock_remove(500);
    }
    history.pushState("", "", window.location.href.split("#")[0]);
  }
}
let popup_close_icon = document.querySelectorAll(".popup__close,._popup-close");
if (popup_close_icon) {
  for (let index = 0; index < popup_close_icon.length; index++) {
    const el = popup_close_icon[index];
    el.addEventListener("click", function () {
      popup_close(el.closest(".popup"));
    });
  }
}
document.addEventListener("keydown", function (e) {
  if (e.code === "Escape") {
    popup_close();
  }
});

//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};
let _slideDown = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    if (target.hidden) {
      target.hidden = false;
    }
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};
//========================================
//Wrap
function _wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}
//========================================
//RemoveClasses
function _removeClasses(el, class_name) {
  for (var i = 0; i < el.length; i++) {
    el[i].classList.remove(class_name);
  }
}
//========================================

//Полифилы
(function () {
  // проверяем поддержку
  if (!Element.prototype.closest) {
    // реализуем
    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();
(function () {
  // проверяем поддержку
  if (!Element.prototype.matches) {
    // определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
  }
})();


//Select
let selects = document.getElementsByTagName("select");
if (selects.length > 0) {
  selects_init();
}
function selects_init() {
  for (let index = 0; index < selects.length; index++) {
    const select = selects[index];
    select_init(select);
  }
  //select_callback();
  document.addEventListener("click", function (e) {
    selects_close(e);
  });
  document.addEventListener("keydown", function (e) {
    if (e.code === "Escape") {
      selects_close(e);
    }
  });
}
function selects_close(e) {
  const selects = document.querySelectorAll(".select");
  if (!e.target.closest(".select") && !e.target.classList.contains("_option")) {
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      const select_body_options = select.querySelector(".select__options");
      select.classList.remove("_active");
      _slideUp(select_body_options, 100);
    }
  }
}
function select_init(select) {
  const select_parent = select.parentElement;
  const select_modifikator = select.getAttribute("class");
  const select_selected_option = select.querySelector("option:checked");
  select.setAttribute("data-default", select_selected_option.value);
  select.style.display = "none";

  select_parent.insertAdjacentHTML("beforeend", '<div class="select select_' + select_modifikator + '"></div>');

  let new_select = select.parentElement.querySelector(".select");
  new_select.appendChild(select);
  select_item(select);
}
function select_item(select) {
  const select_parent = select.parentElement;
  const select_items = select_parent.querySelector(".select__item");
  const select_options = select.querySelectorAll("option");
  const select_selected_option = select.querySelector("option:checked");
  const select_selected_text = select_selected_option.text;
  const select_type = select.getAttribute("data-type");

  if (select_items) {
    select_items.remove();
  }

  let select_type_content = "";
  if (select_type == "input") {
    select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
  } else {
    select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + "</span></div>";
  }

  select_parent.insertAdjacentHTML("beforeend", '<div class="select__item">' + '<div class="select__title">' + select_type_content + "</div>" + '<div hidden class="select__options">' + select_get_options(select_options) + "</div>" + "</div></div>");

  select_actions(select, select_parent);

  // tab choosing on select click
  let select_tabs = document.querySelectorAll("._tabs");

  //tabClick from functions.js file
  tabClick(select_tabs, ".select__option");
}
function select_actions(original, select) {
  const select_item = select.querySelector(".select__item");
  const selectTitle = select.querySelector(".select__title");
  const select_body_options = select.querySelector(".select__options");
  const select_options = select.querySelectorAll(".select__option");
  const select_type = original.getAttribute("data-type");
  const select_input = select.querySelector(".select__input");

  selectTitle.addEventListener("click", function (e) {
    selectItemActions();
  });

  function selectMultiItems() {
    let selectedOptions = select.querySelectorAll(".select__option");
    let originalOptions = original.querySelectorAll("option");
    let selectedOptionsText = [];
    for (let index = 0; index < selectedOptions.length; index++) {
      const selectedOption = selectedOptions[index];
      originalOptions[index].removeAttribute("selected");
      if (selectedOption.classList.contains("_selected")) {
        const selectOptionText = selectedOption.innerHTML;
        selectedOptionsText.push(selectOptionText);
        originalOptions[index].setAttribute("selected", "selected");
      }
    }
    select.querySelector(".select__value").innerHTML = "<span>" + selectedOptionsText + "</span>";
  }
  function selectItemActions(type) {
    if (!type) {
      let selects = document.querySelectorAll(".select");
      for (let index = 0; index < selects.length; index++) {
        const select = selects[index];
        const select_body_options = select.querySelector(".select__options");
        if (select != select_item.closest(".select")) {
          select.classList.remove("_active");
          _slideUp(select_body_options, 100);
        }
      }
      _slideToggle(select_body_options, 100);
      select.classList.toggle("_active");
    }
  }
  for (let index = 0; index < select_options.length; index++) {
    const select_option = select_options[index];
    const select_option_value = select_option.getAttribute("data-value");
    const select_option_text = select_option.innerHTML;

    if (select_type == "input") {
      select_input.addEventListener("keyup", select_search);
    } else {
      if (select_option.getAttribute("data-value") == original.value && !original.hasAttribute("multiple")) {
        select_option.style.display = "none";
      }
    }
    select_option.addEventListener("click", function () {
      for (let index = 0; index < select_options.length; index++) {
        const el = select_options[index];
        el.style.display = "block";
      }
      if (select_type == "input") {
        select_input.value = select_option_text;
        original.value = select_option_value;
      } else {
        if (original.hasAttribute("multiple")) {
          select_option.classList.toggle("_selected");
          selectMultiItems();
        } else {
          select.querySelector(".select__value").innerHTML = "<span>" + select_option_text + "</span>";
          original.value = select_option_value;
          select_option.style.display = "none";
        }
      }
      let type;
      if (original.hasAttribute("multiple")) {
        type = "multiple";
      }
      selectItemActions(type);
    });
  }
}
function select_get_options(select_options) {
  if (select_options) {
    let select_options_content = "";
    for (let index = 0; index < select_options.length; index++) {
      const select_option = select_options[index];
      const select_option_value = select_option.value;
      if (select_option_value != "") {
        const select_option_text = select_option.innerHTML;
        select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + "</div>";
      }
    }
    return select_options_content;
  }
}
function select_search(e) {
  let select_block = e.target.closest(".select ").querySelector(".select__options");
  let select_options = e.target.closest(".select ").querySelectorAll(".select__option");
  let select_search_text = e.target.value.toUpperCase();

  for (let i = 0; i < select_options.length; i++) {
    let select_option = select_options[i];
    let select_txt_value = select_option.textContent || select_option.innerText;
    if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
      select_option.style.display = "";
    } else {
      select_option.style.display = "none";
    }
  }
}
function selects_update_all() {
  let selects = document.querySelectorAll("select");
  if (selects) {
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      select_item(select);
    }
  }
}

//BildSlider
let sliders = document.querySelectorAll("._swiper");
if (sliders) {
  for (let index = 0; index < sliders.length; index++) {
    let slider = sliders[index];
    if (!slider.classList.contains("swiper-bild")) {
      let slider_items = slider.children;
      if (slider_items) {
        for (let index = 0; index < slider_items.length; index++) {
          let el = slider_items[index];
          el.classList.add("swiper-slide");
        }
      }
      let slider_content = slider.innerHTML;
      let slider_wrapper = document.createElement("div");
      slider_wrapper.classList.add("swiper-wrapper");
      slider_wrapper.innerHTML = slider_content;
      slider.innerHTML = "";
      slider.appendChild(slider_wrapper);
      slider.classList.add("swiper-bild");

      if (slider.classList.contains("_swiper_scroll")) {
        let sliderScroll = document.createElement("div");
        sliderScroll.classList.add("swiper-scrollbar");
        slider.appendChild(sliderScroll);
      }
    }
    if (slider.classList.contains("_gallery")) {
      //slider.data('lightGallery').destroy(true);
    }
  }
  sliders_bild_callback();
}

function sliders_bild_callback(params) {}

let sliderScrollItems = document.querySelectorAll("._swiper_scroll");
if (sliderScrollItems.length > 0) {
  for (let index = 0; index < sliderScrollItems.length; index++) {
    const sliderScrollItem = sliderScrollItems[index];
    const sliderScrollBar = sliderScrollItem.querySelector(".swiper-scrollbar");
    const sliderScroll = new Swiper(sliderScrollItem, {
      observer: true,
      observeParents: true,
      direction: "vertical",
      slidesPerView: "auto",
      freeMode: true,
      scrollbar: {
        el: sliderScrollBar,
        draggable: true,
        snapOnRelease: false,
      },
      mousewheel: {
        releaseOnEdges: true,
      },
    });
    sliderScroll.scrollbar.updateSize();
  }
}

function sliders_bild_callback(params) {}

let slider_about = new Swiper(".interface__slider", {
  effect: "fade",
  /*
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
  observer: true,
  observeParents: true,
  slidesPerView: 1,
  spaceBetween: 0,
  autoHeight: true,
  speed: 800,
  //touchRatio: 0,
  //simulateTouch: false,
  // loop: true,
  //preloadImages: false,
  //lazy: true,
  // Dotts
  pagination: {
    el: ".interface__bullets",
    clickable: true,
  },
  // Arrows
  navigation: {
    nextEl: ".arrows-interface__arrow_next",
    prevEl: ".arrows-interface__arrow_prev",
  },
  /*
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
	*/
  on: {
    lazyImageReady: function () {
      ibg();
    },
  },
  // And if we need scrollbar
  //scrollbar: {
  //	el: '.swiper-scrollbar',
  //},
});
