/*
 ** jquery-bs-dialog.js
 **
 ** jquery-ui-dialog replacement that works with native bootstrap. Used jquery-ui widget as a template because we wanted a compatible replacement widget.
 ** Escaping multiline string literal (Template strings) which must actually use back tick ` but we replaced it with a multiline escape \ for ES5 browser compatiblity.
 */

+ function($) {
    'use strict';

    // DIALOG CLASS DEFINITION
    // ======================

    var Dialog = function(element, options) {
        // constructor
        this.dialogOptions = options;
        this.$dialogElement = $(element);

        this.id = this.$dialogElement.attr("id");
        this.id = (typeof this.id === "string" && this.id.length) ? this.id : "bs-dialog";

        this.originalTitle = this.$dialogElement.attr("title");
        typeof this.originalTitle != "string" && (this.originalTitle = "");
        this.dialogOptions.title = options.title || this.originalTitle;

        this.originalContent = this.$dialogElement.html();

        var buttons = [],
            buttonsclick = [],
            btn_count = 0;
        if (typeof this.dialogOptions.buttons === "object") {
            if (this.dialogOptions.buttons.constructor !== Array) {
                // structure - make into an array so we only do the real work once
                var a = [];
                for (var key in this.dialogOptions.buttons) {
                    a.push({
                        text: key,
                        click: this.dialogOptions.buttons[key]
                    });
                }
                this.dialogOptions.buttons = a;
            }
            for (var i = 0; i < this.dialogOptions.buttons.length; i++) {
                var btn = {
                        text: "unknown",
                        icon: false,
                        click: false,
                        btn_id: this.id + '-btn-' + btn_count++
                    },
                    obj = this.dialogOptions.buttons[i];
                if (typeof obj.text === "string" && obj.text.length) {
                    btn.text = obj.text;
                }
                if (typeof obj.icon === "string" && obj.icon.length) {
                    btn.icon = obj.text;
                }
                if (typeof obj.click === "function") {
                    btn.click = obj.click;
                }
                if (typeof obj.id === "string" && obj.id.length) {
                    btn.btn_id = obj.id;
                }
                if (this.dialogOptions.debug) {
                    console.log("jquery-bs-dialog.constructor - button", obj, btn);
                }
                if (typeof btn.click === "function") {
                    if (btn.icon) {
                        btn.text += '<span class="' + btn.icon + '"></span> ';
                    }
                    buttons.push('<button id="' + btn.btn_id + '" class="btn btn-default">' + btn.text + '</button>');
                    buttonsclick.push({ id: btn.btn_id, click: btn.click });
                }
            }
        }
        if (this.dialogOptions.debug) {
            console.log("jquery-bs-dialog.constructor - buttons", buttons, buttonsclick);
        }

        //$("#"+this.id).replaceWith(`
        var modalSize = options.width < 300 ? " modal-sm" : this.dialogOptions.width > 480 ? " modal-lg" : "";
        this.$dialogElement.empty();
        this.$dialogElement.removeClass();
        this.$dialogElement.removeAttr("style");
        this.$dialogElement.addClass("modal fade");
        this.$dialogElement.attr("tab-index", -1);
        this.$dialogElement.attr("role", "dialog");
        // This below code is a multiline string literal (Template strings) which must actually use back tick `. 
        // However, to make it compatible with IE (11 and below), we replace it with a multiline escape \ . ES5 Vs ES6.
        this.$dialogElement.html(" \
			<div class='modal-dialog" + modalSize + "' role='document'> \
				<div class='modal-content'> \
					<div class='modal-header'> \
						<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button> \
						<h4 class='modal-title'>" + options.title + "</h4> \
					</div> \
					<div class='modal-body'>" + this.originalContent + "</div> \
					<div class='modal-footer'>" + buttons.join(' ') + "</div> \
				</div> \
			</div> \
		");
        for (var i = 0; i < buttonsclick.length; i++) {
            var btn = buttonsclick[i],
                that = this;
            $("#" + btn.id).data("dialog-btn", btn).click(function(e) {
                var btn = $(this).data("dialog-btn")
                if (that.dialogOptions.debug) {
                    console.log("jquery-bs-dialog - button.click", btn);
                }
                e.preventDefault();
                btn.click.call(that.$dialogElement[0]);
            });
        }
        this.modal = this.$dialogElement.modal({
            show: this.dialogOptions.autoOpen
        });
    }

    Dialog.VERSION = '1.0.0';

    Dialog.DEFAULTS = {
        autoOpen: true,
        buttons: {},
        closeOnEscape: true,
        closeText: "close",
        dialogClass: "",
        draggable: true,
        height: "auto",
        maxHeight: false,
        maxWidth: false,
        minHeight: 150,
        minWidth: 150,
        modal: false,
        show: null,
        stack: true,
        title: "",
        width: 300,
        debug: false
    };

    Dialog.prototype.open = function() {
        if (this.dialogOptions.debug) {
            console.log("jquery.bs.dialog.open()", this.$dialogElement);
        }
        this.$dialogElement.modal("show");
    }

    Dialog.prototype.close = function() {
        if (this.dialogOptions.debug) {
            console.log("jquery.bs.dialog.close()", this.$dialogElement);
        }
        this.$dialogElement.modal("hide");
    }

    // MODAL PLUGIN DEFINITION
    // =======================

    function Plugin(option, _relatedTarget) {
        return this.each(function() {
            var $this = this.jquery ? this : $(this);
            var data = $this.data('bs.dialog');
            var options = $.extend({}, Dialog.DEFAULTS, $this.data(), typeof option == 'object' && option);
            if (options.debug) {
                console.log("jquery.bs.dialog.Plugin($this)", $this);
                console.log("jquery.bs.dialog.Plugin(data)", data);
                console.log("jquery.bs.dialog.Plugin(options)", options);
                console.log("jquery.bs.dialog.Plugin(_relatedTarget)", _relatedTarget);
            }
            if (!data) {
                data = new Dialog(this, options);
                $this.data('bs.dialog', data);
                if (options.debug) {
                    console.log("new Dialog(this)", this);
                    console.log("new Dialog(data)", data);
                }
            }
            if (typeof option == 'string') {
                data[option](_relatedTarget);
            } else if (options.show) {
                data.open(_relatedTarget);
            }
        })
    }

    var old = $.fn.dialog;

    $.fn.dialog = Plugin;
    $.fn.dialog.Constructor = Dialog;


    // MODAL NO CONFLICT
    // =================

    $.fn.modal.noConflict = function() {
        $.fn.modal = old;
        return this;
    }

}(jQuery);