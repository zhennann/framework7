(function framework7ComponentLoader(o,e){void 0===e&&(e=!0);var n=document,t=window,a=o.$,s=(o.Template7,o.utils),i=(o.device,o.support,o.Class,o.Modal),r=(o.ConstructorMethods,o.ModalMethods),l=function(o){function e(e,i){var r=s.extend({on:{}},e.params.actions,i);o.call(this,e,r);var l,c,p,d,u=this;if(u.params=r,u.params.hostEl&&0===(l=a(u.params.hostEl)).length)return u;if(u.params.buttons&&(c=u.params.buttons,Array.isArray(c[0])||(c=[c])),u.groups=c,u.params.el?p=a(u.params.el).eq(0):u.params.content?p=a(u.params.content).filter((function(o,e){return 1===e.nodeType})).eq(0):u.params.buttons&&(u.params.convertToPopover&&(u.popoverHtml=u.renderPopover()),u.actionsHtml=u.render()),p&&p.length>0&&p[0].f7Modal)return p[0].f7Modal;if(p&&0===p.length&&!u.actionsHtml&&!u.popoverHtml)return u.destroy();u.params.backdrop&&u.params.backdropEl?d=a(u.params.backdropEl):u.params.backdrop&&0===(d=e.root.children(".actions-backdrop")).length&&(d=a('<div class="actions-backdrop"></div>'),e.root.append(d));var m,v=u.open,f=u.close;function h(o){var e,n,t=a(this);if(t.hasClass("list-button")||t.hasClass("item-link")?(e=t.parents("li").index(),n=t.parents(".list").index()):(e=t.index(),n=t.parents(".actions-group").index()),void 0!==c){var s=c[n][e];s.onClick&&s.onClick(u,o),u.params.onClick&&u.params.onClick(u,o),!1!==s.close&&u.close()}}function b(o){var n=o.target,s=a(n);!e.device.desktop&&e.device.cordova&&(t.Keyboard&&t.Keyboard.isVisible||t.cordova.plugins&&t.cordova.plugins.Keyboard&&t.cordova.plugins.Keyboard.isVisible)||0===s.closest(u.el).length&&(u.params.closeByBackdropClick&&u.params.backdrop&&u.backdropEl&&u.backdropEl===n?u.close():u.params.closeByOutsideClick&&u.close())}function k(o){27===o.keyCode&&u.params.closeOnEscape&&u.close()}return u.open=function(o){var n=!1,t=u.params,i=t.targetEl,r=t.targetX,c=t.targetY,p=t.targetWidth,d=t.targetHeight;if(u.params.convertToPopover&&(i||void 0!==r&&void 0!==c)){var f="small"!==a(i).parents(".view").data("size");(u.params.forceToPopover||f)&&(n=!0)}return n&&u.popoverHtml?((m=e.popover.create({hostEl:l&&l[0],content:u.popoverHtml,backdrop:u.params.backdrop,targetEl:i,targetX:r,targetY:c,targetWidth:p,targetHeight:d,on:{open:function(){u.$el&&u.$el.trigger("modal:open "+u.type.toLowerCase()+":open"),u.emit("local::open modalOpen "+u.type+"Open",u)},opened:function(){u.$el&&u.$el.trigger("modal:opened "+u.type.toLowerCase()+":opened"),u.emit("local::opened modalOpened "+u.type+"Opened",u)},close:function(){u.$el&&u.$el.trigger("modal:close "+u.type.toLowerCase()+":close"),u.emit("local::close modalClose "+u.type+"Close",u)},closed:function(){u.$el&&u.$el.trigger("modal:closed "+u.type.toLowerCase()+":closed"),u.emit("local::closed modalClosed "+u.type+"Closed",u)}}})).open(o),m.once("popoverOpened",(function(){m.$el.find(".list-button, .item-link").each((function(o,e){a(e).on("click",h)}))})),m.once("popoverClosed",(function(){m.$el.find(".list-button, .item-link").each((function(o,e){a(e).off("click",h)})),s.nextTick((function(){m.destroy(),m=void 0}))}))):(u.$el=u.actionsHtml?a(u.actionsHtml):u.$el,u.$el[0].f7Modal=u,u.groups&&(u.$el.find(".actions-button").each((function(o,e){a(e).on("click",h)})),u.once("actionsClosed",(function(){u.$el.find(".actions-button").each((function(o,e){a(e).off("click",h)}))}))),u.el=u.$el[0],v.call(u,o)),u},u.close=function(o){return m?m.close(o):f.call(u,o),u},s.extend(u,{app:e,$hostEl:l,hostEl:l&&l[0],$el:p,el:p?p[0]:void 0,$backdropEl:d,backdropEl:d&&d[0],type:"actions"}),u.params.closeOnEscape&&(u.on("open",(function(){a(n).on("keydown",k)})),u.on("close",(function(){a(n).off("keydown",k)}))),u.on("opened",(function(){(u.params.closeByBackdropClick||u.params.closeByOutsideClick)&&e.on("click",b)})),u.on("close",(function(){(u.params.closeByBackdropClick||u.params.closeByOutsideClick)&&e.off("click",b)})),p&&(p[0].f7Modal=u),u}return o&&(e.__proto__=o),e.prototype=Object.create(o&&o.prototype),e.prototype.constructor=e,e.prototype.render=function(){if(this.params.render)return this.params.render.call(this,this);var o=this.groups,e=this.params.cssClass;return('\n      <div class="actions-modal'+(this.params.grid?" actions-grid":"")+" "+(e||"")+'">\n        '+o.map((function(o){return'<div class="actions-group">\n            '+o.map((function(o){var e=["actions-"+(o.label?"label":"button")],n=o.color,t=o.bg,a=o.bold,s=o.disabled,i=o.label,r=o.text,l=o.icon;return n&&e.push("color-"+n),t&&e.push("bg-color-"+t),a&&e.push("actions-button-bold"),s&&e.push("disabled"),i?'<div class="'+e.join(" ")+'">'+r+"</div>":('\n                <div class="'+e.join(" ")+'">\n                  '+(l?'<div class="actions-button-media">'+l+"</div>":"")+'\n                  <div class="actions-button-text">'+r+"</div>\n                </div>").trim()})).join("")+"\n          </div>"})).join("")+"\n      </div>\n    ").trim()},e.prototype.renderPopover=function(){if(this.params.renderPopover)return this.params.renderPopover.call(this,this);var o=this.groups;return('\n      <div class="popover popover-from-actions '+(this.params.cssClass||"")+'">\n        <div class="popover-inner">\n          '+o.map((function(o){return'\n            <div class="list">\n              <ul>\n                '+o.map((function(o){var e=[],n=o.color,t=o.bg,a=o.bold,s=o.disabled,i=o.label,r=o.text,l=o.icon;return n&&e.push("color-"+n),t&&e.push("bg-color-"+t),a&&e.push("popover-from-actions-bold"),s&&e.push("disabled"),i?(e.push("popover-from-actions-label"),'<li class="'+e.join(" ")+'">'+r+"</li>"):l?(e.push("item-link item-content"),'\n                      <li>\n                        <a class="'+e.join(" ")+'">\n                          <div class="item-media">\n                            '+l+'\n                          </div>\n                          <div class="item-inner">\n                            <div class="item-title">\n                              '+r+"\n                            </div>\n                          </div>\n                        </a>\n                      </li>\n                    "):(e.push("list-button"),'\n                    <li>\n                      <a class="'+e.join(" ")+'">'+r+"</a>\n                    </li>\n                  ")})).join("")+"\n              </ul>\n            </div>\n          "})).join("")+"\n        </div>\n      </div>\n    ").trim()},e}(i),c={name:"actions",params:{actions:{convertToPopover:!0,forceToPopover:!1,backdrop:!0,backdropEl:void 0,cssClass:null,closeByBackdropClick:!0,closeOnEscape:!1,render:null,renderPopover:null}},static:{Actions:l},create:function(){this.actions=r({app:this,constructor:l,defaultSelector:".actions-modal.modal-in"})},clicks:{".actions-open":function(o,e){void 0===e&&(e={});this.actions.open(e.actions,e.animate)},".actions-close":function(o,e){void 0===e&&(e={});this.actions.close(e.actions,e.animate)}}};if(e){if(o.prototype.modules&&o.prototype.modules[c.name])return;o.use(c),o.instance&&(o.instance.useModuleParams(c,o.instance.params),o.instance.useModule(c))}return c}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))
