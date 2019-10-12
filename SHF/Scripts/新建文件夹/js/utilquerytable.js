jQuery.fn.mcQueryTable = function (config) {
    _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };
    var self = this;
    var $self = $(this);
    var ix = 0;
    var args = {};

    var htmlbuilder = [];
    htmlbuilder.push('<table cellpadding="0" cellspacing="0" border="0" class="tableStyle" width="100%">');
    htmlbuilder.push('<thead>');

    if (config.columns) {
        htmlbuilder.push('<tr class="header">');
        for (ix = 0; ix < config.columns.length; ix++) {
            if (ix == 0 && config.canselectall) {
                htmlbuilder.push('<td>');
                htmlbuilder.push('<input type="checkbox" value="all">');
                htmlbuilder.push('</td>');
            } else {
                htmlbuilder.push('<td>');
                htmlbuilder.push(config.columns[ix]);
                htmlbuilder.push('</td>');
            }
        }
        htmlbuilder.push('</tr>');
    } else {
        htmlbuilder.push(config.headrow);
    }

    htmlbuilder.push('</thead>');
    htmlbuilder.push('<tbody></tbody>');
    htmlbuilder.push('</table>');

    var $table = $(htmlbuilder.join(''));
    var $pager = $('<div class="turn" style="width: 100%;"></div>');
    $self.append($table);
    $self.append($pager);

    if (config.canselectall) {
        $table.find('thead :checkbox').bind('click', function () {
            var $me = $(this);
            if ($me.is(':checked')) {
                //$table.find('tbody :checkbox:checked').removeAttr('checked');

                $table.find('tbody :checkbox').prev("a").removeClass("jqTransformChecked");
                $table.find('tbody :checkbox').prop("checked", false);
            } else {
                //$table.find('tbody :checkbox').attr('checked', true);
                $table.find('tbody :checkbox').prev("a").addClass("jqTransformChecked");
                $table.find('tbody :checkbox').prop("checked", true);
            }
        });
    }

    if (!config.maprow) {
        config.maprow = function (t) { return t; };
    }

    var makehtml = function (itemlist) {
        if (config.template) {
            return _.map(itemlist, function (t) { return _.template(config.template, config.maprow(t)); }).join('');
        } else {
            return _.map(itemlist, function (t) { return config.makerow(config.maprow(t)); }).join('');
        }
    };

    var pageIndexChanged = function (newIndex) {
        args.index = newIndex;
        args.psize = config.pagesize;
        args.v = Date();
        if (config.action == 'post') {
            $.post(config.url, args).done(querysuccess).fail(queryfail);
        } else {
            $.get(config.url, args).done(querysuccess).fail(queryfail);
        }
    };

    var querysuccess = function (r) {
        if (r.state == '200') {
            if (r.data.ItemList.length > 0) {
                $table.find('tbody').html(makehtml(r.data.ItemList));
                $table.find('tbody tr:odd').addClass('odd');
            } else {
                var colspan = $table.find('thead td').size();
                var content = config.emptycontent || '暂无数据';
                $table.find('tbody').html('<tr><td class="mctdnodata" colspan="' + colspan + '">' + content + '</td></tr>');
            }
            $pager.smartpaginator({
                totalrecords: r.data.TotalCount,
                recordsperpage: config.pagesize,
                initval: args.index,
                isloadfirst: false,
                onchange: pageIndexChanged,
                onpagesizechange: function (psize) {
                    config.pagesize = psize;
                    pageIndexChanged(1);
                }
            });

            $self.trigger('querysuccess', r.data);
        } else {
            $self.trigger('queryfail', '查询出错');
        }
    };

    var queryfail = function (r) {
        $self.trigger('queryfail', '查询出错');
    };

    this.query = function (arg) {
        args = arg;
        args.index = 1;
        args.psize = config.pagesize;
        if (config.action == 'post') {
            $.post(config.url, args).done(querysuccess).fail(queryfail);
        } else {
            $.get(config.url, args).done(querysuccess).fail(queryfail);
        }
    };

    this.reload = function () {
        args.psize = config.pagesize;
        if (config.action == 'post') {
            $.post(config.url, args).done(querysuccess).fail(queryfail);
        } else {
            args.v = Date();
            $.get(config.url, args).done(querysuccess).fail(queryfail);
        }
    };

    return self;
};

