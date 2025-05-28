function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe",
    ),
  )
}

document.querySelectorAll('[id^="Details-"] summary').forEach((summary) => {
  summary.setAttribute("role", "button")
  summary.setAttribute("aria-expanded", summary.parentNode.hasAttribute("open"))

  if (summary.nextElementSibling.getAttribute("id")) {
    summary.setAttribute("aria-controls", summary.nextElementSibling.id)
  }

  summary.addEventListener("click", (event) => {
    event.currentTarget.setAttribute("aria-expanded", !event.currentTarget.closest("details").hasAttribute("open"))
  })

  if (summary.closest("header-drawer")) return
  summary.parentElement.addEventListener("keyup", onKeyUpEscape)
})

const trapFocusHandlers = {}

function trapFocus(container, elementToFocus = container) {
  var elements = getFocusableElements(container)
  var first = elements[0]
  var last = elements[elements.length - 1]

  removeTrapFocus()

  trapFocusHandlers.focusin = (event) => {
    if (event.target !== container && event.target !== last && event.target !== first) return

    document.addEventListener("keydown", trapFocusHandlers.keydown)
  }

  trapFocusHandlers.focusout = () => {
    document.removeEventListener("keydown", trapFocusHandlers.keydown)
  }

  trapFocusHandlers.keydown = (event) => {
    if (event.code.toUpperCase() !== "TAB") return // If not TAB key
    // On the last focusable element and tab forward, focus the first element.
    if (event.target === last && !event.shiftKey) {
      event.preventDefault()
      first.focus()
    }

    //  On the first focusable element and tab backward, focus the last element.
    if ((event.target === container || event.target === first) && event.shiftKey) {
      event.preventDefault()
      last.focus()
    }
  }

  document.addEventListener("focusout", trapFocusHandlers.focusout)
  document.addEventListener("focusin", trapFocusHandlers.focusin)

  elementToFocus.focus()
}

// Here run the querySelector to figure out if the browser supports :focus-visible or not and run code based on it.
try {
  document.querySelector(":focus-visible")
} catch (e) {
  focusVisiblePolyfill()
}

function focusVisiblePolyfill() {
  const navKeys = [
    "ARROWUP",
    "ARROWDOWN",
    "ARROWLEFT",
    "ARROWRIGHT",
    "TAB",
    "ENTER",
    "SPACE",
    "ESCAPE",
    "HOME",
    "END",
    "PAGEUP",
    "PAGEDOWN",
  ]
  let currentFocusedElement = null
  let mouseClick = null

  window.addEventListener("keydown", (event) => {
    if (navKeys.includes(event.code.toUpperCase())) {
      mouseClick = false
    }
  })

  window.addEventListener("mousedown", (event) => {
    mouseClick = true
  })

  window.addEventListener(
    "focus",
    () => {
      if (currentFocusedElement) currentFocusedElement.classList.remove("focused")

      if (mouseClick) return

      currentFocusedElement = document.activeElement
      currentFocusedElement.classList.add("focused")
    },
    true,
  )
}

function pauseAllMedia() {
  document.querySelectorAll(".js-youtube").forEach((video) => {
    video.contentWindow.postMessage('{"event":"command","func":"' + "pauseVideo" + '","args":""}', "*")
  })
  document.querySelectorAll(".js-vimeo").forEach((video) => {
    video.contentWindow.postMessage('{"method":"pause"}', "*")
  })
  document.querySelectorAll("video").forEach((video) => video.pause())
  document.querySelectorAll("product-model").forEach((model) => {
    if (model.modelViewerUI) model.modelViewerUI.pause()
  })
}

function removeTrapFocus(elementToFocus = null) {
  document.removeEventListener("focusin", trapFocusHandlers.focusin)
  document.removeEventListener("focusout", trapFocusHandlers.focusout)
  document.removeEventListener("keydown", trapFocusHandlers.keydown)

  if (elementToFocus) elementToFocus.focus()
}

