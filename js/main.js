



(function (d) {
  var g = {
    type: "html",
    content: "",
    url: "",
    ajax: {},
    ajax_request: null,
    closeOnEsc: !0,
    closeOnOverlayClick: !0,
    clone: !1,
    overlay: {
      block: void 0,
      tpl: '<div class="arcticmodal-overlay"></div>',
      css: {
        backgroundColor: "#000",
        opacity: 0.6
      }
    },
    container: {
      block: void 0,
      tpl: '<div class="arcticmodal-container"><table class="arcticmodal-container_i"><tr><td class="arcticmodal-container_i2"></td></tr></table></div>'
    },
    wrap: void 0,
    body: void 0,
    errors: {
      tpl: '<div class="arcticmodal-error arcticmodal-close"></div>',
      autoclose_delay: 2E3,
      ajax_unsuccessful_load: "Error"
    },
    openEffect: {
      type: "fade",
      speed: 400
    },
    closeEffect: {
      type: "fade",
      speed: 400
    },
    beforeOpen: d.noop,
    afterOpen: d.noop,
    beforeClose: d.noop,
    afterClose: d.noop,
    afterLoading: d.noop,
    afterLoadingOnShow: d.noop,
    errorLoading: d.noop
  },
    j = 0,
    e = d([]),
    m = {
      isEventOut: function (a, b) {
        var c = !0;
        d(a).each(function () {
          d(b.target).get(0) == d(this).get(0) && (c = !1);
          0 == d(b.target).closest("HTML", d(this).get(0)).length && (c = !1)
        });
        return c
      }
    },
    f = {
      getParentEl: function (a) {
        var b = d(a);
        return b.data("arcticmodal") ? b : (b =
          d(a).closest(".arcticmodal-container").data("arcticmodalParentEl")) ? b : !1
      },
      transition: function (a, b, c, e) {
        e = void 0 == e ? d.noop : e;
        switch (c.type) {
          case "fade":
            "show" == b ? a.fadeIn(c.speed, e) : a.fadeOut(c.speed, e);
            break;
          case "none":
            "show" == b ? a.show() : a.hide(), e()
        }
      },
      prepare_body: function (a, b) {
        d(".arcticmodal-close", a.body).unbind("click.arcticmodal").bind("click.arcticmodal", function () {
          b.arcticmodal("close");
          return !1
        })
      },
      init_el: function (a, b) {
        var c = a.data("arcticmodal");
        if (!c) {
          c = b;
          j++;
          c.modalID = j;
          c.overlay.block =
            d(c.overlay.tpl);
          c.overlay.block.css(c.overlay.css);
          c.container.block = d(c.container.tpl);
          c.body = d(".arcticmodal-container_i2", c.container.block);
          b.clone ? c.body.html(a.clone(!0)) : (a.before('<div id="arcticmodalReserve' + c.modalID + '" style="display: none" />'), c.body.html(a));
          f.prepare_body(c, a);
          c.closeOnOverlayClick && c.overlay.block.add(c.container.block).click(function (b) {
            m.isEventOut(d(">*", c.body), b) && a.arcticmodal("close")
          });
          c.container.block.data("arcticmodalParentEl", a);
          a.data("arcticmodal", c);
          e = d.merge(e, a);
          d.proxy(h.show, a)();
          if ("html" == c.type) return a;
          if (void 0 != c.ajax.beforeSend) {
            var k = c.ajax.beforeSend;
            delete c.ajax.beforeSend
          }
          if (void 0 != c.ajax.success) {
            var g = c.ajax.success;
            delete c.ajax.success
          }
          if (void 0 != c.ajax.error) {
            var l = c.ajax.error;
            delete c.ajax.error
          }
          var n = d.extend(!0, {
            url: c.url,
            beforeSend: function () {
              void 0 == k ? c.body.html('<div class="arcticmodal-loading" />') : k(c, a)
            },
            success: function (b) {
              a.trigger("afterLoading");
              c.afterLoading(c, a, b);
              void 0 == g ? c.body.html(b) : g(c, a, b);
              f.prepare_body(c,
                a);
              a.trigger("afterLoadingOnShow");
              c.afterLoadingOnShow(c, a, b)
            },
            error: function () {
              a.trigger("errorLoading");
              c.errorLoading(c, a);
              void 0 == l ? (c.body.html(c.errors.tpl), d(".arcticmodal-error", c.body).html(c.errors.ajax_unsuccessful_load), d(".arcticmodal-close", c.body).click(function () {
                a.arcticmodal("close");
                return !1
              }), c.errors.autoclose_delay && setTimeout(function () {
                a.arcticmodal("close")
              }, c.errors.autoclose_delay)) : l(c, a)
            }
          }, c.ajax);
          c.ajax_request = d.ajax(n);
          a.data("arcticmodal", c)
        }
      },
      init: function (a) {
        a =
          d.extend(!0, {}, g, a);
        if (d.isFunction(this))
          if (void 0 == a) d.error("jquery.arcticmodal: Uncorrect parameters");
          else if ("" == a.type) d.error('jquery.arcticmodal: Don\'t set parameter "type"');
          else switch (a.type) {
            case "html":
              if ("" == a.content) {
                d.error('jquery.arcticmodal: Don\'t set parameter "content"');
                break
              }
              var b = a.content;
              a.content = "";
              return f.init_el(d(b), a);
            case "ajax":
              if ("" == a.url) {
                d.error('jquery.arcticmodal: Don\'t set parameter "url"');
                break
              }
              return f.init_el(d("<div />"), a)
          } else return this.each(function () {
            f.init_el(d(this),
              d.extend(!0, {}, a))
          })
      }
    },
    h = {
      show: function () {
        var a = f.getParentEl(this);
        if (!1 === a) d.error("jquery.arcticmodal: Uncorrect call");
        else {
          var b = a.data("arcticmodal");
          b.overlay.block.hide();
          b.container.block.hide();
          d("BODY").append(b.overlay.block);
          d("BODY").append(b.container.block);
          b.beforeOpen(b, a);
          a.trigger("beforeOpen");
          if ("hidden" != b.wrap.css("overflow")) {
            b.wrap.data("arcticmodalOverflow", b.wrap.css("overflow"));
            var c = b.wrap.outerWidth(!0);
            b.wrap.css("overflow", "hidden");
            var g = b.wrap.outerWidth(!0);
            g !=
              c && b.wrap.css("marginRight", g - c + "px")
          }
          e.not(a).each(function () {
            d(this).data("arcticmodal").overlay.block.hide()
          });
          f.transition(b.overlay.block, "show", 1 < e.length ? {
            type: "none"
          } : b.openEffect);
          f.transition(b.container.block, "show", 1 < e.length ? {
            type: "none"
          } : b.openEffect, function () {
            b.afterOpen(b, a);
            a.trigger("afterOpen")
          });
          return a
        }
      },
      close: function () {
        if (d.isFunction(this)) e.each(function () {
          d(this).arcticmodal("close")
        });
        else return this.each(function () {
          var a = f.getParentEl(this);
          if (!1 === a) d.error("jquery.arcticmodal: Uncorrect call");
          else {
            var b = a.data("arcticmodal");
            !1 !== b.beforeClose(b, a) && (a.trigger("beforeClose"), e.not(a).last().each(function () {
              d(this).data("arcticmodal").overlay.block.show()
            }), f.transition(b.overlay.block, "hide", 1 < e.length ? {
              type: "none"
            } : b.closeEffect), f.transition(b.container.block, "hide", 1 < e.length ? {
              type: "none"
            } : b.closeEffect, function () {
              b.afterClose(b, a);
              a.trigger("afterClose");
              b.clone || d("#arcticmodalReserve" + b.modalID).replaceWith(b.body.find(">*"));
              b.overlay.block.remove();
              b.container.block.remove();
              a.data("arcticmodal",
                null);
              d(".arcticmodal-container").length || (b.wrap.data("arcticmodalOverflow") && b.wrap.css("overflow", b.wrap.data("arcticmodalOverflow")), b.wrap.css("marginRight", 0))
            }), "ajax" == b.type && b.ajax_request.abort(), e = e.not(a))
          }
        })
      },
      setDefault: function (a) {
        d.extend(!0, g, a)
      }
    };
  d(function () {
    g.wrap = d(document.all && !document.querySelector ? "html" : "body")
  });
  d(document).bind("keyup.arcticmodal", function (a) {
    var b = e.last();
    b.length && b.data("arcticmodal").closeOnEsc && 27 === a.keyCode && b.arcticmodal("close")
  });
  d.arcticmodal =
    d.fn.arcticmodal = function (a) {
      if (h[a]) return h[a].apply(this, Array.prototype.slice.call(arguments, 1));
      if ("object" === typeof a || !a) return f.init.apply(this, arguments);
      d.error("jquery.arcticmodal: Method " + a + " does not exist")
    }
})(jQuery);
! function (i) {
  i.fn.parallax = function (n) {
    var n = i.extend({
      useHTML: !0,
      elements: []
    }, n || {});
    i(n.useHTML ? "html" : this).mousemove(function (e) {
      for (var t = i(this), o = {
        x: Math.floor(parseInt(t.width()) / 2),
        y: Math.floor(parseInt(t.height()) / 2)
      }, r = {
        x: e.pageX - t.offset().left,
        y: e.pageY - t.offset().top
      }, s = {
        x: r.x - o.x,
        y: r.y - o.y
      }, a = n.elements.length - 1; a >= 0; a--) {
        var p, m, u = {};
        for (var x in n.elements[a].properties.x) m = n.elements[a].properties.x[x], p = m.initial + s.x * m.multiplier, "min" in m && p < m.min ? p = m.min : "max" in m && p > m.max && (p = m.max), "invert" in m && m.invert && (p = -p), "unit" in m || (m.unit = "px"), u[x] = p + m.unit;
        for (var x in n.elements[a].properties.y) m = n.elements[a].properties.y[x], p = m.initial + s.y * m.multiplier, "min" in m && p < m.min ? p = m.min : "max" in m && p > m.max && (p = m.max), "invert" in m && m.invert && (p = -p), "unit" in m || (m.unit = "px"), u[x] = p + m.unit;
        ("background-position-x" in u || "background-position-y" in u) && (u["background-position"] = "" + ("background-position-x" in u ? u["background-position-x"] : "0px") + " " + ("background-position-y" in u ? u["background-position-y"] : "0px"), delete u["background-position-x"], delete u["background-position-y"]), i(n.elements[a].selector).css(u)
      }
    })
  }
}(jQuery);
$(document).ready(function () {
  if ($(window).width() > 960) {
    $window = $(window);
    $('[data-type="background"]').each(function () {
      var $bgobj = $(this);
      $(window).scroll(function () {
        var yPos = -($window.scrollTop() / $bgobj.data('speed'));
        var coords = '50% ' + yPos + 'px';
        $bgobj.css({
          backgroundPosition: coords
        });
      });
    });
  }
});;
$(function () {
  var $hamburger = $(".hamburger");
  $hamburger.on("click", function (e) {
    $hamburger.toggleClass("is-active");
    $('.menu-collapse').toggleClass('d-none').css('order', '1');
    $('.header-up__menu').toggleClass('menu-opened');
  });
  var $hamburger2 = $(".hamburger2");
  $hamburger2.on("click", function (e) {
    $hamburger2.toggleClass("is-active");
    $('.menu-collapse2').toggleClass('d-none').css('order', '1');
    $('.header-up__menu2').toggleClass('menu-opened2');
  });
  $('.menu2 li').click(function () {
    $('.header-up__menu').removeClass('menu-opened');
    $hamburger.toggleClass("is-active");
  });
  $('.menu3 li').click(function () {
    $('.header-up__menu2').removeClass('menu-opened2');
    $hamburger2.toggleClass("is-active");
  });
  $('.scroll-menu').click(function () {
    elementClick = $(this).attr("href");
    destination = $(elementClick).offset().top;
    $("body,html").animate({
      scrollTop: destination
    }, 1000);
  })
  var topMenu = jQuery("#menu2"),
    offset = 0,
    topMenuHeight = topMenu.outerHeight() + offset,
    menuItems = topMenu.find('a[href*="#"]'),
    scrollItems = menuItems.map(function () {
      var href = jQuery(this).attr("href"),
        id = href.substring(href.indexOf('#')),
        item = jQuery(id);
      if (item.length) {
        return item;
      }
    });
  menuItems.click(function (e) {
    var href = jQuery(this).attr("href"),
      id = href.substring(href.indexOf('#'));
    offsetTop = href === "#" ? 0 : jQuery(id).offset().top - topMenuHeight + 1;
    jQuery('html, body').stop().animate({
      scrollTop: offsetTop
    }, 1000);
    e.preventDefault();
  });
  jQuery(window).scroll(function () {
    var fromTop = jQuery(this).scrollTop() + topMenuHeight;
    var cur = scrollItems.map(function () {
      if (jQuery(this).offset().top < fromTop)
        return this;
    });
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";
    menuItems.parents('li').removeClass("menu-active");
    if (id) {
      menuItems.parents('li').end().filter("[href*='#" + id + "']").parents('li').addClass("menu-active");
    }
  })
  $(document).ready(function () {
    var $menu = $("#menu2");
    $(window).scroll(function () {
      if ($(window).width() > '319') {
        if ($(this).scrollTop() > 500 && $menu.hasClass("default")) {
          $menu.removeClass("default").addClass("fixed");
        } else if ($(this).scrollTop() <= 500 && $menu.hasClass("fixed")) {
          $menu.removeClass("fixed").addClass("default");
        }
      }
    });
  });
  $(".wood-plans__title__select").on("click", function () {
    $(".wood-plans__title__select").removeClass('wood-plans__title__select_active');
    $(".plans-block__item").removeClass("plans-block__item_active");
    $(this).addClass('wood-plans__title__select_active');
    $(".plans-block__item").eq($(this).index()).addClass("plans-block__item_active");
    $('.plans-slider3').slick('slickNext');
    $('.plans-slider2').slick('slickNext');
    $('.plans-slider1').slick('slickNext');
  })

  if ($('.plans-slider')) {
    $('.plans-slider').slick({
      autoplay: true,
      prevArrow: '<div class="plans-slider__prev"></div>',
      nextArrow: '<div class="plans-slider__next"></div>',
      dots: false,
      autoplaySpeed: 1500,
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      },]
    })
  }

  if ($('.plans-slider2')) {
    $('.plans-slider2').slick({
      autoplay: true,
      prevArrow: '<div class="plans-slider__prev"></div>',
      nextArrow: '<div class="plans-slider__next"></div>',
      dots: false,
      autoplaySpeed: 1500,
      arrows: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      },]
    })
  }

  if ($('.plans-slider3')) {
    $('.plans-slider3').slick({
      autoplay: true,
      prevArrow: '<div class="plans-slider__prev"></div>',
      nextArrow: '<div class="plans-slider__next"></div>',
      dots: false,
      autoplaySpeed: 1500,
      arrows: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      infinite: true,
      responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      },]
    })
  }

  if ($('.plans-slider4')) {
    $('.plans-slider4').slick({
      autoplay: true,
      prevArrow: '<div class="plans-slider__prev"></div>',
      nextArrow: '<div class="plans-slider__next"></div>',
      dots: false,
      autoplaySpeed: 1500,
      arrows: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      infinite: true,
      responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      },]
    })
  }

  if ($('.plans-slider5')) {
    $('.plans-slider5').slick({
      autoplay: true,
      prevArrow: '<div class="plans-slider__prev"></div>',
      nextArrow: '<div class="plans-slider__next"></div>',
      dots: false,
      autoplaySpeed: 1500,
      arrows: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      infinite: true,
      responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      },]
    })
  }

  $('.modal-floor__img').slick({
    autoplay: false,
    prevArrow: '<div class="plans-slider__prev"></div>',
    nextArrow: '<div class="plans-slider__next"></div>',
    dots: false,
    autoplaySpeed: 1500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true
  })
  $('.plans-slider').on('click', '.plans-btn1', function (e) {
    e.preventDefault();

    $(this).closest('.plans-slider__item').find('#exampleModal1').arcticmodal();
  });
  $('.call-btn').click(function (e) {
    e.preventDefault();
    $('#exampleModal').arcticmodal();
  });
  $('.plans-btn3').click(function (e) {
    e.preventDefault();
    $('#exampleModal3').arcticmodal();
    $('.modal-floor__img').slick('setPosition');
  });
  $('.plans-btn4').click(function (e) {
    e.preventDefault();
    $('#exampleModal4').arcticmodal();
  });
  $('.plans-btn41').click(function (e) {
    e.preventDefault();
    $('#exampleModal41').arcticmodal();
  });
  $('.plans-btn4pp').click(function (e) {
    e.preventDefault();
    $('#exampleModal4pp').arcticmodal();
  });
  if ($(window).width() > 960) {
    $('body').parallax({
      'elements': [{
        'selector': '.header-amimate',
        'properties': {
          'x': {
            'left': {
              'initial': 160,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 150,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1200) {
    $('body').parallax({
      'elements': [{
        'selector': '.header-amimate',
        'properties': {
          'x': {
            'left': {
              'initial': 60,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 150,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1200) {
    $('body').parallax({
      'elements': [{
        'selector': '.wood-plans__amimate',
        'properties': {
          'x': {
            'left': {
              'initial': 370,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 350,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1400) {
    $('body').parallax({
      'elements': [{
        'selector': '.wood-plans__amimate',
        'properties': {
          'x': {
            'left': {
              'initial': 200,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 350,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1510) {
    $('body').parallax({
      'elements': [{
        'selector': '.wood-plans__amimate',
        'properties': {
          'x': {
            'left': {
              'initial': 140,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 350,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1675) {
    $('body').parallax({
      'elements': [{
        'selector': '.wood-plans__amimate',
        'properties': {
          'x': {
            'left': {
              'initial': 60,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 350,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1200) {
    $('body').parallax({
      'elements': [{
        'selector': '.wood-text__amimate',
        'properties': {
          'x': {
            'left': {
              'initial': 120,
              'multiplier': 0.02,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 550,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1300) {
    $('body').parallax({
      'elements': [{
        'selector': '.wood-text__amimate',
        'properties': {
          'x': {
            'left': {
              'initial': 80,
              'multiplier': 0.02,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 550,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1390) {
    $('body').parallax({
      'elements': [{
        'selector': '.wood-text__amimate',
        'properties': {
          'x': {
            'left': {
              'initial': 30,
              'multiplier': 0.02,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 550,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1500) {
    $('body').parallax({
      'elements': [{
        'selector': '.wood-text__amimate',
        'properties': {
          'x': {
            'left': {
              'initial': -40,
              'multiplier': 0.02,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 550,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1610) {
    $('body').parallax({
      'elements': [{
        'selector': '.wood-text__amimate',
        'properties': {
          'x': {
            'left': {
              'initial': -80,
              'multiplier': 0.02,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 550,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1700) {
    $('body').parallax({
      'elements': [{
        'selector': '.wood-text__amimate',
        'properties': {
          'x': {
            'left': {
              'initial': -130,
              'multiplier': 0.02,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 550,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1750) {
    $('body').parallax({
      'elements': [{
        'selector': '.wood-text__amimate',
        'properties': {
          'x': {
            'left': {
              'initial': -160,
              'multiplier': 0.02,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 550,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1840) {
    $('body').parallax({
      'elements': [{
        'selector': '.wood-text__amimate',
        'properties': {
          'x': {
            'left': {
              'initial': -200,
              'multiplier': 0.02,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 550,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1200) {
    $('body').parallax({
      'elements': [{
        'selector': '.wood-specifications__amimate',
        'properties': {
          'x': {
            'left': {
              'initial': -40,
              'multiplier': 0.02,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 630,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1300) {
    $('body').parallax({
      'elements': [{
        'selector': '.wood-specifications__amimate',
        'properties': {
          'x': {
            'left': {
              'initial': -100,
              'multiplier': 0.02,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 630,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1510) {
    $('body').parallax({
      'elements': [{
        'selector': '.wood-specifications__amimate',
        'properties': {
          'x': {
            'left': {
              'initial': -200,
              'multiplier': 0.02,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 630,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1710) {
    $('body').parallax({
      'elements': [{
        'selector': '.wood-specifications__amimate',
        'properties': {
          'x': {
            'left': {
              'initial': -300,
              'multiplier': 0.02,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 630,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1840) {
    $('body').parallax({
      'elements': [{
        'selector': '.wood-specifications__amimate',
        'properties': {
          'x': {
            'left': {
              'initial': -370,
              'multiplier': 0.02,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 630,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1200) {
    $('body').parallax({
      'elements': [{
        'selector': '.metro-objects-amimate',
        'properties': {
          'x': {
            'right': {
              'initial': -60,
              'multiplier': 0.02,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 630,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1360) {
    $('body').parallax({
      'elements': [{
        'selector': '.metro-objects-amimate',
        'properties': {
          'x': {
            'right': {
              'initial': -130,
              'multiplier': 0.02,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 630,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1490) {
    $('body').parallax({
      'elements': [{
        'selector': '.metro-objects-amimate',
        'properties': {
          'x': {
            'right': {
              'initial': -200,
              'multiplier': 0.02,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 630,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1650) {
    $('body').parallax({
      'elements': [{
        'selector': '.metro-objects-amimate',
        'properties': {
          'x': {
            'right': {
              'initial': -260,
              'multiplier': 0.02,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 630,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1740) {
    $('body').parallax({
      'elements': [{
        'selector': '.metro-objects-amimate',
        'properties': {
          'x': {
            'right': {
              'initial': -320,
              'multiplier': 0.02,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 630,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1860) {
    $('body').parallax({
      'elements': [{
        'selector': '.metro-objects-amimate',
        'properties': {
          'x': {
            'right': {
              'initial': -360,
              'multiplier': 0.02,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 630,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1200) {
    $('body').parallax({
      'elements': [{
        'selector': '.header-amimate2',
        'properties': {
          'x': {
            'left': {
              'initial': 370,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 150,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1400) {
    $('body').parallax({
      'elements': [{
        'selector': '.header-amimate2',
        'properties': {
          'x': {
            'left': {
              'initial': 200,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 150,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1510) {
    $('body').parallax({
      'elements': [{
        'selector': '.header-amimate2',
        'properties': {
          'x': {
            'left': {
              'initial': 140,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 150,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  if ($(window).width() > 1675) {
    $('body').parallax({
      'elements': [{
        'selector': '.header-amimate2',
        'properties': {
          'x': {
            'left': {
              'initial': 60,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          },
          'y': {
            'top': {
              'initial': 150,
              'multiplier': 0.04,
              'unit': 'px',
              'invert': true
            }
          }
        }
      }]
    });
  }
  $(window).scroll(function () {
    $('.an1').each(function () {
      var imagePos = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      if (imagePos < topOfWindow + 700) {
        $(this).addClass("fadeInLeft");
      }
    });
    $('.an2').each(function () {
      var imagePos = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      if (imagePos < topOfWindow + 700) {
        $(this).addClass("fadeInRight");
      }
    });
    $('.an3').each(function () {
      var imagePos = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      if (imagePos < topOfWindow + 700) {
        $(this).addClass("fadeInUp");
      }
    });
    $('.an4').each(function () {
      var imagePos = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      if (imagePos < topOfWindow + 700) {
        $(this).addClass("zoomIn");
      }
    });
  });
  var w = $(window).width();
  if (w <= 576) {
    $('.an1, .an2, .an3, .an4').removeClass("animated")
  };
});




(function () {
  const siteNavigation = document.getElementById('site-navigation');
  if (!siteNavigation) {
    return;
  }
  const button = siteNavigation.getElementsByTagName('button')[0];
  if ('undefined' === typeof button) {
    return;
  }
  const menu = siteNavigation.getElementsByTagName('ul')[0];
  if ('undefined' === typeof menu) {
    button.style.display = 'none';
    return;
  }
  if (!menu.classList.contains('nav-menu')) {
    menu.classList.add('nav-menu');
  }
  button.addEventListener('click', function () {
    siteNavigation.classList.toggle('toggled');
    if (button.getAttribute('aria-expanded') === 'true') {
      button.setAttribute('aria-expanded', 'false');
    } else {
      button.setAttribute('aria-expanded', 'true');
    }
  });
  document.addEventListener('click', function (event) {
    const isClickInside = siteNavigation.contains(event.target);
    if (!isClickInside) {
      siteNavigation.classList.remove('toggled');
      button.setAttribute('aria-expanded', 'false');
    }
  });
  const links = menu.getElementsByTagName('a');
  const linksWithChildren = menu.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a');
  for (const link of links) {
    link.addEventListener('focus', toggleFocus, true);
    link.addEventListener('blur', toggleFocus, true);
  }
  for (const link of linksWithChildren) {
    link.addEventListener('touchstart', toggleFocus, false);
  }

  function toggleFocus() {
    if (event.type === 'focus' || event.type === 'blur') {
      let self = this;
      while (!self.classList.contains('nav-menu')) {
        if ('li' === self.tagName.toLowerCase()) {
          self.classList.toggle('focus');
        }
        self = self.parentNode;
      }
    }
    if (event.type === 'touchstart') {
      const menuItem = this.parentNode;
      event.preventDefault();
      for (const link of menuItem.parentNode.children) {
        if (menuItem !== link) {
          link.classList.remove('focus');
        }
      }
      menuItem.classList.toggle('focus');
    }
  }
}());
/*! This file is auto-generated */
! function (d, l) {
  "use strict";
  var e = !1,
    n = !1;
  if (l.querySelector)
    if (d.addEventListener) e = !0;
  if (d.wp = d.wp || {}, !d.wp.receiveEmbedMessage)
    if (d.wp.receiveEmbedMessage = function (e) {
      var t = e.data;
      if (t)
        if (t.secret || t.message || t.value)
          if (!/[^a-zA-Z0-9]/.test(t.secret)) {
            for (var r, i, a, s = l.querySelectorAll('iframe[data-secret="' + t.secret + '"]'), n = l.querySelectorAll('blockquote[data-secret="' + t.secret + '"]'), o = new RegExp("^https?:$", "i"), c = 0; c < n.length; c++) n[c].style.display = "none";
            for (c = 0; c < s.length; c++)
              if (r = s[c], e.source === r.contentWindow) {
                if (r.removeAttribute("style"), "height" === t.message) {
                  if (1e3 < (a = parseInt(t.value, 10))) a = 1e3;
                  else if (~~a < 200) a = 200;
                  r.height = a
                }
                if ("link" === t.message)
                  if (i = l.createElement("a"), a = l.createElement("a"), i.href = r.getAttribute("src"), a.href = t.value, o.test(a.protocol))
                    if (a.host === i.host)
                      if (l.activeElement === r) d.top.location.href = t.value
              }
          }
    }, e) d.addEventListener("message", d.wp.receiveEmbedMessage, !1), l.addEventListener("DOMContentLoaded", t, !1), d.addEventListener("load", t, !1);

  function t() {
    if (!n) {
      n = !0;
      for (var e, t, r = -1 !== navigator.appVersion.indexOf("MSIE 10"), i = !!navigator.userAgent.match(/Trident.*rv:11\./), a = l.querySelectorAll("iframe.wp-embedded-content"), s = 0; s < a.length; s++) {
        if (!(e = a[s]).getAttribute("data-secret")) t = Math.random().toString(36).substr(2, 10), e.src += "#?secret=" + t, e.setAttribute("data-secret", t);
        if (r || i) (t = e.cloneNode(!0)).removeAttribute("security"), e.parentNode.replaceChild(t, e)
      }
    }
  }
}(window, document);