(function ($) {
    window.mc = window.mc || {};

    window.mc.alert = function (msg, yescallback) {
        var d = dialog({
            title: '提示',
            content: '<div style="width:200px;margin:20px 30px;">' + msg + '</div>',
            okValue: '确定',
            ok: function () {
                if (yescallback) {
                    yescallback();
                }
                return true;
            }
        });
        d.showModal();
    };

    window.mc.confirm = function (msg, okcallback, cancelcallback) {
        var d = dialog({
            title: '   ',
            content: '<div style="width:200px;margin:20px 30px;">' + msg + '</div>',
            okValue: '确定',
            ok: function () {
                if (okcallback) {
                    okcallback();
                }
                return true;
            },
            cancelValue: '取消',
            cancel: function () {
                if (cancelcallback) {
                    cancelcallback();
                }
                return true;
            }
        });
        d.showModal();
    };

    window.mc.loadingdialog = {
        show: function () {
            this.close();
            this.loadingDlg = dialog({
                content: '<div style="width:60px; height:45px; text-align: center;vertical-align:central;"><img src="/admin/images/loading32.GIF" alt="加载中..."/></div>'
            });
            this.loadingDlg.showModal();
        },
        close: function () {
            if (this.loadingDlg) {
                this.loadingDlg.close().remove();
                this.loadingDlg = null;
            }
        }
    };

    //输入框占位文字
    window.mc.mcPlaceHold = function ($el) {
        var $self = $el;
        var oldValue = $self.val();
        $self.focus(function () {
            if ($self.val() == oldValue) {
                $self.val('');
                $self.css({ color: '#727272' });
            }
        }).blur(function () {
            if ($self.val().Trim() == '') {
                $self.val(oldValue);
                $self.css({ color: '#999' });
            }
        });

        $self.realvalue = function () {
            return $self.val().replace(oldValue, '');
        };

        $self.keyup(function (e) {
            var ev = document.all ? window.event : e;
            if (ev.keyCode == 13) {
                $self.trigger('submitcallback', this);
            }
        });

        return $self;
    };

    window.mc.alertTimeout = function (msg) {
        var d = dialog({
            title: '提示',
            content: '<div style="width:200px;margin:20px 30px;">' + msg + '</div>',
            okValue: ''
        });
        d.showModal();
        setTimeout(function () {
            d.close().remove();
        }, 500);
    };

    window.mc.storelastqueryobj = function (args) {
        if (!window.parent.lastqueryobj) {
            window.parent.lastqueryobj = {};
        }
        var curHref = window.location.href.toLowerCase();
        window.parent.lastqueryobj[curHref] = args;
    };

    window.mc.reloadlastqueryobj = function (defaultFunc, callback) {
        var curHref = window.location.href.toLowerCase();
        if (window.parent.lastqueryobj && window.parent.lastqueryobj[curHref]) {
            var args = window.parent.lastqueryobj[curHref];
            callback(args, args.index, args.psize);
        } else {
            defaultFunc();
        }
    };

})(jQuery);