function onKeyUpEscape(event) {
  if (event.code.toUpperCase() !== "ESCAPE") return

  const openDetailsElement = event.target.closest("details[open]")
  if (!openDetailsElement) return

  const summaryElement = openDetailsElement.querySelector("summary")
  openDetailsElement.removeAttribute("open")
  summaryElement.setAttribute("aria-expanded", false)
  summaryElement.focus()
}

class QuantityInput extends HTMLElement {
  constructor() {
    super()
    this.input = this.querySelector("input")
    this.changeEvent = new Event("change", { bubbles: true })

    this.querySelectorAll("button").forEach((button) => button.addEventListener("click", this.onButtonClick.bind(this)))
  }

  onButtonClick(event) {
    event.preventDefault()
    const previousValue = this.input.value

    event.target.name === "plus" ? this.input.stepUp() : this.input.stepDown()
    if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent)
  }
}

customElements.define("quantity-input", QuantityInput)

function debounce(fn, wait) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn.apply(this, args), wait)
  }
}

function throttle(fn, delay) {
  let timeoutID
  let lastExecTime = 0
  return function (...args) {
    const currentTime = Date.now()

    if (currentTime - lastExecTime > delay) {
      fn.apply(this, args)
      lastExecTime = currentTime
    } else {
      clearTimeout(timeoutID)
      timeoutID = setTimeout(
        () => {
          fn.apply(this, args)
          lastExecTime = Date.now()
        },
        delay - (currentTime - lastExecTime),
      )
    }
  }
}

function fetchConfig(type = "json") {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: `application/${type}` },
  }
}

/*
 * Shopify Common JS
 *
 */
if (typeof window.Shopify == "undefined") {
  window.Shopify = {}
}

window.Shopify = window.Shopify || {}

window.Shopify.bind = (fn, scope) => () => fn.apply(scope, arguments)

window.Shopify.setSelectorByValue = (selector, value) => {
  for (var i = 0, count = selector.options.length; i < count; i++) {
    var option = selector.options[i]
    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i
      return i
    }
  }
}

window.Shopify.addListener = (target, eventName, callback) => {
  target.addEventListener
    ? target.addEventListener(eventName, callback, false)
    : target.attachEvent("on" + eventName, callback)
}

window.Shopify.postLink = (path, options) => {
  options = options || {}
  var method = options["method"] || "post"
  var params = options["parameters"] || {}

  var form = document.createElement("form")
  form.setAttribute("method", method)
  form.setAttribute("action", path)

  for (var key in params) {
    var hiddenField = document.createElement("input")
    hiddenField.setAttribute("type", "hidden")
    hiddenField.setAttribute("name", key)
    hiddenField.setAttribute("value", params[key])
    form.appendChild(hiddenField)
  }
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

window.Shopify.CountryProvinceSelector = function (country_domid, province_domid, options) {
  this.countryEl = document.getElementById(country_domid)
  this.provinceEl = document.getElementById(province_domid)
  this.provinceContainer = document.getElementById(options["hideElement"] || province_domid)

  window.Shopify.addListener(this.countryEl, "change", window.Shopify.bind(this.countryHandler, this))

  this.initCountry()
  this.initProvince()
}

window.Shopify.CountryProvinceSelector.prototype = {
  initCountry: function () {
    var value = this.countryEl.getAttribute("data-default")
    window.Shopify.setSelectorByValue(this.countryEl, value)
    this.countryHandler()
  },

  initProvince: function () {
    var value = this.provinceEl.getAttribute("data-default")
    if (value && this.provinceEl.options.length > 0) {
      window.Shopify.setSelectorByValue(this.provinceEl, value)
    }
  },

  countryHandler: function (e) {
    var selectedOption = this.countryEl.options[this.countryEl.selectedIndex]
    var raw = selectedOption.getAttribute("data-provinces")
    var provinces = JSON.parse(raw)

    this.clearOptions(this.provinceEl)
    if (provinces && provinces.length == 0) {
      this.provinceContainer.style.display = "none"
    } else {
      for (var i = 0; i < provinces.length; i++) {
        var option = document.createElement("option")
        option.value = provinces[i][0]
        option.innerHTML = provinces[i][1]
        this.provinceEl.appendChild(option)
      }

      this.provinceContainer.style.display = ""
    }
  },

  clearOptions: (selector) => {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild)
    }
  },

  setOptions: (selector, values) => {
    for (var i = 0, count = values.length; i < values.length; i++) {
      var opt = document.createElement("option")
      opt.value = values[i]
      opt.innerHTML = values[i]
      selector.appendChild(opt)
    }
  },
}

