"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [2157], {
        62157: (e, t, a) => {
            a.r(t), a.d(t, {
                NetflixStoryLive: () => O
            });
            var i = a(73365),
                l = a(1521),
                r = a(97093),
                n = a(13750),
                o = a(17754);
            let s = (0, a(69201).ns)(),
                d = (0, l.createContext)(s);

            function c({
                children: e,
                config: t
            }) {
                return (0, i.jsx)(d.Provider, {
                    value: t ?? s,
                    children: e
                })
            }

            function h() {
                return (0, l.useContext)(d)
            }
            var u = a(16226);

            function p({
                onDone: e
            }) {
                let t = h(),
                    a = (0, u.I)(),
                    [r, n] = (0, l.useState)(!1),
                    s = (0, l.useRef)(!1),
                    d = a ? 1400 : 4600;

                function c() {
                    s.current || (s.current = !0, n(!0), window.setTimeout(e, 620 * !a))
                }(0, l.useEffect)(() => {
                    let e = window.setTimeout(c, d);
                    return () => window.clearTimeout(e)
                }, [d]);
                let m = [t.ident.name, t.ident.separator, t.ident.partnerName].filter(e => !!(e && e.trim())),
                    x = .8 + (m.length - 1) * .26;
                return (0, i.jsxs)(o.P.div, {
                    className: "nx-ident",
                    role: "button",
                    tabIndex: 0,
                    "aria-label": t.ident.skipLabel || "Skip intro",
                    onClick: c,
                    onKeyDown: e => {
                        ("Enter" === e.key || " " === e.key) && (e.preventDefault(), c())
                    },
                    animate: {
                        opacity: +!r
                    },
                    transition: {
                        duration: .6 * !a,
                        ease: "easeInOut"
                    },
                    children: [!a && (0, i.jsxs)(i.Fragment, {
                        children: [(0, i.jsx)(o.P.span, {
                            className: "nx-ident__bar nx-ident__bar--top",
                            "aria-hidden": "true",
                            initial: {
                                scaleY: 0
                            },
                            animate: {
                                scaleY: r ? 1.9 : 1
                            },
                            transition: {
                                duration: r ?.6 : .9,
                                ease: [.16, 1, .3, 1]
                            }
                        }), (0, i.jsx)(o.P.span, {
                            className: "nx-ident__bar nx-ident__bar--bottom",
                            "aria-hidden": "true",
                            initial: {
                                scaleY: 0
                            },
                            animate: {
                                scaleY: r ? 1.9 : 1
                            },
                            transition: {
                                duration: r ?.6 : .9,
                                ease: [.16, 1, .3, 1]
                            }
                        })]
                    }), !a && (0, i.jsx)(o.P.span, {
                        className: "nx-ident__glow",
                        "aria-hidden": "true",
                        initial: {
                            opacity: 0,
                            scale: .72
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        transition: {
                            duration: 2.6,
                            delay: .5,
                            ease: "easeOut"
                        }
                    }), (0, i.jsxs)("div", {
                        className: "nx-ident__stage",
                        children: [(0, i.jsxs)("div", {
                            className: "nx-ident__names",
                            children: [m.map((e, t) => {
                                let l = .8 + .26 * t;
                                return (0, i.jsxs)("span", {
                                    className: "nx-ident__slot",
                                    children: [(0, i.jsx)(o.P.span, {
                                        className: 1 === t ? "nx-ident__sep" : "nx-ident__letter",
                                        initial: a ? {
                                            opacity: 0
                                        } : {
                                            opacity: 0,
                                            scale: 1.9,
                                            filter: "blur(22px)",
                                            letterSpacing: "0.16em"
                                        },
                                        animate: a ? {
                                            opacity: 1
                                        } : {
                                            opacity: 1,
                                            scale: 1,
                                            filter: "blur(0px)",
                                            letterSpacing: "-0.02em"
                                        },
                                        transition: {
                                            duration: a ?.3 : 1.5,
                                            delay: a ? 0 : l,
                                            ease: [.16, 1, .3, 1]
                                        },
                                        children: e
                                    }), !a && (0, i.jsx)(o.P.span, {
                                        className: "nx-ident__flash",
                                        "aria-hidden": "true",
                                        initial: {
                                            opacity: 0
                                        },
                                        animate: {
                                            opacity: [0, .85, 0]
                                        },
                                        transition: {
                                            duration: .7,
                                            delay: l + .5,
                                            ease: "easeOut",
                                            times: [0, .18, 1]
                                        }
                                    })]
                                }, `${e}-${t}`)
                            }), !a && (0, i.jsx)("span", {
                                className: "nx-ident__sweep-clip",
                                "aria-hidden": "true",
                                children: (0, i.jsx)(o.P.span, {
                                    className: "nx-ident__sweep",
                                    initial: {
                                        x: "-130%"
                                    },
                                    animate: {
                                        x: "130%"
                                    },
                                    transition: {
                                        duration: 1.25,
                                        delay: x + .85,
                                        ease: "easeInOut"
                                    }
                                })
                            })]
                        }), !a && t.ident.tagline && (0, i.jsx)(o.P.span, {
                            className: "nx-ident__rule",
                            "aria-hidden": "true",
                            initial: {
                                scaleX: 0,
                                opacity: 0
                            },
                            animate: {
                                scaleX: 1,
                                opacity: 1
                            },
                            transition: {
                                duration: 1.1,
                                delay: x + 1.15,
                                ease: [.16, 1, .3, 1]
                            }
                        }), t.ident.tagline && (0, i.jsx)(o.P.p, {
                            className: "nx-ident__tagline",
                            initial: a ? {
                                opacity: 0
                            } : {
                                opacity: 0,
                                y: 14,
                                letterSpacing: "0.5em"
                            },
                            animate: a ? {
                                opacity: 1
                            } : {
                                opacity: 1,
                                y: 0,
                                letterSpacing: "0.3em"
                            },
                            transition: {
                                duration: a ?.3 : 1.4,
                                delay: a ?.1 : x + 1.3,
                                ease: [.16, 1, .3, 1]
                            },
                            children: t.ident.tagline
                        })]
                    }), (0, i.jsx)("span", {
                        className: "nx-ident__grain",
                        "aria-hidden": "true"
                    }), t.ident.skipLabel && (0, i.jsx)(o.P.span, {
                        className: "nx-ident__skip",
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            delay: a ?.2 : 1.6,
                            duration: .6
                        },
                        children: t.ident.skipLabel
                    })]
                })
            }

            function m({
                onPick: e
            }) {
                let t = h(),
                    a = (0, u.I)(),
                    [r, n] = (0, l.useState)({});
                return (0, i.jsxs)("div", {
                    className: "nx-gate",
                    children: [(0, i.jsx)(o.P.h1, {
                        className: "nx-gate__title",
                        initial: {
                            opacity: 0,
                            y: 16 * !a
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: .6,
                            ease: "easeOut"
                        },
                        children: t.gate.title
                    }), (0, i.jsx)("div", {
                        className: "nx-gate__grid",
                        children: t.gate.profiles.map((t, l) => (0, i.jsxs)(o.P.button, {
                            type: "button",
                            className: "nx-gate__profile",
                            onClick: e,
                            initial: {
                                opacity: 0,
                                y: 22 * !a
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: .55,
                                delay: a ? 0 : .15 + .12 * l,
                                ease: "easeOut"
                            },
                            whileHover: a ? void 0 : {
                                scale: 1.06
                            },
                            whileTap: {
                                scale: .97
                            },
                            children: [(0, i.jsx)("span", {
                                className: "nx-gate__avatar",
                                children: t.avatarUrl && !r[l] ? (0, i.jsx)("img", {
                                    src: t.avatarUrl,
                                    alt: "",
                                    loading: "lazy",
                                    decoding: "async",
                                    onError: () => n(e => ({ ...e,
                                        [l]: !0
                                    }))
                                }) : (0, i.jsx)("span", {
                                    className: "nx-gate__initial",
                                    "aria-hidden": "true",
                                    children: (t.name || "?").trim().charAt(0).toUpperCase()
                                })
                            }), (0, i.jsx)("span", {
                                className: "nx-gate__name",
                                children: t.name
                            })]
                        }, `${t.name}-${l}`))
                    })]
                })
            }

            function x({
                sectionIds: e,
                onNavigate: t
            }) {
                let a = h(),
                    [r, s] = (0, l.useState)(!1),
                    [d, c] = (0, l.useState)(!1);
                (0, l.useEffect)(() => {
                    function e() {
                        s(window.scrollY > 40)
                    }
                    return e(), window.addEventListener("scroll", e, {
                        passive: !0
                    }), () => window.removeEventListener("scroll", e)
                }, []), (0, l.useEffect)(() => {
                    if (!d) return;

                    function e(e) {
                        "Escape" === e.key && c(!1)
                    }
                    let t = document.body.style.overflow;
                    return document.body.style.overflow = "hidden", window.addEventListener("keydown", e), () => {
                        document.body.style.overflow = t, window.removeEventListener("keydown", e)
                    }
                }, [d]);
                let u = (0, l.useCallback)(e => {
                        c(!1), window.requestAnimationFrame(() => t(e))
                    }, [t]),
                    p = a.brand.links.map((t, a) => ({
                        label: t,
                        target: e[a] ?? "top",
                        key: `${t}-${a}`
                    }));
                return (0, i.jsxs)(i.Fragment, {
                    children: [(0, i.jsxs)("header", {
                        className: "nx-nav",
                        "data-scrolled": r ? "true" : "false",
                        children: [(0, i.jsx)("button", {
                            type: "button",
                            className: "nx-nav__brand",
                            onClick: () => u("top"),
                            children: a.brand.mark
                        }), (0, i.jsx)("nav", {
                            className: "nx-nav__links",
                            "aria-label": "Sections",
                            children: p.map(e => (0, i.jsx)("button", {
                                type: "button",
                                className: "nx-nav__link",
                                onClick: () => u(e.target),
                                children: e.label
                            }, e.key))
                        }), p.length > 0 && (0, i.jsxs)("button", {
                            type: "button",
                            className: "nx-nav__burger",
                            "aria-label": d ? "Close menu" : "Open menu",
                            "aria-expanded": d,
                            onClick: () => c(e => !e),
                            children: [(0, i.jsx)("span", {
                                className: "nx-nav__burger-bar",
                                "data-open": d ? "true" : "false"
                            }), (0, i.jsx)("span", {
                                className: "nx-nav__burger-bar",
                                "data-open": d ? "true" : "false"
                            })]
                        })]
                    }), (0, i.jsx)(n.N, {
                        children: d && (0, i.jsx)(o.P.div, {
                            className: "nx-nav__sheet",
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            transition: {
                                duration: .22
                            },
                            onClick: () => c(!1),
                            children: (0, i.jsxs)(o.P.div, {
                                className: "nx-nav__sheet-inner",
                                initial: {
                                    opacity: 0,
                                    y: -14
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                exit: {
                                    opacity: 0,
                                    y: -10
                                },
                                transition: {
                                    duration: .26,
                                    ease: [.16, 1, .3, 1]
                                },
                                onClick: e => e.stopPropagation(),
                                children: [(0, i.jsxs)("div", {
                                    className: "nx-nav__sheet-head",
                                    children: [(0, i.jsx)("span", {
                                        className: "nx-nav__sheet-mark",
                                        children: a.brand.mark
                                    }), (0, i.jsx)("button", {
                                        type: "button",
                                        className: "nx-nav__sheet-close",
                                        "aria-label": "Close menu",
                                        onClick: () => c(!1),
                                        children: (0, i.jsx)("svg", {
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            "aria-hidden": "true",
                                            children: (0, i.jsx)("path", {
                                                d: "M6 6l12 12M18 6L6 18",
                                                stroke: "currentColor",
                                                strokeWidth: "1.8",
                                                strokeLinecap: "round"
                                            })
                                        })
                                    })]
                                }), (0, i.jsx)("nav", {
                                    className: "nx-nav__sheet-links",
                                    "aria-label": "Sections",
                                    children: p.map((e, t) => (0, i.jsxs)(o.P.button, {
                                        type: "button",
                                        className: "nx-nav__sheet-link",
                                        onClick: () => u(e.target),
                                        initial: {
                                            opacity: 0,
                                            x: -14
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        transition: {
                                            duration: .34,
                                            delay: .06 + .055 * t,
                                            ease: [.16, 1, .3, 1]
                                        },
                                        children: [(0, i.jsx)("span", {
                                            className: "nx-nav__sheet-index",
                                            children: String(t + 1).padStart(2, "0")
                                        }), (0, i.jsx)("span", {
                                            className: "nx-nav__sheet-label",
                                            children: e.label
                                        }), (0, i.jsx)("svg", {
                                            className: "nx-nav__sheet-arrow",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            "aria-hidden": "true",
                                            children: (0, i.jsx)("path", {
                                                d: "M5 12h13M12 5.5L18.5 12 12 18.5",
                                                stroke: "currentColor",
                                                strokeWidth: "1.7",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round"
                                            })
                                        })]
                                    }, e.key))
                                }), (0, i.jsx)(o.P.button, {
                                    type: "button",
                                    className: "nx-nav__sheet-dismiss",
                                    onClick: () => c(!1),
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    transition: {
                                        duration: .3,
                                        delay: .1 + .055 * p.length
                                    },
                                    children: "Close"
                                })]
                            })
                        })
                    })]
                })
            }

            function y() {
                return (0, i.jsx)("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false",
                    fill: "currentColor",
                    children: (0, i.jsx)("path", {
                        d: "M8 5.14v13.72a1 1 0 0 0 1.54.84l10.5-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z"
                    })
                })
            }

            function b() {
                return (0, i.jsxs)("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "1.9",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [(0, i.jsx)("circle", {
                        cx: "12",
                        cy: "12",
                        r: "9.25"
                    }), (0, i.jsx)("path", {
                        d: "M12 11v5.5"
                    }), (0, i.jsx)("path", {
                        d: "M12 7.6h.01"
                    })]
                })
            }

            function w() {
                return (0, i.jsx)("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    children: (0, i.jsx)("path", {
                        d: "M6 6l12 12M18 6L6 18"
                    })
                })
            }

            function f({
                direction: e
            }) {
                return (0, i.jsx)("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2.2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    style: "left" === e ? {
                        transform: "scaleX(-1)"
                    } : void 0,
                    children: (0, i.jsx)("path", {
                        d: "M9 5l7 7-7 7"
                    })
                })
            }

            function g() {
                return (0, i.jsxs)("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "1.9",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [(0, i.jsx)("path", {
                        d: "M11 5 6.5 9H3v6h3.5L11 19V5Z"
                    }), (0, i.jsx)("path", {
                        d: "M16 9.5l5 5M21 9.5l-5 5"
                    })]
                })
            }

            function v() {
                return (0, i.jsxs)("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "1.9",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [(0, i.jsx)("path", {
                        d: "M11 5 6.5 9H3v6h3.5L11 19V5Z"
                    }), (0, i.jsx)("path", {
                        d: "M15.5 9a4 4 0 0 1 0 6"
                    }), (0, i.jsx)("path", {
                        d: "M18.5 6.5a7.5 7.5 0 0 1 0 11"
                    })]
                })
            }

            function _() {
                return (0, i.jsxs)("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false",
                    fill: "currentColor",
                    children: [(0, i.jsx)("rect", {
                        x: "6",
                        y: "4.5",
                        width: "4",
                        height: "15",
                        rx: "1.2"
                    }), (0, i.jsx)("rect", {
                        x: "14",
                        y: "4.5",
                        width: "4",
                        height: "15",
                        rx: "1.2"
                    })]
                })
            }

            function k() {
                return (0, i.jsxs)("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "1.9",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [(0, i.jsx)("path", {
                        d: "M3.5 12a8.5 8.5 0 1 0 2.6-6.1"
                    }), (0, i.jsx)("path", {
                        d: "M3 4v5h5"
                    })]
                })
            }

            function j({
                onPlay: e,
                onInfo: t
            }) {
                let a = h(),
                    r = (0, u.I)(),
                    n = (0, l.useRef)(null),
                    s = (0, l.useRef)(null),
                    [d, c] = (0, l.useState)(!0),
                    [p, m] = (0, l.useState)(!1),
                    [x, w] = (0, l.useState)(!1),
                    [f, _] = (0, l.useState)(0),
                    [k, T] = (0, l.useState)(!1),
                    N = a.hero.stills,
                    I = a.hero.portraitUrl,
                    L = !!a.hero.videoUrl && !r,
                    S = !L && N.length > 1 && !r;
                return (0, l.useEffect)(() => {
                    let e = n.current;
                    if (!e) return;
                    let t = new IntersectionObserver(e => {
                        let t = e[0];
                        if (t && (T(t.isIntersecting), L))
                            if (t.isIntersecting) {
                                if (window.matchMedia("(max-width: 640px)").matches) return;
                                m(!0), s.current ?.play().catch(() => {})
                            } else s.current ?.pause()
                    }, {
                        threshold: .25
                    });
                    return t.observe(e), () => t.disconnect()
                }, [L]), (0, l.useEffect)(() => {
                    if (!S || !k) return;
                    let e = window.setInterval(() => {
                        _(e => (e + 1) % N.length)
                    }, 6200);
                    return () => window.clearInterval(e)
                }, [S, k, N.length]), (0, i.jsxs)("section", {
                    className: "nx-billboard",
                    ref: n,
                    id: "top",
                    children: [(0, i.jsxs)("div", {
                        className: "nx-billboard__media",
                        "data-has-portrait": I ? "true" : "false",
                        children: [I && !x && (0, i.jsx)("img", {
                            className: "nx-billboard__portrait",
                            src: I,
                            alt: "",
                            loading: "eager",
                            fetchPriority: "high",
                            decoding: "async",
                            onError: e => {
                                e.currentTarget.style.display = "none"
                            }
                        }), N.map((e, t) => {
                            let a = S ? t === f : 0 === t;
                            return !S && t > 0 ? null : (0, i.jsx)("img", {
                                className: `nx-billboard__still ${t%2==0?"nx-kb--in":"nx-kb--out"}`,
                                "data-active": a ? "true" : "false",
                                "data-hidden": x ? "true" : "false",
                                src: e,
                                alt: "",
                                loading: 0 === t ? "eager" : "lazy",
                                fetchPriority: 0 === t ? "high" : void 0,
                                decoding: "async",
                                onError: e => {
                                    e.currentTarget.style.display = "none"
                                }
                            }, e + t)
                        }), L && p && (0, i.jsx)("video", {
                            ref: s,
                            className: "nx-billboard__video",
                            "data-ready": x ? "true" : "false",
                            src: a.hero.videoUrl,
                            poster: a.hero.backdropUrl || void 0,
                            muted: !0,
                            loop: !0,
                            playsInline: !0,
                            preload: "none",
                            onPlaying: () => w(!0)
                        }), (0, i.jsx)("div", {
                            className: "nx-billboard__scrim",
                            "aria-hidden": "true"
                        }), (0, i.jsx)("div", {
                            className: "nx-billboard__vignette",
                            "aria-hidden": "true"
                        }), (0, i.jsx)("div", {
                            className: "nx-billboard__grain",
                            "aria-hidden": "true"
                        })]
                    }), (0, i.jsxs)(o.P.div, {
                        className: "nx-billboard__content",
                        initial: {
                            opacity: 0,
                            y: 26 * !r
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: .75,
                            ease: [.16, 1, .3, 1],
                            delay: .1
                        },
                        children: [a.hero.badge && (0, i.jsx)("p", {
                            className: "nx-billboard__badge",
                            children: a.hero.badge
                        }), (0, i.jsx)("h1", {
                            className: "nx-billboard__title",
                            children: a.hero.title
                        }), a.hero.synopsis && (0, i.jsx)("p", {
                            className: "nx-billboard__synopsis",
                            children: a.hero.synopsis
                        }), (0, i.jsxs)("div", {
                            className: "nx-billboard__actions",
                            children: [(0, i.jsxs)("button", {
                                type: "button",
                                className: "nx-btn nx-btn--primary",
                                onClick: e,
                                children: [(0, i.jsx)(y, {}), a.hero.playLabel]
                            }), (0, i.jsxs)("button", {
                                type: "button",
                                className: "nx-btn nx-btn--ghost",
                                onClick: t,
                                children: [(0, i.jsx)(b, {}), a.hero.infoLabel]
                            })]
                        })]
                    }), L && x && (0, i.jsx)("button", {
                        type: "button",
                        className: "nx-billboard__mute",
                        onClick: function() {
                            let e = s.current;
                            if (!e) return;
                            let t = !e.muted;
                            e.muted = t, c(t), t || e.play().catch(() => {})
                        },
                        "aria-label": d ? "Unmute trailer" : "Mute trailer",
                        children: d ? (0, i.jsx)(g, {}) : (0, i.jsx)(v, {})
                    })]
                })
            }

            function T(e) {
                let t = e - Date.now();
                return t <= 0 ? null : {
                    days: Math.floor(t / 864e5),
                    hours: Math.floor(t / 36e5 % 24),
                    minutes: Math.floor(t / 6e4 % 60),
                    seconds: Math.floor(t / 1e3 % 60)
                }
            }

            function N() {
                let e = (0, l.useMemo)(() => Array.from({
                    length: 5
                }, (e, t) => ({
                    id: t,
                    left: 8 + 21 * t,
                    top: t % 2 == 0 ? 26 : 58,
                    delay: .42 * t,
                    sparks: Array.from({
                        length: 14
                    }, (e, t) => {
                        let a = 38 + 7 * t % 22,
                            i = 25.714285714285715 * t * Math.PI / 180;
                        return {
                            id: t,
                            x: Math.cos(i) * a,
                            y: Math.sin(i) * a
                        }
                    })
                })), []);
                return (0, i.jsx)("div", {
                    className: "nx-fireworks",
                    "aria-hidden": "true",
                    children: e.map(e => (0, i.jsx)("span", {
                        className: "nx-fireworks__burst",
                        style: {
                            left: `${e.left}%`,
                            top: `${e.top}%`,
                            animationDelay: `${e.delay}s`
                        },
                        children: e.sparks.map(t => (0, i.jsx)("span", {
                            className: "nx-fireworks__spark",
                            style: {
                                "--nx-spark-x": `${t.x}px`,
                                "--nx-spark-y": `${t.y}px`,
                                animationDelay: `${e.delay}s`
                            }
                        }, t.id))
                    }, e.id))
                })
            }

            function I() {
                let e = h(),
                    t = (0, l.useMemo)(() => {
                        if (!e.countdown.target) return null;
                        let t = e.countdown.target,
                            a = new Date(/^\d{4}-\d{2}-\d{2}$/.test(t) ? `${t}T00:00:00` : t).getTime();
                        return Number.isNaN(a) ? null : a
                    }, [e.countdown.target]),
                    [a, r] = (0, l.useState)(null),
                    [n, o] = (0, l.useState)(!1),
                    s = (0, l.useRef)(null);
                if ((0, l.useEffect)(() => {
                        if (null !== t) return o(!0), r(T(t)), s.current = window.setInterval(() => {
                            let e = T(t);
                            r(e), null === e && null !== s.current && (window.clearInterval(s.current), s.current = null)
                        }, 1e3), () => {
                            null !== s.current && (window.clearInterval(s.current), s.current = null)
                        }
                    }, [t]), !e.countdown.enabled || null === t) return null;
                let d = n && null === a,
                    c = a ? [{
                        label: "Days",
                        value: a.days
                    }, {
                        label: "Hrs",
                        value: a.hours
                    }, {
                        label: "Min",
                        value: a.minutes
                    }, {
                        label: "Sec",
                        value: a.seconds
                    }] : [];
                return (0, i.jsxs)("section", {
                    className: "nx-countdown",
                    "data-arrived": d ? "true" : "false",
                    children: [d && (0, i.jsx)(N, {}), (0, i.jsxs)("div", {
                        className: "nx-countdown__text",
                        children: [(0, i.jsx)("h2", {
                            className: "nx-countdown__title",
                            children: e.countdown.title
                        }), (d ? e.countdown.arrivedCaption : e.countdown.caption) && (0, i.jsx)("p", {
                            className: "nx-countdown__caption",
                            children: d ? e.countdown.arrivedCaption : e.countdown.caption
                        })]
                    }), c.length > 0 && (0, i.jsx)("div", {
                        className: "nx-countdown__units",
                        "aria-live": "polite",
                        children: c.map(e => (0, i.jsxs)("div", {
                            className: "nx-countdown__unit",
                            children: [(0, i.jsx)("span", {
                                className: "nx-countdown__value",
                                children: String(e.value).padStart(2, "0")
                            }), (0, i.jsx)("span", {
                                className: "nx-countdown__label",
                                children: e.label
                            })]
                        }, e.label))
                    })]
                })
            }

            function L({
                row: e,
                index: t,
                sectionId: a,
                onOpenTile: r
            }) {
                let n = (0, l.useRef)(null),
                    [o, s] = (0, l.useState)(!1),
                    [d, c] = (0, l.useState)(!1),
                    h = (0, l.useCallback)(() => {
                        let e = n.current;
                        if (!e) return;
                        let t = e.scrollWidth - e.clientWidth;
                        s(e.scrollLeft > 8), c(e.scrollLeft < t - 8)
                    }, []);

                function u(e) {
                    let t = n.current;
                    t && t.scrollBy({
                        left: e * t.clientWidth * .85,
                        behavior: "smooth"
                    })
                }
                return (0, l.useEffect)(() => {
                    h();
                    let e = n.current;
                    if (e) return e.addEventListener("scroll", h, {
                        passive: !0
                    }), window.addEventListener("resize", h), () => {
                        e.removeEventListener("scroll", h), window.removeEventListener("resize", h)
                    }
                }, [h, e.tiles.length]), (0, i.jsxs)("section", {
                    className: "nx-row",
                    id: a,
                    children: [(0, i.jsxs)("div", {
                        className: "nx-row__head",
                        children: [(0, i.jsx)("h2", {
                            className: "nx-row__title",
                            children: e.title
                        }), (0, i.jsxs)("span", {
                            className: "nx-row__count",
                            children: [e.tiles.length, " ", 1 === e.tiles.length ? "moment" : "moments"]
                        })]
                    }), (0, i.jsxs)("div", {
                        className: "nx-row__viewport",
                        children: [(0, i.jsx)("button", {
                            type: "button",
                            className: "nx-row__arrow nx-row__arrow--left",
                            "data-visible": o ? "true" : "false",
                            onClick: () => u(-1),
                            "aria-label": "Scroll left",
                            tabIndex: o ? 0 : -1,
                            children: (0, i.jsx)(f, {
                                direction: "left"
                            })
                        }), (0, i.jsx)("div", {
                            className: "nx-row__track",
                            ref: n,
                            children: e.tiles.map((e, a) => (0, i.jsxs)("button", {
                                type: "button",
                                className: "nx-tile",
                                onClick: () => r(e),
                                children: [(0, i.jsxs)("span", {
                                    className: "nx-tile__media",
                                    children: ["video" === e.kind ? (0, i.jsxs)(i.Fragment, {
                                        children: [(0, i.jsx)("video", {
                                            src: e.url,
                                            muted: !0,
                                            playsInline: !0,
                                            preload: "metadata",
                                            tabIndex: -1,
                                            "aria-hidden": "true"
                                        }), (0, i.jsx)("span", {
                                            className: "nx-tile__playbadge",
                                            "aria-hidden": "true",
                                            children: (0, i.jsx)(y, {})
                                        })]
                                    }) : (0, i.jsx)("img", {
                                        src: e.url,
                                        alt: e.title || "",
                                        loading: 0 === t && a < 3 ? "eager" : "lazy",
                                        decoding: "async",
                                        onError: e => {
                                            e.currentTarget.style.display = "none"
                                        }
                                    }), (0, i.jsx)("span", {
                                        className: "nx-tile__scrim",
                                        "aria-hidden": "true"
                                    })]
                                }), (0, i.jsxs)("span", {
                                    className: "nx-tile__meta",
                                    children: [e.title && (0, i.jsx)("span", {
                                        className: "nx-tile__title",
                                        children: e.title
                                    }), e.note && (0, i.jsx)("span", {
                                        className: "nx-tile__note",
                                        children: e.note
                                    })]
                                })]
                            }, e.id))
                        }), (0, i.jsx)("button", {
                            type: "button",
                            className: "nx-row__arrow nx-row__arrow--right",
                            "data-visible": d ? "true" : "false",
                            onClick: () => u(1),
                            "aria-label": "Scroll right",
                            tabIndex: d ? 0 : -1,
                            children: (0, i.jsx)(f, {
                                direction: "right"
                            })
                        })]
                    })]
                })
            }

            function S({
                tile: e,
                onClose: t
            }) {
                let a = (0, u.I)(),
                    r = (0, l.useRef)(null);
                return (0, l.useEffect)(() => {
                    function e(e) {
                        "Escape" === e.key && t()
                    }
                    document.addEventListener("keydown", e);
                    let a = document.body.style.overflow;
                    return document.body.style.overflow = "hidden", r.current ?.focus(), () => {
                        document.removeEventListener("keydown", e), document.body.style.overflow = a
                    }
                }, [t]), (0, i.jsx)(o.P.div, {
                    className: "nx-modal",
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: .24 * !a
                    },
                    onClick: t,
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": e.title || "Memory",
                    children: (0, i.jsxs)(o.P.div, {
                        className: "nx-modal__card",
                        initial: a ? {
                            opacity: 0
                        } : {
                            opacity: 0,
                            y: 28,
                            scale: .96
                        },
                        animate: {
                            opacity: 1,
                            y: 0,
                            scale: 1
                        },
                        exit: a ? {
                            opacity: 0
                        } : {
                            opacity: 0,
                            y: 18,
                            scale: .97
                        },
                        transition: {
                            duration: .34 * !a,
                            ease: [.16, 1, .3, 1]
                        },
                        onClick: e => e.stopPropagation(),
                        children: [(0, i.jsx)("button", {
                            ref: r,
                            type: "button",
                            className: "nx-modal__close",
                            onClick: t,
                            "aria-label": "Close",
                            children: (0, i.jsx)(w, {})
                        }), (0, i.jsxs)("div", {
                            className: "nx-modal__media",
                            children: ["video" === e.kind ? (0, i.jsx)("video", {
                                src: e.url,
                                controls: !0,
                                autoPlay: !0,
                                playsInline: !0,
                                preload: "metadata"
                            }) : (0, i.jsx)("img", {
                                src: e.url,
                                alt: e.title || "",
                                decoding: "async"
                            }), (0, i.jsx)("span", {
                                className: "nx-modal__scrim",
                                "aria-hidden": "true"
                            })]
                        }), (0, i.jsxs)("div", {
                            className: "nx-modal__body",
                            children: [e.title && (0, i.jsx)("h3", {
                                className: "nx-modal__title",
                                children: e.title
                            }), e.note && (0, i.jsx)("p", {
                                className: "nx-modal__note",
                                children: e.note
                            })]
                        })]
                    })
                })
            }

            function C({
                onClose: e
            }) {
                let t = h(),
                    a = (0, u.I)(),
                    r = (0, l.useRef)(null),
                    s = (0, l.useRef)(null),
                    d = (0, l.useRef)(null),
                    c = (0, l.useMemo)(() => (function(e, t) {
                        let a = [];
                        for (let i of (e.forEach((e, t) => {
                                a.push({
                                    key: `still-${t}-${e}`,
                                    url: e,
                                    kind: "image",
                                    title: "",
                                    note: ""
                                })
                            }), t))
                            for (let e of i.tiles) a.push({
                                key: `${i.id}-${e.id}`,
                                url: e.url,
                                kind: e.kind,
                                title: e.title,
                                note: e.note
                            });
                        return a
                    })(t.hero.stills, t.rows), [t.hero.stills, t.rows]),
                    [p, m] = (0, l.useState)(0),
                    [x, b] = (0, l.useState)(!1),
                    [f, j] = (0, l.useState)(!1),
                    [T, N] = (0, l.useState)(!1),
                    [I, L] = (0, l.useState)(!1),
                    [S, M] = (0, l.useState)(!0),
                    [P, U] = (0, l.useState)("clip" === t.story.clipAudio),
                    E = !!t.story.trackUrl,
                    O = c[p],
                    A = c[p + 1],
                    $ = O ?.kind === "video",
                    B = $ && P,
                    R = (0, l.useCallback)(() => {
                        m(e => e >= c.length - 1 ? (j(!0), e) : e + 1)
                    }, [c.length]),
                    D = (0, l.useCallback)(() => {
                        j(!1), m(e => Math.max(0, e - 1))
                    }, []),
                    Y = (0, l.useCallback)(() => {
                        j(!1), m(0);
                        let e = r.current;
                        e && (e.currentTime = 0, e.play().catch(() => {}))
                    }, []);

                function W() {
                    let e = r.current;
                    if (!e) return;
                    let t = !T;
                    N(t), t || (e.muted = !1, 0 === e.volume && (e.volume = .85), e.play().then(() => L(!1)).catch(() => {}))
                }
                if ((0, l.useEffect)(() => {
                        function t(t) {
                            if ("Escape" === t.key) return void e();
                            if ("ArrowRight" === t.key) {
                                t.preventDefault(), R();
                                return
                            }
                            if ("ArrowLeft" === t.key) {
                                t.preventDefault(), D();
                                return
                            }(" " === t.key || "Spacebar" === t.key) && (t.preventDefault(), b(e => !e))
                        }
                        document.addEventListener("keydown", t);
                        let a = document.body.style.overflow;
                        return document.body.style.overflow = "hidden", d.current ?.focus(), () => {
                            document.removeEventListener("keydown", t), document.body.style.overflow = a
                        }
                    }, [R, D, e]), (0, l.useEffect)(() => {
                        let e = r.current;
                        if (!e || !E) return;
                        let t = 0,
                            a = !1;
                        return e.muted = !1, e.volume = 0, e.play().then(() => {
                            a || (L(!1), t = window.setInterval(() => {
                                let a = Math.min(.85, e.volume + .06);
                                e.volume = a, a >= .85 && window.clearInterval(t)
                            }, 100))
                        }).catch(() => {
                            a || (L(!0), N(!0))
                        }), () => {
                            a = !0, window.clearInterval(t), e.pause()
                        }
                    }, [E]), (0, l.useEffect)(() => {
                        U("clip" === t.story.clipAudio)
                    }, [p, t.story.clipAudio]), (0, l.useEffect)(() => {
                        let e = r.current;
                        if (e && E && !I) {
                            if (x) return void e.pause();
                            0 === e.volume && (e.volume = .85), e.play().catch(() => {})
                        }
                    }, [x, E, I]), (0, l.useEffect)(() => {
                        let e = r.current;
                        if (!e || !E || I || T) return;
                        let t = B ?.12 : .85,
                            a = window.setInterval(() => {
                                let i = t - e.volume;
                                if (.05 >= Math.abs(i)) {
                                    e.volume = t, window.clearInterval(a);
                                    return
                                }
                                e.volume = Math.min(1, Math.max(0, e.volume + .05 * Math.sign(i)))
                            }, 60);
                        return () => window.clearInterval(a)
                    }, [B, E, I, T]), (0, l.useEffect)(() => {
                        if (x || f || !O) return;
                        let e = "video" === O.kind ? 45e3 : 5200,
                            t = window.setTimeout(R, e);
                        return () => window.clearTimeout(t)
                    }, [p, x, f, O, R]), (0, l.useEffect)(() => {
                        let e = s.current;
                        if (e) {
                            if (x) return void e.pause();
                            e.play().catch(() => {
                                e.muted || (e.muted = !0, U(!1), e.play().catch(() => {}))
                            })
                        }
                    }, [x, p, P]), (0, l.useEffect)(() => {
                        if (x || f) return void M(!0);
                        let e = window.setTimeout(() => M(!1), 2600);
                        return () => window.clearTimeout(e)
                    }, [x, f, p]), 0 === c.length) return null;
                let V = (p + 1) / c.length * 100;
                return (0, i.jsxs)(o.P.div, {
                    className: "nx-player",
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: .5 * !a
                    },
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": t.hero.playLabel,
                    onMouseMove: () => M(!0),
                    "data-chrome": S || x || f ? "true" : "false",
                    children: [E && (0, i.jsx)("audio", {
                        ref: r,
                        src: t.story.trackUrl,
                        loop: !0,
                        preload: "auto",
                        muted: T
                    }), (0, i.jsxs)("div", {
                        className: "nx-player__stage",
                        onClick: () => b(e => !e),
                        children: [(0, i.jsx)(n.N, {
                            initial: !1,
                            children: O && (0, i.jsx)(o.P.div, {
                                className: "nx-player__shot",
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                exit: {
                                    opacity: 0
                                },
                                transition: {
                                    duration: 1.2 * !a,
                                    ease: "easeInOut"
                                },
                                children: "video" === O.kind ? (0, i.jsx)("video", {
                                    ref: s,
                                    className: "nx-player__media",
                                    src: O.url,
                                    autoPlay: !0,
                                    playsInline: !0,
                                    muted: !P,
                                    preload: "auto",
                                    onEnded: R
                                }) : (0, i.jsx)("img", {
                                    className: `nx-player__media ${p%2==0?"nx-player__media--push":"nx-player__media--pull"}`,
                                    src: O.url,
                                    alt: O.title || "",
                                    decoding: "async",
                                    "data-paused": x ? "true" : "false"
                                })
                            }, O.key)
                        }), A && "image" === A.kind && (0, i.jsx)("img", {
                            className: "nx-player__preload",
                            src: A.url,
                            alt: "",
                            "aria-hidden": "true"
                        }), (0, i.jsx)("div", {
                            className: "nx-player__vignette",
                            "aria-hidden": "true"
                        }), (0, i.jsx)("div", {
                            className: "nx-player__grain",
                            "aria-hidden": "true"
                        }), (0, i.jsx)(n.N, {
                            mode: "wait",
                            children: O && (O.title || O.note) && !f && (0, i.jsxs)(o.P.div, {
                                className: "nx-player__caption",
                                initial: {
                                    opacity: 0,
                                    y: 18 * !a
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                exit: {
                                    opacity: 0,
                                    y: a ? 0 : -12
                                },
                                transition: {
                                    duration: .7 * !a,
                                    ease: [.16, 1, .3, 1]
                                },
                                children: [O.title && (0, i.jsx)("h2", {
                                    className: "nx-player__caption-title",
                                    children: O.title
                                }), O.note && (0, i.jsx)("p", {
                                    className: "nx-player__caption-note",
                                    children: O.note
                                })]
                            }, `caption-${O.key}`)
                        }), (0, i.jsx)(n.N, {
                            children: f && (0, i.jsxs)(o.P.div, {
                                className: "nx-player__end",
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                exit: {
                                    opacity: 0
                                },
                                transition: {
                                    duration: .8 * !a
                                },
                                children: [(0, i.jsx)(o.P.p, {
                                    className: "nx-player__end-eyebrow",
                                    initial: {
                                        opacity: 0,
                                        y: 14 * !a
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        delay: .25,
                                        duration: .7,
                                        ease: [.16, 1, .3, 1]
                                    },
                                    children: t.hero.badge
                                }), (0, i.jsx)(o.P.h2, {
                                    className: "nx-player__end-title",
                                    initial: {
                                        opacity: 0,
                                        y: 20 * !a
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        delay: .4,
                                        duration: .8,
                                        ease: [.16, 1, .3, 1]
                                    },
                                    children: t.hero.title
                                }), (0, i.jsxs)(o.P.div, {
                                    className: "nx-player__end-actions",
                                    initial: {
                                        opacity: 0,
                                        y: 16 * !a
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        delay: .6,
                                        duration: .7,
                                        ease: [.16, 1, .3, 1]
                                    },
                                    children: [(0, i.jsxs)("button", {
                                        type: "button",
                                        className: "nx-btn nx-btn--primary",
                                        onClick: Y,
                                        children: [(0, i.jsx)(k, {}), t.credits.restartLabel]
                                    }), (0, i.jsx)("button", {
                                        type: "button",
                                        className: "nx-btn nx-btn--ghost",
                                        onClick: e,
                                        children: t.story.exitLabel
                                    })]
                                })]
                            })
                        }), (0, i.jsx)(n.N, {
                            children: x && !f && (0, i.jsx)(o.P.div, {
                                className: "nx-player__paused",
                                initial: {
                                    opacity: 0,
                                    scale: .86
                                },
                                animate: {
                                    opacity: 1,
                                    scale: 1
                                },
                                exit: {
                                    opacity: 0,
                                    scale: .86
                                },
                                transition: {
                                    duration: .2
                                },
                                "aria-hidden": "true",
                                children: (0, i.jsx)(y, {})
                            })
                        })]
                    }), (0, i.jsxs)("div", {
                        className: "nx-player__chrome nx-player__chrome--top",
                        children: [(0, i.jsx)("p", {
                            className: "nx-player__brand",
                            children: t.brand.mark
                        }), (0, i.jsxs)("div", {
                            className: "nx-player__chrome-actions",
                            children: [$ && E && (0, i.jsxs)("button", {
                                type: "button",
                                className: "nx-player__audio-toggle",
                                onClick: () => U(e => !e),
                                "aria-pressed": P,
                                "aria-label": P ? "Play the music instead of this clip's sound" : "Play this clip's own sound",
                                children: [P ? (0, i.jsx)(v, {}) : (0, i.jsx)(g, {}), (0, i.jsx)("span", {
                                    children: P ? "Clip sound" : "Music"
                                })]
                            }), E && (0, i.jsx)("button", {
                                type: "button",
                                className: "nx-player__icon-btn",
                                onClick: W,
                                "aria-label": T ? "Unmute music" : "Mute music",
                                children: T ? (0, i.jsx)(g, {}) : (0, i.jsx)(v, {})
                            }), (0, i.jsx)("button", {
                                ref: d,
                                type: "button",
                                className: "nx-player__icon-btn",
                                onClick: e,
                                "aria-label": "Close player",
                                children: (0, i.jsx)(w, {})
                            })]
                        })]
                    }), (0, i.jsxs)("div", {
                        className: "nx-player__chrome nx-player__chrome--bottom",
                        children: [(0, i.jsx)("button", {
                            type: "button",
                            className: "nx-player__icon-btn",
                            onClick: () => b(e => !e),
                            "aria-label": x ? "Play" : "Pause",
                            children: x ? (0, i.jsx)(y, {}) : (0, i.jsx)(_, {})
                        }), (0, i.jsx)("div", {
                            className: "nx-player__progress",
                            role: "progressbar",
                            "aria-valuemin": 1,
                            "aria-valuemax": c.length,
                            "aria-valuenow": p + 1,
                            "aria-label": "Story progress",
                            children: (0, i.jsx)("span", {
                                className: "nx-player__progress-fill",
                                style: {
                                    width: `${V}%`
                                }
                            })
                        }), (0, i.jsxs)("p", {
                            className: "nx-player__count",
                            children: [p + 1, " / ", c.length]
                        })]
                    }), I && T && (0, i.jsxs)("button", {
                        type: "button",
                        className: "nx-player__unmute",
                        onClick: W,
                        children: [(0, i.jsx)(v, {}), t.story.unmuteLabel]
                    })]
                })
            }

            function M({
                onRestart: e
            }) {
                let t = h(),
                    a = (0, u.I)(),
                    l = t.credits.body.split(/\n{2,}/).map(e => e.trim()).filter(Boolean);
                return (0, i.jsx)("section", {
                    className: "nx-credits",
                    id: "credits",
                    children: (0, i.jsxs)(o.P.div, {
                        className: "nx-credits__inner",
                        initial: {
                            opacity: 0,
                            y: 30 * !a
                        },
                        whileInView: {
                            opacity: 1,
                            y: 0
                        },
                        viewport: {
                            once: !0,
                            amount: .25
                        },
                        transition: {
                            duration: .7,
                            ease: [.16, 1, .3, 1]
                        },
                        children: [t.credits.eyebrow && (0, i.jsx)("p", {
                            className: "nx-credits__eyebrow",
                            children: t.credits.eyebrow
                        }), (0, i.jsx)("h2", {
                            className: "nx-credits__title",
                            children: t.credits.title
                        }), (0, i.jsx)("div", {
                            className: "nx-credits__body",
                            children: l.map((e, t) => (0, i.jsx)(o.P.p, {
                                initial: {
                                    opacity: 0,
                                    y: 16 * !a
                                },
                                whileInView: {
                                    opacity: 1,
                                    y: 0
                                },
                                viewport: {
                                    once: !0,
                                    amount: .4
                                },
                                transition: {
                                    duration: .6,
                                    delay: a ? 0 : .08 * t,
                                    ease: "easeOut"
                                },
                                children: e
                            }, t))
                        }), (0, i.jsxs)("div", {
                            className: "nx-credits__sign",
                            children: [t.credits.closing && (0, i.jsx)("p", {
                                children: t.credits.closing
                            }), t.credits.signature && (0, i.jsx)("p", {
                                className: "nx-credits__signature",
                                children: t.credits.signature
                            })]
                        }), t.credits.restartLabel && (0, i.jsxs)("button", {
                            type: "button",
                            className: "nx-btn nx-btn--ghost",
                            onClick: e,
                            children: [(0, i.jsx)(k, {}), t.credits.restartLabel]
                        })]
                    })
                })
            }
            let P = {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                exit: {
                    opacity: 0
                },
                transition: {
                    duration: .45
                }
            };

            function U() {
                let e = h(),
                    [t, a] = (0, l.useState)("ident"),
                    [r, s] = (0, l.useState)(null),
                    [d, c] = (0, l.useState)(!1),
                    u = (0, l.useRef)(null),
                    y = e.hero.stills.length > 0 || e.rows.some(e => e.tiles.length > 0),
                    b = ["top", ...e.rows.map(e => `nx-${e.id}`)],
                    w = (0, l.useCallback)(e => {
                        "top" === e ? window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        }) : document.getElementById(e) ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        })
                    }, []),
                    f = (0, l.useCallback)(() => {
                        if (y) return void c(!0);
                        let e = u.current ?.querySelector("section");
                        e ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        })
                    }, [y]),
                    g = (0, l.useCallback)(() => {
                        document.getElementById("credits") ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        })
                    }, []),
                    v = (0, l.useCallback)(() => {
                        window.scrollTo({
                            top: 0,
                            behavior: "auto"
                        }), a("ident")
                    }, []);
                return (0, i.jsxs)("div", {
                    className: "nx-root-inner",
                    children: [(0, i.jsxs)(n.N, {
                        mode: "wait",
                        children: ["ident" === t && (0, i.jsx)(o.P.div, { ...P,
                            children: (0, i.jsx)(p, {
                                onDone: () => a(e.gate.enabled ? "gate" : "browse")
                            })
                        }, "ident"), "gate" === t && (0, i.jsx)(o.P.div, { ...P,
                            children: (0, i.jsx)(m, {
                                onPick: () => a("browse")
                            })
                        }, "gate"), "browse" === t && (0, i.jsxs)(o.P.div, { ...P,
                            children: [(0, i.jsx)(x, {
                                sectionIds: b,
                                onNavigate: w
                            }), (0, i.jsxs)("main", {
                                className: "nx-main",
                                children: [(0, i.jsx)(j, {
                                    onPlay: f,
                                    onInfo: g
                                }), (0, i.jsx)(I, {}), (0, i.jsx)("div", {
                                    className: "nx-rows",
                                    ref: u,
                                    children: e.rows.map((e, t) => (0, i.jsx)(L, {
                                        row: e,
                                        index: t,
                                        sectionId: `nx-${e.id}`,
                                        onOpenTile: s
                                    }, e.id))
                                }), (0, i.jsx)(M, {
                                    onRestart: v
                                })]
                            })]
                        }, "browse")]
                    }), (0, i.jsx)(n.N, {
                        children: r && (0, i.jsx)(S, {
                            tile: r,
                            onClose: () => s(null)
                        })
                    }), (0, i.jsx)(n.N, {
                        children: d && (0, i.jsx)(C, {
                            onClose: () => c(!1)
                        })
                    })]
                })
            }

            function E({
                config: e
            }) {
                return (0, i.jsx)(c, {
                    config: e,
                    children: (0, i.jsx)(U, {})
                })
            }

            function O({
                snapshot: e
            }) {
                let t = (0, l.useMemo)(() => (0, r.M6)(e), [e]);
                return (0, i.jsx)("div", {
                    className: "netflix-story-root",
                    "data-theme": t.theme,
                    children: (0, i.jsx)(E, {
                        config: t
                    })
                })
            }
        },
        69201: (e, t, a) => {
            a.d(t, {
                ns: () => u,
                hR: () => d
            });
            let i = "https://cdn.cutiepage.in/template-seeds/netflix-story",
                l = {
                    heroBackdrop: `${i}/02-bike.webp`,
                    heroStillTwo: `${i}/01-bench.webp`,
                    heroStillThree: `${i}/04-couch.webp`,
                    heroVideo: "",
                    chapterOne: `${i}/02-bike.webp`,
                    chapterTwo: `${i}/04-couch.webp`,
                    chapterThree: `${i}/01-bench.webp`,
                    chapterFour: `${i}/03-wallet.webp`,
                    chapterFive: `${i}/05-night.webp`,
                    tripOne: `${i}/02-bike.webp`,
                    tripTwo: `${i}/05-night.webp`,
                    tripThree: `${i}/03-wallet.webp`,
                    clipOne: "",
                    clipTwo: "",
                    storyTrack: "https://cdn.cutiepage.in/template-seeds/girlfriends-day/music.mp3",
                    avatarOne: `${i}/profile-01.webp`,
                    avatarTwo: `${i}/profile-02.webp`
                };

            function r(e) {
                let t, {
                    bg: a,
                    bgAlt: i,
                    skin: l,
                    hair: r,
                    shirt: n,
                    detail: o = ""
                } = e;
                return t = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${a}"/>
          <stop offset="100%" stop-color="${i}"/>
        </linearGradient>
        <clipPath id="c"><rect width="200" height="200" rx="0"/></clipPath>
      </defs>
      <rect width="200" height="200" fill="url(#g)"/>
      <g clip-path="url(#c)">
        <!-- shoulders -->
        <path d="M28 200c0-31 32-52 72-52s72 21 72 52z" fill="${n}"/>
        <!-- neck -->
        <rect x="86" y="112" width="28" height="30" rx="12" fill="${l}"/>
        <!-- head -->
        <ellipse cx="100" cy="84" rx="38" ry="42" fill="${l}"/>
        <!-- hair back -->
        <path d="M62 84c0-25 17-42 38-42s38 17 38 42c0-30-14-46-38-46S62 54 62 84z" fill="${r}"/>
        ${o}
        <!-- eyes -->
        <ellipse cx="86" cy="84" rx="4" ry="5" fill="#2b2b33"/>
        <ellipse cx="114" cy="84" rx="4" ry="5" fill="#2b2b33"/>
        <!-- smile -->
        <path d="M88 100c4 5 20 5 24 0" stroke="#2b2b33" stroke-width="3.4"
              stroke-linecap="round" fill="none"/>
      </g>
    </svg>
  `.replace(/\s{2,}/g, " ").trim(), `data:image/svg+xml,${encodeURIComponent(t)}`
            }
            let n = [{
                id: "avatar-rose",
                label: "Rose",
                url: r({
                    bg: "#f2607a",
                    bgAlt: "#c8365a",
                    skin: "#f3c9a8",
                    hair: "#3a2318",
                    shirt: "#fdf3ec",
                    detail: '<path d="M60 84c-2 34 2 54 6 62h-14c-6-18-8-44-4-66zM140 84c2 34-2 54-6 62h14c6-18 8-44 4-66z" fill="#3a2318"/>'
                })
            }, {
                id: "avatar-indigo",
                label: "Indigo",
                url: r({
                    bg: "#6d7cf0",
                    bgAlt: "#3b46b8",
                    skin: "#e5b48c",
                    hair: "#1f1b2e",
                    shirt: "#e8ecff",
                    detail: '<path d="M64 74c8-16 26-24 44-20 12 3 22 11 26 22-10-8-24-12-38-12-12 0-24 4-32 10z" fill="#1f1b2e"/>'
                })
            }, {
                id: "avatar-amber",
                label: "Amber",
                url: r({
                    bg: "#f0a63c",
                    bgAlt: "#c2701a",
                    skin: "#c98a5e",
                    hair: "#241611",
                    shirt: "#fff6e6",
                    detail: '<circle cx="100" cy="40" r="15" fill="#241611"/>'
                })
            }, {
                id: "avatar-teal",
                label: "Teal",
                url: r({
                    bg: "#3fbfa8",
                    bgAlt: "#1d7d70",
                    skin: "#8d5a3b",
                    hair: "#171210",
                    shirt: "#eafffa",
                    detail: `<path d="M62 82c0-26 18-44 38-44s38 18 38 44c-6-14-20-22-38-22s-32 8-38 22z" fill="#171210"/>
               <circle cx="72" cy="66" r="9" fill="#171210"/>
               <circle cx="100" cy="56" r="10" fill="#171210"/>
               <circle cx="128" cy="66" r="9" fill="#171210"/>`
                })
            }, {
                id: "avatar-violet",
                label: "Violet",
                url: r({
                    bg: "#a874e8",
                    bgAlt: "#6a3bb0",
                    skin: "#f0d3bb",
                    hair: "#5b2f8a",
                    shirt: "#f6efff",
                    detail: `<path d="M62 86c-6 22-6 40-4 52h-12c-2-20 0-40 6-58zM138 86c6 22 6 40 4 52h12c2-20 0-40-6-58z" fill="#5b2f8a"/>
               <circle cx="52" cy="142" r="7" fill="#5b2f8a"/>
               <circle cx="148" cy="142" r="7" fill="#5b2f8a"/>`
                })
            }, {
                id: "avatar-slate",
                label: "Slate",
                url: r({
                    bg: "#7e8a99",
                    bgAlt: "#464f5c",
                    skin: "#d9a97f",
                    hair: "#12161c",
                    shirt: "#eef2f7",
                    detail: `<path d="M60 78a40 40 0 0 1 80 0z" fill="#12161c"/>
               <rect x="56" y="74" width="88" height="10" rx="5" fill="#2a323d"/>`
                })
            }];
            n[0].url, n[1].url;
            let o = [{
                    id: "crimson",
                    label: "Crimson",
                    swatches: ["#e50914", "#ff5c67", "#0a0a0c"]
                }, {
                    id: "sunset",
                    label: "Sunset",
                    swatches: ["#ff6a3d", "#ffb37a", "#120a10"]
                }, {
                    id: "gold",
                    label: "Champagne",
                    swatches: ["#e8c37a", "#f6e0b0", "#0d0b08"]
                }, {
                    id: "aurora",
                    label: "Aurora",
                    swatches: ["#5eead4", "#a78bfa", "#080b14"]
                }],
                s = "crimson",
                d = {
                    theme: s,
                    identName: "R",
                    identPartnerName: "A",
                    identSeparator: "⨯",
                    identTagline: "A LOVE STORY",
                    identSkipLabel: "Skip intro",
                    gateEnabled: !0,
                    gateTitle: "Who's watching?",
                    gateProfile1Name: "You",
                    gateProfile1AvatarUrl: l.avatarOne,
                    gateProfile2Name: "Me",
                    gateProfile2AvatarUrl: l.avatarTwo,
                    brandMark: "R ⨯ A",
                    navHome: "Home",
                    navChapters: "Chapters",
                    navTrips: "Trips",
                    navOnlyUs: "Only Us",
                    heroBadge: "A LOVE STORY \xb7 ONGOING",
                    heroTitle: "Us, Every Season",
                    heroSynopsis: "From the first hello to every quiet Tuesday since, this is our archive. Every photo, every trip, every inside joke, all in one place, made just for you.",
                    heroBackdropUrl: l.heroBackdrop,
                    heroStill2Url: l.heroStillTwo,
                    heroStill3Url: l.heroStillThree,
                    heroPortraitUrl: "",
                    heroVideoUrl: l.heroVideo,
                    heroPlayLabel: "Play Our Story",
                    heroInfoLabel: "More Info",
                    heroMetaYear: "2025",
                    heroMetaRating: "U/A \xb7 Very Us",
                    heroMetaDuration: "Ongoing",
                    storyTrackUrl: l.storyTrack,
                    storyClipAudio: "music",
                    storyExitLabel: "Back to browsing",
                    storyUnmuteLabel: "Tap for sound",
                    countdownEnabled: !0,
                    countdownTitle: "Happy Girlfriend's Day",
                    countdownCaption: "Counting down to our next date night.",
                    countdownDate: "2026-08-01",
                    countdownArrivedCaption: "It's today. Go celebrate.",
                    row1Title: "Chapters of Us",
                    row1Item1Url: l.chapterOne,
                    row1Item1Title: "The First Hello",
                    row1Item1Note: "Neither of us knew this was the start of everything.",
                    row1Item2Url: l.chapterTwo,
                    row1Item2Title: "Our Cafe",
                    row1Item2Note: "Same corner table, same order, every single time.",
                    row1Item3Url: l.chapterThree,
                    row1Item3Title: "Meeting Everyone",
                    row1Item3Note: "You charmed them all in about four minutes.",
                    row1Item4Url: l.chapterFour,
                    row1Item4Title: "That Song",
                    row1Item4Note: "The one we still cannot hear without looking at each other.",
                    row1Item5Url: l.chapterFive,
                    row1Item5Title: "Peak Comedy",
                    row1Item5Note: "Our funniest photo. No context needed, no context given.",
                    row2Title: "Trips & Adventures",
                    row2Item1Url: l.tripOne,
                    row2Item1Title: "The Getaway",
                    row2Item1Note: "Badly planned, perfectly executed.",
                    row2Item2Url: l.tripTwo,
                    row2Item2Title: "Golden Hour",
                    row2Item2Note: "You in that light. I think about it often.",
                    row2Item3Url: l.tripThree,
                    row2Item3Title: "Road Trip Playlist",
                    row2Item3Note: "Windows down, both of us singing badly.",
                    row3Title: "Only Us",
                    row3Item1Url: l.clipOne,
                    row3Item1Title: "A Message For You",
                    row3Item1Note: "Press play. I mean every word of it.",
                    row3Item2Url: l.clipTwo,
                    row3Item2Title: "The Highlight Reel",
                    row3Item2Note: "Everything good from this year, back to back.",
                    creditsEyebrow: "END CREDITS",
                    creditsTitle: "One Last Thing",
                    creditsBody: `I am not great at saying this out loud, so I built you a whole streaming service instead.

Thank you for every ordinary day that you somehow made feel like a scene worth keeping. For picking up on the first ring, for the advice I did not ask for and absolutely needed, and for never once making me explain myself twice.

Whatever season comes next, I want to watch it with you.`,
                    creditsClosing: "Always yours,",
                    creditsSignature: "Me",
                    creditsRestartLabel: "Watch it again"
                };

            function c(e, t) {
                return "boolean" == typeof e ? e : "true" === e || "false" !== e && t
            }

            function h(e, t, a, i, l) {
                let r = (t ?? "").trim();
                return r ? {
                    id: e,
                    url: r,
                    title: a ?? "",
                    note: i ?? "",
                    kind: l
                } : null
            }

            function u(e = {}) {
                var t, a;
                let i = { ...d,
                        ...e
                    },
                    l = [h("r1t1", i.row1Item1Url, i.row1Item1Title, i.row1Item1Note, "image"), h("r1t2", i.row1Item2Url, i.row1Item2Title, i.row1Item2Note, "image"), h("r1t3", i.row1Item3Url, i.row1Item3Title, i.row1Item3Note, "image"), h("r1t4", i.row1Item4Url, i.row1Item4Title, i.row1Item4Note, "image"), h("r1t5", i.row1Item5Url, i.row1Item5Title, i.row1Item5Note, "image")].filter(e => null !== e),
                    r = [h("r2t1", i.row2Item1Url, i.row2Item1Title, i.row2Item1Note, "image"), h("r2t2", i.row2Item2Url, i.row2Item2Title, i.row2Item2Note, "image"), h("r2t3", i.row2Item3Url, i.row2Item3Title, i.row2Item3Note, "image")].filter(e => null !== e),
                    n = [h("r3t1", i.row3Item1Url, i.row3Item1Title, i.row3Item1Note, "video"), h("r3t2", i.row3Item2Url, i.row3Item2Title, i.row3Item2Note, "video")].filter(e => null !== e),
                    p = [{
                        id: "row1",
                        title: i.row1Title,
                        tiles: l
                    }, {
                        id: "row2",
                        title: i.row2Title,
                        tiles: r
                    }, {
                        id: "row3",
                        title: i.row3Title,
                        tiles: n
                    }].filter(e => e.tiles.length > 0);
                return {
                    theme: "string" == typeof(t = i.theme) && o.some(e => e.id === t) ? i.theme : s,
                    ident: {
                        name: i.identName,
                        partnerName: i.identPartnerName,
                        separator: i.identSeparator,
                        tagline: i.identTagline,
                        skipLabel: i.identSkipLabel
                    },
                    gate: {
                        enabled: c(i.gateEnabled, !0),
                        title: i.gateTitle,
                        profiles: [{
                            name: i.gateProfile1Name,
                            avatarUrl: (i.gateProfile1AvatarUrl ?? "").trim()
                        }, {
                            name: i.gateProfile2Name,
                            avatarUrl: (i.gateProfile2AvatarUrl ?? "").trim()
                        }]
                    },
                    brand: {
                        mark: i.brandMark,
                        links: [i.navHome, i.navChapters, i.navTrips, i.navOnlyUs].filter(e => !!(e && e.trim()))
                    },
                    hero: {
                        badge: i.heroBadge,
                        title: i.heroTitle,
                        synopsis: i.heroSynopsis,
                        backdropUrl: (i.heroBackdropUrl ?? "").trim(),
                        stills: [i.heroBackdropUrl, i.heroStill2Url, i.heroStill3Url].map(e => (e ?? "").trim()).filter(Boolean),
                        portraitUrl: (i.heroPortraitUrl ?? "").trim(),
                        videoUrl: (i.heroVideoUrl ?? "").trim(),
                        playLabel: i.heroPlayLabel,
                        infoLabel: i.heroInfoLabel,
                        metaYear: i.heroMetaYear,
                        metaRating: i.heroMetaRating,
                        metaDuration: i.heroMetaDuration
                    },
                    story: {
                        trackUrl: (i.storyTrackUrl ?? "").trim(),
                        clipAudio: "music" === (a = i.storyClipAudio) || "clip" === a ? i.storyClipAudio : "music",
                        exitLabel: i.storyExitLabel,
                        unmuteLabel: i.storyUnmuteLabel
                    },
                    countdown: {
                        enabled: c(i.countdownEnabled, !0),
                        title: i.countdownTitle,
                        caption: i.countdownCaption,
                        arrivedCaption: (i.countdownArrivedCaption ?? "").trim() || d.countdownArrivedCaption,
                        target: (i.countdownDate ?? "").trim()
                    },
                    rows: p,
                    credits: {
                        eyebrow: i.creditsEyebrow,
                        title: i.creditsTitle,
                        body: i.creditsBody,
                        closing: i.creditsClosing,
                        signature: i.creditsSignature,
                        restartLabel: i.creditsRestartLabel
                    }
                }
            }[{
                id: "theme",
                label: "Occasion & theme",
                blockType: "hero",
                description: "Name the occasion, pick the colour palette, and set the day you are counting down to.",
                fields: [{
                    id: "theme",
                    label: "Colour theme",
                    type: "theme",
                    required: !0,
                    helperText: "Four cinematic palettes. All of them are dark, like the real thing.",
                    options: o.map(e => ({
                        value: e.id,
                        label: e.label,
                        swatches: e.swatches
                    }))
                }, {
                    id: "countdownTitle",
                    label: "What is the occasion?",
                    type: "text",
                    helperText: "Whatever you are celebrating, in your own words — a birthday, an anniversary, Girlfriend's Day, Friendship Day, or nothing at all.",
                    maxLength: 40
                }, {
                    id: "countdownEnabled",
                    label: "Show a countdown to the big day",
                    type: "boolean",
                    helperText: "Adds a live countdown under the billboard. Turn it off to just show the page."
                }, {
                    id: "countdownDate",
                    label: "Counting down to",
                    type: "date",
                    helperText: "Pick the day from the calendar. Once it passes, the strip celebrates automatically."
                }, {
                    id: "countdownCaption",
                    label: "Line under the countdown",
                    type: "text",
                    maxLength: 70
                }, {
                    id: "countdownArrivedCaption",
                    label: "Line to show on the day itself",
                    type: "text",
                    helperText: "Swaps in once the date arrives, when the fireworks start. Leave blank to show nothing.",
                    maxLength: 70
                }]
            }, {
                id: "ident",
                label: "Cinematic intro",
                blockType: "hero",
                description: "The first thing they see — your two names animating in over a dark screen, film-studio style.",
                fields: [{
                    id: "identName",
                    label: "Your initial (or name)",
                    type: "text",
                    required: !0,
                    helperText: "Short works best. A single letter looks the most cinematic, but a short name is fine.",
                    maxLength: 14
                }, {
                    id: "identSeparator",
                    label: "Separator",
                    type: "text",
                    helperText: "The mark between the two names, e.g. & or ⨯ or +.",
                    maxLength: 3
                }, {
                    id: "identPartnerName",
                    label: "Their initial (or name)",
                    type: "text",
                    required: !0,
                    helperText: "Same idea — keep it short so the animation stays punchy.",
                    maxLength: 14
                }, {
                    id: "identTagline",
                    label: "Tagline under the names",
                    type: "text",
                    helperText: "Set in wide caps under the animation, e.g. 'A LOVE STORY'.",
                    maxLength: 34
                }, {
                    id: "identSkipLabel",
                    label: "Skip button text",
                    type: "text",
                    helperText: "Shown in the corner so they can jump straight in on a repeat visit.",
                    maxLength: 20
                }]
            }, {
                id: "gate",
                label: "Who's watching",
                blockType: "hero",
                description: "The profile-picker screen, exactly like picking a profile on a streaming app. Turn it off for a faster opening.",
                fields: [{
                    id: "gateEnabled",
                    label: "Show the profile picker",
                    type: "boolean",
                    helperText: "On by default. Turn it off to go straight from the intro to the main page."
                }, {
                    id: "gateTitle",
                    label: "Heading",
                    type: "text",
                    helperText: "e.g. 'Who's watching?'",
                    maxLength: 34
                }, {
                    id: "gateProfile1Name",
                    label: "Profile 1 — name",
                    type: "text",
                    maxLength: 18
                }, {
                    id: "gateProfile1AvatarUrl",
                    label: "Profile 1 — picture",
                    type: "image",
                    helperText: "Pick one of the six characters, or upload your own square photo (max 3 MB).",
                    options: n.map(e => ({
                        value: e.url,
                        label: e.label
                    }))
                }, {
                    id: "gateProfile2Name",
                    label: "Profile 2 — name",
                    type: "text",
                    maxLength: 18
                }, {
                    id: "gateProfile2AvatarUrl",
                    label: "Profile 2 — picture",
                    type: "image",
                    helperText: "Same again for the second profile.",
                    options: n.map(e => ({
                        value: e.url,
                        label: e.label
                    }))
                }]
            }, {
                id: "brand",
                label: "Logo & navigation",
                blockType: "hero",
                description: "The wordmark in the top-left and the four nav links beside it.",
                fields: [{
                    id: "brandMark",
                    label: "Wordmark",
                    type: "text",
                    required: !0,
                    helperText: "Sits top-left in the theme colour, e.g. 'M & A'. Keep it short.",
                    maxLength: 18
                }, {
                    id: "navHome",
                    label: "Nav link 1",
                    type: "text",
                    maxLength: 16
                }, {
                    id: "navChapters",
                    label: "Nav link 2",
                    type: "text",
                    maxLength: 16
                }, {
                    id: "navTrips",
                    label: "Nav link 3",
                    type: "text",
                    maxLength: 16
                }, {
                    id: "navOnlyUs",
                    label: "Nav link 4",
                    type: "text",
                    maxLength: 16
                }]
            }, {
                id: "hero",
                label: "Billboard",
                blockType: "hero",
                description: "The big feature banner — your trailer or backdrop photo, the title, and the synopsis.",
                fields: [{
                    id: "heroBackdropUrl",
                    label: "Billboard photo 1",
                    type: "image",
                    required: !0,
                    helperText: "Your favourite photo of the two of you. It slowly drifts and zooms behind the title, like a film trailer."
                }, {
                    id: "heroStill2Url",
                    label: "Billboard photo 2 (optional)",
                    type: "image",
                    helperText: "Add a second photo and the billboard cross-fades between them. Leave blank to keep a single still."
                }, {
                    id: "heroStill3Url",
                    label: "Billboard photo 3 (optional)",
                    type: "image",
                    helperText: "A third photo for a longer cinematic loop."
                }, {
                    id: "heroPortraitUrl",
                    label: "Photo for phones (optional)",
                    type: "image",
                    aspectRatio: "9:16",
                    helperText: "Most people open this on a phone, where a wide photo gets cropped to its middle. Upload a photo here and pick the Tall shape — it is used on phones, and the wide photos above are kept for laptops. Leave blank to use the same photos everywhere."
                }, {
                    id: "heroVideoUrl",
                    label: "Trailer video (optional — photos work fine)",
                    type: "video",
                    maxSizeMb: 30,
                    helperText: "Only if you want one. Up to 30 MB, MP4 — it replaces the photo sequence and autoplays muted, and they can unmute it."
                }, {
                    id: "heroBadge",
                    label: "Small label above the title",
                    type: "text",
                    helperText: "e.g. 'A LOVE STORY \xb7 ONGOING'.",
                    maxLength: 40
                }, {
                    id: "heroTitle",
                    label: "Title",
                    type: "text",
                    required: !0,
                    helperText: "The big one. Short titles look best — this is set very large.",
                    maxLength: 40
                }, {
                    id: "heroSynopsis",
                    label: "Synopsis",
                    type: "textarea",
                    helperText: "Two or three lines, like a real show description."
                }, {
                    id: "heroPlayLabel",
                    label: "Primary button text",
                    type: "text",
                    maxLength: 22
                }, {
                    id: "heroInfoLabel",
                    label: "Secondary button text",
                    type: "text",
                    maxLength: 22
                }, {
                    id: "heroMetaYear",
                    label: "Meta — year",
                    type: "text",
                    helperText: "Shown in the details panel, e.g. '2025'.",
                    maxLength: 12
                }, {
                    id: "heroMetaRating",
                    label: "Meta — rating",
                    type: "text",
                    helperText: "Have fun with it, e.g. 'U/A \xb7 Very Us'.",
                    maxLength: 20
                }, {
                    id: "heroMetaDuration",
                    label: "Meta — duration",
                    type: "text",
                    helperText: "e.g. 'Ongoing' or '3 years and counting'.",
                    maxLength: 24
                }]
            }, {
                id: "story",
                label: "Play Our Story",
                blockType: "hero",
                description: "The big Play button opens a full-screen film — every photo and clip you upload, played back one after another with your song underneath.",
                fields: [{
                    id: "storyTrackUrl",
                    label: "Soundtrack (MP3)",
                    type: "audio",
                    helperText: "The song that plays during the film. Comes with a track already set — upload your own MP3 (max 3 MB) to replace it, or clear it to play silently."
                }, {
                    id: "storyClipAudio",
                    label: "When a video clip plays",
                    type: "select",
                    helperText: "Your clips can either stay silent under the song, or play their own sound. Either way they can switch it themselves while watching.",
                    options: [{
                        value: "music",
                        label: "Keep the song playing (clip stays muted)"
                    }, {
                        value: "clip",
                        label: "Play the clip's own sound (song ducks out)"
                    }]
                }, {
                    id: "storyExitLabel",
                    label: "Exit button text",
                    type: "text",
                    helperText: "Shown on the closing card at the end of the film.",
                    maxLength: 24
                }, {
                    id: "storyUnmuteLabel",
                    label: "Sound prompt text",
                    type: "text",
                    helperText: "Shown only if their phone blocks audio until they tap once.",
                    maxLength: 24
                }]
            }, {
                id: "row1",
                label: "Row 1 — Chapters",
                blockType: "gallery",
                description: "The first shelf of tiles. Each one opens into a detail card with its own note. Images or GIFs up to 3 MB.",
                fields: [{
                    id: "row1Title",
                    label: "Row heading",
                    type: "text",
                    required: !0,
                    maxLength: 34
                }, {
                    id: "row1Item1Url",
                    label: "Tile 1 — photo",
                    type: "image"
                }, {
                    id: "row1Item1Title",
                    label: "Tile 1 — title",
                    type: "text",
                    maxLength: 32
                }, {
                    id: "row1Item1Note",
                    label: "Tile 1 — note",
                    type: "textarea"
                }, {
                    id: "row1Item2Url",
                    label: "Tile 2 — photo",
                    type: "image"
                }, {
                    id: "row1Item2Title",
                    label: "Tile 2 — title",
                    type: "text",
                    maxLength: 32
                }, {
                    id: "row1Item2Note",
                    label: "Tile 2 — note",
                    type: "textarea"
                }, {
                    id: "row1Item3Url",
                    label: "Tile 3 — photo",
                    type: "image"
                }, {
                    id: "row1Item3Title",
                    label: "Tile 3 — title",
                    type: "text",
                    maxLength: 32
                }, {
                    id: "row1Item3Note",
                    label: "Tile 3 — note",
                    type: "textarea"
                }, {
                    id: "row1Item4Url",
                    label: "Tile 4 — photo",
                    type: "image"
                }, {
                    id: "row1Item4Title",
                    label: "Tile 4 — title",
                    type: "text",
                    maxLength: 32
                }, {
                    id: "row1Item4Note",
                    label: "Tile 4 — note",
                    type: "textarea"
                }, {
                    id: "row1Item5Url",
                    label: "Tile 5 — photo",
                    type: "image"
                }, {
                    id: "row1Item5Title",
                    label: "Tile 5 — title",
                    type: "text",
                    maxLength: 32
                }, {
                    id: "row1Item5Note",
                    label: "Tile 5 — note",
                    type: "textarea"
                }]
            }, {
                id: "row2",
                label: "Row 2 — Trips",
                blockType: "gallery",
                description: "The second shelf. Leave a tile's photo blank to hide that tile entirely.",
                fields: [{
                    id: "row2Title",
                    label: "Row heading",
                    type: "text",
                    required: !0,
                    maxLength: 34
                }, {
                    id: "row2Item1Url",
                    label: "Tile 1 — photo",
                    type: "image"
                }, {
                    id: "row2Item1Title",
                    label: "Tile 1 — title",
                    type: "text",
                    maxLength: 32
                }, {
                    id: "row2Item1Note",
                    label: "Tile 1 — note",
                    type: "textarea"
                }, {
                    id: "row2Item2Url",
                    label: "Tile 2 — photo",
                    type: "image"
                }, {
                    id: "row2Item2Title",
                    label: "Tile 2 — title",
                    type: "text",
                    maxLength: 32
                }, {
                    id: "row2Item2Note",
                    label: "Tile 2 — note",
                    type: "textarea"
                }, {
                    id: "row2Item3Url",
                    label: "Tile 3 — photo",
                    type: "image"
                }, {
                    id: "row2Item3Title",
                    label: "Tile 3 — title",
                    type: "text",
                    maxLength: 32
                }, {
                    id: "row2Item3Note",
                    label: "Tile 3 — note",
                    type: "textarea"
                }]
            }, {
                id: "row3",
                label: "Row 3 — Only Us (videos)",
                blockType: "gallery",
                description: "The video shelf. Each tile plays inline when opened. Up to 30 MB per clip.",
                fields: [{
                    id: "row3Title",
                    label: "Row heading",
                    type: "text",
                    required: !0,
                    maxLength: 34
                }, {
                    id: "row3Item1Url",
                    label: "Clip 1 — video",
                    type: "video",
                    maxSizeMb: 30,
                    helperText: "MP4 up to 30 MB. Leave blank to hide this tile."
                }, {
                    id: "row3Item1Title",
                    label: "Clip 1 — title",
                    type: "text",
                    maxLength: 32
                }, {
                    id: "row3Item1Note",
                    label: "Clip 1 — note",
                    type: "textarea"
                }, {
                    id: "row3Item2Url",
                    label: "Clip 2 — video",
                    type: "video",
                    maxSizeMb: 30,
                    helperText: "MP4 up to 30 MB. Leave blank to hide this tile."
                }, {
                    id: "row3Item2Title",
                    label: "Clip 2 — title",
                    type: "text",
                    maxLength: 32
                }, {
                    id: "row3Item2Note",
                    label: "Clip 2 — note",
                    type: "textarea"
                }]
            }, {
                id: "credits",
                label: "End credits",
                blockType: "story",
                description: "The closing letter, scrolling up over black like real end credits.",
                fields: [{
                    id: "creditsEyebrow",
                    label: "Small label",
                    type: "text",
                    maxLength: 24
                }, {
                    id: "creditsTitle",
                    label: "Heading",
                    type: "text",
                    required: !0,
                    maxLength: 34
                }, {
                    id: "creditsBody",
                    label: "Your letter",
                    type: "textarea",
                    required: !0,
                    helperText: "The main message. Press Enter twice for a new paragraph. Short and true beats long and fancy."
                }, {
                    id: "creditsClosing",
                    label: "Sign-off line",
                    type: "text",
                    maxLength: 34
                }, {
                    id: "creditsSignature",
                    label: "Your name",
                    type: "text",
                    maxLength: 24
                }, {
                    id: "creditsRestartLabel",
                    label: "Replay button text",
                    type: "text",
                    maxLength: 24
                }]
            }].map(e => ({ ...e,
                fields: e.fields.map(e => {
                    let {
                        options: t,
                        ...a
                    } = e;
                    return { ...a,
                        ...t ? {
                            options: t.map(e => ({
                                value: e.value,
                                label: e.label,
                                ...e.swatches ? {
                                    swatches: [...e.swatches]
                                } : {}
                            }))
                        } : {},
                        defaultValue: d[e.id]
                    }
                })
            }))
        },
        97093: (e, t, a) => {
            a.d(t, {
                M6: () => o,
                yO: () => n
            });
            var i = a(69201);
            let l = new Set(Object.keys(i.hR)),
                r = ["countdownEnabled", "countdownTitle", "countdownCaption", "countdownDate"];

            function n(e) {
                let t = e.sections.find(e => "countdown" === e.id);
                if (!t) return e;
                let a = Object.fromEntries(r.filter(e => void 0 !== t.values[e]).map(e => [e, t.values[e]]));
                if (0 === Object.keys(a).length) return e;
                let i = e.sections.some(e => "theme" === e.id),
                    l = e.sections.filter(e => "countdown" !== e.id).map(e => "theme" === e.id ? { ...e,
                        values: { ...a,
                            ...e.values
                        }
                    } : e);
                return {
                    sections: i ? l : [...l, {
                        id: "theme",
                        enabled: !0,
                        values: a
                    }]
                }
            }

            function o(e) {
                return (0, i.ns)(function(e) {
                    let t = new Map;
                    for (let a of e)
                        for (let [e, i] of Object.entries(a.values)) l.has(e) && ("string" == typeof i || "boolean" == typeof i) && t.set(e, i);
                    return { ...i.hR,
                        ...Object.fromEntries(t)
                    }
                }(e.sections))
            }
        }
    }
]);