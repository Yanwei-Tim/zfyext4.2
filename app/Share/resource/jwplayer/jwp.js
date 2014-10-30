window.CLOSURE_NO_DEPS = true;
(function () {
    var l = window.jwplayer.jwpsrv = window.jwplayer.jwpsrv || {};

    function n(a, b, c, e) {
        this.f = t;
        this.extend = window.jwplayer.utils.extend;
        this.H = "http" + ("https:" === document.location.protocol ? "s://ssl." : "://") + "p.jwpcdn.com/6/jwpsrv_frq.js";
        this.I = e;
        this.debug = b;
        this.P = c;
        this.C = 0;
        this.D = "p pt pd pm pi pf ps psf psl psd pk pkl pkd pkt pkc pkp b bp bpb bpr bl ble blb bat bal bdt bfb bfp bhp bsp bsv sth stn ste stu stf bar bas bcr bht bte bpy bph bpf brt bsk bwi a acv acg at ak am an av ad ap ab abp abm abo abl abn aci acw ach y ym yp g gi gt s sl sc sh r rf ro rc rh rd c cc cs cf co cb ct ce cw cd m mb ms mt l lf lh ll lm lp".split(" ");
        this.B =
            "dev.jwpltx.com";
        this.G = "n.jwpltx.com";
        this.F = "playerconfig/ping.gif?";
        this.d = window.jwplayer.utils.exists;
        this.e = a;
        this.u = new window.jwplayer.utils.scriptloader(this.H);
        this.u.load();
        l.setSampleFrequency = l.setSampleFrequency || function (a) {
            l.sampling_frequency = parseFloat(a)
        };
        l.parseConfig = l.parseConfig || this.w.bind(this)
    }

    n.prototype.w = function (a) {
        var b = {};
        this.f(this.D, function (a, c) {
            b[c] = 0
        });
        this.d(a.i) || (a = new u(a));
        a = a.i();
        x(this, b, a);
        y(this, a);
        z(this, b, a.playlist);
        this.d(a.listbar) && A(this, b, a.listbar);
        this.d(a.captions) && G(this, b, a.captions);
        this.d(a.rtmp) && H(this, b, a.rtmp);
        this.d(a.logo) && I(this, b, a.logo);
        this.d(a.related) && J(this, b, a.related);
        this.d(a.sharing) && K(this, b, a.sharing);
        var c;
        this.d(a.plugins) && this.f(a.plugins, function (a, b) {
            b.client && (b.client.match("vast") || b.client.match("googima")) && (c = b)
        });
        this.d(c) &&
        L(this, b, c);
        this.d(a.sitecatalyst) && O(this, b, a.sitecatalyst);
        this.d(a.ga) && P(this, b, a.ga);
        return b
    };
    n.prototype.o = function () {
        if (void 0 === l.sampling_frequency)this.u.addEventListener("COMPLETE", this.o); else {
            var a = l.sampling_frequency || this.C;
            if (!(Math.random() >= a)) {
                var b = this.w(this.e), a = Q(this, b, a);
                (new Image).src = a
            }
        }
    };
    function Q(a, b, c) {
        var e = [];
        e.push("n=" + Math.random().toFixed(16).substr(2, 16));
        e.push("aid=" + encodeURIComponent(a.P));
        e.push("ed=" + a.I);
        e.push("f=" + c);
        a.f(b, function (a, b) {
            e.push(a + "=" + encodeURIComponent(b))
        });
        e.push("pv=" + window.jwplayer.version);
        var d;
        if (window.top !== window.self) {
            d = document.referrer;
            try {
                d = d || window.top.location.href
            } catch (w) {
            }
        }
        d = d || window.location.href;
        a.f(b, function (a, b) {
            e.push(a + "=" + encodeURIComponent(b))
        });
        e.push("pu=" + encodeURIComponent(d));
        return["http" + ("https:" === document.location.protocol ?
            "s://s." : "://i."), a.debug ? a.B : a.G, "/", a.F, e.join("&")].join("")
    }

    function z(a, b, c) {
        "string" === typeof c ? b.pf++ : a.f(c, function (c, d) {
            b.p++;
            a.d(d.title) && b.pt++;
            a.d(d.description) && b.pd++;
            a.d(d.mediaid) && b.pm++;
            a.d(d.image) && b.pi++;
            a.d(d.sources) && ba(a, b, d.sources);
            a.d(d.tracks) && ca(a, b, d.tracks)
        })
    }

    function J(a, b, c) {
        b.r++;
        a.d(c.file) && b.rf++;
        a.d(c.onclick) && b.ro++;
        a.d(c.oncomplete) && b.rc++;
        a.d(c.heading) && b.rh++;
        a.d(c.dimensions) && b.rd++
    }

    function K(a, b, c) {
        b.s++;
        a.d(c.link) && b.sl++;
        a.d(c.code) && b.sc++
    }

    function A(a, b, c) {
        b.b++;
        a.d(c.position) && (b.bp++, "bottom" === c.position && b.bpb++, "right" === c.position && b.bpr++);
        a.d(c.layout) && (b.bl++, "extended" === c.layout && b.ble++, "basic" === c.position && b.blb++)
    }

    function ba(a, b, c) {
        a.f(c, function (c, d) {
            b.ps++;
            a.d(d.label) && b.psl++;
            a.d(d["default"]) && d["default"] && b.psd++
        })
    }

    function ca(a, b, c) {
        a.f(c, function (c, d) {
            b.pk++;
            a.d(d.label) && b.pkl++;
            a.d(d["default"]) && d["default"] && b.pkd++;
            a.d(d.kind) && ("captions" === d.kind && b.pkp++, "thumbnails" === d.kind && b.pkt++, "chapters" === d.kind && b.pkc++)
        })
    }

    function x(a, b, c) {
        a.d(c.abouttext) && b.bat++;
        a.d(c.aboutlink) && b.bal++;
        a.d(c.displaytitle) && c.displaytitle && b.bdt++;
        a.d(c.fallback) && c.fallback && b.bfb++;
        a.d(c.flashplayer) && b.bfp++;
        a.d(c.html5player) && b.bhp++;
        a.d(c.startparam) && b.bsp++;
        a.d(c.stagevideo) && !c.stagevideo && b.bsv++;
        a.d(c.stretching) && b.sth++;
        a.d(c.stretching) && "none" == c.stretching && b.stn++;
        a.d(c.stretching) && "exactfit" == c.stretching && b.ste++;
        a.d(c.stretching) && "uniform" == c.stretching && b.stu++;
        a.d(c.stretching) && "fill" == c.stretching && b.stf++;
        a.d(c.aspectratio) && b.bar++;
        a.d(c.autostart) && c.autostart && b.bas++;
        a.d(c.controls) && !c.controls && b.bcr++;
        a.d(c.height) && b.bht++;
        a.d(c.mute) && c.mute && b.bte++;
        a.d(c.primary) && b.bpy++;
        a.d(c.primary) && "html5" == c.primary && b.bph++;
        a.d(c.primary) && "flash" == c.primary && b.bpf++;
        a.d(c.repeat) && b.brt++;
        a.d(c.skin) && b.bsk++;
        a.d(c.width) && b.bwi++
    }

    function G(a, b, c) {
        b.c++;
        a.d(c.color) && b.cc++;
        a.d(c.fontSize) && b.cs++;
        a.d(c.fontFamily) && b.cf++;
        a.d(c.fontOpacity) && b.co++;
        a.d(c.backgroundColor) && b.cb++;
        a.d(c.backgroundOpacity) && b.ct++;
        a.d(c.edgeStyle) && b.ce++;
        a.d(c.windowColor) && b.cw++;
        a.d(c.windowOpacity) && b.cd++
    }

    function H(a, b, c) {
        b.m++;
        a.d(c.bufferlength) && b.mb++;
        a.d(c.subscribe) && b.mb++;
        a.d(c.securetoken) && b.mt++
    }

    function I(a, b, c) {
        b.l++;
        a.d(c.file) && b.lf++;
        a.d(c.hide) && b.lh++;
        a.d(c.link) && b.ll++;
        a.d(c.margin) && b.lm++;
        a.d(c.position) && b.lp++
    }

    function L(a, b, c) {
        b.a++;
        a.d(c.client) && c.client.match("vast") && b.acv++;
        a.d(c.client) && c.client.match("googima") && b.acg++;
        a.d(c.tag) && (b.at++, b.abp++);
        a.d(c.vastxml) && b.av++;
        a.d(c.skipoffset) && b.ak++;
        a.d(c.admessage) && b.am++;
        a.d(c.companiondiv) && "object" === typeof c.companiondiv && b.an++;
        a.d(c.schedule) && "string" === typeof c.schedule && b.ap++;
        a.d(c.schedule) && "object" === typeof c.schedule && da(a, b, c.schedule)
    }

    function da(a, b, c) {
        b.ad++;
        a.f(c, function (c, d) {
            switch (d.offset) {
                case "pre":
                    b.abp++;
                    break;
                case "post":
                    b.abo++;
                    break;
                default:
                    b.abm++
            }
            a.d(d.ad) ? R(a, b, d.ad) : R(a, b, d)
        })
    }

    function R(a, b, c) {
        a.d(c.type) && ("linear" === c.type && b.abl++, "nonlinear" === c.type && b.abn++);
        a.d(c.tag) && b.at++;
        a.d(c.vastxml) && b.av++
    }

    function O(a, b, c) {
        b.y++;
        a.d(c.mediaName) && b.ym++;
        a.d(c.playerName) && b.yp++
    }

    function P(a, b, c) {
        b.g++;
        a.d(c.idstring) && b.gi++;
        a.d(c.trackingobject) && b.gt++
    }

    function y(a, b) {
        var c = {description: "", J: "", K: "", title: "", O: [], Q: []};
        if (!b.playlist) {
            var e = {};
            a.f(c, function (c) {
                S(a, b, e, c)
            });
            e.sources || (b.levels ? (e.sources = b.levels, delete b.levels) : (c = {}, S(a, b, c, "file"), S(a, b, c, "type"), e.sources = c.file ? [c] : []));
            b.playlist = [T(a, e)]
        } else if ("string" !== typeof b.playlist)for (c = 0; c < b.playlist.length; c++)b.playlist[c] = T(a, b.playlist[c])
    }

    function T(a, b) {
        var c = a.extend({}, {description: "", J: "", K: "", title: "", O: [], Q: []}, b), e;
        c.tracks = b && a.d(b.tracks) ? b.tracks : [];
        0 === c.sources.length && (c.sources = [U(a, c)]);
        for (var d = 0; d < c.sources.length; d++)e = c.sources[d]["default"], c.sources[d]["default"] = e ? "true" == e.toString() : !1, c.sources[d] = U(a, c.sources[d]);
        if (c.captions && !a.d(b.tracks)) {
            for (e = 0; e < c.captions.length; e++)c.tracks.push(c.captions[e]);
            delete c.captions
        }
        for (d = 0; d < c.tracks.length; d++)c.tracks[d] = ea(a, c.tracks[d]);
        return c
    }

    function U(a, b) {
        var c = {file: null, label: null, type: null, "default": null}, e = a.extend({}, c);
        a.f(c, function (c) {
            a.d(b[c]) && (e[c] = b[c], delete b[c])
        });
        return e
    }

    function ea(a, b) {
        var c = {file: null, label: null, kind: "captions", "default": !1}, e = a.extend({}, c);
        a.f(c, function (c) {
            a.d(b[c]) && (e[c] = b[c], delete b[c])
        });
        return e
    }

    function S(a, b, c, e) {
        a.d(b[e]) && (c[e] = b[e], delete b[e])
    };
    function V(a, b, c) {
        this.key = a;
        this.value = b;
        this.A = c
    }

    V.prototype.getKey = function () {
        return this.key
    };
    function t(a, b) {
        var c, e;
        for (c in a)"function" == window.jwplayer.utils.typeOf(a.hasOwnProperty) ? a.hasOwnProperty(c) && (e = a[c], b(c, e)) : (e = a[c], b(c, e))
    };
    function fa(a) {
        if (window.jwplayer._tracker)return window.jwplayer._tracker;
        window.jwplayer._tracker = this;
        this.h = {};
        this.N = "n.jwpltx.com";
        this.M = "v1/jwplayer6/ping.gif?";
        this.L = window.jwplayer.version;
        if (this.q = window.top === window.self ? 0 : 1) {
            this.j = document.referrer;
            try {
                this.j = this.j || window.top.location.href, this.k = window.top.document.title
            } catch (b) {
            }
        }
        this.j = this.j || window.location.href;
        this.k = this.k || document.title;
        this.trackerVersion = 6;
        this.v = "complete" == document.readyState;
        this.n =
            [];
        (this.debug = a) && (this.eventObjs = [])
    }

    (function (a) {
        var b = window.onload;
        window.onload = "function" != typeof window.onload ? a : function () {
            b && b();
            a()
        }
    })(function () {
        var a = window.jwplayer._tracker;
        if (a) {
            for (; 0 < a.n.length;) {
                var b = a.n.shift();
                W(a, b)
            }
            a.v = !0
        }
    });
    function X(a, b, c, e) {
        a.h[b] || (a.h[b] = {});
        a.h[b][c] || (a.h[b][c] = {});
        var d = Y(a, b, c, e, !1);
        a.h[b][c][d] && (d += "&dup=1");
        a.debug && (e = Y(a, b, c, e, !0), e.url = d, e.fired = !1, a.eventObjs.push(e));
        a.v ? W(a, d) : a.n.push(d);
        a.h[b][c][d] = !0
    }

    function Y(a, b, c, e, d) {
        b = [new V("tv", a.trackerVersion, 0), new V("n", Math.random().toFixed(16).substr(2, 16), 2), new V("aid", b, 4), new V("e", c, 5), new V("i", a.q, 6), new V("pv", a.L, 7), new V("pu", a.j, 101), new V("pt", a.k, 103)].concat(e).sort(function (a, b) {
            return a.A > b.A ? 1 : -1
        });
        if (d) {
            a = {};
            for (d = 0; d < b.length; d++)a[b[d].getKey()] = b[d].value;
            return a
        }
        c = [];
        for (d = 0; d < b.length; d++)c.push(b[d].getKey() + "=" + encodeURIComponent(b[d].value));
        return["http" + ("https:" === document.location.protocol ? "s://s." : "://i."), a.N, "/",
            a.M, c.join("&")].join("")
    }

    function W(a, b) {
        (new Image).src = b;
        a.debug && t(a.eventObjs, function (a, e) {
            e.url == b && (e.fired = !0)
        })
    };
    function u(a) {
        this.e = a
    }

    function ga(a, b) {
        a.e.onReady(b)
    }

    function ha(a, b) {
        a.e.onComplete(b)
    }

    function ia(a, b) {
        a.e.onTime(b)
    }

    function Z(a) {
        return a.e.getPlaylistItem()
    }

    function $(a) {
        return a.e.getRenderingMode()
    }

    u.prototype.i = function () {
        return this.e.config
    };
    function ja(a, b, c) {
        function e() {
            k = {};
            B = !1;
            h = 0
        }

        function d(a) {
            return function (b) {
                if (!s) {
                    var c = k[a];
                    if ("meta" === a && (b = b.metadata || b, c && (b.width = b.width || c.width, b.height = b.height || c.height, b.duration = b.duration || c.duration), "html5" === $(f).toLowerCase() && (100 === b.duration || 0 === b.duration) && 0 === b.width && 0 === b.height))return;
                    k[a] = b;
                    "play" === a && (c || (p = 0), r = f.e.getPosition());
                    if (k.play && k.meta && k.levels && !B) {
                        var d = Z(f);
                        b = C(d);
                        c = d.title || "";
                        a:{
                            var e = k.levels;
                            if (e && e.t && e.t.length && (e = e.t[0]) && "auto" === ("" +
                                e.label).toLowerCase()) {
                                d = 5;
                                break a
                            }
                            if ((d = d.sources) && d.length && (d = d[0].type, "aac" == d || "mp3" == d || "vorbis" == d)) {
                                d = 6;
                                break a
                            }
                            d = k.meta || {};
                            e = d.width | 0;
                            d = 0 === e ? 0 < (d.height | 0) ? 0 : 6 : 320 >= e ? 1 : 640 >= e ? 2 : 1280 >= e ? 3 : 4
                        }
                        var e = w(), h;
                        h = e | 0;
                        X(D, q, "s", [g("ph", E, 1), g("pi", F, 8), g("a", f.i().autostart ? 1 : 0, 11), g("ed", m, 20), g("vs", d, 21), g("l", 0 >= h ? 0 : 15 > h ? 1 : 300 >= h ? 2 : 1200 >= h ? 3 : 4, 22), g("q", v(e), 23), g("mu", b, 100), g("t", c, 102)]);
                        B = !0
                    }
                }
            }
        }

        function w() {
            var a = f.e.getDuration();
            if (0 >= a) {
                var b = k.meta;
                b && (a = b.duration)
            }
            return a | 0
        }

        function v(a) {
            a |=
                0;
            return 0 >= a ? 0 : 30 > a ? 1 : 60 > a ? 4 : 180 > a ? 8 : 300 > a ? 16 : 32
        }

        function aa() {
            r = f.e.getPosition();
            h = 0
        }

        function C(a) {
            var b;
            if (b = a.sources) {
                a = [];
                for (var c = b.length; c--;)b[c].file && a.push(b[c].file);
                a.sort();
                b = a[0]
            } else b = a.file;
            var d;
            var e = b;
            if (e.match(/^[a-zA-Z]+:\/\//))d = e; else {
                d = d || document.location.href;
                b = d.substring(0, d.indexOf("://") + 3);
                a = d.substring(b.length, d.indexOf("/", b.length + 1));
                c = e.split("/");
                0 !== e.indexOf("/") && (d = d.split("?")[0], d = d.substring(b.length + a.length + 1, d.lastIndexOf("/")), c = d.split("/").concat(c));
                d = [];
                for (e = 0; e < c.length; e++)c[e] && "." != c[e] && (".." == c[e] ? d.pop() : d.push(c[e]));
                d = b + a + "/" + d.join("/")
            }
            return d
        }

        function ka() {
            var a = f.i(), b = f.e.getWidth(), d = /\d+%/.test(a.width || b);
            if (d && a.aspectratio)return 4;
            if (a.height) {
                var e = 0;
                a.listbar && "bottom" === a.listbar.position && (e = a.listbar.size);
                if (40 >= a.height - e)return 5
            }
            d && c && c.parentNode && (b = c.parentNode.offsetWidth);
            b |= 0;
            return 0 === b ? 0 : 320 >= b ? 1 : 640 >= b ? 2 : 3
        }

        function M(a, b, c) {
            var d = Z(f), e = C(d), d = d.title || "";
            b = b + 0.5 | 0;
            0 < b && X(D, q, "t", [g("ph", E, 1), g("pi",
                F, 8), g("ed", m, 20), g("ti", b, 21), g("pw", a | 0, 22), g("q", c, 23), g("mu", e, 100), g("t", d, 102)])
        }

        function la(a) {
            a.R ? s = !0 : s = !1
        }

        if (!1 !== b.enabled) {
            var g = function (a, b, c) {
                return new V(a, b, c)
            }, N = false || !0 === b.debug, f = new u(a), F = String(b.id || "").substring(0, 34), E = (a = window.jwplayer.defaults) && a.ph ? a.ph : 0, m = 0, q;
            window.jwplayer.key && (a = new window.jwplayer.utils.key(window.jwplayer.key), b = a.edition(), "invalid" != b && (q = a.token()), "enterprise" == b ? m = 6 : "invalid" == b ? m = 4 : "ads" == b ? m = 3 : "premium" == b ? m = 2 : "pro" == b && (m = 1));
            q || (q = "_");
            var ma = new n(f, N, q, m), D = new fa(N), k, B, h, p = 0, r = null, s = !1;
            ga(f, function () {
                var a = Z(f), b = C(a), a = a.title || "", c = ka();
                X(D, q, "e", [g("ph", E, 1), g("pi", F, 8), g("a", f.i().autostart ? 1 : 0, 11), g("ed", m, 20), g("ps", c, 21), g("mu", b, 100), g("t", a, 102)]);
                ma.o()
            });
            f.e.onPlay(d("play"));
            f.e.onMeta(d("meta"));
            f.e.onQualityLevels(d("levels"));
            if (f.e.onCast)f.e.onCast(la);
            ia(f, function (a) {
                if (!s) {
                    var b = a.position, c = a.duration;
                    if (b) {
                        if (1 < b) {
                            if (!k.meta) {
                                a = {duration: c};
                                if ("html5" === $(f).toLowerCase()) {
                                    var e = "html5" ===
                                        $(f).toLowerCase() ? f.e.getContainer().getElementsByTagName("video")[0] : null;
                                    e && (a.width = e.videoWidth, a.height = e.videoHeight)
                                }
                                d("meta")(a)
                            }
                            k.levels || d("levels")({})
                        }
                        a = v(c);
                        c = b / (c / a) + 1 | 0;
                        0 === h && (h = c);
                        null === r && (r = b);
                        e = b - r;
                        r = b;
                        e = Math.min(Math.max(0, e), 4);
                        p += e;
                        c === h + 1 && (b = 128 * h / a, h = 0, c > a || (M(b, p, a), p = 0))
                    }
                }
            });
            ha(f, function () {
                if (!s) {
                    var a = w();
                    0 >= a || (M(128, p, v(a)), p = 0)
                }
            });
            f.e.onSeek(aa);
            f.e.onIdle(e);
            f.e.onPlaylistItem(e);
            e()
        }
    }

    window.jwplayer && window.jwplayer() && window.jwplayer().registerPlugin("jwpsrv", "6.0", ja);
})();
