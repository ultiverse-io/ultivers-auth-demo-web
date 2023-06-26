"use strict";const P=require("./index-20775dd4.cjs");function A(E,f){for(var h=0;h<f.length;h++){const l=f[h];if(typeof l!="string"&&!Array.isArray(l)){for(const d in l)if(d!=="default"&&!(d in E)){const e=Object.getOwnPropertyDescriptor(l,d);e&&Object.defineProperty(E,d,e.get?e:{enumerable:!0,get:()=>l[d]})}}}return Object.freeze(Object.defineProperty(E,Symbol.toStringTag,{value:"Module"}))}var W={exports:{}},D={exports:{}};/*!
 * Infinite Scroll v2.0.4
 * measure size of elements
 * MIT license
 */var C;function O(){return C||(C=1,function(E){(function(f,h){E.exports?E.exports=h():f.getSize=h()})(window,function(){function h(s){let p=parseFloat(s);return s.indexOf("%")==-1&&!isNaN(p)&&p}let l=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];function d(){let s={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0};return l.forEach(p=>{s[p]=0}),s}function e(s){if(typeof s=="string"&&(s=document.querySelector(s)),!(s&&typeof s=="object"&&s.nodeType))return;let r=getComputedStyle(s);if(r.display=="none")return d();let a={};a.width=s.offsetWidth,a.height=s.offsetHeight;let t=a.isBorderBox=r.boxSizing=="border-box";l.forEach(y=>{let b=r[y],v=parseFloat(b);a[y]=isNaN(v)?0:v});let n=a.paddingLeft+a.paddingRight,u=a.paddingTop+a.paddingBottom,x=a.marginLeft+a.marginRight,i=a.marginTop+a.marginBottom,o=a.borderLeftWidth+a.borderRightWidth,c=a.borderTopWidth+a.borderBottomWidth,g=h(r.width);g!==!1&&(a.width=g+(t?0:n+o));let m=h(r.height);return m!==!1&&(a.height=m+(t?0:u+c)),a.innerWidth=a.width-(n+o),a.innerHeight=a.height-(u+c),a.outerWidth=a.width+x,a.outerHeight=a.height+i,a}return e})}(D)),D.exports}var S={exports:{}},T={exports:{}},L;function U(){return L||(L=1,function(E){(function(f,h){E.exports?E.exports=h():f.EvEmitter=h()})(typeof window<"u"?window:P.commonjsGlobal,function(){function f(){}let h=f.prototype;return h.on=function(l,d){if(!l||!d)return this;let e=this._events=this._events||{},s=e[l]=e[l]||[];return s.includes(d)||s.push(d),this},h.once=function(l,d){if(!l||!d)return this;this.on(l,d);let e=this._onceEvents=this._onceEvents||{},s=e[l]=e[l]||{};return s[d]=!0,this},h.off=function(l,d){let e=this._events&&this._events[l];if(!e||!e.length)return this;let s=e.indexOf(d);return s!=-1&&e.splice(s,1),this},h.emitEvent=function(l,d){let e=this._events&&this._events[l];if(!e||!e.length)return this;e=e.slice(0),d=d||[];let s=this._onceEvents&&this._onceEvents[l];for(let p of e)s&&s[p]&&(this.off(l,p),delete s[p]),p.apply(this,d);return this},h.allOff=function(){return delete this._events,delete this._onceEvents,this},f})}(T)),T.exports}/*!
 * Unidragger v3.0.1
 * Draggable base class
 * MIT license
 */var M;function I(){return M||(M=1,function(E){(function(f,h){E.exports?E.exports=h(f,U()):f.Unidragger=h(f,f.EvEmitter)})(typeof window<"u"?window:P.commonjsGlobal,function(h,l){function d(){}let e=d.prototype=Object.create(l.prototype);e.handleEvent=function(t){let n="on"+t.type;this[n]&&this[n](t)};let s,p;"ontouchstart"in h?(s="touchstart",p=["touchmove","touchend","touchcancel"]):h.PointerEvent?(s="pointerdown",p=["pointermove","pointerup","pointercancel"]):(s="mousedown",p=["mousemove","mouseup"]),e.touchActionValue="none",e.bindHandles=function(){this._bindHandles("addEventListener",this.touchActionValue)},e.unbindHandles=function(){this._bindHandles("removeEventListener","")},e._bindHandles=function(t,n){this.handles.forEach(u=>{u[t](s,this),u[t]("click",this),h.PointerEvent&&(u.style.touchAction=n)})},e.bindActivePointerEvents=function(){p.forEach(t=>{h.addEventListener(t,this)})},e.unbindActivePointerEvents=function(){p.forEach(t=>{h.removeEventListener(t,this)})},e.withPointer=function(t,n){n.pointerId===this.pointerIdentifier&&this[t](n,n)},e.withTouch=function(t,n){let u;for(let x of n.changedTouches)x.identifier===this.pointerIdentifier&&(u=x);u&&this[t](n,u)},e.onmousedown=function(t){this.pointerDown(t,t)},e.ontouchstart=function(t){this.pointerDown(t,t.changedTouches[0])},e.onpointerdown=function(t){this.pointerDown(t,t)};const r=["TEXTAREA","INPUT","SELECT","OPTION"],a=["radio","checkbox","button","submit","image","file"];return e.pointerDown=function(t,n){let u=r.includes(t.target.nodeName),x=a.includes(t.target.type),i=!u||x;!this.isPointerDown&&!t.button&&i&&(this.isPointerDown=!0,this.pointerIdentifier=n.pointerId!==void 0?n.pointerId:n.identifier,this.pointerDownPointer={pageX:n.pageX,pageY:n.pageY},this.bindActivePointerEvents(),this.emitEvent("pointerDown",[t,n]))},e.onmousemove=function(t){this.pointerMove(t,t)},e.onpointermove=function(t){this.withPointer("pointerMove",t)},e.ontouchmove=function(t){this.withTouch("pointerMove",t)},e.pointerMove=function(t,n){let u={x:n.pageX-this.pointerDownPointer.pageX,y:n.pageY-this.pointerDownPointer.pageY};this.emitEvent("pointerMove",[t,n,u]),!this.isDragging&&this.hasDragStarted(u)&&this.dragStart(t,n),this.isDragging&&this.dragMove(t,n,u)},e.hasDragStarted=function(t){return Math.abs(t.x)>3||Math.abs(t.y)>3},e.dragStart=function(t,n){this.isDragging=!0,this.isPreventingClicks=!0,this.emitEvent("dragStart",[t,n])},e.dragMove=function(t,n,u){this.emitEvent("dragMove",[t,n,u])},e.onmouseup=function(t){this.pointerUp(t,t)},e.onpointerup=function(t){this.withPointer("pointerUp",t)},e.ontouchend=function(t){this.withTouch("pointerUp",t)},e.pointerUp=function(t,n){this.pointerDone(),this.emitEvent("pointerUp",[t,n]),this.isDragging?this.dragEnd(t,n):this.staticClick(t,n)},e.dragEnd=function(t,n){this.isDragging=!1,setTimeout(()=>delete this.isPreventingClicks),this.emitEvent("dragEnd",[t,n])},e.pointerDone=function(){this.isPointerDown=!1,delete this.pointerIdentifier,this.unbindActivePointerEvents(),this.emitEvent("pointerDone")},e.onpointercancel=function(t){this.withPointer("pointerCancel",t)},e.ontouchcancel=function(t){this.withTouch("pointerCancel",t)},e.pointerCancel=function(t,n){this.pointerDone(),this.emitEvent("pointerCancel",[t,n])},e.onclick=function(t){this.isPreventingClicks&&t.preventDefault()},e.staticClick=function(t,n){let u=t.type==="mouseup";u&&this.isIgnoringMouseUp||(this.emitEvent("staticClick",[t,n]),u&&(this.isIgnoringMouseUp=!0,setTimeout(()=>{delete this.isIgnoringMouseUp},400)))},d})}(S)),S.exports}/*!
 * Draggabilly v3.0.0
 * Make that shiz draggable
 * https://draggabilly.desandro.com
 * MIT license
 */(function(E){(function(f,h){E.exports?E.exports=h(f,O(),I()):f.Draggabilly=h(f,f.getSize,f.Unidragger)})(typeof window<"u"?window:P.commonjsGlobal,function(h,l,d){function e(){}let s=h.jQuery;function p(i,o){this.element=typeof i=="string"?document.querySelector(i):i,s&&(this.$element=s(this.element)),this.options={},this.option(o),this._create()}let r=p.prototype=Object.create(d.prototype);r.option=function(i){this.options={...this.options,...i}};const a=["relative","absolute","fixed"];r._create=function(){this.position={},this._getPosition(),this.startPoint={x:0,y:0},this.dragPoint={x:0,y:0},this.startPosition={...this.position};let i=getComputedStyle(this.element);a.includes(i.position)||(this.element.style.position="relative"),this.on("pointerDown",this.handlePointerDown),this.on("pointerUp",this.handlePointerUp),this.on("dragStart",this.handleDragStart),this.on("dragMove",this.handleDragMove),this.on("dragEnd",this.handleDragEnd),this.setHandles(),this.enable()},r.setHandles=function(){let{handle:i}=this.options;typeof i=="string"?this.handles=this.element.querySelectorAll(i):typeof i=="object"&&i.length?this.handles=i:i instanceof HTMLElement?this.handles=[i]:this.handles=[this.element]};const t=["dragStart","dragMove","dragEnd"];let n=r.emitEvent;r.emitEvent=function(i,o){if(!this.isEnabled&&t.includes(i))return;n.call(this,i,o);let g=h.jQuery;if(!g||!this.$element)return;let m,y=o;o&&o[0]instanceof Event&&([m,...y]=o);let v=g.Event(m);v.type=i,this.$element.trigger(v,y)},r._getPosition=function(){let i=getComputedStyle(this.element),o=this._getPositionCoord(i.left,"width"),c=this._getPositionCoord(i.top,"height");this.position.x=isNaN(o)?0:o,this.position.y=isNaN(c)?0:c,this._addTransformPosition(i)},r._getPositionCoord=function(i,o){if(i.includes("%")){let c=l(this.element.parentNode);return c?parseFloat(i)/100*c[o]:0}return parseInt(i,10)},r._addTransformPosition=function(i){let o=i.transform;if(!o.startsWith("matrix"))return;let c=o.split(","),g=o.startsWith("matrix3d")?12:4,m=parseInt(c[g],10),y=parseInt(c[g+1],10);this.position.x+=m,this.position.y+=y},r.handlePointerDown=function(i,o){this.isEnabled&&(this.pointerDownPointer={pageX:o.pageX,pageY:o.pageY},i.preventDefault(),document.activeElement.blur(),this.bindActivePointerEvents(i),this.element.classList.add("is-pointer-down"))},r.handleDragStart=function(){this.isEnabled&&(this._getPosition(),this.measureContainment(),this.startPosition.x=this.position.x,this.startPosition.y=this.position.y,this.setLeftTop(),this.dragPoint.x=0,this.dragPoint.y=0,this.element.classList.add("is-dragging"),this.animate())},r.measureContainment=function(){let i=this.getContainer();if(!i)return;let o=l(this.element),c=l(i),{borderLeftWidth:g,borderRightWidth:m,borderTopWidth:y,borderBottomWidth:b}=c,v=this.element.getBoundingClientRect(),w=i.getBoundingClientRect(),j=g+m,z=y+b,_=this.relativeStartPosition={x:v.left-(w.left+g),y:v.top-(w.top+y)};this.containSize={width:c.width-j-_.x-o.width,height:c.height-z-_.y-o.height}},r.getContainer=function(){let i=this.options.containment;return i?i instanceof HTMLElement?i:typeof i=="string"?document.querySelector(i):this.element.parentNode:void 0},r.handleDragMove=function(i,o,c){if(!this.isEnabled)return;let g=c.x,m=c.y,y=this.options.grid,b=y&&y[0],v=y&&y[1];g=u(g,b),m=u(m,v),g=this.containDrag("x",g,b),m=this.containDrag("y",m,v),g=this.options.axis=="y"?0:g,m=this.options.axis=="x"?0:m,this.position.x=this.startPosition.x+g,this.position.y=this.startPosition.y+m,this.dragPoint.x=g,this.dragPoint.y=m};function u(i,o,c){return o?(c=c||"round",Math[c](i/o)*o):i}r.containDrag=function(i,o,c){if(!this.options.containment)return o;let g=i=="x"?"width":"height",m=this.relativeStartPosition[i],y=u(-m,c,"ceil"),b=this.containSize[g];return b=u(b,c,"floor"),Math.max(y,Math.min(b,o))},r.handlePointerUp=function(){this.element.classList.remove("is-pointer-down")},r.handleDragEnd=function(){this.isEnabled&&(this.element.style.transform="",this.setLeftTop(),this.element.classList.remove("is-dragging"))},r.animate=function(){this.isDragging&&(this.positionDrag(),requestAnimationFrame(()=>this.animate()))},r.setLeftTop=function(){let{x:i,y:o}=this.position;this.element.style.left=`${i}px`,this.element.style.top=`${o}px`},r.positionDrag=function(){let{x:i,y:o}=this.dragPoint;this.element.style.transform=`translate3d(${i}px, ${o}px, 0)`},r.setPosition=function(i,o){this.position.x=i,this.position.y=o,this.setLeftTop()},r.enable=function(){this.isEnabled||(this.isEnabled=!0,this.bindHandles())},r.disable=function(){this.isEnabled&&(this.isEnabled=!1,this.isDragging&&this.dragEnd(),this.unbindHandles())};const x=["transform","left","top","position"];return r.destroy=function(){this.disable(),x.forEach(i=>{this.element.style[i]=""}),this.unbindHandles(),this.$element&&this.$element.removeData("draggabilly")},r._init=e,s&&s.bridget&&s.bridget("draggabilly",p),p})})(W);var H=W.exports;const k=P.getDefaultExportFromCjs(H),R=A({__proto__:null,default:k},[H]);exports.draggabilly=R;
