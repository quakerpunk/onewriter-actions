// BEGIN WRITE GOOD
var $jscomp = { scope: {} };
$jscomp.defineProperty =
  "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (a, b, c) {
        if (c.get || c.set)
          throw new TypeError("ES3 does not support getters and setters.");
        a != Array.prototype && a != Object.prototype && (a[b] = c.value);
      };
$jscomp.getGlobal = function (a) {
  return "undefined" != typeof window && window === a
    ? a
    : "undefined" != typeof global && null != global
    ? global
    : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
  $jscomp.initSymbol = function () {};
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function (a) {
  return $jscomp.SYMBOL_PREFIX + (a || "") + $jscomp.symbolCounter_++;
};
$jscomp.initSymbolIterator = function () {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[a] &&
    $jscomp.defineProperty(Array.prototype, a, {
      configurable: !0,
      writable: !0,
      value: function () {
        return $jscomp.arrayIterator(this);
      },
    });
  $jscomp.initSymbolIterator = function () {};
};
$jscomp.arrayIterator = function (a) {
  var b = 0;
  return $jscomp.iteratorPrototype(function () {
    return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
  });
};
$jscomp.iteratorPrototype = function (a) {
  $jscomp.initSymbolIterator();
  a = { next: a };
  a[$jscomp.global.Symbol.iterator] = function () {
    return this;
  };
  return a;
};
$jscomp.array = $jscomp.array || {};
$jscomp.iteratorFromArray = function (a, b) {
  $jscomp.initSymbolIterator();
  a instanceof String && (a += "");
  var c = 0,
    e = {
      next: function () {
        if (c < a.length) {
          var d = c++;
          return { value: b(d, a[d]), done: !1 };
        }
        e.next = function () {
          return { done: !0, value: void 0 };
        };
        return e.next();
      },
    };
  e[Symbol.iterator] = function () {
    return e;
  };
  return e;
};
$jscomp.polyfill = function (a, b, c, e) {
  if (b) {
    c = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
      var d = a[e];
      d in c || (c[d] = {});
      c = c[d];
    }
    a = a[a.length - 1];
    e = c[a];
    b = b(e);
    b != e &&
      null != b &&
      $jscomp.defineProperty(c, a, {
        configurable: !0,
        writable: !0,
        value: b,
      });
  }
};
$jscomp.polyfill(
  "Array.prototype.keys",
  function (a) {
    return a
      ? a
      : function () {
          return $jscomp.iteratorFromArray(this, function (a) {
            return a;
          });
        };
  },
  "es6-impl",
  "es3"
);
$jscomp.polyfill(
  "Object.getOwnPropertySymbols",
  function (a) {
    return a
      ? a
      : function () {
          return [];
        };
  },
  "es6-impl",
  "es5"
);
$jscomp.owns = function (a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
};
$jscomp.polyfill(
  "Object.assign",
  function (a) {
    return a
      ? a
      : function (a, c) {
          for (var e = 1; e < arguments.length; e++) {
            var d = arguments[e];
            if (d) for (var f in d) $jscomp.owns(d, f) && (a[f] = d[f]);
          }
          return a;
        };
  },
  "es6-impl",
  "es3"
);
(function (a) {
  function b(e) {
    if (c[e]) return c[e].exports;
    var d = (c[e] = { i: e, l: !1, exports: {} });
    a[e].call(d.exports, d, d.exports, b);
    d.l = !0;
    return d.exports;
  }
  var c = {};
  b.m = a;
  b.c = c;
  b.d = function (a, d, c) {
    b.o(a, d) ||
      Object.defineProperty(a, d, { configurable: !1, enumerable: !0, get: c });
  };
  b.n = function (a) {
    var d =
      a && a.__esModule
        ? function () {
            return a["default"];
          }
        : function () {
            return a;
          };
    b.d(d, "a", d);
    return d;
  };
  b.o = function (a, d) {
    return Object.prototype.hasOwnProperty.call(a, d);
  };
  b.p = "";
  return b((b.s = 4));
})([
  function (a, b, c) {
    var e = Object.prototype.hasOwnProperty,
      d = Object.prototype.toString,
      f = Array.prototype.slice,
      n = c(7);
    b = Object.prototype.propertyIsEnumerable;
    var g = !b.call({ toString: null }, "toString"),
      k = b.call(function () {}, "prototype"),
      p = "toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(
        " "
      ),
      h = function (a) {
        var d = a.constructor;
        return d && d.prototype === a;
      },
      r = {
        $console: !0,
        $external: !0,
        $frame: !0,
        $frameElement: !0,
        $frames: !0,
        $innerHeight: !0,
        $innerWidth: !0,
        $outerHeight: !0,
        $outerWidth: !0,
        $pageXOffset: !0,
        $pageYOffset: !0,
        $parent: !0,
        $scrollLeft: !0,
        $scrollTop: !0,
        $scrollX: !0,
        $scrollY: !0,
        $self: !0,
        $webkitIndexedDB: !0,
        $webkitStorageInfo: !0,
        $window: !0,
      },
      t = (function () {
        if ("undefined" === typeof window) return !1;
        for (var a in window)
          try {
            if (
              !r["$" + a] &&
              e.call(window, a) &&
              null !== window[a] &&
              "object" === typeof window[a]
            )
              try {
                h(window[a]);
              } catch (w) {
                return !0;
              }
          } catch (w) {
            return !0;
          }
        return !1;
      })(),
      l = function (a) {
        var c = null !== a && "object" === typeof a,
          f = "[object Function]" === d.call(a),
          b = n(a),
          l = c && "[object String]" === d.call(a),
          m = [];
        if (!c && !f && !b)
          throw new TypeError("Object.keys called on a non-object");
        c = k && f;
        if (l && 0 < a.length && !e.call(a, 0))
          for (l = 0; l < a.length; ++l) m.push(String(l));
        if (b && 0 < a.length) for (b = 0; b < a.length; ++b) m.push(String(b));
        else
          for (var r in a)
            (c && "prototype" === r) || !e.call(a, r) || m.push(String(r));
        if (g) {
          var v;
          if ("undefined" !== typeof window && t)
            try {
              v = h(a);
            } catch (x) {
              v = !1;
            }
          else v = h(a);
          for (b = 0; b < p.length; ++b)
            (v && "constructor" === p[b]) || !e.call(a, p[b]) || m.push(p[b]);
        }
        return m;
      };
    l.shim = function () {
      if (Object.keys) {
        if (
          !(function () {
            return 2 === (Object.keys(arguments) || "").length;
          })(1, 2)
        ) {
          var a = Object.keys;
          Object.keys = function (d) {
            return n(d) ? a(f.call(d)) : a(d);
          };
        }
      } else Object.keys = l;
      return Object.keys || l;
    };
    a.exports = l;
  },
  function (a, b, c) {
    var e = c(0),
      d = c(8),
      f = "function" === typeof Symbol && "symbol" === typeof Symbol(),
      n = Object.prototype.toString,
      g =
        Object.defineProperty &&
        (function () {
          var a = {};
          try {
            Object.defineProperty(a, "x", { enumerable: !1, value: a });
            for (var d in a) return !1;
            return a.x === a;
          } catch (h) {
            return !1;
          }
        })();
    b = function (a, c) {
      var b = 2 < arguments.length ? arguments[2] : {},
        k = e(c);
      f && (k = k.concat(Object.getOwnPropertySymbols(c)));
      d(k, function (d) {
        var e = c[d],
          f = b[d];
        if (
          !(d in a) ||
          ("function" === typeof f && "[object Function]" === n.call(f) && f())
        )
          g
            ? Object.defineProperty(a, d, {
                configurable: !0,
                enumerable: !1,
                value: e,
                writable: !0,
              })
            : (a[d] = e);
      });
    };
    b.supportsDescriptors = !!g;
    a.exports = b;
  },
  function (a, b, c) {
    var e = c(0);
    b = c(9);
    var d = c(11)(),
      f = Object,
      n = b.call(Function.call, Array.prototype.push),
      g = b.call(Function.call, Object.prototype.propertyIsEnumerable),
      k = d ? Object.getOwnPropertySymbols : null;
    a.exports = function (a, c) {
      if ("undefined" === typeof a || null === a)
        throw new TypeError("target must be an object");
      var b = f(a),
        h,
        l,
        m,
        p,
        u,
        q;
      for (h = 1; h < arguments.length; ++h) {
        l = f(arguments[h]);
        p = e(l);
        if ((m = d && (Object.getOwnPropertySymbols || k)))
          for (u = m(l), m = 0; m < u.length; ++m)
            (q = u[m]), g(l, q) && n(p, q);
        for (m = 0; m < p.length; ++m)
          (q = p[m]), (u = l[q]), g(l, q) && (b[q] = u);
      }
      return b;
    };
  },
  function (a, b, c) {
    var e = c(2),
      d = function () {
        if (!Object.assign || !Object.preventExtensions) return !1;
        var a = Object.preventExtensions({ 1: 2 });
        try {
          Object.assign(a, "xy");
        } catch (n) {
          return "y" === a[1];
        }
        return !1;
      };
    a.exports = function () {
      if (!Object.assign) return e;
      var a;
      if (Object.assign) {
        for (
          var c = "abcdefghijklmnopqrst".split(""), b = {}, k = 0;
          k < c.length;
          ++k
        )
          b[c[k]] = c[k];
        c = Object.assign({}, b);
        b = "";
        for (a in c) b += a;
        a = "abcdefghijklmnopqrst" !== b;
      } else a = !1;
      return a || d() ? e : Object.assign;
    };
  },
  function (a, b, c) {
    writeGood = c(5);
  },
  function (a, b, c) {
    function e(a) {
      var d = {};
      return a.reduce(function (a, c) {
        var b = c.index + ":" + c.offset;
        d[b]
          ? (d[b].reason += " and " + c.reason.substring(c.offset + 3))
          : ((d[b] = c), a.push(c));
        return a;
      }, []);
    }
    var d = Object.assign || c(6),
      f = {
        weasel: { fn: c(13), explanation: "is a weasel word" },
        illusion: { fn: c(14), explanation: "is repeated" },
        so: { fn: c(15), explanation: "adds no meaning" },
        thereIs: { fn: c(16), explanation: "is unnecessary verbiage" },
        passive: { fn: c(17), explanation: "may be passive voice" },
        adverb: { fn: c(18), explanation: "can weaken meaning" },
        tooWordy: { fn: c(20), explanation: "is wordy or unneeded" },
        cliches: { fn: c(22), explanation: "is a cliche" },
        eprime: { fn: c(24), explanation: "is a form of 'to be'" },
      },
      n = { eprime: !1 };
    a.exports = function (a, c) {
      function b(d) {
        return function (c) {
          c.reason = '"' + a.substr(c.index, c.offset) + '" ' + d;
          return c;
        };
      }
      c = c ? c : {};
      var k = {};
      c = d({}, n, c);
      Object.keys(c).map(function (a) {
        "checks" !== a && (k[a] = c[a]);
      });
      var g = c.checks || f,
        t = [];
      Object.keys(g).forEach(function (c) {
        !1 !== k[c] && (t = t.concat(g[c].fn(a).map(b(g[c].explanation))));
      });
      return e(t).sort(function (a, c) {
        return a.index < c.index ? -1 : 1;
      });
    };
    a.exports.annotate = c(25);
  },
  function (a, b, c) {
    b = c(1);
    var e = c(2),
      d = c(3);
    c = c(12);
    var f = d();
    b(f, { implementation: e, getPolyfill: d, shim: c });
    a.exports = f;
  },
  function (a, b, c) {
    var e = Object.prototype.toString;
    a.exports = function (a) {
      var c = e.call(a),
        d = "[object Arguments]" === c;
      d ||
        (d =
          "[object Array]" !== c &&
          null !== a &&
          "object" === typeof a &&
          "number" === typeof a.length &&
          0 <= a.length &&
          "[object Function]" === e.call(a.callee));
      return d;
    };
  },
  function (a, b) {
    var c = Object.prototype.hasOwnProperty,
      e = Object.prototype.toString;
    a.exports = function (a, b, n) {
      if ("[object Function]" !== e.call(b))
        throw new TypeError("iterator must be a function");
      var d = a.length;
      if (d === +d) for (var f = 0; f < d; f++) b.call(n, a[f], f, a);
      else for (f in a) c.call(a, f) && b.call(n, a[f], f, a);
    };
  },
  function (a, b, c) {
    b = c(10);
    a.exports = Function.prototype.bind || b;
  },
  function (a, b) {
    var c = Array.prototype.slice,
      e = Object.prototype.toString;
    a.exports = function (a) {
      var d = this;
      if ("function" !== typeof d || "[object Function]" !== e.call(d))
        throw new TypeError(
          "Function.prototype.bind called on incompatible " + d
        );
      for (
        var b = c.call(arguments, 1),
          g,
          k = Math.max(0, d.length - b.length),
          p = [],
          h = 0;
        h < k;
        h++
      )
        p.push("$" + h);
      g = Function(
        "binder",
        "return function (" +
          p.join(",") +
          "){ return binder.apply(this,arguments); }"
      )(function () {
        if (this instanceof g) {
          var e = d.apply(this, b.concat(c.call(arguments)));
          return Object(e) === e ? e : this;
        }
        return d.apply(a, b.concat(c.call(arguments)));
      });
      d.prototype &&
        ((k = function () {}),
        (k.prototype = d.prototype),
        (g.prototype = new k()),
        (k.prototype = null));
      return g;
    };
  },
  function (a, b, c) {
    var e = c(0);
    a.exports = function () {
      if (
        "function" !== typeof Symbol ||
        "function" !== typeof Object.getOwnPropertySymbols
      )
        return !1;
      if ("symbol" === typeof Symbol.iterator) return !0;
      var a = {},
        c = Symbol("test"),
        b = Object(c);
      if (
        "string" === typeof c ||
        "[object Symbol]" !== Object.prototype.toString.call(c) ||
        "[object Symbol]" !== Object.prototype.toString.call(b)
      )
        return !1;
      a[c] = 42;
      for (c in a) return !1;
      if (
        0 !== e(a).length ||
        ("function" === typeof Object.keys && 0 !== Object.keys(a).length) ||
        ("function" === typeof Object.getOwnPropertyNames &&
          0 !== Object.getOwnPropertyNames(a).length)
      )
        return !1;
      b = Object.getOwnPropertySymbols(a);
      return 1 !== b.length ||
        b[0] !== c ||
        !Object.prototype.propertyIsEnumerable.call(a, c) ||
        ("function" === typeof Object.getOwnPropertyDescriptor &&
          ((a = Object.getOwnPropertyDescriptor(a, c)),
          42 !== a.value || !0 !== a.enumerable))
        ? !1
        : !0;
    };
  },
  function (a, b, c) {
    var e = c(1),
      d = c(3);
    a.exports = function () {
      var a = d();
      e(
        Object,
        { assign: a },
        {
          assign: function () {
            return Object.assign !== a;
          },
        }
      );
      return a;
    };
  },
  function (a, b) {
    var c = ["many", "few"],
      e = /\b(are a number|clearly|completely|exceedingly|excellent|extremely|fairly|few|huge|interestingly|is a number|largely|many|mostly|obviously|quite|relatively|remarkably|several|significantly|substantially|surprisingly|tiny|various|vast|very)\b/gi;
    a.exports = function (a, b) {
      for (b = []; (match = e.exec(a)); ) {
        var d = match[0].toLowerCase();
        (-1 !== c.indexOf(d) && "too " === a.substr(match.index - 4, 4)) ||
          b.push({ index: match.index, offset: d.length });
      }
      return b;
    };
  },
  function (a, b) {
    var c = /(\s*)([^\s]+)/gi,
      e = /\w+/;
    a.exports = function (a) {
      for (var d = [], b = ""; (match = c.exec(a)); )
        e.test(match[2]) &&
          match[2].toLowerCase() === b &&
          d.push({
            index: match.index + match[1].length,
            offset: match[2].length,
          }),
          (b = match[2].toLowerCase());
      return d;
    };
  },
  function (a, b) {
    var c = /([^\n\.;!?]+)([\.;!?]+)/gi,
      e = /^(\s)*so\b[\s\S]/i;
    a.exports = function (a) {
      for (var d = [], b, g; (b = c.exec(a)); )
        (g = e.exec(b[1])) &&
          d.push({ index: b.index + (g[1] || "").length, offset: 2 });
      return d;
    };
  },
  function (a, b) {
    var c = /([^\n\.;!?]+)([\.;!?]+)/gi,
      e = /^(\s)*there\b\s(is|are)\b/i;
    a.exports = function (a) {
      for (var b = [], d, g; (d = c.exec(a)); )
        (g = e.exec(d[1])) &&
          b.push({
            index: d.index + (g[1] || "").length,
            offset: g[0].length - (g[1] || "").length,
          });
      return b;
    };
  },
  function (a, b) {
    var c = ["indeed"],
      e = /\b(am|are|were|being|is|been|was|be)\b\s*([\w]+ed|awoken|been|born|beat|become|begun|bent|beset|bet|bid|bidden|bound|bitten|bled|blown|broken|bred|brought|broadcast|built|burnt|burst|bought|cast|caught|chosen|clung|come|cost|crept|cut|dealt|dug|dived|done|drawn|dreamt|driven|drunk|eaten|fallen|fed|felt|fought|found|fit|fled|flung|flown|forbidden|forgotten|foregone|forgiven|forsaken|frozen|gotten|given|gone|ground|grown|hung|heard|hidden|hit|held|hurt|kept|knelt|knit|known|laid|led|leapt|learnt|left|lent|let|lain|lighted|lost|made|meant|met|misspelt|mistaken|mown|overcome|overdone|overtaken|overthrown|paid|pled|proven|put|quit|read|rid|ridden|rung|risen|run|sawn|said|seen|sought|sold|sent|set|sewn|shaken|shaven|shorn|shed|shone|shod|shot|shown|shrunk|shut|sung|sunk|sat|slept|slain|slid|slung|slit|smitten|sown|spoken|sped|spent|spilt|spun|spit|split|spread|sprung|stood|stolen|stuck|stung|stunk|stridden|struck|strung|striven|sworn|swept|swollen|swum|swung|taken|taught|torn|told|thought|thrived|thrown|thrust|trodden|understood|upheld|upset|woken|worn|woven|wed|wept|wound|won|withheld|withstood|wrung|written)\b/gi,
      d;
    a.exports = function (a, b) {
      b =
        b && b.by
          ? d || (d = new RegExp(e.toString().slice(1, -3) + "\\s*by\\b", "gi"))
          : e;
      for (var f = []; (match = b.exec(a)); )
        -1 === c.indexOf(match[2].toLowerCase()) &&
          f.push({ index: match.index, offset: match[0].length });
      return f;
    };
  },
  function (a, b, c) {
    var e = /\b((absolutel|accidentall|additionall|allegedl|alternativel|angril|anxiousl|approximatel|awkwardl|badl|barel|beautifull|blindl|boldl|bravel|brightl|briskl|bristl|bubbl|busil|calml|carefull|carelessl|cautiousl|cheerfull|clearl|closel|coldl|completel|consequentl|correctl|courageousl|crinkl|cruell|crumbl|cuddl|currentl|dail|daringl|deadl|definitel|deliberatel|doubtfull|dumbl|eagerl|earl|easil|elegantl|enormousl|enthusiasticall|equall|especiall|eventuall|exactl|exceedingl|exclusivel|extremel|fairl|faithfull|fatall|fiercel|finall|fondl|foolishl|fortunatel|frankl|franticall|generousl|gentl|giggl|gladl|gracefull|greedil|happil|hardl|hastil|healthil|heartil|helpfull|honestl|hourl|hungril|hurriedl|immediatel|impatientl|inadequatel|ingeniousl|innocentl|inquisitivel|interestingl|irritabl|jiggl|joyousl|justl|kindl|largel|latel|lazil|likel|literall|lonel|loosel|loudl|loudl|luckil|madl|man|mentall|mildl|monthl|mortall|mostl|mysteriousl|neatl|nervousl|nightl|noisil|normall|obedientl|occasionall|onl|openl|painfull|particularl|patientl|perfectl|politel|poorl|powerfull|presumabl|previousl|promptl|punctuall|quarterl|quickl|quietl|rapidl|rarel|reall|recentl|recklessl|regularl|relativel|reluctantl|remarkabl|repeatedl|rightfull|roughl|rudel|sadl|safel|selfishl|sensibl|seriousl|sharpl|shortl|shyl|significantl|silentl|simpl|sleepil|slowl|smartl|smell|smoothl|softl|solemnl|sparkl|speedil|stealthil|sternl|stupidl|substantiall|successfull|suddenl|surprisingl|suspiciousl|swiftl|tenderl|tensel|thoughtfull|tightl|timel|truthfull|unexpectedl|unfortunatel|usuall|ver|victoriousl|violentl|vivaciousl|warml|waverl|weakl|wearil|weekl|wildl|wisel|worldl|wrinkl|yearl)(y)|(just|maybe|stuff|things))\b/gi,
      d = c(19);
    a.exports = function (a) {
      return d(e, a, "adverbs");
    };
  },
  function (a, b) {
    a.exports = function (a, b, d) {
      for (d = []; (result = a.exec(b)); )
        d.push({ index: result.index, offset: result[0].length });
      return d;
    };
  },
  function (a, b, c) {
    var e = c(21),
      d = /\b(a number of|abundance|accede to|accelerate|accentuate|accompany|accomplish|accorded|accrue|acquiesce|acquire|additional|adjacent to|adjustment|admissible|advantageous|adversely impact|advise|aforementioned|aggregate|aircraft|all of|all things considered|alleviate|allocate|along the lines of|already existing|alternatively|amazing|ameliorate|anticipate|apparent|appreciable|as a matter of fact|as a means of|as far as I'm concerned|as of yet|as to|as yet|ascertain|assistance|at the present time|at this time|attain|attributable to|authorize|because of the fact that|belated|benefit from|bestow|by means of|by virtue of the fact that|by virtue of|cease|close proximity|commence|comply with|concerning|consequently|consolidate|constitutes|demonstrate|depart|designate|discontinue|due to the fact that|each and every|economical|eliminate|elucidate|employ|endeavor|enumerate|equitable|equivalent|evaluate|evidenced|exclusively|expedite|expend|expiration|facilitate|factual evidence|feasible|finalize|first and foremost|for all intents and purposes|for the most part|for the purpose of|forfeit|formulate|have a tendency to|honest truth|however|if and when|impacted|implement|in a manner of speaking|in a timely manner|in a very real sense|in accordance with|in addition|in all likelihood|in an effort to|in between|in excess of|in lieu of|in light of the fact that|in many cases|in my opinion|in order to|in regard to|in some instances|in terms of|in the case of |in the event that|in the final analysis|in the nature of|in the near future|in the process of|inception|incumbent upon|indicate|indication|initiate|irregardless|is applicable to|is authorized to|is responsible for|it is essential|it is|it seems that|it was|magnitude|maximum|methodology|minimize|minimum|modify|monitor|multiple|necessitate|nevertheless|not certain|not many|not often|not unless|not unlike|notwithstanding|null and void|numerous|objective|obligate|obtain|on the contrary|on the other hand|one particular|optimum|overall|owing to the fact that|participate|particulars|pass away|pertaining to|point in time|portion|possess|preclude|previously|prior to|prioritize|procure|proficiency|provided that|purchase|put simply|readily apparent|refer back|regarding|relocate|remainder|remuneration|requirement|reside|residence|retain|satisfy|shall|should you wish|similar to|solicit|span across|strategize|subsequent|substantial|successfully complete|sufficient|terminate|the month of|the point I am trying to make|therefore|time period|took advantage of|transmit|transpire|type of|until such time as|utilization|utilize|validate|various different|what I mean to say is|whether or not|with respect to|with the exception of|witnessed)\b/gi;
    a.exports = function (a) {
      return e(d, a, "wordy");
    };
  },
  function (a, b) {
    a.exports = function (a, b, d) {
      for (d = []; (result = a.exec(b)); )
        d.push({ index: result.index, offset: result[0].length });
      return d;
    };
  },
  function (a, b, c) {
    var e = /\b(a chip off the old block|a clean slate|a dark and stormy night|a far cry|a fine kettle of fish|a loose cannon|a penny saved is a penny earned|a tough row to hoe|a word to the wise|ace in the hole|acid test|add insult to injury|against all odds|air your dirty laundry|all fun and games|all in a day's work|all talk, no action|all thumbs|all your eggs in one basket|all's fair in love and war|all's well that ends well|almighty dollar|American as apple pie|an axe to grind|another day, another dollar|armed to the teeth|as luck would have it|as old as time|as the crow flies|at loose ends|at my wits end|avoid like the plague|babe in the woods|back against the wall|back in the saddle|back to square one|back to the drawing board|bad to the bone|badge of honor|bald faced liar|ballpark figure|banging your head against a brick wall|baptism by fire|barking up the wrong tree|bat out of hell|be all and end all|beat a dead horse|beat around the bush|been there, done that|beggars can't be choosers|behind the eight ball|bend over backwards|benefit of the doubt|bent out of shape|best thing since sliced bread|bet your bottom dollar|better half|better late than never|better mousetrap|better safe than sorry|between a rock and a hard place|beyond the pale|bide your time|big as life|big cheese|big fish in a small pond|big man on campus|bigger they are the harder they fall|bird in the hand|bird's eye view|birds and the bees|birds of a feather flock together|bit the hand that feeds you|bite the bullet|bite the dust|bitten off more than he can chew|black as coal|black as pitch|black as the ace of spades|blast from the past|bleeding heart|blessing in disguise|blind ambition|blind as a bat|blind leading the blind|blood is thicker than water|blood sweat and tears|blow off steam|blow your own horn|blushing bride|boils down to|bolt from the blue|bone to pick|bored stiff|bored to tears|bottomless pit|boys will be boys|bright and early|brings home the bacon|broad across the beam|broken record|brought back to reality|bull by the horns|bull in a china shop|burn the midnight oil|burning question|burning the candle at both ends|burst your bubble|bury the hatchet|busy as a bee|by hook or by crook|call a spade a spade|called onto the carpet|calm before the storm|can of worms|can't cut the mustard|can't hold a candle to|case of mistaken identity|cat got your tongue|cat's meow|caught in the crossfire|caught red-handed|checkered past|chomping at the bit|cleanliness is next to godliness|clear as a bell|clear as mud|close to the vest|cock and bull story|cold shoulder|come hell or high water|cool as a cucumber|cool, calm, and collected|cost a king's ransom|count your blessings|crack of dawn|crash course|creature comforts|cross that bridge when you come to it|crushing blow|cry like a baby|cry me a river|cry over spilt milk|crystal clear|curiosity killed the cat|cut and dried|cut through the red tape|cut to the chase|cute as a bugs ear|cute as a button|cute as a puppy|cuts to the quick|dark before the dawn|day in, day out|dead as a doornail|devil is in the details|dime a dozen|divide and conquer|dog and pony show|dog days|dog eat dog|dog tired|don't burn your bridges|don't count your chickens|don't look a gift horse in the mouth|don't rock the boat|don't step on anyone's toes|don't take any wooden nickels|down and out|down at the heels|down in the dumps|down the hatch|down to earth|draw the line|dressed to kill|dressed to the nines|drives me up the wall|dull as dishwater|dyed in the wool|eagle eye|ear to the ground|early bird catches the worm|easier said than done|easy as pie|eat your heart out|eat your words|eleventh hour|even the playing field|every dog has its day|every fiber of my being|everything but the kitchen sink|eye for an eye|face the music|facts of life|fair weather friend|fall by the wayside|fan the flames|feast or famine|feather your nest|feathered friends|few and far between|fifteen minutes of fame|filthy vermin|fine kettle of fish|fish out of water|fishing for a compliment|fit as a fiddle|fit the bill|fit to be tied|flash in the pan|flat as a pancake|flip your lid|flog a dead horse|fly by night|fly the coop|follow your heart|for all intents and purposes|for the birds|for what it's worth|force of nature|force to be reckoned with|forgive and forget|fox in the henhouse|free and easy|free as a bird|fresh as a daisy|full steam ahead|fun in the sun|garbage in, garbage out|gentle as a lamb|get a kick out of|get a leg up|get down and dirty|get the lead out|get to the bottom of|get your feet wet|gets my goat|gilding the lily|give and take|go against the grain|go at it tooth and nail|go for broke|go him one better|go the extra mile|go with the flow|goes without saying|good as gold|good deed for the day|good things come to those who wait|good time was had by all|good times were had by all|greased lightning|greek to me|green thumb|green-eyed monster|grist for the mill|growing like a weed|hair of the dog|hand to mouth|happy as a clam|happy as a lark|hasn't a clue|have a nice day|have high hopes|have the last laugh|haven't got a row to hoe|head honcho|head over heels|hear a pin drop|heard it through the grapevine|heart's content|heavy as lead|hem and haw|high and dry|high and mighty|high as a kite|hit paydirt|hold your head up high|hold your horses|hold your own|hold your tongue|honest as the day is long|horns of a dilemma|horse of a different color|hot under the collar|hour of need|I beg to differ|icing on the cake|if the shoe fits|if the shoe were on the other foot|in a jam|in a jiffy|in a nutshell|in a pig's eye|in a pinch|in a word|in hot water|in the gutter|in the nick of time|in the thick of it|in your dreams|it ain't over till the fat lady sings|it goes without saying|it takes all kinds|it takes one to know one|it's a small world|it's only a matter of time|ivory tower|Jack of all trades|jockey for position|jog your memory|joined at the hip|judge a book by its cover|jump down your throat|jump in with both feet|jump on the bandwagon|jump the gun|jump to conclusions|just a hop, skip, and a jump|just the ticket|justice is blind|keep a stiff upper lip|keep an eye on|keep it simple, stupid|keep the home fires burning|keep up with the Joneses|keep your chin up|keep your fingers crossed|kick the bucket|kick up your heels|kick your feet up|kid in a candy store|kill two birds with one stone|kiss of death|knock it out of the park|knock on wood|knock your socks off|know him from Adam|know the ropes|know the score|knuckle down|knuckle sandwich|knuckle under|labor of love|ladder of success|land on your feet|lap of luxury|last but not least|last hurrah|last-ditch effort|law of the jungle|law of the land|lay down the law|leaps and bounds|let sleeping dogs lie|let the cat out of the bag|let the good times roll|let your hair down|let's talk turkey|letter perfect|lick your wounds|lies like a rug|life's a bitch|life's a grind|light at the end of the tunnel|lighter than a feather|lighter than air|like clockwork|like father like son|like taking candy from a baby|like there's no tomorrow|lion's share|live and learn|live and let live|long and short of it|long lost love|look before you leap|look down your nose|look what the cat dragged in|looking a gift horse in the mouth|looks like death warmed over|loose cannon|lose your head|lose your temper|loud as a horn|lounge lizard|loved and lost|low man on the totem pole|luck of the draw|luck of the Irish|make hay while the sun shines|make money hand over fist|make my day|make the best of a bad situation|make the best of it|make your blood boil|man of few words|man's best friend|mark my words|meaningful dialogue|missed the boat on that one|moment in the sun|moment of glory|moment of truth|money to burn|more power to you|more than one way to skin a cat|movers and shakers|moving experience|naked as a jaybird|naked truth|neat as a pin|needle in a haystack|needless to say|neither here nor there|never look back|never say never|nip and tuck|nip it in the bud|no guts, no glory|no love lost|no pain, no gain|no skin off my back|no stone unturned|no time like the present|no use crying over spilled milk|nose to the grindstone|not a hope in hell|not a minute's peace|not in my backyard|not playing with a full deck|not the end of the world|not written in stone|nothing to sneeze at|nothing ventured nothing gained|now we're cooking|off the top of my head|off the wagon|off the wall|old hat|older and wiser|older than dirt|older than Methuselah|on a roll|on cloud nine|on pins and needles|on the bandwagon|on the money|on the nose|on the rocks|on the spot|on the tip of my tongue|on the wagon|on thin ice|once bitten, twice shy|one bad apple doesn't spoil the bushel|one born every minute|one brick short|one foot in the grave|one in a million|one red cent|only game in town|open a can of worms|open and shut case|open the flood gates|opportunity doesn't knock twice|out of pocket|out of sight, out of mind|out of the frying pan into the fire|out of the woods|out on a limb|over a barrel|over the hump|pain and suffering|pain in the|panic button|par for the course|part and parcel|party pooper|pass the buck|patience is a virtue|pay through the nose|penny pincher|perfect storm|pig in a poke|pile it on|pillar of the community|pin your hopes on|pitter patter of little feet|plain as day|plain as the nose on your face|play by the rules|play your cards right|playing the field|playing with fire|pleased as punch|plenty of fish in the sea|point with pride|poor as a church mouse|pot calling the kettle black|pretty as a picture|pull a fast one|pull your punches|pulling your leg|pure as the driven snow|put it in a nutshell|put one over on you|put the cart before the horse|put the pedal to the metal|put your best foot forward|put your foot down|quick as a bunny|quick as a lick|quick as a wink|quick as lightning|quiet as a dormouse|rags to riches|raining buckets|raining cats and dogs|rank and file|rat race|reap what you sow|red as a beet|red herring|reinvent the wheel|rich and famous|rings a bell|ripe old age|ripped me off|rise and shine|road to hell is paved with good intentions|rob Peter to pay Paul|roll over in the grave|rub the wrong way|ruled the roost|running in circles|sad but true|sadder but wiser|salt of the earth|scared stiff|scared to death|sealed with a kiss|second to none|see eye to eye|seen the light|seize the day|set the record straight|set the world on fire|set your teeth on edge|sharp as a tack|shoot for the moon|shoot the breeze|shot in the dark|shoulder to the wheel|sick as a dog|sigh of relief|signed, sealed, and delivered|sink or swim|six of one, half a dozen of another|skating on thin ice|slept like a log|slinging mud|slippery as an eel|slow as molasses|smart as a whip|smooth as a baby's bottom|sneaking suspicion|snug as a bug in a rug|sow wild oats|spare the rod, spoil the child|speak of the devil|spilled the beans|spinning your wheels|spitting image of|spoke with relish|spread like wildfire|spring to life|squeaky wheel gets the grease|stands out like a sore thumb|start from scratch|stick in the mud|still waters run deep|stitch in time|stop and smell the roses|straight as an arrow|straw that broke the camel's back|strong as an ox|stubborn as a mule|stuff that dreams are made of|stuffed shirt|sweating blood|sweating bullets|take a load off|take one for the team|take the bait|take the bull by the horns|take the plunge|takes one to know one|takes two to tango|the more the merrier|the real deal|the real McCoy|the red carpet treatment|the same old story|there is no accounting for taste|thick as a brick|thick as thieves|thin as a rail|think outside of the box|third time's the charm|this day and age|this hurts me worse than it hurts you|this point in time|three sheets to the wind|through thick and thin|throw in the towel|tie one on|tighter than a drum|time and time again|time is of the essence|tip of the iceberg|tired but happy|to coin a phrase|to each his own|to make a long story short|to the best of my knowledge|toe the line|tongue in cheek|too good to be true|too hot to handle|too numerous to mention|touch with a ten foot pole|tough as nails|trial and error|trials and tribulations|tried and true|trip down memory lane|twist of fate|two cents worth|two peas in a pod|ugly as sin|under the counter|under the gun|under the same roof|under the weather|until the cows come home|unvarnished truth|up the creek|uphill battle|upper crust|upset the applecart|vain attempt|vain effort|vanquish the enemy|vested interest|waiting for the other shoe to drop|wakeup call|warm welcome|watch your p's and q's|watch your tongue|watching the clock|water under the bridge|weather the storm|weed them out|week of Sundays|went belly up|wet behind the ears|what goes around comes around|what you see is what you get|when it rains, it pours|when push comes to shove|when the cat's away|when the going gets tough, the tough get going|white as a sheet|whole ball of wax|whole hog|whole nine yards|wild goose chase|will wonders never cease?|wisdom of the ages|wise as an owl|wolf at the door|words fail me|work like a dog|world weary|worst nightmare|worth its weight in gold|wrong side of the bed|yanking your chain|yappy as a dog|years young|you are what you eat|you can run but you can't hide|you only live once|you're the boss |young and foolish|young and vibrant)\b/gi,
      d = c(23);
    a.exports = function (a) {
      return d(e, a, "clich\u00e9s");
    };
  },
  function (a, b) {
    a.exports = function (a, b, d) {
      for (d = []; (result = a.exec(b)); )
        d.push({ index: result.index, offset: result[0].length });
      return d;
    };
  },
  function (a, b) {
    var c = /\b(am|are|aren't|be|been|being|he's|here's|here's|how's|i'm|is|isn't|she's|that's|there's|they're|was|wasn't|we're|were|weren't|what's|where's|who's|you're)\b/gi;
    a.exports = function (a) {
      var b = [];
      if (!a || 0 === a.length) return b;
      for (a = a.replace(/[\u2018\u2019]/g, "'"); (match = c.exec(a)); ) {
        var e = match[0].toLowerCase();
        b.push({ index: match.index, offset: e.length });
      }
      return b;
    };
  },
  function (a, b) {
    function c(a, c) {
      for (var b = ""; 0 < c; c--) b += a;
      return b;
    }
    a.exports = function (a, b, f) {
      var d = a.split("\n");
      return b.map(function (b) {
        var e;
        e = b.index;
        var g = a.substr(0, e).split("\n").length,
          h;
        h = d.slice(0);
        h.splice(g - 1);
        h = h.join("\n").length + (0 < h.length);
        e -= h;
        h = 0;
        25 < e && (h = e - 25);
        return f
          ? { reason: b.reason, line: g, col: e }
          : [
              d[g - 1].substr(h, 80),
              c(" ", e - h) + c("^", b.offset),
              b.reason + " on line " + g + " at column " + e,
            ].join("\n");
      });
    };
  },
]);
// END WRITE GOOD

// START 1WRITER IMPLEMENTATION
let suggestions = writeGood("So the cat was stolen.");
suggestions.forEach((suggestion) => {
  ui.input("Suggestion", null, "Here is a suggestion.", null, (value) => {
    if (value) {
      return;
    }
  });
});
// END 1WRITER IMPLEMENTATION