jQuery.fn.mctbquery = function (config) {

    var _cfg = $.extend({}, config);
    var _self = this;
    var _$self = $(this);
    var _curIndex = 1;
    var _psize = 10;
    var _orderby = '';
    var _order = '';
    var _args = $.extend({}, config.args);

    _$self.html(juicer(_cfg.template, {}));

    _$self.on('click', '.mcorder', function (e) {
        $me = $(e.target);
        _self.find('.mcorder').each(function () {
            if (this != e.target) { $(this).removeClass('descending').removeClass('ascending'); }
        });
        _orderby = $me.attr('data-orderby');
        if ($me.hasClass('descending')) {
            $me.removeClass('descending').addClass('ascending');
            _order = 'asc';
        } else if ($me.hasClass('ascending')) {
            $me.removeClass('ascending').addClass('descending');
            _order = 'desc';
        } else {
            $me.addClass('ascending');
            _order = 'asc';
        }
        innerquery();
    });


    function innerquery() {
        if (_args) {
            var args = $.extend({}, { index: _curIndex, psize: _psize, orderby: _orderby, order: _order, v: Date() }, _args);
            $.getJSON(_cfg.url, args)
            .done(function (r) {
                if (r.state == '200') {
                    _$self.find('tbody').html(juicer(_cfg.itemtemplate, r.data));
                    _cfg.pager.smartpaginator({
                        totalrecords: r.data.TotalCount,
                        recordsperpage: _psize,
                        initval: _curIndex,
                        isloadfirst: false,
                        onchange: function (inx) {
                            _curIndex = inx;
                            innerquery();
                        },
                        onpagesizechange: function (psize) {
                            _curIndex = 1;
                            _psize = psize;
                            innerquery();
                        }
                    });

                    _$self.trigger('querysuccess', r.data);
                    if (_cfg.success) { _cfg.success(r.data); }
                } else {
                    _$self.trigger('queryfail', r.message);
                    if (_cfg.fail) { _cfg.fail(r.message); }
                }
            })
            .fail(function () {
                _$self.trigger('queryfail', '查询失败');
                if (_cfg.fail) { _cfg.fail('查询失败'); }
            });
        }
    };

    self.query = function (args) {
        _args = $.extend({}, args);
        innerquery();
    };

    self.reload = function () {
        innerquery();
    };

    return self;
};