class SliderComponent extends HTMLElement {
  constructor() {
    super()
    this.slider = this.querySelector('[id^="Slider-"]')
    this.sliderItems = this.querySelectorAll('[id^="Slide-"]')
    this.enableSliderLooping = false
    this.currentPageElement = this.querySelector(".slider-counter--current")
    this.pageTotalElement = this.querySelector(".slider-counter--total")
    this.prevButton = this.querySelector('button[name="previous"]')
    this.nextButton = this.querySelector('button[name="next"]')

    if (!this.slider || !this.nextButton) return

    this.initPages()
    const resizeObserver = new ResizeObserver((entries) => this.initPages())
    resizeObserver.observe(this.slider)

    this.slider.addEventListener("scroll", this.update.bind(this))
    this.prevButton.addEventListener("click", this.onButtonClick.bind(this))
    this.nextButton.addEventListener("click", this.onButtonClick.bind(this))
  }

  initPages() {
    this.sliderItemsToShow = Array.from(this.sliderItems).filter((element) => element.clientWidth > 0)
    if (this.sliderItemsToShow.length < 2) return
    this.sliderItemOffset = this.sliderItemsToShow[1].offsetLeft - this.sliderItemsToShow[0].offsetLeft
    this.slidesPerPage = Math.floor(
      (this.slider.clientWidth - this.sliderItemsToShow[0].offsetLeft) / this.sliderItemOffset,
    )
    this.totalPages = this.sliderItemsToShow.length - this.slidesPerPage + 1
    this.update()
  }

  resetPages() {
    this.sliderItems = this.querySelectorAll('[id^="Slide-"]')
    this.initPages()
  }

  update() {
    // Temporarily prevents unneeded updates resulting from variant changes
    // This should be refactored as part of https://github.com/Shopify/dawn/issues/2057
    if (!this.slider || !this.nextButton) return

    const previousPage = this.currentPage
    this.currentPage = Math.round(this.slider.scrollLeft / this.sliderItemOffset) + 1

    if (this.currentPageElement && this.pageTotalElement) {
      this.currentPageElement.textContent = this.currentPage
      this.pageTotalElement.textContent = this.totalPages
    }

    if (this.currentPage != previousPage) {
      this.dispatchEvent(
        new CustomEvent("slideChanged", {
          detail: {
            currentPage: this.currentPage,
            currentElement: this.sliderItemsToShow[this.currentPage - 1],
          },
        }),
      )
    }

    if (this.enableSliderLooping) return

    if (this.isSlideVisible(this.sliderItemsToShow[0]) && this.slider.scrollLeft === 0) {
      this.prevButton.setAttribute("disabled", "disabled")
    } else {
      this.prevButton.removeAttribute("disabled")
    }

    if (this.isSlideVisible(this.sliderItemsToShow[this.sliderItemsToShow.length - 1])) {
      this.nextButton.setAttribute("disabled", "disabled")
    } else {
      this.nextButton.removeAttribute("disabled")
    }
  }

  isSlideVisible(element, offset = 0) {
    const lastVisibleSlide = this.slider.clientWidth + this.slider.scrollLeft - offset
    return element.offsetLeft + element.clientWidth <= lastVisibleSlide && element.offsetLeft >= this.slider.scrollLeft
  }

  onButtonClick(event) {
    event.preventDefault()
    const step = event.currentTarget.dataset.step || 1
    this.slideScrollPosition =
      event.currentTarget.name === "next"
        ? this.slider.scrollLeft + step * this.sliderItemOffset
        : this.slider.scrollLeft - step * this.sliderItemOffset
    this.setSlidePosition(this.slideScrollPosition)
  }

  setSlidePosition(position) {
    this.slider.scrollTo({
      left: position,
    })
  }
}

customElements.define("slider-component", SliderComponent)
