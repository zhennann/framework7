(function framework7ComponentLoader(t,a){void 0===a&&(a=!0);document,window;var e=t.$,n=(t.Template7,t.utils),i=(t.device,t.support,t.Class,t.Modal,t.ConstructorMethods,t.ModalMethods,{show:function(){for(var t,a,n,i=[],r=arguments.length;r--;)i[r]=arguments[r];var s,l,o,b,d=this;1===i.length&&i[0].constructor===Object?(s=i[0].tabEl,l=i[0].tabLinkEl,o=i[0].animate,b=i[0].tabRoute):(s=(t=i)[0],l=t[1],o=t[2],b=t[3],"boolean"==typeof i[1]&&(s=(a=i)[0],o=a[1],l=a[2],b=a[3],i.length>2&&l.constructor===Object&&(s=(n=i)[0],o=n[1],b=n[2],l=n[3]))),void 0===o&&(o=!0);var h,c=e(s);if(b&&c[0]&&(c[0].f7TabRoute=b),0===c.length||c.hasClass("tab-active"))return{$newTabEl:c,newTabEl:c[0]};l&&(h=e(l));var g=c.parent(".tabs");if(0===g.length)return{$newTabEl:c,newTabEl:c[0]};d.swipeout&&(d.swipeout.allowOpen=!0);var u=[];function f(t){u.push(t)}function p(){u.forEach(function(t){t()})}var v,m=!1;if(g.parent().hasClass("tabs-animated-wrap")){g.parent()[o?"removeClass":"addClass"]("not-animated");var w=parseFloat(g.css("transition-duration").replace(",","."));o&&w&&(g.transitionEnd(p),m=!0);var E=100*(d.rtl?c.index():-c.index());g.transform("translate3d("+E+"%,0,0)")}g.parent().hasClass("tabs-swipeable-wrap")&&d.swiper&&((v=g.parent()[0].swiper)&&v.activeIndex!==c.index()?(m=!0,v.once("slideChangeTransitionEnd",function(){p()}).slideTo(c.index(),o?void 0:0)):v&&v.animating&&(m=!0,v.once("slideChangeTransitionEnd",function(){p()})));var k=g.children(".tab-active");if(k.removeClass("tab-active"),(!v||v&&!v.animating||v&&b)&&(k.trigger("tab:hide"),d.emit("tabHide",k[0])),c.addClass("tab-active"),(!v||v&&!v.animating||v&&b)&&(c.trigger("tab:show"),d.emit("tabShow",c[0])),!h&&((!(h=e("string"==typeof s?'.tab-link[href="'+s+'"]':'.tab-link[href="#'+c.attr("id")+'"]'))||h&&0===h.length)&&e("[data-tab]").each(function(t,a){c.is(e(a).attr("data-tab"))&&(h=e(a))}),b&&(!h||h&&0===h.length)&&0===(h=e('[data-route-tab-id="'+b.route.tab.id+'"]')).length&&(h=e('.tab-link[href="'+b.url+'"]')),h.length>1&&c.parents(".page").length&&(h=h.filter(function(t,a){return e(a).parents(".page")[0]===c.parents(".page")[0]}),"ios"===d.theme&&0===h.length&&b))){var C=c.parents(".page"),T=e(d.navbar.getElByPage(C));0===(h=T.find('[data-route-tab-id="'+b.route.tab.id+'"]')).length&&(h=T.find('.tab-link[href="'+b.url+'"]'))}if(h.length>0){var x;if(k&&k.length>0){var M=k.attr("id");M&&(!(x=e('.tab-link[href="#'+M+'"]'))||x&&0===x.length)&&(x=e('.tab-link[data-route-tab-id="'+M+'"]')),(!x||x&&0===x.length)&&e("[data-tab]").each(function(t,a){k.is(e(a).attr("data-tab"))&&(x=e(a))}),(!x||x&&0===x.length)&&(x=h.siblings(".tab-link-active"))}else b&&(x=h.siblings(".tab-link-active"));if(x&&x.length>1&&k&&k.parents(".page").length&&(x=x.filter(function(t,a){return e(a).parents(".page")[0]===k.parents(".page")[0]})),x&&x.length>0&&x.removeClass("tab-link-active"),h&&h.length>0&&(h.addClass("tab-link-active"),"md"===d.theme&&d.toolbar)){var y=h.parents(".tabbar, .tabbar-labels");y.length>0&&d.toolbar.setHighlight(y)}}return{$newTabEl:c,newTabEl:c[0],$oldTabEl:k,oldTabEl:k[0],onTabsChanged:f,animated:m}}}),r={name:"tabs",create:function(){n.extend(this,{tab:{show:i.show.bind(this)}})},clicks:{".tab-link":function(t,a){void 0===a&&(a={});(t.attr("href")&&0===t.attr("href").indexOf("#")||t.attr("data-tab"))&&this.tab.show({tabEl:a.tab||t.attr("href"),tabLinkEl:t,animate:a.animate})}}};if(a){if(t.prototype.modules&&t.prototype.modules[r.name])return;t.use(r),t.instance&&(t.instance.useModuleParams(r,t.instance.params),t.instance.useModule(r))}return r}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))
