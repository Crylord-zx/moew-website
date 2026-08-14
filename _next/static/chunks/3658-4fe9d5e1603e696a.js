"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3658], {
        13658: (e, t, r) => {
            r.r(t), r.d(t, {
                GirlfriendsDayLive: () => er
            });
            var a = r(73365),
                l = r(1521);
            let o = "https://cdn.cutiepage.in",
                i = `${o}/template-seeds/girlfriends-day`,
                s = `${o}/template-seeds/brothers-day`,
                n = {
                    introMascot: `${s}/kiss.gif`,
                    heroPortrait: `${i}/gallery1.jpeg`,
                    songCover: `${i}/gallery2.gif`,
                    song: `${i}/music.mp3`,
                    galleryOne: `${i}/gallery1.jpeg`,
                    galleryTwo: `${i}/gallery2.gif`,
                    galleryThree: `${i}/gallery3.jpeg`,
                    galleryFour: "",
                    greetingOne: `${i}/greeting1.gif`,
                    greetingTwo: `${i}/greeting2.gif`,
                    greetingThree: `${i}/greeting3.jpeg`,
                    letterStripOne: `${i}/letter1.jpeg`,
                    letterStripTwo: `${i}/letter2.jpeg`,
                    letterStripThree: `${i}/letter3.jpeg`,
                    gratitudeMascot: `${s}/cat.gif`,
                    letterImage: `${s}/kiss.gif`,
                    cover: `${i}/cover.png`
                },
                d = [{
                    id: "violet",
                    label: "Violet",
                    swatches: ["#7c53c9", "#e6b566", "#f8f4ff"]
                }, {
                    id: "rosewood",
                    label: "Rosewood",
                    swatches: ["#c2415f", "#e0876a", "#fff3f2"]
                }, {
                    id: "honey",
                    label: "Honey",
                    swatches: ["#c98a2e", "#d98b62", "#fff8ec"]
                }, {
                    id: "emerald",
                    label: "Emerald",
                    swatches: ["#1d8a72", "#e08a58", "#eefaf5"]
                }, {
                    id: "noir",
                    label: "Noir",
                    swatches: ["#ff7aa8", "#f0b34a", "#15121f"]
                }],
                c = "violet",
                f = {
                    theme: c,
                    girlfriendName: "my love",
                    introForLabel: "for the girl i adore",
                    introTitle: "a little world, made for you",
                    introSubtitle: "happy girlfriend's day, my love ♡",
                    introSealLetter: "L",
                    introMascotUrl: n.introMascot,
                    introHint: "tap anywhere to begin ♡",
                    introNoteLine: "yours, always",
                    heroEyebrow: "for my favourite person",
                    heroHeadline: "Happy Girlfriend's Day",
                    heroMessage: "Today is all about you. I built this tiny corner of the internet to say what I don't say often enough — that you make ordinary days feel like the good kind of story. Stay a while, my love.",
                    heroPortraitUrl: n.heroPortrait,
                    heroForLabel: "for you, always ♡",
                    heroButton: "see our little album →",
                    greetingPhoto1Url: n.greetingOne,
                    greetingPhoto2Url: n.greetingTwo,
                    greetingPhoto3Url: n.greetingThree,
                    songTitle: "Our Song",
                    songArtist: "a track that's just us",
                    songCaption: "press play — this one plays in my head every time I think of you.",
                    songCoverUrl: n.songCover,
                    songUrl: n.song,
                    galleryEyebrow: "our moments",
                    galleryTitle: "us, in a few frames",
                    gallerySubtitle: "a handful of moments I'd relive on loop ♡",
                    galleryPhoto1Url: n.galleryOne,
                    galleryPhoto1Caption: "the day I realised you were my favourite hello.",
                    galleryPhoto2Url: n.galleryTwo,
                    galleryPhoto2Caption: "every quiet moment with you is my favourite kind.",
                    galleryPhoto3Url: n.galleryThree,
                    galleryPhoto3Caption: "I'd choose this — us, exactly like this — every time.",
                    galleryPhoto4Url: n.galleryFour,
                    galleryPhoto4Caption: "here's to a hundred more frames just like these.",
                    galleryButton: "why I adore you →",
                    gardenEyebrow: "a little bouquet",
                    gardenTitle: "a bloom for every reason I adore you",
                    gardenSubtitle: "picked just for you ♡",
                    flowerNote1: "you feel like home",
                    flowerNote2: "your laugh is my favourite sound",
                    flowerNote3: "you make ordinary days magic",
                    flowerNote4: "you're my calm and my spark",
                    flowerNote5: "you make me want to be better",
                    flowerNote6: "it's you. it's always you.",
                    gardenButton: "read my letter →",
                    letterEyebrow: "♡ a letter, just for you ♡",
                    letterImageUrl: n.letterImage,
                    letterPhoto1Url: n.letterStripOne,
                    letterPhoto2Url: n.letterStripTwo,
                    letterPhoto3Url: n.letterStripThree,
                    letterGreeting: "My darling,",
                    letterBody: `I'm better with actions than with words, so I made you a little page instead — a song, our pictures, and a few things I mean with my whole heart.

thank you for being the calm in my chaos and the spark in my ordinary. for the late-night talks, the terrible puns, and the way you always know when I need a hug before I do.

I hope today feels soft and warm and completely yours. I hope you feel even a fraction of how much you're adored. and I hope you always know — even on the days I forget to say it — I choose you, every single time.`,
                    letterClosing: "yours, completely,",
                    letterSignature: "your person",
                    letterFromPrefix: "with all my love",
                    fromName: "me",
                    letterRestartButton: "↻ read it again"
                };

            function p(e, t) {
                return e && e.trim() ? e : f[t]
            }

            function h(e = f) {
                var t;
                let r = [{
                        url: e.galleryPhoto1Url,
                        caption: e.galleryPhoto1Caption
                    }, {
                        url: e.galleryPhoto2Url,
                        caption: e.galleryPhoto2Caption
                    }, {
                        url: e.galleryPhoto3Url,
                        caption: e.galleryPhoto3Caption
                    }, {
                        url: e.galleryPhoto4Url,
                        caption: e.galleryPhoto4Caption
                    }].filter(e => !!(e.url && e.url.trim())),
                    a = e => {
                        let t = e.filter(e => !!(e && e.trim())).map(e => ({
                            url: e
                        }));
                        return t.length > 0 ? t : r.slice(0, 3)
                    };
                return {
                    theme: "string" == typeof(t = e.theme) && d.some(e => e.id === t) ? e.theme : c,
                    intro: {
                        name: e.girlfriendName,
                        forLabel: e.introForLabel,
                        title: e.introTitle,
                        subtitle: e.introSubtitle,
                        sealLetter: p(e.introSealLetter, "introSealLetter"),
                        mascotUrl: e.introMascotUrl || f.introMascotUrl,
                        hint: e.introHint,
                        noteLine: e.introNoteLine
                    },
                    hero: {
                        eyebrow: e.heroEyebrow,
                        headline: e.heroHeadline,
                        message: e.heroMessage,
                        portraitUrl: e.heroPortraitUrl || f.heroPortraitUrl,
                        forLabel: e.heroForLabel,
                        button: p(e.heroButton, "heroButton"),
                        stripPhotos: a([e.greetingPhoto1Url, e.greetingPhoto2Url, e.greetingPhoto3Url])
                    },
                    song: {
                        title: e.songTitle,
                        artist: e.songArtist,
                        caption: e.songCaption,
                        coverUrl: e.songCoverUrl || f.songCoverUrl,
                        url: e.songUrl || f.songUrl
                    },
                    gallery: {
                        eyebrow: e.galleryEyebrow,
                        title: e.galleryTitle,
                        subtitle: e.gallerySubtitle,
                        photos: r,
                        button: p(e.galleryButton, "galleryButton")
                    },
                    garden: {
                        eyebrow: e.gardenEyebrow,
                        title: e.gardenTitle,
                        subtitle: e.gardenSubtitle,
                        notes: [e.flowerNote1, e.flowerNote2, e.flowerNote3, e.flowerNote4, e.flowerNote5, e.flowerNote6],
                        button: p(e.gardenButton, "gardenButton")
                    },
                    letter: {
                        eyebrow: e.letterEyebrow,
                        imageUrl: e.letterImageUrl || f.letterImageUrl,
                        stripPhotos: a([e.letterPhoto1Url, e.letterPhoto2Url, e.letterPhoto3Url]),
                        greeting: e.letterGreeting,
                        body: e.letterBody,
                        closing: e.letterClosing,
                        signature: e.letterSignature,
                        fromPrefix: e.letterFromPrefix,
                        fromName: e.fromName,
                        restartButton: p(e.letterRestartButton, "letterRestartButton")
                    }
                }
            }[{
                id: "theme",
                label: "Theme",
                blockType: "hero",
                description: "Pick a colour palette for the whole page.",
                fields: [{
                    id: "theme",
                    label: "Colour theme",
                    type: "theme",
                    required: !0,
                    helperText: "Every screen adopts these colours automatically.",
                    options: d.map(e => ({
                        value: e.id,
                        label: e.label,
                        swatches: e.swatches
                    }))
                }]
            }, {
                id: "intro",
                label: "Opening envelope",
                blockType: "hero",
                description: "The first screen — an envelope with a handwritten card easing up out of it. She taps, blossoms burst, then the greeting appears.",
                fields: [{
                    id: "girlfriendName",
                    label: "Her name (or nickname)",
                    type: "text",
                    required: !0,
                    helperText: "What you call her — 'my love', her name, or a sweet nickname."
                }, {
                    id: "introForLabel",
                    label: "Top tag (e.g. 'for the girl i adore')",
                    type: "text",
                    helperText: "The small chip shown above the title on the opening screen."
                }, {
                    id: "introTitle",
                    label: "Opening title",
                    type: "text",
                    required: !0,
                    helperText: "The big line on the first screen."
                }, {
                    id: "introSubtitle",
                    label: "Opening subtitle",
                    type: "text",
                    helperText: "The script line under the title."
                }, {
                    id: "introSealLetter",
                    label: "Envelope seal letter",
                    type: "text",
                    helperText: "The single letter shown on the wax seal of the envelope.",
                    maxLength: 2
                }, {
                    id: "introMascotUrl",
                    label: "Opening GIF / image",
                    type: "image",
                    helperText: "A little animated mascot shown above the envelope. GIF/PNG/JPEG."
                }, {
                    id: "introNoteLine",
                    label: "Card sign-off",
                    type: "text",
                    helperText: "The last line on the handwritten card that rises out of the envelope, e.g. 'yours, always'."
                }, {
                    id: "introHint",
                    label: "Envelope button hint",
                    type: "text",
                    helperText: "The tiny label under the envelope, e.g. 'tap anywhere to begin ♡'."
                }]
            }, {
                id: "hero",
                label: "Greeting",
                blockType: "hero",
                description: "A warm hero card with a portrait, eyebrow tag, headline, a personal message, and the button that moves forward.",
                fields: [{
                    id: "heroEyebrow",
                    label: "Eyebrow",
                    type: "text",
                    helperText: "Small tag above the headline."
                }, {
                    id: "heroHeadline",
                    label: "Headline",
                    type: "text",
                    required: !0,
                    helperText: "The big greeting — usually 'Happy Girlfriend's Day'."
                }, {
                    id: "heroMessage",
                    label: "Welcome message",
                    type: "textarea",
                    required: !0,
                    helperText: "2–4 lines that set the tone for the page."
                }, {
                    id: "heroPortraitUrl",
                    label: "Hero portrait / photo",
                    type: "image",
                    helperText: "A photo of her, the two of you, or a fun illustration. JPEG/PNG/GIF (max 3 MB)."
                }, {
                    id: "heroForLabel",
                    label: "Greeting sub-line",
                    type: "text",
                    helperText: "The script line under the headline. Leave blank to hide."
                }, {
                    id: "heroButton",
                    label: "Button label (to the album)",
                    type: "text",
                    helperText: "The button that moves to the photo album."
                }, {
                    id: "greetingPhoto1Url",
                    label: "Greeting photo strip — photo 1",
                    type: "image",
                    helperText: "A little 3-photo strip shown under the greeting. Leave blank to fall back to your album photos."
                }, {
                    id: "greetingPhoto2Url",
                    label: "Greeting photo strip — photo 2",
                    type: "image"
                }, {
                    id: "greetingPhoto3Url",
                    label: "Greeting photo strip — photo 3",
                    type: "image"
                }]
            }, {
                id: "song",
                label: "A song for her",
                blockType: "media",
                description: "An inline music card she can play. Pick a track that's yours.",
                fields: [{
                    id: "songTitle",
                    label: "Song title",
                    type: "text",
                    required: !0,
                    helperText: "The name of the song — shown above the player."
                }, {
                    id: "songArtist",
                    label: "Artist / dedication",
                    type: "text",
                    helperText: "e.g. the artist name or 'a track that's just us'."
                }, {
                    id: "songCaption",
                    label: "Caption under the player",
                    type: "textarea",
                    helperText: "One or two lines on why you picked this song."
                }, {
                    id: "songCoverUrl",
                    label: "Cover image",
                    type: "image",
                    helperText: "The square cover art for the player. JPEG/PNG (max 3 MB)."
                }, {
                    id: "songUrl",
                    label: "Song file (MP3)",
                    type: "audio",
                    helperText: "Upload the MP3 you'd like to play. Max ~5 MB."
                }]
            }, {
                id: "gallery",
                label: "Photo album",
                blockType: "gallery",
                description: "A photo album of up to four pictures — swipe through with a caption for each.",
                fields: [{
                    id: "galleryEyebrow",
                    label: "Section eyebrow",
                    type: "text"
                }, {
                    id: "galleryTitle",
                    label: "Section title",
                    type: "text",
                    required: !0
                }, {
                    id: "gallerySubtitle",
                    label: "Section subtitle",
                    type: "text"
                }, {
                    id: "galleryPhoto1Url",
                    label: "Photo 1",
                    type: "image",
                    required: !0
                }, {
                    id: "galleryPhoto1Caption",
                    label: "Caption 1",
                    type: "text"
                }, {
                    id: "galleryPhoto2Url",
                    label: "Photo 2",
                    type: "image"
                }, {
                    id: "galleryPhoto2Caption",
                    label: "Caption 2",
                    type: "text"
                }, {
                    id: "galleryPhoto3Url",
                    label: "Photo 3",
                    type: "image"
                }, {
                    id: "galleryPhoto3Caption",
                    label: "Caption 3",
                    type: "text"
                }, {
                    id: "galleryPhoto4Url",
                    label: "Photo 4",
                    type: "image"
                }, {
                    id: "galleryPhoto4Caption",
                    label: "Caption 4",
                    type: "text"
                }, {
                    id: "galleryButton",
                    label: "Button label (to the reasons)",
                    type: "text",
                    helperText: "The button that moves to the tap-to-reveal blooms."
                }]
            }, {
                id: "garden",
                label: "Flower garden",
                blockType: "gallery",
                description: "A clean bouquet of six hand-drawn SVG flowers, each with a little note underneath. Purely visual — no tapping.",
                fields: [{
                    id: "gardenEyebrow",
                    label: "Section eyebrow",
                    type: "text"
                }, {
                    id: "gardenTitle",
                    label: "Section title",
                    type: "text",
                    required: !0
                }, {
                    id: "gardenSubtitle",
                    label: "Section subtitle",
                    type: "text"
                }, {
                    id: "flowerNote1",
                    label: "Flower 1 — note",
                    type: "text",
                    required: !0
                }, {
                    id: "flowerNote2",
                    label: "Flower 2 — note",
                    type: "text"
                }, {
                    id: "flowerNote3",
                    label: "Flower 3 — note",
                    type: "text"
                }, {
                    id: "flowerNote4",
                    label: "Flower 4 — note",
                    type: "text"
                }, {
                    id: "flowerNote5",
                    label: "Flower 5 — note",
                    type: "text"
                }, {
                    id: "flowerNote6",
                    label: "Flower 6 — note",
                    type: "text"
                }, {
                    id: "gardenButton",
                    label: "Button label (to the letter)",
                    type: "text",
                    helperText: "The button that opens the closing letter."
                }]
            }, {
                id: "letter",
                label: "Letter",
                blockType: "cta",
                description: "A handwritten-style closing letter on warm paper. Use double line breaks to separate paragraphs.",
                fields: [{
                    id: "letterEyebrow",
                    label: "Letter intro line",
                    type: "text",
                    helperText: "The tiny line above the greeting, e.g. '♡ a letter, just for you ♡'."
                }, {
                    id: "letterImageUrl",
                    label: "Letter image",
                    type: "image"
                }, {
                    id: "letterPhoto1Url",
                    label: "Letter photo strip — photo 1",
                    type: "image",
                    helperText: "A little 3-photo strip tucked into the middle of the letter. Leave blank to fall back to your album photos."
                }, {
                    id: "letterPhoto2Url",
                    label: "Letter photo strip — photo 2",
                    type: "image"
                }, {
                    id: "letterPhoto3Url",
                    label: "Letter photo strip — photo 3",
                    type: "image"
                }, {
                    id: "letterGreeting",
                    label: "Greeting",
                    type: "text",
                    required: !0
                }, {
                    id: "letterBody",
                    label: "Letter body",
                    type: "textarea",
                    required: !0
                }, {
                    id: "letterClosing",
                    label: "Closing line",
                    type: "text"
                }, {
                    id: "letterSignature",
                    label: "Signature",
                    type: "text",
                    required: !0
                }, {
                    id: "letterFromPrefix",
                    label: "Footer prefix (e.g. 'with all my love')",
                    type: "text",
                    helperText: "Shown before your name in the footer tag."
                }, {
                    id: "fromName",
                    label: "Your name (footer)",
                    type: "text",
                    helperText: "Shown in the small 'with love from' tag at the very bottom."
                }, {
                    id: "letterRestartButton",
                    label: "Restart button label",
                    type: "text",
                    helperText: "The button that replays the page from the start."
                }]
            }].map(e => ({ ...e,
                fields: e.fields.map(e => ({ ...e,
                    defaultValue: f[e.id]
                }))
            }));
            let g = new Set(Object.keys(f));
            var x = r(13750),
                m = r(17754);
            let y = h(),
                u = (0, l.createContext)(y);

            function b({
                children: e,
                config: t
            }) {
                return (0, a.jsx)(u.Provider, {
                    value: t ?? y,
                    children: e
                })
            }

            function v() {
                return (0, l.useContext)(u)
            }
            let j = (0, l.createContext)(null);

            function w({
                children: e
            }) {
                let t = v(),
                    r = (0, l.useRef)(null),
                    [o, i] = (0, l.useState)(!1),
                    [s, n] = (0, l.useState)(0),
                    [d, c] = (0, l.useState)(0),
                    [f, p] = (0, l.useState)(0);
                (0, l.useEffect)(() => {
                    let e = r.current;
                    if (!e) return;
                    let t = () => {
                            p(e.currentTime), e.duration && n(e.currentTime / e.duration * 100)
                        },
                        a = () => c(e.duration || 0),
                        l = () => i(!0),
                        o = () => i(!1);
                    return e.addEventListener("timeupdate", t), e.addEventListener("loadedmetadata", a), e.addEventListener("play", l), e.addEventListener("pause", o), () => {
                        e.removeEventListener("timeupdate", t), e.removeEventListener("loadedmetadata", a), e.removeEventListener("play", l), e.removeEventListener("pause", o)
                    }
                }, []);
                let h = (0, l.useCallback)(() => {
                    let e = r.current;
                    e && (e.paused ? e.play().catch(e => console.error("Audio playback failed:", e)) : e.pause())
                }, []);
                return (0, a.jsxs)(j.Provider, {
                    value: {
                        isPlaying: o,
                        progress: s,
                        current: f,
                        duration: d,
                        toggle: h
                    },
                    children: [(0, a.jsx)("audio", {
                        ref: r,
                        src: t.song.url,
                        preload: "metadata",
                        loop: !0
                    }, t.song.url), e]
                })
            }
            let N = ["var(--gfd-petal-1, #f7b8c8)", "var(--gfd-petal-2, #ffd0c2)", "var(--gfd-petal-3, #dcc9ff)", "var(--gfd-petal-4, #fff4fb)", "var(--gfd-petal-5, #ffe0a8)"];

            function k({
                seed: e = 21,
                count: t = 7
            }) {
                let r = (0, l.useMemo)(() => {
                    let r, a = ((r = e % 0x7fffffff) <= 0 && (r += 0x7ffffffe), () => ((r = 16807 * r % 0x7fffffff) - 1) / 0x7ffffffe);
                    return Array.from({
                        length: t
                    }, (e, t) => ({
                        id: t,
                        kind: .4 > a() ? "heart" : "blossom",
                        left: 100 * a(),
                        size: 13 + Math.round(13 * a()),
                        color: N[Math.floor(a() * N.length)],
                        delay: 15 * a(),
                        duration: 14 + 11 * a(),
                        drift: -26 + 52 * a(),
                        rot: -70 + Math.round(140 * a())
                    }))
                }, [e, t]);
                return (0, a.jsx)("div", {
                    className: "pointer-events-none absolute inset-0 overflow-hidden",
                    "aria-hidden": "true",
                    children: r.map(e => (0, a.jsx)("span", {
                        className: "gfd-petal-fall",
                        style: {
                            left: `${e.left}%`,
                            width: e.size,
                            height: e.size,
                            color: e.color,
                            animationDelay: `${e.delay.toFixed(2)}s`,
                            animationDuration: `${e.duration.toFixed(2)}s`,
                            "--gfd-drift": `${e.drift}px`,
                            "--gfd-rot": `${e.rot}deg`
                        },
                        children: "heart" === e.kind ? (0, a.jsx)("svg", {
                            viewBox: "0 0 24 24",
                            fill: "none",
                            "aria-hidden": "true",
                            children: (0, a.jsx)("path", {
                                d: "M12 21 C12 21 3 15.5 3 9.2 C3 5.7 5.4 3.5 8 3.5 C9.8 3.5 11.3 4.6 12 6 C12.7 4.6 14.2 3.5 16 3.5 C18.6 3.5 21 5.7 21 9.2 C21 15.5 12 21 12 21 Z",
                                fill: "currentColor"
                            })
                        }) : (0, a.jsxs)("svg", {
                            viewBox: "0 0 24 24",
                            fill: "none",
                            "aria-hidden": "true",
                            children: [
                                [0, 72, 144, 216, 288].map(e => (0, a.jsx)("ellipse", {
                                    cx: "12",
                                    cy: "6",
                                    rx: "3.4",
                                    ry: "5.4",
                                    fill: "currentColor",
                                    transform: `rotate(${e} 12 12)`
                                }, e)), (0, a.jsx)("circle", {
                                    cx: "12",
                                    cy: "12",
                                    r: "2.6",
                                    fill: "var(--gfd-petal-core, #fff6d8)"
                                })
                            ]
                        })
                    }, e.id))
                })
            }
            let C = "var(--gfd-icon-sparkle, #e6b566)",
                P = "var(--gfd-bloom-2-center-edge, #c98a2e)",
                T = "var(--gfd-bloom-5-center, #4a3b6b)",
                L = "var(--gfd-env-line, #f2b9c9)",
                $ = 0;

            function U(e) {
                let [t] = l.useState(() => `${e}-${$+=1}`);
                return t
            }

            function M({
                color: e = "var(--gfd-icon-heart, #f7899f)",
                edge: t = "var(--gfd-icon-heart-edge, #d94f74)",
                ...r
            }) {
                return (0, a.jsxs)("svg", {
                    viewBox: "0 0 32 32",
                    fill: "none",
                    ...r,
                    children: [(0, a.jsx)("path", {
                        d: "M16 27.5 C16 27.5 4 20 4 12 C4 7 7.5 4 11 4 C13.4 4 15.2 5.4 16 7.2 C16.8 5.4 18.6 4 21 4 C24.5 4 28 7 28 12 C28 20 16 27.5 16 27.5 Z",
                        fill: e,
                        stroke: t,
                        strokeWidth: "1.6",
                        strokeLinejoin: "round"
                    }), (0, a.jsx)("ellipse", {
                        cx: "11",
                        cy: "10",
                        rx: "2",
                        ry: "3",
                        fill: "#ffffff",
                        opacity: "0.55"
                    })]
                })
            }

            function S({
                color: e = C,
                ...t
            }) {
                return (0, a.jsx)("svg", {
                    viewBox: "0 0 24 24",
                    fill: "none",
                    ...t,
                    children: (0, a.jsx)("path", {
                        d: "M12 2 C12.8 7.5 16.5 11.2 22 12 C16.5 12.8 12.8 16.5 12 22 C11.2 16.5 7.5 12.8 2 12 C7.5 11.2 11.2 7.5 12 2 Z",
                        fill: e
                    })
                })
            }

            function B({
                petalColor: e = "var(--gfd-bloom-1, #f7b8c8)",
                petalEdge: t = "var(--gfd-bloom-1-edge, #e87a97)",
                centerColor: r = "var(--gfd-bloom-1-center, #fff2dc)",
                ...l
            }) {
                let o = U("gfd-ranunculus");
                return (0, a.jsxs)("svg", {
                    viewBox: "0 0 96 96",
                    fill: "none",
                    ...l,
                    children: [(0, a.jsx)("defs", {
                        children: (0, a.jsxs)("radialGradient", {
                            id: o,
                            cx: "50%",
                            cy: "32%",
                            r: "80%",
                            children: [(0, a.jsx)("stop", {
                                offset: "0%",
                                stopColor: "#fff",
                                stopOpacity: "0.85"
                            }), (0, a.jsx)("stop", {
                                offset: "55%",
                                stopColor: e
                            }), (0, a.jsx)("stop", {
                                offset: "100%",
                                stopColor: t,
                                stopOpacity: "0.92"
                            })]
                        })
                    }), (0, a.jsxs)("g", {
                        transform: "translate(48 48)",
                        children: [
                            [0, 40, 80, 120, 160, 200, 240, 280, 320].map(e => (0, a.jsx)("path", {
                                d: "M0 -33 C9 -33 14 -27 14 -18 C14 -11 8 -6 0 -6 C-8 -6 -14 -11 -14 -18 C-14 -27 -9 -33 0 -33 Z",
                                fill: `url(#${o})`,
                                stroke: t,
                                strokeWidth: "0.7",
                                transform: `rotate(${e})`,
                                opacity: "0.96"
                            }, `o-${e}`)), [20, 60, 100, 140, 180, 220, 260, 300, 340].map(r => (0, a.jsx)("path", {
                                d: "M0 -23 C6.5 -23 11 -18 11 -11 C11 -6 6 -3 0 -3 C-6 -3 -11 -6 -11 -11 C-11 -18 -6.5 -23 0 -23 Z",
                                fill: e,
                                stroke: t,
                                strokeWidth: "0.6",
                                transform: `rotate(${r})`,
                                opacity: "0.97"
                            }, `m-${r}`)), [0, 72, 144, 216, 288].map(r => (0, a.jsx)("ellipse", {
                                cx: "0",
                                cy: "-10",
                                rx: "5.5",
                                ry: "8",
                                fill: e,
                                stroke: t,
                                strokeWidth: "0.5",
                                transform: `rotate(${r})`,
                                opacity: "0.92"
                            }, `i-${r}`)), (0, a.jsx)("circle", {
                                cx: "0",
                                cy: "0",
                                r: "6",
                                fill: r,
                                stroke: t,
                                strokeWidth: "0.7"
                            }), (0, a.jsx)("circle", {
                                cx: "-1.6",
                                cy: "-1.6",
                                r: "1.6",
                                fill: "#fff",
                                opacity: "0.75"
                            })
                        ]
                    })]
                })
            }

            function E({
                petalColor: e = "var(--gfd-bloom-2, #fff4fb)",
                petalEdge: t = "var(--gfd-bloom-2-edge, #e7c3dd)",
                centerColor: r = "var(--gfd-bloom-2-center, #f4c25a)",
                ...l
            }) {
                let o = U("gfd-daisy");
                return (0, a.jsxs)("svg", {
                    viewBox: "0 0 96 96",
                    fill: "none",
                    ...l,
                    children: [(0, a.jsx)("defs", {
                        children: (0, a.jsxs)("radialGradient", {
                            id: o,
                            cx: "50%",
                            cy: "28%",
                            r: "80%",
                            children: [(0, a.jsx)("stop", {
                                offset: "0%",
                                stopColor: "#fff"
                            }), (0, a.jsx)("stop", {
                                offset: "70%",
                                stopColor: e
                            }), (0, a.jsx)("stop", {
                                offset: "100%",
                                stopColor: t,
                                stopOpacity: "0.8"
                            })]
                        })
                    }), (0, a.jsxs)("g", {
                        transform: "translate(48 48)",
                        children: [
                            [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(e => (0, a.jsx)("path", {
                                d: "M0 -32 C4.5 -32 7 -26 6.5 -16 C5 -8 -5 -8 -6.5 -16 C-7 -26 -4.5 -32 0 -32 Z",
                                fill: `url(#${o})`,
                                stroke: t,
                                strokeWidth: "0.7",
                                transform: `rotate(${e})`
                            }, `p-${e}`)), (0, a.jsx)("circle", {
                                cx: "0",
                                cy: "0",
                                r: "9",
                                fill: r,
                                stroke: P,
                                strokeWidth: "0.8"
                            }), [0, 45, 90, 135, 180, 225, 270, 315].map(e => (0, a.jsx)("circle", {
                                cx: "0",
                                cy: "-4.5",
                                r: "1",
                                fill: P,
                                transform: `rotate(${e})`,
                                opacity: "0.7"
                            }, `d-${e}`)), (0, a.jsx)("circle", {
                                cx: "-2.5",
                                cy: "-2.5",
                                r: "1.6",
                                fill: "#fff6d8",
                                opacity: "0.8"
                            })
                        ]
                    })]
                })
            }

            function I({
                petalColor: e = "var(--gfd-bloom-3, #dcc9ff)",
                petalEdge: t = "var(--gfd-bloom-3-edge, #a98ee0)",
                stem: r = "var(--gfd-icon-stem, #7fbf8f)",
                ...l
            }) {
                let o = U("gfd-tulip");
                return (0, a.jsxs)("svg", {
                    viewBox: "0 0 96 96",
                    fill: "none",
                    ...l,
                    children: [(0, a.jsx)("defs", {
                        children: (0, a.jsxs)("linearGradient", {
                            id: o,
                            x1: "0.5",
                            y1: "0",
                            x2: "0.5",
                            y2: "1",
                            children: [(0, a.jsx)("stop", {
                                offset: "0%",
                                stopColor: "#fff",
                                stopOpacity: "0.7"
                            }), (0, a.jsx)("stop", {
                                offset: "45%",
                                stopColor: e
                            }), (0, a.jsx)("stop", {
                                offset: "100%",
                                stopColor: t
                            })]
                        })
                    }), (0, a.jsx)("path", {
                        d: "M48 92 C48 74 48 66 48 56",
                        stroke: r,
                        strokeWidth: "3",
                        strokeLinecap: "round",
                        fill: "none"
                    }), (0, a.jsx)("path", {
                        d: "M48 62 C40 58 30 60 26 70 C36 72 44 70 48 64 Z",
                        fill: r,
                        opacity: "0.85"
                    }), (0, a.jsx)("path", {
                        d: "M48 60 C58 58 68 60 72 70 C62 72 53 70 48 64 Z",
                        fill: r,
                        opacity: "0.7"
                    }), (0, a.jsxs)("g", {
                        children: [(0, a.jsx)("path", {
                            d: "M26 30 C26 20 34 14 34 14 C34 24 36 44 48 56 C34 54 26 44 26 30 Z",
                            fill: e,
                            stroke: t,
                            strokeWidth: "1"
                        }), (0, a.jsx)("path", {
                            d: "M70 30 C70 20 62 14 62 14 C62 24 60 44 48 56 C62 54 70 44 70 30 Z",
                            fill: e,
                            stroke: t,
                            strokeWidth: "1"
                        }), (0, a.jsx)("path", {
                            d: "M34 24 C34 14 48 10 48 10 C48 10 62 14 62 24 C62 40 54 52 48 56 C42 52 34 40 34 24 Z",
                            fill: `url(#${o})`,
                            stroke: t,
                            strokeWidth: "1.1"
                        }), (0, a.jsx)("path", {
                            d: "M48 14 C48 30 48 46 48 54",
                            stroke: t,
                            strokeWidth: "0.8",
                            opacity: "0.4",
                            fill: "none"
                        }), (0, a.jsx)("ellipse", {
                            cx: "42",
                            cy: "24",
                            rx: "2.4",
                            ry: "5",
                            fill: "#fff",
                            opacity: "0.5"
                        })]
                    })]
                })
            }

            function Q(e) {
                return (0, a.jsxs)("svg", {
                    viewBox: "0 0 220 236",
                    fill: "none",
                    ...e,
                    children: [(0, a.jsxs)("defs", {
                        children: [(0, a.jsxs)("radialGradient", {
                            id: "gfd-openenv-inner",
                            cx: "0.5",
                            cy: "0.15",
                            r: "0.9",
                            children: [(0, a.jsx)("stop", {
                                offset: "0%",
                                stopColor: "var(--gfd-env-inner-top, #fff8f4)"
                            }), (0, a.jsx)("stop", {
                                offset: "100%",
                                stopColor: "var(--gfd-env-inner-bottom, #ffeef1)"
                            })]
                        }), (0, a.jsxs)("linearGradient", {
                            id: "gfd-openenv-paper",
                            x1: "0",
                            y1: "0",
                            x2: "0",
                            y2: "1",
                            children: [(0, a.jsx)("stop", {
                                offset: "0%",
                                stopColor: "var(--gfd-env-paper-top, #fff6f2)"
                            }), (0, a.jsx)("stop", {
                                offset: "100%",
                                stopColor: "var(--gfd-env-paper-bottom, #ffe6ec)"
                            })]
                        })]
                    }), (0, a.jsx)("path", {
                        d: "M16 88 L110 18 L204 88 Z",
                        fill: "url(#gfd-openenv-inner)",
                        stroke: L,
                        strokeWidth: "2",
                        strokeLinejoin: "round"
                    }), (0, a.jsx)("rect", {
                        x: "16",
                        y: "88",
                        width: "188",
                        height: "126",
                        rx: "14",
                        fill: "url(#gfd-openenv-paper)",
                        stroke: L,
                        strokeWidth: "2"
                    })]
                })
            }

            function G({
                sealLetter: e = "L",
                ...t
            }) {
                return (0, a.jsxs)("svg", {
                    viewBox: "0 0 220 236",
                    fill: "none",
                    ...t,
                    children: [(0, a.jsxs)("defs", {
                        children: [(0, a.jsxs)("linearGradient", {
                            id: "gfd-openenv-pocket",
                            x1: "0",
                            y1: "0",
                            x2: "0",
                            y2: "1",
                            children: [(0, a.jsx)("stop", {
                                offset: "0%",
                                stopColor: "var(--gfd-env-flap-top, #ffdfe8)"
                            }), (0, a.jsx)("stop", {
                                offset: "100%",
                                stopColor: "var(--gfd-env-flap-bottom, #f9c2d3)"
                            })]
                        }), (0, a.jsxs)("radialGradient", {
                            id: "gfd-openenv-seal",
                            cx: "0.35",
                            cy: "0.3",
                            r: "0.85",
                            children: [(0, a.jsx)("stop", {
                                offset: "0%",
                                stopColor: "var(--gfd-env-seal-top, #ff9db1)"
                            }), (0, a.jsx)("stop", {
                                offset: "65%",
                                stopColor: "var(--gfd-env-seal-mid, #f0708f)"
                            }), (0, a.jsx)("stop", {
                                offset: "100%",
                                stopColor: "var(--gfd-env-seal-deep, #d94f74)"
                            })]
                        })]
                    }), (0, a.jsx)("ellipse", {
                        cx: "110",
                        cy: "222",
                        rx: "86",
                        ry: "7",
                        fill: "var(--gfd-env-shadow, #d94f74)",
                        opacity: "0.12"
                    }), (0, a.jsx)("path", {
                        d: "M16 132 L110 202 L204 132 L204 200 A14 14 0 0 1 190 214 L30 214 A14 14 0 0 1 16 200 Z",
                        fill: "url(#gfd-openenv-pocket)",
                        stroke: L,
                        strokeWidth: "2",
                        strokeLinejoin: "round"
                    }), (0, a.jsx)("path", {
                        d: "M16 132 L110 202 L204 132",
                        stroke: "#ffffff",
                        strokeWidth: "1.2",
                        opacity: "0.55",
                        fill: "none"
                    }), (0, a.jsx)("path", {
                        d: "M110 196 C110 196 94 186 94 175 C94 169 98.5 165 103 165 C106.6 165 109.2 167.7 110 170.4 C110.8 167.7 113.4 165 117 165 C121.5 165 126 169 126 175 C126 186 110 196 110 196 Z",
                        fill: "url(#gfd-openenv-seal)",
                        stroke: "var(--gfd-env-seal-edge, #c23e63)",
                        strokeWidth: "1.4",
                        strokeLinejoin: "round"
                    }), (0, a.jsx)("text", {
                        x: "110",
                        y: "181",
                        textAnchor: "middle",
                        fontFamily: "serif",
                        fontWeight: "700",
                        fontSize: "12",
                        fill: "var(--gfd-env-seal-text, #ffffff)",
                        opacity: "0.95",
                        children: e
                    })]
                })
            }

            function F({
                size: e = 18
            }) {
                return (0, a.jsx)("svg", {
                    width: e,
                    height: e,
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    children: (0, a.jsx)("path", {
                        d: "M7 5.5v13c0 .8.9 1.3 1.6.9l11-6.5c.6-.4.6-1.3 0-1.7l-11-6.5C7.9 4.2 7 4.7 7 5.5Z"
                    })
                })
            }

            function O({
                size: e = 18
            }) {
                return (0, a.jsxs)("svg", {
                    width: e,
                    height: e,
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    children: [(0, a.jsx)("rect", {
                        x: "6",
                        y: "5",
                        width: "4.2",
                        height: "14",
                        rx: "1.4"
                    }), (0, a.jsx)("rect", {
                        x: "13.8",
                        y: "5",
                        width: "4.2",
                        height: "14",
                        rx: "1.4"
                    })]
                })
            }
            let z = [{
                    top: "6%",
                    left: "12%",
                    size: 20,
                    delay: 0
                }, {
                    top: "14%",
                    right: "10%",
                    size: 15,
                    delay: .5
                }, {
                    top: "58%",
                    left: "4%",
                    size: 13,
                    delay: 1.1
                }, {
                    top: "66%",
                    right: "6%",
                    size: 18,
                    delay: .3
                }, {
                    top: "40%",
                    left: "0%",
                    size: 12,
                    delay: .8
                }],
                W = [{
                    rot: -122,
                    dist: 210,
                    delay: 0,
                    kind: "ranunculus"
                }, {
                    rot: -64,
                    dist: 236,
                    delay: .06,
                    kind: "tulip"
                }, {
                    rot: -18,
                    dist: 196,
                    delay: .11,
                    kind: "daisy"
                }, {
                    rot: 30,
                    dist: 244,
                    delay: .05,
                    kind: "ranunculus"
                }, {
                    rot: 82,
                    dist: 214,
                    delay: 0,
                    kind: "daisy"
                }, {
                    rot: 138,
                    dist: 226,
                    delay: .1,
                    kind: "tulip"
                }];

            function Z({
                kind: e,
                size: t
            }) {
                return "ranunculus" === e ? (0, a.jsx)(B, {
                    width: t,
                    height: t
                }) : "daisy" === e ? (0, a.jsx)(E, {
                    width: t,
                    height: t
                }) : (0, a.jsx)(I, {
                    width: t,
                    height: t
                })
            }

            function A({
                onOpened: e
            }) {
                let t = v(),
                    [r, o] = (0, l.useState)("arriving");
                (0, l.useEffect)(() => {
                    if ("arriving" !== r) return;
                    let e = window.setTimeout(() => o("letter"), 1500);
                    return () => window.clearTimeout(e)
                }, [r]);
                let i = () => {
                        "letter" === r && (o("leaving"), window.setTimeout(e, 1700))
                    },
                    s = "leaving" === r,
                    n = (t.intro.subtitle ?? "").split("\n").filter(e => e.trim().length > 0);
                return (0, a.jsxs)("section", {
                    className: "gfd-stage gfd-stage--intro relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8",
                    onClick: i,
                    role: "button",
                    tabIndex: 0,
                    "aria-label": `Open the letter for ${t.intro.name}`,
                    onKeyDown: e => {
                        ("Enter" === e.key || " " === e.key) && (e.preventDefault(), i())
                    },
                    children: [(0, a.jsx)(k, {
                        seed: 13,
                        count: 7
                    }), z.map((e, t) => (0, a.jsx)("span", {
                        className: "gfd-spark",
                        style: {
                            top: e.top,
                            left: e.left,
                            right: e.right,
                            animationDelay: `${e.delay}s`
                        },
                        children: (0, a.jsx)(S, {
                            width: e.size,
                            height: e.size,
                            color: "var(--gfd-spark-color, #c9a8f2)"
                        })
                    }, t)), (0, a.jsx)(x.N, {
                        children: s && (0, a.jsx)("div", {
                            className: "gfd-intro-burst",
                            "aria-hidden": "true",
                            children: W.map((e, t) => {
                                let r = Math.cos(e.rot * Math.PI / 180) * e.dist,
                                    l = Math.sin(e.rot * Math.PI / 180) * e.dist;
                                return (0, a.jsx)(m.P.div, {
                                    initial: {
                                        opacity: 0,
                                        x: 0,
                                        y: 0,
                                        scale: .4,
                                        rotate: 0
                                    },
                                    animate: {
                                        opacity: [0, 1, 1, 0],
                                        x: [0, .5 * r, r],
                                        y: [0, .4 * l, l],
                                        scale: [.4, 1.1, 1],
                                        rotate: e.rot + 200
                                    },
                                    transition: {
                                        duration: 1.6,
                                        delay: e.delay,
                                        ease: [.22, 1, .36, 1]
                                    },
                                    className: "gfd-intro-bloom",
                                    children: (0, a.jsx)(Z, {
                                        kind: e.kind,
                                        size: 58
                                    })
                                }, t)
                            })
                        })
                    }), (0, a.jsxs)("div", {
                        className: "relative z-10 w-full max-w-xl text-center",
                        children: [t.intro.forLabel ? (0, a.jsxs)(m.P.div, {
                            initial: {
                                opacity: 0,
                                y: -12,
                                rotate: -5
                            },
                            animate: s ? {
                                opacity: 0,
                                y: -18
                            } : {
                                opacity: 1,
                                y: 0,
                                rotate: -2
                            },
                            transition: {
                                delay: .15 * !s,
                                duration: .5
                            },
                            className: "gfd-intro-tag",
                            children: [(0, a.jsx)("span", {
                                className: "gfd-intro-tag-tape",
                                "aria-hidden": "true"
                            }), (0, a.jsxs)("span", {
                                className: "gfd-intro-tag-text",
                                children: [(0, a.jsx)(M, {
                                    width: 12,
                                    height: 12
                                }), t.intro.forLabel]
                            })]
                        }) : null, (0, a.jsxs)(m.P.div, {
                            className: "gfd-intro-scene",
                            initial: {
                                opacity: 0,
                                y: -34,
                                scale: .92
                            },
                            animate: s ? {
                                opacity: 0,
                                scale: 1.04,
                                y: -18
                            } : {
                                opacity: 1,
                                y: 0,
                                scale: 1
                            },
                            transition: s ? {
                                duration: 1.15,
                                delay: .35,
                                ease: "easeIn"
                            } : {
                                duration: .8,
                                ease: [.22, 1, .36, 1]
                            },
                            children: [(0, a.jsx)("span", {
                                className: "gfd-aura",
                                "aria-hidden": "true"
                            }), (0, a.jsxs)(m.P.div, {
                                className: "gfd-intro-float",
                                animate: s ? {
                                    y: 0
                                } : {
                                    y: [0, -9, 0]
                                },
                                transition: s ? {
                                    duration: .3
                                } : {
                                    duration: 4.2,
                                    repeat: 1 / 0,
                                    ease: "easeInOut"
                                },
                                children: [(0, a.jsx)(Q, {
                                    className: "gfd-env-layer gfd-env-back"
                                }), (0, a.jsxs)(m.P.div, {
                                    className: "gfd-note-card",
                                    initial: {
                                        y: 46,
                                        opacity: 0,
                                        rotate: -1.5
                                    },
                                    animate: s ? {
                                        y: 34,
                                        opacity: .9,
                                        rotate: 0
                                    } : {
                                        y: 0,
                                        opacity: 1,
                                        rotate: -1.2
                                    },
                                    transition: {
                                        delay: .35 * !s,
                                        duration: s ?.55 : 1,
                                        ease: [.22, 1, .36, 1]
                                    },
                                    children: [(0, a.jsx)("span", {
                                        className: "gfd-note-heart gfd-note-heart--l",
                                        "aria-hidden": "true"
                                    }), (0, a.jsx)("span", {
                                        className: "gfd-note-heart gfd-note-heart--r",
                                        "aria-hidden": "true"
                                    }), (0, a.jsx)("p", {
                                        className: "gfd-note-greeting",
                                        children: t.intro.title
                                    }), n.map((e, t) => (0, a.jsx)("p", {
                                        className: "gfd-note-line",
                                        children: e
                                    }, `gfd-intro-line-${t}`)), t.intro.noteLine ? (0, a.jsx)("p", {
                                        className: "gfd-note-foot",
                                        children: t.intro.noteLine
                                    }) : null]
                                }), (0, a.jsx)(G, {
                                    className: "gfd-env-layer gfd-env-front",
                                    sealLetter: t.intro.sealLetter
                                }), t.intro.mascotUrl ? (0, a.jsx)(m.P.span, {
                                    className: "gfd-intro-mascot",
                                    initial: {
                                        opacity: 0,
                                        scale: .6,
                                        y: 12
                                    },
                                    animate: s ? {
                                        opacity: 0,
                                        scale: .8,
                                        y: -10
                                    } : {
                                        opacity: 1,
                                        scale: 1,
                                        y: 0
                                    },
                                    transition: {
                                        delay: .9 * !s,
                                        type: "spring",
                                        stiffness: 220,
                                        damping: 16
                                    },
                                    children: (0, a.jsx)("span", {
                                        className: "gfd-intro-gif-frame",
                                        children: (0, a.jsx)("img", {
                                            src: t.intro.mascotUrl,
                                            alt: "",
                                            className: "gfd-intro-gif"
                                        })
                                    })
                                }) : null]
                            })]
                        }), t.intro.hint ? (0, a.jsx)(m.P.p, {
                            className: "gfd-intro-hint",
                            animate: "letter" === r ? {
                                opacity: [.5, 1, .5]
                            } : {
                                opacity: 0
                            },
                            transition: "letter" === r ? {
                                duration: 2.2,
                                repeat: 1 / 0,
                                ease: "easeInOut",
                                delay: .4
                            } : {
                                duration: .3
                            },
                            children: t.intro.hint
                        }) : null]
                    })]
                })
            }

            function q(e) {
                if (!Number.isFinite(e)) return "0:00";
                let t = Math.floor(e / 60),
                    r = Math.floor(e % 60);
                return `${t}:${r.toString().padStart(2,"0")}`
            }

            function H() {
                let e = v(),
                    {
                        isPlaying: t,
                        progress: r,
                        current: o,
                        duration: i,
                        toggle: s
                    } = function() {
                        let e = (0, l.useContext)(j);
                        if (!e) throw Error("useMusicPlayer must be used within MusicProvider");
                        return e
                    }();
                return e.song.url ? (0, a.jsxs)(m.P.div, {
                    initial: {
                        opacity: 0,
                        y: 14
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        duration: .6,
                        delay: 1.05
                    },
                    className: "gfd-player mx-auto mt-4 flex w-full max-w-md items-center gap-4",
                    children: [(0, a.jsx)("div", {
                        className: "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl border border-[color:var(--gfd-blush)] shadow-[0_4px_12px_rgba(217,79,116,0.18)] sm:h-[72px] sm:w-[72px]",
                        children: (0, a.jsx)(m.P.img, {
                            src: e.song.coverUrl,
                            alt: "",
                            className: "h-full w-full object-cover",
                            animate: t ? {
                                scale: 1.06
                            } : {
                                scale: 1
                            },
                            transition: {
                                duration: .5
                            }
                        })
                    }), (0, a.jsxs)("div", {
                        className: "flex min-w-0 flex-1 flex-col",
                        children: [(0, a.jsxs)("div", {
                            className: "flex items-center justify-between gap-2",
                            children: [(0, a.jsxs)("div", {
                                className: "min-w-0 text-left",
                                children: [(0, a.jsx)("p", {
                                    className: "font-gfd-serif truncate text-[15px] leading-tight text-[color:var(--gfd-ink)] sm:text-base",
                                    children: e.song.title
                                }), e.song.artist && (0, a.jsx)("p", {
                                    className: "font-gfd-display truncate text-[10px] uppercase tracking-[0.22em] text-[color:var(--gfd-rose-deep)]",
                                    children: e.song.artist
                                })]
                            }), (0, a.jsx)("button", {
                                type: "button",
                                onClick: s,
                                "aria-label": t ? "Pause song" : "Play song",
                                className: "gfd-play-btn flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-white",
                                children: t ? (0, a.jsx)(O, {
                                    size: 16
                                }) : (0, a.jsx)(F, {
                                    size: 16
                                })
                            })]
                        }), (0, a.jsx)("div", {
                            className: "mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--gfd-blush)]",
                            children: (0, a.jsx)(m.P.div, {
                                className: "h-full rounded-full",
                                style: {
                                    background: "linear-gradient(90deg, var(--gfd-rose), var(--gfd-lav-deep))"
                                },
                                animate: {
                                    width: `${r}%`
                                },
                                transition: {
                                    duration: .2
                                }
                            })
                        }), (0, a.jsxs)("div", {
                            className: "mt-1 flex justify-between font-gfd-display text-[10px] uppercase tracking-[0.18em] text-[color:var(--gfd-ink-soft)]",
                            children: [(0, a.jsx)("span", {
                                children: q(o)
                            }), (0, a.jsx)("span", {
                                children: i ? q(i) : "—:—"
                            })]
                        })]
                    })]
                }) : null
            }
            let R = [-4, 2.5, -1.5];

            function D({
                onNext: e
            }) {
                let t = v(),
                    [r, o] = (0, l.useState)(!1),
                    i = t.hero.stripPhotos.slice(0, 3);
                return (0, l.useEffect)(() => {
                    let e = setTimeout(() => o(!0), 1300);
                    return () => clearTimeout(e)
                }, []), (0, a.jsxs)("div", {
                    className: "gfd-stage relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-5",
                    children: [(0, a.jsx)(k, {
                        seed: 31,
                        count: 6
                    }), (0, a.jsx)("div", {
                        className: "relative z-10 w-full max-w-2xl",
                        children: (0, a.jsxs)("div", {
                            className: "gfd-card relative mx-auto rounded-[28px] px-5 py-7 text-center sm:rounded-[34px] sm:px-9 sm:py-8",
                            children: [(0, a.jsx)(B, {
                                className: "pointer-events-none absolute -top-8 -left-7 h-20 w-20"
                            }), (0, a.jsx)(E, {
                                className: "pointer-events-none absolute -top-6 -right-6 h-16 w-16"
                            }), (0, a.jsxs)(m.P.div, {
                                initial: {
                                    opacity: 0,
                                    y: -8
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: .5
                                },
                                className: "gfd-chip mb-4 inline-flex items-center gap-2",
                                children: [(0, a.jsx)(M, {
                                    width: 12,
                                    height: 12
                                }), (0, a.jsx)("span", {
                                    className: "font-gfd-display gfd-eyebrow",
                                    children: t.hero.eyebrow
                                })]
                            }), t.hero.portraitUrl && (0, a.jsx)(m.P.div, {
                                initial: {
                                    opacity: 0,
                                    scale: .7
                                },
                                animate: {
                                    opacity: 1,
                                    scale: 1
                                },
                                transition: {
                                    duration: .7,
                                    delay: .2,
                                    type: "spring",
                                    bounce: .3
                                },
                                className: "mx-auto mb-4 inline-flex",
                                children: (0, a.jsx)("div", {
                                    className: "gfd-portrait-frame",
                                    children: (0, a.jsx)("img", {
                                        src: t.hero.portraitUrl,
                                        alt: "",
                                        className: "gfd-portrait-img"
                                    })
                                })
                            }), (0, a.jsx)(m.P.h1, {
                                initial: {
                                    opacity: 0,
                                    y: 10
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: .6,
                                    delay: .4
                                },
                                className: "font-gfd-serif text-[1.8rem] leading-[1.12] text-[color:var(--gfd-ink)] sm:text-4xl",
                                children: t.hero.headline
                            }), t.hero.forLabel && (0, a.jsx)(m.P.p, {
                                initial: {
                                    opacity: 0,
                                    y: 10
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: .6,
                                    delay: .6
                                },
                                className: "font-gfd-script mt-2 text-2xl text-[color:var(--gfd-rose-deep)] sm:text-3xl",
                                children: t.hero.forLabel
                            }), (0, a.jsx)(m.P.p, {
                                initial: {
                                    opacity: 0,
                                    y: 10
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: .6,
                                    delay: .75
                                },
                                className: "font-gfd-body mx-auto mt-3 max-w-md text-sm leading-relaxed text-[color:var(--gfd-ink-soft)] sm:text-[15px]",
                                children: t.hero.message
                            }), (0, a.jsx)(H, {}), i.length > 0 && (0, a.jsx)(m.P.div, {
                                initial: {
                                    opacity: 0,
                                    y: 14
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: .6,
                                    delay: 1.2
                                },
                                className: "gfd-letter-photos mt-5",
                                children: i.map((e, t) => (0, a.jsx)(m.P.span, {
                                    className: "gfd-letter-photo",
                                    style: {
                                        rotate: `${R[t%R.length]}deg`
                                    },
                                    whileHover: {
                                        rotate: 0,
                                        scale: 1.05
                                    },
                                    transition: {
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 18
                                    },
                                    children: (0, a.jsx)("img", {
                                        src: e.url,
                                        alt: e.caption || `Us ${t+1}`,
                                        loading: "lazy",
                                        decoding: "async"
                                    })
                                }, t))
                            }), (0, a.jsx)(m.P.button, {
                                type: "button",
                                onClick: e,
                                initial: {
                                    opacity: 0,
                                    y: 14
                                },
                                animate: r ? {
                                    opacity: 1,
                                    y: 0
                                } : {
                                    opacity: 0,
                                    y: 14
                                },
                                transition: {
                                    duration: .5
                                },
                                style: {
                                    pointerEvents: r ? "auto" : "none"
                                },
                                "aria-hidden": !r,
                                className: "gfd-btn mt-6",
                                children: t.hero.button
                            })]
                        })
                    })]
                })
            }
            let _ = [-1.6, 1.6, -1, 1.2];

            function J({
                onNext: e
            }) {
                let t = v(),
                    r = t.gallery.photos,
                    [o, i] = (0, l.useState)(0),
                    [s, n] = (0, l.useState)(1);
                if (0 === r.length) return (0, a.jsx)("div", {
                    className: "gfd-stage relative flex min-h-screen items-center justify-center px-4 py-10",
                    children: (0, a.jsx)("button", {
                        type: "button",
                        onClick: e,
                        className: "gfd-btn",
                        children: t.gallery.button
                    })
                });
                let d = r[o],
                    c = _[o % _.length],
                    f = (e, t) => {
                        n(t), i((e + r.length) % r.length)
                    };
                return (0, a.jsxs)("div", {
                    className: "gfd-stage relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-8 sm:px-5",
                    children: [(0, a.jsx)(k, {
                        seed: 47,
                        count: 6
                    }), (0, a.jsxs)("div", {
                        className: "relative z-10 w-full max-w-3xl text-center",
                        children: [(0, a.jsxs)(m.P.div, {
                            initial: {
                                opacity: 0,
                                y: -8
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: .5
                            },
                            className: "gfd-chip mb-3 inline-flex items-center gap-2",
                            children: [(0, a.jsx)(M, {
                                width: 12,
                                height: 12
                            }), (0, a.jsx)("span", {
                                className: "font-gfd-display gfd-eyebrow",
                                children: t.gallery.eyebrow
                            })]
                        }), (0, a.jsx)(m.P.h2, {
                            initial: {
                                opacity: 0,
                                y: 10
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: .6,
                                delay: .15
                            },
                            className: "font-gfd-serif text-3xl leading-tight text-[color:var(--gfd-ink)] sm:text-4xl",
                            children: t.gallery.title
                        }), t.gallery.subtitle && (0, a.jsx)(m.P.p, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            transition: {
                                duration: .6,
                                delay: .3
                            },
                            className: "font-gfd-body mx-auto mt-2 max-w-md text-sm text-[color:var(--gfd-ink-soft)]",
                            children: t.gallery.subtitle
                        }), (0, a.jsx)("div", {
                            className: "gfd-gallery-stage mt-11 sm:mt-14",
                            children: (0, a.jsxs)("div", {
                                className: "gfd-deck relative",
                                children: [(0, a.jsx)("span", {
                                    className: "gfd-deck-back gfd-deck-back--2",
                                    "aria-hidden": "true"
                                }), (0, a.jsx)("span", {
                                    className: "gfd-deck-back gfd-deck-back--1",
                                    "aria-hidden": "true"
                                }), (0, a.jsx)(B, {
                                    className: "pointer-events-none absolute -top-9 -left-8 z-30 h-12 w-12 sm:h-14 sm:w-14"
                                }), (0, a.jsx)(I, {
                                    className: "pointer-events-none absolute -bottom-9 -right-7 z-30 h-12 w-12 sm:h-16 sm:w-16"
                                }), r.length > 1 && (0, a.jsxs)(a.Fragment, {
                                    children: [(0, a.jsx)("button", {
                                        type: "button",
                                        onClick: () => f(o - 1, -1),
                                        "aria-label": "Previous photo",
                                        className: "gfd-gallery-arrow gfd-gallery-arrow--prev",
                                        children: "←"
                                    }), (0, a.jsx)("button", {
                                        type: "button",
                                        onClick: () => f(o + 1, 1),
                                        "aria-label": "Next photo",
                                        className: "gfd-gallery-arrow gfd-gallery-arrow--next",
                                        children: "→"
                                    })]
                                }), (0, a.jsx)(x.N, {
                                    mode: "wait",
                                    initial: !1,
                                    custom: s,
                                    children: (0, a.jsx)(m.P.div, {
                                        custom: s,
                                        initial: {
                                            opacity: 0,
                                            x: 60 * s,
                                            rotate: c - 5,
                                            scale: .92
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0,
                                            rotate: c,
                                            scale: 1
                                        },
                                        exit: {
                                            opacity: 0,
                                            x: -60 * s,
                                            rotate: c + 5,
                                            scale: .92
                                        },
                                        transition: {
                                            duration: .42,
                                            ease: [.22, 1, .36, 1]
                                        },
                                        className: "relative z-10 mx-auto w-full",
                                        children: (0, a.jsxs)("div", {
                                            className: "gfd-polaroid gfd-deck-front rounded-[20px] p-3 pb-4 sm:p-3.5 sm:pb-5",
                                            children: [(0, a.jsx)("span", {
                                                className: "gfd-washi",
                                                "aria-hidden": "true"
                                            }), (0, a.jsxs)("div", {
                                                className: "relative overflow-hidden rounded-[15px] bg-[color:var(--gfd-blush)]",
                                                children: [(0, a.jsx)("img", {
                                                    src: d.url,
                                                    alt: d.caption || `Memory ${o+1}`,
                                                    className: "aspect-square h-full w-full object-cover"
                                                }), (0, a.jsx)("span", {
                                                    className: "gfd-photo-sheen",
                                                    "aria-hidden": "true"
                                                })]
                                            }), (0, a.jsxs)("div", {
                                                className: "mt-3 px-1 text-center",
                                                children: [(0, a.jsxs)("p", {
                                                    className: "font-gfd-display text-[10px] uppercase tracking-[0.28em] text-[color:var(--gfd-rose-deep)]",
                                                    children: [String(o + 1).padStart(2, "0"), " / ", String(r.length).padStart(2, "0")]
                                                }), d.caption && (0, a.jsx)("p", {
                                                    className: "font-gfd-script gfd-script-readable mt-1.5 line-clamp-2 text-[1.35rem] leading-snug sm:text-[1.6rem]",
                                                    children: d.caption
                                                })]
                                            })]
                                        })
                                    }, o)
                                })]
                            })
                        }), r.length > 1 && (0, a.jsx)("div", {
                            className: "gfd-filmstrip mt-7",
                            children: r.map((e, t) => (0, a.jsx)("button", {
                                type: "button",
                                onClick: () => f(t, t > o ? 1 : -1),
                                "aria-label": `Go to photo ${t+1}`,
                                "aria-current": t === o,
                                className: `gfd-film-cell ${t===o?"is-active":""}`,
                                children: (0, a.jsx)("img", {
                                    src: e.url,
                                    alt: "",
                                    loading: "lazy",
                                    decoding: "async"
                                })
                            }, t))
                        }), (0, a.jsx)("div", {
                            className: "mt-7",
                            children: (0, a.jsx)("button", {
                                type: "button",
                                onClick: e,
                                className: "gfd-btn",
                                children: t.gallery.button
                            })
                        })]
                    })]
                })
            }
            let V = [{
                Comp: B,
                props: {}
            }, {
                Comp: function({
                    petalColor: e = "var(--gfd-bloom-4, #ffd3e0)",
                    petalEdge: t = "var(--gfd-bloom-4-edge, #f79bb4)",
                    centerColor: r = "var(--gfd-bloom-4-center, #ffe9a3)",
                    ...l
                }) {
                    let o = U("gfd-sakura");
                    return (0, a.jsxs)("svg", {
                        viewBox: "0 0 96 96",
                        fill: "none",
                        ...l,
                        children: [(0, a.jsx)("defs", {
                            children: (0, a.jsxs)("radialGradient", {
                                id: o,
                                cx: "50%",
                                cy: "80%",
                                r: "90%",
                                children: [(0, a.jsx)("stop", {
                                    offset: "0%",
                                    stopColor: "#fff",
                                    stopOpacity: "0.9"
                                }), (0, a.jsx)("stop", {
                                    offset: "60%",
                                    stopColor: e
                                }), (0, a.jsx)("stop", {
                                    offset: "100%",
                                    stopColor: t
                                })]
                            })
                        }), (0, a.jsxs)("g", {
                            transform: "translate(48 48)",
                            children: [
                                [0, 72, 144, 216, 288].map(e => (0, a.jsx)("path", {
                                    d: "M0 -9 C-9 -9 -14 -19 -10 -28 C-7 -33 -2 -34 0 -29 C2 -34 7 -33 10 -28 C14 -19 9 -9 0 -9 Z",
                                    fill: `url(#${o})`,
                                    stroke: t,
                                    strokeWidth: "0.8",
                                    transform: `rotate(${e})`
                                }, e)), (0, a.jsx)("circle", {
                                    cx: "0",
                                    cy: "0",
                                    r: "4.5",
                                    fill: r,
                                    stroke: "#e6b34d",
                                    strokeWidth: "0.7"
                                }), [0, 60, 120, 180, 240, 300].map(e => (0, a.jsxs)("g", {
                                    transform: `rotate(${e})`,
                                    children: [(0, a.jsx)("line", {
                                        x1: "0",
                                        y1: "0",
                                        x2: "0",
                                        y2: "-8",
                                        stroke: "#e6b34d",
                                        strokeWidth: "0.8"
                                    }), (0, a.jsx)("circle", {
                                        cx: "0",
                                        cy: "-8.5",
                                        r: "1.3",
                                        fill: "#f0c65e"
                                    })]
                                }, `s-${e}`))
                            ]
                        })]
                    })
                },
                props: {}
            }, {
                Comp: I,
                props: {}
            }, {
                Comp: function({
                    petalColor: e = "var(--gfd-bloom-5, #d8ccff)",
                    petalEdge: t = "var(--gfd-bloom-5-edge, #a98ee0)",
                    centerColor: r = T,
                    ...l
                }) {
                    let o = U("gfd-anemone");
                    return (0, a.jsxs)("svg", {
                        viewBox: "0 0 96 96",
                        fill: "none",
                        ...l,
                        children: [(0, a.jsx)("defs", {
                            children: (0, a.jsxs)("radialGradient", {
                                id: o,
                                cx: "50%",
                                cy: "30%",
                                r: "80%",
                                children: [(0, a.jsx)("stop", {
                                    offset: "0%",
                                    stopColor: "#fff",
                                    stopOpacity: "0.85"
                                }), (0, a.jsx)("stop", {
                                    offset: "55%",
                                    stopColor: e
                                }), (0, a.jsx)("stop", {
                                    offset: "100%",
                                    stopColor: t,
                                    stopOpacity: "0.9"
                                })]
                            })
                        }), (0, a.jsxs)("g", {
                            transform: "translate(48 48)",
                            children: [
                                [0, 45, 90, 135, 180, 225, 270, 315].map(e => (0, a.jsx)("path", {
                                    d: "M0 -32 C8 -32 13 -25 13 -16 C13 -8 7 -4 0 -4 C-7 -4 -13 -8 -13 -16 C-13 -25 -8 -32 0 -32 Z",
                                    fill: `url(#${o})`,
                                    stroke: t,
                                    strokeWidth: "0.8",
                                    transform: `rotate(${e})`
                                }, e)), (0, a.jsx)("circle", {
                                    cx: "0",
                                    cy: "0",
                                    r: "8",
                                    fill: r
                                }), [0, 40, 80, 120, 160, 200, 240, 280, 320].map(e => (0, a.jsx)("circle", {
                                    cx: "0",
                                    cy: "-5",
                                    r: "1",
                                    fill: "var(--gfd-bloom-5-ring, #c9b8ef)",
                                    transform: `rotate(${e})`
                                }, `d-${e}`)), (0, a.jsx)("circle", {
                                    cx: "0",
                                    cy: "0",
                                    r: "2.2",
                                    fill: T
                                })
                            ]
                        })]
                    })
                },
                props: {}
            }, {
                Comp: function({
                    petalColor: e = "var(--gfd-bloom-6, #ffcdb2)",
                    petalEdge: t = "var(--gfd-bloom-6-edge, #f0a07a)",
                    centerColor: r = "var(--gfd-bloom-6-center, #fff0d8)",
                    ...l
                }) {
                    let o = U("gfd-camellia");
                    return (0, a.jsxs)("svg", {
                        viewBox: "0 0 96 96",
                        fill: "none",
                        ...l,
                        children: [(0, a.jsx)("defs", {
                            children: (0, a.jsxs)("radialGradient", {
                                id: o,
                                cx: "50%",
                                cy: "35%",
                                r: "80%",
                                children: [(0, a.jsx)("stop", {
                                    offset: "0%",
                                    stopColor: "#fff",
                                    stopOpacity: "0.85"
                                }), (0, a.jsx)("stop", {
                                    offset: "55%",
                                    stopColor: e
                                }), (0, a.jsx)("stop", {
                                    offset: "100%",
                                    stopColor: t,
                                    stopOpacity: "0.92"
                                })]
                            })
                        }), (0, a.jsxs)("g", {
                            transform: "translate(48 48)",
                            children: [
                                [0, 51, 102, 153, 204, 255, 306].map(e => (0, a.jsx)("path", {
                                    d: "M0 -32 C11 -32 17 -24 15 -12 C11 -4 -11 -4 -15 -12 C-17 -24 -11 -32 0 -32 Z",
                                    fill: `url(#${o})`,
                                    stroke: t,
                                    strokeWidth: "0.8",
                                    transform: `rotate(${e})`
                                }, `o-${e}`)), [25, 76, 127, 178, 229, 280, 331].map(r => (0, a.jsx)("path", {
                                    d: "M0 -20 C7 -20 11 -14 10 -6 C7 -1 -7 -1 -10 -6 C-11 -14 -7 -20 0 -20 Z",
                                    fill: e,
                                    stroke: t,
                                    strokeWidth: "0.6",
                                    transform: `rotate(${r})`,
                                    opacity: "0.96"
                                }, `m-${r}`)), (0, a.jsx)("circle", {
                                    cx: "0",
                                    cy: "0",
                                    r: "6.5",
                                    fill: r,
                                    stroke: t,
                                    strokeWidth: "0.7"
                                }), [0, 72, 144, 216, 288].map(e => (0, a.jsx)("circle", {
                                    cx: "0",
                                    cy: "-3",
                                    r: "1",
                                    fill: C,
                                    transform: `rotate(${e})`
                                }, `p-${e}`))
                            ]
                        })]
                    })
                },
                props: {}
            }, {
                Comp: E,
                props: {}
            }];

            function K({
                onNext: e
            }) {
                let t = v(),
                    r = t.garden.notes;
                return (0, a.jsxs)("div", {
                    className: "gfd-stage relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-8 sm:px-5",
                    children: [(0, a.jsx)(k, {
                        seed: 67,
                        count: 5
                    }), (0, a.jsxs)("div", {
                        className: "relative z-10 w-full max-w-3xl text-center",
                        children: [(0, a.jsxs)(m.P.div, {
                            initial: {
                                opacity: 0,
                                y: -8
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: .5
                            },
                            className: "gfd-chip mb-3 inline-flex items-center gap-2",
                            children: [(0, a.jsx)(M, {
                                width: 12,
                                height: 12
                            }), (0, a.jsx)("span", {
                                className: "font-gfd-display gfd-eyebrow",
                                children: t.garden.eyebrow
                            })]
                        }), (0, a.jsx)(m.P.h2, {
                            initial: {
                                opacity: 0,
                                y: 10
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: .6,
                                delay: .12
                            },
                            className: "font-gfd-serif mx-auto max-w-xl text-2xl leading-[1.15] text-[color:var(--gfd-ink)] sm:text-[2rem]",
                            children: t.garden.title
                        }), t.garden.subtitle && (0, a.jsx)(m.P.p, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            transition: {
                                duration: .6,
                                delay: .25
                            },
                            className: "font-gfd-script mt-1 text-2xl text-[color:var(--gfd-rose-deep)] sm:text-3xl",
                            children: t.garden.subtitle
                        }), (0, a.jsxs)("div", {
                            className: "gfd-meadow mx-auto mt-6 max-w-2xl sm:mt-7",
                            children: [(0, a.jsx)("div", {
                                className: "relative z-[1] grid grid-cols-2 gap-3 pb-10 sm:grid-cols-3 sm:gap-4 sm:pb-12",
                                children: V.map(({
                                    Comp: e,
                                    props: t
                                }, l) => {
                                    let o = r[l];
                                    return (0, a.jsxs)(m.P.div, {
                                        initial: {
                                            opacity: 0,
                                            y: 18,
                                            scale: .9
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0,
                                            scale: 1
                                        },
                                        transition: {
                                            duration: .5,
                                            delay: .3 + .09 * l,
                                            type: "spring",
                                            bounce: .3
                                        },
                                        className: "gfd-flower-cell flex flex-col items-center px-3 py-4 sm:px-4 sm:py-5",
                                        children: [(0, a.jsx)("div", {
                                            className: "gfd-sway",
                                            children: (0, a.jsx)(e, {
                                                className: "h-16 w-16 sm:h-20 sm:w-20",
                                                ...t
                                            })
                                        }), o && (0, a.jsx)("p", {
                                            className: "gfd-note mt-2.5 text-[13px] sm:text-sm",
                                            children: o
                                        })]
                                    }, l)
                                })
                            }), (0, a.jsxs)("svg", {
                                className: "gfd-meadow-grass",
                                viewBox: "0 0 400 64",
                                preserveAspectRatio: "none",
                                "aria-hidden": "true",
                                children: [(0, a.jsx)("path", {
                                    d: "M0 64 L0 34 Q10 18 18 34 Q26 12 36 32 Q46 16 54 34 L60 24 L66 34 Q78 14 88 33 Q98 18 108 34 L114 22 L120 34 Q132 15 142 33 Q152 17 162 34 L168 23 L174 34 Q186 14 196 33 Q206 18 216 34 L222 22 L228 34 Q240 15 250 33 Q260 17 270 34 L276 23 L282 34 Q294 14 304 33 Q314 18 324 34 L330 24 L336 34 Q348 15 358 33 Q368 17 378 34 Q388 16 400 34 L400 64 Z",
                                    fill: "var(--gfd-grass-back, #c6b0ef)",
                                    opacity: "0.55"
                                }), (0, a.jsx)("path", {
                                    d: "M0 64 L0 44 Q12 30 22 44 Q34 26 44 44 Q56 28 66 44 Q78 26 88 44 Q100 28 110 44 Q122 26 132 44 Q144 28 154 44 Q166 26 176 44 Q188 28 198 44 Q210 26 220 44 Q232 28 242 44 Q254 26 264 44 Q276 28 286 44 Q298 26 308 44 Q320 28 330 44 Q342 26 352 44 Q364 28 374 44 Q386 30 400 44 L400 64 Z",
                                    fill: "var(--gfd-grass-front, #a986e4)",
                                    opacity: "0.7"
                                })]
                            })]
                        }), (0, a.jsx)(m.P.div, {
                            initial: {
                                opacity: 0,
                                y: 12
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: .5,
                                delay: .3 + .09 * V.length + .1
                            },
                            className: "mt-7",
                            children: (0, a.jsx)("button", {
                                type: "button",
                                onClick: e,
                                className: "gfd-btn",
                                children: t.garden.button
                            })
                        })]
                    })]
                })
            }

            function Y({
                onRestart: e
            }) {
                let t = v(),
                    r = t.letter.body.split("\n\n").filter(Boolean),
                    o = t.letter.stripPhotos.slice(0, 3),
                    i = r.length > 1 ? Math.floor(r.length / 2) - 1 : 0,
                    s = [-4, 2.5, -1.5];
                return (0, l.useEffect)(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: "auto"
                    })
                }, []), (0, a.jsxs)("div", {
                    className: "gfd-stage relative flex min-h-screen flex-col items-center justify-start overflow-hidden px-4 py-6 sm:px-5 sm:py-8",
                    children: [(0, a.jsx)(k, {
                        seed: 83,
                        count: 5
                    }), (0, a.jsxs)(m.P.div, {
                        initial: {
                            opacity: 0,
                            y: 30
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: .7,
                            ease: [.22, 1, .36, 1]
                        },
                        className: "relative z-10 mt-4 w-full max-w-xl sm:mt-6",
                        children: [(0, a.jsxs)("div", {
                            className: "gfd-letter relative rounded-[24px] px-5 py-6 sm:rounded-[28px] sm:px-9 sm:py-8",
                            children: [(0, a.jsx)(B, {
                                className: "pointer-events-none absolute -top-6 -left-5 h-14 w-14 sm:-top-7 sm:-left-6 sm:h-16 sm:w-16"
                            }), (0, a.jsx)(E, {
                                className: "pointer-events-none absolute -top-5 -right-5 h-12 w-12 sm:-right-6 sm:h-14 sm:w-14"
                            }), (0, a.jsx)(I, {
                                className: "pointer-events-none absolute -bottom-6 -right-4 h-12 w-12 sm:-bottom-7 sm:-right-5 sm:h-14 sm:w-14"
                            }), (0, a.jsxs)("div", {
                                className: "mb-4 flex flex-col items-center text-center",
                                children: [t.letter.imageUrl && (0, a.jsx)("div", {
                                    className: "gfd-portrait-frame mb-3",
                                    children: (0, a.jsx)("img", {
                                        src: t.letter.imageUrl,
                                        alt: "",
                                        loading: "lazy",
                                        decoding: "async",
                                        className: "gfd-portrait-img"
                                    })
                                }), t.letter.eyebrow && (0, a.jsx)("p", {
                                    className: "font-gfd-display text-[10px] uppercase tracking-[0.28em] text-[color:var(--gfd-rose-deep)]",
                                    children: t.letter.eyebrow
                                }), (0, a.jsx)("h2", {
                                    className: "font-gfd-script gfd-script-readable mt-1 text-[2rem] leading-tight sm:text-[2.5rem]",
                                    children: t.letter.greeting
                                })]
                            }), (0, a.jsxs)("div", {
                                className: "mb-4 flex items-center gap-2",
                                children: [(0, a.jsx)("span", {
                                    className: "text-[color:var(--gfd-rose)]",
                                    children: "✿"
                                }), (0, a.jsx)("div", {
                                    className: "h-[1.5px] flex-1",
                                    style: {
                                        backgroundImage: "repeating-linear-gradient(90deg, var(--gfd-lav-deep) 0, var(--gfd-lav-deep) 4px, transparent 4px, transparent 8px)"
                                    }
                                }), (0, a.jsx)("span", {
                                    className: "text-[color:var(--gfd-rose)]",
                                    children: "✿"
                                })]
                            }), (0, a.jsx)("div", {
                                className: "space-y-3",
                                children: r.map((e, t) => (0, a.jsxs)(l.Fragment, {
                                    children: [(0, a.jsx)(m.P.p, {
                                        initial: {
                                            opacity: 0,
                                            y: 12
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            duration: .6,
                                            delay: .3 + .3 * t
                                        },
                                        className: "gfd-letter-text text-[15px] leading-[1.9] text-[color:var(--gfd-ink)] sm:text-base",
                                        children: e
                                    }), t === i && o.length > 0 && (0, a.jsx)(m.P.div, {
                                        initial: {
                                            opacity: 0,
                                            y: 14
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            duration: .6,
                                            delay: .4 + .3 * t
                                        },
                                        className: "gfd-letter-photos py-2",
                                        children: o.map((e, t) => (0, a.jsx)(m.P.span, {
                                            className: "gfd-letter-photo",
                                            style: {
                                                rotate: `${s[t%s.length]}deg`
                                            },
                                            whileHover: {
                                                rotate: 0,
                                                scale: 1.05
                                            },
                                            transition: {
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 18
                                            },
                                            children: (0, a.jsx)("img", {
                                                src: e.url,
                                                alt: e.caption || `Us ${t+1}`,
                                                loading: "lazy",
                                                decoding: "async"
                                            })
                                        }, t))
                                    })]
                                }, t))
                            }), (0, a.jsxs)(m.P.div, {
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                transition: {
                                    delay: .3 + .3 * r.length + .3
                                },
                                className: "mt-7",
                                children: [(0, a.jsxs)("div", {
                                    className: "mb-3 flex items-center gap-2",
                                    children: [(0, a.jsx)("span", {
                                        className: "gfd-heart",
                                        children: (0, a.jsx)(M, {
                                            width: 20,
                                            height: 20
                                        })
                                    }), (0, a.jsx)("div", {
                                        className: "h-[1.5px] flex-1",
                                        style: {
                                            backgroundImage: "repeating-linear-gradient(90deg, var(--gfd-lav-deep) 0, var(--gfd-lav-deep) 4px, transparent 4px, transparent 8px)"
                                        }
                                    })]
                                }), t.letter.closing && (0, a.jsx)("p", {
                                    className: "font-gfd-script gfd-script-readable text-[1.6rem] leading-tight sm:text-[2rem]",
                                    children: t.letter.closing
                                }), (0, a.jsxs)("p", {
                                    className: "font-gfd-display mt-3 text-sm uppercase tracking-[0.28em] text-[color:var(--gfd-rose-deep)]",
                                    children: ["— ", t.letter.signature]
                                })]
                            })]
                        }), (0, a.jsxs)("div", {
                            className: "mt-8 flex flex-col items-center gap-4",
                            children: [t.letter.fromName && (0, a.jsxs)("p", {
                                className: "font-gfd-display text-[11px] uppercase tracking-[0.28em] text-[color:var(--gfd-rose-deep)]/80",
                                children: [t.letter.fromPrefix, " \xb7 ", t.letter.fromName]
                            }), (0, a.jsx)("button", {
                                type: "button",
                                onClick: e,
                                className: "gfd-btn gfd-btn--ghost",
                                children: t.letter.restartButton
                            })]
                        })]
                    })]
                })
            }
            let X = {
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
                    duration: .5
                }
            };

            function ee() {
                let [e, t] = (0, l.useState)(0);
                return (0, a.jsx)("div", {
                    className: "min-h-screen",
                    children: (0, a.jsxs)(x.N, {
                        mode: "wait",
                        children: [0 === e && (0, a.jsx)(m.P.div, { ...X,
                            children: (0, a.jsx)(A, {
                                onOpened: () => t(1)
                            })
                        }, "intro"), 1 === e && (0, a.jsx)(m.P.div, { ...X,
                            children: (0, a.jsx)(D, {
                                onNext: () => t(2)
                            })
                        }, "greeting"), 2 === e && (0, a.jsx)(m.P.div, { ...X,
                            children: (0, a.jsx)(J, {
                                onNext: () => t(3)
                            })
                        }, "gallery"), 3 === e && (0, a.jsx)(m.P.div, { ...X,
                            children: (0, a.jsx)(K, {
                                onNext: () => t(4)
                            })
                        }, "garden"), 4 === e && (0, a.jsx)(m.P.div, { ...X,
                            children: (0, a.jsx)(Y, {
                                onRestart: () => t(0)
                            })
                        }, "letter")]
                    })
                })
            }

            function et({
                config: e
            }) {
                return (0, a.jsx)(b, {
                    config: e,
                    children: (0, a.jsx)(w, {
                        children: (0, a.jsx)(ee, {})
                    })
                })
            }

            function er({
                snapshot: e
            }) {
                let t = (0, l.useMemo)(() => h(function(e) {
                    let t = new Map;
                    for (let r of e)
                        for (let [e, a] of Object.entries(r.values)) "string" == typeof a && g.has(e) && t.set(e, a);
                    return { ...f,
                        ...Object.fromEntries(t)
                    }
                }(e.sections)), [e]);
                return (0, a.jsx)("div", {
                    className: "girlfriends-day-root",
                    "data-theme": t.theme,
                    children: (0, a.jsx)(et, {
                        config: t
                    })
                })
            }
        }
    }
]);