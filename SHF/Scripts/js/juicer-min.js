(function () {
    var c = function () {
        var e = [].slice.call(arguments);
        e.push(c.options);
        if (e[0].match(/^\s*#([\w:\-\.]+)\s*$/igm)) {
            e[0].replace(/^\s*#([\w:\-\.]+)\s*$/igm,
            function (h, i) {
                var f = document;
                var g = f && f.getElementById(i);
                e[0] = g ? (g.value || g.innerHTML) : h;
            });
        }
        if (arguments.length == 1) {
            return c.compile.apply(c, e);
        }
        if (arguments.length >= 2) {
            return c.to_html.apply(c, e);
        }
    };
    var d = {
        escapehash: {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2f;"
        },
        escapereplace: function (e) {
            return d.escapehash[e];
        },
        escaping: function (e) {
            return typeof (e) !== "string" ? e : e.replace(/[&<>"]/igm, this.escapereplace);
        },
        detection: function (e) {
            return typeof (e) === "undefined" ? "" : e;
        }
    };
    var b = function (e) {
        if (typeof (console) !== "undefined") {
            if (console.warn) {
                console.warn(e);
                return;
            }
            if (console.log) {
                console.log(e);
                return;
            }
        }
        throw (e);
    };
    var a = function (h, f) {
        h = h !== Object(h) ? {} : h;
        if (h.__proto__) {
            h.__proto__ = f;
            return h;
        }
        var g = function () { };
        var j = Object.create ? Object.create(f) : new (g.prototype = f, g);
        for (var e in h) {
            if (h.hasOwnProperty(e)) {
                j[e] = h[e];
            }
        }
        return j;
    };
    c.__cache = {};
    c.version = "0.6.5-stable";
    c.settings = {};
    c.tags = {
        operationOpen: "{@",
        operationClose: "}",
        interpolateOpen: "\\${",
        interpolateClose: "}",
        noneencodeOpen: "\\$\\${",
        noneencodeClose: "}",
        commentOpen: "\\{#",
        commentClose: "\\}"
    };
    c.options = {
        cache: true,
        strip: true,
        errorhandling: true,
        detection: true,
        _method: a({
            __escapehtml: d,
            __throw: b,
            __juicer: c
        },
        {})
    };
    c.tagInit = function () {
        var f = c.tags.operationOpen + "each\\s*([^}]*?)\\s*as\\s*(\\w*?)\\s*(,\\s*\\w*?)?" + c.tags.operationClose;
        var h = c.tags.operationOpen + "\\/each" + c.tags.operationClose;
        var i = c.tags.operationOpen + "if\\s*([^}]*?)" + c.tags.operationClose;
        var j = c.tags.operationOpen + "\\/if" + c.tags.operationClose;
        var n = c.tags.operationOpen + "else" + c.tags.operationClose;
        var o = c.tags.operationOpen + "else if\\s*([^}]*?)" + c.tags.operationClose;
        var k = c.tags.interpolateOpen + "([\\s\\S]+?)" + c.tags.interpolateClose;
        var l = c.tags.noneencodeOpen + "([\\s\\S]+?)" + c.tags.noneencodeClose;
        var m = c.tags.commentOpen + "[^}]*?" + c.tags.commentClose;
        var g = c.tags.operationOpen + "each\\s*(\\w*?)\\s*in\\s*range\\(([^}]+?)\\s*,\\s*([^}]+?)\\)" + c.tags.operationClose;
        var e = c.tags.operationOpen + "include\\s*([^}]*?)\\s*,\\s*([^}]*?)" + c.tags.operationClose;
        c.settings.forstart = new RegExp(f, "igm");
        c.settings.forend = new RegExp(h, "igm");
        c.settings.ifstart = new RegExp(i, "igm");
        c.settings.ifend = new RegExp(j, "igm");
        c.settings.elsestart = new RegExp(n, "igm");
        c.settings.elseifstart = new RegExp(o, "igm");
        c.settings.interpolate = new RegExp(k, "igm");
        c.settings.noneencode = new RegExp(l, "igm");
        c.settings.inlinecomment = new RegExp(m, "igm");
        c.settings.rangestart = new RegExp(g, "igm");
        c.settings.include = new RegExp(e, "igm");
    };
    c.tagInit();
    c.set = function (f, j) {
        var h = this;
        var e = function (i) {
            return i.replace(/[\$\(\)\[\]\+\^\{\}\?\*\|\.]/igm,
            function (l) {
                return "\\" + l;
            });
        };
        var k = function (l, m) {
            var i = l.match(/^tag::(.*)$/i);
            if (i) {
                h.tags[i[1]] = e(m);
                h.tagInit();
                return;
            }
            h.options[l] = m;
        };
        if (arguments.length === 2) {
            k(f, j);
            return;
        }
        if (f === Object(f)) {
            for (var g in f) {
                if (f.hasOwnProperty(g)) {
                    k(g, f[g]);
                }
            }
        }
    };
    c.register = function (g, f) {
        var e = this.options._method;
        if (e.hasOwnProperty(g)) {
            return false;
        }
        return e[g] = f;
    };
    c.unregister = function (f) {
        var e = this.options._method;
        if (e.hasOwnProperty(f)) {
            return delete e[f];
        }
    };
    c.template = function (e) {
        var f = this;
        this.options = e;
        this.__interpolate = function (g, l, i) {
            var h = g.split("|"),
            k = h[0] || "",
            j;
            if (h.length > 1) {
                g = h.shift();
                j = h.shift().split(",");
                k = "_method." + j.shift() + ".call({}, " + [g].concat(j) + ")";
            }
            return "<%= " + (l ? "_method.__escapehtml.escaping" : "") + "(" + (!i || i.detection !== false ? "_method.__escapehtml.detection" : "") + "(" + k + ")) %>";
        };
        this.__removeShell = function (h, g) {
            var i = 0;
            h = h.replace(c.settings.forstart,
            function (n, k, m, l) {
                var m = m || "value",
                l = l && l.substr(1);
                var j = "i" + i++;
                return "<% ~function() {for(var " + j + " in " + k + ") {if(" + k + ".hasOwnProperty(" + j + ")) {var " + m + "=" + k + "[" + j + "];" + (l ? ("var " + l + "=" + j + ";") : "") + " %>";
            }).replace(c.settings.forend, "<% }}}(); %>").replace(c.settings.ifstart,
            function (j, k) {
                return "<% if(" + k + ") { %>";
            }).replace(c.settings.ifend, "<% } %>").replace(c.settings.elsestart,
            function (j) {
                return "<% } else { %>";
            }).replace(c.settings.elseifstart,
            function (j, k) {
                return "<% } else if(" + k + ") { %>";
            }).replace(c.settings.noneencode,
            function (k, j) {
                return f.__interpolate(j, false, g);
            }).replace(c.settings.interpolate,
            function (k, j) {
                return f.__interpolate(j, true, g);
            }).replace(c.settings.inlinecomment, "").replace(c.settings.rangestart,
            function (m, l, n, k) {
                var j = "j" + i++;
                return "<% ~function() {for(var " + j + "=" + n + ";" + j + "<" + k + ";" + j + "++) {{var " + l + "=" + j + "; %>";
            }).replace(c.settings.include,
            function (l, j, k) {
                return "<%= _method.__juicer(" + j + ", " + k + "); %>";
            });
            if (!g || g.errorhandling !== false) {
                h = "<% try { %>" + h;
                h += '<% } catch(e) {_method.__throw("Juicer Render Exception: "+e.message);} %>';
            }
            return h;
        };
        this.__toNative = function (h, g) {
            return this.__convert(h, !g || g.strip);
        };
        this.__lexicalAnalyze = function (k) {
            var j = [];
            var o = [];
            var n = "";
            var g = ["if", "each", "_", "_method", "console", "break", "case", "catch", "continue", "debugger", "default", "delete", "do", "finally", "for", "function", "in", "instanceof", "new", "return", "switch", "this", "throw", "try", "typeof", "var", "void", "while", "with", "null", "typeof", "class", "enum", "export", "extends", "import", "super", "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield", "const", "arguments", "true", "false", "undefined", "NaN"];
            var m = function (r, q) {
                if (Array.prototype.indexOf && r.indexOf === Array.prototype.indexOf) {
                    return r.indexOf(q);
                }
                for (var p = 0; p < r.length; p++) {
                    if (r[p] === q) {
                        return p;
                    }
                }
                return -1;
            };
            var h = function (p, i) {
                i = i.match(/\w+/igm)[0];
                if (m(j, i) === -1 && m(g, i) === -1 && m(o, i) === -1) {
                    if (typeof (window) !== "undefined" && typeof (window[i]) === "function" && window[i].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i)) {
                        return p;
                    }
                    if (typeof (global) !== "undefined" && typeof (global[i]) === "function" && global[i].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i)) {
                        return p;
                    }
                    if (typeof (c.options._method[i]) === "function" || c.options._method.hasOwnProperty(i)) {
                        o.push(i);
                        return p;
                    }
                    j.push(i);
                }
                return p;
            };
            k.replace(c.settings.forstart, h).replace(c.settings.interpolate, h).replace(c.settings.ifstart, h).replace(c.settings.elseifstart, h).replace(c.settings.include, h).replace(/[\+\-\*\/%!\?\|\^&~<>=,\(\)\[\]]\s*([A-Za-z_]+)/igm, h);
            for (var l = 0; l < j.length; l++) {
                n += "var " + j[l] + "=_." + j[l] + ";";
            }
            for (var l = 0; l < o.length; l++) {
                n += "var " + o[l] + "=_method." + o[l] + ";";
            }
            return "<% " + n + " %>";
        };
        this.__convert = function (h, i) {
            var g = [].join("");
            g += "'use strict';";
            g += "var _=_||{};";
            g += "var _out='';_out+='";
            if (i !== false) {
                g += h.replace(/\\/g, "\\\\").replace(/[\r\t\n]/g, " ").replace(/'(?=[^%]*%>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='") + "';return _out;";
                return g;
            }
            g += h.replace(/\\/g, "\\\\").replace(/[\r]/g, "\\r").replace(/[\t]/g, "\\t").replace(/[\n]/g, "\\n").replace(/'(?=[^%]*%>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='") + "';return _out.replace(/[\\r\\n]\\s+[\\r\\n]/g, '\\r\\n');";
            return g;
        };
        this.parse = function (h, g) {
            var i = this;
            if (!g || g.loose !== false) {
                h = this.__lexicalAnalyze(h) + h;
            }
            h = this.__removeShell(h, g);
            h = this.__toNative(h, g);
            this._render = new Function("_, _method", h);
            this.render = function (k, j) {
                if (!j || j !== f.options._method) {
                    j = a(j, f.options._method);
                }
                return i._render.call(this, k, j);
            };
            return this;
        };
    };
    c.compile = function (g, f) {
        if (!f || f !== this.options) {
            f = a(f, this.options);
        }
        try {
            var h = this.__cache[g] ? this.__cache[g] : new this.template(this.options).parse(g, f);
            if (!f || f.cache !== false) {
                this.__cache[g] = h;
            }
            return h;
        } catch (i) {
            b("Juicer Compile Exception: " + i.message);
            return {
                render: function () { }
            };
        }
    };
    c.to_html = function (f, g, e) {
        if (!e || e !== this.options) {
            e = a(e, this.options);
        }
        return this.compile(f, e).render(g, e._method);
    };
    typeof (module) !== "undefined" && module.exports ? module.exports = c : this.juicer = c;
})();