(function ($) {
    jQuery.fn.CommonTable = function (options) {
        var _$self = $(this),
            _url = options.url,//请求地址
            _template = juicer(options.template),//模板
            _itemTemplate = juicer(options.itemTemplate),//子项模板
            _curIndex = 1,//当前页
            _psize = 10,//每页记录数字
            _processResult = options.processResult,//查询结果预处理
            _args = {};//最近一次的查询参数
        var _orderby = '';
        var _order = '';

        this.$self = _$self;

        _$self.html(_template.render({}));

        var _$pager = _$self.find('.pager');//分页组件
        var _$selectAllChk = _$self.find('thead :checkbox');//全选全不选复选框
        var _$tbody = _$self.find('tbody');

        _$self.find('thead').jqTransform({ imgPath: 'images/jqtransformplugin/' });
        $.each(_$self.find('.mcorder'), function () { $(this).append('<i class="listRank"></i>'); });

        function innerQuery(index, args) {
            window.mc.loadingdialog.show();
            args['v'] = new Date().getTime();
            unselectedAll();
            var defaultArgs = {
                index: index,
                psize: _psize,
                orderby: _orderby,
                order: _order,
                v: new Date().getTime()
            };
            var tmpargs = $.extend(defaultArgs, args);
            tmpargs.index = index;
            tmpargs.psize = _psize;

            _$self.trigger('querycommand', tmpargs);

            $.getJSON(_url, tmpargs).done(function (r) {
                window.mc.loadingdialog.close();
                if (r.state == '200') {
                    if (_processResult) {
                        _processResult(r.data);
                        //window.mc.loadingdialog.close();
                    }
                    if (r.data.ItemList.length == 0 && index > 1) {
                        innerQuery(parseInt(index) - 1, args);
                        return;
                    }
                    _$tbody.html(_itemTemplate.render(r.data));
                    _$tbody.removeClass("jqtransformdone");
                    _$tbody.jqTransform({ imgPath: 'images/jqtransformplugin/' });

                    _$tbody.find("input[type='checkbox']").on("change", $.proxy(unselectone, this));

                    $(document).trigger('mcdocumentresize');
                    _$pager.smartpaginator({
                        totalrecords: r.data.TotalCount,
                        recordsperpage: tmpargs.psize,
                        length: 6,
                        initval: index,
                        isloadfirst: false,
                        onchange: function (inx) {
                            _curIndex = inx;
                            innerQuery(inx, args);
                        },
                        onpagesizechange: function (psize) {
                            _curIndex = 1;
                            _psize = psize;
                            innerQuery(1, args);
                        }
                    });
                    if (window.finishedwork != undefined) {
                        window.finishedwork = true;
                    }
                } else {
                    window.mc.loadingdialog.close();
                    mc.alert('查询失败!');

                }
            }).fail(function () {
                window.mc.loadingdialog.close();
                mc.alert('查询失败!');
            });
        }

        function unselectedAll() {
            //_$selectAllChk.removeAttr('checked').trigger('change');
            _$selectAllChk.prev("a").removeClass("jqTransformChecked");
            _$selectAllChk.prop("checked", false);
        }

        function selectedAllChanged(ev) {
            //if (ev.isTrigger) { return; }
            //var $target = $(ev.target);
            //if ($target.is(':checked')) {
            //    _$tbody.find(':checkbox').each(function () {
            //        $(this).attr('checked', true).trigger('change');
            //    });
            //} else {
            //    _$tbody.find(':checkbox').each(function () {
            //        $(this).removeAttr('checked').trigger('change');
            //    });
            //}
            var $target = $(ev.target);
            if ($target.is(':checked') || $target.prev("a").hasClass("jqTransformChecked")) {
                _$tbody.find(":checkbox").prev("a").addClass("jqTransformChecked");
                _$tbody.find(":checkbox").prop("checked", true);
            } else {
                _$tbody.find(":checkbox").prev("a").removeClass("jqTransformChecked");
                _$tbody.find(":checkbox").prop("checked", false);
            }
        }

        function unselectone(ev) {
            var $target = $(ev.target);
            if ($target.is(':checked')) {
                if (_$tbody.find(":checkbox").length == _$tbody.find(":checked").length) {
                    _$selectAllChk.prev("a").addClass("jqTransformChecked");
                    _$selectAllChk.prop("checked", true);
                }
            }
            else {
                _$selectAllChk.prev("a").removeClass("jqTransformChecked");
                _$selectAllChk.prop("checked", false);
            }
            var codeList = [];
            _$self.find('tbody :checked').each(function () {
                codeList.push($(this).val());
            });

            console.log(codeList);
        }

        function orderChanged(ev) {
            var $me = $(ev.target);
            var $link = $me.find('.listRank');
            _$self.find('.listRank').each(function () {
                if (this != $link[0]) {
                    $(this).removeClass('descending').removeClass('ascending');
                }
            });
            _orderby = $me.attr('data-orderby');
            if ($link.hasClass('descending')) {
                $link.removeClass('descending').addClass('ascending');
                _order = 'asc';
            } else if ($link.hasClass('ascending')) {
                $link.removeClass('ascending').addClass('descending');
                _order = 'desc';
            } else {
                $link.addClass('ascending');
                _order = 'asc';
            }

            _$self.order = _order;
            _$self.orderby = _orderby;
            innerQuery(_curIndex, _args);
        };

        _$selectAllChk.on('change', $.proxy(selectedAllChanged, this));

        _$self.on('click', '.mcorder', $.proxy(orderChanged, this));

        this.query = function (args, outindex, outpsize) {
            _args = args;
            if (outindex) {
                _curIndex = outindex;
            } else {
                _curIndex = 1;
            }
            if (outpsize) {
                _psize = Math.max(outpsize, 10);
            }
            _args['v'] = new Date().getTime();
            innerQuery(_curIndex, _args);
        };

        this.reload = function () {
            innerQuery(_curIndex, _args);
        };

        this.getSelectedList = function () {
            var codeList = [];
            _$self.find('tbody :checked').each(function () {
                codeList.push($(this).val());
            });
            return codeList;
        };
        this.getSelectedSqidList = function () {
            var codeList = [];
            _$self.find('tbody :checked').each(function () {
                codeList.push($(this).data("sqid"));
            });
            return codeList;
        };
        return this;
    };

    jQuery.fn.SimpleTable = function (options) {
        var _$self = $(this),
            _url = options.url,//请求地址
            _template = juicer(options.template),//模板
            _itemTemplate = juicer(options.itemTemplate),//子项模板
            _curIndex = 1,//当前页
            _psize = options.pszie || 10,//每页记录数字
            _processResult = options.processResult,//查询结果预处理
            _args = options.args || {};//最近一次的查询参数

        var _orderby = '';
        var _order = '';

        _$self.html(_template.render({}));

        var _$pager = _$self.find('.pager');//分页组件
        var _$selectAllChk = _$self.find('thead :checkbox');//全选全不选复选框
        var _$tbody = _$self.find('tbody');

        _$self.find('thead').jqTransform({ imgPath: 'images/jqtransformplugin/' });
        $.each(_$self.find('.mcorder'), function () { $(this).append('<i class="listRank"></i>'); });

        function innerQuery(index, args) {
            args['v'] = new Date().getTime();
            unselectedAll();
            var defaultArgs = {
                index: index,
                psize: _psize,
                orderby: _orderby,
                order: _order,
                v: new Date().getTime()
            };
            var tmpargs = $.extend(defaultArgs, args);

            $.getJSON(_url, tmpargs).done(function (r) {
                if (r.state == '200') {
                    if (_processResult) {
                        _processResult(r.data);
                    }
                    _$tbody.html(_itemTemplate.render(r.data));
                    _$tbody.removeClass("jqtransformdone");
                    _$tbody.jqTransform({ imgPath: 'images/jqtransformplugin/' });

                    _$pager.smartpaginator({
                        totalrecords: r.data.TotalCount,
                        recordsperpage: _psize,
                        length: 3,
                        initval: index,
                        isloadfirst: false,
                        onchange: function (inx) {
                            _curIndex = inx;
                            innerQuery(inx, args);
                        }
                    });
                } else {
                    mc.alert('查询失败!');
                }
            }).fail(function () {
                mc.alert('查询失败!');
            });
        }

        function unselectedAll() {
            //_$selectAllChk.removeAttr('checked').trigger('change');
            _$selectAllChk.prev("a").removeClass("jqTransformChecked");
            _$selectAllChk.prop("checked", false);
        }

        function selectedAllChanged(ev) {
            //var $target = $(ev.target);
            //if ($target.is(':checked')) {
            //    _$tbody.find(':checkbox').each(function () {
            //        $(this).attr('checked', true).trigger('change');
            //    });
            //} else {
            //    _$tbody.find(':checkbox').each(function () {
            //        $(this).removeAttr('checked').trigger('change');
            //    });
            //}

            var $target = $(ev.target);
            if ($target.is(':checked') || $target.prev("a").hasClass("jqTransformChecked")) {
                _$tbody.find(":checkbox").prev("a").addClass("jqTransformChecked");
                _$tbody.find(":checkbox").prop("checked", true);
            } else {
                _$tbody.find(":checkbox").prev("a").removeClass("jqTransformChecked");
                _$tbody.find(":checkbox").prop("checked", false);
            }
        }

        function orderChanged(ev) {
            var $me = $(ev.target);
            var $link = $me.find('.listRank');
            _$self.find('.listRank').each(function () {
                if (this != $link[0]) {
                    $(this).removeClass('descending').removeClass('ascending');
                }
            });
            _orderby = $me.attr('data-orderby');
            if ($link.hasClass('descending')) {
                $link.removeClass('descending').addClass('ascending');
                _order = 'asc';
            } else if ($link.hasClass('ascending')) {
                $link.removeClass('ascending').addClass('descending');
                _order = 'desc';
            } else {
                $link.addClass('ascending');
                _order = 'asc';
            }
            innerQuery(_curIndex, _args);
        };

        _$selectAllChk.on('change', $.proxy(selectedAllChanged, this));

        _$self.on('click', '.listRank', $.proxy(orderChanged, this));

        this.query = function (args) {
            _args = args;
            _curIndex = 1;
            innerQuery(_curIndex, _args);
        };

        this.reload = function () {
            innerQuery(_curIndex, _args);
        };

        this.getSelectedList = function () {
            var codeList = [];
            _$self.find('tbody :checked').each(function () {
                codeList.push($(this).val());
            });
            return codeList;
        };

        return this;
    };
})(jQuery);

(function ($) {
    window.mc = window.mc || {};
    window.mc.parseAttrOpt = function (str) {
        return $.parseJSON(str.replace(/([a-zA-Z0-9]+)/g, '"$1"'));
    };

    jQuery.fn.bindClickEvent = function (app) {
        $(this).on('click', '[data-action-click]', function () {
            var $target = $(this);
            var clickAction = $target.data('action-click');
            if (app[clickAction] && $.isFunction(app[clickAction])) {
                return app[clickAction].apply(app, arguments);
            }
        });
    };
})(jQuery);

var share = {
    /**
     * @param   {String}   key name
     * @param   {Any}       value
     */
    data: function (name, value) {

        var top = window.top,
            cache = top['_CACHE'] || {};

        top['_CACHE'] = cache;

        return value !== undefined ? cache[name] = value : cache[name];
    },

    /**
     * @param   {String}   remove data
     */
    removeData: function (name) {

        var cache = window.top['_CACHE'];

        if (cache && cache[name]) delete cache[name];
    }
};