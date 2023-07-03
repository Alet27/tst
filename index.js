(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) i(n);
  new MutationObserver(n => {
    for (const s of n)
      if (s.type === "childList")
        for (const o of s.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && i(o)
  }).observe(document, {
    childList: !0,
    subtree: !0
  });

  function r(n) {
    const s = {};
    return n.integrity && (s.integrity = n.integrity), n.referrerPolicy && (s.referrerPolicy = n.referrerPolicy), n.crossOrigin === "use-credentials" ? s.credentials = "include" : n.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s
  }

  function i(n) {
    if (n.ep) return;
    n.ep = !0;
    const s = r(n);
    fetch(n.href, s)
  }
})();

function wo(e, t) {
  const r = Object.create(null),
    i = e.split(",");
  for (let n = 0; n < i.length; n++) r[i[n]] = !0;
  return t ? n => !!r[n.toLowerCase()] : n => !!r[n]
}
const Ce = {},
  ni = [],
  Mt = () => { },
  $u = () => !1,
  Ou = /^on[^a-z]/,
  jn = e => Ou.test(e),
  xo = e => e.startsWith("onUpdate:"),
  De = Object.assign,
  bo = (e, t) => {
    const r = e.indexOf(t); r > -1 && e.splice(r, 1)
  },
  Iu = Object.prototype.hasOwnProperty,
  de = (e, t) => Iu.call(e, t),
  ne = Array.isArray,
  $i = e => Un(e) === "[object Map]",
  Fu = e => Un(e) === "[object Set]",
  ce = e => typeof e == "function",
  Be = e => typeof e == "string",
  Mo = e => typeof e == "symbol",
  Oe = e => e !== null && typeof e == "object",
  Xl = e => Oe(e) && ce(e.then) && ce(e.catch),
  Hu = Object.prototype.toString,
  Un = e => Hu.call(e),
  ku = e => Un(e).slice(8, -1),
  Nu = e => Un(e) === "[object Object]",
  Eo = e => Be(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Cn = wo(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
  Yn = e => {
    const t = Object.create(null);
    return r => t[r] || (t[r] = e(r))
  },
  Du = /-(\w)/g,
  Ft = Yn(e => e.replace(Du, (t, r) => r ? r.toUpperCase() : "")),
  Bu = /\B([A-Z])/g,
  pi = Yn(e => e.replace(Bu, "-$1").toLowerCase()),
  Xn = Yn(e => e.charAt(0).toUpperCase() + e.slice(1)),
  bs = Yn(e => e ? `on${Xn(e)}` : ""),
  Di = (e, t) => !Object.is(e, t),
  Ms = (e, t) => {
    for (let r = 0; r < e.length; r++) e[r](t)
  },
  On = (e, t, r) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      value: r
    })
  },
  Vu = e => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t
  };
let Ea;
const Ys = () => Ea || (Ea = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});

function To(e) {
  if (ne(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const i = e[r],
        n = Be(i) ? Uu(i) : To(i);
      if (n)
        for (const s in n) t[s] = n[s]
    }
    return t
  } else {
    if (Be(e)) return e;
    if (Oe(e)) return e
  }
}
const qu = /;(?![^(]*\))/g,
  Wu = /:([^]+)/,
  ju = /\/\*[^]*?\*\//g;

function Uu(e) {
  const t = {};
  return e.replace(ju, "").split(qu).forEach(r => {
    if (r) {
      const i = r.split(Wu);
      i.length > 1 && (t[i[0].trim()] = i[1].trim())
    }
  }), t
}

function Yt(e) {
  let t = "";
  if (Be(e)) t = e;
  else if (ne(e))
    for (let r = 0; r < e.length; r++) {
      const i = Yt(e[r]);
      i && (t += i + " ")
    } else if (Oe(e))
    for (const r in e) e[r] && (t += r + " ");
  return t.trim()
}
const Yu = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Xu = wo(Yu);

function Gl(e) {
  return !!e || e === ""
}
let _t;
class Gu {
  constructor (t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = _t, !t && _t && (this.index = (_t.scopes || (_t.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  run(t) {
    if (this._active) {
      const r = _t;
      try {
        return _t = this, t()
      } finally {
        _t = r
      }
    }
  }
  on() {
    _t = this
  }
  off() {
    _t = this.parent
  }
  stop(t) {
    if (this._active) {
      let r, i;
      for (r = 0, i = this.effects.length; r < i; r++) this.effects[r].stop();
      for (r = 0, i = this.cleanups.length; r < i; r++) this.cleanups[r]();
      if (this.scopes)
        for (r = 0, i = this.scopes.length; r < i; r++) this.scopes[r].stop(!0);
      if (!this.detached && this.parent && !t) {
        const n = this.parent.scopes.pop();
        n && n !== this && (this.parent.scopes[this.index] = n, n.index = this.index)
      }
      this.parent = void 0, this._active = !1
    }
  }
}

function Ku(e, t = _t) {
  t && t.active && t.effects.push(e)
}

function Zu() {
  return _t
}
const So = e => {
  const t = new Set(e);
  return t.w = 0,
    t.n = 0,
    t
},
  Kl = e => (e.w & wr) > 0,
  Zl = e => (e.n & wr) > 0,
  Qu = ({
    deps: e
  }) => {
    if (e.length)
      for (let t = 0; t < e.length; t++) e[t].w |= wr
  },
  Ju = e => {
    const {
      deps: t
    } = e;
    if (t.length) {
      let r = 0;
      for (let i = 0; i < t.length; i++) {
        const n = t[i];
        Kl(n) && !Zl(n) ? n.delete(e) : t[r++] = n, n.w &= ~wr, n.n &= ~wr
      }
      t.length = r
    }
  },
  Xs = new WeakMap;
let Ri = 0,
  wr = 1;
const Gs = 30;
let gt;
const Hr = Symbol(""),
  Ks = Symbol("");
class Po {
  constructor (t, r = null, i) {
    this.fn = t, this.scheduler = r, this.active = !0, this.deps = [], this.parent = void 0, Ku(this, i)
  }
  run() {
    if (!this.active) return this.fn();
    let t = gt,
      r = yr;
    for (; t;) {
      if (t === this) return;
      t = t.parent
    }
    try {
      return this.parent = gt, gt = this, yr = !0, wr = 1 << ++Ri, Ri <= Gs ? Qu(this) : Ta(this), this.fn()
    } finally {
      Ri <= Gs && Ju(this), wr = 1 << --Ri, gt = this.parent, yr = r, this.parent = void 0, this.deferStop && this.stop()
    }
  }
  stop() {
    gt === this ? this.deferStop = !0 : this.active && (Ta(this), this.onStop && this.onStop(), this.active = !1)
  }
}

function Ta(e) {
  const {
    deps: t
  } = e;
  if (t.length) {
    for (let r = 0; r < t.length; r++) t[r].delete(e);
    t.length = 0
  }
}
let yr = !0;
const Ql = [];

function mi() {
  Ql.push(yr), yr = !1
}

function _i() {
  const e = Ql.pop();
  yr = e === void 0 ? !0 : e
}

function st(e, t, r) {
  if (yr && gt) {
    let i = Xs.get(e);
    i || Xs.set(e, i = new Map);
    let n = i.get(r);
    n || i.set(r, n = So()), Jl(n)
  }
}

function Jl(e, t) {
  let r = !1;
  Ri <= Gs ? Zl(e) || (e.n |= wr, r = !Kl(e)) : r = !e.has(gt), r && (e.add(gt), gt.deps.push(e))
}

function Gt(e, t, r, i, n, s) {
  const o = Xs.get(e);
  if (!o) return;
  let a = [];
  if (t === "clear") a = [...o.values()];
  else if (r === "length" && ne(e)) {
    const l = Number(i);
    o.forEach((c, h) => {
      (h === "length" || h >= l) && a.push(c)
    })
  } else switch (r !== void 0 && a.push(o.get(r)), t) {
    case "add":
      ne(e) ? Eo(r) && a.push(o.get("length")) : (a.push(o.get(Hr)), $i(e) && a.push(o.get(Ks)));
      break;
    case "delete":
      ne(e) || (a.push(o.get(Hr)), $i(e) && a.push(o.get(Ks)));
      break;
    case "set":
      $i(e) && a.push(o.get(Hr));
      break
  }
  if (a.length === 1) a[0] && Zs(a[0]);
  else {
    const l = [];
    for (const c of a) c && l.push(...c);
    Zs(So(l))
  }
}

function Zs(e, t) {
  const r = ne(e) ? e : [...e];
  for (const i of r) i.computed && Sa(i);
  for (const i of r) i.computed || Sa(i)
}

function Sa(e, t) {
  (e !== gt || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const ed = wo("__proto__,__v_isRef,__isVue"),
  ec = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(Mo)),
  td = Co(),
  rd = Co(!1, !0),
  id = Co(!0),
  Pa = nd();

function nd() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
    e[t] = function (...r) {
      const i = me(this);
      for (let s = 0, o = this.length; s < o; s++) st(i, "get", s + "");
      const n = i[t](...r);
      return n === -1 || n === !1 ? i[t](...r.map(me)) : n
    }
  }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
    e[t] = function (...r) {
      mi();
      const i = me(this)[t].apply(this, r);
      return _i(), i
    }
  }), e
}

function sd(e) {
  const t = me(this);
  return st(t, "has", e), t.hasOwnProperty(e)
}

function Co(e = !1, t = !1) {
  return function (i, n, s) {
    if (n === "__v_isReactive") return !e;
    if (n === "__v_isReadonly") return e;
    if (n === "__v_isShallow") return t;
    if (n === "__v_raw" && s === (e ? t ? xd : sc : t ? nc : ic).get(i)) return i;
    const o = ne(i);
    if (!e) {
      if (o && de(Pa, n)) return Reflect.get(Pa, n, s);
      if (n === "hasOwnProperty") return sd
    }
    const a = Reflect.get(i, n, s);
    return (Mo(n) ? ec.has(n) : ed(n)) || (e || st(i, "get", n), t) ? a : Ke(a) ? o && Eo(n) ? a : a.value : Oe(a) ? e ? oc(a) : Zi(a) : a
  }
}
const od = tc(),
  ad = tc(!0);

function tc(e = !1) {
  return function (r, i, n, s) {
    let o = r[i];
    if (ci(o) && Ke(o) && !Ke(n)) return !1;
    if (!e && (!In(n) && !ci(n) && (o = me(o), n = me(n)), !ne(r) && Ke(o) && !Ke(n))) return o.value = n, !0;
    const a = ne(r) && Eo(i) ? Number(i) < r.length : de(r, i),
      l = Reflect.set(r, i, n, s);
    return r === me(s) && (a ? Di(n, o) && Gt(r, "set", i, n) : Gt(r, "add", i, n)), l
  }
}

function ld(e, t) {
  const r = de(e, t);
  e[t];
  const i = Reflect.deleteProperty(e, t);
  return i && r && Gt(e, "delete", t, void 0), i
}

function cd(e, t) {
  const r = Reflect.has(e, t);
  return (!Mo(t) || !ec.has(t)) && st(e, "has", t), r
}

function hd(e) {
  return st(e, "iterate", ne(e) ? "length" : Hr), Reflect.ownKeys(e)
}
const rc = {
  get: td,
  set: od,
  deleteProperty: ld,
  has: cd,
  ownKeys: hd
},
  fd = {
    get: id,
    set(e, t) {
      return !0
    },
    deleteProperty(e, t) {
      return !0
    }
  },
  ud = De({}, rc, {
    get: rd,
    set: ad
  }),
  Ao = e => e,
  Gn = e => Reflect.getPrototypeOf(e);

function yn(e, t, r = !1, i = !1) {
  e = e.__v_raw;
  const n = me(e),
    s = me(t);
  r || (t !== s && st(n, "get", t), st(n, "get", s));
  const {
    has: o
  } = Gn(n), a = i ? Ao : r ? Lo : Bi;
  if (o.call(n, t)) return a(e.get(t));
  if (o.call(n, s)) return a(e.get(s));
  e !== n && e.get(t)
}

function gn(e, t = !1) {
  const r = this.__v_raw,
    i = me(r),
    n = me(e);
  return t || (e !== n && st(i, "has", e), st(i, "has", n)), e === n ? r.has(e) : r.has(e) || r.has(n)
}

function wn(e, t = !1) {
  return e = e.__v_raw, !t && st(me(e), "iterate", Hr), Reflect.get(e, "size", e)
}

function Ca(e) {
  e = me(e);
  const t = me(this);
  return Gn(t).has.call(t, e) || (t.add(e), Gt(t, "add", e, e)), this
}

function Aa(e, t) {
  t = me(t);
  const r = me(this),
    {
      has: i,
      get: n
    } = Gn(r);
  let s = i.call(r, e);
  s || (e = me(e), s = i.call(r, e));
  const o = n.call(r, e);
  return r.set(e, t), s ? Di(t, o) && Gt(r, "set", e, t) : Gt(r, "add", e, t), this
}

function Ra(e) {
  const t = me(this),
    {
      has: r,
      get: i
    } = Gn(t);
  let n = r.call(t, e);
  n || (e = me(e), n = r.call(t, e)), i && i.call(t, e);
  const s = t.delete(e);
  return n && Gt(t, "delete", e, void 0), s
}

function za() {
  const e = me(this),
    t = e.size !== 0,
    r = e.clear();
  return t && Gt(e, "clear", void 0, void 0), r
}

function xn(e, t) {
  return function (i, n) {
    const s = this,
      o = s.__v_raw,
      a = me(o),
      l = t ? Ao : e ? Lo : Bi;
    return !e && st(a, "iterate", Hr), o.forEach((c, h) => i.call(n, l(c), l(h), s))
  }
}

function bn(e, t, r) {
  return function (...i) {
    const n = this.__v_raw,
      s = me(n),
      o = $i(s),
      a = e === "entries" || e === Symbol.iterator && o,
      l = e === "keys" && o,
      c = n[e](...i),
      h = r ? Ao : t ? Lo : Bi;
    return !t && st(s, "iterate", l ? Ks : Hr), {
      next() {
        const {
          value: f,
          done: u
        } = c.next();
        return u ? {
          value: f,
          done: u
        } : {
          value: a ? [h(f[0]), h(f[1])] : h(f),
          done: u
        }
      },
      [Symbol.iterator]() {
        return this
      }
    }
  }
}

function cr(e) {
  return function (...t) {
    return e === "delete" ? !1 : this
  }
}

function dd() {
  const e = {
    get(s) {
      return yn(this, s)
    },
    get size() {
      return wn(this)
    },
    has: gn,
    add: Ca,
    set: Aa,
    delete: Ra,
    clear: za,
    forEach: xn(!1, !1)
  },
    t = {
      get(s) {
        return yn(this, s, !1, !0)
      },
      get size() {
        return wn(this)
      },
      has: gn,
      add: Ca,
      set: Aa,
      delete: Ra,
      clear: za,
      forEach: xn(!1, !0)
    },
    r = {
      get(s) {
        return yn(this, s, !0)
      },
      get size() {
        return wn(this, !0)
      },
      has(s) {
        return gn.call(this, s, !0)
      },
      add: cr("add"),
      set: cr("set"),
      delete: cr("delete"),
      clear: cr("clear"),
      forEach: xn(!0, !1)
    },
    i = {
      get(s) {
        return yn(this, s, !0, !0)
      },
      get size() {
        return wn(this, !0)
      },
      has(s) {
        return gn.call(this, s, !0)
      },
      add: cr("add"),
      set: cr("set"),
      delete: cr("delete"),
      clear: cr("clear"),
      forEach: xn(!0, !0)
    };
  return ["keys", "values", "entries", Symbol.iterator].forEach(s => {
    e[s] = bn(s, !1, !1),
      r[s] = bn(s, !0, !1),
      t[s] = bn(s, !1, !0),
      i[s] = bn(s, !0, !0)
  }), [e, r, t, i]
}
const [vd, pd, md, _d] = dd();

function Ro(e, t) {
  const r = t ? e ? _d : md : e ? pd : vd;
  return (i, n, s) => n === "__v_isReactive" ? !e : n === "__v_isReadonly" ? e : n === "__v_raw" ? i : Reflect.get(de(r, n) && n in i ? r : i, n, s)
}
const yd = {
  get: Ro(!1, !1)
},
  gd = {
    get: Ro(!1, !0)
  },
  wd = {
    get: Ro(!0, !1)
  },
  ic = new WeakMap,
  nc = new WeakMap,
  sc = new WeakMap,
  xd = new WeakMap;

function bd(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0
  }
}

function Md(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : bd(ku(e))
}

function Zi(e) {
  return ci(e) ? e : zo(e, !1, rc, yd, ic)
}

function Ed(e) {
  return zo(e, !1, ud, gd, nc)
}

function oc(e) {
  return zo(e, !0, fd, wd, sc)
}

function zo(e, t, r, i, n) {
  if (!Oe(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
  const s = n.get(e);
  if (s) return s;
  const o = Md(e);
  if (o === 0) return e;
  const a = new Proxy(e, o === 2 ? i : r);
  return n.set(e, a), a
}

function si(e) {
  return ci(e) ? si(e.__v_raw) : !!(e && e.__v_isReactive)
}

function ci(e) {
  return !!(e && e.__v_isReadonly)
}

function In(e) {
  return !!(e && e.__v_isShallow)
}

function ac(e) {
  return si(e) || ci(e)
}

function me(e) {
  const t = e && e.__v_raw;
  return t ? me(t) : e
}

function lc(e) {
  return On(e, "__v_skip", !0), e
}
const Bi = e => Oe(e) ? Zi(e) : e,
  Lo = e => Oe(e) ? oc(e) : e;

function cc(e) {
  yr && gt && (e = me(e), Jl(e.dep || (e.dep = So())))
}

function hc(e, t) {
  e = me(e);
  const r = e.dep;
  r && Zs(r)
}

function Ke(e) {
  return !!(e && e.__v_isRef === !0)
}

function Fr(e) {
  return fc(e, !1)
}

function Td(e) {
  return fc(e, !0)
}

function fc(e, t) {
  return Ke(e) ? e : new Sd(e, t)
}
class Sd {
  constructor (t, r) {
    this.__v_isShallow = r, this.dep = void 0, this.__v_isRef = !0, this._rawValue = r ? t : me(t), this._value = r ? t : Bi(t)
  }
  get value() {
    return cc(this), this._value
  }
  set value(t) {
    const r = this.__v_isShallow || In(t) || ci(t);
    t = r ? t : me(t), Di(t, this._rawValue) && (this._rawValue = t, this._value = r ? t : Bi(t), hc(this))
  }
}

function oi(e) {
  return Ke(e) ? e.value : e
}
const Pd = {
  get: (e, t, r) => oi(Reflect.get(e, t, r)),
  set: (e, t, r, i) => {
    const n = e[t];
    return Ke(n) && !Ke(r) ? (n.value = r, !0) : Reflect.set(e, t, r, i)
  }
};

function uc(e) {
  return si(e) ? e : new Proxy(e, Pd)
}
class Cd {
  constructor (t, r, i, n) {
    this._setter = r, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Po(t, () => {
      this._dirty || (this._dirty = !0, hc(this))
    }), this.effect.computed = this, this.effect.active = this._cacheable = !n, this.__v_isReadonly = i
  }
  get value() {
    const t = me(this);
    return cc(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value
  }
  set value(t) {
    this._setter(t)
  }
}

function Ad(e, t, r = !1) {
  let i, n;
  const s = ce(e);
  return s ? (i = e, n = Mt) : (i = e.get, n = e.set), new Cd(i, n, s || !n, r)
}

function gr(e, t, r, i) {
  let n;
  try {
    n = i ? e(...i) : e()
  } catch (s) {
    Kn(s, t, r)
  }
  return n
}

function Et(e, t, r, i) {
  if (ce(e)) {
    const s = gr(e, t, r, i);
    return s && Xl(s) && s.catch(o => {
      Kn(o, t, r)
    }), s
  }
  const n = [];
  for (let s = 0; s < e.length; s++) n.push(Et(e[s], t, r, i));
  return n
}

function Kn(e, t, r, i = !0) {
  const n = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const o = t.proxy,
      a = r;
    for (; s;) {
      const c = s.ec;
      if (c) {
        for (let h = 0; h < c.length; h++)
          if (c[h](e, o, a) === !1) return
      }
      s = s.parent
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      gr(l, null, 10, [e, o, a]);
      return
    }
  }
  Rd(e, r, n, i)
}

function Rd(e, t, r, i = !0) {
  console.error(e)
}
let Vi = !1,
  Qs = !1;
const Ge = [];
let Lt = 0;
const ai = [];
let Ut = null,
  Lr = 0;
const dc = Promise.resolve();
let $o = null;

function vc(e) {
  const t = $o || dc;
  return e ? t.then(this ? e.bind(this) : e) : t
}

function zd(e) {
  let t = Lt + 1,
    r = Ge.length;
  for (; t < r;) {
    const i = t + r >>> 1;
    qi(Ge[i]) < e ? t = i + 1 : r = i
  }
  return t
}

function Oo(e) {
  (!Ge.length || !Ge.includes(e, Vi && e.allowRecurse ? Lt + 1 : Lt)) && (e.id == null ? Ge.push(e) : Ge.splice(zd(e.id), 0, e), pc())
}

function pc() {
  !Vi && !Qs && (Qs = !0, $o = dc.then(_c))
}

function Ld(e) {
  const t = Ge.indexOf(e);
  t > Lt && Ge.splice(t, 1)
}

function $d(e) {
  ne(e) ? ai.push(...e) : (!Ut || !Ut.includes(e, e.allowRecurse ? Lr + 1 : Lr)) && ai.push(e), pc()
}

function La(e, t = Vi ? Lt + 1 : 0) {
  for (; t < Ge.length; t++) {
    const r = Ge[t];
    r && r.pre && (Ge.splice(t, 1), t--, r())
  }
}

function mc(e) {
  if (ai.length) {
    const t = [...new Set(ai)];
    if (ai.length = 0, Ut) {
      Ut.push(...t);
      return
    }
    for (Ut = t, Ut.sort((r, i) => qi(r) - qi(i)), Lr = 0; Lr < Ut.length; Lr++) Ut[Lr]();
    Ut = null, Lr = 0
  }
}
const qi = e => e.id == null ? 1 / 0 : e.id,
  Od = (e, t) => {
    const r = qi(e) - qi(t);
    if (r === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1
    }
    return r
  };

function _c(e) {
  Qs = !1, Vi = !0, Ge.sort(Od);
  const t = Mt;
  try {
    for (Lt = 0; Lt < Ge.length; Lt++) {
      const r = Ge[Lt];
      r && r.active !== !1 && gr(r, null, 14)
    }
  } finally {
    Lt = 0, Ge.length = 0, mc(), Vi = !1, $o = null, (Ge.length || ai.length) && _c()
  }
}

function Id(e, t, ...r) {
  if (e.isUnmounted) return;
  const i = e.vnode.props || Ce;
  let n = r;
  const s = t.startsWith("update:"),
    o = s && t.slice(7);
  if (o && o in i) {
    const h = `${o === "modelValue" ? "model" : o}Modifiers`,
      {
        number: f,
        trim: u
      } = i[h] || Ce;
    u && (n = r.map(d => Be(d) ? d.trim() : d)), f && (n = r.map(Vu))
  }
  let a, l = i[a = bs(t)] || i[a = bs(Ft(t))];
  !l && s && (l = i[a = bs(pi(t))]), l && Et(l, e, 6, n);
  const c = i[a + "Once"];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    e.emitted[a] = !0, Et(c, e, 6, n)
  }
}

function yc(e, t, r = !1) {
  const i = t.emitsCache,
    n = i.get(e);
  if (n !== void 0) return n;
  const s = e.emits;
  let o = {},
    a = !1;
  if (!ce(e)) {
    const l = c => {
      const h = yc(c, t, !0); h && (a = !0, De(o, h))
    };
    !r && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l)
  }
  return !s && !a ? (Oe(e) && i.set(e, null), null) : (ne(s) ? s.forEach(l => o[l] = null) : De(o, s), Oe(e) && i.set(e, o), o)
}

function Zn(e, t) {
  return !e || !jn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), de(e, t[0].toLowerCase() + t.slice(1)) || de(e, pi(t)) || de(e, t))
}
let wt = null,
  Qn = null;

function Fn(e) {
  const t = wt;
  return wt = e, Qn = e && e.type.__scopeId || null, t
}

function gc(e) {
  Qn = e
}

function wc() {
  Qn = null
}

function vr(e, t = wt, r) {
  if (!t || e._n) return e;
  const i = (...n) => {
    i._d && Wa(-1);
    const s = Fn(t);
    let o;
    try {
      o = e(...n)
    } finally {
      Fn(s), i._d && Wa(1)
    }
    return o
  };
  return i._n = !0, i._c = !0, i._d = !0, i
}

function Es(e) {
  const {
    type: t,
    vnode: r,
    proxy: i,
    withProxy: n,
    props: s,
    propsOptions: [o],
    slots: a,
    attrs: l,
    emit: c,
    render: h,
    renderCache: f,
    data: u,
    setupState: d,
    ctx: p,
    inheritAttrs: g
  } = e;
  let _, b;
  const S = Fn(e);
  try {
    if (r.shapeFlag & 4) {
      const P = n || i;
      _ = zt(h.call(P, P, f, s, d, u, p)), b = l
    } else {
      const P = t;
      _ = zt(P.length > 1 ? P(s, {
        attrs: l,
        slots: a,
        emit: c
      }) : P(s, null)), b = t.props ? l : Fd(l)
    }
  } catch (P) {
    Hi.length = 0, Kn(P, e, 1), _ = $e(Nr)
  }
  let R = _;
  if (b && g !== !1) {
    const P = Object.keys(b),
      {
        shapeFlag: H
      } = R;
    P.length && H & 7 && (o && P.some(xo) && (b = Hd(b, o)), R = hi(R, b))
  }
  return r.dirs && (R = hi(R), R.dirs = R.dirs ? R.dirs.concat(r.dirs) : r.dirs), r.transition && (R.transition = r.transition), _ = R, Fn(S), _
}
const Fd = e => {
  let t;
  for (const r in e) (r === "class" || r === "style" || jn(r)) && ((t || (t = {}))[r] = e[r]);
  return t
},
  Hd = (e, t) => {
    const r = {};
    for (const i in e) (!xo(i) || !(i.slice(9) in t)) && (r[i] = e[i]);
    return r
  };

function kd(e, t, r) {
  const {
    props: i,
    children: n,
    component: s
  } = e, {
    props: o,
    children: a,
    patchFlag: l
  } = t, c = s.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (r && l >= 0) {
    if (l & 1024) return !0;
    if (l & 16) return i ? $a(i, o, c) : !!o;
    if (l & 8) {
      const h = t.dynamicProps;
      for (let f = 0; f < h.length; f++) {
        const u = h[f];
        if (o[u] !== i[u] && !Zn(c, u)) return !0
      }
    }
  } else return (n || a) && (!a || !a.$stable) ? !0 : i === o ? !1 : i ? o ? $a(i, o, c) : !0 : !!o;
  return !1
}

function $a(e, t, r) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length) return !0;
  for (let n = 0; n < i.length; n++) {
    const s = i[n];
    if (t[s] !== e[s] && !Zn(r, s)) return !0
  }
  return !1
}

function Nd({
  vnode: e,
  parent: t
}, r) {
  for (; t && t.subTree === e;)(e = t.vnode).el = r, t = t.parent
}
const Dd = e => e.__isSuspense;

function Bd(e, t) {
  t && t.pendingBranch ? ne(e) ? t.effects.push(...e) : t.effects.push(e) : $d(e)
}
const Mn = {};

function Oi(e, t, r) {
  return xc(e, t, r)
}

function xc(e, t, {
  immediate: r,
  deep: i,
  flush: n,
  onTrack: s,
  onTrigger: o
} = Ce) {
  var a;
  const l = Zu() === ((a = Ue) == null ? void 0 : a.scope) ? Ue : null;
  let c, h = !1,
    f = !1;
  if (Ke(e) ? (c = () => e.value, h = In(e)) : si(e) ? (c = () => e, i = !0) : ne(e) ? (f = !0, h = e.some(P => si(P) || In(P)), c = () => e.map(P => {
    if (Ke(P)) return P.value;
    if (si(P)) return ri(P);
    if (ce(P)) return gr(P, l, 2)
  })) : ce(e) ? t ? c = () => gr(e, l, 2) : c = () => {
    if (!(l && l.isUnmounted)) return u && u(), Et(e, l, 3, [d])
  } : c = Mt, t && i) {
    const P = c;
    c = () => ri(P())
  }
  let u, d = P => {
    u = S.onStop = () => {
      gr(P, l, 4)
    }
  },
    p;
  if (ji)
    if (d = Mt, t ? r && Et(t, l, 3, [c(), f ? [] : void 0, d]) : c(), n === "sync") {
      const P = Fv();
      p = P.__watcherHandles || (P.__watcherHandles = [])
    } else return Mt;
  let g = f ? new Array(e.length).fill(Mn) : Mn;
  const _ = () => {
    if (S.active)
      if (t) {
        const P = S.run();
        (i || h || (f ? P.some((H, O) => Di(H, g[O])) : Di(P, g))) && (u && u(), Et(t, l, 3, [P, g === Mn ? void 0 : f && g[0] === Mn ? [] : g, d]), g = P)
      } else S.run()
  };
  _.allowRecurse = !!t;
  let b;
  n === "sync" ? b = _ : n === "post" ? b = () => nt(_, l && l.suspense) : (_.pre = !0, l && (_.id = l.uid), b = () => Oo(_));
  const S = new Po(c, b);
  t ? r ? _() : g = S.run() : n === "post" ? nt(S.run.bind(S), l && l.suspense) : S.run();
  const R = () => {
    S.stop(),
      l && l.scope && bo(l.scope.effects, S)
  };
  return p && p.push(R), R
}

function Vd(e, t, r) {
  const i = this.proxy,
    n = Be(e) ? e.includes(".") ? bc(i, e) : () => i[e] : e.bind(i, i);
  let s;
  ce(t) ? s = t : (s = t.handler, r = t);
  const o = Ue;
  fi(this);
  const a = xc(n, s.bind(i), r);
  return o ? fi(o) : kr(), a
}

function bc(e, t) {
  const r = t.split(".");
  return () => {
    let i = e;
    for (let n = 0; n < r.length && i; n++) i = i[r[n]];
    return i
  }
}

function ri(e, t) {
  if (!Oe(e) || e.__v_skip || (t = t || new Set, t.has(e))) return e;
  if (t.add(e), Ke(e)) ri(e.value, t);
  else if (ne(e))
    for (let r = 0; r < e.length; r++) ri(e[r], t);
  else if (Fu(e) || $i(e)) e.forEach(r => {
    ri(r, t)
  });
  else if (Nu(e))
    for (const r in e) ri(e[r], t);
  return e
}

function Cr(e, t, r, i) {
  const n = e.dirs,
    s = t && t.dirs;
  for (let o = 0; o < n.length; o++) {
    const a = n[o];
    s && (a.oldValue = s[o].value);
    let l = a.dir[i];
    l && (mi(), Et(l, r, 8, [e.el, a, e, t]), _i())
  }
}

function Mc(e, t) {
  return ce(e) ? (() => De({
    name: e.name
  }, t, {
    setup: e
  }))() : e
}
const An = e => !!e.type.__asyncLoader,
  Ec = e => e.type.__isKeepAlive;

function qd(e, t) {
  Tc(e, "a", t)
}

function Wd(e, t) {
  Tc(e, "da", t)
}

function Tc(e, t, r = Ue) {
  const i = e.__wdc || (e.__wdc = () => {
    let n = r;
    for (; n;) {
      if (n.isDeactivated) return;
      n = n.parent
    }
    return e()
  });
  if (Jn(t, i, r), r) {
    let n = r.parent;
    for (; n && n.parent;) Ec(n.parent.vnode) && jd(i, t, r, n), n = n.parent
  }
}

function jd(e, t, r, i) {
  const n = Jn(t, e, i, !0);
  Pc(() => {
    bo(i[t], n)
  }, r)
}

function Jn(e, t, r = Ue, i = !1) {
  if (r) {
    const n = r[e] || (r[e] = []),
      s = t.__weh || (t.__weh = (...o) => {
        if (r.isUnmounted) return; mi(),
          fi(r);
        const a = Et(t, r, e, o);
        return kr(),
          _i(),
          a
      });
    return i ? n.unshift(s) : n.push(s), s
  }
}
const Jt = e => (t, r = Ue) => (!ji || e === "sp") && Jn(e, (...i) => t(...i), r),
  Ud = Jt("bm"),
  Sc = Jt("m"),
  Yd = Jt("bu"),
  Xd = Jt("u"),
  Gd = Jt("bum"),
  Pc = Jt("um"),
  Kd = Jt("sp"),
  Zd = Jt("rtg"),
  Qd = Jt("rtc");

function Jd(e, t = Ue) {
  Jn("ec", e, t)
}
const Cc = "components";

function Js(e, t) {
  return tv(Cc, e, !0, t) || e
}
const ev = Symbol.for("v-ndc");

function tv(e, t, r = !0, i = !1) {
  const n = wt || Ue;
  if (n) {
    const s = n.type;
    if (e === Cc) {
      const a = $v(s, !1);
      if (a && (a === t || a === Ft(t) || a === Xn(Ft(t)))) return s
    }
    const o = Oa(n[e] || s[e], t) || Oa(n.appContext[e], t);
    return !o && i ? s : o
  }
}

function Oa(e, t) {
  return e && (e[t] || e[Ft(t)] || e[Xn(Ft(t))])
}
const eo = e => e ? Dc(e) ? Do(e) || e.proxy : eo(e.parent) : null,
  Ii = De(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => eo(e.parent),
    $root: e => eo(e.root),
    $emit: e => e.emit,
    $options: e => Io(e),
    $forceUpdate: e => e.f || (e.f = () => Oo(e.update)),
    $nextTick: e => e.n || (e.n = vc.bind(e.proxy)),
    $watch: e => Vd.bind(e)
  }),
  Ts = (e, t) => e !== Ce && !e.__isScriptSetup && de(e, t),
  rv = {
    get({
      _: e
    }, t) {
      const {
        ctx: r,
        setupState: i,
        data: n,
        props: s,
        accessCache: o,
        type: a,
        appContext: l
      } = e;
      let c;
      if (t[0] !== "$") {
        const d = o[t];
        if (d !== void 0) switch (d) {
          case 1:
            return i[t];
          case 2:
            return n[t];
          case 4:
            return r[t];
          case 3:
            return s[t]
        } else {
          if (Ts(i, t)) return o[t] = 1, i[t];
          if (n !== Ce && de(n, t)) return o[t] = 2, n[t];
          if ((c = e.propsOptions[0]) && de(c, t)) return o[t] = 3, s[t];
          if (r !== Ce && de(r, t)) return o[t] = 4, r[t];
          to && (o[t] = 0)
        }
      }
      const h = Ii[t];
      let f, u;
      if (h) return t === "$attrs" && st(e, "get", t), h(e);
      if ((f = a.__cssModules) && (f = f[t])) return f;
      if (r !== Ce && de(r, t)) return o[t] = 4, r[t];
      if (u = l.config.globalProperties, de(u, t)) return u[t]
    },
    set({
      _: e
    }, t, r) {
      const {
        data: i,
        setupState: n,
        ctx: s
      } = e;
      return Ts(n, t) ? (n[t] = r, !0) : i !== Ce && de(i, t) ? (i[t] = r, !0) : de(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = r, !0)
    },
    has({
      _: {
        data: e,
        setupState: t,
        accessCache: r,
        ctx: i,
        appContext: n,
        propsOptions: s
      }
    }, o) {
      let a;
      return !!r[o] || e !== Ce && de(e, o) || Ts(t, o) || (a = s[0]) && de(a, o) || de(i, o) || de(Ii, o) || de(n.config.globalProperties, o)
    },
    defineProperty(e, t, r) {
      return r.get != null ? e._.accessCache[t] = 0 : de(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r)
    }
  };

function Ia(e) {
  return ne(e) ? e.reduce((t, r) => (t[r] = null, t), {}) : e
}
let to = !0;

function iv(e) {
  const t = Io(e),
    r = e.proxy,
    i = e.ctx;
  to = !1, t.beforeCreate && Fa(t.beforeCreate, e, "bc");
  const {
    data: n,
    computed: s,
    methods: o,
    watch: a,
    provide: l,
    inject: c,
    created: h,
    beforeMount: f,
    mounted: u,
    beforeUpdate: d,
    updated: p,
    activated: g,
    deactivated: _,
    beforeDestroy: b,
    beforeUnmount: S,
    destroyed: R,
    unmounted: P,
    render: H,
    renderTracked: O,
    renderTriggered: Y,
    errorCaptured: Q,
    serverPrefetch: ee,
    expose: J,
    inheritAttrs: U,
    components: se,
    directives: ae,
    filters: K
  } = t;
  if (c && nv(c, i, null), o)
    for (const Z in o) {
      const he = o[Z];
      ce(he) && (i[Z] = he.bind(r))
    }
  if (n) {
    const Z = n.call(r, r);
    Oe(Z) && (e.data = Zi(Z))
  }
  if (to = !0, s)
    for (const Z in s) {
      const he = s[Z],
        Ie = ce(he) ? he.bind(r, r) : ce(he.get) ? he.get.bind(r, r) : Mt,
        Re = !ce(he) && ce(he.set) ? he.set.bind(r) : Mt,
        ct = dt({
          get: Ie,
          set: Re
        });
      Object.defineProperty(i, Z, {
        enumerable: !0,
        configurable: !0,
        get: () => ct.value,
        set: Ne => ct.value = Ne
      })
    }
  if (a)
    for (const Z in a) Ac(a[Z], i, r, Z);
  if (l) {
    const Z = ce(l) ? l.call(r) : l;
    Reflect.ownKeys(Z).forEach(he => {
      Rn(he, Z[he])
    })
  }
  h && Fa(h, e, "c");

  function be(Z, he) {
    ne(he) ? he.forEach(Ie => Z(Ie.bind(r))) : he && Z(he.bind(r))
  }
  if (be(Ud, f), be(Sc, u), be(Yd, d), be(Xd, p), be(qd, g), be(Wd, _), be(Jd, Q), be(Qd, O), be(Zd, Y), be(Gd, S), be(Pc, P), be(Kd, ee), ne(J))
    if (J.length) {
      const Z = e.exposed || (e.exposed = {});
      J.forEach(he => {
        Object.defineProperty(Z, he, {
          get: () => r[he],
          set: Ie => r[he] = Ie
        })
      })
    } else e.exposed || (e.exposed = {});
  H && e.render === Mt && (e.render = H), U != null && (e.inheritAttrs = U), se && (e.components = se), ae && (e.directives = ae)
}

function nv(e, t, r = Mt) {
  ne(e) && (e = ro(e));
  for (const i in e) {
    const n = e[i];
    let s;
    Oe(n) ? "default" in n ? s = Ot(n.from || i, n.default, !0) : s = Ot(n.from || i) : s = Ot(n), Ke(s) ? Object.defineProperty(t, i, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: o => s.value = o
    }) : t[i] = s
  }
}

function Fa(e, t, r) {
  Et(ne(e) ? e.map(i => i.bind(t.proxy)) : e.bind(t.proxy), t, r)
}

function Ac(e, t, r, i) {
  const n = i.includes(".") ? bc(r, i) : () => r[i];
  if (Be(e)) {
    const s = t[e];
    ce(s) && Oi(n, s)
  } else if (ce(e)) Oi(n, e.bind(r));
  else if (Oe(e))
    if (ne(e)) e.forEach(s => Ac(s, t, r, i));
    else {
      const s = ce(e.handler) ? e.handler.bind(r) : t[e.handler];
      ce(s) && Oi(n, s, e)
    }
}

function Io(e) {
  const t = e.type,
    {
      mixins: r,
      extends: i
    } = t,
    {
      mixins: n,
      optionsCache: s,
      config: {
        optionMergeStrategies: o
      }
    } = e.appContext,
    a = s.get(t);
  let l;
  return a ? l = a : !n.length && !r && !i ? l = t : (l = {}, n.length && n.forEach(c => Hn(l, c, o, !0)), Hn(l, t, o)), Oe(t) && s.set(t, l), l
}

function Hn(e, t, r, i = !1) {
  const {
    mixins: n,
    extends: s
  } = t;
  s && Hn(e, s, r, !0), n && n.forEach(o => Hn(e, o, r, !0));
  for (const o in t)
    if (!(i && o === "expose")) {
      const a = sv[o] || r && r[o];
      e[o] = a ? a(e[o], t[o]) : t[o]
    }
  return e
}
const sv = {
  data: Ha,
  props: ka,
  emits: ka,
  methods: zi,
  computed: zi,
  beforeCreate: tt,
  created: tt,
  beforeMount: tt,
  mounted: tt,
  beforeUpdate: tt,
  updated: tt,
  beforeDestroy: tt,
  beforeUnmount: tt,
  destroyed: tt,
  unmounted: tt,
  activated: tt,
  deactivated: tt,
  errorCaptured: tt,
  serverPrefetch: tt,
  components: zi,
  directives: zi,
  watch: av,
  provide: Ha,
  inject: ov
};

function Ha(e, t) {
  return t ? e ? function () {
    return De(ce(e) ? e.call(this, this) : e, ce(t) ? t.call(this, this) : t)
  } : t : e
}

function ov(e, t) {
  return zi(ro(e), ro(t))
}

function ro(e) {
  if (ne(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) t[e[r]] = e[r];
    return t
  }
  return e
}

function tt(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}

function zi(e, t) {
  return e ? De(Object.create(null), e, t) : t
}

function ka(e, t) {
  return e ? ne(e) && ne(t) ? [...new Set([...e, ...t])] : De(Object.create(null), Ia(e), Ia(t ?? {})) : t
}

function av(e, t) {
  if (!e) return t;
  if (!t) return e;
  const r = De(Object.create(null), e);
  for (const i in t) r[i] = tt(e[i], t[i]);
  return r
}

function Rc() {
  return {
    app: null,
    config: {
      isNativeTag: $u,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap,
    propsCache: new WeakMap,
    emitsCache: new WeakMap
  }
}
let lv = 0;

function cv(e, t) {
  return function (i, n = null) {
    ce(i) || (i = De({}, i)), n != null && !Oe(n) && (n = null);
    const s = Rc(),
      o = new Set;
    let a = !1;
    const l = s.app = {
      _uid: lv++,
      _component: i,
      _props: n,
      _container: null,
      _context: s,
      _instance: null,
      version: Hv,
      get config() {
        return s.config
      },
      set config(c) { },
      use(c, ...h) {
        return o.has(c) || (c && ce(c.install) ? (o.add(c), c.install(l, ...h)) : ce(c) && (o.add(c), c(l, ...h))), l
      },
      mixin(c) {
        return s.mixins.includes(c) || s.mixins.push(c), l
      },
      component(c, h) {
        return h ? (s.components[c] = h, l) : s.components[c]
      },
      directive(c, h) {
        return h ? (s.directives[c] = h, l) : s.directives[c]
      },
      mount(c, h, f) {
        if (!a) {
          const u = $e(i, n);
          return u.appContext = s, h && t ? t(u, c) : e(u, c, f), a = !0, l._container = c, c.__vue_app__ = l, Do(u.component) || u.component.proxy
        }
      },
      unmount() {
        a && (e(null, l._container), delete l._container.__vue_app__)
      },
      provide(c, h) {
        return s.provides[c] = h, l
      },
      runWithContext(c) {
        kn = l;
        try {
          return c()
        } finally {
          kn = null
        }
      }
    };
    return l
  }
}
let kn = null;

function Rn(e, t) {
  if (Ue) {
    let r = Ue.provides;
    const i = Ue.parent && Ue.parent.provides;
    i === r && (r = Ue.provides = Object.create(i)), r[e] = t
  }
}

function Ot(e, t, r = !1) {
  const i = Ue || wt;
  if (i || kn) {
    const n = i ? i.parent == null ? i.vnode.appContext && i.vnode.appContext.provides : i.parent.provides : kn._context.provides;
    if (n && e in n) return n[e];
    if (arguments.length > 1) return r && ce(t) ? t.call(i && i.proxy) : t
  }
}

function hv(e, t, r, i = !1) {
  const n = {},
    s = {};
  On(s, ts, 1), e.propsDefaults = Object.create(null), zc(e, t, n, s);
  for (const o in e.propsOptions[0]) o in n || (n[o] = void 0);
  r ? e.props = i ? n : Ed(n) : e.type.props ? e.props = n : e.props = s, e.attrs = s
}

function fv(e, t, r, i) {
  const {
    props: n,
    attrs: s,
    vnode: {
      patchFlag: o
    }
  } = e, a = me(n), [l] = e.propsOptions;
  let c = !1;
  if ((i || o > 0) && !(o & 16)) {
    if (o & 8) {
      const h = e.vnode.dynamicProps;
      for (let f = 0; f < h.length; f++) {
        let u = h[f];
        if (Zn(e.emitsOptions, u)) continue;
        const d = t[u];
        if (l)
          if (de(s, u)) d !== s[u] && (s[u] = d, c = !0);
          else {
            const p = Ft(u);
            n[p] = io(l, a, p, d, e, !1)
          } else d !== s[u] && (s[u] = d, c = !0)
      }
    }
  } else {
    zc(e, t, n, s) && (c = !0);
    let h;
    for (const f in a) (!t || !de(t, f) && ((h = pi(f)) === f || !de(t, h))) && (l ? r && (r[f] !== void 0 || r[h] !== void 0) && (n[f] = io(l, a, f, void 0, e, !0)) : delete n[f]);
    if (s !== a)
      for (const f in s) (!t || !de(t, f)) && (delete s[f], c = !0)
  }
  c && Gt(e, "set", "$attrs")
}

function zc(e, t, r, i) {
  const [n, s] = e.propsOptions;
  let o = !1,
    a;
  if (t)
    for (let l in t) {
      if (Cn(l)) continue;
      const c = t[l];
      let h;
      n && de(n, h = Ft(l)) ? !s || !s.includes(h) ? r[h] = c : (a || (a = {}))[h] = c : Zn(e.emitsOptions, l) || (!(l in i) || c !== i[l]) && (i[l] = c, o = !0)
    }
  if (s) {
    const l = me(r),
      c = a || Ce;
    for (let h = 0; h < s.length; h++) {
      const f = s[h];
      r[f] = io(n, l, f, c[f], e, !de(c, f))
    }
  }
  return o
}

function io(e, t, r, i, n, s) {
  const o = e[r];
  if (o != null) {
    const a = de(o, "default");
    if (a && i === void 0) {
      const l = o.default;
      if (o.type !== Function && !o.skipFactory && ce(l)) {
        const {
          propsDefaults: c
        } = n;
        r in c ? i = c[r] : (fi(n), i = c[r] = l.call(null, t), kr())
      } else i = l
    }
    o[0] && (s && !a ? i = !1 : o[1] && (i === "" || i === pi(r)) && (i = !0))
  }
  return i
}

function Lc(e, t, r = !1) {
  const i = t.propsCache,
    n = i.get(e);
  if (n) return n;
  const s = e.props,
    o = {},
    a = [];
  let l = !1;
  if (!ce(e)) {
    const h = f => {
      l = !0;
      const [u, d] = Lc(f, t, !0); De(o, u),
        d && a.push(...d)
    };
    !r && t.mixins.length && t.mixins.forEach(h), e.extends && h(e.extends), e.mixins && e.mixins.forEach(h)
  }
  if (!s && !l) return Oe(e) && i.set(e, ni), ni;
  if (ne(s))
    for (let h = 0; h < s.length; h++) {
      const f = Ft(s[h]);
      Na(f) && (o[f] = Ce)
    } else if (s)
    for (const h in s) {
      const f = Ft(h);
      if (Na(f)) {
        const u = s[h],
          d = o[f] = ne(u) || ce(u) ? {
            type: u
          } : De({}, u);
        if (d) {
          const p = Va(Boolean, d.type),
            g = Va(String, d.type);
          d[0] = p > -1, d[1] = g < 0 || p < g, (p > -1 || de(d, "default")) && a.push(f)
        }
      }
    }
  const c = [o, a];
  return Oe(e) && i.set(e, c), c
}

function Na(e) {
  return e[0] !== "$"
}

function Da(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : ""
}

function Ba(e, t) {
  return Da(e) === Da(t)
}

function Va(e, t) {
  return ne(t) ? t.findIndex(r => Ba(r, e)) : ce(t) && Ba(t, e) ? 0 : -1
}
const $c = e => e[0] === "_" || e === "$stable",
  Fo = e => ne(e) ? e.map(zt) : [zt(e)],
  uv = (e, t, r) => {
    if (t._n) return t;
    const i = vr((...n) => Fo(t(...n)), r);
    return i._c = !1,
      i
  },
  Oc = (e, t, r) => {
    const i = e._ctx;
    for (const n in e) {
      if ($c(n)) continue;
      const s = e[n];
      if (ce(s)) t[n] = uv(n, s, i);
      else if (s != null) {
        const o = Fo(s);
        t[n] = () => o
      }
    }
  },
  Ic = (e, t) => {
    const r = Fo(t); e.slots.default = () => r
  },
  dv = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const r = t._;
      r ? (e.slots = me(t), On(t, "_", r)) : Oc(t, e.slots = {})
    } else e.slots = {},
      t && Ic(e, t); On(e.slots, ts, 1)
  },
  vv = (e, t, r) => {
    const {
      vnode: i,
      slots: n
    } = e;
    let s = !0,
      o = Ce;
    if (i.shapeFlag & 32) {
      const a = t._;
      a ? r && a === 1 ? s = !1 : (De(n, t), !r && a === 1 && delete n._) : (s = !t.$stable, Oc(t, n)), o = t
    } else t && (Ic(e, t), o = {
      default: 1
    });
    if (s)
      for (const a in n) !$c(a) && !(a in o) && delete n[a]
  };

function no(e, t, r, i, n = !1) {
  if (ne(e)) {
    e.forEach((u, d) => no(u, t && (ne(t) ? t[d] : t), r, i, n));
    return
  }
  if (An(i) && !n) return;
  const s = i.shapeFlag & 4 ? Do(i.component) || i.component.proxy : i.el,
    o = n ? null : s,
    {
      i: a,
      r: l
    } = e,
    c = t && t.r,
    h = a.refs === Ce ? a.refs = {} : a.refs,
    f = a.setupState;
  if (c != null && c !== l && (Be(c) ? (h[c] = null, de(f, c) && (f[c] = null)) : Ke(c) && (c.value = null)), ce(l)) gr(l, a, 12, [o, h]);
  else {
    const u = Be(l),
      d = Ke(l);
    if (u || d) {
      const p = () => {
        if (e.f) {
          const g = u ? de(f, l) ? f[l] : h[l] : l.value;
          n ? ne(g) && bo(g, s) : ne(g) ? g.includes(s) || g.push(s) : u ? (h[l] = [s], de(f, l) && (f[l] = h[l])) : (l.value = [s], e.k && (h[e.k] = l.value))
        } else u ? (h[l] = o, de(f, l) && (f[l] = o)) : d && (l.value = o, e.k && (h[e.k] = o))
      };
      o ? (p.id = -1, nt(p, r)) : p()
    }
  }
}
const nt = Bd;

function pv(e) {
  return mv(e)
}

function mv(e, t) {
  const r = Ys();
  r.__VUE__ = !0;
  const {
    insert: i,
    remove: n,
    patchProp: s,
    createElement: o,
    createText: a,
    createComment: l,
    setText: c,
    setElementText: h,
    parentNode: f,
    nextSibling: u,
    setScopeId: d = Mt,
    insertStaticContent: p
  } = e, g = (y, w, M, C = null, z = null, $ = null, V = !1, I = null, B = !!w.dynamicChildren) => {
    if (y === w) return; y && !Ci(y, w) && (C = T(y), Ne(y, z, $, !0), y = null),
      w.patchFlag === -2 && (B = !1, w.dynamicChildren = null);
    const {
      type: F,
      ref: X,
      shapeFlag: q
    } = w;
    switch (F) {
      case es:
        _(y, w, M, C);
        break;
      case Nr:
        b(y, w, M, C);
        break;
      case Ss:
        y == null && S(w, M, C, V);
        break;
      case yt:
        se(y, w, M, C, z, $, V, I, B);
        break;
      default:
        q & 1 ? H(y, w, M, C, z, $, V, I, B) : q & 6 ? ae(y, w, M, C, z, $, V, I, B) : (q & 64 || q & 128) && F.process(y, w, M, C, z, $, V, I, B, D)
    }
    X != null && z && no(X, y && y.ref, $, w || y, !w)
  }, _ = (y, w, M, C) => {
    if (y == null) i(w.el = a(w.children), M, C);
    else {
      const z = w.el = y.el;
      w.children !== y.children && c(z, w.children)
    }
  }, b = (y, w, M, C) => {
    y == null ? i(w.el = l(w.children || ""), M, C) : w.el = y.el
  }, S = (y, w, M, C) => {
    [y.el, y.anchor] = p(y.children, w, M, C, y.el, y.anchor)
  }, R = ({
    el: y,
    anchor: w
  }, M, C) => {
    let z;
    for (; y && y !== w;) z = u(y),
      i(y, M, C),
      y = z; i(w, M, C)
  }, P = ({
    el: y,
    anchor: w
  }) => {
    let M;
    for (; y && y !== w;) M = u(y),
      n(y),
      y = M; n(w)
  }, H = (y, w, M, C, z, $, V, I, B) => {
    V = V || w.type === "svg",
      y == null ? O(w, M, C, z, $, V, I, B) : ee(y, w, z, $, V, I, B)
  }, O = (y, w, M, C, z, $, V, I) => {
    let B, F;
    const {
      type: X,
      props: q,
      shapeFlag: G,
      transition: re,
      dirs: le
    } = y;
    if (B = y.el = o(y.type, $, q && q.is, q), G & 8 ? h(B, y.children) : G & 16 && Q(y.children, B, null, C, z, $ && X !== "foreignObject", V, I), le && Cr(y, null, C, "created"), Y(B, y, y.scopeId, V, C), q) {
      for (const ve in q) ve !== "value" && !Cn(ve) && s(B, ve, null, q[ve], $, y.children, C, z, Pe);
      "value" in q && s(B, "value", null, q.value), (F = q.onVnodeBeforeMount) && At(F, C, y)
    }
    le && Cr(y, null, C, "beforeMount");
    const Me = (!z || z && !z.pendingBranch) && re && !re.persisted; Me && re.beforeEnter(B),
      i(B, w, M),
      ((F = q && q.onVnodeMounted) || Me || le) && nt(() => {
        F && At(F, C, y),
          Me && re.enter(B),
          le && Cr(y, null, C, "mounted")
      }, z)
  }, Y = (y, w, M, C, z) => {
    if (M && d(y, M), C)
      for (let $ = 0; $ < C.length; $++) d(y, C[$]);
    if (z) {
      let $ = z.subTree;
      if (w === $) {
        const V = z.vnode;
        Y(y, V, V.scopeId, V.slotScopeIds, z.parent)
      }
    }
  }, Q = (y, w, M, C, z, $, V, I, B = 0) => {
    for (let F = B; F < y.length; F++) {
      const X = y[F] = I ? pr(y[F]) : zt(y[F]);
      g(null, X, w, M, C, z, $, V, I)
    }
  }, ee = (y, w, M, C, z, $, V) => {
    const I = w.el = y.el;
    let {
      patchFlag: B,
      dynamicChildren: F,
      dirs: X
    } = w; B |= y.patchFlag & 16;
    const q = y.props || Ce,
      G = w.props || Ce;
    let re; M && Ar(M, !1),
      (re = G.onVnodeBeforeUpdate) && At(re, M, w, y),
      X && Cr(w, y, M, "beforeUpdate"),
      M && Ar(M, !0);
    const le = z && w.type !== "foreignObject";
    if (F ? J(y.dynamicChildren, F, I, M, C, le, $) : V || he(y, w, I, null, M, C, le, $, !1), B > 0) {
      if (B & 16) U(I, w, q, G, M, C, z);
      else if (B & 2 && q.class !== G.class && s(I, "class", null, G.class, z), B & 4 && s(I, "style", q.style, G.style, z), B & 8) {
        const Me = w.dynamicProps;
        for (let ve = 0; ve < Me.length; ve++) {
          const Se = Me[ve],
            Ze = q[Se],
            or = G[Se];
          (or !== Ze || Se === "value") && s(I, Se, Ze, or, z, y.children, M, C, Pe)
        }
      }
      B & 1 && y.children !== w.children && h(I, w.children)
    } else !V && F == null && U(I, w, q, G, M, C, z);
    ((re = G.onVnodeUpdated) || X) && nt(() => {
      re && At(re, M, w, y),
        X && Cr(w, y, M, "updated")
    }, C)
  }, J = (y, w, M, C, z, $, V) => {
    for (let I = 0; I < w.length; I++) {
      const B = y[I],
        F = w[I],
        X = B.el && (B.type === yt || !Ci(B, F) || B.shapeFlag & 70) ? f(B.el) : M;
      g(B, F, X, null, C, z, $, V, !0)
    }
  }, U = (y, w, M, C, z, $, V) => {
    if (M !== C) {
      if (M !== Ce)
        for (const I in M) !Cn(I) && !(I in C) && s(y, I, M[I], null, V, w.children, z, $, Pe);
      for (const I in C) {
        if (Cn(I)) continue;
        const B = C[I],
          F = M[I];
        B !== F && I !== "value" && s(y, I, F, B, V, w.children, z, $, Pe)
      }
      "value" in C && s(y, "value", M.value, C.value)
    }
  }, se = (y, w, M, C, z, $, V, I, B) => {
    const F = w.el = y ? y.el : a(""),
      X = w.anchor = y ? y.anchor : a("");
    let {
      patchFlag: q,
      dynamicChildren: G,
      slotScopeIds: re
    } = w; re && (I = I ? I.concat(re) : re),
      y == null ? (i(F, M, C), i(X, M, C), Q(w.children, M, X, z, $, V, I, B)) : q > 0 && q & 64 && G && y.dynamicChildren ? (J(y.dynamicChildren, G, M, z, $, V, I), (w.key != null || z && w === z.subTree) && Ho(y, w, !0)) : he(y, w, M, X, z, $, V, I, B)
  }, ae = (y, w, M, C, z, $, V, I, B) => {
    w.slotScopeIds = I,
      y == null ? w.shapeFlag & 512 ? z.ctx.activate(w, M, C, V, B) : K(w, M, C, z, $, V, B) : E(y, w, B)
  }, K = (y, w, M, C, z, $, V) => {
    const I = y.component = Cv(y, C, z);
    if (Ec(y) && (I.ctx.renderer = D), Av(I), I.asyncDep) {
      if (z && z.registerDep(I, be), !y.el) {
        const B = I.subTree = $e(Nr);
        b(null, B, w, M)
      }
      return
    }
    be(I, y, w, M, z, $, V)
  }, E = (y, w, M) => {
    const C = w.component = y.component;
    if (kd(y, w, M))
      if (C.asyncDep && !C.asyncResolved) {
        Z(C, w, M);
        return
      } else C.next = w, Ld(C.update), C.update();
    else w.el = y.el,
      C.vnode = w
  }, be = (y, w, M, C, z, $, V) => {
    const I = () => {
      if (y.isMounted) {
        let {
          next: X,
          bu: q,
          u: G,
          parent: re,
          vnode: le
        } = y, Me = X, ve;
        Ar(y, !1), X ? (X.el = le.el, Z(y, X, V)) : X = le, q && Ms(q), (ve = X.props && X.props.onVnodeBeforeUpdate) && At(ve, re, X, le), Ar(y, !0);
        const Se = Es(y),
          Ze = y.subTree;
        y.subTree = Se, g(Ze, Se, f(Ze.el), T(Ze), y, z, $), X.el = Se.el, Me === null && Nd(y, Se.el), G && nt(G, z), (ve = X.props && X.props.onVnodeUpdated) && nt(() => At(ve, re, X, le), z)
      } else {
        let X;
        const {
          el: q,
          props: G
        } = w, {
          bm: re,
          m: le,
          parent: Me
        } = y, ve = An(w);
        if (Ar(y, !1), re && Ms(re), !ve && (X = G && G.onVnodeBeforeMount) && At(X, Me, w), Ar(y, !0), q && ue) {
          const Se = () => {
            y.subTree = Es(y),
              ue(q, y.subTree, y, z, null)
          };
          ve ? w.type.__asyncLoader().then(() => !y.isUnmounted && Se()) : Se()
        } else {
          const Se = y.subTree = Es(y);
          g(null, Se, M, C, y, z, $), w.el = Se.el
        }
        if (le && nt(le, z), !ve && (X = G && G.onVnodeMounted)) {
          const Se = w;
          nt(() => At(X, Me, Se), z)
        } (w.shapeFlag & 256 || Me && An(Me.vnode) && Me.vnode.shapeFlag & 256) && y.a && nt(y.a, z), y.isMounted = !0, w = M = C = null
      }
    },
      B = y.effect = new Po(I, () => Oo(F), y.scope),
      F = y.update = () => B.run(); F.id = y.uid,
        Ar(y, !0),
        F()
  }, Z = (y, w, M) => {
    w.component = y;
    const C = y.vnode.props; y.vnode = w,
      y.next = null,
      fv(y, w.props, C, M),
      vv(y, w.children, M),
      mi(),
      La(),
      _i()
  }, he = (y, w, M, C, z, $, V, I, B = !1) => {
    const F = y && y.children,
      X = y ? y.shapeFlag : 0,
      q = w.children,
      {
        patchFlag: G,
        shapeFlag: re
      } = w;
    if (G > 0) {
      if (G & 128) {
        Re(F, q, M, C, z, $, V, I, B);
        return
      } else if (G & 256) {
        Ie(F, q, M, C, z, $, V, I, B);
        return
      }
    }
    re & 8 ? (X & 16 && Pe(F, z, $), q !== F && h(M, q)) : X & 16 ? re & 16 ? Re(F, q, M, C, z, $, V, I, B) : Pe(F, z, $, !0) : (X & 8 && h(M, ""), re & 16 && Q(q, M, C, z, $, V, I, B))
  }, Ie = (y, w, M, C, z, $, V, I, B) => {
    y = y || ni,
      w = w || ni;
    const F = y.length,
      X = w.length,
      q = Math.min(F, X);
    let G;
    for (G = 0; G < q; G++) {
      const re = w[G] = B ? pr(w[G]) : zt(w[G]);
      g(y[G], re, M, null, z, $, V, I, B)
    }
    F > X ? Pe(y, z, $, !0, !1, q) : Q(w, M, C, z, $, V, I, B, q)
  }, Re = (y, w, M, C, z, $, V, I, B) => {
    let F = 0;
    const X = w.length;
    let q = y.length - 1,
      G = X - 1;
    for (; F <= q && F <= G;) {
      const re = y[F],
        le = w[F] = B ? pr(w[F]) : zt(w[F]);
      if (Ci(re, le)) g(re, le, M, null, z, $, V, I, B);
      else break;
      F++
    }
    for (; F <= q && F <= G;) {
      const re = y[q],
        le = w[G] = B ? pr(w[G]) : zt(w[G]);
      if (Ci(re, le)) g(re, le, M, null, z, $, V, I, B);
      else break;
      q--, G--
    }
    if (F > q) {
      if (F <= G) {
        const re = G + 1,
          le = re < X ? w[re].el : C;
        for (; F <= G;) g(null, w[F] = B ? pr(w[F]) : zt(w[F]), M, le, z, $, V, I, B), F++
      }
    } else if (F > G)
      for (; F <= q;) Ne(y[F], z, $, !0), F++;
    else {
      const re = F,
        le = F,
        Me = new Map;
      for (F = le; F <= G; F++) {
        const Qe = w[F] = B ? pr(w[F]) : zt(w[F]);
        Qe.key != null && Me.set(Qe.key, F)
      }
      let ve, Se = 0;
      const Ze = G - le + 1;
      let or = !1,
        hn = 0;
      const Pr = new Array(Ze);
      for (F = 0; F < Ze; F++) Pr[F] = 0;
      for (F = re; F <= q; F++) {
        const Qe = y[F];
        if (Se >= Ze) {
          Ne(Qe, z, $, !0);
          continue
        }
        let Je;
        if (Qe.key != null) Je = Me.get(Qe.key);
        else
          for (ve = le; ve <= G; ve++)
            if (Pr[ve - le] === 0 && Ci(Qe, w[ve])) {
              Je = ve;
              break
            }
        Je === void 0 ? Ne(Qe, z, $, !0) : (Pr[Je - le] = F + 1, Je >= hn ? hn = Je : or = !0, g(Qe, w[Je], M, null, z, $, V, I, B), Se++)
      }
      const fn = or ? _v(Pr) : ni;
      for (ve = fn.length - 1, F = Ze - 1; F >= 0; F--) {
        const Qe = le + F,
          Je = w[Qe],
          un = Qe + 1 < X ? w[Qe + 1].el : C;
        Pr[F] === 0 ? g(null, Je, M, un, z, $, V, I, B) : or && (ve < 0 || F !== fn[ve] ? ct(Je, M, un, 2) : ve--)
      }
    }
  }, ct = (y, w, M, C, z = null) => {
    const {
      el: $,
      type: V,
      transition: I,
      children: B,
      shapeFlag: F
    } = y;
    if (F & 6) {
      ct(y.component.subTree, w, M, C);
      return
    }
    if (F & 128) {
      y.suspense.move(w, M, C);
      return
    }
    if (F & 64) {
      V.move(y, w, M, D);
      return
    }
    if (V === yt) {
      i($, w, M);
      for (let q = 0; q < B.length; q++) ct(B[q], w, M, C);
      i(y.anchor, w, M);
      return
    }
    if (V === Ss) {
      R(y, w, M);
      return
    }
    if (C !== 2 && F & 1 && I)
      if (C === 0) I.beforeEnter($), i($, w, M), nt(() => I.enter($), z);
      else {
        const {
          leave: q,
          delayLeave: G,
          afterLeave: re
        } = I, le = () => i($, w, M), Me = () => {
          q($, () => {
            le(),
              re && re()
          })
        };
        G ? G($, le, Me) : Me()
      } else i($, w, M)
  }, Ne = (y, w, M, C = !1, z = !1) => {
    const {
      type: $,
      props: V,
      ref: I,
      children: B,
      dynamicChildren: F,
      shapeFlag: X,
      patchFlag: q,
      dirs: G
    } = y;
    if (I != null && no(I, null, M, y, !0), X & 256) {
      w.ctx.deactivate(y);
      return
    }
    const re = X & 1 && G,
      le = !An(y);
    let Me;
    if (le && (Me = V && V.onVnodeBeforeUnmount) && At(Me, w, y), X & 6) He(y.component, M, C);
    else {
      if (X & 128) {
        y.suspense.unmount(M, C);
        return
      }
      re && Cr(y, null, w, "beforeUnmount"), X & 64 ? y.type.remove(y, w, M, z, D, C) : F && ($ !== yt || q > 0 && q & 64) ? Pe(F, w, M, !1, !0) : ($ === yt && q & 384 || !z && X & 16) && Pe(B, w, M), C && nr(y)
    } (le && (Me = V && V.onVnodeUnmounted) || re) && nt(() => {
      Me && At(Me, w, y),
        re && Cr(y, null, w, "unmounted")
    }, M)
  }, nr = y => {
    const {
      type: w,
      el: M,
      anchor: C,
      transition: z
    } = y;
    if (w === yt) {
      sr(M, C);
      return
    }
    if (w === Ss) {
      P(y);
      return
    }
    const $ = () => {
      n(M),
        z && !z.persisted && z.afterLeave && z.afterLeave()
    };
    if (y.shapeFlag & 1 && z && !z.persisted) {
      const {
        leave: V,
        delayLeave: I
      } = z, B = () => V(M, $);
      I ? I(y.el, $, B) : B()
    } else $()
  }, sr = (y, w) => {
    let M;
    for (; y !== w;) M = u(y),
      n(y),
      y = M; n(w)
  }, He = (y, w, M) => {
    const {
      bum: C,
      scope: z,
      update: $,
      subTree: V,
      um: I
    } = y; C && Ms(C),
      z.stop(),
      $ && ($.active = !1, Ne(V, y, w, M)),
      I && nt(I, w),
      nt(() => {
        y.isUnmounted = !0
      }, w),
      w && w.pendingBranch && !w.isUnmounted && y.asyncDep && !y.asyncResolved && y.suspenseId === w.pendingId && (w.deps--, w.deps === 0 && w.resolve())
  }, Pe = (y, w, M, C = !1, z = !1, $ = 0) => {
    for (let V = $; V < y.length; V++) Ne(y[V], w, M, C, z)
  }, T = y => y.shapeFlag & 6 ? T(y.component.subTree) : y.shapeFlag & 128 ? y.suspense.next() : u(y.anchor || y.el), N = (y, w, M) => {
    y == null ? w._vnode && Ne(w._vnode, null, null, !0) : g(w._vnode || null, y, w, null, null, null, M),
      La(),
      mc(),
      w._vnode = y
  }, D = {
    p: g,
    um: Ne,
    m: ct,
    r: nr,
    mt: K,
    mc: Q,
    pc: he,
    pbc: J,
    n: T,
    o: e
  };
  let j, ue;
  return t && ([j, ue] = t(D)), {
    render: N,
    hydrate: j,
    createApp: cv(N, j)
  }
}

function Ar({
  effect: e,
  update: t
}, r) {
  e.allowRecurse = t.allowRecurse = r
}

function Ho(e, t, r = !1) {
  const i = e.children,
    n = t.children;
  if (ne(i) && ne(n))
    for (let s = 0; s < i.length; s++) {
      const o = i[s];
      let a = n[s];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = n[s] = pr(n[s]), a.el = o.el), r || Ho(o, a)), a.type === es && (a.el = o.el)
    }
}

function _v(e) {
  const t = e.slice(),
    r = [0];
  let i, n, s, o, a;
  const l = e.length;
  for (i = 0; i < l; i++) {
    const c = e[i];
    if (c !== 0) {
      if (n = r[r.length - 1], e[n] < c) {
        t[i] = n, r.push(i);
        continue
      }
      for (s = 0, o = r.length - 1; s < o;) a = s + o >> 1, e[r[a]] < c ? s = a + 1 : o = a;
      c < e[r[s]] && (s > 0 && (t[i] = r[s - 1]), r[s] = i)
    }
  }
  for (s = r.length, o = r[s - 1]; s-- > 0;) r[s] = o, o = t[o];
  return r
}
const yv = e => e.__isTeleport,
  Fi = e => e && (e.disabled || e.disabled === ""),
  qa = e => typeof SVGElement < "u" && e instanceof SVGElement,
  so = (e, t) => {
    const r = e && e.to;
    return Be(r) ? t ? t(r) : null : r
  },
  gv = {
    __isTeleport: !0,
    process(e, t, r, i, n, s, o, a, l, c) {
      const {
        mc: h,
        pc: f,
        pbc: u,
        o: {
          insert: d,
          querySelector: p,
          createText: g,
          createComment: _
        }
      } = c, b = Fi(t.props);
      let {
        shapeFlag: S,
        children: R,
        dynamicChildren: P
      } = t;
      if (e == null) {
        const H = t.el = g(""),
          O = t.anchor = g("");
        d(H, r, i), d(O, r, i);
        const Y = t.target = so(t.props, p),
          Q = t.targetAnchor = g("");
        Y && (d(Q, Y), o = o || qa(Y));
        const ee = (J, U) => {
          S & 16 && h(R, J, U, n, s, o, a, l)
        };
        b ? ee(r, O) : Y && ee(Y, Q)
      } else {
        t.el = e.el;
        const H = t.anchor = e.anchor,
          O = t.target = e.target,
          Y = t.targetAnchor = e.targetAnchor,
          Q = Fi(e.props),
          ee = Q ? r : O,
          J = Q ? H : Y;
        if (o = o || qa(O), P ? (u(e.dynamicChildren, P, ee, n, s, o, a), Ho(e, t, !0)) : l || f(e, t, ee, J, n, s, o, a, !1), b) Q || En(t, r, H, c, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const U = t.target = so(t.props, p);
          U && En(t, U, null, c, 0)
        } else Q && En(t, O, Y, c, 1)
      }
      Fc(t)
    },
    remove(e, t, r, i, {
      um: n,
      o: {
        remove: s
      }
    }, o) {
      const {
        shapeFlag: a,
        children: l,
        anchor: c,
        targetAnchor: h,
        target: f,
        props: u
      } = e;
      if (f && s(h), (o || !Fi(u)) && (s(c), a & 16))
        for (let d = 0; d < l.length; d++) {
          const p = l[d];
          n(p, t, r, !0, !!p.dynamicChildren)
        }
    },
    move: En,
    hydrate: wv
  };

function En(e, t, r, {
  o: {
    insert: i
  },
  m: n
}, s = 2) {
  s === 0 && i(e.targetAnchor, t, r);
  const {
    el: o,
    anchor: a,
    shapeFlag: l,
    children: c,
    props: h
  } = e, f = s === 2;
  if (f && i(o, t, r), (!f || Fi(h)) && l & 16)
    for (let u = 0; u < c.length; u++) n(c[u], t, r, 2);
  f && i(a, t, r)
}

function wv(e, t, r, i, n, s, {
  o: {
    nextSibling: o,
    parentNode: a,
    querySelector: l
  }
}, c) {
  const h = t.target = so(t.props, l);
  if (h) {
    const f = h._lpa || h.firstChild;
    if (t.shapeFlag & 16)
      if (Fi(t.props)) t.anchor = c(o(e), t, a(e), r, i, n, s), t.targetAnchor = f;
      else {
        t.anchor = o(e);
        let u = f;
        for (; u;)
          if (u = o(u), u && u.nodeType === 8 && u.data === "teleport anchor") {
            t.targetAnchor = u, h._lpa = t.targetAnchor && o(t.targetAnchor);
            break
          }
        c(f, t, h, r, i, n, s)
      }
    Fc(t)
  }
  return t.anchor && o(t.anchor)
}
const xv = gv;

function Fc(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let r = e.children[0].el;
    for (; r !== e.targetAnchor;) r.nodeType === 1 && r.setAttribute("data-v-owner", t.uid), r = r.nextSibling;
    t.ut()
  }
}
const yt = Symbol.for("v-fgt"),
  es = Symbol.for("v-txt"),
  Nr = Symbol.for("v-cmt"),
  Ss = Symbol.for("v-stc"),
  Hi = [];
let xt = null;

function pt(e = !1) {
  Hi.push(xt = e ? null : [])
}

function bv() {
  Hi.pop(), xt = Hi[Hi.length - 1] || null
}
let Wi = 1;

function Wa(e) {
  Wi += e
}

function Hc(e) {
  return e.dynamicChildren = Wi > 0 ? xt || ni : null, bv(), Wi > 0 && xt && xt.push(e), e
}

function It(e, t, r, i, n, s) {
  return Hc($t(e, t, r, i, n, s, !0))
}

function kc(e, t, r, i, n) {
  return Hc($e(e, t, r, i, n, !0))
}

function oo(e) {
  return e ? e.__v_isVNode === !0 : !1
}

function Ci(e, t) {
  return e.type === t.type && e.key === t.key
}
const ts = "__vInternal",
  Nc = ({
    key: e
  }) => e ?? null,
  zn = ({
    ref: e,
    ref_key: t,
    ref_for: r
  }) => (typeof e == "number" && (e = "" + e), e != null ? Be(e) || Ke(e) || ce(e) ? {
    i: wt,
    r: e,
    k: t,
    f: !!r
  } : e : null);

function $t(e, t = null, r = null, i = 0, n = null, s = e === yt ? 0 : 1, o = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Nc(t),
    ref: t && zn(t),
    scopeId: Qn,
    slotScopeIds: null,
    children: r,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: i,
    dynamicProps: n,
    dynamicChildren: null,
    appContext: null,
    ctx: wt
  };
  return a ? (ko(l, r), s & 128 && e.normalize(l)) : r && (l.shapeFlag |= Be(r) ? 8 : 16), Wi > 0 && !o && xt && (l.patchFlag > 0 || s & 6) && l.patchFlag !== 32 && xt.push(l), l
}
const $e = Mv;

function Mv(e, t = null, r = null, i = 0, n = null, s = !1) {
  if ((!e || e === ev) && (e = Nr), oo(e)) {
    const a = hi(e, t, !0);
    return r && ko(a, r), Wi > 0 && !s && xt && (a.shapeFlag & 6 ? xt[xt.indexOf(e)] = a : xt.push(a)), a.patchFlag |= -2, a
  }
  if (Ov(e) && (e = e.__vccOpts), t) {
    t = Ev(t);
    let {
      class: a,
      style: l
    } = t;
    a && !Be(a) && (t.class = Yt(a)), Oe(l) && (ac(l) && !ne(l) && (l = De({}, l)), t.style = To(l))
  }
  const o = Be(e) ? 1 : Dd(e) ? 128 : yv(e) ? 64 : Oe(e) ? 4 : ce(e) ? 2 : 0;
  return $t(e, t, r, i, n, o, s, !0)
}

function Ev(e) {
  return e ? ac(e) || ts in e ? De({}, e) : e : null
}

function hi(e, t, r = !1) {
  const {
    props: i,
    ref: n,
    patchFlag: s,
    children: o
  } = e, a = t ? Tv(i || {}, t) : i;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && Nc(a),
    ref: t && t.ref ? r && n ? ne(n) ? n.concat(zn(t)) : [n, zn(t)] : zn(t) : n,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== yt ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && hi(e.ssContent),
    ssFallback: e.ssFallback && hi(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  }
}

function $r(e = " ", t = 0) {
  return $e(es, null, e, t)
}

function ao(e = "", t = !1) {
  return t ? (pt(), kc(Nr, null, e)) : $e(Nr, null, e)
}

function zt(e) {
  return e == null || typeof e == "boolean" ? $e(Nr) : ne(e) ? $e(yt, null, e.slice()) : typeof e == "object" ? pr(e) : $e(es, null, String(e))
}

function pr(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : hi(e)
}

function ko(e, t) {
  let r = 0;
  const {
    shapeFlag: i
  } = e;
  if (t == null) t = null;
  else if (ne(t)) r = 16;
  else if (typeof t == "object")
    if (i & 65) {
      const n = t.default;
      n && (n._c && (n._d = !1), ko(e, n()), n._c && (n._d = !0));
      return
    } else {
      r = 32;
      const n = t._;
      !n && !(ts in t) ? t._ctx = wt : n === 3 && wt && (wt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
    } else ce(t) ? (t = {
      default: t,
      _ctx: wt
    }, r = 32) : (t = String(t), i & 64 ? (r = 16, t = [$r(t)]) : r = 8);
  e.children = t, e.shapeFlag |= r
}

function Tv(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const i = e[r];
    for (const n in i)
      if (n === "class") t.class !== i.class && (t.class = Yt([t.class, i.class]));
      else if (n === "style") t.style = To([t.style, i.style]);
      else if (jn(n)) {
        const s = t[n],
          o = i[n];
        o && s !== o && !(ne(s) && s.includes(o)) && (t[n] = s ? [].concat(s, o) : o)
      } else n !== "" && (t[n] = i[n])
  }
  return t
}

function At(e, t, r, i = null) {
  Et(e, t, 7, [r, i])
}
const Sv = Rc();
let Pv = 0;

function Cv(e, t, r) {
  const i = e.type,
    n = (t ? t.appContext : e.appContext) || Sv,
    s = {
      uid: Pv++,
      vnode: e,
      type: i,
      parent: t,
      appContext: n,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Gu(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(n.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Lc(i, n),
      emitsOptions: yc(i, n),
      emit: null,
      emitted: null,
      propsDefaults: Ce,
      inheritAttrs: i.inheritAttrs,
      ctx: Ce,
      data: Ce,
      props: Ce,
      attrs: Ce,
      slots: Ce,
      refs: Ce,
      setupState: Ce,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: r,
      suspenseId: r ? r.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
  return s.ctx = {
    _: s
  }, s.root = t ? t.root : s, s.emit = Id.bind(null, s), e.ce && e.ce(s), s
}
let Ue = null,
  No, Zr, ja = "__VUE_INSTANCE_SETTERS__";
(Zr = Ys()[ja]) || (Zr = Ys()[ja] = []), Zr.push(e => Ue = e), No = e => {
  Zr.length > 1 ? Zr.forEach(t => t(e)) : Zr[0](e)
};
const fi = e => {
  No(e),
    e.scope.on()
},
  kr = () => {
    Ue && Ue.scope.off(),
      No(null)
  };

function Dc(e) {
  return e.vnode.shapeFlag & 4
}
let ji = !1;

function Av(e, t = !1) {
  ji = t;
  const {
    props: r,
    children: i
  } = e.vnode, n = Dc(e);
  hv(e, r, n, t), dv(e, i);
  const s = n ? Rv(e, t) : void 0;
  return ji = !1, s
}

function Rv(e, t) {
  const r = e.type;
  e.accessCache = Object.create(null), e.proxy = lc(new Proxy(e.ctx, rv));
  const {
    setup: i
  } = r;
  if (i) {
    const n = e.setupContext = i.length > 1 ? Lv(e) : null;
    fi(e), mi();
    const s = gr(i, e, 0, [e.props, n]);
    if (_i(), kr(), Xl(s)) {
      if (s.then(kr, kr), t) return s.then(o => {
        Ua(e, o, t)
      }).catch(o => {
        Kn(o, e, 0)
      });
      e.asyncDep = s
    } else Ua(e, s, t)
  } else Bc(e, t)
}

function Ua(e, t, r) {
  ce(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Oe(t) && (e.setupState = uc(t)), Bc(e, r)
}
let Ya;

function Bc(e, t, r) {
  const i = e.type;
  if (!e.render) {
    if (!t && Ya && !i.render) {
      const n = i.template || Io(e).template;
      if (n) {
        const {
          isCustomElement: s,
          compilerOptions: o
        } = e.appContext.config, {
          delimiters: a,
          compilerOptions: l
        } = i, c = De(De({
          isCustomElement: s,
          delimiters: a
        }, o), l);
        i.render = Ya(n, c)
      }
    }
    e.render = i.render || Mt
  }
  fi(e), mi(), iv(e), _i(), kr()
}

function zv(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(e.attrs, {
    get(t, r) {
      return st(e, "get", "$attrs"), t[r]
    }
  }))
}

function Lv(e) {
  const t = r => {
    e.exposed = r || {}
  };
  return {
    get attrs() {
      return zv(e)
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  }
}

function Do(e) {
  if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(uc(lc(e.exposed)), {
    get(t, r) {
      if (r in t) return t[r];
      if (r in Ii) return Ii[r](e)
    },
    has(t, r) {
      return r in t || r in Ii
    }
  }))
}

function $v(e, t = !0) {
  return ce(e) ? e.displayName || e.name : e.name || t && e.__name
}

function Ov(e) {
  return ce(e) && "__vccOpts" in e
}
const dt = (e, t) => Ad(e, t, ji);

function Vc(e, t, r) {
  const i = arguments.length;
  return i === 2 ? Oe(t) && !ne(t) ? oo(t) ? $e(e, null, [t]) : $e(e, t) : $e(e, null, t) : (i > 3 ? r = Array.prototype.slice.call(arguments, 2) : i === 3 && oo(r) && (r = [r]), $e(e, t, r))
}
const Iv = Symbol.for("v-scx"),
  Fv = () => Ot(Iv),
  Hv = "3.3.4",
  kv = "http://www.w3.org/2000/svg",
  Or = typeof document < "u" ? document : null,
  Xa = Or && Or.createElement("template"),
  Nv = {
    insert: (e, t, r) => {
      t.insertBefore(e, r || null)
    },
    remove: e => {
      const t = e.parentNode; t && t.removeChild(e)
    },
    createElement: (e, t, r, i) => {
      const n = t ? Or.createElementNS(kv, e) : Or.createElement(e, r ? {
        is: r
      } : void 0);
      return e === "select" && i && i.multiple != null && n.setAttribute("multiple", i.multiple),
        n
    },
    createText: e => Or.createTextNode(e),
    createComment: e => Or.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => Or.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "")
    },
    insertStaticContent(e, t, r, i, n, s) {
      const o = r ? r.previousSibling : t.lastChild;
      if (n && (n === s || n.nextSibling))
        for (; t.insertBefore(n.cloneNode(!0), r), !(n === s || !(n = n.nextSibling)););
      else {
        Xa.innerHTML = i ? `<svg>${e}</svg>` : e;
        const a = Xa.content;
        if (i) {
          const l = a.firstChild;
          for (; l.firstChild;) a.appendChild(l.firstChild);
          a.removeChild(l)
        }
        t.insertBefore(a, r)
      }
      return [o ? o.nextSibling : t.firstChild, r ? r.previousSibling : t.lastChild]
    }
  };

function Dv(e, t, r) {
  const i = e._vtc;
  i && (t = (t ? [t, ...i] : [...i]).join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t
}

function Bv(e, t, r) {
  const i = e.style,
    n = Be(r);
  if (r && !n) {
    if (t && !Be(t))
      for (const s in t) r[s] == null && lo(i, s, "");
    for (const s in r) lo(i, s, r[s])
  } else {
    const s = i.display;
    n ? t !== r && (i.cssText = r) : t && e.removeAttribute("style"), "_vod" in e && (i.display = s)
  }
}
const Ga = /\s*!important$/;

function lo(e, t, r) {
  if (ne(r)) r.forEach(i => lo(e, t, i));
  else if (r == null && (r = ""), t.startsWith("--")) e.setProperty(t, r);
  else {
    const i = Vv(e, t);
    Ga.test(r) ? e.setProperty(pi(i), r.replace(Ga, ""), "important") : e[i] = r
  }
}
const Ka = ["Webkit", "Moz", "ms"],
  Ps = {};

function Vv(e, t) {
  const r = Ps[t];
  if (r) return r;
  let i = Ft(t);
  if (i !== "filter" && i in e) return Ps[t] = i;
  i = Xn(i);
  for (let n = 0; n < Ka.length; n++) {
    const s = Ka[n] + i;
    if (s in e) return Ps[t] = s
  }
  return t
}
const Za = "http://www.w3.org/1999/xlink";

function qv(e, t, r, i, n) {
  if (i && t.startsWith("xlink:")) r == null ? e.removeAttributeNS(Za, t.slice(6, t.length)) : e.setAttributeNS(Za, t, r);
  else {
    const s = Xu(t);
    r == null || s && !Gl(r) ? e.removeAttribute(t) : e.setAttribute(t, s ? "" : r)
  }
}

function Wv(e, t, r, i, n, s, o) {
  if (t === "innerHTML" || t === "textContent") {
    i && o(i, n, s), e[t] = r ?? "";
    return
  }
  const a = e.tagName;
  if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
    e._value = r;
    const c = a === "OPTION" ? e.getAttribute("value") : e.value,
      h = r ?? "";
    c !== h && (e.value = h), r == null && e.removeAttribute(t);
    return
  }
  let l = !1;
  if (r === "" || r == null) {
    const c = typeof e[t];
    c === "boolean" ? r = Gl(r) : r == null && c === "string" ? (r = "", l = !0) : c === "number" && (r = 0, l = !0)
  }
  try {
    e[t] = r
  } catch { }
  l && e.removeAttribute(t)
}

function jv(e, t, r, i) {
  e.addEventListener(t, r, i)
}

function Uv(e, t, r, i) {
  e.removeEventListener(t, r, i)
}

function Yv(e, t, r, i, n = null) {
  const s = e._vei || (e._vei = {}),
    o = s[t];
  if (i && o) o.value = i;
  else {
    const [a, l] = Xv(t);
    if (i) {
      const c = s[t] = Zv(i, n);
      jv(e, a, c, l)
    } else o && (Uv(e, a, o, l), s[t] = void 0)
  }
}
const Qa = /(?:Once|Passive|Capture)$/;

function Xv(e) {
  let t;
  if (Qa.test(e)) {
    t = {};
    let i;
    for (; i = e.match(Qa);) e = e.slice(0, e.length - i[0].length), t[i[0].toLowerCase()] = !0
  }
  return [e[2] === ":" ? e.slice(3) : pi(e.slice(2)), t]
}
let Cs = 0;
const Gv = Promise.resolve(),
  Kv = () => Cs || (Gv.then(() => Cs = 0), Cs = Date.now());

function Zv(e, t) {
  const r = i => {
    if (!i._vts) i._vts = Date.now();
    else if (i._vts <= r.attached) return; Et(Qv(i, r.value), t, 5, [i])
  };
  return r.value = e, r.attached = Kv(), r
}

function Qv(e, t) {
  if (ne(t)) {
    const r = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      r.call(e),
        e._stopped = !0
    }, t.map(i => n => !n._stopped && i && i(n))
  } else return t
}
const Ja = /^on[a-z]/,
  Jv = (e, t, r, i, n = !1, s, o, a, l) => {
    t === "class" ? Dv(e, i, n) : t === "style" ? Bv(e, r, i) : jn(t) ? xo(t) || Yv(e, t, r, i, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : ep(e, t, i, n)) ? Wv(e, t, i, s, o, a, l) : (t === "true-value" ? e._trueValue = i : t === "false-value" && (e._falseValue = i), qv(e, t, i, n))
  };

function ep(e, t, r, i) {
  return i ? !!(t === "innerHTML" || t === "textContent" || t in e && Ja.test(t) && ce(r)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Ja.test(t) && Be(r) ? !1 : t in e
}
const tp = De({
  patchProp: Jv
}, Nv);
let el;

function rp() {
  return el || (el = pv(tp))
}
const ip = (...e) => {
  const t = rp().createApp(...e),
    {
      mount: r
    } = t;
  return t.mount = i => {
    const n = np(i);
    if (!n) return;
    const s = t._component; !ce(s) && !s.render && !s.template && (s.template = n.innerHTML),
      n.innerHTML = "";
    const o = r(n, !1, n instanceof SVGElement);
    return n instanceof Element && (n.removeAttribute("v-cloak"), n.setAttribute("data-v-app", "")),
      o
  },
    t
};

function np(e) {
  return Be(e) ? document.querySelector(e) : e
}
/*!
* vue-router v4.2.1
* (c) 2023 Eduardo San Martin Morote
* @license MIT
*/
const ti = typeof window < "u";

function sp(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module"
}
const ye = Object.assign;

function As(e, t) {
  const r = {};
  for (const i in t) {
    const n = t[i];
    r[i] = Tt(n) ? n.map(e) : e(n)
  }
  return r
}
const ki = () => { },
  Tt = Array.isArray,
  op = /\/$/,
  ap = e => e.replace(op, "");

function Rs(e, t, r = "/") {
  let i, n = {},
    s = "",
    o = "";
  const a = t.indexOf("#");
  let l = t.indexOf("?");
  return a < l && a >= 0 && (l = -1), l > -1 && (i = t.slice(0, l), s = t.slice(l + 1, a > -1 ? a : t.length), n = e(s)), a > -1 && (i = i || t.slice(0, a), o = t.slice(a, t.length)), i = fp(i ?? t, r), {
    fullPath: i + (s && "?") + s + o,
    path: i,
    query: n,
    hash: o
  }
}

function lp(e, t) {
  const r = t.query ? e(t.query) : "";
  return t.path + (r && "?") + r + (t.hash || "")
}

function tl(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/"
}

function cp(e, t, r) {
  const i = t.matched.length - 1,
    n = r.matched.length - 1;
  return i > -1 && i === n && ui(t.matched[i], r.matched[n]) && qc(t.params, r.params) && e(t.query) === e(r.query) && t.hash === r.hash
}

function ui(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t)
}

function qc(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const r in e)
    if (!hp(e[r], t[r])) return !1;
  return !0
}

function hp(e, t) {
  return Tt(e) ? rl(e, t) : Tt(t) ? rl(t, e) : e === t
}

function rl(e, t) {
  return Tt(t) ? e.length === t.length && e.every((r, i) => r === t[i]) : e.length === 1 && e[0] === t
}

function fp(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const r = t.split("/"),
    i = e.split("/"),
    n = i[i.length - 1];
  (n === ".." || n === ".") && i.push("");
  let s = r.length - 1,
    o, a;
  for (o = 0; o < i.length; o++)
    if (a = i[o], a !== ".")
      if (a === "..") s > 1 && s--;
      else break;
  return r.slice(0, s).join("/") + "/" + i.slice(o - (o === i.length ? 1 : 0)).join("/")
}
var Ui;
(function (e) {
  e.pop = "pop", e.push = "push"
})(Ui || (Ui = {}));
var Ni;
(function (e) {
  e.back = "back", e.forward = "forward", e.unknown = ""
})(Ni || (Ni = {}));

function up(e) {
  if (!e)
    if (ti) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "")
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), ap(e)
}
const dp = /^[^#]+#/;

function vp(e, t) {
  return e.replace(dp, "#") + t
}

function pp(e, t) {
  const r = document.documentElement.getBoundingClientRect(),
    i = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: i.left - r.left - (t.left || 0),
    top: i.top - r.top - (t.top || 0)
  }
}
const rs = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});

function mp(e) {
  let t;
  if ("el" in e) {
    const r = e.el,
      i = typeof r == "string" && r.startsWith("#"),
      n = typeof r == "string" ? i ? document.getElementById(r.slice(1)) : document.querySelector(r) : r;
    if (!n) return;
    t = pp(n, e)
  } else t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset)
}

function il(e, t) {
  return (history.state ? history.state.position - t : -1) + e
}
const co = new Map;

function _p(e, t) {
  co.set(e, t)
}

function yp(e) {
  const t = co.get(e);
  return co.delete(e), t
}
let gp = () => location.protocol + "//" + location.host;

function Wc(e, t) {
  const {
    pathname: r,
    search: i,
    hash: n
  } = t, s = e.indexOf("#");
  if (s > -1) {
    let a = n.includes(e.slice(s)) ? e.slice(s).length : 1,
      l = n.slice(a);
    return l[0] !== "/" && (l = "/" + l), tl(l, "")
  }
  return tl(r, e) + i + n
}

function wp(e, t, r, i) {
  let n = [],
    s = [],
    o = null;
  const a = ({
    state: u
  }) => {
    const d = Wc(e, location),
      p = r.value,
      g = t.value;
    let _ = 0;
    if (u) {
      if (r.value = d, t.value = u, o && o === p) {
        o = null;
        return
      }
      _ = g ? u.position - g.position : 0
    } else i(d); n.forEach(b => {
      b(r.value, p, {
        delta: _,
        type: Ui.pop,
        direction: _ ? _ > 0 ? Ni.forward : Ni.back : Ni.unknown
      })
    })
  };

  function l() {
    o = r.value
  }

  function c(u) {
    n.push(u);
    const d = () => {
      const p = n.indexOf(u); p > -1 && n.splice(p, 1)
    };
    return s.push(d), d
  }

  function h() {
    const {
      history: u
    } = window;
    u.state && u.replaceState(ye({}, u.state, {
      scroll: rs()
    }), "")
  }

  function f() {
    for (const u of s) u();
    s = [], window.removeEventListener("popstate", a), window.removeEventListener("beforeunload", h)
  }
  return window.addEventListener("popstate", a), window.addEventListener("beforeunload", h, {
    passive: !0
  }), {
    pauseListeners: l,
    listen: c,
    destroy: f
  }
}

function nl(e, t, r, i = !1, n = !1) {
  return {
    back: e,
    current: t,
    forward: r,
    replaced: i,
    position: window.history.length,
    scroll: n ? rs() : null
  }
}

function xp(e) {
  const {
    history: t,
    location: r
  } = window, i = {
    value: Wc(e, r)
  }, n = {
    value: t.state
  };
  n.value || s(i.value, {
    back: null,
    current: i.value,
    forward: null,
    position: t.length - 1,
    replaced: !0,
    scroll: null
  }, !0);

  function s(l, c, h) {
    const f = e.indexOf("#"),
      u = f > -1 ? (r.host && document.querySelector("base") ? e : e.slice(f)) + l : gp() + e + l;
    try {
      t[h ? "replaceState" : "pushState"](c, "", u), n.value = c
    } catch (d) {
      console.error(d), r[h ? "replace" : "assign"](u)
    }
  }

  function o(l, c) {
    const h = ye({}, t.state, nl(n.value.back, l, n.value.forward, !0), c, {
      position: n.value.position
    });
    s(l, h, !0), i.value = l
  }

  function a(l, c) {
    const h = ye({}, n.value, t.state, {
      forward: l,
      scroll: rs()
    });
    s(h.current, h, !0);
    const f = ye({}, nl(i.value, l, null), {
      position: h.position + 1
    }, c);
    s(l, f, !1), i.value = l
  }
  return {
    location: i,
    state: n,
    push: a,
    replace: o
  }
}

function bp(e) {
  e = up(e);
  const t = xp(e),
    r = wp(e, t.state, t.location, t.replace);

  function i(s, o = !0) {
    o || r.pauseListeners(), history.go(s)
  }
  const n = ye({
    location: "",
    base: e,
    go: i,
    createHref: vp.bind(null, e)
  }, t, r);
  return Object.defineProperty(n, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(n, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), n
}

function Mp(e) {
  return typeof e == "string" || e && typeof e == "object"
}

function jc(e) {
  return typeof e == "string" || typeof e == "symbol"
}
const hr = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
},
  Uc = Symbol("");
var sl;
(function (e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated"
})(sl || (sl = {}));

function di(e, t) {
  return ye(new Error, {
    type: e,
    [Uc]: !0
  }, t)
}

function Wt(e, t) {
  return e instanceof Error && Uc in e && (t == null || !!(e.type & t))
}
const ol = "[^/]+?",
  Ep = {
    sensitive: !1,
    strict: !1,
    start: !0,
    end: !0
  },
  Tp = /[.+*?^${}()[\]/\\]/g;

function Sp(e, t) {
  const r = ye({}, Ep, t),
    i = [];
  let n = r.start ? "^" : "";
  const s = [];
  for (const c of e) {
    const h = c.length ? [] : [90];
    r.strict && !c.length && (n += "/");
    for (let f = 0; f < c.length; f++) {
      const u = c[f];
      let d = 40 + (r.sensitive ? .25 : 0);
      if (u.type === 0) f || (n += "/"), n += u.value.replace(Tp, "\\$&"), d += 40;
      else if (u.type === 1) {
        const {
          value: p,
          repeatable: g,
          optional: _,
          regexp: b
        } = u;
        s.push({
          name: p,
          repeatable: g,
          optional: _
        });
        const S = b || ol;
        if (S !== ol) {
          d += 10;
          try {
            new RegExp(`(${S})`)
          } catch (P) {
            throw new Error(`Invalid custom RegExp for param "${p}" (${S}): ` + P.message)
          }
        }
        let R = g ? `((?:${S})(?:/(?:${S}))*)` : `(${S})`;
        f || (R = _ && c.length < 2 ? `(?:/${R})` : "/" + R), _ && (R += "?"), n += R, d += 20, _ && (d += -8), g && (d += -20), S === ".*" && (d += -50)
      }
      h.push(d)
    }
    i.push(h)
  }
  if (r.strict && r.end) {
    const c = i.length - 1;
    i[c][i[c].length - 1] += .7000000000000001
  }
  r.strict || (n += "/?"), r.end ? n += "$" : r.strict && (n += "(?:/|$)");
  const o = new RegExp(n, r.sensitive ? "" : "i");

  function a(c) {
    const h = c.match(o),
      f = {};
    if (!h) return null;
    for (let u = 1; u < h.length; u++) {
      const d = h[u] || "",
        p = s[u - 1];
      f[p.name] = d && p.repeatable ? d.split("/") : d
    }
    return f
  }

  function l(c) {
    let h = "",
      f = !1;
    for (const u of e) {
      (!f || !h.endsWith("/")) && (h += "/"), f = !1;
      for (const d of u)
        if (d.type === 0) h += d.value;
        else if (d.type === 1) {
          const {
            value: p,
            repeatable: g,
            optional: _
          } = d, b = p in c ? c[p] : "";
          if (Tt(b) && !g) throw new Error(`Provided param "${p}" is an array but it is not repeatable (* or + modifiers)`);
          const S = Tt(b) ? b.join("/") : b;
          if (!S)
            if (_) u.length < 2 && (h.endsWith("/") ? h = h.slice(0, -1) : f = !0);
            else throw new Error(`Missing required param "${p}"`);
          h += S
        }
    }
    return h || "/"
  }
  return {
    re: o,
    score: i,
    keys: s,
    parse: a,
    stringify: l
  }
}

function Pp(e, t) {
  let r = 0;
  for (; r < e.length && r < t.length;) {
    const i = t[r] - e[r];
    if (i) return i;
    r++
  }
  return e.length < t.length ? e.length === 1 && e[0] === 40 + 40 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 40 + 40 ? 1 : -1 : 0
}

function Cp(e, t) {
  let r = 0;
  const i = e.score,
    n = t.score;
  for (; r < i.length && r < n.length;) {
    const s = Pp(i[r], n[r]);
    if (s) return s;
    r++
  }
  if (Math.abs(n.length - i.length) === 1) {
    if (al(i)) return 1;
    if (al(n)) return -1
  }
  return n.length - i.length
}

function al(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0
}
const Ap = {
  type: 0,
  value: ""
},
  Rp = /[a-zA-Z0-9_]/;

function zp(e) {
  if (!e) return [
    []
  ];
  if (e === "/") return [
    [Ap]
  ];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);

  function t(d) {
    throw new Error(`ERR (${r})/"${c}": ${d}`)
  }
  let r = 0,
    i = r;
  const n = [];
  let s;

  function o() {
    s && n.push(s), s = []
  }
  let a = 0,
    l, c = "",
    h = "";

  function f() {
    c && (r === 0 ? s.push({
      type: 0,
      value: c
    }) : r === 1 || r === 2 || r === 3 ? (s.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`), s.push({
      type: 1,
      value: c,
      regexp: h,
      repeatable: l === "*" || l === "+",
      optional: l === "*" || l === "?"
    })) : t("Invalid state to consume buffer"), c = "")
  }

  function u() {
    c += l
  }
  for (; a < e.length;) {
    if (l = e[a++], l === "\\" && r !== 2) {
      i = r, r = 4;
      continue
    }
    switch (r) {
      case 0:
        l === "/" ? (c && f(), o()) : l === ":" ? (f(), r = 1) : u();
        break;
      case 4:
        u(), r = i;
        break;
      case 1:
        l === "(" ? r = 2 : Rp.test(l) ? u() : (f(), r = 0, l !== "*" && l !== "?" && l !== "+" && a--);
        break;
      case 2:
        l === ")" ? h[h.length - 1] == "\\" ? h = h.slice(0, -1) + l : r = 3 : h += l;
        break;
      case 3:
        f(), r = 0, l !== "*" && l !== "?" && l !== "+" && a--, h = "";
        break;
      default:
        t("Unknown state");
        break
    }
  }
  return r === 2 && t(`Unfinished custom RegExp for param "${c}"`), f(), o(), n
}

function Lp(e, t, r) {
  const i = Sp(zp(e.path), r),
    n = ye(i, {
      record: e,
      parent: t,
      children: [],
      alias: []
    });
  return t && !n.record.aliasOf == !t.record.aliasOf && t.children.push(n), n
}

function $p(e, t) {
  const r = [],
    i = new Map;
  t = hl({
    strict: !1,
    end: !0,
    sensitive: !1
  }, t);

  function n(h) {
    return i.get(h)
  }

  function s(h, f, u) {
    const d = !u,
      p = Op(h);
    p.aliasOf = u && u.record;
    const g = hl(t, h),
      _ = [p];
    if ("alias" in h) {
      const R = typeof h.alias == "string" ? [h.alias] : h.alias;
      for (const P of R) _.push(ye({}, p, {
        components: u ? u.record.components : p.components,
        path: P,
        aliasOf: u ? u.record : p
      }))
    }
    let b, S;
    for (const R of _) {
      const {
        path: P
      } = R;
      if (f && P[0] !== "/") {
        const H = f.record.path,
          O = H[H.length - 1] === "/" ? "" : "/";
        R.path = f.record.path + (P && O + P)
      }
      if (b = Lp(R, f, g), u ? u.alias.push(b) : (S = S || b, S !== b && S.alias.push(b), d && h.name && !cl(b) && o(h.name)), p.children) {
        const H = p.children;
        for (let O = 0; O < H.length; O++) s(H[O], b, u && u.children[O])
      }
      u = u || b, (b.record.components && Object.keys(b.record.components).length || b.record.name || b.record.redirect) && l(b)
    }
    return S ? () => {
      o(S)
    } : ki
  }

  function o(h) {
    if (jc(h)) {
      const f = i.get(h);
      f && (i.delete(h), r.splice(r.indexOf(f), 1), f.children.forEach(o), f.alias.forEach(o))
    } else {
      const f = r.indexOf(h);
      f > -1 && (r.splice(f, 1), h.record.name && i.delete(h.record.name), h.children.forEach(o), h.alias.forEach(o))
    }
  }

  function a() {
    return r
  }

  function l(h) {
    let f = 0;
    for (; f < r.length && Cp(h, r[f]) >= 0 && (h.record.path !== r[f].record.path || !Yc(h, r[f]));) f++;
    r.splice(f, 0, h), h.record.name && !cl(h) && i.set(h.record.name, h)
  }

  function c(h, f) {
    let u, d = {},
      p, g;
    if ("name" in h && h.name) {
      if (u = i.get(h.name), !u) throw di(1, {
        location: h
      });
      g = u.record.name, d = ye(ll(f.params, u.keys.filter(S => !S.optional).map(S => S.name)), h.params && ll(h.params, u.keys.map(S => S.name))), p = u.stringify(d)
    } else if ("path" in h) p = h.path, u = r.find(S => S.re.test(p)), u && (d = u.parse(p), g = u.record.name);
    else {
      if (u = f.name ? i.get(f.name) : r.find(S => S.re.test(f.path)), !u) throw di(1, {
        location: h,
        currentLocation: f
      });
      g = u.record.name, d = ye({}, f.params, h.params), p = u.stringify(d)
    }
    const _ = [];
    let b = u;
    for (; b;) _.unshift(b.record), b = b.parent;
    return {
      name: g,
      path: p,
      params: d,
      matched: _,
      meta: Fp(_)
    }
  }
  return e.forEach(h => s(h)), {
    addRoute: s,
    resolve: c,
    removeRoute: o,
    getRoutes: a,
    getRecordMatcher: n
  }
}

function ll(e, t) {
  const r = {};
  for (const i of t) i in e && (r[i] = e[i]);
  return r
}

function Op(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Ip(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set,
    updateGuards: new Set,
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && {
      default: e.component
    }
  }
}

function Ip(e) {
  const t = {},
    r = e.props || !1;
  if ("component" in e) t.default = r;
  else
    for (const i in e.components) t[i] = typeof r == "boolean" ? r : r[i];
  return t
}

function cl(e) {
  for (; e;) {
    if (e.record.aliasOf) return !0;
    e = e.parent
  }
  return !1
}

function Fp(e) {
  return e.reduce((t, r) => ye(t, r.meta), {})
}

function hl(e, t) {
  const r = {};
  for (const i in e) r[i] = i in t ? t[i] : e[i];
  return r
}

function Yc(e, t) {
  return t.children.some(r => r === e || Yc(e, r))
}
const Xc = /#/g,
  Hp = /&/g,
  kp = /\//g,
  Np = /=/g,
  Dp = /\?/g,
  Gc = /\+/g,
  Bp = /%5B/g,
  Vp = /%5D/g,
  Kc = /%5E/g,
  qp = /%60/g,
  Zc = /%7B/g,
  Wp = /%7C/g,
  Qc = /%7D/g,
  jp = /%20/g;

function Bo(e) {
  return encodeURI("" + e).replace(Wp, "|").replace(Bp, "[").replace(Vp, "]")
}

function Up(e) {
  return Bo(e).replace(Zc, "{").replace(Qc, "}").replace(Kc, "^")
}

function ho(e) {
  return Bo(e).replace(Gc, "%2B").replace(jp, "+").replace(Xc, "%23").replace(Hp, "%26").replace(qp, "`").replace(Zc, "{").replace(Qc, "}").replace(Kc, "^")
}

function Yp(e) {
  return ho(e).replace(Np, "%3D")
}

function Xp(e) {
  return Bo(e).replace(Xc, "%23").replace(Dp, "%3F")
}

function Gp(e) {
  return e == null ? "" : Xp(e).replace(kp, "%2F")
}

function Nn(e) {
  try {
    return decodeURIComponent("" + e)
  } catch { }
  return "" + e
}

function Kp(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const i = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let n = 0; n < i.length; ++n) {
    const s = i[n].replace(Gc, " "),
      o = s.indexOf("="),
      a = Nn(o < 0 ? s : s.slice(0, o)),
      l = o < 0 ? null : Nn(s.slice(o + 1));
    if (a in t) {
      let c = t[a];
      Tt(c) || (c = t[a] = [c]), c.push(l)
    } else t[a] = l
  }
  return t
}

function fl(e) {
  let t = "";
  for (let r in e) {
    const i = e[r];
    if (r = Yp(r), i == null) {
      i !== void 0 && (t += (t.length ? "&" : "") + r);
      continue
    } (Tt(i) ? i.map(s => s && ho(s)) : [i && ho(i)]).forEach(s => {
      s !== void 0 && (t += (t.length ? "&" : "") + r, s != null && (t += "=" + s))
    })
  }
  return t
}

function Zp(e) {
  const t = {};
  for (const r in e) {
    const i = e[r];
    i !== void 0 && (t[r] = Tt(i) ? i.map(n => n == null ? null : "" + n) : i == null ? i : "" + i)
  }
  return t
}
const Qp = Symbol(""),
  ul = Symbol(""),
  Vo = Symbol(""),
  qo = Symbol(""),
  fo = Symbol("");

function Ai() {
  let e = [];

  function t(i) {
    return e.push(i), () => {
      const n = e.indexOf(i); n > -1 && e.splice(n, 1)
    }
  }

  function r() {
    e = []
  }
  return {
    add: t,
    list: () => e,
    reset: r
  }
}

function mr(e, t, r, i, n) {
  const s = i && (i.enterCallbacks[n] = i.enterCallbacks[n] || []);
  return () => new Promise((o, a) => {
    const l = f => {
      f === !1 ? a(di(4, {
        from: r,
        to: t
      })) : f instanceof Error ? a(f) : Mp(f) ? a(di(2, {
        from: t,
        to: f
      })) : (s && i.enterCallbacks[n] === s && typeof f == "function" && s.push(f), o())
    },
      c = e.call(i && i.instances[n], t, r, l);
    let h = Promise.resolve(c); e.length < 3 && (h = h.then(l)),
      h.catch(f => a(f))
  })
}

function zs(e, t, r, i) {
  const n = [];
  for (const s of e)
    for (const o in s.components) {
      let a = s.components[o];
      if (!(t !== "beforeRouteEnter" && !s.instances[o]))
        if (Jp(a)) {
          const c = (a.__vccOpts || a)[t];
          c && n.push(mr(c, r, i, s, o))
        } else {
          let l = a();
          n.push(() => l.then(c => {
            if (!c) return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${s.path}"`));
            const h = sp(c) ? c.default : c; s.components[o] = h;
            const u = (h.__vccOpts || h)[t];
            return u && mr(u, r, i, s, o)()
          }))
        }
    }
  return n
}

function Jp(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e
}

function dl(e) {
  const t = Ot(Vo),
    r = Ot(qo),
    i = dt(() => t.resolve(oi(e.to))),
    n = dt(() => {
      const {
        matched: l
      } = i.value,
        {
          length: c
        } = l,
        h = l[c - 1],
        f = r.matched;
      if (!h || !f.length) return -1;
      const u = f.findIndex(ui.bind(null, h));
      if (u > -1) return u;
      const d = vl(l[c - 2]);
      return c > 1 && vl(h) === d && f[f.length - 1].path !== d ? f.findIndex(ui.bind(null, l[c - 2])) : u
    }),
    s = dt(() => n.value > -1 && i0(r.params, i.value.params)),
    o = dt(() => n.value > -1 && n.value === r.matched.length - 1 && qc(r.params, i.value.params));

  function a(l = {}) {
    return r0(l) ? t[oi(e.replace) ? "replace" : "push"](oi(e.to)).catch(ki) : Promise.resolve()
  }
  return {
    route: i,
    href: dt(() => i.value.href),
    isActive: s,
    isExactActive: o,
    navigate: a
  }
}
const e0 = Mc({
  name: "RouterLink",
  compatConfig: {
    MODE: 3
  },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink: dl,
  setup(e, {
    slots: t
  }) {
    const r = Zi(dl(e)),
      {
        options: i
      } = Ot(Vo),
      n = dt(() => ({
        [pl(e.activeClass, i.linkActiveClass, "router-link-active")]: r.isActive,
        [pl(e.exactActiveClass, i.linkExactActiveClass, "router-link-exact-active")]: r.isExactActive
      }));
    return () => {
      const s = t.default && t.default(r);
      return e.custom ? s : Vc("a", {
        "aria-current": r.isExactActive ? e.ariaCurrentValue : null,
        href: r.href,
        onClick: r.navigate,
        class: n.value
      }, s)
    }
  }
}),
  t0 = e0;

function r0(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return
    }
    return e.preventDefault && e.preventDefault(), !0
  }
}

function i0(e, t) {
  for (const r in t) {
    const i = t[r],
      n = e[r];
    if (typeof i == "string") {
      if (i !== n) return !1
    } else if (!Tt(n) || n.length !== i.length || i.some((s, o) => s !== n[o])) return !1
  }
  return !0
}

function vl(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}
const pl = (e, t, r) => e ?? t ?? r,
  n0 = Mc({
    name: "RouterView",
    inheritAttrs: !1,
    props: {
      name: {
        type: String,
        default: "default"
      },
      route: Object
    },
    compatConfig: {
      MODE: 3
    },
    setup(e, {
      attrs: t,
      slots: r
    }) {
      const i = Ot(fo),
        n = dt(() => e.route || i.value),
        s = Ot(ul, 0),
        o = dt(() => {
          let c = oi(s);
          const {
            matched: h
          } = n.value;
          let f;
          for (;
            (f = h[c]) && !f.components;) c++;
          return c
        }),
        a = dt(() => n.value.matched[o.value]);
      Rn(ul, dt(() => o.value + 1)), Rn(Qp, a), Rn(fo, n);
      const l = Fr();
      return Oi(() => [l.value, a.value, e.name], ([c, h, f], [u, d, p]) => {
        h && (h.instances[f] = c, d && d !== h && c && c === u && (h.leaveGuards.size || (h.leaveGuards = d.leaveGuards), h.updateGuards.size || (h.updateGuards = d.updateGuards))),
          c && h && (!d || !ui(h, d) || !u) && (h.enterCallbacks[f] || []).forEach(g => g(c))
      }, {
        flush: "post"
      }), () => {
        const c = n.value,
          h = e.name,
          f = a.value,
          u = f && f.components[h];
        if (!u) return ml(r.default, {
          Component: u,
          route: c
        });
        const d = f.props[h],
          p = d ? d === !0 ? c.params : typeof d == "function" ? d(c) : d : null,
          _ = Vc(u, ye({}, p, t, {
            onVnodeUnmounted: b => {
              b.component.isUnmounted && (f.instances[h] = null)
            },
            ref: l
          }));
        return ml(r.default, {
          Component: _,
          route: c
        }) || _
      }
    }
  });

function ml(e, t) {
  if (!e) return null;
  const r = e(t);
  return r.length === 1 ? r[0] : r
}
const s0 = n0;

function o0(e) {
  const t = $p(e.routes, e),
    r = e.parseQuery || Kp,
    i = e.stringifyQuery || fl,
    n = e.history,
    s = Ai(),
    o = Ai(),
    a = Ai(),
    l = Td(hr);
  let c = hr;
  ti && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const h = As.bind(null, T => "" + T),
    f = As.bind(null, Gp),
    u = As.bind(null, Nn);

  function d(T, N) {
    let D, j;
    return jc(T) ? (D = t.getRecordMatcher(T), j = N) : j = T, t.addRoute(j, D)
  }

  function p(T) {
    const N = t.getRecordMatcher(T);
    N && t.removeRoute(N)
  }

  function g() {
    return t.getRoutes().map(T => T.record)
  }

  function _(T) {
    return !!t.getRecordMatcher(T)
  }

  function b(T, N) {
    if (N = ye({}, N || l.value), typeof T == "string") {
      const M = Rs(r, T, N.path),
        C = t.resolve({
          path: M.path
        }, N),
        z = n.createHref(M.fullPath);
      return ye(M, C, {
        params: u(C.params),
        hash: Nn(M.hash),
        redirectedFrom: void 0,
        href: z
      })
    }
    let D;
    if ("path" in T) D = ye({}, T, {
      path: Rs(r, T.path, N.path).path
    });
    else {
      const M = ye({}, T.params);
      for (const C in M) M[C] == null && delete M[C];
      D = ye({}, T, {
        params: f(M)
      }), N.params = f(N.params)
    }
    const j = t.resolve(D, N),
      ue = T.hash || "";
    j.params = h(u(j.params));
    const y = lp(i, ye({}, T, {
      hash: Up(ue),
      path: j.path
    })),
      w = n.createHref(y);
    return ye({
      fullPath: y,
      hash: ue,
      query: i === fl ? Zp(T.query) : T.query || {}
    }, j, {
      redirectedFrom: void 0,
      href: w
    })
  }

  function S(T) {
    return typeof T == "string" ? Rs(r, T, l.value.path) : ye({}, T)
  }

  function R(T, N) {
    if (c !== T) return di(8, {
      from: N,
      to: T
    })
  }

  function P(T) {
    return Y(T)
  }

  function H(T) {
    return P(ye(S(T), {
      replace: !0
    }))
  }

  function O(T) {
    const N = T.matched[T.matched.length - 1];
    if (N && N.redirect) {
      const {
        redirect: D
      } = N;
      let j = typeof D == "function" ? D(T) : D;
      return typeof j == "string" && (j = j.includes("?") || j.includes("#") ? j = S(j) : {
        path: j
      }, j.params = {}), ye({
        query: T.query,
        hash: T.hash,
        params: "path" in j ? {} : T.params
      }, j)
    }
  }

  function Y(T, N) {
    const D = c = b(T),
      j = l.value,
      ue = T.state,
      y = T.force,
      w = T.replace === !0,
      M = O(D);
    if (M) return Y(ye(S(M), {
      state: typeof M == "object" ? ye({}, ue, M.state) : ue,
      force: y,
      replace: w
    }), N || D);
    const C = D;
    C.redirectedFrom = N;
    let z;
    return !y && cp(i, j, D) && (z = di(16, {
      to: C,
      from: j
    }), ct(j, j, !0, !1)), (z ? Promise.resolve(z) : J(C, j)).catch($ => Wt($) ? Wt($, 2) ? $ : Re($) : he($, C, j)).then($ => {
      if ($) {
        if (Wt($, 2)) return Y(ye({
          replace: w
        }, S($.to), {
          state: typeof $.to == "object" ? ye({}, ue, $.to.state) : ue,
          force: y
        }), N || C)
      } else $ = se(C, j, !0, w, ue);
      return U(C, j, $),
        $
    })
  }

  function Q(T, N) {
    const D = R(T, N);
    return D ? Promise.reject(D) : Promise.resolve()
  }

  function ee(T) {
    const N = sr.values().next().value;
    return N && typeof N.runWithContext == "function" ? N.runWithContext(T) : T()
  }

  function J(T, N) {
    let D;
    const [j, ue, y] = a0(T, N);
    D = zs(j.reverse(), "beforeRouteLeave", T, N);
    for (const M of j) M.leaveGuards.forEach(C => {
      D.push(mr(C, T, N))
    });
    const w = Q.bind(null, T, N);
    return D.push(w), Pe(D).then(() => {
      D = [];
      for (const M of s.list()) D.push(mr(M, T, N));
      return D.push(w),
        Pe(D)
    }).then(() => {
      D = zs(ue, "beforeRouteUpdate", T, N);
      for (const M of ue) M.updateGuards.forEach(C => {
        D.push(mr(C, T, N))
      });
      return D.push(w),
        Pe(D)
    }).then(() => {
      D = [];
      for (const M of T.matched)
        if (M.beforeEnter && !N.matched.includes(M))
          if (Tt(M.beforeEnter))
            for (const C of M.beforeEnter) D.push(mr(C, T, N));
          else D.push(mr(M.beforeEnter, T, N)); return D.push(w),
            Pe(D)
    }).then(() => (T.matched.forEach(M => M.enterCallbacks = {}), D = zs(y, "beforeRouteEnter", T, N), D.push(w), Pe(D))).then(() => {
      D = [];
      for (const M of o.list()) D.push(mr(M, T, N));
      return D.push(w),
        Pe(D)
    }).catch(M => Wt(M, 8) ? M : Promise.reject(M))
  }

  function U(T, N, D) {
    for (const j of a.list()) ee(() => j(T, N, D))
  }

  function se(T, N, D, j, ue) {
    const y = R(T, N);
    if (y) return y;
    const w = N === hr,
      M = ti ? history.state : {};
    D && (j || w ? n.replace(T.fullPath, ye({
      scroll: w && M && M.scroll
    }, ue)) : n.push(T.fullPath, ue)), l.value = T, ct(T, N, D, w), Re()
  }
  let ae;

  function K() {
    ae || (ae = n.listen((T, N, D) => {
      if (!He.listening) return;
      const j = b(T),
        ue = O(j);
      if (ue) {
        Y(ye(ue, {
          replace: !0
        }), j).catch(ki);
        return
      }
      c = j;
      const y = l.value; ti && _p(il(y.fullPath, D.delta), rs()),
        J(j, y).catch(w => Wt(w, 12) ? w : Wt(w, 2) ? (Y(w.to, j).then(M => {
          Wt(M, 20) && !D.delta && D.type === Ui.pop && n.go(-1, !1)
        }).catch(ki), Promise.reject()) : (D.delta && n.go(-D.delta, !1), he(w, j, y))).then(w => {
          w = w || se(j, y, !1),
            w && (D.delta && !Wt(w, 8) ? n.go(-D.delta, !1) : D.type === Ui.pop && Wt(w, 20) && n.go(-1, !1)),
            U(j, y, w)
        }).catch(ki)
    }))
  }
  let E = Ai(),
    be = Ai(),
    Z;

  function he(T, N, D) {
    Re(T);
    const j = be.list();
    return j.length ? j.forEach(ue => ue(T, N, D)) : console.error(T), Promise.reject(T)
  }

  function Ie() {
    return Z && l.value !== hr ? Promise.resolve() : new Promise((T, N) => {
      E.add([T, N])
    })
  }

  function Re(T) {
    return Z || (Z = !T, K(), E.list().forEach(([N, D]) => T ? D(T) : N()), E.reset()), T
  }

  function ct(T, N, D, j) {
    const {
      scrollBehavior: ue
    } = e;
    if (!ti || !ue) return Promise.resolve();
    const y = !D && yp(il(T.fullPath, 0)) || (j || !D) && history.state && history.state.scroll || null;
    return vc().then(() => ue(T, N, y)).then(w => w && mp(w)).catch(w => he(w, T, N))
  }
  const Ne = T => n.go(T);
  let nr;
  const sr = new Set,
    He = {
      currentRoute: l,
      listening: !0,
      addRoute: d,
      removeRoute: p,
      hasRoute: _,
      getRoutes: g,
      resolve: b,
      options: e,
      push: P,
      replace: H,
      go: Ne,
      back: () => Ne(-1),
      forward: () => Ne(1),
      beforeEach: s.add,
      beforeResolve: o.add,
      afterEach: a.add,
      onError: be.add,
      isReady: Ie,
      install(T) {
        const N = this;
        T.component("RouterLink", t0), T.component("RouterView", s0), T.config.globalProperties.$router = N, Object.defineProperty(T.config.globalProperties, "$route", {
          enumerable: !0,
          get: () => oi(l)
        }), ti && !nr && l.value === hr && (nr = !0, P(n.location).catch(ue => { }));
        const D = {};
        for (const ue in hr) D[ue] = dt(() => l.value[ue]);
        T.provide(Vo, N), T.provide(qo, Zi(D)), T.provide(fo, l);
        const j = T.unmount;
        sr.add(T), T.unmount = function () {
          sr.delete(T), sr.size < 1 && (c = hr, ae && ae(), ae = null, l.value = hr, nr = !1, Z = !1), j()
        }
      }
    };

  function Pe(T) {
    return T.reduce((N, D) => N.then(() => ee(D)), Promise.resolve())
  }
  return He
}

function a0(e, t) {
  const r = [],
    i = [],
    n = [],
    s = Math.max(t.matched.length, e.matched.length);
  for (let o = 0; o < s; o++) {
    const a = t.matched[o];
    a && (e.matched.find(c => ui(c, a)) ? i.push(a) : r.push(a));
    const l = e.matched[o];
    l && (t.matched.find(c => ui(c, l)) || n.push(l))
  }
  return [r, i, n]
}

function l0() {
  return Ot(qo)
}
const yi = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [i, n] of t) r[i] = n;
  return r
},
  c0 = {},
  h0 = e => (gc("data-v-797e7907"), e = e(), wc(), e),
  f0 = {
    class: "hero"
  },
  u0 = h0(() => $t("span", null, "Welcome to memorabilia gallery", -1));

function d0(e, t) {
  const r = Js("router-link");
  return pt(), It("div", f0, [u0, $e(r, {
    to: "/gallery"
  }, {
    default: vr(() => [$r("Enter")]),
    _: 1
  })])
}
const v0 = yi(c0, [
  ["render", d0],
  ["__scopeId", "data-v-797e7907"]
]),
  p0 = "/assets/card-c249a363.png";
var uo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};

function m0(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}

function _0(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function i() {
      if (this instanceof i) {
        var n = [null];
        n.push.apply(n, arguments);
        var s = Function.bind.apply(t, n);
        return new s
      }
      return t.apply(this, arguments)
    };
    r.prototype = t.prototype
  } else r = {};
  return Object.defineProperty(r, "__esModule", {
    value: !0
  }), Object.keys(e).forEach(function (i) {
    var n = Object.getOwnPropertyDescriptor(e, i);
    Object.defineProperty(r, i, n.get ? n : {
      enumerable: !0,
      get: function () {
        return e[i]
      }
    })
  }), r
}

function li() { }
li.prototype.addEventListener = function (e, t) {
  var r = this.__events = this.__events || {},
    i = r[e] = r[e] || [];
  i.indexOf(t) < 0 && i.push(t)
};
li.prototype.removeEventListener = function (e, t) {
  var r = this.__events = this.__events || {},
    i = r[e];
  if (i) {
    var n = i.indexOf(t);
    n >= 0 && i.splice(n, 1)
  }
};
li.prototype.emit = function (e, t) {
  var r = this.__events = this.__events || {},
    i = r[e],
    n = Array.prototype.slice.call(arguments, 1);
  if (i)
    for (var s = 0; s < i.length; s++) {
      var o = i[s];
      o.apply(this, n)
    }
};

function y0(e) {
  for (var t in li.prototype) li.prototype.hasOwnProperty(t) && (e.prototype[t] = li.prototype[t])
}
var Ae = y0;

function g0() {
  return typeof performance < "u" && performance.now ? function () {
    return performance.now()
  } : function () {
    return Date.now()
  }
}
var Vr = g0(),
  Jc = Vr;

function w0(e, t) {
  this.fn = e, this.cb = t, this.cfn = null
}

function er(e) {
  this._queue = [], this._delay = e && e.delay || 0, this._paused = e && !!e.paused || !1, this._currentTask = null, this._lastFinished = null
}
er.prototype.length = function () {
  return this._queue.length
};
er.prototype.push = function (e, t) {
  var r = new w0(e, t),
    i = this._cancel.bind(this, r);
  return this._queue.push(r), this._next(), i
};
er.prototype.pause = function () {
  this._paused || (this._paused = !0)
};
er.prototype.resume = function () {
  this._paused && (this._paused = !1, this._next())
};
er.prototype._start = function (e) {
  if (this._currentTask) throw new Error("WorkQueue: called start while running task");
  this._currentTask = e;
  var t = this._finish.bind(this, e);
  if (e.cfn = e.fn(t), typeof e.cfn != "function") throw new Error("WorkQueue: function is not cancellable")
};
er.prototype._finish = function (e) {
  var t = Array.prototype.slice.call(arguments, 1);
  if (this._currentTask !== e) throw new Error("WorkQueue: called finish on wrong task");
  e.cb.apply(null, t), this._currentTask = null, this._lastFinished = Jc(), this._next()
};
er.prototype._cancel = function (e) {
  var t = Array.prototype.slice.call(arguments, 1);
  if (this._currentTask === e) e.cfn.apply(null, t);
  else {
    var r = this._queue.indexOf(e);
    r >= 0 && (this._queue.splice(r, 1), e.cb.apply(null, t))
  }
};
er.prototype._next = function () {
  if (!this._paused && this._queue.length && !this._currentTask) {
    if (this._lastFinished != null) {
      var e = Jc() - this._lastFinished,
        t = this._delay - e;
      if (t > 0) {
        setTimeout(this._next.bind(this), t);
        return
      }
    }
    var r = this._queue.shift();
    this._start(r)
  }
};
var eh = er;

function x0(e, t, r, i) {
  i = i || {};
  var n;
  r != null && r.absoluteWidth != null ? n = r.absoluteWidth / e : r != null && r.relativeWidth != null ? n = r.relativeWidth : n = 1;
  var s;
  r && r.absoluteHeight != null ? s = r.absoluteHeight / t : r != null && r.relativeHeight != null ? s = r.relativeHeight : s = 1;
  var o;
  r != null && r.absoluteX != null ? o = r.absoluteX / e : r != null && r.relativeX != null ? o = r.relativeX : o = 0;
  var a;
  return r != null && r.absoluteY != null ? a = r.absoluteY / t : r != null && r.relativeY != null ? a = r.relativeY : a = 0, i.x = o, i.y = a, i.width = n, i.height = s, i
}
var th = x0;

function b0(e) {
  return function (r) {
    var i, n;
    try {
      n = e()
    } catch (s) {
      i = s
    } finally {
      i ? r(i) : r(null, n)
    }
  }
}
var rh = b0;

function M0(e) {
  var t = !1,
    r;
  return function () {
    return t || (t = !0, r = e.apply(null, arguments)), r
  }
}
var Wo = M0,
  E0 = Wo;

function T0(e) {
  return function () {
    if (!arguments.length) throw new Error("cancelized: expected at least one argument");
    var r = Array.prototype.slice.call(arguments, 0),
      i = r[r.length - 1] = E0(r[r.length - 1]);

    function n() {
      i.apply(null, arguments)
    }
    return e.apply(null, r), n
  }
}
var ih = T0;

function S0(e) {
  for (var t in e) e.hasOwnProperty(t) && (e[t] = void 0)
}
var Te = S0;

function jo() {
  this._renderers = {}
}
jo.prototype.set = function (e, t, r) {
  this._renderers[e] || (this._renderers[e] = {}), this._renderers[e][t] = r
};
jo.prototype.get = function (e, t) {
  var r = this._renderers[e] && this._renderers[e][t];
  return r || null
};
var P0 = jo,
  C0 = Ae,
  A0 = eh,
  R0 = th,
  z0 = rh,
  L0 = ih,
  $0 = Te,
  O0 = P0;

function I0(e, t) {
  return e.cmp(t)
}

function F0(e, t) {
  return -e.cmp(t)
}

function we(e) {
  this._progressive = !!(e && e.progressive), this._layers = [], this._renderers = [], this._tilesToLoad = [], this._tilesToRender = [], this._tmpVisible = [], this._tmpChildren = [], this._width = 0, this._height = 0, this._tmpRect = {}, this._tmpSize = {}, this._createTextureWorkQueue = new A0, this._emitRenderInvalid = this._emitRenderInvalid.bind(this), this._rendererRegistry = new O0
}
C0(we);
we.prototype.destroy = function () {
  this.removeAllLayers(), $0(this)
};
we.prototype.registerRenderer = function (e, t, r) {
  return this._rendererRegistry.set(e, t, r)
};
we.prototype.domElement = function () {
  throw new Error("Stage implementation must override domElement")
};
we.prototype.width = function () {
  return this._width
};
we.prototype.height = function () {
  return this._height
};
we.prototype.size = function (e) {
  return e = e || {}, e.width = this._width, e.height = this._height, e
};
we.prototype.setSize = function (e) {
  this._width = e.width, this._height = e.height, this.setSizeForType(), this.emit("resize"), this._emitRenderInvalid()
};
we.prototype.setSizeForType = function (e) {
  throw new Error("Stage implementation must override setSizeForType")
};
we.prototype.loadImage = function () {
  throw new Error("Stage implementation must override loadImage")
};
we.prototype._emitRenderInvalid = function () {
  this.emit("renderInvalid")
};
we.prototype.validateLayer = function (e) {
  throw new Error("Stage implementation must override validateLayer")
};
we.prototype.listLayers = function () {
  return [].concat(this._layers)
};
we.prototype.hasLayer = function (e) {
  return this._layers.indexOf(e) >= 0
};
we.prototype.addLayer = function (e, t) {
  if (this._layers.indexOf(e) >= 0) throw new Error("Layer already in stage");
  if (t == null && (t = this._layers.length), t < 0 || t > this._layers.length) throw new Error("Invalid layer position");
  this.validateLayer(e);
  var r = e.geometry().type,
    i = e.view().type,
    n = this._rendererRegistry.get(r, i);
  if (!n) throw new Error("No " + this.type + " renderer avaiable for " + r + " geometry and " + i + " view");
  var s = this.createRenderer(n);
  this._layers.splice(t, 0, e), this._renderers.splice(t, 0, s), e.addEventListener("viewChange", this._emitRenderInvalid), e.addEventListener("effectsChange", this._emitRenderInvalid), e.addEventListener("fixedLevelChange", this._emitRenderInvalid), e.addEventListener("textureStoreChange", this._emitRenderInvalid), this._emitRenderInvalid()
};
we.prototype.moveLayer = function (e, t) {
  var r = this._layers.indexOf(e);
  if (r < 0) throw new Error("No such layer in stage");
  if (t < 0 || t >= this._layers.length) throw new Error("Invalid layer position");
  e = this._layers.splice(r, 1)[0];
  var i = this._renderers.splice(r, 1)[0];
  this._layers.splice(t, 0, e), this._renderers.splice(t, 0, i), this._emitRenderInvalid()
};
we.prototype.removeLayer = function (e) {
  var t = this._layers.indexOf(e);
  if (t < 0) throw new Error("No such layer in stage");
  var r = this._layers.splice(t, 1)[0],
    i = this._renderers.splice(t, 1)[0];
  this.destroyRenderer(i), r.removeEventListener("viewChange", this._emitRenderInvalid), r.removeEventListener("effectsChange", this._emitRenderInvalid), r.removeEventListener("fixedLevelChange", this._emitRenderInvalid), r.removeEventListener("textureStoreChange", this._emitRenderInvalid), this._emitRenderInvalid()
};
we.prototype.removeAllLayers = function () {
  for (; this._layers.length > 0;) this.removeLayer(this._layers[0])
};
we.prototype.startFrame = function () {
  throw new Error("Stage implementation must override startFrame")
};
we.prototype.endFrame = function () {
  throw new Error("Stage implementation must override endFrame")
};
we.prototype.render = function () {
  var e, t, r = this._tilesToLoad,
    i = this._tilesToRender,
    n = !0,
    s, o = this._width,
    a = this._height,
    l = this._tmpRect,
    c = this._tmpSize;
  if (!(o <= 0 || a <= 0)) {
    for (this.startFrame(), e = 0; e < this._layers.length; e++) this._layers[e].textureStore().startFrame();
    for (e = 0; e < this._layers.length; e++) {
      var h = this._layers[e],
        f = h.effects(),
        u = h.view(),
        d = h.textureStore(),
        p = this._renderers[e],
        g = this._layers.length - e,
        _, b;
      if (R0(o, a, f && f.rect, l), !(l.width <= 0 || l.height <= 0)) {
        for (c.width = l.width * this._width, c.height = l.height * this._height, u.setSize(c), p.startLayer(h, l), s = this._collectTiles(h, d), t = 0; t < r.length; t++) _ = r[t], d.markTile(_);
        for (t = 0; t < i.length; t++) _ = i[t], b = d.texture(_), p.renderTile(_, b, h, g);
        h.emit("renderComplete", s), s || (n = !1), p.endLayer(h, l)
      }
    }
    for (e = 0; e < this._layers.length; e++) this._layers[e].textureStore().endFrame();
    this.endFrame(), this.emit("renderComplete", n)
  }
};
we.prototype._collectTiles = function (e, t) {
  var r = this._tilesToLoad,
    i = this._tilesToRender,
    n = this._tmpVisible;
  r.length = 0, i.length = 0, n.length = 0, e.visibleTiles(n);
  for (var s = !0, o = 0; o < n.length; o++) {
    var a = n[o],
      l;
    this._collectTileToLoad(a), t.texture(a) ? (l = !1, this._collectTileToRender(a)) : (l = this._collectChildren(a, t), s = !1), this._collectParents(a, t, l)
  }
  return r.sort(I0), i.sort(F0), s
};
we.prototype._collectChildren = function (e, t) {
  var r = this._tmpChildren,
    i = !0;
  do {
    if (r.length = 0, !e.children(r)) break;
    i = !1;
    for (var n = 0; n < r.length; n++) e = r[n], t.texture(e) ? (this._collectTileToLoad(e), this._collectTileToRender(e)) : i = !0
  } while (i && r.length === 1);
  return i
};
we.prototype._collectParents = function (e, t, r) {
  for (var i = this._progressive;
    (i || r) && (e = e.parent()) != null;) {
    if (r) {
      if (t.texture(e)) this._collectTileToRender(e), r = !1;
      else if (!this._progressive) continue
    }
    this._collectTileToLoad(e) || (i = !1)
  }
  return r
};
we.prototype._collectTileToLoad = function (e) {
  return this._collectTileIntoList(e, this._tilesToLoad)
};
we.prototype._collectTileToRender = function (e) {
  return this._collectTileIntoList(e, this._tilesToRender)
};
we.prototype._collectTileIntoList = function (e, t) {
  for (var r = !1, i = 0; i < t.length; i++)
    if (e.equals(t[i])) {
      r = !0;
      break
    }
  return r || t.push(e), !r
};
we.prototype.createTexture = function (e, t, r) {
  var i = this;

  function n() {
    return new i.TextureClass(i, e, t)
  }
  var s = L0(z0(n));
  return this._createTextureWorkQueue.push(s, function (o, a) {
    r(o, e, t, a)
  })
};
var H0 = we,
  k0 = function () {
    return typeof window < "u" ? window : typeof self < "u" ? self : typeof uo < "u" ? uo : null
  }(),
  nh = k0,
  _l = nh,
  N0 = Ae,
  D0 = Te,
  Ls = {
    HTMLImageElement: ["naturalWidth", "naturalHeight"],
    HTMLCanvasElement: ["width", "height"],
    ImageBitmap: ["width", "height"]
  };

function br(e) {
  var t = !1;
  for (var r in Ls)
    if (_l[r] && e instanceof _l[r]) {
      t = !0, this._widthProp = Ls[r][0], this._heightProp = Ls[r][1];
      break
    }
  if (!t) throw new Error("Unsupported pixel source");
  this._element = e
}
N0(br);
br.prototype.destroy = function () {
  D0(this)
};
br.prototype.element = function () {
  return this._element
};
br.prototype.width = function () {
  return this._element[this._widthProp]
};
br.prototype.height = function () {
  return this._element[this._heightProp]
};
br.prototype.timestamp = function () {
  return 0
};
br.prototype.isDynamic = function () {
  return !1
};
var Uo = br;

function B0(e, t) {
  e.super_ = t;
  var r = function () { };
  r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
}
var Ht = B0,
  V0 = Ht;

function sh(e) {
  this.constructor.super_.apply(this, arguments), this.message = e
}
V0(sh, Error);
var oh = sh,
  ah = {
    exports: {}
  };
/*!
* Bowser - a browser detector
* https://github.com/ded/bowser
* MIT License | (c) Dustin Diaz 2015
*/
(function (e) {
  (function (t, r, i) {
    e.exports ? e.exports = i() : t[r] = i()
  })(uo, "bowser", function () {
    var t = !0;

    function r(c) {
      function h(Ie) {
        var Re = c.match(Ie);
        return Re && Re.length > 1 && Re[1] || ""
      }

      function f(Ie) {
        var Re = c.match(Ie);
        return Re && Re.length > 1 && Re[2] || ""
      }
      var u = h(/(ipod|iphone|ipad)/i).toLowerCase(),
        d = /like android/i.test(c),
        p = !d && /android/i.test(c),
        g = /nexus\s*[0-6]\s*/i.test(c),
        _ = !g && /nexus\s*[0-9]+/i.test(c),
        b = /CrOS/.test(c),
        S = /silk/i.test(c),
        R = /sailfish/i.test(c),
        P = /tizen/i.test(c),
        H = /(web|hpw)(o|0)s/i.test(c),
        O = /windows phone/i.test(c),
        Y = !O && /windows/i.test(c),
        Q = !u && !S && /macintosh/i.test(c),
        ee = !p && !R && !P && !H && /linux/i.test(c),
        J = f(/edg([ea]|ios)\/(\d+(\.\d+)?)/i),
        U = h(/version\/(\d+(\.\d+)?)/i),
        se = /tablet/i.test(c) && !/tablet pc/i.test(c),
        ae = !se && /[^-]mobi/i.test(c),
        K = /xbox/i.test(c),
        E;
      /opera/i.test(c) ? E = {
        name: "Opera",
        opera: t,
        version: U || h(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      } : /opr\/|opios/i.test(c) ? E = {
        name: "Opera",
        opera: t,
        version: h(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || U
      } : /SamsungBrowser/i.test(c) ? E = {
        name: "Samsung Internet for Android",
        samsungBrowser: t,
        version: U || h(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
      } : /Whale/i.test(c) ? E = {
        name: "NAVER Whale browser",
        whale: t,
        version: h(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i)
      } : /MZBrowser/i.test(c) ? E = {
        name: "MZ Browser",
        mzbrowser: t,
        version: h(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i)
      } : /coast/i.test(c) ? E = {
        name: "Opera Coast",
        coast: t,
        version: U || h(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      } : /focus/i.test(c) ? E = {
        name: "Focus",
        focus: t,
        version: h(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i)
      } : /yabrowser/i.test(c) ? E = {
        name: "Yandex Browser",
        yandexbrowser: t,
        version: U || h(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      } : /ucbrowser/i.test(c) ? E = {
        name: "UC Browser",
        ucbrowser: t,
        version: h(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      } : /mxios/i.test(c) ? E = {
        name: "Maxthon",
        maxthon: t,
        version: h(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      } : /epiphany/i.test(c) ? E = {
        name: "Epiphany",
        epiphany: t,
        version: h(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      } : /puffin/i.test(c) ? E = {
        name: "Puffin",
        puffin: t,
        version: h(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      } : /sleipnir/i.test(c) ? E = {
        name: "Sleipnir",
        sleipnir: t,
        version: h(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      } : /k-meleon/i.test(c) ? E = {
        name: "K-Meleon",
        kMeleon: t,
        version: h(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      } : O ? (E = {
        name: "Windows Phone",
        osname: "Windows Phone",
        windowsphone: t
      }, J ? (E.msedge = t, E.version = J) : (E.msie = t, E.version = h(/iemobile\/(\d+(\.\d+)?)/i))) : /msie|trident/i.test(c) ? E = {
        name: "Internet Explorer",
        msie: t,
        version: h(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      } : b ? E = {
        name: "Chrome",
        osname: "Chrome OS",
        chromeos: t,
        chromeBook: t,
        chrome: t,
        version: h(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      } : /edg([ea]|ios)/i.test(c) ? E = {
        name: "Microsoft Edge",
        msedge: t,
        version: J
      } : /vivaldi/i.test(c) ? E = {
        name: "Vivaldi",
        vivaldi: t,
        version: h(/vivaldi\/(\d+(\.\d+)?)/i) || U
      } : R ? E = {
        name: "Sailfish",
        osname: "Sailfish OS",
        sailfish: t,
        version: h(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      } : /seamonkey\//i.test(c) ? E = {
        name: "SeaMonkey",
        seamonkey: t,
        version: h(/seamonkey\/(\d+(\.\d+)?)/i)
      } : /firefox|iceweasel|fxios/i.test(c) ? (E = {
        name: "Firefox",
        firefox: t,
        version: h(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }, /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(c) && (E.firefoxos = t, E.osname = "Firefox OS")) : S ? E = {
        name: "Amazon Silk",
        silk: t,
        version: h(/silk\/(\d+(\.\d+)?)/i)
      } : /phantom/i.test(c) ? E = {
        name: "PhantomJS",
        phantom: t,
        version: h(/phantomjs\/(\d+(\.\d+)?)/i)
      } : /slimerjs/i.test(c) ? E = {
        name: "SlimerJS",
        slimer: t,
        version: h(/slimerjs\/(\d+(\.\d+)?)/i)
      } : /blackberry|\bbb\d+/i.test(c) || /rim\stablet/i.test(c) ? E = {
        name: "BlackBerry",
        osname: "BlackBerry OS",
        blackberry: t,
        version: U || h(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      } : H ? (E = {
        name: "WebOS",
        osname: "WebOS",
        webos: t,
        version: U || h(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      }, /touchpad\//i.test(c) && (E.touchpad = t)) : /bada/i.test(c) ? E = {
        name: "Bada",
        osname: "Bada",
        bada: t,
        version: h(/dolfin\/(\d+(\.\d+)?)/i)
      } : P ? E = {
        name: "Tizen",
        osname: "Tizen",
        tizen: t,
        version: h(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || U
      } : /qupzilla/i.test(c) ? E = {
        name: "QupZilla",
        qupzilla: t,
        version: h(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || U
      } : /chromium/i.test(c) ? E = {
        name: "Chromium",
        chromium: t,
        version: h(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || U
      } : /chrome|crios|crmo/i.test(c) ? E = {
        name: "Chrome",
        chrome: t,
        version: h(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      } : p ? E = {
        name: "Android",
        version: U
      } : /safari|applewebkit/i.test(c) ? (E = {
        name: "Safari",
        safari: t
      }, U && (E.version = U)) : u ? (E = {
        name: u == "iphone" ? "iPhone" : u == "ipad" ? "iPad" : "iPod"
      }, U && (E.version = U)) : /googlebot/i.test(c) ? E = {
        name: "Googlebot",
        googlebot: t,
        version: h(/googlebot\/(\d+(\.\d+))/i) || U
      } : E = {
        name: h(/^(.*)\/(.*) /),
        version: f(/^(.*)\/(.*) /)
      }, !E.msedge && /(apple)?webkit/i.test(c) ? (/(apple)?webkit\/537\.36/i.test(c) ? (E.name = E.name || "Blink", E.blink = t) : (E.name = E.name || "Webkit", E.webkit = t), !E.version && U && (E.version = U)) : !E.opera && /gecko\//i.test(c) && (E.name = E.name || "Gecko", E.gecko = t, E.version = E.version || h(/gecko\/(\d+(\.\d+)?)/i)), !E.windowsphone && (p || E.silk) ? (E.android = t, E.osname = "Android") : !E.windowsphone && u ? (E[u] = t, E.ios = t, E.osname = "iOS") : Q ? (E.mac = t, E.osname = "macOS") : K ? (E.xbox = t, E.osname = "Xbox") : Y ? (E.windows = t, E.osname = "Windows") : ee && (E.linux = t, E.osname = "Linux");

      function be(Ie) {
        switch (Ie) {
          case "NT":
            return "NT";
          case "XP":
            return "XP";
          case "NT 5.0":
            return "2000";
          case "NT 5.1":
            return "XP";
          case "NT 5.2":
            return "2003";
          case "NT 6.0":
            return "Vista";
          case "NT 6.1":
            return "7";
          case "NT 6.2":
            return "8";
          case "NT 6.3":
            return "8.1";
          case "NT 10.0":
            return "10";
          default:
            return
        }
      }
      var Z = "";
      E.windows ? Z = be(h(/Windows ((NT|XP)( \d\d?.\d)?)/i)) : E.windowsphone ? Z = h(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i) : E.mac ? (Z = h(/Mac OS X (\d+([_\.\s]\d+)*)/i), Z = Z.replace(/[_\s]/g, ".")) : u ? (Z = h(/os (\d+([_\s]\d+)*) like mac os x/i), Z = Z.replace(/[_\s]/g, ".")) : p ? Z = h(/android[ \/-](\d+(\.\d+)*)/i) : E.webos ? Z = h(/(?:web|hpw)os\/(\d+(\.\d+)*)/i) : E.blackberry ? Z = h(/rim\stablet\sos\s(\d+(\.\d+)*)/i) : E.bada ? Z = h(/bada\/(\d+(\.\d+)*)/i) : E.tizen && (Z = h(/tizen[\/\s](\d+(\.\d+)*)/i)), Z && (E.osversion = Z);
      var he = !E.windows && Z.split(".")[0];
      return se || _ || u == "ipad" || p && (he == 3 || he >= 4 && !ae) || E.silk ? E.tablet = t : (ae || u == "iphone" || u == "ipod" || p || g || E.blackberry || E.webos || E.bada) && (E.mobile = t), E.msedge || E.msie && E.version >= 10 || E.yandexbrowser && E.version >= 15 || E.vivaldi && E.version >= 1 || E.chrome && E.version >= 20 || E.samsungBrowser && E.version >= 4 || E.whale && o([E.version, "1.0"]) === 1 || E.mzbrowser && o([E.version, "6.0"]) === 1 || E.focus && o([E.version, "1.0"]) === 1 || E.firefox && E.version >= 20 || E.safari && E.version >= 6 || E.opera && E.version >= 10 || E.ios && E.osversion && E.osversion.split(".")[0] >= 6 || E.blackberry && E.version >= 10.1 || E.chromium && E.version >= 20 ? E.a = t : E.msie && E.version < 10 || E.chrome && E.version < 20 || E.firefox && E.version < 20 || E.safari && E.version < 6 || E.opera && E.version < 10 || E.ios && E.osversion && E.osversion.split(".")[0] < 6 || E.chromium && E.version < 20 ? E.c = t : E.x = t, E
    }
    var i = r(typeof navigator < "u" && navigator.userAgent || "");
    i.test = function (c) {
      for (var h = 0; h < c.length; ++h) {
        var f = c[h];
        if (typeof f == "string" && f in i) return !0
      }
      return !1
    };

    function n(c) {
      return c.split(".").length
    }

    function s(c, h) {
      var f = [],
        u;
      if (Array.prototype.map) return Array.prototype.map.call(c, h);
      for (u = 0; u < c.length; u++) f.push(h(c[u]));
      return f
    }

    function o(c) {
      for (var h = Math.max(n(c[0]), n(c[1])), f = s(c, function (u) {
        var d = h - n(u);
        return u = u + new Array(d + 1).join(".0"), s(u.split("."), function (p) {
          return new Array(20 - p.length).join("0") + p
        }).reverse()
      }); --h >= 0;) {
        if (f[0][h] > f[1][h]) return 1;
        if (f[0][h] === f[1][h]) {
          if (h === 0) return 0
        } else return -1
      }
    }

    function a(c, h, f) {
      var u = i;
      typeof h == "string" && (f = h, h = void 0), h === void 0 && (h = !1), f && (u = r(f));
      var d = "" + u.version;
      for (var p in c)
        if (c.hasOwnProperty(p) && u[p]) {
          if (typeof c[p] != "string") throw new Error("Browser version in the minVersion map should be a string: " + p + ": " + String(c));
          return o([d, c[p]]) < 0
        }
      return h
    }

    function l(c, h, f) {
      return !a(c, h, f)
    }
    return i.isUnsupportedBrowser = a, i.compareVersions = o, i.check = l, i._detect = r, i.detect = r, i
  })
})(ah);
var Yo = ah.exports,
  $s = Uo,
  q0 = oh,
  W0 = Yo,
  lh = nh,
  j0 = Wo,
  U0 = !!lh.createImageBitmap && !W0.firefox,
  Y0 = {
    imageOrientation: "flipY",
    premultiplyAlpha: "premultiply"
  };

function is(e) {
  this._stage = e
}
is.prototype.loadImage = function (e, t, r) {
  var i = this,
    n = new Image;
  n.crossOrigin = "anonymous";
  var s = t && t.x || 0,
    o = t && t.y || 0,
    a = t && t.width || 1,
    l = t && t.height || 1;
  r = j0(r), n.onload = function () {
    i._handleLoad(n, s, o, a, l, r)
  }, n.onerror = function () {
    i._handleError(e, r)
  }, n.src = e;

  function c() {
    n.onload = n.onerror = null, n.src = "", r.apply(null, arguments)
  }
  return c
};
is.prototype._handleLoad = function (e, t, r, i, n, s) {
  if (t === 0 && r === 0 && i === 1 && n === 1) {
    s(null, new $s(e));
    return
  }
  if (t *= e.naturalWidth, r *= e.naturalHeight, i *= e.naturalWidth, n *= e.naturalHeight, U0) lh.createImageBitmap(e, t, r, i, n, Y0).then(function (l) {
    s(null, new $s(l))
  });
  else {
    var o = document.createElement("canvas");
    o.width = i, o.height = n;
    var a = o.getContext("2d");
    a.drawImage(e, t, r, i, n, 0, 0, i, n), s(null, new $s(o))
  }
};
is.prototype._handleError = function (e, t) {
  t(new q0("Network error: " + e))
};
var X0 = is,
  G0 = 1;

function K0() {
  if (typeof window < "u") {
    if (window.devicePixelRatio) return window.devicePixelRatio;
    var e = window.screen;
    if (e && e.deviceXDPI && e.logicalXDPI) return e.deviceXDPI / e.logicalXDPI;
    if (e && e.systemXDPI && e.logicalXDPI) return e.systemXDPI / e.logicalXDPI
  }
  return G0
}
var ns = K0;

function Z0(e) {
  return (e & e - 1) == 0
}
var Q0 = Z0;

function Xo(e) {
  for (var t = document.documentElement.style, r = ["Moz", "Webkit", "Khtml", "O", "ms"], i = 0; i < r.length; i++) {
    var n = r[i],
      s = e[0].toUpperCase() + e.slice(1),
      o = n + s;
    if (o in t) return o
  }
  return e
}

function J0(e) {
  var t = Xo(e);
  return function (i) {
    return i.style[t]
  }
}

function Go(e) {
  var t = Xo(e);
  return function (i, n) {
    return i.style[t] = n
  }
}
var ch = Go("transform"),
  hh = Go("transformOrigin");

function em(e) {
  ch(e, "translateZ(0)")
}

function tm(e) {
  hh(e, "0 0 0")
}

function rm(e) {
  e.style.position = "absolute"
}

function im(e, t, r) {
  e.style.left = t + "px", e.style.top = r + "px"
}

function nm(e, t, r) {
  e.style.width = t + "px", e.style.height = r + "px"
}

function sm(e) {
  e.style.width = e.style.height = 0
}

function om(e) {
  e.style.width = e.style.height = "100%"
}

function am(e) {
  e.style.overflow = "hidden"
}

function lm(e) {
  e.style.overflow = "visible"
}

function cm(e) {
  e.style.pointerEvents = "none"
}
var ot = {
  prefixProperty: Xo,
  getWithVendorPrefix: J0,
  setWithVendorPrefix: Go,
  setTransform: ch,
  setTransformOrigin: hh,
  setNullTransform: em,
  setNullTransformOrigin: tm,
  setAbsolute: rm,
  setPixelPosition: im,
  setPixelSize: nm,
  setNullSize: sm,
  setFullSize: om,
  setOverflowHidden: am,
  setOverflowVisible: lm,
  setNoPointerEvents: cm
},
  hm = H0,
  fm = X0,
  um = Yo,
  dm = Ht,
  vm = ns,
  yl = Q0,
  pm = ot.setAbsolute,
  mm = ot.setFullSize,
  _m = Te,
  ym = {
    videoUseTexImage2D: um.chrome
  };

function gm(e, t) {
  var r = {
    alpha: !0,
    premultipliedAlpha: !0,
    antialias: !!(t && t.antialias),
    preserveDrawingBuffer: !!(t && t.preserveDrawingBuffer)
  },
    i = e.getContext && (e.getContext("webgl", r) || e.getContext("experimental-webgl", r));
  if (!i) throw new Error("Could not get WebGL context");
  return t.wrapContext && (i = t.wrapContext(i)), i
}

function Ve(e) {
  e = e || {};
  var t = this;
  this.constructor.super_.call(this, e), this._generateMipmaps = e.generateMipmaps != null ? e.generateMipmaps : !1, this._loader = new fm(this), this._domElement = document.createElement("canvas"), pm(this._domElement), mm(this._domElement), this._gl = gm(this._domElement, e), this._handleContextLoss = function () {
    t.emit("webglcontextlost"), t._gl = null
  }, this._domElement.addEventListener("webglcontextlost", this._handleContextLoss), this._rendererInstances = []
}
dm(Ve, hm);
Ve.prototype.destroy = function () {
  this._domElement.removeEventListener("webglcontextlost", this._handleContextLoss), this.constructor.super_.prototype.destroy.call(this)
};
Ve.prototype.domElement = function () {
  return this._domElement
};
Ve.prototype.webGlContext = function () {
  return this._gl
};
Ve.prototype.setSizeForType = function () {
  var e = vm();
  this._domElement.width = e * this._width, this._domElement.height = e * this._height
};
Ve.prototype.loadImage = function (e, t, r) {
  return this._loader.loadImage(e, t, r)
};
Ve.prototype.maxTextureSize = function () {
  return this._gl.getParameter(this._gl.MAX_TEXTURE_SIZE)
};
Ve.prototype.validateLayer = function (e) {
  var t = e.geometry().maxTileSize(),
    r = this.maxTextureSize();
  if (t > r) throw new Error("Layer has level with tile size larger than maximum texture size (" + t + " vs. " + r + ")")
};
Ve.prototype.createRenderer = function (e) {
  for (var t = this._rendererInstances, r = 0; r < t.length; r++)
    if (t[r] instanceof e) return t[r];
  var i = new e(this._gl);
  return t.push(i), i
};
Ve.prototype.destroyRenderer = function (e) {
  var t = this._rendererInstances;
  if (this._renderers.indexOf(e) < 0) {
    e.destroy();
    var r = t.indexOf(e);
    r >= 0 && t.splice(r, 1)
  }
};
Ve.prototype.startFrame = function () {
  var e = this._gl;
  if (!e) throw new Error("Bad WebGL context - maybe context was lost?");
  e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight), e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), e.enable(e.DEPTH_TEST), e.enable(e.BLEND), e.blendFunc(e.ONE, e.ONE_MINUS_SRC_ALPHA)
};
Ve.prototype.endFrame = function () { };
Ve.prototype.takeSnapshot = function (e) {
  (typeof e != "object" || e == null) && (e = {});
  var t = e.quality;
  if (typeof t > "u" && (t = 75), typeof t != "number" || t < 0 || t > 100) throw new Error("WebGLStage: Snapshot quality needs to be a number between 0 and 100");
  return this.render(), this._domElement.toDataURL("image/jpeg", t / 100)
};
Ve.type = Ve.prototype.type = "webgl";

function Ko(e, t, r) {
  this._stage = e, this._gl = e._gl, this._texture = null, this._timestamp = null, this._width = this._height = null, this.refresh(t, r)
}
Ko.prototype.refresh = function (e, t) {
  var r = this._gl,
    i = this._stage,
    n, s = t.timestamp();
  if (s !== this._timestamp) {
    var o = t.element(),
      a = t.width(),
      l = t.height();
    if (a !== this._width || l !== this._height) {
      var c = i.maxTextureSize();
      if (a > c) throw new Error("Texture width larger than max size (" + a + " vs. " + c + ")");
      if (l > c) throw new Error("Texture height larger than max size (" + l + " vs. " + c + ")");
      this._texture && r.deleteTexture(n), n = this._texture = r.createTexture(), r.bindTexture(r.TEXTURE_2D, n), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !0), r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, o)
    } else n = this._texture, r.bindTexture(r.TEXTURE_2D, n), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !0), r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0), o instanceof HTMLVideoElement && ym.videoUseTexImage2D ? r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, o) : r.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, r.RGBA, r.UNSIGNED_BYTE, o);
    i._generateMipmaps && yl(a) && yl(l) ? (r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR_MIPMAP_LINEAR), r.generateMipmap(r.TEXTURE_2D)) : (r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR)), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.bindTexture(r.TEXTURE_2D, null), this._timestamp = s, this._width = a, this._height = l
  }
};
Ko.prototype.destroy = function () {
  this._texture && this._gl.deleteTexture(this._texture), _m(this)
};
Ve.TextureClass = Ve.prototype.TextureClass = Ko;
var fh = Ve,
  W = 1e-6,
  oe = typeof Float32Array < "u" ? Float32Array : Array,
  bt = Math.random;

function wm(e) {
  oe = e
}
var xm = Math.PI / 180;

function bm(e) {
  return e * xm
}

function Mm(e, t) {
  return Math.abs(e - t) <= W * Math.max(1, Math.abs(e), Math.abs(t))
}
Math.hypot || (Math.hypot = function () {
  for (var e = 0, t = arguments.length; t--;) e += arguments[t] * arguments[t];
  return Math.sqrt(e)
});
const Em = Object.freeze(Object.defineProperty({
  __proto__: null,
  get ARRAY_TYPE() {
    return oe
  },
  EPSILON: W,
  RANDOM: bt,
  equals: Mm,
  setMatrixArrayType: wm,
  toRadian: bm
}, Symbol.toStringTag, {
  value: "Module"
}));

function Tm() {
  var e = new oe(4);
  return oe != Float32Array && (e[1] = 0, e[2] = 0), e[0] = 1, e[3] = 1, e
}

function Sm(e) {
  var t = new oe(4);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
}

function Pm(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e
}

function Cm(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e
}

function Am(e, t, r, i) {
  var n = new oe(4);
  return n[0] = e, n[1] = t, n[2] = r, n[3] = i, n
}

function Rm(e, t, r, i, n) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e
}

function zm(e, t) {
  if (e === t) {
    var r = t[1];
    e[1] = t[2], e[2] = r
  } else e[0] = t[0], e[1] = t[2], e[2] = t[1], e[3] = t[3];
  return e
}

function Lm(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    o = r * s - n * i;
  return o ? (o = 1 / o, e[0] = s * o, e[1] = -i * o, e[2] = -n * o, e[3] = r * o, e) : null
}

function $m(e, t) {
  var r = t[0];
  return e[0] = t[3], e[1] = -t[1], e[2] = -t[2], e[3] = r, e
}

function Om(e) {
  return e[0] * e[3] - e[2] * e[1]
}

function uh(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3],
    a = r[0],
    l = r[1],
    c = r[2],
    h = r[3];
  return e[0] = i * a + s * l, e[1] = n * a + o * l, e[2] = i * c + s * h, e[3] = n * c + o * h, e
}

function Im(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3],
    a = Math.sin(r),
    l = Math.cos(r);
  return e[0] = i * l + s * a, e[1] = n * l + o * a, e[2] = i * -a + s * l, e[3] = n * -a + o * l, e
}

function Fm(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3],
    a = r[0],
    l = r[1];
  return e[0] = i * a, e[1] = n * a, e[2] = s * l, e[3] = o * l, e
}

function Hm(e, t) {
  var r = Math.sin(t),
    i = Math.cos(t);
  return e[0] = i, e[1] = r, e[2] = -r, e[3] = i, e
}

function km(e, t) {
  return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = t[1], e
}

function Nm(e) {
  return "mat2(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")"
}

function Dm(e) {
  return Math.hypot(e[0], e[1], e[2], e[3])
}

function Bm(e, t, r, i) {
  return e[2] = i[2] / i[0], r[0] = i[0], r[1] = i[1], r[3] = i[3] - e[2] * r[1], [e, t, r]
}

function Vm(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e
}

function dh(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e
}

function qm(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3]
}

function Wm(e, t) {
  var r = e[0],
    i = e[1],
    n = e[2],
    s = e[3],
    o = t[0],
    a = t[1],
    l = t[2],
    c = t[3];
  return Math.abs(r - o) <= W * Math.max(1, Math.abs(r), Math.abs(o)) && Math.abs(i - a) <= W * Math.max(1, Math.abs(i), Math.abs(a)) && Math.abs(n - l) <= W * Math.max(1, Math.abs(n), Math.abs(l)) && Math.abs(s - c) <= W * Math.max(1, Math.abs(s), Math.abs(c))
}

function jm(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e
}

function Um(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e
}
var Ym = uh,
  Xm = dh;
const Gm = Object.freeze(Object.defineProperty({
  __proto__: null,
  LDU: Bm,
  add: Vm,
  adjoint: $m,
  clone: Sm,
  copy: Pm,
  create: Tm,
  determinant: Om,
  equals: Wm,
  exactEquals: qm,
  frob: Dm,
  fromRotation: Hm,
  fromScaling: km,
  fromValues: Am,
  identity: Cm,
  invert: Lm,
  mul: Ym,
  multiply: uh,
  multiplyScalar: jm,
  multiplyScalarAndAdd: Um,
  rotate: Im,
  scale: Fm,
  set: Rm,
  str: Nm,
  sub: Xm,
  subtract: dh,
  transpose: zm
}, Symbol.toStringTag, {
  value: "Module"
}));

function Km() {
  var e = new oe(6);
  return oe != Float32Array && (e[1] = 0, e[2] = 0, e[4] = 0, e[5] = 0), e[0] = 1, e[3] = 1, e
}

function Zm(e) {
  var t = new oe(6);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t
}

function Qm(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e
}

function Jm(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e
}

function e1(e, t, r, i, n, s) {
  var o = new oe(6);
  return o[0] = e, o[1] = t, o[2] = r, o[3] = i, o[4] = n, o[5] = s, o
}

function t1(e, t, r, i, n, s, o) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e[4] = s, e[5] = o, e
}

function r1(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    o = t[4],
    a = t[5],
    l = r * s - i * n;
  return l ? (l = 1 / l, e[0] = s * l, e[1] = -i * l, e[2] = -n * l, e[3] = r * l, e[4] = (n * a - s * o) * l, e[5] = (i * o - r * a) * l, e) : null
}

function i1(e) {
  return e[0] * e[3] - e[1] * e[2]
}

function vh(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3],
    a = t[4],
    l = t[5],
    c = r[0],
    h = r[1],
    f = r[2],
    u = r[3],
    d = r[4],
    p = r[5];
  return e[0] = i * c + s * h, e[1] = n * c + o * h, e[2] = i * f + s * u, e[3] = n * f + o * u, e[4] = i * d + s * p + a, e[5] = n * d + o * p + l, e
}

function n1(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3],
    a = t[4],
    l = t[5],
    c = Math.sin(r),
    h = Math.cos(r);
  return e[0] = i * h + s * c, e[1] = n * h + o * c, e[2] = i * -c + s * h, e[3] = n * -c + o * h, e[4] = a, e[5] = l, e
}

function s1(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3],
    a = t[4],
    l = t[5],
    c = r[0],
    h = r[1];
  return e[0] = i * c, e[1] = n * c, e[2] = s * h, e[3] = o * h, e[4] = a, e[5] = l, e
}

function o1(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3],
    a = t[4],
    l = t[5],
    c = r[0],
    h = r[1];
  return e[0] = i, e[1] = n, e[2] = s, e[3] = o, e[4] = i * c + s * h + a, e[5] = n * c + o * h + l, e
}

function a1(e, t) {
  var r = Math.sin(t),
    i = Math.cos(t);
  return e[0] = i, e[1] = r, e[2] = -r, e[3] = i, e[4] = 0, e[5] = 0, e
}

function l1(e, t) {
  return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = t[1], e[4] = 0, e[5] = 0, e
}

function c1(e, t) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = t[0], e[5] = t[1], e
}

function h1(e) {
  return "mat2d(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ")"
}

function f1(e) {
  return Math.hypot(e[0], e[1], e[2], e[3], e[4], e[5], 1)
}

function u1(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e[4] = t[4] + r[4], e[5] = t[5] + r[5], e
}

function ph(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e[4] = t[4] - r[4], e[5] = t[5] - r[5], e
}

function d1(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * r, e[5] = t[5] * r, e
}

function v1(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e[4] = t[4] + r[4] * i, e[5] = t[5] + r[5] * i, e
}

function p1(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5]
}

function m1(e, t) {
  var r = e[0],
    i = e[1],
    n = e[2],
    s = e[3],
    o = e[4],
    a = e[5],
    l = t[0],
    c = t[1],
    h = t[2],
    f = t[3],
    u = t[4],
    d = t[5];
  return Math.abs(r - l) <= W * Math.max(1, Math.abs(r), Math.abs(l)) && Math.abs(i - c) <= W * Math.max(1, Math.abs(i), Math.abs(c)) && Math.abs(n - h) <= W * Math.max(1, Math.abs(n), Math.abs(h)) && Math.abs(s - f) <= W * Math.max(1, Math.abs(s), Math.abs(f)) && Math.abs(o - u) <= W * Math.max(1, Math.abs(o), Math.abs(u)) && Math.abs(a - d) <= W * Math.max(1, Math.abs(a), Math.abs(d))
}
var _1 = vh,
  y1 = ph;
const g1 = Object.freeze(Object.defineProperty({
  __proto__: null,
  add: u1,
  clone: Zm,
  copy: Qm,
  create: Km,
  determinant: i1,
  equals: m1,
  exactEquals: p1,
  frob: f1,
  fromRotation: a1,
  fromScaling: l1,
  fromTranslation: c1,
  fromValues: e1,
  identity: Jm,
  invert: r1,
  mul: _1,
  multiply: vh,
  multiplyScalar: d1,
  multiplyScalarAndAdd: v1,
  rotate: n1,
  scale: s1,
  set: t1,
  str: h1,
  sub: y1,
  subtract: ph,
  translate: o1
}, Symbol.toStringTag, {
  value: "Module"
}));

function mh() {
  var e = new oe(9);
  return oe != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[5] = 0, e[6] = 0, e[7] = 0), e[0] = 1, e[4] = 1, e[8] = 1, e
}

function w1(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[4], e[4] = t[5], e[5] = t[6], e[6] = t[8], e[7] = t[9], e[8] = t[10], e
}

function x1(e) {
  var t = new oe(9);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t
}

function b1(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e
}

function M1(e, t, r, i, n, s, o, a, l) {
  var c = new oe(9);
  return c[0] = e, c[1] = t, c[2] = r, c[3] = i, c[4] = n, c[5] = s, c[6] = o, c[7] = a, c[8] = l, c
}

function E1(e, t, r, i, n, s, o, a, l, c) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e[4] = s, e[5] = o, e[6] = a, e[7] = l, e[8] = c, e
}

function T1(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 1, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e
}

function S1(e, t) {
  if (e === t) {
    var r = t[1],
      i = t[2],
      n = t[5];
    e[1] = t[3], e[2] = t[6], e[3] = r, e[5] = t[7], e[6] = i, e[7] = n
  } else e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8];
  return e
}

function P1(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    o = t[4],
    a = t[5],
    l = t[6],
    c = t[7],
    h = t[8],
    f = h * o - a * c,
    u = -h * s + a * l,
    d = c * s - o * l,
    p = r * f + i * u + n * d;
  return p ? (p = 1 / p, e[0] = f * p, e[1] = (-h * i + n * c) * p, e[2] = (a * i - n * o) * p, e[3] = u * p, e[4] = (h * r - n * l) * p, e[5] = (-a * r + n * s) * p, e[6] = d * p, e[7] = (-c * r + i * l) * p, e[8] = (o * r - i * s) * p, e) : null
}

function C1(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    o = t[4],
    a = t[5],
    l = t[6],
    c = t[7],
    h = t[8];
  return e[0] = o * h - a * c, e[1] = n * c - i * h, e[2] = i * a - n * o, e[3] = a * l - s * h, e[4] = r * h - n * l, e[5] = n * s - r * a, e[6] = s * c - o * l, e[7] = i * l - r * c, e[8] = r * o - i * s, e
}

function A1(e) {
  var t = e[0],
    r = e[1],
    i = e[2],
    n = e[3],
    s = e[4],
    o = e[5],
    a = e[6],
    l = e[7],
    c = e[8];
  return t * (c * s - o * l) + r * (-c * n + o * a) + i * (l * n - s * a)
}

function _h(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3],
    a = t[4],
    l = t[5],
    c = t[6],
    h = t[7],
    f = t[8],
    u = r[0],
    d = r[1],
    p = r[2],
    g = r[3],
    _ = r[4],
    b = r[5],
    S = r[6],
    R = r[7],
    P = r[8];
  return e[0] = u * i + d * o + p * c, e[1] = u * n + d * a + p * h, e[2] = u * s + d * l + p * f, e[3] = g * i + _ * o + b * c, e[4] = g * n + _ * a + b * h, e[5] = g * s + _ * l + b * f, e[6] = S * i + R * o + P * c, e[7] = S * n + R * a + P * h, e[8] = S * s + R * l + P * f, e
}

function R1(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3],
    a = t[4],
    l = t[5],
    c = t[6],
    h = t[7],
    f = t[8],
    u = r[0],
    d = r[1];
  return e[0] = i, e[1] = n, e[2] = s, e[3] = o, e[4] = a, e[5] = l, e[6] = u * i + d * o + c, e[7] = u * n + d * a + h, e[8] = u * s + d * l + f, e
}

function z1(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3],
    a = t[4],
    l = t[5],
    c = t[6],
    h = t[7],
    f = t[8],
    u = Math.sin(r),
    d = Math.cos(r);
  return e[0] = d * i + u * o, e[1] = d * n + u * a, e[2] = d * s + u * l, e[3] = d * o - u * i, e[4] = d * a - u * n, e[5] = d * l - u * s, e[6] = c, e[7] = h, e[8] = f, e
}

function L1(e, t, r) {
  var i = r[0],
    n = r[1];
  return e[0] = i * t[0], e[1] = i * t[1], e[2] = i * t[2], e[3] = n * t[3], e[4] = n * t[4], e[5] = n * t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e
}

function $1(e, t) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 1, e[5] = 0, e[6] = t[0], e[7] = t[1], e[8] = 1, e
}

function O1(e, t) {
  var r = Math.sin(t),
    i = Math.cos(t);
  return e[0] = i, e[1] = r, e[2] = 0, e[3] = -r, e[4] = i, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e
}

function I1(e, t) {
  return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = 0, e[4] = t[1], e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e
}

function F1(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = 0, e[3] = t[2], e[4] = t[3], e[5] = 0, e[6] = t[4], e[7] = t[5], e[8] = 1, e
}

function H1(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    o = r + r,
    a = i + i,
    l = n + n,
    c = r * o,
    h = i * o,
    f = i * a,
    u = n * o,
    d = n * a,
    p = n * l,
    g = s * o,
    _ = s * a,
    b = s * l;
  return e[0] = 1 - f - p, e[3] = h - b, e[6] = u + _, e[1] = h + b, e[4] = 1 - c - p, e[7] = d - g, e[2] = u - _, e[5] = d + g, e[8] = 1 - c - f, e
}

function k1(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    o = t[4],
    a = t[5],
    l = t[6],
    c = t[7],
    h = t[8],
    f = t[9],
    u = t[10],
    d = t[11],
    p = t[12],
    g = t[13],
    _ = t[14],
    b = t[15],
    S = r * a - i * o,
    R = r * l - n * o,
    P = r * c - s * o,
    H = i * l - n * a,
    O = i * c - s * a,
    Y = n * c - s * l,
    Q = h * g - f * p,
    ee = h * _ - u * p,
    J = h * b - d * p,
    U = f * _ - u * g,
    se = f * b - d * g,
    ae = u * b - d * _,
    K = S * ae - R * se + P * U + H * J - O * ee + Y * Q;
  return K ? (K = 1 / K, e[0] = (a * ae - l * se + c * U) * K, e[1] = (l * J - o * ae - c * ee) * K, e[2] = (o * se - a * J + c * Q) * K, e[3] = (n * se - i * ae - s * U) * K, e[4] = (r * ae - n * J + s * ee) * K, e[5] = (i * J - r * se - s * Q) * K, e[6] = (g * Y - _ * O + b * H) * K, e[7] = (_ * P - p * Y - b * R) * K, e[8] = (p * O - g * P + b * S) * K, e) : null
}

function N1(e, t, r) {
  return e[0] = 2 / t, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = -2 / r, e[5] = 0, e[6] = -1, e[7] = 1, e[8] = 1, e
}

function D1(e) {
  return "mat3(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ")"
}

function B1(e) {
  return Math.hypot(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8])
}

function V1(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e[4] = t[4] + r[4], e[5] = t[5] + r[5], e[6] = t[6] + r[6], e[7] = t[7] + r[7], e[8] = t[8] + r[8], e
}

function yh(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e[4] = t[4] - r[4], e[5] = t[5] - r[5], e[6] = t[6] - r[6], e[7] = t[7] - r[7], e[8] = t[8] - r[8], e
}

function q1(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * r, e[5] = t[5] * r, e[6] = t[6] * r, e[7] = t[7] * r, e[8] = t[8] * r, e
}

function W1(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e[4] = t[4] + r[4] * i, e[5] = t[5] + r[5] * i, e[6] = t[6] + r[6] * i, e[7] = t[7] + r[7] * i, e[8] = t[8] + r[8] * i, e
}

function j1(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8]
}

function U1(e, t) {
  var r = e[0],
    i = e[1],
    n = e[2],
    s = e[3],
    o = e[4],
    a = e[5],
    l = e[6],
    c = e[7],
    h = e[8],
    f = t[0],
    u = t[1],
    d = t[2],
    p = t[3],
    g = t[4],
    _ = t[5],
    b = t[6],
    S = t[7],
    R = t[8];
  return Math.abs(r - f) <= W * Math.max(1, Math.abs(r), Math.abs(f)) && Math.abs(i - u) <= W * Math.max(1, Math.abs(i), Math.abs(u)) && Math.abs(n - d) <= W * Math.max(1, Math.abs(n), Math.abs(d)) && Math.abs(s - p) <= W * Math.max(1, Math.abs(s), Math.abs(p)) && Math.abs(o - g) <= W * Math.max(1, Math.abs(o), Math.abs(g)) && Math.abs(a - _) <= W * Math.max(1, Math.abs(a), Math.abs(_)) && Math.abs(l - b) <= W * Math.max(1, Math.abs(l), Math.abs(b)) && Math.abs(c - S) <= W * Math.max(1, Math.abs(c), Math.abs(S)) && Math.abs(h - R) <= W * Math.max(1, Math.abs(h), Math.abs(R))
}
var Y1 = _h,
  X1 = yh;
const G1 = Object.freeze(Object.defineProperty({
  __proto__: null,
  add: V1,
  adjoint: C1,
  clone: x1,
  copy: b1,
  create: mh,
  determinant: A1,
  equals: U1,
  exactEquals: j1,
  frob: B1,
  fromMat2d: F1,
  fromMat4: w1,
  fromQuat: H1,
  fromRotation: O1,
  fromScaling: I1,
  fromTranslation: $1,
  fromValues: M1,
  identity: T1,
  invert: P1,
  mul: Y1,
  multiply: _h,
  multiplyScalar: q1,
  multiplyScalarAndAdd: W1,
  normalFromMat4: k1,
  projection: N1,
  rotate: z1,
  scale: L1,
  set: E1,
  str: D1,
  sub: X1,
  subtract: yh,
  translate: R1,
  transpose: S1
}, Symbol.toStringTag, {
  value: "Module"
}));

function K1() {
  var e = new oe(16);
  return oe != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0), e[0] = 1, e[5] = 1, e[10] = 1, e[15] = 1, e
}

function Z1(e) {
  var t = new oe(16);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
}

function Q1(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
}

function J1(e, t, r, i, n, s, o, a, l, c, h, f, u, d, p, g) {
  var _ = new oe(16);
  return _[0] = e, _[1] = t, _[2] = r, _[3] = i, _[4] = n, _[5] = s, _[6] = o, _[7] = a, _[8] = l, _[9] = c, _[10] = h, _[11] = f, _[12] = u, _[13] = d, _[14] = p, _[15] = g, _
}

function e_(e, t, r, i, n, s, o, a, l, c, h, f, u, d, p, g, _) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e[4] = s, e[5] = o, e[6] = a, e[7] = l, e[8] = c, e[9] = h, e[10] = f, e[11] = u, e[12] = d, e[13] = p, e[14] = g, e[15] = _, e
}

function gh(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
}

function t_(e, t) {
  if (e === t) {
    var r = t[1],
      i = t[2],
      n = t[3],
      s = t[6],
      o = t[7],
      a = t[11];
    e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = r, e[6] = t[9], e[7] = t[13], e[8] = i, e[9] = s, e[11] = t[14], e[12] = n, e[13] = o, e[14] = a
  } else e[0] = t[0], e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = t[1], e[5] = t[5], e[6] = t[9], e[7] = t[13], e[8] = t[2], e[9] = t[6], e[10] = t[10], e[11] = t[14], e[12] = t[3], e[13] = t[7], e[14] = t[11], e[15] = t[15];
  return e
}

function r_(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    o = t[4],
    a = t[5],
    l = t[6],
    c = t[7],
    h = t[8],
    f = t[9],
    u = t[10],
    d = t[11],
    p = t[12],
    g = t[13],
    _ = t[14],
    b = t[15],
    S = r * a - i * o,
    R = r * l - n * o,
    P = r * c - s * o,
    H = i * l - n * a,
    O = i * c - s * a,
    Y = n * c - s * l,
    Q = h * g - f * p,
    ee = h * _ - u * p,
    J = h * b - d * p,
    U = f * _ - u * g,
    se = f * b - d * g,
    ae = u * b - d * _,
    K = S * ae - R * se + P * U + H * J - O * ee + Y * Q;
  return K ? (K = 1 / K, e[0] = (a * ae - l * se + c * U) * K, e[1] = (n * se - i * ae - s * U) * K, e[2] = (g * Y - _ * O + b * H) * K, e[3] = (u * O - f * Y - d * H) * K, e[4] = (l * J - o * ae - c * ee) * K, e[5] = (r * ae - n * J + s * ee) * K, e[6] = (_ * P - p * Y - b * R) * K, e[7] = (h * Y - u * P + d * R) * K, e[8] = (o * se - a * J + c * Q) * K, e[9] = (i * J - r * se - s * Q) * K, e[10] = (p * O - g * P + b * S) * K, e[11] = (f * P - h * O - d * S) * K, e[12] = (a * ee - o * U - l * Q) * K, e[13] = (r * U - i * ee + n * Q) * K, e[14] = (g * R - p * H - _ * S) * K, e[15] = (h * H - f * R + u * S) * K, e) : null
}

function i_(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    o = t[4],
    a = t[5],
    l = t[6],
    c = t[7],
    h = t[8],
    f = t[9],
    u = t[10],
    d = t[11],
    p = t[12],
    g = t[13],
    _ = t[14],
    b = t[15];
  return e[0] = a * (u * b - d * _) - f * (l * b - c * _) + g * (l * d - c * u), e[1] = -(i * (u * b - d * _) - f * (n * b - s * _) + g * (n * d - s * u)), e[2] = i * (l * b - c * _) - a * (n * b - s * _) + g * (n * c - s * l), e[3] = -(i * (l * d - c * u) - a * (n * d - s * u) + f * (n * c - s * l)), e[4] = -(o * (u * b - d * _) - h * (l * b - c * _) + p * (l * d - c * u)), e[5] = r * (u * b - d * _) - h * (n * b - s * _) + p * (n * d - s * u), e[6] = -(r * (l * b - c * _) - o * (n * b - s * _) + p * (n * c - s * l)), e[7] = r * (l * d - c * u) - o * (n * d - s * u) + h * (n * c - s * l), e[8] = o * (f * b - d * g) - h * (a * b - c * g) + p * (a * d - c * f), e[9] = -(r * (f * b - d * g) - h * (i * b - s * g) + p * (i * d - s * f)), e[10] = r * (a * b - c * g) - o * (i * b - s * g) + p * (i * c - s * a), e[11] = -(r * (a * d - c * f) - o * (i * d - s * f) + h * (i * c - s * a)), e[12] = -(o * (f * _ - u * g) - h * (a * _ - l * g) + p * (a * u - l * f)), e[13] = r * (f * _ - u * g) - h * (i * _ - n * g) + p * (i * u - n * f), e[14] = -(r * (a * _ - l * g) - o * (i * _ - n * g) + p * (i * l - n * a)), e[15] = r * (a * u - l * f) - o * (i * u - n * f) + h * (i * l - n * a), e
}

function n_(e) {
  var t = e[0],
    r = e[1],
    i = e[2],
    n = e[3],
    s = e[4],
    o = e[5],
    a = e[6],
    l = e[7],
    c = e[8],
    h = e[9],
    f = e[10],
    u = e[11],
    d = e[12],
    p = e[13],
    g = e[14],
    _ = e[15],
    b = t * o - r * s,
    S = t * a - i * s,
    R = t * l - n * s,
    P = r * a - i * o,
    H = r * l - n * o,
    O = i * l - n * a,
    Y = c * p - h * d,
    Q = c * g - f * d,
    ee = c * _ - u * d,
    J = h * g - f * p,
    U = h * _ - u * p,
    se = f * _ - u * g;
  return b * se - S * U + R * J + P * ee - H * Q + O * Y
}

function wh(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3],
    a = t[4],
    l = t[5],
    c = t[6],
    h = t[7],
    f = t[8],
    u = t[9],
    d = t[10],
    p = t[11],
    g = t[12],
    _ = t[13],
    b = t[14],
    S = t[15],
    R = r[0],
    P = r[1],
    H = r[2],
    O = r[3];
  return e[0] = R * i + P * a + H * f + O * g, e[1] = R * n + P * l + H * u + O * _, e[2] = R * s + P * c + H * d + O * b, e[3] = R * o + P * h + H * p + O * S, R = r[4], P = r[5], H = r[6], O = r[7], e[4] = R * i + P * a + H * f + O * g, e[5] = R * n + P * l + H * u + O * _, e[6] = R * s + P * c + H * d + O * b, e[7] = R * o + P * h + H * p + O * S, R = r[8], P = r[9], H = r[10], O = r[11], e[8] = R * i + P * a + H * f + O * g, e[9] = R * n + P * l + H * u + O * _, e[10] = R * s + P * c + H * d + O * b, e[11] = R * o + P * h + H * p + O * S, R = r[12], P = r[13], H = r[14], O = r[15], e[12] = R * i + P * a + H * f + O * g, e[13] = R * n + P * l + H * u + O * _, e[14] = R * s + P * c + H * d + O * b, e[15] = R * o + P * h + H * p + O * S, e
}

function s_(e, t, r) {
  var i = r[0],
    n = r[1],
    s = r[2],
    o, a, l, c, h, f, u, d, p, g, _, b;
  return t === e ? (e[12] = t[0] * i + t[4] * n + t[8] * s + t[12], e[13] = t[1] * i + t[5] * n + t[9] * s + t[13], e[14] = t[2] * i + t[6] * n + t[10] * s + t[14], e[15] = t[3] * i + t[7] * n + t[11] * s + t[15]) : (o = t[0], a = t[1], l = t[2], c = t[3], h = t[4], f = t[5], u = t[6], d = t[7], p = t[8], g = t[9], _ = t[10], b = t[11], e[0] = o, e[1] = a, e[2] = l, e[3] = c, e[4] = h, e[5] = f, e[6] = u, e[7] = d, e[8] = p, e[9] = g, e[10] = _, e[11] = b, e[12] = o * i + h * n + p * s + t[12], e[13] = a * i + f * n + g * s + t[13], e[14] = l * i + u * n + _ * s + t[14], e[15] = c * i + d * n + b * s + t[15]), e
}

function o_(e, t, r) {
  var i = r[0],
    n = r[1],
    s = r[2];
  return e[0] = t[0] * i, e[1] = t[1] * i, e[2] = t[2] * i, e[3] = t[3] * i, e[4] = t[4] * n, e[5] = t[5] * n, e[6] = t[6] * n, e[7] = t[7] * n, e[8] = t[8] * s, e[9] = t[9] * s, e[10] = t[10] * s, e[11] = t[11] * s, e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
}

function a_(e, t, r, i) {
  var n = i[0],
    s = i[1],
    o = i[2],
    a = Math.hypot(n, s, o),
    l, c, h, f, u, d, p, g, _, b, S, R, P, H, O, Y, Q, ee, J, U, se, ae, K, E;
  return a < W ? null : (a = 1 / a, n *= a, s *= a, o *= a, l = Math.sin(r), c = Math.cos(r), h = 1 - c, f = t[0], u = t[1], d = t[2], p = t[3], g = t[4], _ = t[5], b = t[6], S = t[7], R = t[8], P = t[9], H = t[10], O = t[11], Y = n * n * h + c, Q = s * n * h + o * l, ee = o * n * h - s * l, J = n * s * h - o * l, U = s * s * h + c, se = o * s * h + n * l, ae = n * o * h + s * l, K = s * o * h - n * l, E = o * o * h + c, e[0] = f * Y + g * Q + R * ee, e[1] = u * Y + _ * Q + P * ee, e[2] = d * Y + b * Q + H * ee, e[3] = p * Y + S * Q + O * ee, e[4] = f * J + g * U + R * se, e[5] = u * J + _ * U + P * se, e[6] = d * J + b * U + H * se, e[7] = p * J + S * U + O * se, e[8] = f * ae + g * K + R * E, e[9] = u * ae + _ * K + P * E, e[10] = d * ae + b * K + H * E, e[11] = p * ae + S * K + O * E, t !== e && (e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e)
}

function l_(e, t, r) {
  var i = Math.sin(r),
    n = Math.cos(r),
    s = t[4],
    o = t[5],
    a = t[6],
    l = t[7],
    c = t[8],
    h = t[9],
    f = t[10],
    u = t[11];
  return t !== e && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[4] = s * n + c * i, e[5] = o * n + h * i, e[6] = a * n + f * i, e[7] = l * n + u * i, e[8] = c * n - s * i, e[9] = h * n - o * i, e[10] = f * n - a * i, e[11] = u * n - l * i, e
}

function c_(e, t, r) {
  var i = Math.sin(r),
    n = Math.cos(r),
    s = t[0],
    o = t[1],
    a = t[2],
    l = t[3],
    c = t[8],
    h = t[9],
    f = t[10],
    u = t[11];
  return t !== e && (e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = s * n - c * i, e[1] = o * n - h * i, e[2] = a * n - f * i, e[3] = l * n - u * i, e[8] = s * i + c * n, e[9] = o * i + h * n, e[10] = a * i + f * n, e[11] = l * i + u * n, e
}

function h_(e, t, r) {
  var i = Math.sin(r),
    n = Math.cos(r),
    s = t[0],
    o = t[1],
    a = t[2],
    l = t[3],
    c = t[4],
    h = t[5],
    f = t[6],
    u = t[7];
  return t !== e && (e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = s * n + c * i, e[1] = o * n + h * i, e[2] = a * n + f * i, e[3] = l * n + u * i, e[4] = c * n - s * i, e[5] = h * n - o * i, e[6] = f * n - a * i, e[7] = u * n - l * i, e
}

function f_(e, t) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = t[0], e[13] = t[1], e[14] = t[2], e[15] = 1, e
}

function u_(e, t) {
  return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = t[1], e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = t[2], e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
}

function d_(e, t, r) {
  var i = r[0],
    n = r[1],
    s = r[2],
    o = Math.hypot(i, n, s),
    a, l, c;
  return o < W ? null : (o = 1 / o, i *= o, n *= o, s *= o, a = Math.sin(t), l = Math.cos(t), c = 1 - l, e[0] = i * i * c + l, e[1] = n * i * c + s * a, e[2] = s * i * c - n * a, e[3] = 0, e[4] = i * n * c - s * a, e[5] = n * n * c + l, e[6] = s * n * c + i * a, e[7] = 0, e[8] = i * s * c + n * a, e[9] = n * s * c - i * a, e[10] = s * s * c + l, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e)
}

function v_(e, t) {
  var r = Math.sin(t),
    i = Math.cos(t);
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = i, e[6] = r, e[7] = 0, e[8] = 0, e[9] = -r, e[10] = i, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
}

function p_(e, t) {
  var r = Math.sin(t),
    i = Math.cos(t);
  return e[0] = i, e[1] = 0, e[2] = -r, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = r, e[9] = 0, e[10] = i, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
}

function m_(e, t) {
  var r = Math.sin(t),
    i = Math.cos(t);
  return e[0] = i, e[1] = r, e[2] = 0, e[3] = 0, e[4] = -r, e[5] = i, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
}

function xh(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3],
    a = i + i,
    l = n + n,
    c = s + s,
    h = i * a,
    f = i * l,
    u = i * c,
    d = n * l,
    p = n * c,
    g = s * c,
    _ = o * a,
    b = o * l,
    S = o * c;
  return e[0] = 1 - (d + g), e[1] = f + S, e[2] = u - b, e[3] = 0, e[4] = f - S, e[5] = 1 - (h + g), e[6] = p + _, e[7] = 0, e[8] = u + b, e[9] = p - _, e[10] = 1 - (h + d), e[11] = 0, e[12] = r[0], e[13] = r[1], e[14] = r[2], e[15] = 1, e
}

function __(e, t) {
  var r = new oe(3),
    i = -t[0],
    n = -t[1],
    s = -t[2],
    o = t[3],
    a = t[4],
    l = t[5],
    c = t[6],
    h = t[7],
    f = i * i + n * n + s * s + o * o;
  return f > 0 ? (r[0] = (a * o + h * i + l * s - c * n) * 2 / f, r[1] = (l * o + h * n + c * i - a * s) * 2 / f, r[2] = (c * o + h * s + a * n - l * i) * 2 / f) : (r[0] = (a * o + h * i + l * s - c * n) * 2, r[1] = (l * o + h * n + c * i - a * s) * 2, r[2] = (c * o + h * s + a * n - l * i) * 2), xh(e, t, r), e
}

function bh(e, t) {
  return e[0] = t[12], e[1] = t[13], e[2] = t[14], e
}

function Mh(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[4],
    o = t[5],
    a = t[6],
    l = t[8],
    c = t[9],
    h = t[10];
  return e[0] = Math.hypot(r, i, n), e[1] = Math.hypot(s, o, a), e[2] = Math.hypot(l, c, h), e
}

function Eh(e, t) {
  var r = new oe(3);
  Mh(r, t);
  var i = 1 / r[0],
    n = 1 / r[1],
    s = 1 / r[2],
    o = t[0] * i,
    a = t[1] * n,
    l = t[2] * s,
    c = t[4] * i,
    h = t[5] * n,
    f = t[6] * s,
    u = t[8] * i,
    d = t[9] * n,
    p = t[10] * s,
    g = o + h + p,
    _ = 0;
  return g > 0 ? (_ = Math.sqrt(g + 1) * 2, e[3] = .25 * _, e[0] = (f - d) / _, e[1] = (u - l) / _, e[2] = (a - c) / _) : o > h && o > p ? (_ = Math.sqrt(1 + o - h - p) * 2, e[3] = (f - d) / _, e[0] = .25 * _, e[1] = (a + c) / _, e[2] = (u + l) / _) : h > p ? (_ = Math.sqrt(1 + h - o - p) * 2, e[3] = (u - l) / _, e[0] = (a + c) / _, e[1] = .25 * _, e[2] = (f + d) / _) : (_ = Math.sqrt(1 + p - o - h) * 2, e[3] = (a - c) / _, e[0] = (u + l) / _, e[1] = (f + d) / _, e[2] = .25 * _), e
}

function y_(e, t, r, i) {
  var n = t[0],
    s = t[1],
    o = t[2],
    a = t[3],
    l = n + n,
    c = s + s,
    h = o + o,
    f = n * l,
    u = n * c,
    d = n * h,
    p = s * c,
    g = s * h,
    _ = o * h,
    b = a * l,
    S = a * c,
    R = a * h,
    P = i[0],
    H = i[1],
    O = i[2];
  return e[0] = (1 - (p + _)) * P, e[1] = (u + R) * P, e[2] = (d - S) * P, e[3] = 0, e[4] = (u - R) * H, e[5] = (1 - (f + _)) * H, e[6] = (g + b) * H, e[7] = 0, e[8] = (d + S) * O, e[9] = (g - b) * O, e[10] = (1 - (f + p)) * O, e[11] = 0, e[12] = r[0], e[13] = r[1], e[14] = r[2], e[15] = 1, e
}

function g_(e, t, r, i, n) {
  var s = t[0],
    o = t[1],
    a = t[2],
    l = t[3],
    c = s + s,
    h = o + o,
    f = a + a,
    u = s * c,
    d = s * h,
    p = s * f,
    g = o * h,
    _ = o * f,
    b = a * f,
    S = l * c,
    R = l * h,
    P = l * f,
    H = i[0],
    O = i[1],
    Y = i[2],
    Q = n[0],
    ee = n[1],
    J = n[2],
    U = (1 - (g + b)) * H,
    se = (d + P) * H,
    ae = (p - R) * H,
    K = (d - P) * O,
    E = (1 - (u + b)) * O,
    be = (_ + S) * O,
    Z = (p + R) * Y,
    he = (_ - S) * Y,
    Ie = (1 - (u + g)) * Y;
  return e[0] = U, e[1] = se, e[2] = ae, e[3] = 0, e[4] = K, e[5] = E, e[6] = be, e[7] = 0, e[8] = Z, e[9] = he, e[10] = Ie, e[11] = 0, e[12] = r[0] + Q - (U * Q + K * ee + Z * J), e[13] = r[1] + ee - (se * Q + E * ee + he * J), e[14] = r[2] + J - (ae * Q + be * ee + Ie * J), e[15] = 1, e
}

function w_(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    o = r + r,
    a = i + i,
    l = n + n,
    c = r * o,
    h = i * o,
    f = i * a,
    u = n * o,
    d = n * a,
    p = n * l,
    g = s * o,
    _ = s * a,
    b = s * l;
  return e[0] = 1 - f - p, e[1] = h + b, e[2] = u - _, e[3] = 0, e[4] = h - b, e[5] = 1 - c - p, e[6] = d + g, e[7] = 0, e[8] = u + _, e[9] = d - g, e[10] = 1 - c - f, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
}

function x_(e, t, r, i, n, s, o) {
  var a = 1 / (r - t),
    l = 1 / (n - i),
    c = 1 / (s - o);
  return e[0] = s * 2 * a, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = s * 2 * l, e[6] = 0, e[7] = 0, e[8] = (r + t) * a, e[9] = (n + i) * l, e[10] = (o + s) * c, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = o * s * 2 * c, e[15] = 0, e
}

function b_(e, t, r, i, n) {
  var s = 1 / Math.tan(t / 2),
    o;
  return e[0] = s / r, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = s, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = -1, e[12] = 0, e[13] = 0, e[15] = 0, n != null && n !== 1 / 0 ? (o = 1 / (i - n), e[10] = (n + i) * o, e[14] = 2 * n * i * o) : (e[10] = -1, e[14] = -2 * i), e
}

function M_(e, t, r, i) {
  var n = Math.tan(t.upDegrees * Math.PI / 180),
    s = Math.tan(t.downDegrees * Math.PI / 180),
    o = Math.tan(t.leftDegrees * Math.PI / 180),
    a = Math.tan(t.rightDegrees * Math.PI / 180),
    l = 2 / (o + a),
    c = 2 / (n + s);
  return e[0] = l, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = c, e[6] = 0, e[7] = 0, e[8] = -((o - a) * l * .5), e[9] = (n - s) * c * .5, e[10] = i / (r - i), e[11] = -1, e[12] = 0, e[13] = 0, e[14] = i * r / (r - i), e[15] = 0, e
}

function E_(e, t, r, i, n, s, o) {
  var a = 1 / (t - r),
    l = 1 / (i - n),
    c = 1 / (s - o);
  return e[0] = -2 * a, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = -2 * l, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 2 * c, e[11] = 0, e[12] = (t + r) * a, e[13] = (n + i) * l, e[14] = (o + s) * c, e[15] = 1, e
}

function T_(e, t, r, i) {
  var n, s, o, a, l, c, h, f, u, d, p = t[0],
    g = t[1],
    _ = t[2],
    b = i[0],
    S = i[1],
    R = i[2],
    P = r[0],
    H = r[1],
    O = r[2];
  return Math.abs(p - P) < W && Math.abs(g - H) < W && Math.abs(_ - O) < W ? gh(e) : (h = p - P, f = g - H, u = _ - O, d = 1 / Math.hypot(h, f, u), h *= d, f *= d, u *= d, n = S * u - R * f, s = R * h - b * u, o = b * f - S * h, d = Math.hypot(n, s, o), d ? (d = 1 / d, n *= d, s *= d, o *= d) : (n = 0, s = 0, o = 0), a = f * o - u * s, l = u * n - h * o, c = h * s - f * n, d = Math.hypot(a, l, c), d ? (d = 1 / d, a *= d, l *= d, c *= d) : (a = 0, l = 0, c = 0), e[0] = n, e[1] = a, e[2] = h, e[3] = 0, e[4] = s, e[5] = l, e[6] = f, e[7] = 0, e[8] = o, e[9] = c, e[10] = u, e[11] = 0, e[12] = -(n * p + s * g + o * _), e[13] = -(a * p + l * g + c * _), e[14] = -(h * p + f * g + u * _), e[15] = 1, e)
}

function S_(e, t, r, i) {
  var n = t[0],
    s = t[1],
    o = t[2],
    a = i[0],
    l = i[1],
    c = i[2],
    h = n - r[0],
    f = s - r[1],
    u = o - r[2],
    d = h * h + f * f + u * u;
  d > 0 && (d = 1 / Math.sqrt(d), h *= d, f *= d, u *= d);
  var p = l * u - c * f,
    g = c * h - a * u,
    _ = a * f - l * h;
  return d = p * p + g * g + _ * _, d > 0 && (d = 1 / Math.sqrt(d), p *= d, g *= d, _ *= d), e[0] = p, e[1] = g, e[2] = _, e[3] = 0, e[4] = f * _ - u * g, e[5] = u * p - h * _, e[6] = h * g - f * p, e[7] = 0, e[8] = h, e[9] = f, e[10] = u, e[11] = 0, e[12] = n, e[13] = s, e[14] = o, e[15] = 1, e
}

function P_(e) {
  return "mat4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ", " + e[9] + ", " + e[10] + ", " + e[11] + ", " + e[12] + ", " + e[13] + ", " + e[14] + ", " + e[15] + ")"
}

function C_(e) {
  return Math.hypot(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15])
}

function A_(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e[4] = t[4] + r[4], e[5] = t[5] + r[5], e[6] = t[6] + r[6], e[7] = t[7] + r[7], e[8] = t[8] + r[8], e[9] = t[9] + r[9], e[10] = t[10] + r[10], e[11] = t[11] + r[11], e[12] = t[12] + r[12], e[13] = t[13] + r[13], e[14] = t[14] + r[14], e[15] = t[15] + r[15], e
}

function Th(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e[4] = t[4] - r[4], e[5] = t[5] - r[5], e[6] = t[6] - r[6], e[7] = t[7] - r[7], e[8] = t[8] - r[8], e[9] = t[9] - r[9], e[10] = t[10] - r[10], e[11] = t[11] - r[11], e[12] = t[12] - r[12], e[13] = t[13] - r[13], e[14] = t[14] - r[14], e[15] = t[15] - r[15], e
}

function R_(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * r, e[5] = t[5] * r, e[6] = t[6] * r, e[7] = t[7] * r, e[8] = t[8] * r, e[9] = t[9] * r, e[10] = t[10] * r, e[11] = t[11] * r, e[12] = t[12] * r, e[13] = t[13] * r, e[14] = t[14] * r, e[15] = t[15] * r, e
}

function z_(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e[4] = t[4] + r[4] * i, e[5] = t[5] + r[5] * i, e[6] = t[6] + r[6] * i, e[7] = t[7] + r[7] * i, e[8] = t[8] + r[8] * i, e[9] = t[9] + r[9] * i, e[10] = t[10] + r[10] * i, e[11] = t[11] + r[11] * i, e[12] = t[12] + r[12] * i, e[13] = t[13] + r[13] * i, e[14] = t[14] + r[14] * i, e[15] = t[15] + r[15] * i, e
}

function L_(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8] && e[9] === t[9] && e[10] === t[10] && e[11] === t[11] && e[12] === t[12] && e[13] === t[13] && e[14] === t[14] && e[15] === t[15]
}

function $_(e, t) {
  var r = e[0],
    i = e[1],
    n = e[2],
    s = e[3],
    o = e[4],
    a = e[5],
    l = e[6],
    c = e[7],
    h = e[8],
    f = e[9],
    u = e[10],
    d = e[11],
    p = e[12],
    g = e[13],
    _ = e[14],
    b = e[15],
    S = t[0],
    R = t[1],
    P = t[2],
    H = t[3],
    O = t[4],
    Y = t[5],
    Q = t[6],
    ee = t[7],
    J = t[8],
    U = t[9],
    se = t[10],
    ae = t[11],
    K = t[12],
    E = t[13],
    be = t[14],
    Z = t[15];
  return Math.abs(r - S) <= W * Math.max(1, Math.abs(r), Math.abs(S)) && Math.abs(i - R) <= W * Math.max(1, Math.abs(i), Math.abs(R)) && Math.abs(n - P) <= W * Math.max(1, Math.abs(n), Math.abs(P)) && Math.abs(s - H) <= W * Math.max(1, Math.abs(s), Math.abs(H)) && Math.abs(o - O) <= W * Math.max(1, Math.abs(o), Math.abs(O)) && Math.abs(a - Y) <= W * Math.max(1, Math.abs(a), Math.abs(Y)) && Math.abs(l - Q) <= W * Math.max(1, Math.abs(l), Math.abs(Q)) && Math.abs(c - ee) <= W * Math.max(1, Math.abs(c), Math.abs(ee)) && Math.abs(h - J) <= W * Math.max(1, Math.abs(h), Math.abs(J)) && Math.abs(f - U) <= W * Math.max(1, Math.abs(f), Math.abs(U)) && Math.abs(u - se) <= W * Math.max(1, Math.abs(u), Math.abs(se)) && Math.abs(d - ae) <= W * Math.max(1, Math.abs(d), Math.abs(ae)) && Math.abs(p - K) <= W * Math.max(1, Math.abs(p), Math.abs(K)) && Math.abs(g - E) <= W * Math.max(1, Math.abs(g), Math.abs(E)) && Math.abs(_ - be) <= W * Math.max(1, Math.abs(_), Math.abs(be)) && Math.abs(b - Z) <= W * Math.max(1, Math.abs(b), Math.abs(Z))
}
var O_ = wh,
  I_ = Th;
const F_ = Object.freeze(Object.defineProperty({
  __proto__: null,
  add: A_,
  adjoint: i_,
  clone: Z1,
  copy: Q1,
  create: K1,
  determinant: n_,
  equals: $_,
  exactEquals: L_,
  frob: C_,
  fromQuat: w_,
  fromQuat2: __,
  fromRotation: d_,
  fromRotationTranslation: xh,
  fromRotationTranslationScale: y_,
  fromRotationTranslationScaleOrigin: g_,
  fromScaling: u_,
  fromTranslation: f_,
  fromValues: J1,
  fromXRotation: v_,
  fromYRotation: p_,
  fromZRotation: m_,
  frustum: x_,
  getRotation: Eh,
  getScaling: Mh,
  getTranslation: bh,
  identity: gh,
  invert: r_,
  lookAt: T_,
  mul: O_,
  multiply: wh,
  multiplyScalar: R_,
  multiplyScalarAndAdd: z_,
  ortho: E_,
  perspective: b_,
  perspectiveFromFieldOfView: M_,
  rotate: a_,
  rotateX: l_,
  rotateY: c_,
  rotateZ: h_,
  scale: o_,
  set: e_,
  str: P_,
  sub: I_,
  subtract: Th,
  targetTo: S_,
  translate: s_,
  transpose: t_
}, Symbol.toStringTag, {
  value: "Module"
}));

function Zo() {
  var e = new oe(3);
  return oe != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e
}

function H_(e) {
  var t = new oe(3);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t
}

function Sh(e) {
  var t = e[0],
    r = e[1],
    i = e[2];
  return Math.hypot(t, r, i)
}

function vo(e, t, r) {
  var i = new oe(3);
  return i[0] = e, i[1] = t, i[2] = r, i
}

function k_(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e
}

function N_(e, t, r, i) {
  return e[0] = t, e[1] = r, e[2] = i, e
}

function D_(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e
}

function Ph(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e
}

function Ch(e, t, r) {
  return e[0] = t[0] * r[0], e[1] = t[1] * r[1], e[2] = t[2] * r[2], e
}

function Ah(e, t, r) {
  return e[0] = t[0] / r[0], e[1] = t[1] / r[1], e[2] = t[2] / r[2], e
}

function B_(e, t) {
  return e[0] = Math.ceil(t[0]), e[1] = Math.ceil(t[1]), e[2] = Math.ceil(t[2]), e
}

function V_(e, t) {
  return e[0] = Math.floor(t[0]), e[1] = Math.floor(t[1]), e[2] = Math.floor(t[2]), e
}

function q_(e, t, r) {
  return e[0] = Math.min(t[0], r[0]), e[1] = Math.min(t[1], r[1]), e[2] = Math.min(t[2], r[2]), e
}

function W_(e, t, r) {
  return e[0] = Math.max(t[0], r[0]), e[1] = Math.max(t[1], r[1]), e[2] = Math.max(t[2], r[2]), e
}

function j_(e, t) {
  return e[0] = Math.round(t[0]), e[1] = Math.round(t[1]), e[2] = Math.round(t[2]), e
}

function U_(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e
}

function Y_(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e
}

function Rh(e, t) {
  var r = t[0] - e[0],
    i = t[1] - e[1],
    n = t[2] - e[2];
  return Math.hypot(r, i, n)
}

function zh(e, t) {
  var r = t[0] - e[0],
    i = t[1] - e[1],
    n = t[2] - e[2];
  return r * r + i * i + n * n
}

function Lh(e) {
  var t = e[0],
    r = e[1],
    i = e[2];
  return t * t + r * r + i * i
}

function X_(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e
}

function G_(e, t) {
  return e[0] = 1 / t[0], e[1] = 1 / t[1], e[2] = 1 / t[2], e
}

function $h(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = r * r + i * i + n * n;
  return s > 0 && (s = 1 / Math.sqrt(s)), e[0] = t[0] * s, e[1] = t[1] * s, e[2] = t[2] * s, e
}

function Qo(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
}

function Ln(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = r[0],
    a = r[1],
    l = r[2];
  return e[0] = n * l - s * a, e[1] = s * o - i * l, e[2] = i * a - n * o, e
}

function K_(e, t, r, i) {
  var n = t[0],
    s = t[1],
    o = t[2];
  return e[0] = n + i * (r[0] - n), e[1] = s + i * (r[1] - s), e[2] = o + i * (r[2] - o), e
}

function Z_(e, t, r, i, n, s) {
  var o = s * s,
    a = o * (2 * s - 3) + 1,
    l = o * (s - 2) + s,
    c = o * (s - 1),
    h = o * (3 - 2 * s);
  return e[0] = t[0] * a + r[0] * l + i[0] * c + n[0] * h, e[1] = t[1] * a + r[1] * l + i[1] * c + n[1] * h, e[2] = t[2] * a + r[2] * l + i[2] * c + n[2] * h, e
}

function Q_(e, t, r, i, n, s) {
  var o = 1 - s,
    a = o * o,
    l = s * s,
    c = a * o,
    h = 3 * s * a,
    f = 3 * l * o,
    u = l * s;
  return e[0] = t[0] * c + r[0] * h + i[0] * f + n[0] * u, e[1] = t[1] * c + r[1] * h + i[1] * f + n[1] * u, e[2] = t[2] * c + r[2] * h + i[2] * f + n[2] * u, e
}

function J_(e, t) {
  t = t || 1;
  var r = bt() * 2 * Math.PI,
    i = bt() * 2 - 1,
    n = Math.sqrt(1 - i * i) * t;
  return e[0] = Math.cos(r) * n, e[1] = Math.sin(r) * n, e[2] = i * t, e
}

function ey(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = r[3] * i + r[7] * n + r[11] * s + r[15];
  return o = o || 1, e[0] = (r[0] * i + r[4] * n + r[8] * s + r[12]) / o, e[1] = (r[1] * i + r[5] * n + r[9] * s + r[13]) / o, e[2] = (r[2] * i + r[6] * n + r[10] * s + r[14]) / o, e
}

function ty(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2];
  return e[0] = i * r[0] + n * r[3] + s * r[6], e[1] = i * r[1] + n * r[4] + s * r[7], e[2] = i * r[2] + n * r[5] + s * r[8], e
}

function ry(e, t, r) {
  var i = r[0],
    n = r[1],
    s = r[2],
    o = r[3],
    a = t[0],
    l = t[1],
    c = t[2],
    h = n * c - s * l,
    f = s * a - i * c,
    u = i * l - n * a,
    d = n * u - s * f,
    p = s * h - i * u,
    g = i * f - n * h,
    _ = o * 2;
  return h *= _, f *= _, u *= _, d *= 2, p *= 2, g *= 2, e[0] = a + h + d, e[1] = l + f + p, e[2] = c + u + g, e
}

function iy(e, t, r, i) {
  var n = [],
    s = [];
  return n[0] = t[0] - r[0], n[1] = t[1] - r[1], n[2] = t[2] - r[2], s[0] = n[0], s[1] = n[1] * Math.cos(i) - n[2] * Math.sin(i), s[2] = n[1] * Math.sin(i) + n[2] * Math.cos(i), e[0] = s[0] + r[0], e[1] = s[1] + r[1], e[2] = s[2] + r[2], e
}

function ny(e, t, r, i) {
  var n = [],
    s = [];
  return n[0] = t[0] - r[0], n[1] = t[1] - r[1], n[2] = t[2] - r[2], s[0] = n[2] * Math.sin(i) + n[0] * Math.cos(i), s[1] = n[1], s[2] = n[2] * Math.cos(i) - n[0] * Math.sin(i), e[0] = s[0] + r[0], e[1] = s[1] + r[1], e[2] = s[2] + r[2], e
}

function sy(e, t, r, i) {
  var n = [],
    s = [];
  return n[0] = t[0] - r[0], n[1] = t[1] - r[1], n[2] = t[2] - r[2], s[0] = n[0] * Math.cos(i) - n[1] * Math.sin(i), s[1] = n[0] * Math.sin(i) + n[1] * Math.cos(i), s[2] = n[2], e[0] = s[0] + r[0], e[1] = s[1] + r[1], e[2] = s[2] + r[2], e
}

function oy(e, t) {
  var r = e[0],
    i = e[1],
    n = e[2],
    s = t[0],
    o = t[1],
    a = t[2],
    l = Math.sqrt(r * r + i * i + n * n),
    c = Math.sqrt(s * s + o * o + a * a),
    h = l * c,
    f = h && Qo(e, t) / h;
  return Math.acos(Math.min(Math.max(f, -1), 1))
}

function ay(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e
}

function ly(e) {
  return "vec3(" + e[0] + ", " + e[1] + ", " + e[2] + ")"
}

function cy(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2]
}

function hy(e, t) {
  var r = e[0],
    i = e[1],
    n = e[2],
    s = t[0],
    o = t[1],
    a = t[2];
  return Math.abs(r - s) <= W * Math.max(1, Math.abs(r), Math.abs(s)) && Math.abs(i - o) <= W * Math.max(1, Math.abs(i), Math.abs(o)) && Math.abs(n - a) <= W * Math.max(1, Math.abs(n), Math.abs(a))
}
var fy = Ph,
  uy = Ch,
  dy = Ah,
  vy = Rh,
  py = zh,
  Oh = Sh,
  my = Lh,
  _y = function () {
    var e = Zo();
    return function (t, r, i, n, s, o) {
      var a, l;
      for (r || (r = 3), i || (i = 0), n ? l = Math.min(n * r + i, t.length) : l = t.length, a = i; a < l; a += r) e[0] = t[a], e[1] = t[a + 1], e[2] = t[a + 2], s(e, e, o), t[a] = e[0], t[a + 1] = e[1], t[a + 2] = e[2];
      return t
    }
  }();
const yy = Object.freeze(Object.defineProperty({
  __proto__: null,
  add: D_,
  angle: oy,
  bezier: Q_,
  ceil: B_,
  clone: H_,
  copy: k_,
  create: Zo,
  cross: Ln,
  dist: vy,
  distance: Rh,
  div: dy,
  divide: Ah,
  dot: Qo,
  equals: hy,
  exactEquals: cy,
  floor: V_,
  forEach: _y,
  fromValues: vo,
  hermite: Z_,
  inverse: G_,
  len: Oh,
  length: Sh,
  lerp: K_,
  max: W_,
  min: q_,
  mul: uy,
  multiply: Ch,
  negate: X_,
  normalize: $h,
  random: J_,
  rotateX: iy,
  rotateY: ny,
  rotateZ: sy,
  round: j_,
  scale: U_,
  scaleAndAdd: Y_,
  set: N_,
  sqrDist: py,
  sqrLen: my,
  squaredDistance: zh,
  squaredLength: Lh,
  str: ly,
  sub: fy,
  subtract: Ph,
  transformMat3: ty,
  transformMat4: ey,
  transformQuat: ry,
  zero: ay
}, Symbol.toStringTag, {
  value: "Module"
}));

function Ih() {
  var e = new oe(4);
  return oe != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0), e
}

function Fh(e) {
  var t = new oe(4);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
}

function Hh(e, t, r, i) {
  var n = new oe(4);
  return n[0] = e, n[1] = t, n[2] = r, n[3] = i, n
}

function kh(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e
}

function Nh(e, t, r, i, n) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e
}

function Dh(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e
}

function Bh(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e
}

function Vh(e, t, r) {
  return e[0] = t[0] * r[0], e[1] = t[1] * r[1], e[2] = t[2] * r[2], e[3] = t[3] * r[3], e
}

function qh(e, t, r) {
  return e[0] = t[0] / r[0], e[1] = t[1] / r[1], e[2] = t[2] / r[2], e[3] = t[3] / r[3], e
}

function gy(e, t) {
  return e[0] = Math.ceil(t[0]), e[1] = Math.ceil(t[1]), e[2] = Math.ceil(t[2]), e[3] = Math.ceil(t[3]), e
}

function wy(e, t) {
  return e[0] = Math.floor(t[0]), e[1] = Math.floor(t[1]), e[2] = Math.floor(t[2]), e[3] = Math.floor(t[3]), e
}

function xy(e, t, r) {
  return e[0] = Math.min(t[0], r[0]), e[1] = Math.min(t[1], r[1]), e[2] = Math.min(t[2], r[2]), e[3] = Math.min(t[3], r[3]), e
}

function by(e, t, r) {
  return e[0] = Math.max(t[0], r[0]), e[1] = Math.max(t[1], r[1]), e[2] = Math.max(t[2], r[2]), e[3] = Math.max(t[3], r[3]), e
}

function My(e, t) {
  return e[0] = Math.round(t[0]), e[1] = Math.round(t[1]), e[2] = Math.round(t[2]), e[3] = Math.round(t[3]), e
}

function Wh(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e
}

function Ey(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e
}

function jh(e, t) {
  var r = t[0] - e[0],
    i = t[1] - e[1],
    n = t[2] - e[2],
    s = t[3] - e[3];
  return Math.hypot(r, i, n, s)
}

function Uh(e, t) {
  var r = t[0] - e[0],
    i = t[1] - e[1],
    n = t[2] - e[2],
    s = t[3] - e[3];
  return r * r + i * i + n * n + s * s
}

function Jo(e) {
  var t = e[0],
    r = e[1],
    i = e[2],
    n = e[3];
  return Math.hypot(t, r, i, n)
}

function ea(e) {
  var t = e[0],
    r = e[1],
    i = e[2],
    n = e[3];
  return t * t + r * r + i * i + n * n
}

function Ty(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = -t[3], e
}

function Sy(e, t) {
  return e[0] = 1 / t[0], e[1] = 1 / t[1], e[2] = 1 / t[2], e[3] = 1 / t[3], e
}

function Yh(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    o = r * r + i * i + n * n + s * s;
  return o > 0 && (o = 1 / Math.sqrt(o)), e[0] = r * o, e[1] = i * o, e[2] = n * o, e[3] = s * o, e
}

function Xh(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3]
}

function Py(e, t, r, i) {
  var n = r[0] * i[1] - r[1] * i[0],
    s = r[0] * i[2] - r[2] * i[0],
    o = r[0] * i[3] - r[3] * i[0],
    a = r[1] * i[2] - r[2] * i[1],
    l = r[1] * i[3] - r[3] * i[1],
    c = r[2] * i[3] - r[3] * i[2],
    h = t[0],
    f = t[1],
    u = t[2],
    d = t[3];
  return e[0] = f * c - u * l + d * a, e[1] = -(h * c) + u * o - d * s, e[2] = h * l - f * o + d * n, e[3] = -(h * a) + f * s - u * n, e
}

function Gh(e, t, r, i) {
  var n = t[0],
    s = t[1],
    o = t[2],
    a = t[3];
  return e[0] = n + i * (r[0] - n), e[1] = s + i * (r[1] - s), e[2] = o + i * (r[2] - o), e[3] = a + i * (r[3] - a), e
}

function Cy(e, t) {
  t = t || 1;
  var r, i, n, s, o, a;
  do r = bt() * 2 - 1, i = bt() * 2 - 1, o = r * r + i * i; while (o >= 1);
  do n = bt() * 2 - 1, s = bt() * 2 - 1, a = n * n + s * s; while (a >= 1);
  var l = Math.sqrt((1 - o) / a);
  return e[0] = t * r, e[1] = t * i, e[2] = t * n * l, e[3] = t * s * l, e
}

function Ay(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3];
  return e[0] = r[0] * i + r[4] * n + r[8] * s + r[12] * o, e[1] = r[1] * i + r[5] * n + r[9] * s + r[13] * o, e[2] = r[2] * i + r[6] * n + r[10] * s + r[14] * o, e[3] = r[3] * i + r[7] * n + r[11] * s + r[15] * o, e
}

function Ry(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = r[0],
    a = r[1],
    l = r[2],
    c = r[3],
    h = c * i + a * s - l * n,
    f = c * n + l * i - o * s,
    u = c * s + o * n - a * i,
    d = -o * i - a * n - l * s;
  return e[0] = h * c + d * -o + f * -l - u * -a, e[1] = f * c + d * -a + u * -o - h * -l, e[2] = u * c + d * -l + h * -a - f * -o, e[3] = t[3], e
}

function zy(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0, e
}

function Ly(e) {
  return "vec4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")"
}

function Kh(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3]
}

function Zh(e, t) {
  var r = e[0],
    i = e[1],
    n = e[2],
    s = e[3],
    o = t[0],
    a = t[1],
    l = t[2],
    c = t[3];
  return Math.abs(r - o) <= W * Math.max(1, Math.abs(r), Math.abs(o)) && Math.abs(i - a) <= W * Math.max(1, Math.abs(i), Math.abs(a)) && Math.abs(n - l) <= W * Math.max(1, Math.abs(n), Math.abs(l)) && Math.abs(s - c) <= W * Math.max(1, Math.abs(s), Math.abs(c))
}
var $y = Bh,
  Oy = Vh,
  Iy = qh,
  Fy = jh,
  Hy = Uh,
  ky = Jo,
  Ny = ea,
  Dy = function () {
    var e = Ih();
    return function (t, r, i, n, s, o) {
      var a, l;
      for (r || (r = 4), i || (i = 0), n ? l = Math.min(n * r + i, t.length) : l = t.length, a = i; a < l; a += r) e[0] = t[a], e[1] = t[a + 1], e[2] = t[a + 2], e[3] = t[a + 3], s(e, e, o), t[a] = e[0], t[a + 1] = e[1], t[a + 2] = e[2], t[a + 3] = e[3];
      return t
    }
  }();
const By = Object.freeze(Object.defineProperty({
  __proto__: null,
  add: Dh,
  ceil: gy,
  clone: Fh,
  copy: kh,
  create: Ih,
  cross: Py,
  dist: Fy,
  distance: jh,
  div: Iy,
  divide: qh,
  dot: Xh,
  equals: Zh,
  exactEquals: Kh,
  floor: wy,
  forEach: Dy,
  fromValues: Hh,
  inverse: Sy,
  len: ky,
  length: Jo,
  lerp: Gh,
  max: by,
  min: xy,
  mul: Oy,
  multiply: Vh,
  negate: Ty,
  normalize: Yh,
  random: Cy,
  round: My,
  scale: Wh,
  scaleAndAdd: Ey,
  set: Nh,
  sqrDist: Hy,
  sqrLen: Ny,
  squaredDistance: Uh,
  squaredLength: ea,
  str: Ly,
  sub: $y,
  subtract: Bh,
  transformMat4: Ay,
  transformQuat: Ry,
  zero: zy
}, Symbol.toStringTag, {
  value: "Module"
}));

function Dn() {
  var e = new oe(4);
  return oe != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e[3] = 1, e
}

function Vy(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e
}

function Qh(e, t, r) {
  r = r * .5;
  var i = Math.sin(r);
  return e[0] = i * t[0], e[1] = i * t[1], e[2] = i * t[2], e[3] = Math.cos(r), e
}

function qy(e, t) {
  var r = Math.acos(t[3]) * 2,
    i = Math.sin(r / 2);
  return i > W ? (e[0] = t[0] / i, e[1] = t[1] / i, e[2] = t[2] / i) : (e[0] = 1, e[1] = 0, e[2] = 0), r
}

function Wy(e, t) {
  var r = ra(e, t);
  return Math.acos(2 * r * r - 1)
}

function Jh(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3],
    a = r[0],
    l = r[1],
    c = r[2],
    h = r[3];
  return e[0] = i * h + o * a + n * c - s * l, e[1] = n * h + o * l + s * a - i * c, e[2] = s * h + o * c + i * l - n * a, e[3] = o * h - i * a - n * l - s * c, e
}

function ef(e, t, r) {
  r *= .5;
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3],
    a = Math.sin(r),
    l = Math.cos(r);
  return e[0] = i * l + o * a, e[1] = n * l + s * a, e[2] = s * l - n * a, e[3] = o * l - i * a, e
}

function tf(e, t, r) {
  r *= .5;
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3],
    a = Math.sin(r),
    l = Math.cos(r);
  return e[0] = i * l - s * a, e[1] = n * l + o * a, e[2] = s * l + i * a, e[3] = o * l - n * a, e
}

function rf(e, t, r) {
  r *= .5;
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3],
    a = Math.sin(r),
    l = Math.cos(r);
  return e[0] = i * l + n * a, e[1] = n * l - i * a, e[2] = s * l + o * a, e[3] = o * l - s * a, e
}

function jy(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2];
  return e[0] = r, e[1] = i, e[2] = n, e[3] = Math.sqrt(Math.abs(1 - r * r - i * i - n * n)), e
}

function nf(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    o = Math.sqrt(r * r + i * i + n * n),
    a = Math.exp(s),
    l = o > 0 ? a * Math.sin(o) / o : 0;
  return e[0] = r * l, e[1] = i * l, e[2] = n * l, e[3] = a * Math.cos(o), e
}

function sf(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    o = Math.sqrt(r * r + i * i + n * n),
    a = o > 0 ? Math.atan2(o, s) / o : 0;
  return e[0] = r * a, e[1] = i * a, e[2] = n * a, e[3] = .5 * Math.log(r * r + i * i + n * n + s * s), e
}

function Uy(e, t, r) {
  return sf(e, t), af(e, e, r), nf(e, e), e
}

function $n(e, t, r, i) {
  var n = t[0],
    s = t[1],
    o = t[2],
    a = t[3],
    l = r[0],
    c = r[1],
    h = r[2],
    f = r[3],
    u, d, p, g, _;
  return d = n * l + s * c + o * h + a * f, d < 0 && (d = -d, l = -l, c = -c, h = -h, f = -f), 1 - d > W ? (u = Math.acos(d), p = Math.sin(u), g = Math.sin((1 - i) * u) / p, _ = Math.sin(i * u) / p) : (g = 1 - i, _ = i), e[0] = g * n + _ * l, e[1] = g * s + _ * c, e[2] = g * o + _ * h, e[3] = g * a + _ * f, e
}

function Yy(e) {
  var t = bt(),
    r = bt(),
    i = bt(),
    n = Math.sqrt(1 - t),
    s = Math.sqrt(t);
  return e[0] = n * Math.sin(2 * Math.PI * r), e[1] = n * Math.cos(2 * Math.PI * r), e[2] = s * Math.sin(2 * Math.PI * i), e[3] = s * Math.cos(2 * Math.PI * i), e
}

function Xy(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    o = r * r + i * i + n * n + s * s,
    a = o ? 1 / o : 0;
  return e[0] = -r * a, e[1] = -i * a, e[2] = -n * a, e[3] = s * a, e
}

function Gy(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = t[3], e
}

function of(e, t) {
  var r = t[0] + t[4] + t[8],
    i;
  if (r > 0) i = Math.sqrt(r + 1), e[3] = .5 * i, i = .5 / i, e[0] = (t[5] - t[7]) * i, e[1] = (t[6] - t[2]) * i, e[2] = (t[1] - t[3]) * i;
  else {
    var n = 0;
    t[4] > t[0] && (n = 1), t[8] > t[n * 3 + n] && (n = 2);
    var s = (n + 1) % 3,
      o = (n + 2) % 3;
    i = Math.sqrt(t[n * 3 + n] - t[s * 3 + s] - t[o * 3 + o] + 1), e[n] = .5 * i, i = .5 / i, e[3] = (t[s * 3 + o] - t[o * 3 + s]) * i, e[s] = (t[s * 3 + n] + t[n * 3 + s]) * i, e[o] = (t[o * 3 + n] + t[n * 3 + o]) * i
  }
  return e
}

function Ky(e, t, r, i) {
  var n = .5 * Math.PI / 180;
  t *= n, r *= n, i *= n;
  var s = Math.sin(t),
    o = Math.cos(t),
    a = Math.sin(r),
    l = Math.cos(r),
    c = Math.sin(i),
    h = Math.cos(i);
  return e[0] = s * l * h - o * a * c, e[1] = o * a * h + s * l * c, e[2] = o * l * c - s * a * h, e[3] = o * l * h + s * a * c, e
}

function Zy(e) {
  return "quat(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")"
}
var Qy = Fh,
  Jy = Hh,
  ta = kh,
  eg = Nh,
  tg = Dh,
  rg = Jh,
  af = Wh,
  ra = Xh,
  ig = Gh,
  ia = Jo,
  ng = ia,
  na = ea,
  sg = na,
  sa = Yh,
  og = Kh,
  ag = Zh,
  lg = function () {
    var e = Zo(),
      t = vo(1, 0, 0),
      r = vo(0, 1, 0);
    return function (i, n, s) {
      var o = Qo(n, s);
      return o < -.999999 ? (Ln(e, t, n), Oh(e) < 1e-6 && Ln(e, r, n), $h(e, e), Qh(i, e, Math.PI), i) : o > .999999 ? (i[0] = 0, i[1] = 0, i[2] = 0, i[3] = 1, i) : (Ln(e, n, s), i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = 1 + o, sa(i, i))
    }
  }(),
  cg = function () {
    var e = Dn(),
      t = Dn();
    return function (r, i, n, s, o, a) {
      return $n(e, i, o, a), $n(t, n, s, a), $n(r, e, t, 2 * a * (1 - a)), r
    }
  }(),
  hg = function () {
    var e = mh();
    return function (t, r, i, n) {
      return e[0] = i[0], e[3] = i[1], e[6] = i[2], e[1] = n[0], e[4] = n[1], e[7] = n[2], e[2] = -r[0], e[5] = -r[1], e[8] = -r[2], sa(t, of(t, e))
    }
  }();
const fg = Object.freeze(Object.defineProperty({
  __proto__: null,
  add: tg,
  calculateW: jy,
  clone: Qy,
  conjugate: Gy,
  copy: ta,
  create: Dn,
  dot: ra,
  equals: ag,
  exactEquals: og,
  exp: nf,
  fromEuler: Ky,
  fromMat3: of,
  fromValues: Jy,
  getAngle: Wy,
  getAxisAngle: qy,
  identity: Vy,
  invert: Xy,
  len: ng,
  length: ia,
  lerp: ig,
  ln: sf,
  mul: rg,
  multiply: Jh,
  normalize: sa,
  pow: Uy,
  random: Yy,
  rotateX: ef,
  rotateY: tf,
  rotateZ: rf,
  rotationTo: lg,
  scale: af,
  set: eg,
  setAxes: hg,
  setAxisAngle: Qh,
  slerp: $n,
  sqlerp: cg,
  sqrLen: sg,
  squaredLength: na,
  str: Zy
}, Symbol.toStringTag, {
  value: "Module"
}));

function ug() {
  var e = new oe(8);
  return oe != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0, e[4] = 0, e[5] = 0, e[6] = 0, e[7] = 0), e[3] = 1, e
}

function dg(e) {
  var t = new oe(8);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t
}

function vg(e, t, r, i, n, s, o, a) {
  var l = new oe(8);
  return l[0] = e, l[1] = t, l[2] = r, l[3] = i, l[4] = n, l[5] = s, l[6] = o, l[7] = a, l
}

function pg(e, t, r, i, n, s, o) {
  var a = new oe(8);
  a[0] = e, a[1] = t, a[2] = r, a[3] = i;
  var l = n * .5,
    c = s * .5,
    h = o * .5;
  return a[4] = l * i + c * r - h * t, a[5] = c * i + h * e - l * r, a[6] = h * i + l * t - c * e, a[7] = -l * e - c * t - h * r, a
}

function lf(e, t, r) {
  var i = r[0] * .5,
    n = r[1] * .5,
    s = r[2] * .5,
    o = t[0],
    a = t[1],
    l = t[2],
    c = t[3];
  return e[0] = o, e[1] = a, e[2] = l, e[3] = c, e[4] = i * c + n * l - s * a, e[5] = n * c + s * o - i * l, e[6] = s * c + i * a - n * o, e[7] = -i * o - n * a - s * l, e
}

function mg(e, t) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = t[0] * .5, e[5] = t[1] * .5, e[6] = t[2] * .5, e[7] = 0, e
}

function _g(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = 0, e[5] = 0, e[6] = 0, e[7] = 0, e
}

function yg(e, t) {
  var r = Dn();
  Eh(r, t);
  var i = new oe(3);
  return bh(i, t), lf(e, r, i), e
}

function cf(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e
}

function gg(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e[6] = 0, e[7] = 0, e
}

function wg(e, t, r, i, n, s, o, a, l) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e[4] = s, e[5] = o, e[6] = a, e[7] = l, e
}
var xg = ta;

function bg(e, t) {
  return e[0] = t[4], e[1] = t[5], e[2] = t[6], e[3] = t[7], e
}
var Mg = ta;

function Eg(e, t) {
  return e[4] = t[0], e[5] = t[1], e[6] = t[2], e[7] = t[3], e
}

function Tg(e, t) {
  var r = t[4],
    i = t[5],
    n = t[6],
    s = t[7],
    o = -t[0],
    a = -t[1],
    l = -t[2],
    c = t[3];
  return e[0] = (r * c + s * o + i * l - n * a) * 2, e[1] = (i * c + s * a + n * o - r * l) * 2, e[2] = (n * c + s * l + r * a - i * o) * 2, e
}

function Sg(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3],
    a = r[0] * .5,
    l = r[1] * .5,
    c = r[2] * .5,
    h = t[4],
    f = t[5],
    u = t[6],
    d = t[7];
  return e[0] = i, e[1] = n, e[2] = s, e[3] = o, e[4] = o * a + n * c - s * l + h, e[5] = o * l + s * a - i * c + f, e[6] = o * c + i * l - n * a + u, e[7] = -i * a - n * l - s * c + d, e
}

function Pg(e, t, r) {
  var i = -t[0],
    n = -t[1],
    s = -t[2],
    o = t[3],
    a = t[4],
    l = t[5],
    c = t[6],
    h = t[7],
    f = a * o + h * i + l * s - c * n,
    u = l * o + h * n + c * i - a * s,
    d = c * o + h * s + a * n - l * i,
    p = h * o - a * i - l * n - c * s;
  return ef(e, t, r), i = e[0], n = e[1], s = e[2], o = e[3], e[4] = f * o + p * i + u * s - d * n, e[5] = u * o + p * n + d * i - f * s, e[6] = d * o + p * s + f * n - u * i, e[7] = p * o - f * i - u * n - d * s, e
}

function Cg(e, t, r) {
  var i = -t[0],
    n = -t[1],
    s = -t[2],
    o = t[3],
    a = t[4],
    l = t[5],
    c = t[6],
    h = t[7],
    f = a * o + h * i + l * s - c * n,
    u = l * o + h * n + c * i - a * s,
    d = c * o + h * s + a * n - l * i,
    p = h * o - a * i - l * n - c * s;
  return tf(e, t, r), i = e[0], n = e[1], s = e[2], o = e[3], e[4] = f * o + p * i + u * s - d * n, e[5] = u * o + p * n + d * i - f * s, e[6] = d * o + p * s + f * n - u * i, e[7] = p * o - f * i - u * n - d * s, e
}

function Ag(e, t, r) {
  var i = -t[0],
    n = -t[1],
    s = -t[2],
    o = t[3],
    a = t[4],
    l = t[5],
    c = t[6],
    h = t[7],
    f = a * o + h * i + l * s - c * n,
    u = l * o + h * n + c * i - a * s,
    d = c * o + h * s + a * n - l * i,
    p = h * o - a * i - l * n - c * s;
  return rf(e, t, r), i = e[0], n = e[1], s = e[2], o = e[3], e[4] = f * o + p * i + u * s - d * n, e[5] = u * o + p * n + d * i - f * s, e[6] = d * o + p * s + f * n - u * i, e[7] = p * o - f * i - u * n - d * s, e
}

function Rg(e, t, r) {
  var i = r[0],
    n = r[1],
    s = r[2],
    o = r[3],
    a = t[0],
    l = t[1],
    c = t[2],
    h = t[3];
  return e[0] = a * o + h * i + l * s - c * n, e[1] = l * o + h * n + c * i - a * s, e[2] = c * o + h * s + a * n - l * i, e[3] = h * o - a * i - l * n - c * s, a = t[4], l = t[5], c = t[6], h = t[7], e[4] = a * o + h * i + l * s - c * n, e[5] = l * o + h * n + c * i - a * s, e[6] = c * o + h * s + a * n - l * i, e[7] = h * o - a * i - l * n - c * s, e
}

function zg(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3],
    a = r[0],
    l = r[1],
    c = r[2],
    h = r[3];
  return e[0] = i * h + o * a + n * c - s * l, e[1] = n * h + o * l + s * a - i * c, e[2] = s * h + o * c + i * l - n * a, e[3] = o * h - i * a - n * l - s * c, a = r[4], l = r[5], c = r[6], h = r[7], e[4] = i * h + o * a + n * c - s * l, e[5] = n * h + o * l + s * a - i * c, e[6] = s * h + o * c + i * l - n * a, e[7] = o * h - i * a - n * l - s * c, e
}

function Lg(e, t, r, i) {
  if (Math.abs(i) < W) return cf(e, t);
  var n = Math.hypot(r[0], r[1], r[2]);
  i = i * .5;
  var s = Math.sin(i),
    o = s * r[0] / n,
    a = s * r[1] / n,
    l = s * r[2] / n,
    c = Math.cos(i),
    h = t[0],
    f = t[1],
    u = t[2],
    d = t[3];
  e[0] = h * c + d * o + f * l - u * a, e[1] = f * c + d * a + u * o - h * l, e[2] = u * c + d * l + h * a - f * o, e[3] = d * c - h * o - f * a - u * l;
  var p = t[4],
    g = t[5],
    _ = t[6],
    b = t[7];
  return e[4] = p * c + b * o + g * l - _ * a, e[5] = g * c + b * a + _ * o - p * l, e[6] = _ * c + b * l + p * a - g * o, e[7] = b * c - p * o - g * a - _ * l, e
}

function $g(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e[4] = t[4] + r[4], e[5] = t[5] + r[5], e[6] = t[6] + r[6], e[7] = t[7] + r[7], e
}

function hf(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3],
    a = r[4],
    l = r[5],
    c = r[6],
    h = r[7],
    f = t[4],
    u = t[5],
    d = t[6],
    p = t[7],
    g = r[0],
    _ = r[1],
    b = r[2],
    S = r[3];
  return e[0] = i * S + o * g + n * b - s * _, e[1] = n * S + o * _ + s * g - i * b, e[2] = s * S + o * b + i * _ - n * g, e[3] = o * S - i * g - n * _ - s * b, e[4] = i * h + o * a + n * c - s * l + f * S + p * g + u * b - d * _, e[5] = n * h + o * l + s * a - i * c + u * S + p * _ + d * g - f * b, e[6] = s * h + o * c + i * l - n * a + d * S + p * b + f * _ - u * g, e[7] = o * h - i * a - n * l - s * c + p * S - f * g - u * _ - d * b, e
}
var Og = hf;

function Ig(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * r, e[5] = t[5] * r, e[6] = t[6] * r, e[7] = t[7] * r, e
}
var ff = ra;

function Fg(e, t, r, i) {
  var n = 1 - i;
  return ff(t, r) < 0 && (i = -i), e[0] = t[0] * n + r[0] * i, e[1] = t[1] * n + r[1] * i, e[2] = t[2] * n + r[2] * i, e[3] = t[3] * n + r[3] * i, e[4] = t[4] * n + r[4] * i, e[5] = t[5] * n + r[5] * i, e[6] = t[6] * n + r[6] * i, e[7] = t[7] * n + r[7] * i, e
}

function Hg(e, t) {
  var r = ss(t);
  return e[0] = -t[0] / r, e[1] = -t[1] / r, e[2] = -t[2] / r, e[3] = t[3] / r, e[4] = -t[4] / r, e[5] = -t[5] / r, e[6] = -t[6] / r, e[7] = t[7] / r, e
}

function kg(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = t[3], e[4] = -t[4], e[5] = -t[5], e[6] = -t[6], e[7] = t[7], e
}
var uf = ia,
  Ng = uf,
  ss = na,
  Dg = ss;

function Bg(e, t) {
  var r = ss(t);
  if (r > 0) {
    r = Math.sqrt(r);
    var i = t[0] / r,
      n = t[1] / r,
      s = t[2] / r,
      o = t[3] / r,
      a = t[4],
      l = t[5],
      c = t[6],
      h = t[7],
      f = i * a + n * l + s * c + o * h;
    e[0] = i, e[1] = n, e[2] = s, e[3] = o, e[4] = (a - i * f) / r, e[5] = (l - n * f) / r, e[6] = (c - s * f) / r, e[7] = (h - o * f) / r
  }
  return e
}

function Vg(e) {
  return "quat2(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ")"
}

function qg(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7]
}

function Wg(e, t) {
  var r = e[0],
    i = e[1],
    n = e[2],
    s = e[3],
    o = e[4],
    a = e[5],
    l = e[6],
    c = e[7],
    h = t[0],
    f = t[1],
    u = t[2],
    d = t[3],
    p = t[4],
    g = t[5],
    _ = t[6],
    b = t[7];
  return Math.abs(r - h) <= W * Math.max(1, Math.abs(r), Math.abs(h)) && Math.abs(i - f) <= W * Math.max(1, Math.abs(i), Math.abs(f)) && Math.abs(n - u) <= W * Math.max(1, Math.abs(n), Math.abs(u)) && Math.abs(s - d) <= W * Math.max(1, Math.abs(s), Math.abs(d)) && Math.abs(o - p) <= W * Math.max(1, Math.abs(o), Math.abs(p)) && Math.abs(a - g) <= W * Math.max(1, Math.abs(a), Math.abs(g)) && Math.abs(l - _) <= W * Math.max(1, Math.abs(l), Math.abs(_)) && Math.abs(c - b) <= W * Math.max(1, Math.abs(c), Math.abs(b))
}
const jg = Object.freeze(Object.defineProperty({
  __proto__: null,
  add: $g,
  clone: dg,
  conjugate: kg,
  copy: cf,
  create: ug,
  dot: ff,
  equals: Wg,
  exactEquals: qg,
  fromMat4: yg,
  fromRotation: _g,
  fromRotationTranslation: lf,
  fromRotationTranslationValues: pg,
  fromTranslation: mg,
  fromValues: vg,
  getDual: bg,
  getReal: xg,
  getTranslation: Tg,
  identity: gg,
  invert: Hg,
  len: Ng,
  length: uf,
  lerp: Fg,
  mul: Og,
  multiply: hf,
  normalize: Bg,
  rotateAroundAxis: Lg,
  rotateByQuatAppend: Rg,
  rotateByQuatPrepend: zg,
  rotateX: Pg,
  rotateY: Cg,
  rotateZ: Ag,
  scale: Ig,
  set: wg,
  setDual: Eg,
  setReal: Mg,
  sqrLen: Dg,
  squaredLength: ss,
  str: Vg,
  translate: Sg
}, Symbol.toStringTag, {
  value: "Module"
}));

function df() {
  var e = new oe(2);
  return oe != Float32Array && (e[0] = 0, e[1] = 0), e
}

function Ug(e) {
  var t = new oe(2);
  return t[0] = e[0], t[1] = e[1], t
}

function Yg(e, t) {
  var r = new oe(2);
  return r[0] = e, r[1] = t, r
}

function Xg(e, t) {
  return e[0] = t[0], e[1] = t[1], e
}

function Gg(e, t, r) {
  return e[0] = t, e[1] = r, e
}

function Kg(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e
}

function vf(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e
}

function pf(e, t, r) {
  return e[0] = t[0] * r[0], e[1] = t[1] * r[1], e
}

function mf(e, t, r) {
  return e[0] = t[0] / r[0], e[1] = t[1] / r[1], e
}

function Zg(e, t) {
  return e[0] = Math.ceil(t[0]), e[1] = Math.ceil(t[1]), e
}

function Qg(e, t) {
  return e[0] = Math.floor(t[0]), e[1] = Math.floor(t[1]), e
}

function Jg(e, t, r) {
  return e[0] = Math.min(t[0], r[0]), e[1] = Math.min(t[1], r[1]), e
}

function e2(e, t, r) {
  return e[0] = Math.max(t[0], r[0]), e[1] = Math.max(t[1], r[1]), e
}

function t2(e, t) {
  return e[0] = Math.round(t[0]), e[1] = Math.round(t[1]), e
}

function r2(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e
}

function i2(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e
}

function _f(e, t) {
  var r = t[0] - e[0],
    i = t[1] - e[1];
  return Math.hypot(r, i)
}

function yf(e, t) {
  var r = t[0] - e[0],
    i = t[1] - e[1];
  return r * r + i * i
}

function gf(e) {
  var t = e[0],
    r = e[1];
  return Math.hypot(t, r)
}

function wf(e) {
  var t = e[0],
    r = e[1];
  return t * t + r * r
}

function n2(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e
}

function s2(e, t) {
  return e[0] = 1 / t[0], e[1] = 1 / t[1], e
}

function o2(e, t) {
  var r = t[0],
    i = t[1],
    n = r * r + i * i;
  return n > 0 && (n = 1 / Math.sqrt(n)), e[0] = t[0] * n, e[1] = t[1] * n, e
}

function a2(e, t) {
  return e[0] * t[0] + e[1] * t[1]
}

function l2(e, t, r) {
  var i = t[0] * r[1] - t[1] * r[0];
  return e[0] = e[1] = 0, e[2] = i, e
}

function c2(e, t, r, i) {
  var n = t[0],
    s = t[1];
  return e[0] = n + i * (r[0] - n), e[1] = s + i * (r[1] - s), e
}

function h2(e, t) {
  t = t || 1;
  var r = bt() * 2 * Math.PI;
  return e[0] = Math.cos(r) * t, e[1] = Math.sin(r) * t, e
}

function f2(e, t, r) {
  var i = t[0],
    n = t[1];
  return e[0] = r[0] * i + r[2] * n, e[1] = r[1] * i + r[3] * n, e
}

function u2(e, t, r) {
  var i = t[0],
    n = t[1];
  return e[0] = r[0] * i + r[2] * n + r[4], e[1] = r[1] * i + r[3] * n + r[5], e
}

function d2(e, t, r) {
  var i = t[0],
    n = t[1];
  return e[0] = r[0] * i + r[3] * n + r[6], e[1] = r[1] * i + r[4] * n + r[7], e
}

function v2(e, t, r) {
  var i = t[0],
    n = t[1];
  return e[0] = r[0] * i + r[4] * n + r[12], e[1] = r[1] * i + r[5] * n + r[13], e
}

function p2(e, t, r, i) {
  var n = t[0] - r[0],
    s = t[1] - r[1],
    o = Math.sin(i),
    a = Math.cos(i);
  return e[0] = n * a - s * o + r[0], e[1] = n * o + s * a + r[1], e
}

function m2(e, t) {
  var r = e[0],
    i = e[1],
    n = t[0],
    s = t[1],
    o = Math.sqrt(r * r + i * i) * Math.sqrt(n * n + s * s),
    a = o && (r * n + i * s) / o;
  return Math.acos(Math.min(Math.max(a, -1), 1))
}

function _2(e) {
  return e[0] = 0, e[1] = 0, e
}

function y2(e) {
  return "vec2(" + e[0] + ", " + e[1] + ")"
}

function g2(e, t) {
  return e[0] === t[0] && e[1] === t[1]
}

function w2(e, t) {
  var r = e[0],
    i = e[1],
    n = t[0],
    s = t[1];
  return Math.abs(r - n) <= W * Math.max(1, Math.abs(r), Math.abs(n)) && Math.abs(i - s) <= W * Math.max(1, Math.abs(i), Math.abs(s))
}
var x2 = gf,
  b2 = vf,
  M2 = pf,
  E2 = mf,
  T2 = _f,
  S2 = yf,
  P2 = wf,
  C2 = function () {
    var e = df();
    return function (t, r, i, n, s, o) {
      var a, l;
      for (r || (r = 2), i || (i = 0), n ? l = Math.min(n * r + i, t.length) : l = t.length, a = i; a < l; a += r) e[0] = t[a], e[1] = t[a + 1], s(e, e, o), t[a] = e[0], t[a + 1] = e[1];
      return t
    }
  }();
const A2 = Object.freeze(Object.defineProperty({
  __proto__: null,
  add: Kg,
  angle: m2,
  ceil: Zg,
  clone: Ug,
  copy: Xg,
  create: df,
  cross: l2,
  dist: T2,
  distance: _f,
  div: E2,
  divide: mf,
  dot: a2,
  equals: w2,
  exactEquals: g2,
  floor: Qg,
  forEach: C2,
  fromValues: Yg,
  inverse: s2,
  len: x2,
  length: gf,
  lerp: c2,
  max: e2,
  min: Jg,
  mul: M2,
  multiply: pf,
  negate: n2,
  normalize: o2,
  random: h2,
  rotate: p2,
  round: t2,
  scale: r2,
  scaleAndAdd: i2,
  set: Gg,
  sqrDist: S2,
  sqrLen: P2,
  squaredDistance: yf,
  squaredLength: wf,
  str: y2,
  sub: b2,
  subtract: vf,
  transformMat2: f2,
  transformMat2d: u2,
  transformMat3: d2,
  transformMat4: v2,
  zero: _2
}, Symbol.toStringTag, {
  value: "Module"
})),
  R2 = Object.freeze(Object.defineProperty({
    __proto__: null,
    glMatrix: Em,
    mat2: Gm,
    mat2d: g1,
    mat3: G1,
    mat4: F_,
    quat: fg,
    quat2: jg,
    vec2: A2,
    vec3: yy,
    vec4: By
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  Ye = _0(R2);

function z2(e, t, r) {
  return Math.min(Math.max(e, t), r)
}
var gi = z2,
  L2 = 256,
  gl = 256,
  Tn = gi,
  $2 = Ye.vec4,
  Bn = Ye.vec3,
  ii = Ye.mat4;

function wl(e, t, r) {
  var i = e.createShader(t);
  if (e.shaderSource(i, r), e.compileShader(i), !e.getShaderParameter(i, e.COMPILE_STATUS)) throw e.getShaderInfoLog(i);
  return i
}

function O2(e, t, r, i, n) {
  var s = wl(e, e.VERTEX_SHADER, t),
    o = wl(e, e.FRAGMENT_SHADER, r),
    a = e.createProgram();
  if (e.attachShader(a, s), e.attachShader(a, o), e.linkProgram(a), !e.getProgramParameter(a, e.LINK_STATUS)) throw e.getProgramInfoLog(a);
  for (var l = 0; l < i.length; l++) {
    var c = i[l];
    if (a[c] = e.getAttribLocation(a, c), a[c] === -1) throw new Error("Shader program has no " + c + " attribute")
  }
  for (var h = 0; h < n.length; h++) {
    var f = n[h];
    if (a[f] = e.getUniformLocation(a, f), a[f] === -1) throw new Error("Shader program has no " + f + " uniform")
  }
  return a
}

function I2(e, t) {
  for (var r = e.getAttachedShaders(t), i = 0; i < r.length; i++) {
    var n = r[i];
    e.detachShader(t, n), e.deleteShader(n)
  }
  e.deleteProgram(t)
}

function Os(e, t, r, i) {
  var n = e.createBuffer();
  return e.bindBuffer(t, n), e.bufferData(t, i, r), n
}

function F2(e, t, r, i) {
  return {
    vertexIndices: Os(e, e.ELEMENT_ARRAY_BUFFER, e.STATIC_DRAW, new Uint16Array(t)),
    vertexPositions: Os(e, e.ARRAY_BUFFER, e.STATIC_DRAW, new Float32Array(r)),
    textureCoords: Os(e, e.ARRAY_BUFFER, e.STATIC_DRAW, new Float32Array(i))
  }
}

function H2(e, t) {
  e.deleteBuffer(t.vertexIndices), e.deleteBuffer(t.vertexPositions), e.deleteBuffer(t.textureCoords)
}

function k2(e, t) {
  for (var r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), i = 0; i < r; i++) e.enableVertexAttribArray(i)
}

function N2(e, t) {
  for (var r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), i = 0; i < r; i++) e.disableVertexAttribArray(i)
}

function D2(e, t, r) {
  e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, r._texture), e.uniform1i(t.uSampler, 0)
}

function B2(e, t, r, i) {
  var n = ((r + 1) * gl - i) / (gl * L2);
  e.uniform1f(t.uDepth, n)
}
var V2 = 1,
  q2 = $2.create(),
  xf = ii.create();
ii.identity(xf);

function W2(e, t, r) {
  var i = V2;
  t && t.opacity != null && (i = t.opacity), e.uniform1f(r.opacity, i);
  var n = q2;
  t && t.colorOffset && (n = t.colorOffset), e.uniform4fv(r.colorOffset, n);
  var s = xf;
  t && t.colorMatrix && (s = t.colorMatrix), e.uniformMatrix4fv(r.colorMatrix, !1, s)
}
var xl = Bn.create(),
  bl = Bn.create();

function j2(e, t, r, i) {
  if (r.x === 0 && r.width === 1 && r.y === 0 && r.height === 1) {
    e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight), ii.identity(i);
    return
  }
  var n = r.x,
    s = Tn(n, 0, 1),
    o = s - n,
    a = 1 - s,
    l = Tn(r.width - o, 0, a),
    c = r.width - l,
    h = 1 - r.height - r.y,
    f = Tn(h, 0, 1),
    u = f - h,
    d = 1 - f,
    p = Tn(r.height - u, 0, d),
    g = r.height - p;
  Bn.set(bl, r.width / l, r.height / p, 1), Bn.set(xl, (c - o) / l, (g - u) / p, 0), ii.identity(i), ii.translate(i, i, xl), ii.scale(i, i, bl), e.viewport(e.drawingBufferWidth * s, e.drawingBufferHeight * f, e.drawingBufferWidth * l, e.drawingBufferHeight * p)
}
var bf = {
  createShaderProgram: O2,
  destroyShaderProgram: I2,
  createConstantBuffers: F2,
  destroyConstantBuffers: H2,
  enableAttributes: k2,
  disableAttributes: N2,
  setTexture: D2,
  setDepth: B2,
  setViewport: j2,
  setupPixelEffectUniforms: W2
},
  U2 = ["attribute vec3 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform float uDepth;", "uniform mat4 uViewportMatrix;", "uniform mat4 uProjMatrix;", "varying vec2 vTextureCoord;", "void main(void) {", "  gl_Position = uViewportMatrix * uProjMatrix * vec4(aVertexPosition.xy, 0.0, 1.0);", "  gl_Position.z = uDepth * gl_Position.w;", "  vTextureCoord = aTextureCoord;", "}"].join(`
`),
  Y2 = ["#ifdef GL_FRAGMENT_PRECISION_HIGH", "precision highp float;", "#else", "precision mediump float;", "#endif", "uniform sampler2D uSampler;", "uniform float uOpacity;", "uniform vec4 uColorOffset;", "uniform mat4 uColorMatrix;", "varying vec2 vTextureCoord;", "void main(void) {", "  vec4 color = texture2D(uSampler, vTextureCoord) * uColorMatrix + uColorOffset;", "  gl_FragColor = vec4(color.rgba * uOpacity);", "}"].join(`
`),
  Ir = Ye.mat4,
  Ml = Ye.vec3,
  X2 = Te,
  kt = bf,
  G2 = kt.createConstantBuffers,
  K2 = kt.destroyConstantBuffers,
  Z2 = kt.createShaderProgram,
  Q2 = kt.destroyShaderProgram,
  J2 = kt.enableAttributes,
  ew = kt.disableAttributes,
  tw = kt.setViewport,
  rw = kt.setupPixelEffectUniforms,
  iw = kt.setDepth,
  nw = kt.setTexture,
  sw = U2,
  ow = Y2,
  Mf = [0, 1, 2, 0, 2, 3],
  aw = [-.5, -.5, 0, .5, -.5, 0, .5, .5, 0, -.5, .5, 0],
  lw = [0, 0, 1, 0, 1, 1, 0, 1],
  cw = ["aVertexPosition", "aTextureCoord"],
  hw = ["uDepth", "uOpacity", "uSampler", "uProjMatrix", "uViewportMatrix", "uColorOffset", "uColorMatrix"];

function Qi(e) {
  this.gl = e, this.projMatrix = Ir.create(), this.viewportMatrix = Ir.create(), this.translateVector = Ml.create(), this.scaleVector = Ml.create(), this.constantBuffers = G2(e, Mf, aw, lw), this.shaderProgram = Z2(e, sw, ow, cw, hw)
}
Qi.prototype.destroy = function () {
  K2(this.gl, this.constantBuffers), Q2(this.gl, this.shaderProgram), X2(this)
};
Qi.prototype.startLayer = function (e, t) {
  var r = this.gl,
    i = this.shaderProgram,
    n = this.constantBuffers,
    s = this.viewportMatrix;
  r.useProgram(i), J2(r, i), tw(r, e, t, s), r.uniformMatrix4fv(i.uViewportMatrix, !1, s), r.bindBuffer(r.ARRAY_BUFFER, n.vertexPositions), r.vertexAttribPointer(i.aVertexPosition, 3, r.FLOAT, r.FALSE, 0, 0), r.bindBuffer(r.ARRAY_BUFFER, n.textureCoords), r.vertexAttribPointer(i.aTextureCoord, 2, r.FLOAT, r.FALSE, 0, 0), rw(r, e.effects(), {
    opacity: i.uOpacity,
    colorOffset: i.uColorOffset,
    colorMatrix: i.uColorMatrix
  })
};
Qi.prototype.endLayer = function (e, t) {
  var r = this.gl,
    i = this.shaderProgram;
  ew(r, i)
};
Qi.prototype.renderTile = function (e, t, r, i) {
  var n = this.gl,
    s = this.shaderProgram,
    o = this.constantBuffers,
    a = this.projMatrix,
    l = this.translateVector,
    c = this.scaleVector;
  l[0] = e.centerX(), l[1] = e.centerY(), l[2] = -.5, c[0] = e.scaleX(), c[1] = e.scaleY(), c[2] = 1, Ir.copy(a, r.view().projection()), Ir.rotateX(a, a, e.rotX()), Ir.rotateY(a, a, e.rotY()), Ir.translate(a, a, l), Ir.scale(a, a, c), n.uniformMatrix4fv(s.uProjMatrix, !1, a), iw(n, s, i, e.z), nw(n, s, t), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, o.vertexIndices), n.drawElements(n.TRIANGLES, Mf.length, n.UNSIGNED_SHORT, 0)
};
var Ef = Qi,
  fw = Ef,
  uw = Ht;

function Tf() {
  this.constructor.super_.apply(this, arguments)
}
uw(Tf, fw);
var Sf = Tf,
  dw = Ef,
  vw = Ht;

function Pf() {
  this.constructor.super_.apply(this, arguments)
}
vw(Pf, dw);
var Cf = Pf,
  pw = ["attribute vec3 aVertexPosition;", "uniform float uDepth;", "uniform mat4 uViewportMatrix;", "uniform mat4 uInvProjMatrix;", "varying vec4 vRay;", "void main(void) {", "  vRay = uInvProjMatrix * vec4(aVertexPosition.xy, 1.0, 1.0);", "  gl_Position = uViewportMatrix * vec4(aVertexPosition.xy, uDepth, 1.0);", "}"].join(`
`),
  mw = ["#ifdef GL_FRAGMENT_PRECISION_HIGH", "precision highp float;", "#else", "precision mediump float", "#endif", "uniform sampler2D uSampler;", "uniform float uOpacity;", "uniform float uTextureX;", "uniform float uTextureY;", "uniform float uTextureWidth;", "uniform float uTextureHeight;", "uniform vec4 uColorOffset;", "uniform mat4 uColorMatrix;", "varying vec4 vRay;", "const float PI = 3.14159265358979323846264;", "void main(void) {", "  float r = inversesqrt(vRay.x * vRay.x + vRay.y * vRay.y + vRay.z * vRay.z);", "  float phi  = acos(vRay.y * r);", "  float theta = atan(vRay.x, -1.0*vRay.z);", "  float s = 0.5 + 0.5 * theta / PI;", "  float t = 1.0 - phi / PI;", "  s = s * uTextureWidth + uTextureX;", "  t = t * uTextureHeight + uTextureY;", "  vec4 color = texture2D(uSampler, vec2(s, t)) * uColorMatrix + uColorOffset;", "  gl_FragColor = vec4(color.rgba * uOpacity);", "}"].join(`
`),
  Vn = Ye.mat4,
  _w = Te,
  Nt = bf,
  yw = Nt.createConstantBuffers,
  gw = Nt.destroyConstantBuffers,
  ww = Nt.createShaderProgram,
  xw = Nt.destroyShaderProgram,
  bw = Nt.enableAttributes,
  Mw = Nt.disableAttributes,
  Ew = Nt.setViewport,
  Tw = Nt.setupPixelEffectUniforms,
  Sw = Nt.setDepth,
  Pw = Nt.setTexture,
  Cw = pw,
  Aw = mw,
  Af = [0, 1, 2, 0, 2, 3],
  Rw = [-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0],
  zw = [0, 0, 1, 0, 1, 1, 0, 1],
  Lw = ["aVertexPosition"],
  $w = ["uDepth", "uOpacity", "uSampler", "uInvProjMatrix", "uViewportMatrix", "uColorOffset", "uColorMatrix", "uTextureX", "uTextureY", "uTextureWidth", "uTextureHeight"];

function Ji(e) {
  this.gl = e, this.invProjMatrix = Vn.create(), this.viewportMatrix = Vn.create(), this.constantBuffers = yw(e, Af, Rw, zw), this.shaderProgram = ww(e, Cw, Aw, Lw, $w)
}
Ji.prototype.destroy = function () {
  gw(this.gl, this.constantBuffers), xw(this.gl, this.shaderProgram), _w(this)
};
Ji.prototype.startLayer = function (e, t) {
  var r = this.gl,
    i = this.shaderProgram,
    n = this.constantBuffers,
    s = this.invProjMatrix,
    o = this.viewportMatrix;
  r.useProgram(i), bw(r, i), Ew(r, e, t, o), r.uniformMatrix4fv(i.uViewportMatrix, !1, o), r.bindBuffer(r.ARRAY_BUFFER, n.vertexPositions), r.vertexAttribPointer(i.aVertexPosition, 3, r.FLOAT, r.FALSE, 0, 0), r.bindBuffer(r.ARRAY_BUFFER, n.textureCoords), Vn.copy(s, e.view().projection()), Vn.invert(s, s), r.uniformMatrix4fv(i.uInvProjMatrix, !1, s);
  var a = e.effects().textureCrop || {},
    l = a.x != null ? a.x : 0,
    c = a.y != null ? a.y : 0,
    h = a.width != null ? a.width : 1,
    f = a.height != null ? a.height : 1;
  r.uniform1f(i.uTextureX, l), r.uniform1f(i.uTextureY, c), r.uniform1f(i.uTextureWidth, h), r.uniform1f(i.uTextureHeight, f), Tw(r, e.effects(), {
    opacity: i.uOpacity,
    colorOffset: i.uColorOffset,
    colorMatrix: i.uColorMatrix
  })
};
Ji.prototype.endLayer = function (e, t) {
  var r = this.gl,
    i = this.shaderProgram;
  Mw(r, i)
};
Ji.prototype.renderTile = function (e, t, r, i) {
  var n = this.gl,
    s = this.shaderProgram,
    o = this.constantBuffers;
  Sw(n, s, i, e.z), Pw(n, s, t), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, o.vertexIndices), n.drawElements(n.TRIANGLES, Af.length, n.UNSIGNED_SHORT, 0)
};
var Rf = Ji,
  Ow = Sf,
  Iw = Cf,
  Fw = Rf;

function Hw(e) {
  switch (e.type) {
    case "webgl":
      e.registerRenderer("flat", "flat", Iw), e.registerRenderer("cube", "rectilinear", Ow), e.registerRenderer("equirect", "rectilinear", Fw);
      break;
    default:
      throw new Error("Unknown stage type: " + e.type)
  }
}
var zf = Hw;

function kw() {
  for (var e = 0, t = 0; t < arguments.length; t++) {
    var r = arguments[t];
    e += r, e += r << 10, e ^= r >> 6
  }
  return e += e << 3, e ^= e >> 11, e += e << 15, e >= 0 ? e : -e
}
var os = kw;

function Nw(e, t) {
  return (+e % (t = +t) + t) % t
}
var Mr = Nw,
  oa = Mr,
  Dw = 64;

function qr(e) {
  if (e != null && (!isFinite(e) || Math.floor(e) !== e || e < 1)) throw new Error("Set: invalid capacity");
  this._capacity = this._capacity || Dw, this._buckets = [];
  for (var t = 0; t < this._capacity; t++) this._buckets.push([]);
  this._size = 0
}
qr.prototype.add = function (e) {
  for (var t = oa(e.hash(), this._capacity), r = this._buckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n)) return r[i] = e, n
  }
  return r.push(e), this._size++, null
};
qr.prototype.remove = function (e) {
  for (var t = oa(e.hash(), this._capacity), r = this._buckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n)) {
      for (var s = i; s < r.length - 1; s++) r[s] = r[s + 1];
      return r.length = r.length - 1, this._size--, n
    }
  }
  return null
};
qr.prototype.has = function (e) {
  for (var t = oa(e.hash(), this._capacity), r = this._buckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n)) return !0
  }
  return !1
};
qr.prototype.size = function () {
  return this._size
};
qr.prototype.clear = function () {
  for (var e = 0; e < this._capacity; e++) this._buckets[e].length = 0;
  this._size = 0
};
qr.prototype.forEach = function (e) {
  for (var t = 0, r = 0; r < this._capacity; r++)
    for (var i = this._buckets[r], n = 0; n < i.length; n++) e(i[n]), t += 1;
  return t
};
var Lf = qr,
  Bw = Lf;

function aa() {
  this._stack = [], this._visited = new Bw, this._vertices = null
}
aa.prototype.search = function (e, t, r) {
  var i = this._stack,
    n = this._visited,
    s = this._vertices,
    o = 0;
  for (this._clear(), i.push(t); i.length > 0;) {
    var a = i.pop();
    if (!n.has(a) && e.intersects(a.vertices(s))) {
      n.add(a);
      for (var l = a.neighbors(), c = 0; c < l.length; c++) i.push(l[c]);
      r.push(a), o++
    }
  }
  return this._vertices = s, this._clear(), o
};
aa.prototype._clear = function () {
  this._stack.length = 0, this._visited.clear()
};
var $f = aa,
  Vw = Mr;

function tr(e) {
  if (!isFinite(e) || Math.floor(e) !== e || e < 0) throw new Error("LruMap: invalid capacity");
  this._capacity = e, this._keys = new Array(this._capacity), this._values = new Array(this._capacity), this._start = 0, this._size = 0
}
tr.prototype._index = function (e) {
  return Vw(this._start + e, this._capacity)
};
tr.prototype.get = function (e) {
  for (var t = 0; t < this._size; t++) {
    var r = this._keys[this._index(t)];
    if (e.equals(r)) return this._values[this._index(t)]
  }
  return null
};
tr.prototype.set = function (e, t) {
  if (this._capacity === 0) return e;
  this.del(e);
  var r = this._size === this._capacity ? this._keys[this._index(0)] : null;
  return this._keys[this._index(this._size)] = e, this._values[this._index(this._size)] = t, this._size < this._capacity ? this._size++ : this._start = this._index(1), r
};
tr.prototype.del = function (e) {
  for (var t = 0; t < this._size; t++)
    if (e.equals(this._keys[this._index(t)])) {
      for (var r = this._values[this._index(t)], i = t; i < this._size - 1; i++) this._keys[this._index(i)] = this._keys[this._index(i + 1)], this._values[this._index(i)] = this._values[this._index(i + 1)];
      return this._size--, r
    }
  return null
};
tr.prototype.has = function (e) {
  for (var t = 0; t < this._size; t++)
    if (e.equals(this._keys[this._index(t)])) return !0;
  return !1
};
tr.prototype.size = function () {
  return this._size
};
tr.prototype.clear = function () {
  this._keys.length = 0, this._values.length = 0, this._start = 0, this._size = 0
};
tr.prototype.forEach = function (e) {
  for (var t = 0, r = 0; r < this._size; r++) e(this._keys[this._index(r)], this._values[this._index(r)]), t += 1;
  return t
};
var Of = tr;

function as(e) {
  this._fallbackOnly = !!e.fallbackOnly
}
as.prototype.numHorizontalTiles = function () {
  return Math.ceil(this.width() / this.tileWidth())
};
as.prototype.numVerticalTiles = function () {
  return Math.ceil(this.height() / this.tileHeight())
};
as.prototype.fallbackOnly = function () {
  return this._fallbackOnly
};
var la = as;

function qw(e, t) {
  return e < t ? -1 : e > t ? 1 : 0
}
var en = qw,
  Ww = en;

function jw(e, t) {
  for (var r = [], i = 0; i < e.length; i++) r.push(new t(e[i]));
  return r.sort(function (n, s) {
    return Ww(n.width(), s.width())
  }), r
}

function Uw(e) {
  for (var t = [], r = 0; r < e.length; r++) e[r]._fallbackOnly || t.push(e[r]);
  if (!t.length) throw new Error("No selectable levels in list");
  return t
}
var tn = {
  makeLevelList: jw,
  makeSelectableLevelList: Uw
};

function Yw(e) {
  var t = typeof e;
  if (t === "object") {
    if (e === null) return "null";
    if (Object.prototype.toString.call(e) === "[object Array]") return "array";
    if (Object.prototype.toString.call(e) === "[object RegExp]") return "regexp"
  }
  return t
}
var rn = Yw,
  Xw = Ht,
  Gw = os,
  Kw = $f,
  Zw = Of,
  Qw = la,
  Jw = tn.makeLevelList,
  ex = tn.makeSelectableLevelList,
  qn = gi,
  Sn = en,
  tx = rn,
  it = Ye.vec3,
  po = Ye.vec4,
  rx = 64,
  Dr = "fudlrb",
  Br = {
    f: {
      x: 0,
      y: 0
    },
    b: {
      x: 0,
      y: Math.PI
    },
    l: {
      x: 0,
      y: Math.PI / 2
    },
    r: {
      x: 0,
      y: -Math.PI / 2
    },
    u: {
      x: Math.PI / 2,
      y: 0
    },
    d: {
      x: -Math.PI / 2,
      y: 0
    }
  },
  Is = it.create();

function Yi(e, t, r, i) {
  t && it.rotateZ(e, e, Is, t), r && it.rotateX(e, e, Is, r), i && it.rotateY(e, e, Is, i)
}
var mo = {};
for (var Fs = 0; Fs < Dr.length; Fs++) {
  var El = Dr[Fs],
    Tl = Br[El],
    Sl = it.fromValues(0, 0, -1);
  Yi(Sl, 0, Tl.x, Tl.y), mo[El] = Sl
}
var Pn = {
  f: ["l", "r", "u", "d"],
  b: ["r", "l", "u", "d"],
  l: ["b", "f", "u", "d"],
  r: ["f", "b", "u", "d"],
  u: ["l", "r", "b", "f"],
  d: ["l", "r", "f", "b"]
},
  Hs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ];

function ze(e, t, r, i, n) {
  this.face = e, this.x = t, this.y = r, this.z = i, this._geometry = n, this._level = n.levelList[i]
}
ze.prototype.rotX = function () {
  return Br[this.face].x
};
ze.prototype.rotY = function () {
  return Br[this.face].y
};
ze.prototype.centerX = function () {
  return (this.x + .5) / this._level.numHorizontalTiles() - .5
};
ze.prototype.centerY = function () {
  return .5 - (this.y + .5) / this._level.numVerticalTiles()
};
ze.prototype.scaleX = function () {
  return 1 / this._level.numHorizontalTiles()
};
ze.prototype.scaleY = function () {
  return 1 / this._level.numVerticalTiles()
};
ze.prototype.vertices = function (e) {
  e || (e = [it.create(), it.create(), it.create(), it.create()]);
  var t = Br[this.face];

  function r(a, l, c) {
    it.set(a, l, c, -.5), Yi(a, 0, t.x, t.y)
  }
  var i = this.centerX() - this.scaleX() / 2,
    n = this.centerX() + this.scaleX() / 2,
    s = this.centerY() - this.scaleY() / 2,
    o = this.centerY() + this.scaleY() / 2;
  return r(e[0], i, o), r(e[1], n, o), r(e[2], n, s), r(e[3], i, s), e
};
ze.prototype.parent = function () {
  if (this.z === 0) return null;
  var e = this.face,
    t = this.z,
    r = this.x,
    i = this.y,
    n = this._geometry,
    s = n.levelList[t],
    o = n.levelList[t - 1],
    a = Math.floor(r / s.numHorizontalTiles() * o.numHorizontalTiles()),
    l = Math.floor(i / s.numVerticalTiles() * o.numVerticalTiles()),
    c = t - 1;
  return new ze(e, a, l, c, n)
};
ze.prototype.children = function (e) {
  if (this.z === this._geometry.levelList.length - 1) return null;
  var t = this.face,
    r = this.z,
    i = this.x,
    n = this.y,
    s = this._geometry,
    o = s.levelList[r],
    a = s.levelList[r + 1],
    l = a.numHorizontalTiles() / o.numHorizontalTiles(),
    c = a.numVerticalTiles() / o.numVerticalTiles();
  e = e || [];
  for (var h = 0; h < l; h++)
    for (var f = 0; f < c; f++) {
      var u = l * i + h,
        d = c * n + f,
        p = r + 1;
      e.push(new ze(t, u, d, p, s))
    }
  return e
};
ze.prototype.neighbors = function () {
  var e = this._geometry,
    t = e._neighborsCache,
    r = t.get(this);
  if (r) return r;
  for (var i = e._vec, n = this.face, s = this.x, o = this.y, a = this.z, l = this._level, c = l.numHorizontalTiles(), h = l.numVerticalTiles(), f = [], u = 0; u < Hs.length; u++) {
    var d = Hs[u][0],
      p = Hs[u][1],
      g = s + d,
      _ = o + p,
      b = a,
      S = n;
    if (g < 0 || g >= c || _ < 0 || _ >= h) {
      var R = this.centerX(),
        P = this.centerY();
      g < 0 ? (it.set(i, -.5, P, -.5), S = Pn[n][0]) : g >= c ? (it.set(i, .5, P, -.5), S = Pn[n][1]) : _ < 0 ? (it.set(i, R, .5, -.5), S = Pn[n][2]) : _ >= h && (it.set(i, R, -.5, -.5), S = Pn[n][3]);
      var H;
      H = Br[n], Yi(i, 0, H.x, H.y), H = Br[S], Yi(i, 0, -H.x, -H.y), g = qn(Math.floor((.5 + i[0]) * c), 0, c - 1), _ = qn(Math.floor((.5 - i[1]) * h), 0, h - 1)
    }
    f.push(new ze(S, g, _, b, e))
  }
  return t.set(this, f), f
};
ze.prototype.hash = function () {
  return Gw(Dr.indexOf(this.face), this.z, this.y, this.x)
};
ze.prototype.equals = function (e) {
  return this._geometry === e._geometry && this.face === e.face && this.z === e.z && this.y === e.y && this.x === e.x
};
ze.prototype.cmp = function (e) {
  return Sn(this.z, e.z) || Sn(Dr.indexOf(this.face), Dr.indexOf(e.face)) || Sn(this.y, e.y) || Sn(this.x, e.x)
};
ze.prototype.str = function () {
  return "CubeTile(" + tile.face + ", " + tile.x + ", " + tile.y + ", " + tile.z + ")"
};

function Wr(e) {
  if (this.constructor.super_.call(this, e), this._size = e.size, this._tileSize = e.tileSize, this._size % this._tileSize !== 0) throw new Error("Level size is not multiple of tile size: " + this._size + " " + this._tileSize)
}
Xw(Wr, Qw);
Wr.prototype.width = function () {
  return this._size
};
Wr.prototype.height = function () {
  return this._size
};
Wr.prototype.tileWidth = function () {
  return this._tileSize
};
Wr.prototype.tileHeight = function () {
  return this._tileSize
};
Wr.prototype._validateWithParentLevel = function (e) {
  var t = this.width(),
    r = this.height(),
    i = this.tileWidth(),
    n = this.tileHeight(),
    s = this.numHorizontalTiles(),
    o = this.numVerticalTiles(),
    a = e.width(),
    l = e.height(),
    c = e.tileWidth(),
    h = e.tileHeight(),
    f = e.numHorizontalTiles(),
    u = e.numVerticalTiles();
  if (t % a !== 0) throw new Error("Level width must be multiple of parent level: " + t + " vs. " + a);
  if (r % l !== 0) throw new Error("Level height must be multiple of parent level: " + r + " vs. " + l);
  if (s % f !== 0) throw new Error("Number of horizontal tiles must be multiple of parent level: " + s + " (" + t + "/" + i + ") vs. " + f + " (" + a + "/" + c + ")");
  if (o % u !== 0) throw new Error("Number of vertical tiles must be multiple of parent level: " + o + " (" + r + "/" + n + ") vs. " + u + " (" + l + "/" + h + ")")
};

function Kt(e) {
  if (tx(e) !== "array") throw new Error("Level list must be an array");
  this.levelList = Jw(e, Wr), this.selectableLevelList = ex(this.levelList);
  for (var t = 1; t < this.levelList.length; t++) this.levelList[t]._validateWithParentLevel(this.levelList[t - 1]);
  this._tileSearcher = new Kw, this._neighborsCache = new Zw(rx), this._vec = po.create(), this._viewSize = {}
}
Kt.prototype.maxTileSize = function () {
  for (var e = 0, t = 0; t < this.levelList.length; t++) {
    var r = this.levelList[t];
    e = Math.max(e, r.tileWidth, r.tileHeight)
  }
  return e
};
Kt.prototype.levelTiles = function (e, t) {
  var r = this.levelList.indexOf(e),
    i = e.numHorizontalTiles() - 1,
    n = e.numVerticalTiles() - 1;
  t = t || [];
  for (var s = 0; s < Dr.length; s++)
    for (var o = Dr[s], a = 0; a <= i; a++)
      for (var l = 0; l <= n; l++) t.push(new ze(o, a, l, r, this));
  return t
};
Kt.prototype._closestTile = function (e, t) {
  var r = this._vec;
  po.set(r, 0, 0, 1, 1), po.transformMat4(r, r, e.inverseProjection());
  var i = 1 / 0,
    n = null;
  for (var s in mo) {
    var o = mo[s],
      a = 1 - it.dot(o, r);
    a < i && (i = a, n = s)
  }
  for (var l = Math.max(Math.abs(r[0]), Math.abs(r[1]), Math.abs(r[2])) / .5, c = 0; c < 3; c++) r[c] = r[c] / l;
  var h = Br[n];
  Yi(r, 0, -h.x, -h.y);
  var f = this.levelList.indexOf(t),
    u = t.numHorizontalTiles(),
    d = t.numVerticalTiles(),
    p = qn(Math.floor((.5 + r[0]) * u), 0, u - 1),
    g = qn(Math.floor((.5 - r[1]) * d), 0, d - 1);
  return new ze(n, p, g, f, this)
};
Kt.prototype.visibleTiles = function (e, t, r) {
  var i = this._viewSize,
    n = this._tileSearcher;
  if (r = r || [], e.size(i), i.width === 0 || i.height === 0) return r;
  var s = this._closestTile(e, t),
    o = n.search(e, s, r);
  if (!o) throw new Error("Starting tile is not visible");
  return r
};
Kt.Tile = Kt.prototype.Tile = ze;
Kt.type = Kt.prototype.type = "cube";
ze.type = ze.prototype.type = "cube";
var ix = Kt,
  nx = Ht,
  sx = os,
  ox = $f,
  ax = Of,
  lx = la,
  cx = tn.makeLevelList,
  hx = tn.makeSelectableLevelList,
  Pl = gi,
  If = Mr,
  ks = en,
  fx = rn,
  fr = Ye.vec2,
  _o = Ye.vec4,
  ux = 64,
  Ns = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ];

function ge(e, t, r, i) {
  this.x = e, this.y = t, this.z = r, this._geometry = i, this._level = i.levelList[r]
}
ge.prototype.rotX = function () {
  return 0
};
ge.prototype.rotY = function () {
  return 0
};
ge.prototype.centerX = function () {
  var e = this._level.width(),
    t = this._level.tileWidth();
  return (this.x * t + .5 * this.width()) / e - .5
};
ge.prototype.centerY = function () {
  var e = this._level.height(),
    t = this._level.tileHeight();
  return .5 - (this.y * t + .5 * this.height()) / e
};
ge.prototype.scaleX = function () {
  var e = this._level.width();
  return this.width() / e
};
ge.prototype.scaleY = function () {
  var e = this._level.height();
  return this.height() / e
};
ge.prototype.width = function () {
  var e = this._level.width(),
    t = this._level.tileWidth();
  if (this.x === this._level.numHorizontalTiles() - 1) {
    var r = If(e, t);
    return r || t
  } else return t
};
ge.prototype.height = function () {
  var e = this._level.height(),
    t = this._level.tileHeight();
  if (this.y === this._level.numVerticalTiles() - 1) {
    var r = If(e, t);
    return r || t
  } else return t
};
ge.prototype.levelWidth = function () {
  return this._level.width()
};
ge.prototype.levelHeight = function () {
  return this._level.height()
};
ge.prototype.vertices = function (e) {
  e || (e = [fr.create(), fr.create(), fr.create(), fr.create()]);
  var t = this.centerX() - this.scaleX() / 2,
    r = this.centerX() + this.scaleX() / 2,
    i = this.centerY() - this.scaleY() / 2,
    n = this.centerY() + this.scaleY() / 2;
  return fr.set(e[0], t, n), fr.set(e[1], r, n), fr.set(e[2], r, i), fr.set(e[3], t, i), e
};
ge.prototype.parent = function () {
  if (this.z === 0) return null;
  var e = this._geometry,
    t = this.z - 1,
    r = Math.floor(this.x / 2),
    i = Math.floor(this.y / 2);
  return new ge(r, i, t, e)
};
ge.prototype.children = function (e) {
  if (this.z === this._geometry.levelList.length - 1) return null;
  var t = this._geometry,
    r = this.z + 1;
  return e = e || [], e.push(new ge(2 * this.x, 2 * this.y, r, t)), e.push(new ge(2 * this.x, 2 * this.y + 1, r, t)), e.push(new ge(2 * this.x + 1, 2 * this.y, r, t)), e.push(new ge(2 * this.x + 1, 2 * this.y + 1, r, t)), e
};
ge.prototype.neighbors = function () {
  var e = this._geometry,
    t = e._neighborsCache,
    r = t.get(this);
  if (r) return r;
  for (var i = this.x, n = this.y, s = this.z, o = this._level, a = o.numHorizontalTiles() - 1, l = o.numVerticalTiles() - 1, c = [], h = 0; h < Ns.length; h++) {
    var f = Ns[h][0],
      u = Ns[h][1],
      d = i + f,
      p = n + u,
      g = s;
    0 <= d && d <= a && 0 <= p && p <= l && c.push(new ge(d, p, g, e))
  }
  return t.set(this, c), c
};
ge.prototype.hash = function () {
  return sx(this.z, this.y, this.x)
};
ge.prototype.equals = function (e) {
  return this._geometry === e._geometry && this.z === e.z && this.y === e.y && this.x === e.x
};
ge.prototype.cmp = function (e) {
  return ks(this.z, e.z) || ks(this.y, e.y) || ks(this.x, e.x)
};
ge.prototype.str = function () {
  return "FlatTile(" + tile.x + ", " + tile.y + ", " + tile.z + ")"
};

function jr(e) {
  this.constructor.super_.call(this, e), this._width = e.width, this._height = e.height, this._tileWidth = e.tileWidth, this._tileHeight = e.tileHeight
}
nx(jr, lx);
jr.prototype.width = function () {
  return this._width
};
jr.prototype.height = function () {
  return this._height
};
jr.prototype.tileWidth = function () {
  return this._tileWidth
};
jr.prototype.tileHeight = function () {
  return this._tileHeight
};
jr.prototype._validateWithParentLevel = function (e) {
  var t = this.width(),
    r = this.height(),
    i = this.tileWidth(),
    n = this.tileHeight(),
    s = e.width(),
    o = e.height(),
    a = e.tileWidth(),
    l = e.tileHeight();
  if (t % s !== 0) return new Error("Level width must be multiple of parent level: " + t + " vs. " + s);
  if (r % o !== 0) return new Error("Level height must be multiple of parent level: " + r + " vs. " + o);
  if (i % a !== 0) return new Error("Level tile width must be multiple of parent level: " + i + " vs. " + a);
  if (n % l !== 0) return new Error("Level tile height must be multiple of parent level: " + n + " vs. " + l)
};

function Zt(e) {
  if (fx(e) !== "array") throw new Error("Level list must be an array");
  this.levelList = cx(e, jr), this.selectableLevelList = hx(this.levelList);
  for (var t = 1; t < this.levelList.length; t++) this.levelList[t]._validateWithParentLevel(this.levelList[t - 1]);
  this._tileSearcher = new ox, this._neighborsCache = new ax(ux), this._vec = _o.create(), this._viewSize = {}
}
Zt.prototype.maxTileSize = function () {
  for (var e = 0, t = 0; t < this.levelList.length; t++) {
    var r = this.levelList[t];
    e = Math.max(e, r.tileWidth, r.tileHeight)
  }
  return e
};
Zt.prototype.levelTiles = function (e, t) {
  var r = this.levelList.indexOf(e),
    i = e.numHorizontalTiles() - 1,
    n = e.numVerticalTiles() - 1;
  t || (t = []);
  for (var s = 0; s <= i; s++)
    for (var o = 0; o <= n; o++) t.push(new ge(s, o, r, this));
  return t
};
Zt.prototype._closestTile = function (e, t) {
  var r = this._vec;
  _o.set(r, 0, 0, 1, 1), _o.transformMat4(r, r, e.inverseProjection());
  var i = .5 + r[0],
    n = .5 - r[1],
    s = this.levelList.indexOf(t),
    o = t.width(),
    a = t.height(),
    l = t.tileWidth(),
    c = t.tileHeight(),
    h = t.numHorizontalTiles(),
    f = t.numVerticalTiles(),
    u = Pl(Math.floor(i * o / l), 0, h - 1),
    d = Pl(Math.floor(n * a / c), 0, f - 1);
  return new ge(u, d, s, this)
};
Zt.prototype.visibleTiles = function (e, t, r) {
  var i = this._viewSize,
    n = this._tileSearcher;
  if (r = r || [], e.size(i), i.width === 0 || i.height === 0) return r;
  var s = this._closestTile(e, t),
    o = n.search(e, s, r);
  if (!o) throw new Error("Starting tile is not visible");
  return r
};
Zt.Tile = Zt.prototype.Tile = ge;
Zt.type = Zt.prototype.type = "flat";
ge.type = ge.prototype.type = "flat";
var dx = Zt,
  vx = Ht,
  px = os,
  mx = en,
  Cl = tn,
  _x = la,
  yx = rn;

function Fe(e, t) {
  this.z = e, this._geometry = t, this._level = t.levelList[e]
}
Fe.prototype.rotX = function () {
  return 0
};
Fe.prototype.rotY = function () {
  return 0
};
Fe.prototype.centerX = function () {
  return .5
};
Fe.prototype.centerY = function () {
  return .5
};
Fe.prototype.scaleX = function () {
  return 1
};
Fe.prototype.scaleY = function () {
  return 1
};
Fe.prototype.parent = function () {
  return this.z === 0 ? null : new Fe(this.z - 1, this._geometry)
};
Fe.prototype.children = function (e) {
  return this.z === this._geometry.levelList.length - 1 ? null : (e = e || [], e.push(new Fe(this.z + 1, this._geometry)), e)
};
Fe.prototype.neighbors = function () {
  return []
};
Fe.prototype.hash = function () {
  return px(this.z)
};
Fe.prototype.equals = function (e) {
  return this._geometry === e._geometry && this.z === e.z
};
Fe.prototype.cmp = function (e) {
  return mx(this.z, e.z)
};
Fe.prototype.str = function () {
  return "EquirectTile(" + tile.z + ")"
};

function wi(e) {
  this.constructor.super_.call(this, e), this._width = e.width
}
vx(wi, _x);
wi.prototype.width = function () {
  return this._width
};
wi.prototype.height = function () {
  return this._width / 2
};
wi.prototype.tileWidth = function () {
  return this._width
};
wi.prototype.tileHeight = function () {
  return this._width / 2
};

function xr(e) {
  if (yx(e) !== "array") throw new Error("Level list must be an array");
  this.levelList = Cl.makeLevelList(e, wi), this.selectableLevelList = Cl.makeSelectableLevelList(this.levelList)
}
xr.prototype.maxTileSize = function () {
  for (var e = 0, t = 0; t < this.levelList.length; t++) {
    var r = this.levelList[t];
    e = Math.max(e, r.tileWidth, r.tileHeight)
  }
  return e
};
xr.prototype.levelTiles = function (e, t) {
  var r = this.levelList.indexOf(e);
  return t = t || [], t.push(new Fe(r, this)), t
};
xr.prototype.visibleTiles = function (e, t, r) {
  var i = new Fe(this.levelList.indexOf(t), this);
  r = r || [], r.length = 0, r.push(i)
};
xr.Tile = xr.prototype.Tile = Fe;
xr.type = xr.prototype.type = "equirect";
Fe.type = Fe.prototype.type = "equirect";
var gx = xr;

function Ur(e, t, r) {
  return 2 * Math.atan(r * Math.tan(e / 2) / t)
}

function wx(e, t, r) {
  return Ur(e, t, r)
}

function xx(e, t, r) {
  return Ur(e, t, Math.sqrt(t * t + r * r))
}

function bx(e, t, r) {
  return Ur(e, r, t)
}

function Mx(e, t, r) {
  return Ur(e, r, Math.sqrt(t * t + r * r))
}

function Ex(e, t, r) {
  return Ur(e, Math.sqrt(t * t + r * r), t)
}

function Tx(e, t, r) {
  return Ur(e, Math.sqrt(t * t + r * r), r)
}
var Ff = {
  convert: Ur,
  htov: wx,
  htod: xx,
  vtoh: bx,
  vtod: Mx,
  dtoh: Ex,
  dtov: Tx
};

function Sx(e) {
  return typeof e == "number" && isFinite(e)
}
var ca = Sx;

function Px(e) {
  return e.toPrecision(15)
}
var ha = Px;

function Cx() {
  var e = arguments;
  return function (r) {
    for (var i = r, n = 0; n < e.length; n++) {
      var s = e[n];
      i = s.call(null, i)
    }
    return i
  }
}
var Hf = Cx,
  Ax = Ae,
  _r = Ye.mat4,
  je = Ye.vec4,
  kf = ns,
  Xi = Ff,
  Ds = Mr,
  ur = ca,
  zr = gi,
  Rt = ha,
  Rx = Hf,
  zx = Te,
  Lx = 0,
  $x = 0,
  Ox = 0,
  Ix = 0,
  Fx = 0,
  Hx = Math.PI / 4,
  kx = 0,
  Nx = 0,
  Al = 1e-6;

function te(e, t) {
  this._yaw = e && e.yaw != null ? e.yaw : Ox, this._pitch = e && e.pitch != null ? e.pitch : Ix, this._roll = e && e.roll != null ? e.roll : Fx, this._fov = e && e.fov != null ? e.fov : Hx, this._width = e && e.width != null ? e.width : Lx, this._height = e && e.height != null ? e.height : $x, this._projectionCenterX = e && e.projectionCenterX != null ? e.projectionCenterX : kx, this._projectionCenterY = e && e.projectionCenterY != null ? e.projectionCenterY : Nx, this._limiter = t || null, this._projMatrix = _r.create(), this._invProjMatrix = _r.create(), this._frustum = [je.create(), je.create(), je.create(), je.create(), je.create()], this._projectionChanged = !0, this._params = {}, this._fovs = {}, this._tmpVec = je.create(), this._update()
}
Ax(te);
te.prototype.destroy = function () {
  zx(this)
};
te.prototype.yaw = function () {
  return this._yaw
};
te.prototype.pitch = function () {
  return this._pitch
};
te.prototype.roll = function () {
  return this._roll
};
te.prototype.projectionCenterX = function () {
  return this._projectionCenterX
};
te.prototype.projectionCenterY = function () {
  return this._projectionCenterY
};
te.prototype.fov = function () {
  return this._fov
};
te.prototype.width = function () {
  return this._width
};
te.prototype.height = function () {
  return this._height
};
te.prototype.size = function (e) {
  return e = e || {}, e.width = this._width, e.height = this._height, e
};
te.prototype.parameters = function (e) {
  return e = e || {}, e.yaw = this._yaw, e.pitch = this._pitch, e.roll = this._roll, e.fov = this._fov, e
};
te.prototype.limiter = function () {
  return this._limiter
};
te.prototype.setYaw = function (e) {
  this._resetParams(), this._params.yaw = e, this._update(this._params)
};
te.prototype.setPitch = function (e) {
  this._resetParams(), this._params.pitch = e, this._update(this._params)
};
te.prototype.setRoll = function (e) {
  this._resetParams(), this._params.roll = e, this._update(this._params)
};
te.prototype.setFov = function (e) {
  this._resetParams(), this._params.fov = e, this._update(this._params)
};
te.prototype.setProjectionCenterX = function (e) {
  this._resetParams(), this._params.projectionCenterX = e, this._update(this._params)
};
te.prototype.setProjectionCenterY = function (e) {
  this._resetParams(), this._params.projectionCenterY = e, this._update(this._params)
};
te.prototype.offsetYaw = function (e) {
  this.setYaw(this._yaw + e)
};
te.prototype.offsetPitch = function (e) {
  this.setPitch(this._pitch + e)
};
te.prototype.offsetRoll = function (e) {
  this.setRoll(this._roll + e)
};
te.prototype.offsetFov = function (e) {
  this.setFov(this._fov + e)
};
te.prototype.setSize = function (e) {
  this._resetParams(), this._params.width = e.width, this._params.height = e.height, this._update(this._params)
};
te.prototype.setParameters = function (e) {
  this._resetParams(), this._params.yaw = e.yaw, this._params.pitch = e.pitch, this._params.roll = e.roll, this._params.fov = e.fov, this._params.projectionCenterX = e.projectionCenterX, this._params.projectionCenterY = e.projectionCenterY, this._update(this._params)
};
te.prototype.setLimiter = function (e) {
  this._limiter = e || null, this._update()
};
te.prototype._resetParams = function () {
  var e = this._params;
  e.yaw = null, e.pitch = null, e.roll = null, e.fov = null, e.width = null, e.height = null
};
te.prototype._update = function (e) {
  e == null && (this._resetParams(), e = this._params);
  var t = this._yaw,
    r = this._pitch,
    i = this._roll,
    n = this._fov,
    s = this._projectionCenterX,
    o = this._projectionCenterY,
    a = this._width,
    l = this._height;
  if (e.yaw = e.yaw != null ? e.yaw : t, e.pitch = e.pitch != null ? e.pitch : r, e.roll = e.roll != null ? e.roll : i, e.fov = e.fov != null ? e.fov : n, e.width = e.width != null ? e.width : a, e.height = e.height != null ? e.height : l, e.projectionCenterX = e.projectionCenterX != null ? e.projectionCenterX : s, e.projectionCenterY = e.projectionCenterY != null ? e.projectionCenterY : o, this._limiter && (e = this._limiter(e), !e)) throw new Error("Bad view limiter");
  e = this._normalize(e);
  var c = e.yaw,
    h = e.pitch,
    f = e.roll,
    u = e.fov,
    d = e.width,
    p = e.height,
    g = e.projectionCenterX,
    _ = e.projectionCenterY;
  if (!ur(c) || !ur(h) || !ur(f) || !ur(u) || !ur(d) || !ur(p) || !ur(g) || !ur(_)) throw new Error("Bad view - suspect a broken limiter");
  this._yaw = c, this._pitch = h, this._roll = f, this._fov = u, this._width = d, this._height = p, this._projectionCenterX = g, this._projectionCenterY = _, (c !== t || h !== r || f !== i || u !== n || d !== a || p !== l || g !== s || _ !== o) && (this._projectionChanged = !0, this.emit("change")), (d !== a || p !== l) && this.emit("resize")
};
te.prototype._normalize = function (e) {
  this._normalizeCoordinates(e);
  var t = Xi.htov(Math.PI, e.width, e.height),
    r = isNaN(t) ? Math.PI : Math.min(Math.PI, t);
  return e.fov = zr(e.fov, Al, r - Al), e
};
te.prototype._normalizeCoordinates = function (e) {
  return "yaw" in e && (e.yaw = Ds(e.yaw - Math.PI, -2 * Math.PI) + Math.PI), "pitch" in e && (e.pitch = Ds(e.pitch - Math.PI, -2 * Math.PI) + Math.PI), "roll" in e && (e.roll = Ds(e.roll - Math.PI, -2 * Math.PI) + Math.PI), e
};
te.prototype.normalizeToClosest = function (e, t) {
  var r = this._yaw,
    i = this._pitch,
    n = e.yaw,
    s = e.pitch,
    o = n - 2 * Math.PI,
    a = n + 2 * Math.PI;
  Math.abs(o - r) < Math.abs(n - r) ? n = o : Math.abs(a - r) < Math.abs(n - r) && (n = a);
  var l = s - 2 * Math.PI,
    c = s + 2 * Math.PI;
  return Math.abs(l - i) < Math.abs(s - i) ? s = l : Math.abs(l - i) < Math.abs(s - i) && (s = c), t = t || {}, t.yaw = n, t.pitch = s, t
};
te.prototype.updateWithControlParameters = function (e) {
  var t = this._fov,
    r = Xi.vtoh(t, this._width, this._height);
  isNaN(r) && (r = t), this.offsetYaw(e.axisScaledX * r + e.x * 2 * r + e.yaw), this.offsetPitch(e.axisScaledY * t + e.y * 2 * r + e.pitch), this.offsetRoll(-e.roll), this.offsetFov(e.zoom * t)
};
te.prototype._updateProjection = function () {
  var e = this._projMatrix,
    t = this._invProjMatrix,
    r = this._frustum;
  if (this._projectionChanged) {
    var i = this._width,
      n = this._height,
      s = this._fov,
      o = Xi.vtoh(s, i, n),
      a = i / n,
      l = this._projectionCenterX,
      c = this._projectionCenterY;
    if (l !== 0 || c !== 0) {
      var h = Math.atan(l * 2 * Math.tan(o / 2)),
        f = Math.atan(c * 2 * Math.tan(s / 2)),
        u = this._fovs;
      u.leftDegrees = (o / 2 + h) * 180 / Math.PI, u.rightDegrees = (o / 2 - h) * 180 / Math.PI, u.upDegrees = (s / 2 + f) * 180 / Math.PI, u.downDegrees = (s / 2 - f) * 180 / Math.PI, _r.perspectiveFromFieldOfView(e, u, -1, 1)
    } else _r.perspective(e, s, a, -1, 1);
    _r.rotateZ(e, e, this._roll), _r.rotateX(e, e, this._pitch), _r.rotateY(e, e, this._yaw), _r.invert(t, e), this._matrixToFrustum(e, r), this._projectionChanged = !1
  }
};
te.prototype._matrixToFrustum = function (e, t) {
  je.set(t[0], e[3] + e[0], e[7] + e[4], e[11] + e[8], 0), je.set(t[1], e[3] - e[0], e[7] - e[4], e[11] - e[8], 0), je.set(t[2], e[3] + e[1], e[7] + e[5], e[11] + e[9], 0), je.set(t[3], e[3] - e[1], e[7] - e[5], e[11] - e[9], 0), je.set(t[4], e[3] + e[2], e[7] + e[6], e[11] + e[10], 0)
};
te.prototype.projection = function () {
  return this._updateProjection(), this._projMatrix
};
te.prototype.inverseProjection = function () {
  return this._updateProjection(), this._invProjMatrix
};
te.prototype.intersects = function (e) {
  this._updateProjection();
  for (var t = this._frustum, r = this._tmpVec, i = 0; i < t.length; i++) {
    for (var n = t[i], s = !1, o = 0; o < e.length; o++) {
      var a = e[o];
      je.set(r, a[0], a[1], a[2], 0), je.dot(n, r) >= 0 && (s = !0)
    }
    if (!s) return !1
  }
  return !0
};
te.prototype.selectLevel = function (e) {
  for (var t = kf() * this._height, r = Math.tan(.5 * this._fov), i = 0; i < e.length; i++) {
    var n = e[i];
    if (r * n.height() >= t) return n
  }
  return e[e.length - 1]
};
te.prototype.coordinatesToScreen = function (e, t) {
  var r = this._tmpVec;
  t || (t = {});
  var i = this._width,
    n = this._height;
  if (i <= 0 || n <= 0) return t.x = null, t.y = null, null;
  var s = e.yaw,
    o = e.pitch,
    a = Math.sin(s) * Math.cos(o),
    l = -Math.sin(o),
    c = -Math.cos(s) * Math.cos(o);
  if (je.set(r, a, l, c, 1), je.transformMat4(r, r, this.projection()), r[3] >= 0) t.x = i * (r[0] / r[3] + 1) / 2, t.y = n * (1 - r[1] / r[3]) / 2;
  else return t.x = null, t.y = null, null;
  return t
};
te.prototype.screenToCoordinates = function (e, t) {
  var r = this._tmpVec;
  t || (t = {});
  var i = this._width,
    n = this._height,
    s = 2 * e.x / i - 1,
    o = 1 - 2 * e.y / n;
  je.set(r, s, o, 1, 1), je.transformMat4(r, r, this.inverseProjection());
  var a = Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2]);
  return t.yaw = Math.atan2(r[0], -r[2]), t.pitch = Math.acos(r[1] / a) - Math.PI / 2, this._normalizeCoordinates(t), t
};
te.prototype.coordinatesToPerspectiveTransform = function (e, t, r) {
  r = r || "";
  var i = this._height,
    n = this._width,
    s = this._fov,
    o = .5 * i / Math.tan(s / 2),
    a = "";
  return a += "translateX(" + Rt(n / 2) + "px) ", a += "translateY(" + Rt(i / 2) + "px) ", a += "translateX(-50%) translateY(-50%) ", a += "perspective(" + Rt(o) + "px) ", a += "translateZ(" + Rt(o) + "px) ", a += "rotateZ(" + Rt(-this._roll) + "rad) ", a += "rotateX(" + Rt(-this._pitch) + "rad) ", a += "rotateY(" + Rt(this._yaw) + "rad) ", a += "rotateY(" + Rt(-e.yaw) + "rad) ", a += "rotateX(" + Rt(e.pitch) + "rad) ", a += "translateZ(" + Rt(-t) + "px) ", a += r + " ", a
};
te.limit = {
  yaw: function (e, t) {
    return function (i) {
      return i.yaw = zr(i.yaw, e, t), i
    }
  },
  pitch: function (e, t) {
    return function (i) {
      return i.pitch = zr(i.pitch, e, t), i
    }
  },
  roll: function (e, t) {
    return function (i) {
      return i.roll = zr(i.roll, e, t), i
    }
  },
  hfov: function (e, t) {
    return function (i) {
      var n = i.width,
        s = i.height;
      if (n > 0 && s > 0) {
        var o = Xi.htov(e, n, s),
          a = Xi.htov(t, n, s);
        i.fov = zr(i.fov, o, a)
      }
      return i
    }
  },
  vfov: function (e, t) {
    return function (i) {
      return i.fov = zr(i.fov, e, t), i
    }
  },
  resolution: function (e) {
    return function (r) {
      var i = r.height;
      if (i) {
        var n = kf() * i,
          s = 2 * Math.atan(n / e);
        r.fov = zr(r.fov, s, 1 / 0)
      }
      return r
    }
  },
  traditional: function (e, t, r) {
    return r = r ?? t, Rx(te.limit.resolution(e), te.limit.vfov(0, t), te.limit.hfov(0, r), te.limit.pitch(-Math.PI / 2, Math.PI / 2))
  }
};
te.type = te.prototype.type = "rectilinear";
var Dx = te,
  Bx = Ae,
  Wn = Ye.mat4,
  Gi = Ye.vec4,
  Nf = ns,
  Qr = ca,
  jt = gi,
  Vx = Te,
  qx = 0,
  Wx = 0,
  Df = .5,
  Bf = .5,
  jx = 1,
  Ux = [1, 0, 1, 0],
  Yx = [-1, -1, 1, 1],
  Xx = 1e-6;

function fe(e, t) {
  if (!(e && e.mediaAspectRatio != null)) throw new Error("mediaAspectRatio must be defined");
  this._x = e && e.x != null ? e.x : Df, this._y = e && e.y != null ? e.y : Bf, this._zoom = e && e.zoom != null ? e.zoom : jx, this._mediaAspectRatio = e.mediaAspectRatio, this._width = e && e.width != null ? e.width : qx, this._height = e && e.height != null ? e.height : Wx, this._limiter = t || null, this._projMatrix = Wn.create(), this._invProjMatrix = Wn.create(), this._frustum = [0, 0, 0, 0], this._projectionChanged = !0, this._params = {}, this._vec = Gi.create(), this._update()
}
Bx(fe);
fe.prototype.destroy = function () {
  Vx(this)
};
fe.prototype.x = function () {
  return this._x
};
fe.prototype.y = function () {
  return this._y
};
fe.prototype.zoom = function () {
  return this._zoom
};
fe.prototype.mediaAspectRatio = function () {
  return this._mediaAspectRatio
};
fe.prototype.width = function () {
  return this._width
};
fe.prototype.height = function () {
  return this._height
};
fe.prototype.size = function (e) {
  return e = e || {}, e.width = this._width, e.height = this._height, e
};
fe.prototype.parameters = function (e) {
  return e = e || {}, e.x = this._x, e.y = this._y, e.zoom = this._zoom, e.mediaAspectRatio = this._mediaAspectRatio, e
};
fe.prototype.limiter = function () {
  return this._limiter
};
fe.prototype.setX = function (e) {
  this._resetParams(), this._params.x = e, this._update(this._params)
};
fe.prototype.setY = function (e) {
  this._resetParams(), this._params.y = e, this._update(this._params)
};
fe.prototype.setZoom = function (e) {
  this._resetParams(), this._params.zoom = e, this._update(this._params)
};
fe.prototype.offsetX = function (e) {
  this.setX(this._x + e)
};
fe.prototype.offsetY = function (e) {
  this.setY(this._y + e)
};
fe.prototype.offsetZoom = function (e) {
  this.setZoom(this._zoom + e)
};
fe.prototype.setMediaAspectRatio = function (e) {
  this._resetParams(), this._params.mediaAspectRatio = e, this._update(this._params)
};
fe.prototype.setSize = function (e) {
  this._resetParams(), this._params.width = e.width, this._params.height = e.height, this._update(this._params)
};
fe.prototype.setParameters = function (e) {
  this._resetParams(), this._params.x = e.x, this._params.y = e.y, this._params.zoom = e.zoom, this._params.mediaAspectRatio = e.mediaAspectRatio, this._update(this._params)
};
fe.prototype.setLimiter = function (e) {
  this._limiter = e || null, this._update()
};
fe.prototype._resetParams = function () {
  var e = this._params;
  e.x = null, e.y = null, e.zoom = null, e.mediaAspectRatio = null, e.width = null, e.height = null
};
fe.prototype._update = function (e) {
  e == null && (this._resetParams(), e = this._params);
  var t = this._x,
    r = this._y,
    i = this._zoom,
    n = this._mediaAspectRatio,
    s = this._width,
    o = this._height;
  if (e.x = e.x != null ? e.x : t, e.y = e.y != null ? e.y : r, e.zoom = e.zoom != null ? e.zoom : i, e.mediaAspectRatio = e.mediaAspectRatio != null ? e.mediaAspectRatio : n, e.width = e.width != null ? e.width : s, e.height = e.height != null ? e.height : o, this._limiter && (e = this._limiter(e), !e)) throw new Error("Bad view limiter");
  var a = e.x,
    l = e.y,
    c = e.zoom,
    h = e.mediaAspectRatio,
    f = e.width,
    u = e.height;
  if (!Qr(a) || !Qr(l) || !Qr(c) || !Qr(h) || !Qr(f) || !Qr(u)) throw new Error("Bad view - suspect a broken limiter");
  c = jt(c, Xx, 1 / 0), this._x = a, this._y = l, this._zoom = c, this._mediaAspectRatio = h, this._width = f, this._height = u, (a !== t || l !== r || c !== i || h !== n || f !== s || u !== o) && (this._projectionChanged = !0, this.emit("change")), (f !== s || u !== o) && this.emit("resize")
};
fe.prototype._zoomX = function () {
  return this._zoom
};
fe.prototype._zoomY = function () {
  var e = this._mediaAspectRatio,
    t = this._width / this._height,
    r = this._zoom,
    i = r * e / t;
  return isNaN(i) && (i = r), i
};
fe.prototype.updateWithControlParameters = function (e) {
  var t = this.zoom(),
    r = this._zoomX(),
    i = this._zoomY();
  this.offsetX(e.axisScaledX * r + e.x * t), this.offsetY(e.axisScaledY * i + e.y * t), this.offsetZoom(e.zoom * t)
};
fe.prototype._updateProjection = function () {
  var e = this._projMatrix,
    t = this._invProjMatrix,
    r = this._frustum;
  if (this._projectionChanged) {
    var i = this._x,
      n = this._y,
      s = this._zoomX(),
      o = this._zoomY(),
      a = r[0] = .5 - n + .5 * o,
      l = r[1] = i - .5 + .5 * s,
      c = r[2] = .5 - n - .5 * o,
      h = r[3] = i - .5 - .5 * s;
    Wn.ortho(e, h, l, c, a, -1, 1), Wn.invert(t, e), this._projectionChanged = !1
  }
};
fe.prototype.projection = function () {
  return this._updateProjection(), this._projMatrix
};
fe.prototype.inverseProjection = function () {
  return this._updateProjection(), this._invProjMatrix
};
fe.prototype.intersects = function (e) {
  this._updateProjection();
  for (var t = this._frustum, r = 0; r < t.length; r++) {
    for (var i = t[r], n = Ux[r], s = Yx[r], o = !1, a = 0; a < e.length; a++) {
      var l = e[a];
      if (s < 0 && l[n] < i || s > 0 && l[n] > i) {
        o = !0;
        break
      }
    }
    if (!o) return !1
  }
  return !0
};
fe.prototype.selectLevel = function (e) {
  for (var t = Nf() * this.width(), r = this._zoom, i = 0; i < e.length; i++) {
    var n = e[i];
    if (r * n.width() >= t) return n
  }
  return e[e.length - 1]
};
fe.prototype.coordinatesToScreen = function (e, t) {
  var r = this._vec;
  t || (t = {});
  var i = this._width,
    n = this._height;
  if (i <= 0 || n <= 0) return t.x = null, t.y = null, null;
  var s = e && e.x != null ? e.x : Df,
    o = e && e.y != null ? e.y : Bf;
  Gi.set(r, s - .5, .5 - o, -1, 1), Gi.transformMat4(r, r, this.projection());
  for (var a = 0; a < 3; a++) r[a] /= r[3];
  return t.x = i * (r[0] + 1) / 2, t.y = n * (1 - r[1]) / 2, t
};
fe.prototype.screenToCoordinates = function (e, t) {
  var r = this._vec;
  t || (t = {});
  var i = this._width,
    n = this._height,
    s = 2 * e.x / i - 1,
    o = 1 - 2 * e.y / n;
  return Gi.set(r, s, o, 1, 1), Gi.transformMat4(r, r, this.inverseProjection()), t.x = .5 + r[0], t.y = .5 - r[1], t
};
fe.limit = {
  x: function (e, t) {
    return function (i) {
      return i.x = jt(i.x, e, t), i
    }
  },
  y: function (e, t) {
    return function (i) {
      return i.y = jt(i.y, e, t), i
    }
  },
  zoom: function (e, t) {
    return function (i) {
      return i.zoom = jt(i.zoom, e, t), i
    }
  },
  resolution: function (e) {
    return function (r) {
      if (r.width <= 0 || r.height <= 0) return r;
      var i = r.width,
        n = Nf() * i / e;
      return r.zoom = jt(r.zoom, n, 1 / 0), r
    }
  },
  visibleX: function (e, t) {
    return function (i) {
      var n = t - e;
      i.zoom > n && (i.zoom = n);
      var s = e + .5 * i.zoom,
        o = t - .5 * i.zoom;
      return i.x = jt(i.x, s, o), i
    }
  },
  visibleY: function (e, t) {
    return function (i) {
      if (i.width <= 0 || i.height <= 0) return i;
      var n = i.width / i.height,
        s = n / i.mediaAspectRatio,
        o = (t - e) * s;
      i.zoom > o && (i.zoom = o);
      var a = e + .5 * i.zoom / s,
        l = t - .5 * i.zoom / s;
      return i.y = jt(i.y, a, l), i
    }
  },
  letterbox: function () {
    return function (t) {
      if (t.width <= 0 || t.height <= 0) return t;
      var r = t.width / t.height,
        i = 1,
        n = r / t.mediaAspectRatio;
      t.mediaAspectRatio >= r && (t.zoom = Math.min(t.zoom, i)), t.mediaAspectRatio <= r && (t.zoom = Math.min(t.zoom, n));
      var s, o;
      t.zoom > i ? s = o = .5 : (s = 0 + .5 * t.zoom / i, o = 1 - .5 * t.zoom / i);
      var a, l;
      return t.zoom > n ? a = l = .5 : (a = 0 + .5 * t.zoom / n, l = 1 - .5 * t.zoom / n), t.x = jt(t.x, s, o), t.y = jt(t.y, a, l), t
    }
  }
};
fe.type = fe.prototype.type = "flat";
var Gx = fe,
  Kx = eh,
  Zx = Mr;

function nn(e) {
  this._concurrency = e && e.concurrency || 1, this._paused = e && !!e.paused || !1, this._pool = [];
  for (var t = 0; t < this._concurrency; t++) this._pool.push(new Kx(e));
  this._next = 0
}
nn.prototype.length = function () {
  for (var e = 0, t = 0; t < this._pool.length; t++) e += this._pool[t].length();
  return e
};
nn.prototype.push = function (e, t) {
  var r = this._next,
    i = this._pool[r].push(e, t);
  return this._next = Zx(this._next + 1, this._concurrency), i
};
nn.prototype.pause = function () {
  if (!this._paused) {
    this._paused = !0;
    for (var e = 0; e < this._concurrency; e++) this._pool[e].pause()
  }
};
nn.prototype.resume = function () {
  if (this._paused) {
    this._paused = !1;
    for (var e = 0; e < this._concurrency; e++) this._pool[e].resume()
  }
};
var Qx = nn;

function Jx() { }
var sn = Jx,
  eb = sn;

function tb() {
  var e = Array.prototype.slice.call(arguments, 0);
  return function () {
    var r = e.slice(0),
      i = null,
      n = null,
      s = arguments.length ? Array.prototype.slice.call(arguments, 0, arguments.length - 1) : [],
      o = arguments.length ? arguments[arguments.length - 1] : eb;

    function a() {
      var c = arguments[0];
      if (c) {
        i = n = null, o.apply(null, arguments);
        return
      }
      if (!r.length) {
        i = n = null, o.apply(null, arguments);
        return
      }
      i = r.shift();
      var h = i,
        f = Array.prototype.slice.call(arguments, 1);
      f.push(a);
      var u = i.apply(null, f);
      if (h === i) {
        if (typeof u != "function") throw new Error("chain: chaining on non-cancellable function");
        n = u
      }
    }

    function l() {
      n && n.apply(null, arguments)
    }
    return s.unshift(null), a.apply(null, s), l
  }
}
var fa = tb;

function rb(e, t) {
  var r = null;

  function i() {
    r != null && (r = null, t(null))
  }

  function n() {
    r != null && (clearTimeout(r), r = null, t.apply(null, arguments))
  }
  return r = setTimeout(i, e), n
}
var Vf = rb,
  ib = Ae,
  nb = oh,
  sb = Qx,
  ob = fa,
  ab = Vf,
  Rl = Vr,
  zl = {
    x: "x",
    y: "y",
    z: "z",
    f: "face"
  },
  lb = "bdflru",
  cb = 4,
  hb = 1e4;

function Ki(e, t) {
  t = t || {}, this._loadPool = new sb({
    concurrency: t.concurrency || cb
  }), this._retryDelay = t.retryDelay || hb, this._retryMap = {}, this._sourceFromTile = e
}
ib(Ki);
Ki.prototype.loadAsset = function (e, t, r) {
  var i = this,
    n = this._retryDelay,
    s = this._retryMap,
    o = this._sourceFromTile(t),
    a = o.url,
    l = o.rect,
    c = e.loadImage.bind(e, a, l),
    h = function (_) {
      return i._loadPool.push(c, function (b, S) {
        b ? (b instanceof nb && (s[a] = Rl(), i.emit("networkError", b, t)), _(b, t)) : (delete s[a], _(null, t, S))
      })
    },
    f, u = s[a];
  if (u != null) {
    var d = Rl(),
      p = d - u;
    p < n ? f = n - p : (f = 0, delete s[a])
  }
  var g = ab.bind(null, f);
  return ob(g, h)(r)
};
Ki.fromString = function (e, t) {
  t = t || {};
  var r = t && t.cubeMapPreviewFaceOrder || lb,
    i = t.cubeMapPreviewUrl ? s : n;
  return new Ki(i, t);

  function n(a) {
    var l = e;
    for (var c in zl) {
      var h = zl[c],
        f = fb(c),
        u = a.hasOwnProperty(h) ? a[h] : "";
      l = l.replace(f, u)
    }
    return {
      url: l
    }
  }

  function s(a) {
    return a.z === 0 ? o(a) : n(a)
  }

  function o(a) {
    var l = r.indexOf(a.face) / 6;
    return {
      url: t.cubeMapPreviewUrl,
      rect: {
        x: 0,
        y: l,
        width: 1,
        height: 1 / 6
      }
    }
  }
};

function fb(e) {
  var t = "\\{(" + e + ")\\}";
  return new RegExp(t, "g")
}
var ub = Ki;

function ua(e) {
  this._asset = e
}
ua.prototype.asset = function () {
  return this._asset
};
ua.prototype.loadAsset = function (e, t, r) {
  var i = this,
    n = setTimeout(function () {
      r(null, t, i._asset)
    }, 0);

  function s() {
    clearTimeout(n), r.apply(null, arguments)
  }
  return s
};
var db = ua,
  vb = Uo,
  pb = Ht,
  mb = Ae,
  _b = Te;

function Yr(e) {
  this.constructor.super_.call(this, e), this._timestamp = 0
}
pb(Yr, vb);
mb(Yr);
Yr.prototype.destroy = function () {
  _b(this)
};
Yr.prototype.timestamp = function () {
  return this._timestamp
};
Yr.prototype.isDynamic = function () {
  return !0
};
Yr.prototype.markDirty = function () {
  this._timestamp++, this.emit("change")
};
var yb = Yr,
  ls = Mr,
  gb = 64;

function Er(e) {
  if (e != null && (!isFinite(e) || Math.floor(e) !== e || e < 1)) throw new Error("Map: invalid capacity");
  this._capacity = e || gb, this._keyBuckets = [], this._valBuckets = [];
  for (var t = 0; t < this._capacity; t++) this._keyBuckets.push([]), this._valBuckets.push([]);
  this._size = 0
}
Er.prototype.get = function (e) {
  for (var t = ls(e.hash(), this._capacity), r = this._keyBuckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n)) {
      var s = this._valBuckets[t],
        o = s[i];
      return o
    }
  }
  return null
};
Er.prototype.set = function (e, t) {
  for (var r = ls(e.hash(), this._capacity), i = this._keyBuckets[r], n = this._valBuckets[r], s = 0; s < i.length; s++) {
    var o = i[s];
    if (e.equals(o)) {
      var a = n[s];
      return i[s] = e, n[s] = t, a
    }
  }
  return i.push(e), n.push(t), this._size++, null
};
Er.prototype.del = function (e) {
  for (var t = ls(e.hash(), this._capacity), r = this._keyBuckets[t], i = this._valBuckets[t], n = 0; n < r.length; n++) {
    var s = r[n];
    if (e.equals(s)) {
      for (var o = i[n], a = n; a < r.length - 1; a++) r[a] = r[a + 1], i[a] = i[a + 1];
      return r.length = r.length - 1, i.length = i.length - 1, this._size--, o
    }
  }
  return null
};
Er.prototype.has = function (e) {
  for (var t = ls(e.hash(), this._capacity), r = this._keyBuckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n)) return !0
  }
  return !1
};
Er.prototype.size = function () {
  return this._size
};
Er.prototype.clear = function () {
  for (var e = 0; e < this._capacity; e++) this._keyBuckets[e].length = 0, this._valBuckets[e].length = 0;
  this._size = 0
};
Er.prototype.forEach = function (e) {
  for (var t = 0, r = 0; r < this._capacity; r++)
    for (var i = this._keyBuckets[r], n = this._valBuckets[r], s = 0; s < i.length; s++) e(i[s], n[s]), t += 1;
  return t
};
var wb = Er,
  xb = Mr;

function Tr(e) {
  if (!isFinite(e) || Math.floor(e) !== e || e < 0) throw new Error("LruSet: invalid capacity");
  this._capacity = e, this._elements = new Array(this._capacity), this._start = 0, this._size = 0
}
Tr.prototype._index = function (e) {
  return xb(this._start + e, this._capacity)
};
Tr.prototype.add = function (e) {
  if (this._capacity === 0) return e;
  this.remove(e);
  var t = this._size === this._capacity ? this._elements[this._index(0)] : null;
  return this._elements[this._index(this._size)] = e, this._size < this._capacity ? this._size++ : this._start = this._index(1), t
};
Tr.prototype.remove = function (e) {
  for (var t = 0; t < this._size; t++) {
    var r = this._elements[this._index(t)];
    if (e.equals(r)) {
      for (var i = t; i < this._size - 1; i++) this._elements[this._index(i)] = this._elements[this._index(i + 1)];
      return this._size--, r
    }
  }
  return null
};
Tr.prototype.has = function (e) {
  for (var t = 0; t < this._size; t++)
    if (e.equals(this._elements[this._index(t)])) return !0;
  return !1
};
Tr.prototype.size = function () {
  return this._size
};
Tr.prototype.clear = function () {
  this._elements.length = 0, this._start = 0, this._size = 0
};
Tr.prototype.forEach = function (e) {
  for (var t = 0, r = 0; r < this._size; r++) e(this._elements[this._index(r)]), t += 1;
  return t
};
var bb = Tr;

function Mb(e, t) {
  for (var r in t) r in e || (e[r] = t[r]);
  return e
}
var Dt = Mb,
  Eb = sn;

function Tb(e) {
  return function () {
    var r = arguments.length ? Array.prototype.slice.call(arguments, 0, arguments.length - 1) : [],
      i = arguments.length ? arguments[arguments.length - 1] : Eb,
      n = null,
      s = !1;

    function o() {
      var a = arguments[0];
      !a || s ? i.apply(null, arguments) : n = e.apply(null, r)
    }
    return r.push(o), o(!0),
      function () {
        s = !0, n.apply(null, arguments)
      }
  }
}
var qf = Tb,
  Ll = wb,
  $l = Lf,
  Sb = bb,
  Wf = Ae,
  Pb = Dt,
  Cb = qf,
  Ab = fa,
  Rb = Ht,
  jf = Te,
  Li = typeof MARZIPANODEBUG < "u" && MARZIPANODEBUG.textureStore,
  vt = {
    IDLE: 0,
    START: 1,
    MARK: 2,
    END: 3
  },
  zb = {
    previouslyVisibleCacheSize: 512
  },
  Lb = 0;

function da() { }
Rb(da, Error);

function on(e, t) {
  var r = this,
    i = Lb++;
  r._id = i, r._store = e, r._tile = t, r._asset = null, r._texture = null, r._changeHandler = function () {
    e.emit("textureInvalid", t)
  };
  var n = e.source(),
    s = e.stage(),
    o = n.loadAsset.bind(n),
    a = s.createTexture.bind(s),
    l = Ab(Cb(o), a);
  e.emit("textureStartLoad", t), Li && console.log("loading", i, t), r._cancel = l(s, t, function (c, h, f, u) {
    if (r._cancel = null, c) {
      f && f.destroy(), u && u.destroy(), c instanceof da ? (e.emit("textureCancel", t), Li && console.log("cancel", i, t)) : (e.emit("textureError", t, c), Li && console.log("error", i, t));
      return
    }
    r._texture = u, f.isDynamic() ? (r._asset = f, f.addEventListener("change", r._changeHandler)) : f.destroy(), e.emit("textureLoad", t), Li && console.log("load", i, t)
  })
}
on.prototype.asset = function () {
  return this._asset
};
on.prototype.texture = function () {
  return this._texture
};
on.prototype.destroy = function () {
  var e = this._id,
    t = this._store,
    r = this._tile,
    i = this._asset,
    n = this._texture,
    s = this._cancel;
  if (s) {
    s(new da);
    return
  }
  i && (i.removeEventListener("change", this._changeHandler), i.destroy()), n && n.destroy(), t.emit("textureUnload", r), Li && console.log("unload", e, r), jf(this)
};
Wf(on);

function qe(e, t, r) {
  r = Pb(r || {}, zb), this._source = e, this._stage = t, this._state = vt.IDLE, this._delimCount = 0, this._itemMap = new Ll, this._visible = new $l, this._previouslyVisible = new Sb(r.previouslyVisibleCacheSize), this._pinMap = new Ll, this._newVisible = new $l, this._noLongerVisible = [], this._visibleAgain = [], this._evicted = []
}
Wf(qe);
qe.prototype.destroy = function () {
  this.clear(), jf(this)
};
qe.prototype.stage = function () {
  return this._stage
};
qe.prototype.source = function () {
  return this._source
};
qe.prototype.clear = function () {
  var e = this;
  e._evicted.length = 0, e._itemMap.forEach(function (t) {
    e._evicted.push(t)
  }), e._evicted.forEach(function (t) {
    e._unloadTile(t)
  }), e._itemMap.clear(), e._visible.clear(), e._previouslyVisible.clear(), e._pinMap.clear(), e._newVisible.clear(), e._noLongerVisible.length = 0, e._visibleAgain.length = 0, e._evicted.length = 0
};
qe.prototype.clearNotPinned = function () {
  var e = this;
  e._evicted.length = 0, e._itemMap.forEach(function (t) {
    e._pinMap.has(t) || e._evicted.push(t)
  }), e._evicted.forEach(function (t) {
    e._unloadTile(t)
  }), e._visible.clear(), e._previouslyVisible.clear(), e._evicted.length = 0
};
qe.prototype.startFrame = function () {
  if (this._state !== vt.IDLE && this._state !== vt.START) throw new Error("TextureStore: startFrame called out of sequence");
  this._state = vt.START, this._delimCount++
};
qe.prototype.markTile = function (e) {
  if (this._state !== vt.START && this._state !== vt.MARK) throw new Error("TextureStore: markTile called out of sequence");
  this._state = vt.MARK;
  var t = this._itemMap.get(e),
    r = t && t.texture(),
    i = t && t.asset();
  r && i && r.refresh(e, i), this._newVisible.add(e)
};
qe.prototype.endFrame = function () {
  if (this._state !== vt.START && this._state !== vt.MARK && this._state !== vt.END) throw new Error("TextureStore: endFrame called out of sequence");
  this._state = vt.END, this._delimCount--, this._delimCount || (this._update(), this._state = vt.IDLE)
};
qe.prototype._update = function () {
  var e = this;
  e._noLongerVisible.length = 0, e._visible.forEach(function (r) {
    e._newVisible.has(r) || e._noLongerVisible.push(r)
  }), e._visibleAgain.length = 0, e._newVisible.forEach(function (r) {
    e._previouslyVisible.has(r) && e._visibleAgain.push(r)
  }), e._visibleAgain.forEach(function (r) {
    e._previouslyVisible.remove(r)
  }), e._evicted.length = 0, e._noLongerVisible.forEach(function (r) {
    var i = e._itemMap.get(r),
      n = i && i.texture();
    if (n) {
      var s = e._previouslyVisible.add(r);
      s != null && e._evicted.push(s)
    } else i && e._unloadTile(r)
  }), e._evicted.forEach(function (r) {
    e._pinMap.has(r) || e._unloadTile(r)
  }), e._newVisible.forEach(function (r) {
    var i = e._itemMap.get(r);
    i || e._loadTile(r)
  });
  var t = e._visible;
  e._visible = e._newVisible, e._newVisible = t, e._newVisible.clear(), e._noLongerVisible.length = 0, e._visibleAgain.length = 0, e._evicted.length = 0
};
qe.prototype._loadTile = function (e) {
  if (this._itemMap.has(e)) throw new Error("TextureStore: loading texture already in cache");
  var t = new on(this, e);
  this._itemMap.set(e, t)
};
qe.prototype._unloadTile = function (e) {
  var t = this._itemMap.del(e);
  if (!t) throw new Error("TextureStore: unloading texture not in cache");
  t.destroy()
};
qe.prototype.asset = function (e) {
  var t = this._itemMap.get(e);
  return t ? t.asset() : null
};
qe.prototype.texture = function (e) {
  var t = this._itemMap.get(e);
  return t ? t.texture() : null
};
qe.prototype.pin = function (e) {
  var t = (this._pinMap.get(e) || 0) + 1;
  return this._pinMap.set(e, t), this._itemMap.has(e) || this._loadTile(e), t
};
qe.prototype.unpin = function (e) {
  var t = this._pinMap.get(e);
  if (t) t--, t > 0 ? this._pinMap.set(e, t) : (this._pinMap.del(e), !this._visible.has(e) && !this._previouslyVisible.has(e) && this._unloadTile(e));
  else throw new Error("TextureStore: unpin when not pinned");
  return t
};
qe.prototype.query = function (e) {
  var t = this._itemMap.get(e),
    r = this._pinMap.get(e) || 0;
  return {
    visible: this._visible.has(e),
    previouslyVisible: this._previouslyVisible.has(e),
    hasAsset: t != null && t.asset() != null,
    hasTexture: t != null && t.texture() != null,
    pinned: r !== 0,
    pinCount: r
  }
};
var Uf = qe;

function $b(e, t) {
  for (var r in t) e[r] = t[r];
  return e
}
var Yf = $b,
  Ob = Ae,
  Ib = Yf,
  Fb = Te;

function We(e, t, r, i, n) {
  n = n || {};
  var s = this;
  this._source = e, this._geometry = t, this._view = r, this._textureStore = i, this._effects = n.effects || {}, this._fixedLevelIndex = null, this._viewChangeHandler = function () {
    s.emit("viewChange", s.view())
  }, this._view.addEventListener("change", this._viewChangeHandler), this._textureStoreChangeHandler = function () {
    s.emit("textureStoreChange", s.textureStore())
  }, this._textureStore.addEventListener("textureLoad", this._textureStoreChangeHandler), this._textureStore.addEventListener("textureError", this._textureStoreChangeHandler), this._textureStore.addEventListener("textureInvalid", this._textureStoreChangeHandler)
}
Ob(We);
We.prototype.destroy = function () {
  this._view.removeEventListener("change", this._viewChangeHandler), this._textureStore.removeEventListener("textureLoad", this._textureStoreChangeHandler), this._textureStore.removeEventListener("textureError", this._textureStoreChangeHandler), this._textureStore.removeEventListener("textureInvalid", this._textureStoreChangeHandler), Fb(this)
};
We.prototype.source = function () {
  return this._source
};
We.prototype.geometry = function () {
  return this._geometry
};
We.prototype.view = function () {
  return this._view
};
We.prototype.textureStore = function () {
  return this._textureStore
};
We.prototype.effects = function () {
  return this._effects
};
We.prototype.setEffects = function (e) {
  this._effects = e, this.emit("effectsChange", this._effects)
};
We.prototype.mergeEffects = function (e) {
  Ib(this._effects, e), this.emit("effectsChange", this._effects)
};
We.prototype.fixedLevel = function () {
  return this._fixedLevelIndex
};
We.prototype.setFixedLevel = function (e) {
  if (e !== this._fixedLevelIndex) {
    if (e != null && (e >= this._geometry.levelList.length || e < 0)) throw new Error("Level index out of range: " + e);
    this._fixedLevelIndex = e, this.emit("fixedLevelChange", this._fixedLevelIndex)
  }
};
We.prototype._selectLevel = function () {
  var e;
  return this._fixedLevelIndex != null ? e = this._geometry.levelList[this._fixedLevelIndex] : e = this._view.selectLevel(this._geometry.selectableLevelList), e
};
We.prototype.visibleTiles = function (e) {
  var t = this._selectLevel();
  return this._geometry.visibleTiles(this._view, t, e)
};
We.prototype.pinLevel = function (e) {
  for (var t = this._geometry.levelList[e], r = this._geometry.levelTiles(t), i = 0; i < r.length; i++) this._textureStore.pin(r[i])
};
We.prototype.unpinLevel = function (e) {
  for (var t = this._geometry.levelList[e], r = this._geometry.levelTiles(t), i = 0; i < r.length; i++) this._textureStore.unpin(r[i])
};
We.prototype.pinFirstLevel = function () {
  return this.pinLevel(0)
};
We.prototype.unpinFirstLevel = function () {
  return this.unpinLevel(0)
};
var Xf = We,
  Hb = Ae,
  kb = Te;

function Sr(e) {
  var t = this;
  this._stage = e, this._running = !1, this._rendering = !1, this._requestHandle = null, this._boundLoop = this._loop.bind(this), this._renderInvalidHandler = function () {
    t._rendering || t.renderOnNextFrame()
  }, this._stage.addEventListener("renderInvalid", this._renderInvalidHandler)
}
Hb(Sr);
Sr.prototype.destroy = function () {
  this.stop(), this._stage.removeEventListener("renderInvalid", this._renderInvalidHandler), kb(this)
};
Sr.prototype.stage = function () {
  return this._stage
};
Sr.prototype.start = function () {
  this._running = !0, this.renderOnNextFrame()
};
Sr.prototype.stop = function () {
  this._requestHandle && (window.cancelAnimationFrame(this._requestHandle), this._requestHandle = null), this._running = !1
};
Sr.prototype.renderOnNextFrame = function () {
  this._running && !this._requestHandle && (this._requestHandle = window.requestAnimationFrame(this._boundLoop))
};
Sr.prototype._loop = function () {
  if (!this._running) throw new Error("Render loop running while in stopped state");
  this._requestHandle = null, this._rendering = !0, this.emit("beforeRender"), this._rendering = !1, this._stage.render(), this.emit("afterRender")
};
var Gf = Sr;

function Qt() {
  this.velocity = null, this.friction = null, this.offset = null
}
Qt.equals = function (e, t) {
  return e.velocity === t.velocity && e.friction === t.friction && e.offset === t.offset
};
Qt.prototype.equals = function (e) {
  return Qt.equals(this, e)
};
Qt.prototype.update = function (e, t) {
  e.offset && (this.offset = this.offset || 0, this.offset += e.offset);
  var r = this.offsetFromVelocity(t);
  r && (this.offset = this.offset || 0, this.offset += r), this.velocity = e.velocity, this.friction = e.friction
};
Qt.prototype.reset = function () {
  this.velocity = null, this.friction = null, this.offset = null
};
Qt.prototype.velocityAfter = function (e) {
  return this.velocity ? this.friction ? Nb(this.velocity, this.friction * e) : this.velocity : null
};
Qt.prototype.offsetFromVelocity = function (e) {
  e = Math.min(e, this.nullVelocityTime());
  var t = this.velocityAfter(e),
    r = (this.velocity + t) / 2;
  return r * e
};
Qt.prototype.nullVelocityTime = function () {
  return this.velocity == null ? 0 : this.velocity && !this.friction ? 1 / 0 : Math.abs(this.velocity / this.friction)
};

function Nb(e, t) {
  return e < 0 ? Math.min(0, e + t) : e > 0 ? Math.max(0, e - t) : 0
}
var rr = Qt,
  Db = Ae,
  Bb = rr,
  Vb = Te;

function xi(e, t, r, i, n) {
  if (!e) throw new Error("KeyControlMethod: keyCode must be defined");
  if (!t) throw new Error("KeyControlMethod: parameter must be defined");
  if (!r) throw new Error("KeyControlMethod: velocity must be defined");
  if (!i) throw new Error("KeyControlMethod: friction must be defined");
  n = n || document, this._keyCode = e, this._parameter = t, this._velocity = r, this._friction = i, this._element = n, this._keydownHandler = this._handlePress.bind(this), this._keyupHandler = this._handleRelease.bind(this), this._blurHandler = this._handleBlur.bind(this), this._element.addEventListener("keydown", this._keydownHandler), this._element.addEventListener("keyup", this._keyupHandler), window.addEventListener("blur", this._blurHandler), this._dynamics = new Bb, this._pressing = !1
}
Db(xi);
xi.prototype.destroy = function () {
  this._element.removeEventListener("keydown", this._keydownHandler), this._element.removeEventListener("keyup", this._keyupHandler), window.removeEventListener("blur", this._blurHandler), Vb(this)
};
xi.prototype._handlePress = function (e) {
  e.keyCode === this._keyCode && (this._pressing = !0, this._dynamics.velocity = this._velocity, this._dynamics.friction = 0, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("active"))
};
xi.prototype._handleRelease = function (e) {
  e.keyCode === this._keyCode && (this._pressing && (this._dynamics.friction = this._friction, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("inactive")), this._pressing = !1)
};
xi.prototype._handleBlur = function () {
  this._dynamics.velocity = 0, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("inactive"), this._pressing = !1
};
var Kf = xi,
  Zf = {
    exports: {}
  };
/*! Hammer.JS - v2.0.4 - 2014-09-28
* http://hammerjs.github.io/
*
* Copyright (c) 2014 Jorik Tangelder;
* Licensed under the MIT license */
(function (e) {
  (function (t, r, i, n) {
    var s = ["", "webkit", "moz", "MS", "ms", "o"],
      o = r.createElement("div"),
      a = "function",
      l = Math.round,
      c = Math.abs,
      h = Date.now;

    function f(v, m, x) {
      return setTimeout(b(v, x), m)
    }

    function u(v, m, x) {
      return Array.isArray(v) ? (d(v, x[m], x), !0) : !1
    }

    function d(v, m, x) {
      var A;
      if (v)
        if (v.forEach) v.forEach(m, x);
        else if (v.length !== n)
          for (A = 0; A < v.length;) m.call(x, v[A], A, v), A++;
        else
          for (A in v) v.hasOwnProperty(A) && m.call(x, v[A], A, v)
    }

    function p(v, m, x) {
      for (var A = Object.keys(m), k = 0; k < A.length;)(!x || x && v[A[k]] === n) && (v[A[k]] = m[A[k]]), k++;
      return v
    }

    function g(v, m) {
      return p(v, m, !0)
    }

    function _(v, m, x) {
      var A = m.prototype,
        k;
      k = v.prototype = Object.create(A), k.constructor = v, k._super = A, x && p(k, x)
    }

    function b(v, m) {
      return function () {
        return v.apply(m, arguments)
      }
    }

    function S(v, m) {
      return typeof v == a ? v.apply(m && m[0] || n, m) : v
    }

    function R(v, m) {
      return v === n ? m : v
    }

    function P(v, m, x) {
      d(Q(m), function (A) {
        v.addEventListener(A, x, !1)
      })
    }

    function H(v, m, x) {
      d(Q(m), function (A) {
        v.removeEventListener(A, x, !1)
      })
    }

    function O(v, m) {
      for (; v;) {
        if (v == m) return !0;
        v = v.parentNode
      }
      return !1
    }

    function Y(v, m) {
      return v.indexOf(m) > -1
    }

    function Q(v) {
      return v.trim().split(/\s+/g)
    }

    function ee(v, m, x) {
      if (v.indexOf && !x) return v.indexOf(m);
      for (var A = 0; A < v.length;) {
        if (x && v[A][x] == m || !x && v[A] === m) return A;
        A++
      }
      return -1
    }

    function J(v) {
      return Array.prototype.slice.call(v, 0)
    }

    function U(v, m, x) {
      for (var A = [], k = [], ie = 0; ie < v.length;) {
        var pe = m ? v[ie][m] : v[ie];
        ee(k, pe) < 0 && A.push(v[ie]), k[ie] = pe, ie++
      }
      return x && (m ? A = A.sort(function (et, Ct) {
        return et[m] > Ct[m]
      }) : A = A.sort()), A
    }

    function se(v, m) {
      for (var x, A, k = m[0].toUpperCase() + m.slice(1), ie = 0; ie < s.length;) {
        if (x = s[ie], A = x ? x + k : m, A in v) return A;
        ie++
      }
      return n
    }
    var ae = 1;

    function K() {
      return ae++
    }

    function E(v) {
      var m = v.ownerDocument;
      return m.defaultView || m.parentWindow
    }
    var be = /mobile|tablet|ip(ad|hone|od)|android/i,
      Z = "ontouchstart" in t,
      he = se(t, "PointerEvent") !== n,
      Ie = Z && be.test(navigator.userAgent),
      Re = "touch",
      ct = "pen",
      Ne = "mouse",
      nr = "kinect",
      sr = 25,
      He = 1,
      Pe = 2,
      T = 4,
      N = 8,
      D = 1,
      j = 2,
      ue = 4,
      y = 8,
      w = 16,
      M = j | ue,
      C = y | w,
      z = M | C,
      $ = ["x", "y"],
      V = ["clientX", "clientY"];

    function I(v, m) {
      var x = this;
      this.manager = v, this.callback = m, this.element = v.element, this.target = v.options.inputTarget, this.domHandler = function (A) {
        S(v.options.enable, [v]) && x.handler(A)
      }, this.init()
    }
    I.prototype = {
      handler: function () { },
      init: function () {
        this.evEl && P(this.element, this.evEl, this.domHandler), this.evTarget && P(this.target, this.evTarget, this.domHandler), this.evWin && P(E(this.element), this.evWin, this.domHandler)
      },
      destroy: function () {
        this.evEl && H(this.element, this.evEl, this.domHandler), this.evTarget && H(this.target, this.evTarget, this.domHandler), this.evWin && H(E(this.element), this.evWin, this.domHandler)
      }
    };

    function B(v) {
      var m, x = v.options.inputClass;
      return x ? m = x : he ? m = ds : Ie ? m = dn : Z ? m = vs : m = Je, new m(v, F)
    }

    function F(v, m, x) {
      var A = x.pointers.length,
        k = x.changedPointers.length,
        ie = m & He && A - k === 0,
        pe = m & (T | N) && A - k === 0;
      x.isFirst = !!ie, x.isFinal = !!pe, ie && (v.session = {}), x.eventType = m, X(v, x), v.emit("hammer.input", x), v.recognize(x), v.session.prevInput = x
    }

    function X(v, m) {
      var x = v.session,
        A = m.pointers,
        k = A.length;
      x.firstInput || (x.firstInput = re(m)), k > 1 && !x.firstMultiple ? x.firstMultiple = re(m) : k === 1 && (x.firstMultiple = !1);
      var ie = x.firstInput,
        pe = x.firstMultiple,
        Xe = pe ? pe.center : ie.center,
        et = m.center = le(A);
      m.timeStamp = h(), m.deltaTime = m.timeStamp - ie.timeStamp, m.angle = Ze(Xe, et), m.distance = Se(Xe, et), q(x, m), m.offsetDirection = ve(m.deltaX, m.deltaY), m.scale = pe ? hn(pe.pointers, A) : 1, m.rotation = pe ? or(pe.pointers, A) : 0, G(x, m);
      var Ct = v.element;
      O(m.srcEvent.target, Ct) && (Ct = m.srcEvent.target), m.target = Ct
    }

    function q(v, m) {
      var x = m.center,
        A = v.offsetDelta || {},
        k = v.prevDelta || {},
        ie = v.prevInput || {};
      (m.eventType === He || ie.eventType === T) && (k = v.prevDelta = {
        x: ie.deltaX || 0,
        y: ie.deltaY || 0
      }, A = v.offsetDelta = {
        x: x.x,
        y: x.y
      }), m.deltaX = k.x + (x.x - A.x), m.deltaY = k.y + (x.y - A.y)
    }

    function G(v, m) {
      var x = v.lastInterval || m,
        A = m.timeStamp - x.timeStamp,
        k, ie, pe, Xe;
      if (m.eventType != N && (A > sr || x.velocity === n)) {
        var et = x.deltaX - m.deltaX,
          Ct = x.deltaY - m.deltaY,
          Kr = Me(A, et, Ct);
        ie = Kr.x, pe = Kr.y, k = c(Kr.x) > c(Kr.y) ? Kr.x : Kr.y, Xe = ve(et, Ct), v.lastInterval = m
      } else k = x.velocity, ie = x.velocityX, pe = x.velocityY, Xe = x.direction;
      m.velocity = k, m.velocityX = ie, m.velocityY = pe, m.direction = Xe
    }

    function re(v) {
      for (var m = [], x = 0; x < v.pointers.length;) m[x] = {
        clientX: l(v.pointers[x].clientX),
        clientY: l(v.pointers[x].clientY)
      }, x++;
      return {
        timeStamp: h(),
        pointers: m,
        center: le(m),
        deltaX: v.deltaX,
        deltaY: v.deltaY
      }
    }

    function le(v) {
      var m = v.length;
      if (m === 1) return {
        x: l(v[0].clientX),
        y: l(v[0].clientY)
      };
      for (var x = 0, A = 0, k = 0; k < m;) x += v[k].clientX, A += v[k].clientY, k++;
      return {
        x: l(x / m),
        y: l(A / m)
      }
    }

    function Me(v, m, x) {
      return {
        x: m / v || 0,
        y: x / v || 0
      }
    }

    function ve(v, m) {
      return v === m ? D : c(v) >= c(m) ? v > 0 ? j : ue : m > 0 ? y : w
    }

    function Se(v, m, x) {
      x || (x = $);
      var A = m[x[0]] - v[x[0]],
        k = m[x[1]] - v[x[1]];
      return Math.sqrt(A * A + k * k)
    }

    function Ze(v, m, x) {
      x || (x = $);
      var A = m[x[0]] - v[x[0]],
        k = m[x[1]] - v[x[1]];
      return Math.atan2(k, A) * 180 / Math.PI
    }

    function or(v, m) {
      return Ze(m[1], m[0], V) - Ze(v[1], v[0], V)
    }

    function hn(v, m) {
      return Se(m[0], m[1], V) / Se(v[0], v[1], V)
    }
    var Pr = {
      mousedown: He,
      mousemove: Pe,
      mouseup: T
    },
      fn = "mousedown",
      Qe = "mousemove mouseup";

    function Je() {
      this.evEl = fn, this.evWin = Qe, this.allow = !0, this.pressed = !1, I.apply(this, arguments)
    }
    _(Je, I, {
      handler: function (m) {
        var x = Pr[m.type];
        x & He && m.button === 0 && (this.pressed = !0), x & Pe && m.which !== 1 && (x = T), !(!this.pressed || !this.allow) && (x & T && (this.pressed = !1), this.callback(this.manager, x, {
          pointers: [m],
          changedPointers: [m],
          pointerType: Ne,
          srcEvent: m
        }))
      }
    });
    var un = {
      pointerdown: He,
      pointermove: Pe,
      pointerup: T,
      pointercancel: N,
      pointerout: N
    },
      xu = {
        2: Re,
        3: ct,
        4: Ne,
        5: nr
      },
      va = "pointerdown",
      pa = "pointermove pointerup pointercancel";
    t.MSPointerEvent && (va = "MSPointerDown", pa = "MSPointerMove MSPointerUp MSPointerCancel");

    function ds() {
      this.evEl = va, this.evWin = pa, I.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
    }
    _(ds, I, {
      handler: function (m) {
        var x = this.store,
          A = !1,
          k = m.type.toLowerCase().replace("ms", ""),
          ie = un[k],
          pe = xu[m.pointerType] || m.pointerType,
          Xe = pe == Re,
          et = ee(x, m.pointerId, "pointerId");
        ie & He && (m.button === 0 || Xe) ? et < 0 && (x.push(m), et = x.length - 1) : ie & (T | N) && (A = !0), !(et < 0) && (x[et] = m, this.callback(this.manager, ie, {
          pointers: x,
          changedPointers: [m],
          pointerType: pe,
          srcEvent: m
        }), A && x.splice(et, 1))
      }
    });
    var bu = {
      touchstart: He,
      touchmove: Pe,
      touchend: T,
      touchcancel: N
    },
      Mu = "touchstart",
      Eu = "touchstart touchmove touchend touchcancel";

    function ma() {
      this.evTarget = Mu, this.evWin = Eu, this.started = !1, I.apply(this, arguments)
    }
    _(ma, I, {
      handler: function (m) {
        var x = bu[m.type];
        if (x === He && (this.started = !0), !!this.started) {
          var A = Tu.call(this, m, x);
          x & (T | N) && A[0].length - A[1].length === 0 && (this.started = !1), this.callback(this.manager, x, {
            pointers: A[0],
            changedPointers: A[1],
            pointerType: Re,
            srcEvent: m
          })
        }
      }
    });

    function Tu(v, m) {
      var x = J(v.touches),
        A = J(v.changedTouches);
      return m & (T | N) && (x = U(x.concat(A), "identifier", !0)), [x, A]
    }
    var Su = {
      touchstart: He,
      touchmove: Pe,
      touchend: T,
      touchcancel: N
    },
      Pu = "touchstart touchmove touchend touchcancel";

    function dn() {
      this.evTarget = Pu, this.targetIds = {}, I.apply(this, arguments)
    }
    _(dn, I, {
      handler: function (m) {
        var x = Su[m.type],
          A = Cu.call(this, m, x);
        A && this.callback(this.manager, x, {
          pointers: A[0],
          changedPointers: A[1],
          pointerType: Re,
          srcEvent: m
        })
      }
    });

    function Cu(v, m) {
      var x = J(v.touches),
        A = this.targetIds;
      if (m & (He | Pe) && x.length === 1) return A[x[0].identifier] = !0, [x, x];
      var k, ie, pe = J(v.changedTouches),
        Xe = [],
        et = this.target;
      if (ie = x.filter(function (Ct) {
        return O(Ct.target, et)
      }), m === He)
        for (k = 0; k < ie.length;) A[ie[k].identifier] = !0, k++;
      for (k = 0; k < pe.length;) A[pe[k].identifier] && Xe.push(pe[k]), m & (T | N) && delete A[pe[k].identifier], k++;
      if (Xe.length) return [U(ie.concat(Xe), "identifier", !0), Xe]
    }

    function vs() {
      I.apply(this, arguments);
      var v = b(this.handler, this);
      this.touch = new dn(this.manager, v), this.mouse = new Je(this.manager, v)
    }
    _(vs, I, {
      handler: function (m, x, A) {
        var k = A.pointerType == Re,
          ie = A.pointerType == Ne;
        if (k) this.mouse.allow = !1;
        else if (ie && !this.mouse.allow) return;
        x & (T | N) && (this.mouse.allow = !0), this.callback(m, x, A)
      },
      destroy: function () {
        this.touch.destroy(), this.mouse.destroy()
      }
    });
    var _a = se(o.style, "touchAction"),
      ya = _a !== n,
      ga = "compute",
      wa = "auto",
      ps = "manipulation",
      Ei = "none",
      Ti = "pan-x",
      Si = "pan-y";

    function ms(v, m) {
      this.manager = v, this.set(m)
    }
    ms.prototype = {
      set: function (v) {
        v == ga && (v = this.compute()), ya && (this.manager.element.style[_a] = v), this.actions = v.toLowerCase().trim()
      },
      update: function () {
        this.set(this.manager.options.touchAction)
      },
      compute: function () {
        var v = [];
        return d(this.manager.recognizers, function (m) {
          S(m.options.enable, [m]) && (v = v.concat(m.getTouchAction()))
        }), Au(v.join(" "))
      },
      preventDefaults: function (v) {
        if (!ya) {
          var m = v.srcEvent,
            x = v.offsetDirection;
          if (this.manager.session.prevented) {
            m.preventDefault();
            return
          }
          var A = this.actions,
            k = Y(A, Ei),
            ie = Y(A, Si),
            pe = Y(A, Ti);
          if (k || ie && x & M || pe && x & C) return this.preventSrc(m)
        }
      },
      preventSrc: function (v) {
        this.manager.session.prevented = !0, v.preventDefault()
      }
    };

    function Au(v) {
      if (Y(v, Ei)) return Ei;
      var m = Y(v, Ti),
        x = Y(v, Si);
      return m && x ? Ti + " " + Si : m || x ? m ? Ti : Si : Y(v, ps) ? ps : wa
    }
    var vn = 1,
      ht = 2,
      Gr = 4,
      ar = 8,
      Vt = ar,
      Pi = 16,
      Pt = 32;

    function qt(v) {
      this.id = K(), this.manager = null, this.options = g(v || {}, this.defaults), this.options.enable = R(this.options.enable, !0), this.state = vn, this.simultaneous = {}, this.requireFail = []
    }
    qt.prototype = {
      defaults: {},
      set: function (v) {
        return p(this.options, v), this.manager && this.manager.touchAction.update(), this
      },
      recognizeWith: function (v) {
        if (u(v, "recognizeWith", this)) return this;
        var m = this.simultaneous;
        return v = pn(v, this), m[v.id] || (m[v.id] = v, v.recognizeWith(this)), this
      },
      dropRecognizeWith: function (v) {
        return u(v, "dropRecognizeWith", this) ? this : (v = pn(v, this), delete this.simultaneous[v.id], this)
      },
      requireFailure: function (v) {
        if (u(v, "requireFailure", this)) return this;
        var m = this.requireFail;
        return v = pn(v, this), ee(m, v) === -1 && (m.push(v), v.requireFailure(this)), this
      },
      dropRequireFailure: function (v) {
        if (u(v, "dropRequireFailure", this)) return this;
        v = pn(v, this);
        var m = ee(this.requireFail, v);
        return m > -1 && this.requireFail.splice(m, 1), this
      },
      hasRequireFailures: function () {
        return this.requireFail.length > 0
      },
      canRecognizeWith: function (v) {
        return !!this.simultaneous[v.id]
      },
      emit: function (v) {
        var m = this,
          x = this.state;

        function A(k) {
          m.manager.emit(m.options.event + (k ? Ru(x) : ""), v)
        }
        x < ar && A(!0), A(), x >= ar && A(!0)
      },
      tryEmit: function (v) {
        if (this.canEmit()) return this.emit(v);
        this.state = Pt
      },
      canEmit: function () {
        for (var v = 0; v < this.requireFail.length;) {
          if (!(this.requireFail[v].state & (Pt | vn))) return !1;
          v++
        }
        return !0
      },
      recognize: function (v) {
        var m = p({}, v);
        if (!S(this.options.enable, [this, m])) {
          this.reset(), this.state = Pt;
          return
        }
        this.state & (Vt | Pi | Pt) && (this.state = vn), this.state = this.process(m), this.state & (ht | Gr | ar | Pi) && this.tryEmit(m)
      },
      process: function (v) { },
      getTouchAction: function () { },
      reset: function () { }
    };

    function Ru(v) {
      return v & Pi ? "cancel" : v & ar ? "end" : v & Gr ? "move" : v & ht ? "start" : ""
    }

    function xa(v) {
      return v == w ? "down" : v == y ? "up" : v == j ? "left" : v == ue ? "right" : ""
    }

    function pn(v, m) {
      var x = m.manager;
      return x ? x.get(v) : v
    }

    function mt() {
      qt.apply(this, arguments)
    }
    _(mt, qt, {
      defaults: {
        pointers: 1
      },
      attrTest: function (v) {
        var m = this.options.pointers;
        return m === 0 || v.pointers.length === m
      },
      process: function (v) {
        var m = this.state,
          x = v.eventType,
          A = m & (ht | Gr),
          k = this.attrTest(v);
        return A && (x & N || !k) ? m | Pi : A || k ? x & T ? m | ar : m & ht ? m | Gr : ht : Pt
      }
    });

    function mn() {
      mt.apply(this, arguments), this.pX = null, this.pY = null
    }
    _(mn, mt, {
      defaults: {
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: z
      },
      getTouchAction: function () {
        var v = this.options.direction,
          m = [];
        return v & M && m.push(Si), v & C && m.push(Ti), m
      },
      directionTest: function (v) {
        var m = this.options,
          x = !0,
          A = v.distance,
          k = v.direction,
          ie = v.deltaX,
          pe = v.deltaY;
        return k & m.direction || (m.direction & M ? (k = ie === 0 ? D : ie < 0 ? j : ue, x = ie != this.pX, A = Math.abs(v.deltaX)) : (k = pe === 0 ? D : pe < 0 ? y : w, x = pe != this.pY, A = Math.abs(v.deltaY))), v.direction = k, x && A > m.threshold && k & m.direction
      },
      attrTest: function (v) {
        return mt.prototype.attrTest.call(this, v) && (this.state & ht || !(this.state & ht) && this.directionTest(v))
      },
      emit: function (v) {
        this.pX = v.deltaX, this.pY = v.deltaY;
        var m = xa(v.direction);
        m && this.manager.emit(this.options.event + m, v), this._super.emit.call(this, v)
      }
    });

    function _s() {
      mt.apply(this, arguments)
    }
    _(_s, mt, {
      defaults: {
        event: "pinch",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function () {
        return [Ei]
      },
      attrTest: function (v) {
        return this._super.attrTest.call(this, v) && (Math.abs(v.scale - 1) > this.options.threshold || this.state & ht)
      },
      emit: function (v) {
        if (this._super.emit.call(this, v), v.scale !== 1) {
          var m = v.scale < 1 ? "in" : "out";
          this.manager.emit(this.options.event + m, v)
        }
      }
    });

    function ys() {
      qt.apply(this, arguments), this._timer = null, this._input = null
    }
    _(ys, qt, {
      defaults: {
        event: "press",
        pointers: 1,
        time: 500,
        threshold: 5
      },
      getTouchAction: function () {
        return [wa]
      },
      process: function (v) {
        var m = this.options,
          x = v.pointers.length === m.pointers,
          A = v.distance < m.threshold,
          k = v.deltaTime > m.time;
        if (this._input = v, !A || !x || v.eventType & (T | N) && !k) this.reset();
        else if (v.eventType & He) this.reset(), this._timer = f(function () {
          this.state = Vt, this.tryEmit()
        }, m.time, this);
        else if (v.eventType & T) return Vt;
        return Pt
      },
      reset: function () {
        clearTimeout(this._timer)
      },
      emit: function (v) {
        this.state === Vt && (v && v.eventType & T ? this.manager.emit(this.options.event + "up", v) : (this._input.timeStamp = h(), this.manager.emit(this.options.event, this._input)))
      }
    });

    function gs() {
      mt.apply(this, arguments)
    }
    _(gs, mt, {
      defaults: {
        event: "rotate",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function () {
        return [Ei]
      },
      attrTest: function (v) {
        return this._super.attrTest.call(this, v) && (Math.abs(v.rotation) > this.options.threshold || this.state & ht)
      }
    });

    function ws() {
      mt.apply(this, arguments)
    }
    _(ws, mt, {
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: .65,
        direction: M | C,
        pointers: 1
      },
      getTouchAction: function () {
        return mn.prototype.getTouchAction.call(this)
      },
      attrTest: function (v) {
        var m = this.options.direction,
          x;
        return m & (M | C) ? x = v.velocity : m & M ? x = v.velocityX : m & C && (x = v.velocityY), this._super.attrTest.call(this, v) && m & v.direction && v.distance > this.options.threshold && c(x) > this.options.velocity && v.eventType & T
      },
      emit: function (v) {
        var m = xa(v.direction);
        m && this.manager.emit(this.options.event + m, v), this.manager.emit(this.options.event, v)
      }
    });

    function _n() {
      qt.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
    }
    _(_n, qt, {
      defaults: {
        event: "tap",
        pointers: 1,
        taps: 1,
        interval: 300,
        time: 250,
        threshold: 2,
        posThreshold: 10
      },
      getTouchAction: function () {
        return [ps]
      },
      process: function (v) {
        var m = this.options,
          x = v.pointers.length === m.pointers,
          A = v.distance < m.threshold,
          k = v.deltaTime < m.time;
        if (this.reset(), v.eventType & He && this.count === 0) return this.failTimeout();
        if (A && k && x) {
          if (v.eventType != T) return this.failTimeout();
          var ie = this.pTime ? v.timeStamp - this.pTime < m.interval : !0,
            pe = !this.pCenter || Se(this.pCenter, v.center) < m.posThreshold;
          this.pTime = v.timeStamp, this.pCenter = v.center, !pe || !ie ? this.count = 1 : this.count += 1, this._input = v;
          var Xe = this.count % m.taps;
          if (Xe === 0) return this.hasRequireFailures() ? (this._timer = f(function () {
            this.state = Vt, this.tryEmit()
          }, m.interval, this), ht) : Vt
        }
        return Pt
      },
      failTimeout: function () {
        return this._timer = f(function () {
          this.state = Pt
        }, this.options.interval, this), Pt
      },
      reset: function () {
        clearTimeout(this._timer)
      },
      emit: function () {
        this.state == Vt && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
      }
    });

    function lr(v, m) {
      return m = m || {}, m.recognizers = R(m.recognizers, lr.defaults.preset), new xs(v, m)
    }
    lr.VERSION = "2.0.4", lr.defaults = {
      domEvents: !1,
      touchAction: ga,
      enable: !0,
      inputTarget: null,
      inputClass: null,
      preset: [
        [gs, {
          enable: !1
        }],
        [_s, {
          enable: !1
        },
          ["rotate"]
        ],
        [ws, {
          direction: M
        }],
        [mn, {
          direction: M
        },
          ["swipe"]
        ],
        [_n],
        [_n, {
          event: "doubletap",
          taps: 2
        },
          ["tap"]
        ],
        [ys]
      ],
      cssProps: {
        userSelect: "none",
        touchSelect: "none",
        touchCallout: "none",
        contentZooming: "none",
        userDrag: "none",
        tapHighlightColor: "rgba(0,0,0,0)"
      }
    };
    var zu = 1,
      ba = 2;

    function xs(v, m) {
      m = m || {}, this.options = g(m, lr.defaults), this.options.inputTarget = this.options.inputTarget || v, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = v, this.input = B(this), this.touchAction = new ms(this, this.options.touchAction), Ma(this, !0), d(m.recognizers, function (x) {
        var A = this.add(new x[0](x[1]));
        x[2] && A.recognizeWith(x[2]), x[3] && A.requireFailure(x[3])
      }, this)
    }
    xs.prototype = {
      set: function (v) {
        return p(this.options, v), v.touchAction && this.touchAction.update(), v.inputTarget && (this.input.destroy(), this.input.target = v.inputTarget, this.input.init()), this
      },
      stop: function (v) {
        this.session.stopped = v ? ba : zu
      },
      recognize: function (v) {
        var m = this.session;
        if (!m.stopped) {
          this.touchAction.preventDefaults(v);
          var x, A = this.recognizers,
            k = m.curRecognizer;
          (!k || k && k.state & Vt) && (k = m.curRecognizer = null);
          for (var ie = 0; ie < A.length;) x = A[ie], m.stopped !== ba && (!k || x == k || x.canRecognizeWith(k)) ? x.recognize(v) : x.reset(), !k && x.state & (ht | Gr | ar) && (k = m.curRecognizer = x), ie++
        }
      },
      get: function (v) {
        if (v instanceof qt) return v;
        for (var m = this.recognizers, x = 0; x < m.length; x++)
          if (m[x].options.event == v) return m[x];
        return null
      },
      add: function (v) {
        if (u(v, "add", this)) return this;
        var m = this.get(v.options.event);
        return m && this.remove(m), this.recognizers.push(v), v.manager = this, this.touchAction.update(), v
      },
      remove: function (v) {
        if (u(v, "remove", this)) return this;
        var m = this.recognizers;
        return v = this.get(v), m.splice(ee(m, v), 1), this.touchAction.update(), this
      },
      on: function (v, m) {
        var x = this.handlers;
        return d(Q(v), function (A) {
          x[A] = x[A] || [], x[A].push(m)
        }), this
      },
      off: function (v, m) {
        var x = this.handlers;
        return d(Q(v), function (A) {
          m ? x[A].splice(ee(x[A], m), 1) : delete x[A]
        }), this
      },
      emit: function (v, m) {
        this.options.domEvents && Lu(v, m);
        var x = this.handlers[v] && this.handlers[v].slice();
        if (!(!x || !x.length)) {
          m.type = v, m.preventDefault = function () {
            m.srcEvent.preventDefault()
          };
          for (var A = 0; A < x.length;) x[A](m), A++
        }
      },
      destroy: function () {
        this.element && Ma(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
      }
    };

    function Ma(v, m) {
      var x = v.element;
      d(v.options.cssProps, function (A, k) {
        x.style[se(x.style, k)] = m ? A : ""
      })
    }

    function Lu(v, m) {
      var x = r.createEvent("Event");
      x.initEvent(v, !0, !0), x.gesture = m, m.target.dispatchEvent(x)
    }
    p(lr, {
      INPUT_START: He,
      INPUT_MOVE: Pe,
      INPUT_END: T,
      INPUT_CANCEL: N,
      STATE_POSSIBLE: vn,
      STATE_BEGAN: ht,
      STATE_CHANGED: Gr,
      STATE_ENDED: ar,
      STATE_RECOGNIZED: Vt,
      STATE_CANCELLED: Pi,
      STATE_FAILED: Pt,
      DIRECTION_NONE: D,
      DIRECTION_LEFT: j,
      DIRECTION_RIGHT: ue,
      DIRECTION_UP: y,
      DIRECTION_DOWN: w,
      DIRECTION_HORIZONTAL: M,
      DIRECTION_VERTICAL: C,
      DIRECTION_ALL: z,
      Manager: xs,
      Input: I,
      TouchAction: ms,
      TouchInput: dn,
      MouseInput: Je,
      PointerEventInput: ds,
      TouchMouseInput: vs,
      SingleTouchInput: ma,
      Recognizer: qt,
      AttrRecognizer: mt,
      Tap: _n,
      Pan: mn,
      Swipe: ws,
      Pinch: _s,
      Rotate: gs,
      Press: ys,
      on: P,
      off: H,
      each: d,
      merge: g,
      extend: p,
      inherit: _,
      bindFn: b,
      prefixed: se
    }), typeof n == a && n.amd ? n(function () {
      return lr
    }) : e.exports ? e.exports = lr : t[i] = lr
  })(window, document, "Hammer")
})(Zf);
var Qf = Zf.exports,
  Jr = Qf,
  qb = 1,
  Bs = "MarzipanoHammerElementId";

function Jf(e, t) {
  return e[Bs] || (e[Bs] = qb++), t + e[Bs]
}

function cs() {
  this._managers = {}, this._refCount = {}
}
cs.prototype.get = function (e, t) {
  var r = Jf(e, t);
  return this._managers[r] || (this._managers[r] = this._createManager(e, t), this._refCount[r] = 0), this._refCount[r]++, new hs(this, this._managers[r], e, t)
};
cs.prototype._createManager = function (e, t) {
  var r = new Jr.Manager(e);
  return t === "mouse" ? r.add(new Jr.Pan({
    direction: Jr.DIRECTION_ALL,
    threshold: 0
  })) : (t === "touch" || t === "pen" || t === "kinect") && (r.add(new Jr.Pan({
    direction: Jr.DIRECTION_ALL,
    threshold: 20,
    pointers: 1
  })), r.add(new Jr.Pinch)), r
};
cs.prototype._releaseHandle = function (e, t) {
  var r = Jf(e, t);
  this._refCount[r] && (this._refCount[r]--, this._refCount[r] || (this._managers[r].destroy(), delete this._managers[r], delete this._refCount[r]))
};

function hs(e, t, r, i) {
  this._manager = t, this._element = r, this._type = i, this._hammerGestures = e, this._eventHandlers = []
}
hs.prototype.on = function (e, t) {
  var r = this._type,
    i = function (n) {
      r === n.pointerType && t(n)
    };
  this._eventHandlers.push({
    events: e,
    handler: i
  }), this._manager.on(e, i)
};
hs.prototype.release = function () {
  for (var e = 0; e < this._eventHandlers.length; e++) {
    var t = this._eventHandlers[e];
    this._manager.off(t.events, t.handler)
  }
  this._hammerGestures._releaseHandle(this._element, this._type), this._manager = null, this._element = null, this._type = null, this._hammerGestures = null
};
hs.prototype.manager = function () {
  return this._manager
};
var fs = new cs;

function Wb(e, t, r, i, n) {
  var s = Math.sqrt(Math.pow(t, 2) + Math.pow(r, 2));
  e = Math.max(e, s / i), eu(t, r, e, n), n[0] = Math.abs(n[0]), n[1] = Math.abs(n[1])
}

function eu(e, t, r, i) {
  var n = Math.atan(t / e);
  i[0] = r * Math.cos(n), i[1] = r * Math.sin(n)
}
var tu = {
  maxFriction: Wb,
  changeVectorNorm: eu
},
  jb = Ae,
  Ol = rr,
  Ub = fs,
  Yb = Dt,
  Xb = tu.maxFriction,
  Gb = Te,
  Kb = {
    friction: 6,
    maxFrictionTime: .3,
    hammerEvent: "pan"
  },
  Il = typeof MARZIPANODEBUG < "u" && MARZIPANODEBUG.controls;

function ir(e, t, r) {
  if (this._element = e, this._opts = Yb(r || {}, Kb), this._startEvent = null, this._lastEvent = null, this._active = !1, this._dynamics = {
    x: new Ol,
    y: new Ol
  }, this._hammer = Ub.get(e, t), this._hammer.on("hammer.input", this._handleHammerEvent.bind(this)), this._opts.hammerEvent != "pan" && this._opts.hammerEvent != "pinch") throw new Error(this._opts.hammerEvent + " is not a hammerEvent managed in DragControlMethod");
  this._hammer.on(this._opts.hammerEvent + "start", this._handleStart.bind(this)), this._hammer.on(this._opts.hammerEvent + "move", this._handleMove.bind(this)), this._hammer.on(this._opts.hammerEvent + "end", this._handleEnd.bind(this)), this._hammer.on(this._opts.hammerEvent + "cancel", this._handleEnd.bind(this))
}
jb(ir);
ir.prototype.destroy = function () {
  this._hammer.release(), Gb(this)
};
ir.prototype._handleHammerEvent = function (e) {
  if (e.isFirst) {
    if (Il && this._active) throw new Error("DragControlMethod active detected when already active");
    this._active = !0, this.emit("active")
  }
  if (e.isFinal) {
    if (Il && !this._active) throw new Error("DragControlMethod inactive detected when already inactive");
    this._active = !1, this.emit("inactive")
  }
};
ir.prototype._handleStart = function (e) {
  e.preventDefault(), this._startEvent = e
};
ir.prototype._handleMove = function (e) {
  e.preventDefault(), this._startEvent && (this._updateDynamicsMove(e), this.emit("parameterDynamics", "axisScaledX", this._dynamics.x), this.emit("parameterDynamics", "axisScaledY", this._dynamics.y))
};
ir.prototype._handleEnd = function (e) {
  e.preventDefault(), this._startEvent && (this._updateDynamicsRelease(e), this.emit("parameterDynamics", "axisScaledX", this._dynamics.x), this.emit("parameterDynamics", "axisScaledY", this._dynamics.y)), this._startEvent = !1, this._lastEvent = !1
};
ir.prototype._updateDynamicsMove = function (e) {
  var t = e.deltaX,
    r = e.deltaY,
    i = this._lastEvent || this._startEvent;
  i && (t -= i.deltaX, r -= i.deltaY);
  var n = this._element.getBoundingClientRect(),
    s = n.right - n.left,
    o = n.bottom - n.top;
  t /= s, r /= o, this._dynamics.x.reset(), this._dynamics.y.reset(), this._dynamics.x.offset = -t, this._dynamics.y.offset = -r, this._lastEvent = e
};
var Vs = [null, null];
ir.prototype._updateDynamicsRelease = function (e) {
  var t = this._element.getBoundingClientRect(),
    r = t.right - t.left,
    i = t.bottom - t.top,
    n = 1e3 * e.velocityX / r,
    s = 1e3 * e.velocityY / i;
  this._dynamics.x.reset(), this._dynamics.y.reset(), this._dynamics.x.velocity = n, this._dynamics.y.velocity = s, Xb(this._opts.friction, this._dynamics.x.velocity, this._dynamics.y.velocity, this._opts.maxFrictionTime, Vs), this._dynamics.x.friction = Vs[0], this._dynamics.y.friction = Vs[1]
};
var ru = ir,
  Zb = Ae,
  Fl = rr,
  Qb = fs,
  Jb = Dt,
  eM = tu.maxFriction,
  tM = Te,
  rM = {
    speed: 8,
    friction: 6,
    maxFrictionTime: .3
  };

function Xr(e, t, r) {
  this._element = e, this._opts = Jb(r || {}, rM), this._active = !1, this._hammer = Qb.get(e, t), this._dynamics = {
    x: new Fl,
    y: new Fl
  }, this._hammer.on("panstart", this._handleStart.bind(this)), this._hammer.on("panmove", this._handleMove.bind(this)), this._hammer.on("panend", this._handleRelease.bind(this)), this._hammer.on("pancancel", this._handleRelease.bind(this))
}
Zb(Xr);
Xr.prototype.destroy = function () {
  this._hammer.release(), tM(this)
};
Xr.prototype._handleStart = function (e) {
  e.preventDefault(), this._active || (this._active = !0, this.emit("active"))
};
Xr.prototype._handleMove = function (e) {
  e.preventDefault(), this._updateDynamics(e, !1)
};
Xr.prototype._handleRelease = function (e) {
  e.preventDefault(), this._updateDynamics(e, !0), this._active && (this._active = !1, this.emit("inactive"))
};
var qs = [null, null];
Xr.prototype._updateDynamics = function (e, t) {
  var r = this._element.getBoundingClientRect(),
    i = r.right - r.left,
    n = r.bottom - r.top,
    s = Math.max(i, n),
    o = e.deltaX / s * this._opts.speed,
    a = e.deltaY / s * this._opts.speed;
  this._dynamics.x.reset(), this._dynamics.y.reset(), this._dynamics.x.velocity = o, this._dynamics.y.velocity = a, t && (eM(this._opts.friction, this._dynamics.x.velocity, this._dynamics.y.velocity, this._opts.maxFrictionTime, qs), this._dynamics.x.friction = qs[0], this._dynamics.y.friction = qs[1]), this.emit("parameterDynamics", "x", this._dynamics.x), this.emit("parameterDynamics", "y", this._dynamics.y)
};
var iu = Xr,
  iM = Ae,
  nM = rr,
  sM = Dt,
  oM = Te,
  aM = {
    frictionTime: .2,
    zoomDelta: .001
  };

function an(e, t) {
  this._element = e, this._opts = sM(t || {}, aM), this._dynamics = new nM, this._eventList = [];
  var r = this._opts.frictionTime ? this.withSmoothing : this.withoutSmoothing;
  this._wheelListener = r.bind(this), e.addEventListener("wheel", this._wheelListener)
}
iM(an);
an.prototype.destroy = function () {
  this._element.removeEventListener("wheel", this._wheelListener), oM(this)
};
an.prototype.withoutSmoothing = function (e) {
  this._dynamics.offset = nu(e) * this._opts.zoomDelta, this.emit("parameterDynamics", "zoom", this._dynamics), e.preventDefault(), this.emit("active"), this.emit("inactive")
};
an.prototype.withSmoothing = function (e) {
  var t = e.timeStamp;
  for (this._eventList.push(e); this._eventList[0].timeStamp < t - this._opts.frictionTime * 1e3;) this._eventList.shift(0);
  for (var r = 0, i = 0; i < this._eventList.length; i++) {
    var n = nu(this._eventList[i]) * this._opts.zoomDelta;
    r += n / this._opts.frictionTime
  }
  this._dynamics.velocity = r, this._dynamics.friction = Math.abs(r) / this._opts.frictionTime, this.emit("parameterDynamics", "zoom", this._dynamics), e.preventDefault(), this.emit("active"), this.emit("inactive")
};

function nu(e) {
  var t = e.deltaMode == 1 ? 20 : 1;
  return e.deltaY * t
}
var su = an,
  lM = Ae,
  cM = rr,
  hM = fs,
  fM = Te;

function bi(e, t, r) {
  this._hammer = hM.get(e, t), this._lastEvent = null, this._active = !1, this._dynamics = new cM, this._hammer.on("pinchstart", this._handleStart.bind(this)), this._hammer.on("pinch", this._handleEvent.bind(this)), this._hammer.on("pinchend", this._handleEnd.bind(this)), this._hammer.on("pinchcancel", this._handleEnd.bind(this))
}
lM(bi);
bi.prototype.destroy = function () {
  this._hammer.release(), fM(this)
};
bi.prototype._handleStart = function () {
  this._active || (this._active = !0, this.emit("active"))
};
bi.prototype._handleEnd = function () {
  this._lastEvent = null, this._active && (this._active = !1, this.emit("inactive"))
};
bi.prototype._handleEvent = function (e) {
  var t = e.scale;
  this._lastEvent && (t /= this._lastEvent.scale), this._dynamics.offset = (t - 1) * -1, this.emit("parameterDynamics", "zoom", this._dynamics), this._lastEvent = e
};
var ou = bi,
  uM = Ae,
  dM = rr,
  vM = Te;

function ln(e) {
  if (!e) throw new Error("VelocityControlMethod: parameter must be defined");
  this._parameter = e, this._dynamics = new dM
}
uM(ln);
ln.prototype.destroy = function () {
  vM(this)
};
ln.prototype.setVelocity = function (e) {
  this._dynamics.velocity = e, this.emit("parameterDynamics", this._parameter, this._dynamics)
};
ln.prototype.setFriction = function (e) {
  this._dynamics.friction = e, this.emit("parameterDynamics", this._parameter, this._dynamics)
};
var pM = ln,
  mM = Ae,
  _M = rr,
  yM = Te;

function cn(e, t, r, i) {
  if (!e) throw new Error("ElementPressControlMethod: element must be defined");
  if (!t) throw new Error("ElementPressControlMethod: parameter must be defined");
  if (!r) throw new Error("ElementPressControlMethod: velocity must be defined");
  if (!i) throw new Error("ElementPressControlMethod: friction must be defined");
  this._element = e, this._pressHandler = this._handlePress.bind(this), this._releaseHandler = this._handleRelease.bind(this), e.addEventListener("mousedown", this._pressHandler), e.addEventListener("mouseup", this._releaseHandler), e.addEventListener("mouseleave", this._releaseHandler), e.addEventListener("touchstart", this._pressHandler), e.addEventListener("touchmove", this._releaseHandler), e.addEventListener("touchend", this._releaseHandler), this._parameter = t, this._velocity = r, this._friction = i, this._dynamics = new _M, this._pressing = !1
}
mM(cn);
cn.prototype.destroy = function () {
  this._element.removeEventListener("mousedown", this._pressHandler), this._element.removeEventListener("mouseup", this._releaseHandler), this._element.removeEventListener("mouseleave", this._releaseHandler), this._element.removeEventListener("touchstart", this._pressHandler), this._element.removeEventListener("touchmove", this._releaseHandler), this._element.removeEventListener("touchend", this._releaseHandler), yM(this)
};
cn.prototype._handlePress = function () {
  this._pressing = !0, this._dynamics.velocity = this._velocity, this._dynamics.friction = 0, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("active")
};
cn.prototype._handleRelease = function () {
  this._pressing && (this._dynamics.friction = this._friction, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("inactive")), this._pressing = !1
};
var gM = cn,
  wM = Ae,
  xM = rr,
  bM = Vr,
  MM = Te;

function St(e) {
  e = e || {}, this._methods = [], this._parameters = ["x", "y", "axisScaledX", "axisScaledY", "zoom", "yaw", "pitch", "roll"], this._now = e.nowForTesting || bM, this._composedOffsets = {}, this._composeReturn = {
    offsets: this._composedOffsets,
    changing: null
  }
}
wM(St);
St.prototype.add = function (e) {
  if (!this.has(e)) {
    var t = {};
    this._parameters.forEach(function (n) {
      t[n] = {
        dynamics: new xM,
        time: null
      }
    });
    var r = this._updateDynamics.bind(this, t),
      i = {
        instance: e,
        dynamics: t,
        parameterDynamicsHandler: r
      };
    e.addEventListener("parameterDynamics", r), this._methods.push(i)
  }
};
St.prototype.remove = function (e) {
  var t = this._indexOfInstance(e);
  if (t >= 0) {
    var r = this._methods.splice(t, 1)[0];
    r.instance.removeEventListener("parameterDynamics", r.parameterDynamicsHandler)
  }
};
St.prototype.has = function (e) {
  return this._indexOfInstance(e) >= 0
};
St.prototype._indexOfInstance = function (e) {
  for (var t = 0; t < this._methods.length; t++)
    if (this._methods[t].instance === e) return t;
  return -1
};
St.prototype.list = function () {
  for (var e = [], t = 0; t < this._methods.length; t++) e.push(this._methods[t].instance);
  return e
};
St.prototype._updateDynamics = function (e, t, r) {
  var i = e[t];
  if (!i) throw new Error("Unknown control parameter " + t);
  var n = this._now();
  i.dynamics.update(r, (n - i.time) / 1e3), i.time = n, this.emit("change")
};
St.prototype._resetComposedOffsets = function () {
  for (var e = 0; e < this._parameters.length; e++) this._composedOffsets[this._parameters[e]] = 0
};
St.prototype.offsets = function () {
  var e, t = !1,
    r = this._now();
  this._resetComposedOffsets();
  for (var i = 0; i < this._methods.length; i++)
    for (var n = this._methods[i].dynamics, s = 0; s < this._parameters.length; s++) {
      e = this._parameters[s];
      var o = n[e],
        a = o.dynamics;
      a.offset != null && (this._composedOffsets[e] += a.offset, a.offset = null);
      var l = (r - o.time) / 1e3,
        c = a.offsetFromVelocity(l);
      c && (this._composedOffsets[e] += c);
      var h = a.velocityAfter(l);
      a.velocity = h, h && (t = !0), o.time = r
    }
  return this._composeReturn.changing = t, this._composeReturn
};
St.prototype.destroy = function () {
  for (var e = this.list(), t = 0; t < e.length; t++) this.remove(e[t]);
  MM(this)
};
var EM = St,
  TM = Ae,
  SM = EM,
  PM = Te,
  au = typeof MARZIPANODEBUG < "u" && MARZIPANODEBUG.controls;

function xe(e) {
  e = e || {}, this._methods = {}, this._methodGroups = {}, this._composer = new SM, this._enabled = e && e.enabled ? !!e.enabled : !0, this._activeCount = 0, this.updatedViews_ = [], this._attachedRenderLoop = null
}
TM(xe);
xe.prototype.destroy = function () {
  this.detach(), this._composer.destroy(), PM(this)
};
xe.prototype.methods = function () {
  var e = {};
  for (var t in this._methods) e[t] = this._methods[t];
  return e
};
xe.prototype.method = function (e) {
  return this._methods[e]
};
xe.prototype.registerMethod = function (e, t, r) {
  if (this._methods[e]) throw new Error("Control method already registered with id " + e);
  this._methods[e] = {
    instance: t,
    enabled: !1,
    active: !1,
    activeHandler: this._handleActive.bind(this, e),
    inactiveHandler: this._handleInactive.bind(this, e)
  }, r && this.enableMethod(e, t)
};
xe.prototype.unregisterMethod = function (e) {
  var t = this._methods[e];
  if (!t) throw new Error("No control method registered with id " + e);
  t.enabled && this.disableMethod(e), delete this._methods[e]
};
xe.prototype.enableMethod = function (e) {
  var t = this._methods[e];
  if (!t) throw new Error("No control method registered with id " + e);
  t.enabled || (t.enabled = !0, t.active && this._incrementActiveCount(), this._listen(e), this._updateComposer(), this.emit("methodEnabled", e))
};
xe.prototype.disableMethod = function (e) {
  var t = this._methods[e];
  if (!t) throw new Error("No control method registered with id " + e);
  t.enabled && (t.enabled = !1, t.active && this._decrementActiveCount(), this._unlisten(e), this._updateComposer(), this.emit("methodDisabled", e))
};
xe.prototype.addMethodGroup = function (e, t) {
  this._methodGroups[e] = t
};
xe.prototype.removeMethodGroup = function (e) {
  delete this._methodGroups[e]
};
xe.prototype.methodGroups = function () {
  var e = {};
  for (var t in this._methodGroups) e[t] = this._methodGroups[t];
  return e
};
xe.prototype.enableMethodGroup = function (e) {
  var t = this;
  t._methodGroups[e].forEach(function (r) {
    t.enableMethod(r)
  })
};
xe.prototype.disableMethodGroup = function (e) {
  var t = this;
  t._methodGroups[e].forEach(function (r) {
    t.disableMethod(r)
  })
};
xe.prototype.enabled = function () {
  return this._enabled
};
xe.prototype.enable = function () {
  this._enabled || (this._enabled = !0, this._activeCount > 0 && this.emit("active"), this.emit("enabled"), this._updateComposer())
};
xe.prototype.disable = function () {
  this._enabled && (this._enabled = !1, this._activeCount > 0 && this.emit("inactive"), this.emit("disabled"), this._updateComposer())
};
xe.prototype.attach = function (e) {
  this._attachedRenderLoop && this.detach(), this._attachedRenderLoop = e, this._beforeRenderHandler = this._updateViewsWithControls.bind(this), this._changeHandler = e.renderOnNextFrame.bind(e), this._attachedRenderLoop.addEventListener("beforeRender", this._beforeRenderHandler), this._composer.addEventListener("change", this._changeHandler)
};
xe.prototype.detach = function () {
  this._attachedRenderLoop && (this._attachedRenderLoop.removeEventListener("beforeRender", this._beforeRenderHandler), this._composer.removeEventListener("change", this._changeHandler), this._beforeRenderHandler = null, this._changeHandler = null, this._attachedRenderLoop = null)
};
xe.prototype.attached = function () {
  return this._attachedRenderLoop != null
};
xe.prototype._listen = function (e) {
  var t = this._methods[e];
  if (!t) throw new Error("Bad method id");
  t.instance.addEventListener("active", t.activeHandler), t.instance.addEventListener("inactive", t.inactiveHandler)
};
xe.prototype._unlisten = function (e) {
  var t = this._methods[e];
  if (!t) throw new Error("Bad method id");
  t.instance.removeEventListener("active", t.activeHandler), t.instance.removeEventListener("inactive", t.inactiveHandler)
};
xe.prototype._handleActive = function (e) {
  var t = this._methods[e];
  if (!t) throw new Error("Bad method id");
  if (!t.enabled) throw new Error("Should not receive event from disabled control method");
  t.active || (t.active = !0, this._incrementActiveCount())
};
xe.prototype._handleInactive = function (e) {
  var t = this._methods[e];
  if (!t) throw new Error("Bad method id");
  if (!t.enabled) throw new Error("Should not receive event from disabled control method");
  t.active && (t.active = !1, this._decrementActiveCount())
};
xe.prototype._incrementActiveCount = function () {
  this._activeCount++, au && this._checkActiveCount(), this._enabled && this._activeCount === 1 && this.emit("active")
};
xe.prototype._decrementActiveCount = function () {
  this._activeCount--, au && this._checkActiveCount(), this._enabled && this._activeCount === 0 && this.emit("inactive")
};
xe.prototype._checkActiveCount = function () {
  var e = 0;
  for (var t in this._methods) {
    var r = this._methods[t];
    r.enabled && r.active && e++
  }
  if (e != this._activeCount) throw new Error("Bad control state")
};
xe.prototype._updateComposer = function () {
  var e = this._composer;
  for (var t in this._methods) {
    var r = this._methods[t],
      i = this._enabled && r.enabled;
    i && !e.has(r.instance) && e.add(r.instance), !i && e.has(r.instance) && e.remove(r.instance)
  }
};
xe.prototype._updateViewsWithControls = function () {
  var e = this._composer.offsets();
  e.changing && this._attachedRenderLoop.renderOnNextFrame(), this.updatedViews_.length = 0;
  for (var t = this._attachedRenderLoop.stage().listLayers(), r = 0; r < t.length; r++) {
    var i = t[r].view();
    this.updatedViews_.indexOf(i) < 0 && (t[r].view().updateWithControlParameters(e.offsets), this.updatedViews_.push(i))
  }
};
var lu = xe,
  CM = ot.setTransform,
  Hl = ha;

function AM(e, t, r, i) {
  i = i || "";
  var n = "translateX(" + Hl(t) + "px) translateY(" + Hl(r) + "px) translateZ(0) " + i;
  CM(e, n)
}
var cu = AM,
  RM = Ae,
  zM = cu,
  LM = ot.setTransform,
  $M = Te;

function at(e, t, r, i, n) {
  n = n || {}, n.perspective = n.perspective || {}, n.perspective.extraTransforms = n.perspective.extraTransforms != null ? n.perspective.extraTransforms : "", this._domElement = e, this._parentDomElement = t, this._view = r, this._coords = {}, this._perspective = {}, this.setPosition(i), this._parentDomElement.appendChild(this._domElement), this.setPerspective(n.perspective), this._visible = !0, this._position = {
    x: 0,
    y: 0
  }
}
RM(at);
at.prototype.destroy = function () {
  this._parentDomElement.removeChild(this._domElement), $M(this)
};
at.prototype.domElement = function () {
  return this._domElement
};
at.prototype.position = function () {
  return this._coords
};
at.prototype.setPosition = function (e) {
  for (var t in e) this._coords[t] = e[t];
  this._update()
};
at.prototype.perspective = function () {
  return this._perspective
};
at.prototype.setPerspective = function (e) {
  for (var t in e) this._perspective[t] = e[t];
  this._update()
};
at.prototype.show = function () {
  this._visible || (this._visible = !0, this._update())
};
at.prototype.hide = function () {
  this._visible && (this._visible = !1, this._update())
};
at.prototype._update = function () {
  var e = this._domElement,
    t = this._coords,
    r = this._position,
    i, n, s = !1;
  if (this._visible) {
    var o = this._view;
    this._perspective.radius ? (s = !0, this._setEmbeddedPosition(o, t)) : (o.coordinatesToScreen(t, r), i = r.x, n = r.y, i != null && n != null && (s = !0, this._setPosition(i, n)))
  }
  s ? (e.style.display = "block", e.style.position = "absolute") : (e.style.display = "none", e.style.position = "")
};
at.prototype._setEmbeddedPosition = function (e, t) {
  var r = e.coordinatesToPerspectiveTransform(t, this._perspective.radius, this._perspective.extraTransforms);
  LM(this._domElement, r)
};
at.prototype._setPosition = function (e, t) {
  zM(this._domElement, e, t, this._perspective.extraTransforms)
};
var hu = at,
  OM = Ae,
  IM = hu,
  FM = th,
  kl = cu,
  Nl = ot.setAbsolute,
  HM = ot.setOverflowHidden,
  kM = ot.setOverflowVisible,
  NM = ot.setNullSize,
  DM = ot.setPixelSize,
  Dl = ot.setWithVendorPrefix("pointer-events"),
  BM = Te;

function lt(e, t, r, i, n) {
  n = n || {}, this._parentDomElement = e, this._stage = t, this._view = r, this._renderLoop = i, this._hotspots = [], this._visible = !0, this._rect = n.rect, this._visibilityOrRectChanged = !0, this._stageWidth = null, this._stageHeight = null, this._tmpRect = {}, this._hotspotContainerWrapper = document.createElement("div"), Nl(this._hotspotContainerWrapper), Dl(this._hotspotContainerWrapper, "none"), this._parentDomElement.appendChild(this._hotspotContainerWrapper), this._hotspotContainer = document.createElement("div"), Nl(this._hotspotContainer), Dl(this._hotspotContainer, "all"), this._hotspotContainerWrapper.appendChild(this._hotspotContainer), this._updateHandler = this._update.bind(this), this._renderLoop.addEventListener("afterRender", this._updateHandler)
}
OM(lt);
lt.prototype.destroy = function () {
  for (; this._hotspots.length;) this.destroyHotspot(this._hotspots[0]);
  this._parentDomElement.removeChild(this._hotspotContainerWrapper), this._renderLoop.removeEventListener("afterRender", this._updateHandler), BM(this)
};
lt.prototype.domElement = function () {
  return this._hotspotContainer
};
lt.prototype.setRect = function (e) {
  this._rect = e, this._visibilityOrRectChanged = !0
};
lt.prototype.rect = function () {
  return this._rect
};
lt.prototype.createHotspot = function (e, t, r) {
  t = t || {};
  var i = new IM(e, this._hotspotContainer, this._view, t, r);
  return this._hotspots.push(i), i._update(), this.emit("hotspotsChange"), i
};
lt.prototype.hasHotspot = function (e) {
  return this._hotspots.indexOf(e) >= 0
};
lt.prototype.listHotspots = function () {
  return [].concat(this._hotspots)
};
lt.prototype.destroyHotspot = function (e) {
  var t = this._hotspots.indexOf(e);
  if (t < 0) throw new Error("No such hotspot");
  this._hotspots.splice(t, 1), e.destroy(), this.emit("hotspotsChange")
};
lt.prototype.hide = function () {
  this._visible && (this._visible = !1, this._visibilityOrRectChanged = !0, this._update())
};
lt.prototype.show = function () {
  this._visible || (this._visible = !0, this._visibilityOrRectChanged = !0, this._update())
};
lt.prototype._update = function () {
  var e = this._hotspotContainerWrapper,
    t = this._stage.width(),
    r = this._stage.height(),
    i = this._tmpRect;
  if (this._visibilityOrRectChanged || this._rect && (t !== this._stageWidth || r !== this._stageHeight)) {
    var n = this._visible;
    e.style.display = n ? "block" : "none", n && (this._rect ? (FM(t, r, this._rect, i), kl(e, t * i.x, r * i.y), DM(e, t * i.width, r * i.height), HM(e)) : (kl(e, 0, 0), NM(e), kM(e))), this._stageWidth = t, this._stageHeight = r, this._visibilityOrRectChanged = !1
  }
  for (var s = 0; s < this._hotspots.length; s++) this._hotspots[s]._update()
};
var fu = lt,
  VM = Xf,
  qM = Uf,
  WM = fu,
  jM = Ae,
  uu = Vr,
  UM = sn,
  YM = rn,
  Bl = Dt,
  XM = Te;

function ke(e, t) {
  this._viewer = e, this._view = t, this._layers = [], this._hotspotContainer = new WM(e._controlContainer, e.stage(), this._view, e.renderLoop()), this._movement = null, this._movementStartTime = null, this._movementStep = null, this._movementParams = null, this._movementCallback = null, this._updateMovementHandler = this._updateMovement.bind(this), this._updateHotspotContainerHandler = this._updateHotspotContainer.bind(this), this._viewer.addEventListener("sceneChange", this._updateHotspotContainerHandler), this._viewChangeHandler = this.emit.bind(this, "viewChange"), this._view.addEventListener("change", this._viewChangeHandler), this._updateHotspotContainer()
}
jM(ke);
ke.prototype.destroy = function () {
  this._view.removeEventListener("change", this._viewChangeHandler), this._viewer.removeEventListener("sceneChange", this._updateHotspotContainerHandler), this._movement && this.stopMovement(), this._hotspotContainer.destroy(), this.destroyAllLayers(), XM(this)
};
ke.prototype.hotspotContainer = function () {
  return this._hotspotContainer
};
ke.prototype.layer = function () {
  return this._layers[0]
};
ke.prototype.listLayers = function () {
  return [].concat(this._layers)
};
ke.prototype.view = function () {
  return this._view
};
ke.prototype.viewer = function () {
  return this._viewer
};
ke.prototype.visible = function () {
  return this._viewer.scene() === this
};
ke.prototype.createLayer = function (e) {
  e = e || {};
  var t = e.textureStoreOpts || {},
    r = e.layerOpts || {},
    i = e.source,
    n = e.geometry,
    s = this._view,
    o = this._viewer.stage(),
    a = new qM(i, o, t),
    l = new VM(i, n, s, a, r);
  return this._layers.push(l), e.pinFirstLevel && l.pinFirstLevel(), this.emit("layerChange"), l
};
ke.prototype.destroyLayer = function (e) {
  var t = this._layers.indexOf(e);
  if (t < 0) throw new Error("No such layer in scene");
  this._layers.splice(t, 1), this.emit("layerChange"), e.textureStore().destroy(), e.destroy()
};
ke.prototype.destroyAllLayers = function () {
  for (; this._layers.length > 0;) this.destroyLayer(this._layers[0])
};
ke.prototype.switchTo = function (e, t) {
  return this._viewer.switchScene(this, e, t)
};
ke.prototype.lookTo = function (e, t, r) {
  var i = this;
  if (t = t || {}, r = r || UM, YM(e) !== "object") throw new Error("Target view parameters must be an object");
  var n = function (p) {
    return (p *= 2) < 1 ? .5 * p * p : -.5 * (--p * (p - 2) - 1)
  },
    s = t.ease != null ? t.ease : n,
    o = t.controlsInterrupt != null ? t.controlsInterrupt : !1,
    a = t.transitionDuration != null ? t.transitionDuration : 1e3,
    l = t.shortest != null ? t.shortest : !0,
    c = this._view,
    h = c.parameters(),
    f = {};
  Bl(f, e), Bl(f, h), l && c.normalizeToClosest && c.normalizeToClosest(f, f);
  var u = function () {
    var p = !1;
    return function (g, _) {
      if (_ >= a && p) return null;
      var b = Math.min(_ / a, 1);
      for (var S in g) {
        var R = h[S],
          P = f[S];
        g[S] = R + s(b) * (P - R)
      }
      return p = _ >= a, g
    }
  },
    d = this._viewer.controls().enabled();
  o || this._viewer.controls().disable(), this.startMovement(u, function () {
    d && i._viewer.controls().enable(), r()
  })
};
ke.prototype.startMovement = function (e, t) {
  var r = this._viewer.renderLoop();
  this._movement && this.stopMovement();
  var i = e();
  if (typeof i != "function") throw new Error("Bad movement");
  this._movement = e, this._movementStep = i, this._movementStartTime = uu(), this._movementParams = {}, this._movementCallback = t, r.addEventListener("beforeRender", this._updateMovementHandler), r.renderOnNextFrame()
};
ke.prototype.stopMovement = function () {
  var e = this._movementCallback,
    t = this._viewer.renderLoop();
  this._movement && (this._movement = null, this._movementStep = null, this._movementStartTime = null, this._movementParams = null, this._movementCallback = null, t.removeEventListener("beforeRender", this._updateMovementHandler), e && e())
};
ke.prototype.movement = function () {
  return this._movement
};
ke.prototype._updateMovement = function () {
  if (!this._movement) throw new Error("Should not call update");
  var e = this._viewer.renderLoop(),
    t = this._view,
    r = uu() - this._movementStartTime,
    i = this._movementStep,
    n = this._movementParams;
  n = t.parameters(n), n = i(n, r), n == null ? this.stopMovement() : (t.setParameters(n), e.renderOnNextFrame())
};
ke.prototype._updateHotspotContainer = function () {
  this.visible() ? this._hotspotContainer.show() : this._hotspotContainer.hide()
};
var du = ke,
  GM = Ae,
  KM = Dt,
  vu = Vr,
  ZM = {
    duration: 1 / 0
  };

function Bt(e) {
  e = KM(e || {}, ZM), this._duration = e.duration, this._startTime = null, this._handle = null, this._check = this._check.bind(this)
}
GM(Bt);
Bt.prototype.start = function () {
  this._startTime = vu(), this._handle == null && this._duration < 1 / 0 && this._setup(this._duration)
};
Bt.prototype.started = function () {
  return this._startTime != null
};
Bt.prototype.stop = function () {
  this._startTime = null, this._handle != null && (clearTimeout(this._handle), this._handle = null)
};
Bt.prototype._setup = function (e) {
  this._handle = setTimeout(this._check, e)
};
Bt.prototype._teardown = function () {
  clearTimeout(this._handle), this._handle = null
};
Bt.prototype._check = function () {
  var e = vu(),
    t = e - this._startTime,
    r = this._duration - t;
  this._teardown(), r <= 0 ? (this.emit("timeout"), this._startTime = null) : r < 1 / 0 && this._setup(r)
};
Bt.prototype.duration = function () {
  return this._duration
};
Bt.prototype.setDuration = function (e) {
  this._duration = e, this._startTime != null && this._check()
};
var QM = Bt,
  JM = Dt,
  e3 = Te,
  t3 = {
    active: "move",
    inactive: "default",
    disabled: "default"
  };

function Mi(e, t, r, i) {
  i = JM(i || {}, t3), this._element = r, this._controls = e, this._id = t, this._attached = !1, this._setActiveCursor = this._setCursor.bind(this, i.active), this._setInactiveCursor = this._setCursor.bind(this, i.inactive), this._setDisabledCursor = this._setCursor.bind(this, i.disabled), this._setOriginalCursor = this._setCursor.bind(this, this._element.style.cursor), this._updateAttachmentHandler = this._updateAttachment.bind(this), e.addEventListener("methodEnabled", this._updateAttachmentHandler), e.addEventListener("methodDisabled", this._updateAttachmentHandler), e.addEventListener("enabled", this._updateAttachmentHandler), e.addEventListener("disabled", this._updateAttachmentHandler), this._updateAttachment()
}
Mi.prototype.destroy = function () {
  this._detachFromControlMethod(this._controls.method(this._id)), this._setOriginalCursor(), this._controls.removeEventListener("methodEnabled", this._updateAttachmentHandler), this._controls.removeEventListener("methodDisabled", this._updateAttachmentHandler), this._controls.removeEventListener("enabled", this._updateAttachmentHandler), this._controls.removeEventListener("disabled", this._updateAttachmentHandler), e3(this)
};
Mi.prototype._updateAttachment = function () {
  var e = this._controls,
    t = this._id;
  e.enabled() && e.method(t).enabled ? this._attachToControlMethod(e.method(t)) : this._detachFromControlMethod(e.method(t))
};
Mi.prototype._attachToControlMethod = function (e) {
  this._attached || (e.instance.addEventListener("active", this._setActiveCursor), e.instance.addEventListener("inactive", this._setInactiveCursor), e.active ? this._setActiveCursor() : this._setInactiveCursor(), this._attached = !0)
};
Mi.prototype._detachFromControlMethod = function (e) {
  this._attached && (e.instance.removeEventListener("active", this._setActiveCursor), e.instance.removeEventListener("inactive", this._setInactiveCursor), this._setDisabledCursor(), this._attached = !1)
};
Mi.prototype._setCursor = function (e) {
  this._element.style.cursor = e
};
var r3 = Mi,
  i3 = Dt,
  Ws = ru,
  n3 = iu,
  s3 = su,
  o3 = ou,
  ft = Kf,
  a3 = {
    mouseViewMode: "drag",
    dragMode: "pan"
  };

function l3(e, t, r) {
  r = i3(r || {}, a3);
  var i = {
    mouseViewDrag: new Ws(t, "mouse"),
    mouseViewQtvr: new n3(t, "mouse"),
    leftArrowKey: new ft(37, "x", -.7, 3),
    rightArrowKey: new ft(39, "x", .7, 3),
    upArrowKey: new ft(38, "y", -.7, 3),
    downArrowKey: new ft(40, "y", .7, 3),
    plusKey: new ft(107, "zoom", -.7, 3),
    minusKey: new ft(109, "zoom", .7, 3),
    wKey: new ft(87, "y", -.7, 3),
    aKey: new ft(65, "x", -.7, 3),
    sKey: new ft(83, "y", .7, 3),
    dKey: new ft(68, "x", .7, 3),
    qKey: new ft(81, "roll", .7, 3),
    eKey: new ft(69, "roll", -.7, 3)
  },
    n = ["scrollZoom", "touchView", "pinch"];
  r.scrollZoom !== !1 && (i.scrollZoom = new s3(t));
  var s = {
    arrowKeys: ["leftArrowKey", "rightArrowKey", "upArrowKey", "downArrowKey"],
    plusMinusKeys: ["plusKey", "minusKey"],
    wasdKeys: ["wKey", "aKey", "sKey", "dKey"],
    qeKeys: ["qKey", "eKey"]
  };
  switch (r.dragMode) {
    case "pinch":
      i.pinch = new Ws(t, "touch", {
        hammerEvent: "pinch"
      });
      break;
    case "pan":
      i.touchView = new Ws(t, "touch"), i.pinch = new o3(t, "touch");
      break;
    default:
      throw new Error("Unknown drag mode: " + r.dragMode)
  }
  switch (r.mouseViewMode) {
    case "drag":
      n.push("mouseViewDrag");
      break;
    case "qtvr":
      n.push("mouseViewQtvr");
      break;
    default:
      throw new Error("Unknown mouse view mode: " + r.mouseViewMode)
  }
  for (var o in i) {
    var a = i[o];
    e.registerMethod(o, a), n.indexOf(o) >= 0 && e.enableMethod(o)
  }
  for (var l in s) {
    var c = s[l];
    e.addMethodGroup(l, c)
  }
  return i
}
var pu = l3,
  Vl = Vr;

function c3(e, t, r) {
  var i = !1,
    n = Vl();

  function s() {
    if (!i) {
      var o = (Vl() - n) / e;
      o < 1 ? (t(o), requestAnimationFrame(s)) : (t(1), r())
    }
  }
  return t(0), requestAnimationFrame(s),
    function () {
      i = !0, r.apply(null, arguments)
    }
}
var mu = c3,
  h3 = Ae,
  f3 = Gf,
  u3 = lu,
  d3 = du,
  v3 = QM,
  p3 = fh,
  m3 = r3,
  ql = fs,
  _3 = pu,
  y3 = zf,
  g3 = ot.setOverflowHidden,
  w3 = ot.setAbsolute,
  x3 = ot.setFullSize,
  b3 = mu,
  M3 = sn,
  E3 = Te;

function _e(e, t) {
  t = t || {}, this._domElement = e, g3(e), this._stage = new p3(t.stage), y3(this._stage), this._domElement.appendChild(this._stage.domElement()), this._controlContainer = document.createElement("div"), w3(this._controlContainer), x3(this._controlContainer), e.appendChild(this._controlContainer), this._size = {}, this.updateSize(), this._updateSizeListener = this.updateSize.bind(this), window.addEventListener("resize", this._updateSizeListener), this._renderLoop = new f3(this._stage), this._controls = new u3, this._controlMethods = _3(this._controls, this._controlContainer, t.controls), this._controls.attach(this._renderLoop), this._hammerManagerTouch = ql.get(this._controlContainer, "touch"), this._hammerManagerMouse = ql.get(this._controlContainer, "mouse"), this._dragCursor = new m3(this._controls, "mouseViewDrag", e, t.cursors && t.cursors.drag || {}), this._renderLoop.start(), this._scenes = [], this._currentScene = null, this._replacedScene = null, this._cancelCurrentTween = null, this._layerChangeHandler = this._updateSceneLayers.bind(this), this._viewChangeHandler = this.emit.bind(this, "viewChange"), this._idleTimer = new v3, this._idleTimer.start(), this._resetIdleTimerHandler = this._resetIdleTimer.bind(this), this.addEventListener("viewChange", this._resetIdleTimerHandler), this._triggerIdleTimerHandler = this._triggerIdleTimer.bind(this), this._idleTimer.addEventListener("timeout", this._triggerIdleTimerHandler), this._stopMovementHandler = this.stopMovement.bind(this), this._controls.addEventListener("active", this._stopMovementHandler), this.addEventListener("sceneChange", this._stopMovementHandler), this._idleMovement = null
}
h3(_e);
_e.prototype.destroy = function () {
  window.removeEventListener("resize", this._updateSizeListener), this._currentScene && this._removeSceneEventListeners(this._currentScene), this._replacedScene && this._removeSceneEventListeners(this._replacedScene), this._dragCursor.destroy();
  for (var e in this._controlMethods) this._controlMethods[e].destroy();
  for (; this._scenes.length;) this.destroyScene(this._scenes[0]);
  this._domElement.removeChild(this._stage.domElement()), this._stage.destroy(), this._renderLoop.destroy(), this._controls.destroy(), this._controls = null, this._cancelCurrentTween && this._cancelCurrentTween(), E3(this)
};
_e.prototype.updateSize = function () {
  var e = this._size;
  e.width = this._domElement.clientWidth, e.height = this._domElement.clientHeight, this._stage.setSize(e)
};
_e.prototype.stage = function () {
  return this._stage
};
_e.prototype.renderLoop = function () {
  return this._renderLoop
};
_e.prototype.controls = function () {
  return this._controls
};
_e.prototype.domElement = function () {
  return this._domElement
};
_e.prototype.createScene = function (e) {
  e = e || {};
  var t = this.createEmptyScene({
    view: e.view
  });
  return t.createLayer({
    source: e.source,
    geometry: e.geometry,
    pinFirstLevel: e.pinFirstLevel,
    textureStoreOpts: e.textureStoreOpts,
    layerOpts: e.layerOpts
  }), t
};
_e.prototype.createEmptyScene = function (e) {
  e = e || {};
  var t = new d3(this, e.view);
  return this._scenes.push(t), t
};
_e.prototype._updateSceneLayers = function () {
  var e, t, r = this._stage,
    i = this._currentScene,
    n = this._replacedScene,
    s = r.listLayers(),
    o = [];
  if (n && (o = o.concat(n.listLayers())), i && (o = o.concat(i.listLayers())), Math.abs(s.length - o.length) !== 1) throw new Error("Stage and scene out of sync");
  if (o.length < s.length) {
    for (e = 0; e < s.length; e++)
      if (t = s[e], o.indexOf(t) < 0) {
        this._removeLayerFromStage(t);
        break
      }
  }
  if (o.length > s.length)
    for (e = 0; e < o.length; e++) t = o[e], s.indexOf(t) < 0 && this._addLayerToStage(t, e)
};
_e.prototype._addLayerToStage = function (e, t) {
  e.pinFirstLevel(), this._stage.addLayer(e, t)
};
_e.prototype._removeLayerFromStage = function (e) {
  this._stage.removeLayer(e), e.unpinFirstLevel(), e.textureStore().clearNotPinned()
};
_e.prototype._addSceneEventListeners = function (e) {
  e.addEventListener("layerChange", this._layerChangeHandler), e.addEventListener("viewChange", this._viewChangeHandler)
};
_e.prototype._removeSceneEventListeners = function (e) {
  e.removeEventListener("layerChange", this._layerChangeHandler), e.removeEventListener("viewChange", this._viewChangeHandler)
};
_e.prototype.destroyScene = function (e) {
  var t = this._scenes.indexOf(e);
  if (t < 0) throw new Error("No such scene in viewer");
  var r, i;
  if (this._currentScene === e) {
    for (this._removeSceneEventListeners(e), i = e.listLayers(), r = 0; r < i.length; r++) this._removeLayerFromStage(i[r]);
    this._cancelCurrentTween && (this._cancelCurrentTween(), this._cancelCurrentTween = null), this._currentScene = null, this.emit("sceneChange")
  }
  if (this._replacedScene === e) {
    for (this._removeSceneEventListeners(e), i = e.listLayers(), r = 0; r < i.length; r++) this._removeLayerFromStage(i[r]);
    this._replacedScene = null
  }
  this._scenes.splice(t, 1), e.destroy()
};
_e.prototype.destroyAllScenes = function () {
  for (; this._scenes.length > 0;) this.destroyScene(this._scenes[0])
};
_e.prototype.hasScene = function (e) {
  return this._scenes.indexOf(e) >= 0
};
_e.prototype.listScenes = function () {
  return [].concat(this._scenes)
};
_e.prototype.scene = function () {
  return this._currentScene
};
_e.prototype.view = function () {
  var e = this._currentScene;
  return e ? e.view() : null
};
_e.prototype.lookTo = function (e, t, r) {
  var i = this._currentScene;
  i && i.lookTo(e, t, r)
};
_e.prototype.startMovement = function (e, t) {
  var r = this._currentScene;
  r && r.startMovement(e, t)
};
_e.prototype.stopMovement = function () {
  var e = this._currentScene;
  e && e.stopMovement()
};
_e.prototype.movement = function () {
  var e = this._currentScene;
  if (e) return e.movement()
};
_e.prototype.setIdleMovement = function (e, t) {
  this._idleTimer.setDuration(e), this._idleMovement = t
};
_e.prototype.breakIdleMovement = function () {
  this.stopMovement(), this._resetIdleTimer()
};
_e.prototype._resetIdleTimer = function () {
  this._idleTimer.start()
};
_e.prototype._triggerIdleTimer = function () {
  var e = this._idleMovement;
  e && this.startMovement(e)
};
var T3 = 1e3;

function S3(e, t, r) {
  var i = t.listLayers();
  i.forEach(function (n) {
    n.mergeEffects({
      opacity: e
    })
  }), t._hotspotContainer.domElement().style.opacity = e
}
_e.prototype.switchScene = function (e, t, r) {
  var i = this;
  t = t || {}, r = r || M3;
  var n = this._stage,
    s = this._currentScene;
  if (s === e) {
    r();
    return
  }
  if (this._scenes.indexOf(e) < 0) throw new Error("No such scene in viewer");
  this._cancelCurrentTween && (this._cancelCurrentTween(), this._cancelCurrentTween = null);
  var o = s ? s.listLayers() : [],
    a = e.listLayers(),
    l = n.listLayers();
  if (s && (l.length !== o.length || l.length > 1 && l[0] != o[0])) throw new Error("Stage not in sync with viewer");
  for (var c = t.transitionDuration != null ? t.transitionDuration : T3, h = t.transitionUpdate != null ? t.transitionUpdate : S3, f = 0; f < a.length; f++) this._addLayerToStage(a[f]);

  function u(p) {
    h(p, e, s)
  }

  function d() {
    if (i._replacedScene) {
      i._removeSceneEventListeners(i._replacedScene), o = i._replacedScene.listLayers();
      for (var p = 0; p < o.length; p++) i._removeLayerFromStage(o[p]);
      i._replacedScene = null
    }
    i._cancelCurrentTween = null, r()
  }
  this._cancelCurrentTween = b3(c, u, d), this._currentScene = e, this._replacedScene = s, this.emit("sceneChange"), this.emit("viewChange"), this._addSceneEventListeners(e)
};
var P3 = _e,
  us = Ye.vec4,
  C3 = Ye.mat4;

function A3(e) {
  var t = e || {};
  return t.colorOffset = t.colorOffset || us.create(), t.colorMatrix = t.colorMatrix || C3.create(), t
}

function _u(e, t, r) {
  R3(r, e, t.colorMatrix), us.add(r, r, t.colorOffset)
}

function R3(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    o = t[3];
  return e[0] = r[0] * i + r[1] * n + r[2] * s + r[3] * o, e[1] = r[4] * i + r[5] * n + r[6] * s + r[7] * o, e[2] = r[8] * i + r[9] * n + r[10] * s + r[11] * o, e[3] = r[12] * i + r[13] * n + r[14] * s + r[15] * o, e
}
var Rr = us.create();

function z3(e, t) {
  for (var r = e.width, i = e.height, n = e.data, s = 0; s < r * i; s++) us.set(Rr, n[s * 4 + 0] / 255, n[s * 4 + 1] / 255, n[s * 4 + 2] / 255, n[s * 4 + 3] / 255), _u(Rr, t, Rr), n[s * 4 + 0] = Rr[0] * 255, n[s * 4 + 1] = Rr[1] * 255, n[s * 4 + 2] = Rr[2] * 255, n[s * 4 + 3] = Rr[3] * 255
}
var L3 = {
  identity: A3,
  applyToPixel: _u,
  applyToImageData: z3
},
  $3 = Dt,
  js = .1,
  Us = .01,
  O3 = {
    yawSpeed: js,
    pitchSpeed: js,
    fovSpeed: js,
    yawAccel: Us,
    pitchAccel: Us,
    fovAccel: Us,
    targetPitch: 0,
    targetFov: null
  };

function I3(e) {
  e = $3(e || {}, O3);
  var t = e.yawSpeed,
    r = e.pitchSpeed,
    i = e.fovSpeed,
    n = e.yawAccel,
    s = e.pitchAccel,
    o = e.fovAccel,
    a = e.targetPitch,
    l = e.targetFov;
  return function () {
    var h = 0,
      f = 0,
      u = 0,
      d = 0,
      p = 0,
      g = 0,
      _ = 0,
      b, S, R, P;
    return function (O, Y) {
      if (b = (Y - h) / 1e3, p = Math.min(f + b * n, t), S = p * b, O.yaw = O.yaw + S, a != null && O.pitch !== a) {
        var Q = .5 * u * u / s;
        Math.abs(a - O.pitch) > Q ? g = Math.min(u + b * s, r) : g = Math.max(u - b * s, 0), R = g * b, a < O.pitch && (O.pitch = Math.max(a, O.pitch - R)), a > O.pitch && (O.pitch = Math.min(a, O.pitch + R))
      }
      if (l != null && O.fov !== a) {
        var ee = .5 * d * d / o;
        Math.abs(l - O.fov) > ee ? _ = Math.min(d + b * o, i) : _ = Math.max(d - b * o, 0), P = _ * b, l < O.fov && (O.fov = Math.max(l, O.fov - P)), l > O.fov && (O.fov = Math.min(l, O.fov + P))
      }
      return h = Y, f = p, u = g, d = _, O
    }
  }
}
var F3 = I3;

function H3(e, t) {
  function r() {
    t && t.length > 0 ? e.apply(null, t) : e()
  }
  setTimeout(r, 0)
}
var k3 = H3;

function N3(e) {
  return e * Math.PI / 180
}
var D3 = N3;

function B3(e) {
  return e * 180 / Math.PI
}
var V3 = B3,
  q3 = {
    WebGlStage: fh,
    WebGlCubeRenderer: Sf,
    WebGlFlatRenderer: Cf,
    WebGlEquirectRenderer: Rf,
    registerDefaultRenderers: zf,
    CubeGeometry: ix,
    FlatGeometry: dx,
    EquirectGeometry: gx,
    RectilinearView: Dx,
    FlatView: Gx,
    ImageUrlSource: ub,
    SingleAssetSource: db,
    StaticAsset: Uo,
    DynamicAsset: yb,
    TextureStore: Uf,
    Layer: Xf,
    RenderLoop: Gf,
    KeyControlMethod: Kf,
    DragControlMethod: ru,
    QtvrControlMethod: iu,
    ScrollZoomControlMethod: su,
    PinchZoomControlMethod: ou,
    VelocityControlMethod: pM,
    ElementPressControlMethod: gM,
    Controls: lu,
    Dynamics: rr,
    Viewer: P3,
    Scene: du,
    Hotspot: hu,
    HotspotContainer: fu,
    colorEffects: L3,
    registerDefaultControls: pu,
    autorotate: F3,
    util: {
      async: rh,
      cancelize: ih,
      chain: fa,
      clamp: gi,
      clearOwnProperties: Te,
      cmp: en,
      compose: Hf,
      convertFov: Ff,
      decimal: ha,
      defaults: Dt,
      defer: k3,
      degToRad: D3,
      delay: Vf,
      dom: ot,
      extend: Yf,
      hash: os,
      inherits: Ht,
      mod: Mr,
      noop: sn,
      now: Vr,
      once: Wo,
      pixelRatio: ns,
      radToDeg: V3,
      real: ca,
      retry: qf,
      tween: mu,
      type: rn
    },
    dependencies: {
      bowser: Yo,
      glMatrix: Ye,
      eventEmitter: Ae,
      hammerjs: Qf
    }
  };
const ei = m0(q3),
  W3 = {
    "Amazon Silk": "amazon_silk",
    "Android Browser": "android",
    Bada: "bada",
    BlackBerry: "blackberry",
    Chrome: "chrome",
    Chromium: "chromium",
    Electron: "electron",
    Epiphany: "epiphany",
    Firefox: "firefox",
    Focus: "focus",
    Generic: "generic",
    "Google Search": "google_search",
    Googlebot: "googlebot",
    "Internet Explorer": "ie",
    "K-Meleon": "k_meleon",
    Maxthon: "maxthon",
    "Microsoft Edge": "edge",
    "MZ Browser": "mz",
    "NAVER Whale Browser": "naver",
    Opera: "opera",
    "Opera Coast": "opera_coast",
    PhantomJS: "phantomjs",
    Puffin: "puffin",
    QupZilla: "qupzilla",
    QQ: "qq",
    QQLite: "qqlite",
    Safari: "safari",
    Sailfish: "sailfish",
    "Samsung Internet for Android": "samsung_internet",
    SeaMonkey: "seamonkey",
    Sleipnir: "sleipnir",
    Swing: "swing",
    Tizen: "tizen",
    "UC Browser": "uc",
    Vivaldi: "vivaldi",
    "WebOS Browser": "webos",
    WeChat: "wechat",
    "Yandex Browser": "yandex",
    Roku: "roku"
  },
  yu = {
    amazon_silk: "Amazon Silk",
    android: "Android Browser",
    bada: "Bada",
    blackberry: "BlackBerry",
    chrome: "Chrome",
    chromium: "Chromium",
    electron: "Electron",
    epiphany: "Epiphany",
    firefox: "Firefox",
    focus: "Focus",
    generic: "Generic",
    googlebot: "Googlebot",
    google_search: "Google Search",
    ie: "Internet Explorer",
    k_meleon: "K-Meleon",
    maxthon: "Maxthon",
    edge: "Microsoft Edge",
    mz: "MZ Browser",
    naver: "NAVER Whale Browser",
    opera: "Opera",
    opera_coast: "Opera Coast",
    phantomjs: "PhantomJS",
    puffin: "Puffin",
    qupzilla: "QupZilla",
    qq: "QQ Browser",
    qqlite: "QQ Browser Lite",
    safari: "Safari",
    sailfish: "Sailfish",
    samsung_internet: "Samsung Internet for Android",
    seamonkey: "SeaMonkey",
    sleipnir: "Sleipnir",
    swing: "Swing",
    tizen: "Tizen",
    uc: "UC Browser",
    vivaldi: "Vivaldi",
    webos: "WebOS Browser",
    wechat: "WeChat",
    yandex: "Yandex Browser"
  },
  Le = {
    tablet: "tablet",
    mobile: "mobile",
    desktop: "desktop",
    tv: "tv"
  },
  rt = {
    WindowsPhone: "Windows Phone",
    Windows: "Windows",
    MacOS: "macOS",
    iOS: "iOS",
    Android: "Android",
    WebOS: "WebOS",
    BlackBerry: "BlackBerry",
    Bada: "Bada",
    Tizen: "Tizen",
    Linux: "Linux",
    ChromeOS: "Chrome OS",
    PlayStation4: "PlayStation 4",
    Roku: "Roku"
  },
  dr = {
    EdgeHTML: "EdgeHTML",
    Blink: "Blink",
    Trident: "Trident",
    Presto: "Presto",
    Gecko: "Gecko",
    WebKit: "WebKit"
  };
class L {
  static getFirstMatch(t, r) {
    const i = r.match(t);
    return i && i.length > 0 && i[1] || ""
  }
  static getSecondMatch(t, r) {
    const i = r.match(t);
    return i && i.length > 1 && i[2] || ""
  }
  static matchAndReturnConst(t, r, i) {
    if (t.test(r)) return i
  }
  static getWindowsVersionName(t) {
    switch (t) {
      case "NT":
        return "NT";
      case "XP":
        return "XP";
      case "NT 5.0":
        return "2000";
      case "NT 5.1":
        return "XP";
      case "NT 5.2":
        return "2003";
      case "NT 6.0":
        return "Vista";
      case "NT 6.1":
        return "7";
      case "NT 6.2":
        return "8";
      case "NT 6.3":
        return "8.1";
      case "NT 10.0":
        return "10";
      default:
        return
    }
  }
  static getMacOSVersionName(t) {
    const r = t.split(".").splice(0, 2).map(i => parseInt(i, 10) || 0);
    if (r.push(0), r[0] === 10) switch (r[1]) {
      case 5:
        return "Leopard";
      case 6:
        return "Snow Leopard";
      case 7:
        return "Lion";
      case 8:
        return "Mountain Lion";
      case 9:
        return "Mavericks";
      case 10:
        return "Yosemite";
      case 11:
        return "El Capitan";
      case 12:
        return "Sierra";
      case 13:
        return "High Sierra";
      case 14:
        return "Mojave";
      case 15:
        return "Catalina";
      default:
        return
    }
  }
  static getAndroidVersionName(t) {
    const r = t.split(".").splice(0, 2).map(i => parseInt(i, 10) || 0);
    if (r.push(0), !(r[0] === 1 && r[1] < 5)) {
      if (r[0] === 1 && r[1] < 6) return "Cupcake";
      if (r[0] === 1 && r[1] >= 6) return "Donut";
      if (r[0] === 2 && r[1] < 2) return "Eclair";
      if (r[0] === 2 && r[1] === 2) return "Froyo";
      if (r[0] === 2 && r[1] > 2) return "Gingerbread";
      if (r[0] === 3) return "Honeycomb";
      if (r[0] === 4 && r[1] < 1) return "Ice Cream Sandwich";
      if (r[0] === 4 && r[1] < 4) return "Jelly Bean";
      if (r[0] === 4 && r[1] >= 4) return "KitKat";
      if (r[0] === 5) return "Lollipop";
      if (r[0] === 6) return "Marshmallow";
      if (r[0] === 7) return "Nougat";
      if (r[0] === 8) return "Oreo";
      if (r[0] === 9) return "Pie"
    }
  }
  static getVersionPrecision(t) {
    return t.split(".").length
  }
  static compareVersions(t, r, i = !1) {
    const n = L.getVersionPrecision(t),
      s = L.getVersionPrecision(r);
    let o = Math.max(n, s),
      a = 0;
    const l = L.map([t, r], c => {
      const h = o - L.getVersionPrecision(c),
        f = c + new Array(h + 1).join(".0");
      return L.map(f.split("."), u => new Array(20 - u.length).join("0") + u).reverse()
    });
    for (i && (a = o - Math.min(n, s)), o -= 1; o >= a;) {
      if (l[0][o] > l[1][o]) return 1;
      if (l[0][o] === l[1][o]) {
        if (o === a) return 0;
        o -= 1
      } else if (l[0][o] < l[1][o]) return -1
    }
  }
  static map(t, r) {
    const i = [];
    let n;
    if (Array.prototype.map) return Array.prototype.map.call(t, r);
    for (n = 0; n < t.length; n += 1) i.push(r(t[n]));
    return i
  }
  static find(t, r) {
    let i, n;
    if (Array.prototype.find) return Array.prototype.find.call(t, r);
    for (i = 0, n = t.length; i < n; i += 1) {
      const s = t[i];
      if (r(s, i)) return s
    }
  }
  static assign(t, ...r) {
    const i = t;
    let n, s;
    if (Object.assign) return Object.assign(t, ...r);
    for (n = 0, s = r.length; n < s; n += 1) {
      const o = r[n];
      typeof o == "object" && o !== null && Object.keys(o).forEach(l => {
        i[l] = o[l]
      })
    }
    return t
  }
  static getBrowserAlias(t) {
    return W3[t]
  }
  static getBrowserTypeByAlias(t) {
    return yu[t] || ""
  }
}
const Ee = /version\/(\d+(\.?_?\d+)+)/i,
  j3 = [{
    test: [/googlebot/i],
    describe(e) {
      const t = {
        name: "Googlebot"
      },
        r = L.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, e) || L.getFirstMatch(Ee, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/opera/i],
    describe(e) {
      const t = {
        name: "Opera"
      },
        r = L.getFirstMatch(Ee, e) || L.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/opr\/|opios/i],
    describe(e) {
      const t = {
        name: "Opera"
      },
        r = L.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, e) || L.getFirstMatch(Ee, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/SamsungBrowser/i],
    describe(e) {
      const t = {
        name: "Samsung Internet for Android"
      },
        r = L.getFirstMatch(Ee, e) || L.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/Whale/i],
    describe(e) {
      const t = {
        name: "NAVER Whale Browser"
      },
        r = L.getFirstMatch(Ee, e) || L.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/MZBrowser/i],
    describe(e) {
      const t = {
        name: "MZ Browser"
      },
        r = L.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, e) || L.getFirstMatch(Ee, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/focus/i],
    describe(e) {
      const t = {
        name: "Focus"
      },
        r = L.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, e) || L.getFirstMatch(Ee, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/swing/i],
    describe(e) {
      const t = {
        name: "Swing"
      },
        r = L.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, e) || L.getFirstMatch(Ee, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/coast/i],
    describe(e) {
      const t = {
        name: "Opera Coast"
      },
        r = L.getFirstMatch(Ee, e) || L.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(e) {
      const t = {
        name: "Opera Touch"
      },
        r = L.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, e) || L.getFirstMatch(Ee, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/yabrowser/i],
    describe(e) {
      const t = {
        name: "Yandex Browser"
      },
        r = L.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, e) || L.getFirstMatch(Ee, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/ucbrowser/i],
    describe(e) {
      const t = {
        name: "UC Browser"
      },
        r = L.getFirstMatch(Ee, e) || L.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/Maxthon|mxios/i],
    describe(e) {
      const t = {
        name: "Maxthon"
      },
        r = L.getFirstMatch(Ee, e) || L.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/epiphany/i],
    describe(e) {
      const t = {
        name: "Epiphany"
      },
        r = L.getFirstMatch(Ee, e) || L.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/puffin/i],
    describe(e) {
      const t = {
        name: "Puffin"
      },
        r = L.getFirstMatch(Ee, e) || L.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/sleipnir/i],
    describe(e) {
      const t = {
        name: "Sleipnir"
      },
        r = L.getFirstMatch(Ee, e) || L.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/k-meleon/i],
    describe(e) {
      const t = {
        name: "K-Meleon"
      },
        r = L.getFirstMatch(Ee, e) || L.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/micromessenger/i],
    describe(e) {
      const t = {
        name: "WeChat"
      },
        r = L.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, e) || L.getFirstMatch(Ee, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/qqbrowser/i],
    describe(e) {
      const t = {
        name: /qqbrowserlite/i.test(e) ? "QQ Browser Lite" : "QQ Browser"
      },
        r = L.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, e) || L.getFirstMatch(Ee, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/msie|trident/i],
    describe(e) {
      const t = {
        name: "Internet Explorer"
      },
        r = L.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/\sedg\//i],
    describe(e) {
      const t = {
        name: "Microsoft Edge"
      },
        r = L.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/edg([ea]|ios)/i],
    describe(e) {
      const t = {
        name: "Microsoft Edge"
      },
        r = L.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/vivaldi/i],
    describe(e) {
      const t = {
        name: "Vivaldi"
      },
        r = L.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/seamonkey/i],
    describe(e) {
      const t = {
        name: "SeaMonkey"
      },
        r = L.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/sailfish/i],
    describe(e) {
      const t = {
        name: "Sailfish"
      },
        r = L.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/silk/i],
    describe(e) {
      const t = {
        name: "Amazon Silk"
      },
        r = L.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/phantom/i],
    describe(e) {
      const t = {
        name: "PhantomJS"
      },
        r = L.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/slimerjs/i],
    describe(e) {
      const t = {
        name: "SlimerJS"
      },
        r = L.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(e) {
      const t = {
        name: "BlackBerry"
      },
        r = L.getFirstMatch(Ee, e) || L.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/(web|hpw)[o0]s/i],
    describe(e) {
      const t = {
        name: "WebOS Browser"
      },
        r = L.getFirstMatch(Ee, e) || L.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/bada/i],
    describe(e) {
      const t = {
        name: "Bada"
      },
        r = L.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/tizen/i],
    describe(e) {
      const t = {
        name: "Tizen"
      },
        r = L.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, e) || L.getFirstMatch(Ee, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/qupzilla/i],
    describe(e) {
      const t = {
        name: "QupZilla"
      },
        r = L.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, e) || L.getFirstMatch(Ee, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/firefox|iceweasel|fxios/i],
    describe(e) {
      const t = {
        name: "Firefox"
      },
        r = L.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/electron/i],
    describe(e) {
      const t = {
        name: "Electron"
      },
        r = L.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/MiuiBrowser/i],
    describe(e) {
      const t = {
        name: "Miui"
      },
        r = L.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/chromium/i],
    describe(e) {
      const t = {
        name: "Chromium"
      },
        r = L.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, e) || L.getFirstMatch(Ee, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/chrome|crios|crmo/i],
    describe(e) {
      const t = {
        name: "Chrome"
      },
        r = L.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/GSA/i],
    describe(e) {
      const t = {
        name: "Google Search"
      },
        r = L.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test(e) {
      const t = !e.test(/like android/i),
        r = e.test(/android/i);
      return t && r
    },
    describe(e) {
      const t = {
        name: "Android Browser"
      },
        r = L.getFirstMatch(Ee, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/playstation 4/i],
    describe(e) {
      const t = {
        name: "PlayStation 4"
      },
        r = L.getFirstMatch(Ee, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/safari|applewebkit/i],
    describe(e) {
      const t = {
        name: "Safari"
      },
        r = L.getFirstMatch(Ee, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/.*/i],
    describe(e) {
      const t = /^(.*)\/(.*) /,
        r = /^(.*)\/(.*)[ \t]\((.*)/,
        n = e.search("\\(") !== -1 ? r : t;
      return {
        name: L.getFirstMatch(n, e),
        version: L.getSecondMatch(n, e)
      }
    }
  }],
  U3 = [{
    test: [/Roku\/DVP/],
    describe(e) {
      const t = L.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, e);
      return {
        name: rt.Roku,
        version: t
      }
    }
  }, {
    test: [/windows phone/i],
    describe(e) {
      const t = L.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, e);
      return {
        name: rt.WindowsPhone,
        version: t
      }
    }
  }, {
    test: [/windows /i],
    describe(e) {
      const t = L.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, e),
        r = L.getWindowsVersionName(t);
      return {
        name: rt.Windows,
        version: t,
        versionName: r
      }
    }
  }, {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe(e) {
      const t = {
        name: rt.iOS
      },
        r = L.getSecondMatch(/(Version\/)(\d[\d.]+)/, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/macintosh/i],
    describe(e) {
      const t = L.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, e).replace(/[_\s]/g, "."),
        r = L.getMacOSVersionName(t),
        i = {
          name: rt.MacOS,
          version: t
        };
      return r && (i.versionName = r), i
    }
  }, {
    test: [/(ipod|iphone|ipad)/i],
    describe(e) {
      const t = L.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, e).replace(/[_\s]/g, ".");
      return {
        name: rt.iOS,
        version: t
      }
    }
  }, {
    test(e) {
      const t = !e.test(/like android/i),
        r = e.test(/android/i);
      return t && r
    },
    describe(e) {
      const t = L.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, e),
        r = L.getAndroidVersionName(t),
        i = {
          name: rt.Android,
          version: t
        };
      return r && (i.versionName = r), i
    }
  }, {
    test: [/(web|hpw)[o0]s/i],
    describe(e) {
      const t = L.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, e),
        r = {
          name: rt.WebOS
        };
      return t && t.length && (r.version = t), r
    }
  }, {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(e) {
      const t = L.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, e) || L.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, e) || L.getFirstMatch(/\bbb(\d+)/i, e);
      return {
        name: rt.BlackBerry,
        version: t
      }
    }
  }, {
    test: [/bada/i],
    describe(e) {
      const t = L.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, e);
      return {
        name: rt.Bada,
        version: t
      }
    }
  }, {
    test: [/tizen/i],
    describe(e) {
      const t = L.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, e);
      return {
        name: rt.Tizen,
        version: t
      }
    }
  }, {
    test: [/linux/i],
    describe() {
      return {
        name: rt.Linux
      }
    }
  }, {
    test: [/CrOS/],
    describe() {
      return {
        name: rt.ChromeOS
      }
    }
  }, {
    test: [/PlayStation 4/],
    describe(e) {
      const t = L.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, e);
      return {
        name: rt.PlayStation4,
        version: t
      }
    }
  }],
  Y3 = [{
    test: [/googlebot/i],
    describe() {
      return {
        type: "bot",
        vendor: "Google"
      }
    }
  }, {
    test: [/huawei/i],
    describe(e) {
      const t = L.getFirstMatch(/(can-l01)/i, e) && "Nova",
        r = {
          type: Le.mobile,
          vendor: "Huawei"
        };
      return t && (r.model = t), r
    }
  }, {
    test: [/nexus\s*(?:7|8|9|10).*/i],
    describe() {
      return {
        type: Le.tablet,
        vendor: "Nexus"
      }
    }
  }, {
    test: [/ipad/i],
    describe() {
      return {
        type: Le.tablet,
        vendor: "Apple",
        model: "iPad"
      }
    }
  }, {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe() {
      return {
        type: Le.tablet,
        vendor: "Apple",
        model: "iPad"
      }
    }
  }, {
    test: [/kftt build/i],
    describe() {
      return {
        type: Le.tablet,
        vendor: "Amazon",
        model: "Kindle Fire HD 7"
      }
    }
  }, {
    test: [/silk/i],
    describe() {
      return {
        type: Le.tablet,
        vendor: "Amazon"
      }
    }
  }, {
    test: [/tablet(?! pc)/i],
    describe() {
      return {
        type: Le.tablet
      }
    }
  }, {
    test(e) {
      const t = e.test(/ipod|iphone/i),
        r = e.test(/like (ipod|iphone)/i);
      return t && !r
    },
    describe(e) {
      const t = L.getFirstMatch(/(ipod|iphone)/i, e);
      return {
        type: Le.mobile,
        vendor: "Apple",
        model: t
      }
    }
  }, {
    test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
    describe() {
      return {
        type: Le.mobile,
        vendor: "Nexus"
      }
    }
  }, {
    test: [/[^-]mobi/i],
    describe() {
      return {
        type: Le.mobile
      }
    }
  }, {
    test(e) {
      return e.getBrowserName(!0) === "blackberry"
    },
    describe() {
      return {
        type: Le.mobile,
        vendor: "BlackBerry"
      }
    }
  }, {
    test(e) {
      return e.getBrowserName(!0) === "bada"
    },
    describe() {
      return {
        type: Le.mobile
      }
    }
  }, {
    test(e) {
      return e.getBrowserName() === "windows phone"
    },
    describe() {
      return {
        type: Le.mobile,
        vendor: "Microsoft"
      }
    }
  }, {
    test(e) {
      const t = Number(String(e.getOSVersion()).split(".")[0]);
      return e.getOSName(!0) === "android" && t >= 3
    },
    describe() {
      return {
        type: Le.tablet
      }
    }
  }, {
    test(e) {
      return e.getOSName(!0) === "android"
    },
    describe() {
      return {
        type: Le.mobile
      }
    }
  }, {
    test(e) {
      return e.getOSName(!0) === "macos"
    },
    describe() {
      return {
        type: Le.desktop,
        vendor: "Apple"
      }
    }
  }, {
    test(e) {
      return e.getOSName(!0) === "windows"
    },
    describe() {
      return {
        type: Le.desktop
      }
    }
  }, {
    test(e) {
      return e.getOSName(!0) === "linux"
    },
    describe() {
      return {
        type: Le.desktop
      }
    }
  }, {
    test(e) {
      return e.getOSName(!0) === "playstation 4"
    },
    describe() {
      return {
        type: Le.tv
      }
    }
  }, {
    test(e) {
      return e.getOSName(!0) === "roku"
    },
    describe() {
      return {
        type: Le.tv
      }
    }
  }],
  X3 = [{
    test(e) {
      return e.getBrowserName(!0) === "microsoft edge"
    },
    describe(e) {
      if (/\sedg\//i.test(e)) return {
        name: dr.Blink
      };
      const r = L.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, e);
      return {
        name: dr.EdgeHTML,
        version: r
      }
    }
  }, {
    test: [/trident/i],
    describe(e) {
      const t = {
        name: dr.Trident
      },
        r = L.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test(e) {
      return e.test(/presto/i)
    },
    describe(e) {
      const t = {
        name: dr.Presto
      },
        r = L.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test(e) {
      const t = e.test(/gecko/i),
        r = e.test(/like gecko/i);
      return t && !r
    },
    describe(e) {
      const t = {
        name: dr.Gecko
      },
        r = L.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }, {
    test: [/(apple)?webkit\/537\.36/i],
    describe() {
      return {
        name: dr.Blink
      }
    }
  }, {
    test: [/(apple)?webkit/i],
    describe(e) {
      const t = {
        name: dr.WebKit
      },
        r = L.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t
    }
  }];
class Wl {
  constructor (t, r = !1) {
    if (t == null || t === "") throw new Error("UserAgent parameter can't be empty");
    this._ua = t, this.parsedResult = {}, r !== !0 && this.parse()
  }
  getUA() {
    return this._ua
  }
  test(t) {
    return t.test(this._ua)
  }
  parseBrowser() {
    this.parsedResult.browser = {};
    const t = L.find(j3, r => {
      if (typeof r.test == "function") return r.test(this);
      if (r.test instanceof Array) return r.test.some(i => this.test(i));
      throw new Error("Browser's test function is not valid")
    });
    return t && (this.parsedResult.browser = t.describe(this.getUA())), this.parsedResult.browser
  }
  getBrowser() {
    return this.parsedResult.browser ? this.parsedResult.browser : this.parseBrowser()
  }
  getBrowserName(t) {
    return t ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || ""
  }
  getBrowserVersion() {
    return this.getBrowser().version
  }
  getOS() {
    return this.parsedResult.os ? this.parsedResult.os : this.parseOS()
  }
  parseOS() {
    this.parsedResult.os = {};
    const t = L.find(U3, r => {
      if (typeof r.test == "function") return r.test(this);
      if (r.test instanceof Array) return r.test.some(i => this.test(i));
      throw new Error("Browser's test function is not valid")
    });
    return t && (this.parsedResult.os = t.describe(this.getUA())), this.parsedResult.os
  }
  getOSName(t) {
    const {
      name: r
    } = this.getOS();
    return t ? String(r).toLowerCase() || "" : r || ""
  }
  getOSVersion() {
    return this.getOS().version
  }
  getPlatform() {
    return this.parsedResult.platform ? this.parsedResult.platform : this.parsePlatform()
  }
  getPlatformType(t = !1) {
    const {
      type: r
    } = this.getPlatform();
    return t ? String(r).toLowerCase() || "" : r || ""
  }
  parsePlatform() {
    this.parsedResult.platform = {};
    const t = L.find(Y3, r => {
      if (typeof r.test == "function") return r.test(this);
      if (r.test instanceof Array) return r.test.some(i => this.test(i));
      throw new Error("Browser's test function is not valid")
    });
    return t && (this.parsedResult.platform = t.describe(this.getUA())), this.parsedResult.platform
  }
  getEngine() {
    return this.parsedResult.engine ? this.parsedResult.engine : this.parseEngine()
  }
  getEngineName(t) {
    return t ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || ""
  }
  parseEngine() {
    this.parsedResult.engine = {};
    const t = L.find(X3, r => {
      if (typeof r.test == "function") return r.test(this);
      if (r.test instanceof Array) return r.test.some(i => this.test(i));
      throw new Error("Browser's test function is not valid")
    });
    return t && (this.parsedResult.engine = t.describe(this.getUA())), this.parsedResult.engine
  }
  parse() {
    return this.parseBrowser(), this.parseOS(), this.parsePlatform(), this.parseEngine(), this
  }
  getResult() {
    return L.assign({}, this.parsedResult)
  }
  satisfies(t) {
    const r = {};
    let i = 0;
    const n = {};
    let s = 0;
    if (Object.keys(t).forEach(a => {
      const l = t[a]; typeof l == "string" ? (n[a] = l, s += 1) : typeof l == "object" && (r[a] = l, i += 1)
    }), i > 0) {
      const a = Object.keys(r),
        l = L.find(a, h => this.isOS(h));
      if (l) {
        const h = this.satisfies(r[l]);
        if (h !== void 0) return h
      }
      const c = L.find(a, h => this.isPlatform(h));
      if (c) {
        const h = this.satisfies(r[c]);
        if (h !== void 0) return h
      }
    }
    if (s > 0) {
      const a = Object.keys(n),
        l = L.find(a, c => this.isBrowser(c, !0));
      if (l !== void 0) return this.compareVersion(n[l])
    }
  }
  isBrowser(t, r = !1) {
    const i = this.getBrowserName().toLowerCase();
    let n = t.toLowerCase();
    const s = L.getBrowserTypeByAlias(n);
    return r && s && (n = s.toLowerCase()), n === i
  }
  compareVersion(t) {
    let r = [0],
      i = t,
      n = !1;
    const s = this.getBrowserVersion();
    if (typeof s == "string") return t[0] === ">" || t[0] === "<" ? (i = t.substr(1), t[1] === "=" ? (n = !0, i = t.substr(2)) : r = [], t[0] === ">" ? r.push(1) : r.push(-1)) : t[0] === "=" ? i = t.substr(1) : t[0] === "~" && (n = !0, i = t.substr(1)), r.indexOf(L.compareVersions(s, i, n)) > -1
  }
  isOS(t) {
    return this.getOSName(!0) === String(t).toLowerCase()
  }
  isPlatform(t) {
    return this.getPlatformType(!0) === String(t).toLowerCase()
  }
  isEngine(t) {
    return this.getEngineName(!0) === String(t).toLowerCase()
  }
  is(t, r = !1) {
    return this.isBrowser(t, r) || this.isOS(t) || this.isPlatform(t)
  }
  some(t = []) {
    return t.some(r => this.is(r))
  }
}
/*!
* Bowser - a browser detector
* https://github.com/lancedikson/bowser
* MIT License | (c) Dustin Diaz 2012-2015
* MIT License | (c) Denis Demchenko 2015-2019
*/
class G3 {
  static getParser(t, r = !1) {
    if (typeof t != "string") throw new Error("UserAgent should be a string");
    return new Wl(t, r)
  }
  static parse(t) {
    return new Wl(t).getResult()
  }
  static get BROWSER_MAP() {
    return yu
  }
  static get ENGINE_MAP() {
    return dr
  }
  static get OS_MAP() {
    return rt
  }
  static get PLATFORMS_MAP() {
    return Le
  }
}
const jl = [
  ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
  ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
  ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
  ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
  ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
],
  Xt = (() => {
    if (typeof document > "u") return !1;
    const e = jl[0],
      t = {};
    for (const r of jl)
      if ((r == null ? void 0 : r[1]) in document) {
        for (const [n, s] of r.entries()) t[e[n]] = s;
        return t
      }
    return !1
  })(),
  Ul = {
    change: Xt.fullscreenchange,
    error: Xt.fullscreenerror
  };
let ut = {
  request(e = document.documentElement, t) {
    return new Promise((r, i) => {
      const n = () => {
        ut.off("change", n),
          r()
      }; ut.on("change", n);
      const s = e[Xt.requestFullscreen](t); s instanceof Promise && s.then(n).catch(i)
    })
  },
  exit() {
    return new Promise((e, t) => {
      if (!ut.isFullscreen) {
        e();
        return
      }
      const r = () => {
        ut.off("change", r),
          e()
      }; ut.on("change", r);
      const i = document[Xt.exitFullscreen](); i instanceof Promise && i.then(r).catch(t)
    })
  },
  toggle(e, t) {
    return ut.isFullscreen ? ut.exit() : ut.request(e, t)
  },
  onchange(e) {
    ut.on("change", e)
  },
  onerror(e) {
    ut.on("error", e)
  },
  on(e, t) {
    const r = Ul[e];
    r && document.addEventListener(r, t, !1)
  },
  off(e, t) {
    const r = Ul[e];
    r && document.removeEventListener(r, t, !1)
  },
  raw: Xt
};
Object.defineProperties(ut, {
  isFullscreen: {
    get: () => !!document[Xt.fullscreenElement]
  },
  element: {
    enumerable: !0,
    get: () => document[Xt.fullscreenElement] ?? void 0
  },
  isEnabled: {
    enumerable: !0,
    get: () => !!document[Xt.fullscreenEnabled]
  }
});
Xt || (ut = {
  isEnabled: !1
});
const K3 = {
  scenes: [{
    id: "0-1_1",
    name: "1_1",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: !0
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1536,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -.4479951181433961,
      pitch: .11784640231160637,
      rotation: 0,
      target: "1-1_2"
    }, {
      yaw: -1.096996090757294,
      pitch: .07740128826461223,
      rotation: 0,
      target: "2-2_1"
    }],
    infoHotspots: [{
      yaw: .032556626549144596,
      pitch: .01899311574390694,
      title: "Title",
      text: "Text"
    }, {
      yaw: -1.6860174080553243,
      pitch: .04298512843750579,
      title: "Title",
      text: "Text"
    }, {
      yaw: -2.152129299245898,
      pitch: .09028773195394635,
      title: "Title",
      text: "Text"
    }, {
      yaw: 2.075213238605654,
      pitch: .05566651551611912,
      title: "Title",
      text: "Text"
    }, {
      yaw: 1.6466927739326183,
      pitch: .04866698250505763,
      title: "Title",
      text: "Text"
    }]
  }, {
    id: "1-1_2",
    name: "1_2",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: !0
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1536,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: .5417457869125002,
      pitch: .17764405064037803,
      rotation: 0,
      target: "0-1_1"
    }, {
      yaw: 1.5983091422321287,
      pitch: .11210029549700273,
      rotation: 0,
      target: "2-2_1"
    }],
    infoHotspots: [{
      yaw: 8479545047279657e-20,
      pitch: .01955290694543521,
      title: "Title",
      text: "Text"
    }, {
      yaw: -1.0379327558699565,
      pitch: .03824411328001531,
      title: "Title",
      text: "Text"
    }, {
      yaw: -1.2959712734035342,
      pitch: .03289981823662913,
      title: "Title",
      text: "Text"
    }, {
      yaw: .8634787060745168,
      pitch: .03879569280121942,
      title: "Title",
      text: "Text"
    }, {
      yaw: 1.1569252096116447,
      pitch: .033000383735657834,
      title: "Title",
      text: "Text"
    }]
  }, {
    id: "2-2_1",
    name: "2_1",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: !0
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1536,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 1.2357547723854232,
      pitch: .08343081679124076,
      rotation: 0,
      target: "1-1_2"
    }, {
      yaw: -.9268832205356468,
      pitch: .0913909519159013,
      rotation: 0,
      target: "4-3_1"
    }, {
      yaw: -.4137553455388101,
      pitch: .046986794447811064,
      rotation: 0,
      target: "3-2_2"
    }],
    infoHotspots: [{
      yaw: 1.905616571596326,
      pitch: .0582969620100009,
      title: "Title",
      text: "Text"
    }, {
      yaw: 2.519102332785528,
      pitch: .09044194037239173,
      title: "Title",
      text: "Text"
    }, {
      yaw: -2.7826365036894085,
      pitch: .14949075385601596,
      title: "Title",
      text: "Text"
    }, {
      yaw: -2.4252301985122866,
      pitch: .06932481848186356,
      title: "Title",
      text: "Text"
    }, {
      yaw: -1.884829580038165,
      pitch: .06245981677865231,
      title: "Title",
      text: "Text"
    }, {
      yaw: -1.5776196675025886,
      pitch: .03732735299519341,
      title: "Title",
      text: "Text"
    }, {
      yaw: -.021518819678451706,
      pitch: -.10317808889298341,
      title: "Title",
      text: "Text"
    }]
  }, {
    id: "3-2_2",
    name: "2_2",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: !0
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1536,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -.5890449920810834,
      pitch: .06252599328983166,
      rotation: 0,
      target: "1-1_2"
    }, {
      yaw: 1.4335917353242813,
      pitch: .08532540554775636,
      rotation: 0,
      target: "4-3_1"
    }, {
      yaw: .28766572591904804,
      pitch: .1248047088873232,
      rotation: 0,
      target: "2-2_1"
    }],
    infoHotspots: [{
      yaw: -.051649252216160235,
      pitch: -.11259166542701315,
      title: "Title",
      text: "Text"
    }, {
      yaw: -1.3680422732596043,
      pitch: .03949566403227678,
      title: "Title",
      text: "Text"
    }, {
      yaw: -1.5104295838856512,
      pitch: .06470314695348733,
      title: "Title",
      text: "Text"
    }, {
      yaw: -2.9536575092724497,
      pitch: .152420011845404,
      title: "Title",
      text: "Text"
    }, {
      yaw: 2.6281772662285245,
      pitch: .1163794059293739,
      title: "Title",
      text: "Text"
    }, {
      yaw: 1.0208962677257212,
      pitch: .05584971595825827,
      title: "Title",
      text: "Text"
    }, {
      yaw: .8291861878335691,
      pitch: .05709654690878274,
      title: "Title",
      text: "Text"
    }, {
      yaw: .47060938727903867,
      pitch: .04778323512596927,
      title: "Title",
      text: "Text"
    }, {
      yaw: .3274856628557181,
      pitch: .05314919831555187,
      title: "Title",
      text: "Text"
    }]
  }, {
    id: "4-3_1",
    name: "3_1",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: !0
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1536,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 1.6450691106986017,
      pitch: .07573484271319231,
      rotation: 0,
      target: "3-2_2"
    }, {
      yaw: -2.3130546415003383,
      pitch: .13647922212828156,
      rotation: 0,
      target: "7-4_1"
    }, {
      yaw: -.2745526206328961,
      pitch: .09728543524350464,
      rotation: 0,
      target: "5-3_2"
    }, {
      yaw: -1.167238928151047,
      pitch: .19808359526889063,
      rotation: 0,
      target: "6-3_3"
    }],
    infoHotspots: [{
      yaw: -1.5576398476379119,
      pitch: .06233916712297116,
      title: "Title",
      text: "Text"
    }, {
      yaw: -1.311885549699344,
      pitch: .03528720773156735,
      title: "Title",
      text: "Text"
    }, {
      yaw: -.016760215854844773,
      pitch: .011172485205220184,
      title: "Title",
      text: "Text"
    }]
  }, {
    id: "5-3_2",
    name: "3_2",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: !0
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1536,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -.5452162993663343,
      pitch: .0435830148805465,
      rotation: 0,
      target: "3-2_2"
    }, {
      yaw: .5284364770590848,
      pitch: .025626856396248954,
      rotation: 0,
      target: "7-4_1"
    }, {
      yaw: -.18502691412107986,
      pitch: .08599385632979306,
      rotation: 0,
      target: "4-3_1"
    }, {
      yaw: .8931973756392786,
      pitch: .21952257936151476,
      rotation: 0,
      target: "6-3_3"
    }],
    infoHotspots: [{
      yaw: .9942716407770327,
      pitch: .05734376271705344,
      title: "Title",
      text: "Text"
    }, {
      yaw: 1.1809024634388692,
      pitch: .05261518455796832,
      title: "Title",
      text: "Text"
    }, {
      yaw: -2.0298351155146594,
      pitch: .13633802251672122,
      title: "Title",
      text: "Text"
    }, {
      yaw: -1.6441429326527661,
      pitch: .06246535638732631,
      title: "Title",
      text: "Text"
    }, {
      yaw: -.0599696607736,
      pitch: .018159321654694693,
      title: "Title",
      text: "Text"
    }]
  }, {
    id: "6-3_3",
    name: "3_3",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: !0
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1536,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: .46362932513748234,
      pitch: .01687527364899921,
      rotation: 0,
      target: "3-2_2"
    }, {
      yaw: 1.520777574956031,
      pitch: .11147403360009633,
      rotation: 0,
      target: "7-4_1"
    }, {
      yaw: .793192954831861,
      pitch: .1667086065961918,
      rotation: 0,
      target: "4-3_1"
    }, {
      yaw: -.6997272845208098,
      pitch: .19352322041852332,
      rotation: 0,
      target: "5-3_2"
    }],
    infoHotspots: [{
      yaw: 2.520506138518991,
      pitch: .11372410317516213,
      title: "Title",
      text: "Text"
    }, {
      yaw: -3.0994314667781993,
      pitch: .09424594430787714,
      title: "Title",
      text: "Text"
    }, {
      yaw: -.6153360272692474,
      pitch: .054969341955246165,
      title: "Title",
      text: "Text"
    }, {
      yaw: -.42223562847058815,
      pitch: .04245235543808512,
      title: "Title",
      text: "Text"
    }, {
      yaw: .08898862169693444,
      pitch: .023368343027296845,
      title: "Title",
      text: "Text"
    }]
  }, {
    id: "7-4_1",
    name: "4_1",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: !0
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1536,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 1.3515521494789429,
      pitch: .08618985315634475,
      rotation: 0,
      target: "6-3_3"
    }, {
      yaw: -.6134586572694829,
      pitch: .053999677298220305,
      rotation: 0,
      target: "9-5_1"
    }, {
      yaw: -.15783704211306748,
      pitch: .09255278841432357,
      rotation: 0,
      target: "8-4_2"
    }],
    infoHotspots: [{
      yaw: -1.440991025410348,
      pitch: .07020499367879296,
      title: "Title",
      text: "Text"
    }, {
      yaw: -3.0875917184587642,
      pitch: .18651456978570025,
      title: "Title",
      text: "Text"
    }, {
      yaw: .6515072981298484,
      pitch: .046271415211556643,
      title: "Title",
      text: "Text"
    }]
  }, {
    id: "8-4_2",
    name: "4_2",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: !0
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1536,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -.6343969870755579,
      pitch: .05208650646816615,
      rotation: 0,
      target: "6-3_3"
    }, {
      yaw: 1.2645838498153186,
      pitch: .09981433845413257,
      rotation: 0,
      target: "9-5_1"
    }, {
      yaw: -.2113447781927249,
      pitch: .0684898719058129,
      rotation: 0,
      target: "7-4_1"
    }],
    infoHotspots: [{
      yaw: .6295798541670088,
      pitch: .028522212095168697,
      title: "Title",
      text: "Text"
    }, {
      yaw: -1.4240134232901944,
      pitch: .09434481599050137,
      title: "Title",
      text: "Text"
    }, {
      yaw: 2.901621048267913,
      pitch: .20608034066340508,
      title: "Title",
      text: "Text"
    }]
  }, {
    id: "9-5_1",
    name: "5_1",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: !0
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1536,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 1.5220749984076107,
      pitch: .10072096233117378,
      rotation: 0,
      target: "8-4_2"
    }, {
      yaw: -.5227296988572316,
      pitch: .04852552951849276,
      rotation: 0,
      target: "11-6_1"
    }, {
      yaw: -.06315845390028407,
      pitch: .061005281147235024,
      rotation: 0,
      target: "10-5_2"
    }],
    infoHotspots: [{
      yaw: -1.4592659490923872,
      pitch: .07956959935828323,
      title: "Title",
      text: "Text"
    }, {
      yaw: 3.043592701489807,
      pitch: .1409421039550356,
      title: "Title",
      text: "Text"
    }, {
      yaw: .8255126714520831,
      pitch: .03616599885681282,
      title: "Title",
      text: "Text"
    }]
  }, {
    id: "10-5_2",
    name: "5_2",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: !0
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1536,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -.9193760122152987,
      pitch: .07723540423609876,
      rotation: 0,
      target: "8-4_2"
    }, {
      yaw: 1.134728260025046,
      pitch: .10044441445946539,
      rotation: 0,
      target: "11-6_1"
    }, {
      yaw: -.3762374810910529,
      pitch: .07938907720311938,
      rotation: 0,
      target: "9-5_1"
    }],
    infoHotspots: [{
      yaw: .38347170462601454,
      pitch: .032196241341509335,
      title: "Title",
      text: "Text"
    }, {
      yaw: -1.7444524431858923,
      pitch: .06825575160957165,
      title: "Title",
      text: "Text"
    }, {
      yaw: 2.8353748579237177,
      pitch: .17167857197717318,
      title: "Title",
      text: "Text"
    }]
  }, {
    id: "11-6_1",
    name: "6_1",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: !0
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1536,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: 1.3567640035489248,
      pitch: .09270839007605503,
      rotation: 0,
      target: "10-5_2"
    }, {
      yaw: -.2550913442684166,
      pitch: .09715660994054431,
      rotation: 0,
      target: "12-6_2"
    }],
    infoHotspots: [{
      yaw: -.6650779428525837,
      pitch: .07068479557167606,
      title: "Title",
      text: "Text"
    }, {
      yaw: -1.7647346550744558,
      pitch: .09347518374195118,
      title: "Title",
      text: "Text"
    }, {
      yaw: 2.662202289328521,
      pitch: .12183349682968192,
      title: "Title",
      text: "Text"
    }, {
      yaw: .6400262604125331,
      pitch: .04240242953593665,
      title: "Title",
      text: "Text"
    }]
  }, {
    id: "12-6_2",
    name: "6_2",
    levels: [{
      tileSize: 256,
      size: 256,
      fallbackOnly: !0
    }, {
      tileSize: 512,
      size: 512
    }, {
      tileSize: 512,
      size: 1024
    }, {
      tileSize: 512,
      size: 2048
    }],
    faceSize: 1536,
    initialViewParameters: {
      pitch: 0,
      yaw: 0,
      fov: 1.5707963267948966
    },
    linkHotspots: [{
      yaw: -.9606515463310252,
      pitch: .06712884604857194,
      rotation: 0,
      target: "10-5_2"
    }, {
      yaw: -.389374900117323,
      pitch: .10798776647417796,
      rotation: 0,
      target: "11-6_1"
    }],
    infoHotspots: [{
      yaw: -1.7358815975913036,
      pitch: .08140862157098638,
      title: "Title",
      text: "Text"
    }, {
      yaw: 2.750430781575747,
      pitch: .2014916508813922,
      title: "Title",
      text: "Text"
    }, {
      yaw: .8945823815917855,
      pitch: .09572825342139168,
      title: "Title",
      text: "Text"
    }, {
      yaw: .33007960134101744,
      pitch: .058016156527266105,
      title: "Title",
      text: "Text"
    }]
  }],
  name: "Project Title",
  settings: {
    mouseViewMode: "drag",
    autorotateEnabled: !0,
    fullscreenButton: !1,
    viewControlButtons: !1
  }
};
let vi = null,
  yo = null,
  go = null;

function Yl() {
  document.body.querySelectorAll(".hotspot").forEach(e => e.style.visibility = "hidden")
}

function Z3() {
  document.body.querySelectorAll(".hotspot").forEach(e => e.style.visibility = "visible")
}

function Q3(e) {
  go = e
}

function J3() {
  var e = G3,
    t = K3,
    r = document.querySelector("#pano");
  if (window.matchMedia) {
    var i = function () {
      n.matches ? (document.body.classList.remove("desktop"), document.body.classList.add("mobile")) : (document.body.classList.remove("mobile"), document.body.classList.add("desktop"))
    },
      n = matchMedia("(max-width: 500px), (max-height: 500px)");
    i(), n.addListener(i)
  } else document.body.classList.add("desktop");
  document.body.classList.add("no-touch"), window.addEventListener("touchstart", function () {
    document.body.classList.remove("no-touch"), document.body.classList.add("touch")
  }), e.msie && parseFloat(e.version) < 11 && document.body.classList.add("tooltip-fallback");
  var s = {
    controls: {
      mouseViewMode: t.settings.mouseViewMode
    }
  };
  vi = new ei.Viewer(r, s);
  var o = t.scenes.map(function (d) {
    var p = "tiles",
      g = ei.ImageUrlSource.fromString(p + "/" + d.id + "/{z}/{f}/{y}/{x}.jpeg", {
        cubeMapPreviewUrl: p + "/" + d.id + "/preview.jpg"
      }),
      _ = new ei.CubeGeometry(d.levels),
      b = ei.RectilinearView.limit.traditional(d.faceSize, 100 * Math.PI / 180, 120 * Math.PI / 180),
      S = new ei.RectilinearView(d.initialViewParameters, b),
      R = vi.createScene({
        source: g,
        geometry: _,
        view: S,
        pinFirstLevel: !0
      });
    return d.linkHotspots.forEach(function (P) {
      var H = l(P);
      R.hotspotContainer().createHotspot(H, {
        yaw: P.yaw,
        pitch: P.pitch
      })
    }), d.infoHotspots.forEach(function (P) {
      var H = c(P);
      R.hotspotContainer().createHotspot(H, {
        yaw: P.yaw,
        pitch: P.pitch
      })
    }), {
      data: d,
      scene: R,
      view: S
    }
  });
  yo = ei.autorotate({
    yawSpeed: .03,
    targetPitch: 0,
    targetFov: Math.PI / 2
  });

  function a(d) {
    wu(), d.view.setParameters(d.data.initialViewParameters), d.scene.switchTo(), gu()
  }

  function l(d) {
    var p = document.createElement("div");
    p.classList.add("hotspot"), p.classList.add("link-hotspot");
    var g = document.createElement("img");
    g.src = "img/link.png", g.classList.add("link-hotspot-icon");
    for (var _ = ["-ms-transform", "-webkit-transform", "transform"], b = 0; b < _.length; b++) {
      var S = _[b];
      g.style[S] = "rotate(" + d.rotation + "rad)"
    }
    p.addEventListener("click", function () {
      a(f(d.target))
    }), h(p);
    var R = document.createElement("div");
    return R.classList.add("hotspot-tooltip"), R.classList.add("link-hotspot-tooltip"), R.innerHTML = u(d.target).name, p.appendChild(g), p
  }

  function c(d) {
    var p = document.createElement("div");
    p.classList.add("hotspot"), p.classList.add("info-hotspot");
    var g = document.createElement("div");
    g.classList.add("info-hotspot-icon-wrapper"), p.appendChild(g);
    var _ = function () {
      p.classList.toggle("visible"), go && go(d)
    };
    return p.addEventListener("click", _), h(p), p
  }

  function h(d, g) {
    for (var g = ["touchstart", "touchmove", "touchend", "touchcancel", "wheel", "mousewheel"], _ = 0; _ < g.length; _++) d.addEventListener(g[_], function (b) {
      b.stopPropagation()
    })
  }

  function f(d) {
    for (var p = 0; p < o.length; p++)
      if (o[p].data.id === d) return o[p];
    return null
  }

  function u(d) {
    for (var p = 0; p < t.scenes.length; p++)
      if (t.scenes[p].id === d) return t.scenes[p];
    return null
  }
  a(o[0])
}

function gu() {
  vi.startMovement(yo), vi.setIdleMovement(3e3, yo)
}

function wu() {
  vi.stopMovement(), vi.setIdleMovement(1 / 0)
}
const eE = e => (gc("data-v-b882ab53"), e = e(), wc(), e),
  tE = {
    key: 0,
    class: "modal"
  },
  rE = eE(() => $t("img", {
    src: p0,
    alt: ""
  }, null, -1)),
  iE = [rE],
  nE = {
    __name: "Gallery",
    setup(e) {
      const t = Fr(!1),
        r = Fr(!1);
      Q3(s => {
        r.value = !0,
          wu(),
          t.value = !0
      });
      const n = () => {
        r.value = !1,
          t.value = !1,
          gu()
      };
      return (s, o) => (pt(), It(yt, null, [(pt(), kc(xv, {
        to: "body"
      }, [r.value ? (pt(), It("div", {
        key: 0,
        class: "blur",
        onClick: n
      })) : ao("", !0)])), t.value ? (pt(), It("div", tE, iE)) : ao("", !0)], 64))
    }
  },
  sE = yi(nE, [
    ["__scopeId", "data-v-b882ab53"]
  ]),
  oE = {};

function aE(e, t) {
  return pt(), It("h1", null, "Cart Page")
}
const lE = yi(oE, [
  ["render", aE]
]),
  cE = {};

function hE(e, t) {
  return pt(), It("h1", null, "Contact Page")
}
const fE = yi(cE, [
  ["render", hE]
]),
  uE = {};

function dE(e, t) {
  return pt(), It("h1", null, "Sold Page")
}
const vE = yi(uE, [
  ["render", dE]
]),
  pE = {};

function mE(e, t) {
  return pt(), It("h1", null, "About Page")
}
const _E = yi(pE, [
  ["render", mE]
]),
  yE = [{
    path: "/",
    name: "Home",
    component: v0
  }, {
    path: "/gallery",
    name: "Gallery",
    component: sE
  }, {
    path: "/about",
    name: "About",
    component: _E
  }, {
    path: "/cart",
    name: "Cart",
    component: lE
  }, {
    path: "/contact",
    name: "Contact",
    component: fE
  }, {
    path: "/sold",
    name: "Sold",
    component: vE
  }],
  gE = o0({
    history: bp(),
    routes: yE
  });
const wE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAAgCAYAAAAyjgdLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQwSURBVHgB7ZrhcdowFMcfHJdvudIJ6gyQC7kMUGeCJhMQJoBMgDNB0gmgEySZAPo9d6ET4E4AG6jvoSdQXNmWbeEYTr87nUFS/jb660nPdgA8Ho+nkQgheuDJpfX29iagJCcnJ3B+fh61Wq0H+CTQ6DEeIiz3eB1P4EmlDdWJeMA/izM+dsGTiQuzic823GOBK7MJb3jDcWk24Q1vMK7NJrzhDaWT1oCGxe12ew5Zf9zpUFJ0Y2giw2PMjn9Bg8BrouvtY6FbNZXQ/cXygtc6hwKkaP3BMi+hFeLhgrUCLDGWBZZX1IrBEalmk9FXV1cDyAAvMgCz2cQZNAQ2ZohlBOasfUiTE4+DPKNYawLm3011Y+wzZ604RytgrTClyxP2meLxwYXpHThy2JwZyKgh5lheQEY0EWL5ATKiZtg/9X6dzZlxX2CdV5CRqFa576z5jv2vUWuRotVjLfq7NRZaBResFbAGrRx39Jm1YqjA0ZuNkHE0sDSgt4bIJcNGOJjUj6L/ET8vUiJcGR1jMQ3+C0+IR5DG0+S5TPbjPs8gjV7wdSW1ptgv0s6ptNZQkn0kaI0BB+cOZHQQ11lLNLbREq9yjLFBi9oDSDda6VCucgvSRLXkJ4lstagd5ESl/iOowFGbDXJ5JqZpy2kCGkwa2JCTJp0hHyPL5fSejyFvJRu0xI4Y5EUqn+tn4hpKcexmh3y0uivggVeTYpuA8f4a8NdXS605yMj9oKVdU1wga1c5RJe3gFIcrdk8KCqibKJa8ZuPX7Q6pRMX3DOVVqDVqc8xWMLnVP0voCTHHtkbSiY1AeyH7cSBcnyFknROT0+NDfj6smvYt5IE0Fy2BlOUF7ht0R+QJLWKvln7ZqiL+Vj0HXzVSSIzVrEfIqgBeuiQdj6sW3KbdRar/U1fq+tqvyu01AlMY4Gfe1y3ElrilqPV07SKTrgtbZzxUzwO4PAxDYJKzIY2gyTkrVrAX9V+q7aBOX+1fe7fN1XyXYG6LbPVUpN1WuU+e4twH+ER1ABFLZ9vZmjrcgQRkxydntY3MrSH2m8b52j1xS56/9PD7zea1ihHa6z1DcAVwq3hEdRA0gQhl89uSvtSJJZhISfEWDPmPeNckaY1EYn/feNzP2rnytpinhJageF3zfY6nsKd4RHURGLgNgOdaA/Fbi/e9jHUPYuc5V58NJxYGbTouXjAeqljkaG1StRVenKWiXBjeAQ1wgO35HOblnQa/BEbkRzgmbBMvDStqfhoiuDzR1q/GdePSmjRd5rEATiiBekXQU99it4e6BR+r1sXQkbvJoKrvknSzFjryRPXqxXm0uZxrXZdayeJmKccQu7ttHpYBYDY7ddL8BwWYpdBr/IMF7tsnOiD5/DQopWYiOxsvPa8xeMYYZeNe6OPBS2DXhqMn4gCmX2dtMBTCZeZ/b75B/TAvwTrg7WIAAAAAElFTkSuQmCC";
const xE = $t("div", {
  id: "pano"
}, null, -1),
  bE = {
    key: 0,
    class: "vignette"
  },
  ME = {
    class: "left"
  },
  EE = $t("img", {
    src: wE,
    alt: ""
  }, null, -1),
  TE = {
    __name: "App",
    setup(e) {
      const t = l0(),
        r = Fr(!0),
        i = Fr(null),
        n = Fr(null),
        s = Fr(null),
        o = c => {
          i.value.style["pointer-events"] = c ? "none" : "auto",
            n.value.style["pointer-events"] = "auto"
        },
        a = c => {
          s.value.style.visibility = c ? "visible" : "hidden"
        };
      Sc(() => {
        J3(),
          Yl()
      }), Oi(() => t.path, async c => {
        c == "/" ? a(!1) : a(!0),
          c == "/gallery" ? (Z3(), r.value = !1, o(!0)) : (Yl(), r.value = !0, o(!1))
      });
      const l = c => c == t.path ? "active" : "";
      return (c, h) => {
        const f = Js("router-link"),
          u = Js("router-view");
        return pt(),
          It(yt, null, [xE, r.value ? (pt(), It("div", bE)) : ao("", !0), $t("div", {
            class: "container",
            ref_key: "container",
            ref: i
          }, [$t("div", {
            class: "nav",
            ref_key: "nav",
            ref: n
          }, [$t("div", ME, [$e(f, {
            to: "/",
            class: Yt(l("/"))
          }, {
            default: vr(() => [EE]),
            _: 1
          }, 8, ["class"])]), $t("div", {
            class: "right",
            ref_key: "links",
            ref: s
          }, [$e(f, {
            to: "/about",
            class: Yt(l("/about"))
          }, {
            default: vr(() => [$r("О нас")]),
            _: 1
          }, 8, ["class"]), $e(f, {
            to: "/gallery",
            class: Yt(l("/gallery"))
          }, {
            default: vr(() => [$r("Галерея")]),
            _: 1
          }, 8, ["class"]), $e(f, {
            to: "/cart",
            class: Yt(l("/cart"))
          }, {
            default: vr(() => [$r("Корзина")]),
            _: 1
          }, 8, ["class"]), $e(f, {
            to: "/contact",
            class: Yt(l("/contact"))
          }, {
            default: vr(() => [$r("Контакты")]),
            _: 1
          }, 8, ["class"]), $e(f, {
            to: "/sold",
            class: Yt(l("/sold"))
          }, {
            default: vr(() => [$r("Проданные экспонаты")]),
            _: 1
          }, 8, ["class"])], 512)], 512), $e(u)], 512)], 64)
      }
    }
  };
ip(TE).use(gE).mount("#app");
