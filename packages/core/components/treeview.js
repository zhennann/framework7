(function framework7ComponentLoader(e,t){void 0===t&&(t=!0);document,window;var i=e.$,r=(e.Template7,e.utils),o=(e.device,e.support,e.Class,e.Modal,e.ConstructorMethods,e.ModalMethods,{open:function(e){var t=i(e).eq(0);function o(e){e?this.close(t[0]):t[0].f7TreeviewChildrenLoaded=!0,t.find(".treeview-toggle").removeClass("treeview-toggle-hidden"),t.find(".treeview-preloader").remove()}t.length&&(t.addClass("treeview-item-opened"),t.trigger("treeview:open"),this.emit("treeviewOpen",t[0]),t.hasClass("treeview-load-children")&&!t[0].f7TreeviewChildrenLoaded&&(t.trigger("treeview:loadchildren",o),this.emit("treeviewLoadChildren",t[0],o),t.find(".treeview-toggle").addClass("treeview-toggle-hidden"),t.find(".treeview-item-root").prepend('<div class="preloader treeview-preloader">'+r[this.theme+"PreloaderContent"]+"</div>")))},close:function(e){var t=i(e).eq(0);t.length&&(t.removeClass("treeview-item-opened"),t.trigger("treeview:close"),this.emit("treeviewClose",t[0]))},toggle:function(e){var t=i(e).eq(0);if(t.length){var r=t.hasClass("treeview-item-opened");this.treeview[r?"close":"open"](t)}}}),n={name:"treeview",create:function(){r.extend(this,{treeview:{open:o.open.bind(this),close:o.close.bind(this),toggle:o.toggle.bind(this)}})},clicks:{".treeview-toggle":function(e,t,i){if(!e.parents(".treeview-item-toggle").length){var r=e.parents(".treeview-item").eq(0);r.length&&(i.preventF7Router=!0,this.treeview.toggle(r[0]))}},".treeview-item-toggle":function(e,t,i){var r=e.closest(".treeview-item").eq(0);r.length&&(i.preventF7Router=!0,this.treeview.toggle(r[0]))}}};if(t){if(e.prototype.modules&&e.prototype.modules[n.name])return;e.use(n),e.instance&&(e.instance.useModuleParams(n,e.instance.params),e.instance.useModule(n))}return n}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))
