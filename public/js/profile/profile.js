/*!
 * A11yTab v2.0.3
 * (c) 2017-2018 Azin Asili <hello@azinasili.com>
 * MIT License.
 */

window.onload = () => {
  handlediv = document.getElementById("faint-handle")
  handle = handlediv.firstChild.data.trim()
  if(handle.length > 12)
  {
    handlediv.style.fontSize = '3rem'
    handlediv.style.right = '20vw'
  }
  if (handle.length > 15) 
  {
    handlediv.style.fontSize = '2rem'
    handlediv.style.right = '20vw'
  }
}

var A11yTab = (function () {
  "use strict";

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _toConsumableArray(arr) {
    return (
      _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
    );
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)
        arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (
      Symbol.iterator in Object(iter) ||
      Object.prototype.toString.call(iter) === "[object Arguments]"
    )
      return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var A11yTab = (function () {
    function a(b) {
      _classCallCheck(this, a);
      (this.settings = Object.assign(
        {},
        {
          selector: null,
          tabFocus: null,
          tabBlur: null,
          tabPanelFocus: null,
          tabPanelBlur: null,
          focusOnLoad: !1,
          afterFocusFunction: null,
          beforeBlurFunction: null,
          addEvents: !1,
          eventAfterFocus: "a11ytab:afterFocus",
          eventBeforeBlur: "a11ytab:beforeBlur",
          hashNavigation: !1,
          tabToFocus: null,
        },
        b
      )),
        (this.tabList = this.settings.selector),
        (this.tabs = _toConsumableArray(
          this.tabList.querySelectorAll("[data-a11ytab-tab]")
        )),
        (this.tabPanels = this.tabs.map(function (a) {
          return document.querySelector(a.getAttribute("href"));
        }));
    }
    return (
      _createClass(
        a,
        [
          {
            key: "init",
            value: function f() {
              var a =
                  0 < arguments.length && void 0 !== arguments[0]
                    ? arguments[0]
                    : this.settings.tabToFocus,
                b = this.constructor.isBoolean,
                c = this.settings.focusOnLoad,
                d = !!(c && b(c)) && c,
                e = a
                  ? this.tabs.find(function (b) {
                      return b === a;
                    })
                  : this.tabs[0];
              return this.loaded
                ? this
                : (this.settings.hashNavigation &&
                    window.location.hash &&
                    (e =
                      this.tabs.find(function (a) {
                        return a.getAttribute("href") === window.location.hash;
                      }) || e),
                  (this.selected = {
                    tab: e,
                    panel: this.tabPanels.find(function (a) {
                      return a.getAttribute("id") === e.getAttribute("href");
                    }),
                  }),
                  this.addARIA(),
                  this.focus(this.selected.tab, d),
                  this.addEvents(),
                  (this.loaded = !0),
                  this);
            },
          },
          {
            key: "destroy",
            value: function a() {
              return this.loaded
                ? ((this.selected = {}),
                  this.disableTab(),
                  this.disablePanel(),
                  this.removeARIA(),
                  this.removeEvents(),
                  (this.loaded = !1),
                  this)
                : this;
            },
          },
          {
            key: "prev",
            value: function d() {
              var a = this.constructor.findIndex,
                b = a(this.tabs).prev,
                c = this.tabs[b];
              return this.focus(c), this;
            },
          },
          {
            key: "next",
            value: function d() {
              var a = this.constructor.findIndex,
                b = a(this.tabs).next,
                c = this.tabs[b];
              return this.focus(c), this;
            },
          },
          {
            key: "focus",
            value: function e() {
              var a =
                  0 < arguments.length && void 0 !== arguments[0]
                    ? arguments[0]
                    : null,
                b =
                  !(1 < arguments.length && void 0 !== arguments[1]) ||
                  arguments[1],
                c = this.constructor.isBoolean,
                d = !!(b && c(b)) && b;
              return a && (this.activateTab(a, d), this.activatePanel(a)), this;
            },
          },
          {
            key: "addARIA",
            value: function b() {
              var a = this;
              this.tabList.setAttribute("role", "tablist"),
                this.tabs.forEach(function (a) {
                  var b = a.getAttribute("href").slice(1);
                  a.setAttribute("role", "tab"),
                    a.setAttribute("aria-selected", !1),
                    a.setAttribute("aria-controls", b),
                    a.setAttribute("tabindex", -1);
                }),
                this.tabPanels.forEach(function (b, c) {
                  var d = a.tabs[c].getAttribute("id");
                  b.setAttribute("role", "tabpanel"),
                    b.setAttribute("aria-hidden", !0),
                    b.setAttribute("aria-labelledby", d);
                });
            },
          },
          {
            key: "removeARIA",
            value: function a() {
              this.tabList.removeAttribute("role"),
                this.tabs.forEach(function (a) {
                  a.removeAttribute("role"),
                    a.removeAttribute("aria-selected"),
                    a.removeAttribute("aria-controls"),
                    a.removeAttribute("tabindex");
                }),
                this.tabPanels.forEach(function (a) {
                  a.removeAttribute("role"),
                    a.removeAttribute("aria-hidden"),
                    a.removeAttribute("aria-labelledby");
                });
            },
          },
          {
            key: "activateTab",
            value: function q(a) {
              var b =
                !(1 < arguments.length && void 0 !== arguments[1]) ||
                arguments[1];
              this.disableTab();
              var c = document.URL,
                d = c.substring(c.indexOf("#")),
                e = this.constructor,
                f = e.fireEvent,
                g = e.isFunction,
                h = e.isString,
                i = e.isBoolean,
                j = this.settings,
                k = j.addEvents,
                l = j.afterFocusFunction,
                m = j.eventAfterFocus,
                n = j.hashNavigation,
                o = j.tabBlur,
                p = j.tabFocus;
              o && h(o) && a.classList.remove(o),
                p && h(p) && a.classList.add(p),
                b && i(b) && a.focus(),
                a.setAttribute("tabindex", 0),
                a.setAttribute("aria-selected", !0),
                (this.selected.tab = a),
                n && i(n) && (window.location.hash = a.getAttribute("href")),
                n && i(n) && d === a.getAttribute("id") && a.focus(),
                this.loaded && k && m && i(k) && h(m) && f(m),
                this.loaded && l && g(l) && l();
            },
          },
          {
            key: "activatePanel",
            value: function g(a) {
              this.disablePanel();
              var b = this.constructor.isString,
                c = this.settings,
                d = c.tabPanelBlur,
                e = c.tabPanelFocus,
                f = this.tabPanels.find(function (b) {
                  return (
                    b.getAttribute("id") === a.getAttribute("aria-controls")
                  );
                });
              d && b(d) && f.classList.remove(d),
                e && b(e) && f.classList.add(e),
                f.setAttribute("aria-hidden", !1),
                (this.selected.panel = f);
            },
          },
          {
            key: "disableTab",
            value: function l() {
              var a = this.constructor,
                b = a.fireEvent,
                c = a.isFunction,
                d = a.isString,
                e = a.isBoolean,
                f = this.settings,
                g = f.addEvents,
                h = f.beforeBlurFunction,
                i = f.eventBeforeBlur,
                j = f.tabFocus,
                k = f.tabBlur;
              this.tabs.forEach(function (a) {
                j && d(j) && a.classList.remove(j),
                  k && d(k) && a.classList.add(k),
                  a.setAttribute("tabindex", -1),
                  a.setAttribute("aria-selected", !1);
              }),
                this.loaded && g && i && e(g) && d(i) && b(i),
                this.loaded && h && c(h) && h();
            },
          },
          {
            key: "disablePanel",
            value: function e() {
              var a = this.constructor.isString,
                b = this.settings,
                c = b.tabPanelBlur,
                d = b.tabPanelFocus;
              this.tabPanels.forEach(function (b) {
                d && a(d) && b.classList.remove(d),
                  c && a(c) && b.classList.add(c),
                  b.setAttribute("aria-hidden", !0);
              });
            },
          },
          {
            key: "addEvents",
            value: function b() {
              var a = this;
              this.tabs.forEach(function (b) {
                b.addEventListener("click", a, !1),
                  b.addEventListener("keydown", a, !1);
              });
            },
          },
          {
            key: "removeEvents",
            value: function b() {
              var a = this;
              this.tabs.forEach(function (b) {
                b.removeEventListener("click", a, !1),
                  b.removeEventListener("keydown", a, !1);
              });
            },
          },
          {
            key: "handleClickEvent",
            value: function c(a) {
              var b = a.target;
              a.preventDefault(), this.focus(b);
            },
          },
          {
            key: "handleKeydownEvent",
            value: function b(a) {
              if (!(a.metaKey || a.altKey))
                switch (a.which) {
                  case 37:
                  case 38:
                    a.preventDefault(), this.prev();
                    break;
                  case 39:
                  case 40:
                    a.preventDefault(), this.next();
                    break;
                  default:
                }
            },
          },
          {
            key: "handleEvent",
            value: function b(a) {
              switch (a.type) {
                case "click":
                  this.handleClickEvent(a);
                  break;
                case "keydown":
                  this.handleKeydownEvent(a);
                  break;
                default:
              }
            },
          },
        ],
        [
          {
            key: "isFunction",
            value: function b(a) {
              return a && "[object Function]" === {}.toString.call(a);
            },
          },
          {
            key: "isString",
            value: function b(a) {
              return a && "[object String]" === {}.toString.call(a);
            },
          },
          {
            key: "isBoolean",
            value: function b(a) {
              return a && "[object Boolean]" === {}.toString.call(a);
            },
          },
          {
            key: "findIndex",
            value: function e(a) {
              var b, c, d;
              return (
                a.filter(function (a, e) {
                  return (
                    "true" === a.getAttribute("aria-selected") &&
                      ((b = e), (c = e - 1), (d = e + 1)),
                    !0
                  );
                }),
                -1 === c && (c = a.length - 1),
                d === a.length && (d = 0),
                { current: b, prev: c, next: d }
              );
            },
          },
          {
            key: "fireEvent",
            value: function c(a) {
              var b = new CustomEvent(a, { bubbles: !0, cancelable: !0 });
              document.dispatchEvent(b);
            },
          },
        ]
      ),
      a
    );
  })();

  return A11yTab;
})();

const tabEl = document.querySelectorAll(".tab-buttons");

// Initialize A11yTab on each element
// All options are shown
for (let i = 0; i < tabEl.length; i++) {
  const tabs = new A11yTab({
    selector: tabEl[i],
    tabPanelFocus: "tab-panel--is-active",
    tabPanelBlur: "tab-panel--is-disabled",
    tabFocus: "tab-button--is-active",
    tabBlur: "tab-button--is-disabled",
  });
  tabs.init();
}

//  Experience Tab Accordion
var acc = document.getElementsByClassName("column");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panelexp = this.nextElementSibling;
    if (panelexp.style.display === "block") {
      panelexp.style.display = "none";
    } else {
      panelexp.style.display = "block";
    }
  });
}
