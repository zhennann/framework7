(function framework7ComponentLoader(o,e){void 0===e&&(e=!0);var t=document,a=window,r=o.$,p=(o.Template7,o.utils),n=(o.device,o.support,o.Class,o.Modal),s=(o.ConstructorMethods,o.ModalMethods),i=function(o){function e(e,n){var s=p.extend({on:{}},e.params.popover,n);o.call(this,e,s);var i,l,d=this;if(d.params=s,d.params.hostEl&&0===(i=r(d.params.hostEl)).length)return d;if((l=d.params.el?r(d.params.el).eq(0):r(d.params.content).filter((function(o,e){return 1===e.nodeType})).eq(0))&&l.length>0&&l[0].f7Modal)return l[0].f7Modal;var c,h,m=r(d.params.targetEl).eq(0);if(0===l.length)return d.destroy();d.params.backdrop&&d.params.backdropEl?c=r(d.params.backdropEl):d.params.backdrop&&0===(c=e.root.children(".popover-backdrop")).length&&(c=r('<div class="popover-backdrop"></div>'),e.root.append(c)),0===l.find(".popover-angle").length?(h=r('<div class="popover-angle"></div>'),l.prepend(h)):h=l.find(".popover-angle");var v=d.open;function f(){d.resize()}function u(o){var t=o.target,p=r(t);!e.device.desktop&&e.device.cordova&&(a.Keyboard&&a.Keyboard.isVisible||a.cordova.plugins&&a.cordova.plugins.Keyboard&&a.cordova.plugins.Keyboard.isVisible)||0===p.closest(d.el).length&&(d.params.closeByBackdropClick&&d.params.backdrop&&d.backdropEl&&d.backdropEl===t||d.params.closeByOutsideClick)&&d.close()}function g(o){27===o.keyCode&&d.params.closeOnEscape&&d.close()}return p.extend(d,{app:e,$hostEl:i,hostEl:i&&i[0],$el:l,el:l[0],$targetEl:m,targetEl:m[0],$angleEl:h,angleEl:h[0],$backdropEl:c,backdropEl:c&&c[0],type:"popover",open:function(){for(var o,e=[],t=arguments.length;t--;)e[t]=arguments[t];var a=e[0],p=e[1];return"boolean"==typeof e[0]&&(p=(o=e)[0],a=o[1]),a&&(d.$targetEl=r(a),d.targetEl=d.$targetEl[0]),v.call(d,p)}}),d.on("popoverOpen",(function(){d.resize(),e.on("resize",f),r(a).on("keyboardDidShow keyboardDidHide",f),d.on("popoverClose popoverBeforeDestroy",(function(){e.off("resize",f),r(a).off("keyboardDidShow keyboardDidHide",f)}))})),d.params.closeOnEscape&&(d.on("popoverOpen",(function(){r(t).on("keydown",g)})),d.on("popoverClose",(function(){r(t).off("keydown",g)}))),d.on("popoverOpened",(function(){(d.params.closeByOutsideClick||d.params.closeByBackdropClick)&&e.on("click",u)})),d.on("popoverClose",(function(){(d.params.closeByOutsideClick||d.params.closeByBackdropClick)&&e.off("click",u)})),l[0].f7Modal=d,d}return o&&(e.__proto__=o),e.prototype=Object.create(o&&o.prototype),e.prototype.constructor=e,e.prototype.resize=function(){var o=this.app,e=this.$el,t=this.$targetEl,a=this.$angleEl,p=this.params,n=p.targetX,s=p.targetY;e.css({left:"",top:""});var i,l,d,c=[e.width(),e.height()],h=c[0],m=c[1],v=0;"ios"===o.theme||"aurora"===o.theme?(a.removeClass("on-left on-right on-top on-bottom").css({left:"",top:""}),v=a.width()/2):e.removeClass("popover-on-left popover-on-right popover-on-top popover-on-bottom popover-on-middle").css({left:"",top:""});var f,u,g,k,b=t.parents(".view");if(b.length>0){var y=b.offset();d={left:y.left,top:y.top,width:b.width(),height:b.height()}}else d={left:o.left,top:o.top,width:o.width,height:o.height};var E=parseInt(r("html").css("--f7-safe-area-top"),10);if(Number.isNaN(E)&&(E=0),t&&t.length>0){f=t.outerWidth(),u=t.outerHeight();var C=t.offset();g=C.left-d.left,k=C.top-d.top;var M=t.parents(".page");M.length>0&&(k-=M[0].scrollTop)}else void 0!==n&&"undefined"!==s&&(g=n,k=s,f=this.params.targetWidth||0,u=this.params.targetHeight||0);var w,x=[0,0,0],B=x[0],O=x[1],$=x[2],z="md"===o.theme?"bottom":"top";"md"===o.theme?(m<d.height-k-u?(z="bottom",O=k+u):m<k-E?(O=k-m,z="top"):(z="middle",O=u/2+k-m/2),O=Math.max(8,Math.min(O,d.height-m-8)),g<d.width/2?(w="right",B="middle"===z?g+f:g):(w="left",B="middle"===z?g-h:g+f-h),B=Math.max(8,Math.min(B,d.width-h-8)),e.addClass("popover-on-"+z+" popover-on-"+w)):(m+v<k-E?O=k-m-v:m+v<d.height-k-u?(z="bottom",O=k+u+v):(z="middle",$=O=u/2+k-m/2,$-=O=Math.max(5,Math.min(O,d.height-m-5))),"top"===z||"bottom"===z?($=B=f/2+g-h/2,B=Math.max(5,Math.min(B,d.width-h-5)),"top"===z&&a.addClass("on-bottom"),"bottom"===z&&a.addClass("on-top"),i=h/2-v+($-=B),i=Math.max(Math.min(i,h-2*v-13),13),a.css({left:i+"px"})):"middle"===z&&(B=g-h-v,a.addClass("on-right"),(B<5||B+h>d.width)&&(B<5&&(B=g+f+v),B+h>d.width&&(B=d.width-h-5),a.removeClass("on-right").addClass("on-left")),l=m/2-v+$,l=Math.max(Math.min(l,m-2*v-13),13),a.css({top:l+"px"})));e.css({top:O+"px",left:B+"px"})},e}(n),l={name:"popover",params:{popover:{backdrop:!0,backdropEl:void 0,closeByBackdropClick:!0,closeByOutsideClick:!0,closeOnEscape:!1}},static:{Popover:i},create:function(){var o=this;o.popover=p.extend(s({app:o,constructor:i,defaultSelector:".popover.modal-in"}),{open:function(e,t,a){var p=r(e);if(p.length>1){var n=r(t).parents(".page");n.length&&p.each((function(o,e){var t=r(e);t.parents(n)[0]===n[0]&&(p=t)}))}p.length>1&&(p=p.eq(p.length-1));var s=p[0].f7Modal;return s||(s=new i(o,{el:p,targetEl:t})),s.open(t,a)}})},clicks:{".popover-open":function(o,e){void 0===e&&(e={});this.popover.open(e.popover,o,e.animate)},".popover-close":function(o,e){void 0===e&&(e={});this.popover.close(e.popover,e.animate,o)}}};if(e){if(o.prototype.modules&&o.prototype.modules[l.name])return;o.use(l),o.instance&&(o.instance.useModuleParams(l,o.instance.params),o.instance.useModule(l))}return l}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))
