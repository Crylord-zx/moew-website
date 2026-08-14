(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [2001], {
        4525: (e, t, r) => {
            "use strict";
            r.d(t, {
                default: () => s
            });
            var a = r(1521),
                l = {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: 24,
                    height: 24,
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                },
                i = r(5695);
            let o = (0, a.createContext)({}),
                s = (0, a.forwardRef)(({
                    color: e,
                    size: t,
                    strokeWidth: r,
                    absoluteStrokeWidth: s,
                    className: n = "",
                    children: c,
                    iconNode: d,
                    ...u
                }, h) => {
                    let {
                        size: p = 24,
                        strokeWidth: f = 2,
                        absoluteStrokeWidth: m = !1,
                        color: x = "currentColor",
                        className: b = ""
                    } = (0, a.useContext)(o) ?? {}, g = s ?? m ? 24 * Number(r ?? f) / Number(t ?? p) : r ?? f;
                    return (0, a.createElement)("svg", {
                        ref: h,
                        ...l,
                        width: t ?? p ?? l.width,
                        height: t ?? p ?? l.height,
                        stroke: e ?? x,
                        strokeWidth: g,
                        className: (0, i.z)("lucide", b, n),
                        ...!c && !(e => {
                            for (let t in e)
                                if (t.startsWith("aria-") || "role" === t || "title" === t) return !0;
                            return !1
                        })(u) && {
                            "aria-hidden": "true"
                        },
                        ...u
                    }, [...d.map(([e, t]) => (0, a.createElement)(e, t)), ...Array.isArray(c) ? c : [c]])
                })
        },
        5695: (e, t, r) => {
            "use strict";
            r.d(t, {
                z: () => a
            });
            let a = (...e) => e.filter((e, t, r) => !!e && "" !== e.trim() && r.indexOf(e) === t).join(" ").trim()
        },
        11062: (e, t, r) => {
            "use strict";
            r.d(t, {
                u: () => s
            });
            var a = r(38787),
                l = r(55365),
                i = r(21381),
                o = r(41786);

            function s() {
                let e = (0, l.jb)();
                if (!e.NEXT_PUBLIC_SUPABASE_URL || !e.NEXT_PUBLIC_SUPABASE_ANON_KEY) throw Error("Supabase browser environment variables are missing.");
                let t = (0, i.y)(window.location.host);
                return t && function() {
                    if ("u" > typeof document)
                        for (let e of (0, o.Bz)((0, o.MB)(document.cookie))) document.cookie = `${e}=; Path=/; Max-Age=0`
                }(), (0, a.k)(e.NEXT_PUBLIC_SUPABASE_URL, e.NEXT_PUBLIC_SUPABASE_ANON_KEY, t ? {
                    cookieOptions: {
                        domain: t
                    }
                } : void 0)
            }
        },
        16168: (e, t, r) => {
            "use strict";
            r.d(t, {
                F: () => o
            });
            var a = r(68662);
            let l = e => "boolean" == typeof e ? `${e}` : 0 === e ? "0" : e,
                i = a.$,
                o = (e, t) => r => {
                    var a;
                    if ((null == t ? void 0 : t.variants) == null) return i(e, null == r ? void 0 : r.class, null == r ? void 0 : r.className);
                    let {
                        variants: o,
                        defaultVariants: s
                    } = t, n = Object.keys(o).map(e => {
                        let t = null == r ? void 0 : r[e],
                            a = null == s ? void 0 : s[e];
                        if (null === t) return null;
                        let i = l(t) || l(a);
                        return o[e][i]
                    }), c = r && Object.entries(r).reduce((e, t) => {
                        let [r, a] = t;
                        return void 0 === a || (e[r] = a), e
                    }, {});
                    return i(e, n, null == t || null == (a = t.compoundVariants) ? void 0 : a.reduce((e, t) => {
                        let {
                            class: r,
                            className: a,
                            ...l
                        } = t;
                        return Object.entries(l).every(e => {
                            let [t, r] = e;
                            return Array.isArray(r) ? r.includes({ ...s,
                                ...c
                            }[t]) : ({ ...s,
                                ...c
                            })[t] === r
                        }) ? [...e, r, a] : e
                    }, []), null == r ? void 0 : r.class, null == r ? void 0 : r.className)
                }
        },
        27736: (e, t, r) => {
            "use strict";
            r.d(t, {
                A: () => a
            });
            let a = (0, r(96296).A)("mail", [
                ["path", {
                    d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",
                    key: "132q7q"
                }],
                ["rect", {
                    x: "2",
                    y: "4",
                    width: "20",
                    height: "16",
                    rx: "2",
                    key: "izxlao"
                }]
            ])
        },
        29717: (e, t, r) => {
            "use strict";
            var a = r(21505);
            r.o(a, "usePathname") && r.d(t, {
                usePathname: function() {
                    return a.usePathname
                }
            }), r.o(a, "useRouter") && r.d(t, {
                useRouter: function() {
                    return a.useRouter
                }
            }), r.o(a, "useSearchParams") && r.d(t, {
                useSearchParams: function() {
                    return a.useSearchParams
                }
            })
        },
        41786: (e, t, r) => {
            "use strict";

            function a(e) {
                let t = new Set;
                for (let r of e) r.startsWith("sb-") && t.add(r);
                return [...t]
            }

            function l(e) {
                return e.startsWith("sb-") && (e.endsWith("-auth-token") || /-auth-token\.\d+$/.test(e))
            }

            function i(e) {
                return [...new Set(e.filter(l))]
            }

            function o(e) {
                return e ? e.split(";").map(e => e.split("=")[0] ?.trim()).filter(e => !!e) : []
            }
            r.d(t, {
                Bz: () => a,
                MB: () => o,
                tr: () => i
            })
        },
        54872: (e, t, r) => {
            "use strict";
            r.d(t, {
                cn: () => i
            });
            var a = r(68662),
                l = r(35490);

            function i(...e) {
                return (0, l.QP)((0, a.$)(e))
            }
        },
        79225: (e, t, r) => {
            "use strict";
            r.d(t, {
                A: () => a
            });
            let a = (0, r(96296).A)("x", [
                ["path", {
                    d: "M18 6 6 18",
                    key: "1bl5f8"
                }],
                ["path", {
                    d: "m6 6 12 12",
                    key: "d8bk6v"
                }]
            ])
        },
        80986: (e, t, r) => {
            "use strict";
            r.d(t, {
                AuthExperience: () => f
            });
            var a = r(73365),
                l = r(99568),
                i = r.n(l),
                o = r(29717),
                s = r(1521),
                n = r(79225),
                c = r(27736),
                d = r(26752),
                u = r(87007),
                h = r(21381),
                p = r(11062);

            function f({
                mode: e
            }) {
                let t = (0, o.useRouter)(),
                    r = (0, o.useSearchParams)(),
                    l = r.get("next") ?? "/dashboard",
                    m = r.get("error"),
                    x = "signup" === e,
                    b = l.startsWith("/") ? l : "/dashboard",
                    g = `${x?"/login":"/signup"}?next=${encodeURIComponent(b)}`,
                    [v, w] = (0, s.useState)("idle"),
                    [y, N] = (0, s.useState)("auth_callback_failed" === m ? d.O.auth.callbackError : null),
                    _ = (0, s.useCallback)(() => {
                        if ("/" === b || ["/dashboard", "/editor", "/checkout", "/success"].some(e => b.startsWith(e))) {
                            let e = "/" === b ? "/dashboard" : b;
                            window.location.assign(`${(0,h.Zp)()}${e}`);
                            return
                        }
                        t.replace(b)
                    }, [t, b]);
                async function j() {
                    w("google"), N(null);
                    try {
                        let e, t = (0, p.u)(),
                            {
                                error: r
                            } = await t.auth.signInWithOAuth({
                                provider: "google",
                                options: {
                                    redirectTo: ((e = new URL("/auth/callback", (0, h.Zp)())).searchParams.set("next", b), e.toString())
                                }
                            });
                        if (r) throw r
                    } catch (e) {
                        w("idle"), N(e instanceof Error ? e.message : d.O.auth.defaultError)
                    }
                }
                return (0, s.useEffect)(() => {
                    let e = (0, p.u)();
                    e.auth.getUser().then(({
                        data: e
                    }) => {
                        e.user && _()
                    });
                    let {
                        data: {
                            subscription: t
                        }
                    } = e.auth.onAuthStateChange((e, t) => {
                        t ?.user && ("SIGNED_IN" === e || "TOKEN_REFRESHED" === e) && _()
                    });
                    return () => {
                        t.unsubscribe()
                    }
                }, [_]), (0, a.jsx)("main", {
                    className: "relative min-h-screen bg-[linear-gradient(180deg,#fbfaff_0%,var(--color-chalk)_55%,#f3f1ff_100%)]",
                    children: (0, a.jsx)("div", {
                        className: "relative mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-4 py-10 sm:px-6",
                        children: (0, a.jsx)("section", {
                            className: "w-full max-w-[30rem] animate-auth-sheet-enter",
                            children: (0, a.jsxs)("div", {
                                className: "relative rounded-[2rem] border border-[var(--color-border)] bg-white px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-8 shadow-[0_8px_32px_rgba(15,23,42,0.06)] sm:p-10",
                                children: [(0, a.jsx)("button", {
                                    type: "button",
                                    onClick: function() {
                                        window.history.length > 1 ? t.back() : t.push("/")
                                    },
                                    "aria-label": "Close",
                                    className: "absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-foreground)] transition hover:bg-slate-50 sm:right-5 sm:top-5",
                                    children: (0, a.jsx)(n.A, {
                                        className: "size-4"
                                    })
                                }), (0, a.jsxs)("div", {
                                    className: "max-w-md pr-12",
                                    children: [(0, a.jsx)("h1", {
                                        className: "font-display text-3xl leading-tight tracking-tight text-[var(--color-foreground)] sm:text-4xl",
                                        children: x ? d.O.auth.signupTitle : d.O.auth.loginTitle
                                    }), (0, a.jsx)("p", {
                                        className: "mt-3 text-base leading-7 text-[var(--color-dim)]",
                                        children: x ? d.O.auth.signupDescription : d.O.auth.loginDescription
                                    })]
                                }), (0, a.jsx)("div", {
                                    className: "mt-8",
                                    children: (0, a.jsxs)(u.$, {
                                        type: "button",
                                        size: "lg",
                                        className: "h-14 w-full rounded-full bg-[#7361ec] px-6 text-base shadow-[0_14px_36px_rgba(91,63,232,0.18)] hover:bg-[var(--color-accent)]",
                                        disabled: "google" === v,
                                        onClick: j,
                                        children: [(0, a.jsx)("span", {
                                            className: "mr-3 flex size-7 items-center justify-center rounded-full bg-white",
                                            children: (0, a.jsxs)("svg", {
                                                className: "size-4",
                                                viewBox: "0 0 24 24",
                                                "aria-hidden": "true",
                                                children: [(0, a.jsx)("path", {
                                                    fill: "#EA4335",
                                                    d: "M12 10.2v3.9h5.5c-.2 1.3-1.5 3.8-5.5 3.8-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.4l2.6-2.5C16.7 3.3 14.6 2.4 12 2.4A9.6 9.6 0 0 0 2.4 12 9.6 9.6 0 0 0 12 21.6c5.5 0 9.1-3.8 9.1-9.2 0-.6-.1-1-.2-1.4H12Z"
                                                }), (0, a.jsx)("path", {
                                                    fill: "#34A853",
                                                    d: "M2.4 12c0 3.8 2.2 7.1 5.3 8.7l3.1-2.4c-.9-.3-4-1.6-4-6.3 0-.7.1-1.4.3-2L4 7.5A9.5 9.5 0 0 0 2.4 12Z"
                                                }), (0, a.jsx)("path", {
                                                    fill: "#4A90E2",
                                                    d: "M12 21.6c2.6 0 4.8-.9 6.4-2.4l-3.1-2.4c-.8.5-1.8.9-3.3.9-2.6 0-4.8-1.7-5.6-4l-3.2 2.5c1.6 3.2 4.9 5.4 8.8 5.4Z"
                                                }), (0, a.jsx)("path", {
                                                    fill: "#FBBC05",
                                                    d: "M6.4 13.7A5.8 5.8 0 0 1 6.1 12c0-.7.1-1.4.3-2L3.2 7.5A9.6 9.6 0 0 0 2.4 12c0 1.5.3 2.9.8 4.2l3.2-2.5Z"
                                                })]
                                            })
                                        }), "google" === v ? d.O.auth.loadingGoogleCta : d.O.auth.googleCta]
                                    })
                                }), y ? (0, a.jsx)("div", {
                                    className: "mt-5 rounded-2xl border border-[var(--color-border)] bg-slate-50 px-4 py-3 text-sm leading-6 text-[var(--color-dim)]",
                                    children: (0, a.jsxs)("div", {
                                        className: "flex items-start gap-3",
                                        children: [(0, a.jsx)(c.A, {
                                            className: "mt-0.5 size-4 shrink-0"
                                        }), (0, a.jsx)("p", {
                                            children: y
                                        })]
                                    })
                                }) : null, (0, a.jsx)("div", {
                                    className: "mt-8 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-dim)]",
                                    children: (0, a.jsxs)("p", {
                                        children: [x ? d.O.auth.signupSwitchPrompt : d.O.auth.loginSwitchPrompt, " ", (0, a.jsx)(i(), {
                                            href: g,
                                            prefetch: !1,
                                            className: "font-semibold text-[var(--color-electric)]",
                                            children: x ? d.O.auth.signupSwitchCta : d.O.auth.loginSwitchCta
                                        })]
                                    })
                                })]
                            })
                        })
                    })
                })
            }
        },
        82001: (e, t, r) => {
            Promise.resolve().then(r.bind(r, 80986))
        },
        87007: (e, t, r) => {
            "use strict";
            r.d(t, {
                $: () => p
            });
            var a = r(73365),
                l = r(1521),
                i = r(92166),
                o = r(16168),
                s = r(54872);
            let n = (0, o.F)("inline-flex items-center justify-center gap-1.5 rounded-[10px] font-semibold transition-[filter,transform,background-color,color,border-color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer", {
                    variants: {
                        variant: {
                            primary: "border-0 bg-[var(--color-violet)] !text-white shadow-none hover:bg-[var(--color-electric)] hover:!text-white active:scale-[0.98]",
                            outline: "border-[1.5px] border-[var(--color-electric)] bg-white !text-[var(--color-electric)] shadow-[0_8px_22px_-14px_rgba(91,63,232,0.32)] hover:bg-[var(--color-accent-soft)] hover:!text-[var(--color-deep)] active:scale-[0.98]",
                            secondary: "border border-[#e3dfd6] bg-white text-[var(--color-dim)] shadow-none hover:bg-[#f4f1ec] hover:text-[var(--color-foreground)] active:scale-[0.98]",
                            ghost: "bg-transparent text-[var(--color-foreground)] hover:bg-[#f4f1ec] active:bg-[#ece8df]",
                            "ghost-dark": "bg-transparent text-white/80 hover:bg-white/10 hover:text-white",
                            danger: "border-0 bg-rose-600 text-white shadow-[0_12px_32px_-8px_rgba(244,63,94,0.40)] hover:bg-rose-700 active:scale-[0.98]"
                        },
                        size: {
                            sm: "h-9 px-3.5 text-[13px]",
                            md: "h-11 px-4 text-[13.5px]",
                            lg: "h-14 px-6 text-[15px]"
                        }
                    },
                    defaultVariants: {
                        variant: "primary",
                        size: "md"
                    }
                }),
                c = {
                    sm: "size-3.5",
                    md: "size-3.5",
                    lg: "size-4"
                },
                d = {
                    sm: "size-3.5",
                    md: "size-3.5",
                    lg: "size-4"
                };

            function u({
                className: e
            }) {
                return (0, a.jsxs)("svg", {
                    className: (0, s.cn)("animate-spin", e),
                    viewBox: "0 0 24 24",
                    fill: "none",
                    "aria-hidden": "true",
                    children: [(0, a.jsx)("circle", {
                        className: "opacity-25",
                        cx: "12",
                        cy: "12",
                        r: "10",
                        stroke: "currentColor",
                        strokeWidth: "3"
                    }), (0, a.jsx)("path", {
                        className: "opacity-90",
                        d: "M12 2a10 10 0 0 1 10 10",
                        stroke: "currentColor",
                        strokeWidth: "3",
                        strokeLinecap: "round"
                    })]
                })
            }

            function h(e, t) {
                return e ? l.isValidElement(e) ? l.cloneElement(e, {
                    className: (0, s.cn)(t, e.props.className)
                }) : e : null
            }
            let p = l.forwardRef(({
                className: e,
                variant: t,
                size: r,
                iconLeading: o,
                iconTrailing: p,
                loading: f = !1,
                asChild: m = !1,
                disabled: x,
                children: b,
                type: g,
                ...v
            }, w) => {
                let y = r ?? "md",
                    N = d[y],
                    _ = c[y],
                    j = x || f,
                    k = f ? (0, a.jsx)(u, {
                        className: _
                    }) : h(o, N),
                    E = f && !o ? null : h(p, N),
                    A = (0, s.cn)(n({
                        variant: t,
                        size: y
                    }), f && "pointer-events-none", e);
                return m ? (0, a.jsx)(i.DX, {
                    className: A,
                    "aria-busy": f || void 0,
                    "aria-disabled": j || void 0,
                    "data-disabled": j || void 0,
                    ref: w,
                    ...v,
                    children: l.isValidElement(b) ? l.cloneElement(b, void 0, (0, a.jsxs)(a.Fragment, {
                        children: [k, (0, a.jsx)(i.xV, {
                            children: b.props.children
                        }), E]
                    })) : b
                }) : (0, a.jsxs)("button", {
                    className: A,
                    ref: w,
                    type: g ?? "button",
                    disabled: j,
                    "aria-busy": f || void 0,
                    "aria-disabled": j || void 0,
                    ...v,
                    children: [k, (0, a.jsx)(i.xV, {
                        children: b
                    }), E]
                })
            });
            p.displayName = "Button"
        },
        92166: (e, t, r) => {
            "use strict";
            let a, l;
            r.d(t, {
                DX: () => c,
                xV: () => u
            });
            var i, o = r(1521),
                s = r.t(o, 2);

            function n(e, t) {
                if ("function" == typeof e) return e(t);
                null != e && (e.current = t)
            }
            var c = (i = "Slot", (a = o.forwardRef((e, t) => {
                    var r;
                    let a, l, {
                            children: s,
                            ...c
                        } = e,
                        u = null,
                        p = !1,
                        g = [];
                    f(s) && "function" == typeof b && (s = b(s._payload)), o.Children.forEach(s, e => {
                        var t;
                        if (t = e, o.isValidElement(t) && "function" == typeof t.type && "__radixId" in t.type && t.type.__radixId === d) {
                            p = !0;
                            let t = "child" in e.props ? e.props.child : e.props.children;
                            f(t) && "function" == typeof b && (t = b(t._payload)), u = h(e, t), g.push(u ?.props ?.children)
                        } else g.push(e)
                    }), u ? u = o.cloneElement(u, void 0, g) : !p && 1 === o.Children.count(s) && o.isValidElement(s) && (u = s);
                    let v = u ? (r = u, (l = (a = Object.getOwnPropertyDescriptor(r.props, "ref") ?.get) && "isReactWarning" in a && a.isReactWarning) ? r.ref : (l = (a = Object.getOwnPropertyDescriptor(r, "ref") ?.get) && "isReactWarning" in a && a.isReactWarning) ? r.props.ref : r.props.ref || r.ref) : void 0,
                        w = function(...e) {
                            return o.useCallback(function(...e) {
                                return t => {
                                    let r = !1,
                                        a = e.map(e => {
                                            let a = n(e, t);
                                            return r || "function" != typeof a || (r = !0), a
                                        });
                                    if (r) return () => {
                                        for (let t = 0; t < a.length; t++) {
                                            let r = a[t];
                                            "function" == typeof r ? r() : n(e[t], null)
                                        }
                                    }
                                }
                            }(...e), e)
                        }(t, v);
                    if (!u) {
                        if (s || 0 === s) throw Error(p ? x(i) : m(i));
                        return s
                    }
                    let y = function(e, t) {
                        let r = { ...t
                        };
                        for (let a in t) {
                            let l = e[a],
                                i = t[a];
                            /^on[A-Z]/.test(a) ? l && i ? r[a] = (...e) => {
                                let t = i(...e);
                                return l(...e), t
                            } : l && (r[a] = l) : "style" === a ? r[a] = { ...l,
                                ...i
                            } : "className" === a && (r[a] = [l, i].filter(Boolean).join(" "))
                        }
                        return { ...e,
                            ...r
                        }
                    }(c, u.props ?? {});
                    return u.type !== o.Fragment && (y.ref = t ? w : v), o.cloneElement(u, y)
                })).displayName = `${i}.Slot`, a),
                d = Symbol.for("radix.slottable"),
                u = ((l = e => "child" in e ? e.children(e.child) : e.children).displayName = "Slottable.Slottable", l.__radixId = d, l),
                h = (e, t) => {
                    if ("child" in e.props) {
                        let t = e.props.child;
                        return o.isValidElement(t) ? o.cloneElement(t, void 0, e.props.children(t.props.children)) : null
                    }
                    return o.isValidElement(t) ? t : null
                },
                p = Symbol.for("react.lazy");

            function f(e) {
                var t;
                return null != e && "object" == typeof e && "$$typeof" in e && e.$$typeof === p && "_payload" in e && "object" == typeof(t = e._payload) && null !== t && "then" in t
            }
            var m = e => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,
                x = e => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,
                b = s[" use ".trim().toString()]
        },
        96296: (e, t, r) => {
            "use strict";
            r.d(t, {
                A: () => s
            });
            var a = r(1521),
                l = r(5695);
            let i = e => {
                let t = e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, r) => r ? r.toUpperCase() : t.toLowerCase());
                return t.charAt(0).toUpperCase() + t.slice(1)
            };
            var o = r(4525);
            let s = (e, t) => {
                let r = (0, a.forwardRef)(({
                    className: r,
                    ...s
                }, n) => (0, a.createElement)(o.default, {
                    ref: n,
                    iconNode: t,
                    className: (0, l.z)(`lucide-${i(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`, `lucide-${e}`, r),
                    ...s
                }));
                return r.displayName = i(e), r
            }
        }
    }
]);