"use strict";(self.webpackChunkpets_paw=self.webpackChunkpets_paw||[]).push([[571],{6524:function(e,t,n){n.d(t,{D:function(){return f}});var r=n(8214),a=n(5861),i=n(2791),c=n(9434),s=n(6871),o=n(1633),u=n(429),l=n(4593),d=n(1456),m=n(184),f=function(e){var t=e.getItemsCount,n=e.prevNext,r=e.getCurrentPage,a=e.getFilter,i=(0,c.I0)(),u=(0,s.TH)(),l=new URLSearchParams(u.search).get("breed_ids"),f=(0,c.v9)(r),v=(0,c.v9)(a),g=(0,c.v9)(t),p=Math.floor(g/v.limitItems),h=(0,c.v9)(o.v);return(0,m.jsx)("div",{className:"".concat(d.Z.paginator," ").concat(h&&d.Z.black),children:!l&&(0,m.jsxs)("div",{children:[f>0&&(0,m.jsx)("button",{type:"button",className:"".concat(d.Z.element," ").concat(d.Z.btn," ").concat(d.Z.btn_prev),onClick:function(){return f>0&&n&&i(n("prev"))},children:"PREV"}),f<p&&(0,m.jsx)("button",{type:"button",className:"".concat(d.Z.element," ").concat(d.Z.btn," ").concat(d.Z.btn_next),onClick:function(){return f<p&&n&&i(n("next"))},children:"NEXT"})]})})};t.Z=function(e){var t=e.breedsList,n=e.getItemsCount,v=e.photosFromGallery,g=e.prevNext,p=e.getCurrentPage,h=e.getFilter,x=(0,s.s0)(),b="/gallery"===(0,s.TH)().pathname,j=(0,c.I0)(),Z=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j((0,u.lU)(t));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),_=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t,n){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j((0,u.Wm)(t,n));case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),C=(0,c.v9)(l.Y8),N=(0,c.v9)(l.We);(0,i.useEffect)((function(){j((0,u.on)())}),[]);var y=(0,c.v9)(o.v);return(0,m.jsxs)("div",{className:d.Z.breedsList,children:[(0,m.jsx)("div",{className:"".concat(d.Z.grid__layout," ").concat(y&&d.Z.black),children:v?t.length>0?t.map((function(e){var t=e.favourite?N[e.id]:"";return(0,m.jsxs)("div",{className:"".concat(d.Z.grid__item," ").concat(b?d.Z.grid__item_gallery:""),children:[(0,m.jsx)("img",{src:e.url,alt:e.id}),(0,m.jsx)("div",{children:b?C.includes(e.id)?(0,m.jsx)("button",{onClick:function(){return _(t,e.id)},className:d.Z.remove,children:"remove to favourite"}):(0,m.jsx)("button",{onClick:function(){return Z(e.id)},className:d.Z.add,children:"add to favourite"}):(0,m.jsx)("span",{children:e.id})})]},e.id)})):(0,m.jsx)(m.Fragment,{}):t.length>0?t.map((function(e){if(e.image&&e.image.url)return(0,m.jsxs)("div",{className:d.Z.grid__item,onClick:function(e){return function(e){x("../breeds/info/".concat(e.target.id),{replace:!0})}(e)},children:[(0,m.jsx)("img",{src:e.image.url,alt:""===e.alt_names?e.name:e.alt_names}),(0,m.jsx)("div",{id:e.id,children:(0,m.jsx)("span",{children:e.name})})]},e.id);var t=e.breeds?e.breeds[0].name:"",n=e.url?e.url:"https://s5.favim.com/orig/151213/avatar-kot-profil-gav-Favim.ru-3761175.jpg",r=e.name?e.name:t,a=e.alt_names?e.alt_names:e.name?e.name:t;return(0,m.jsxs)("div",{className:d.Z.grid__item,children:[(0,m.jsx)("img",{src:n,alt:e.alt_names?a:r}),(0,m.jsx)("div",{children:(0,m.jsx)("span",{children:(0,m.jsx)("span",{children:r})})})]},e.id)})):(0,m.jsx)(m.Fragment,{})}),(0,m.jsx)(f,{getItemsCount:n,prevNext:g,getCurrentPage:p,getFilter:h})]})}},7571:function(e,t,n){n.r(t);var r=n(2791),a=n(9434),i=n(6871),c=n(722),s=n(8764),o=n(2831),u=n(6524),l=n(184);t.default=function(){var e=(0,a.v9)(s.Ly),t=(0,a.v9)(s.co),n=(0,a.v9)(s.zK),d=(0,a.v9)(s.ab),m=(0,a.v9)(s.FZ),f=(0,a.I0)(),v=(0,i.s0)(),g=(0,i.TH)();(0,r.useEffect)((function(){if(""===n.filterByBreed){var e=n.limitItems?"&limit=".concat(n.limitItems):"",r="DESC"===t?"&order=".concat(t):"";v("../breeds?page=".concat(m).concat(e).concat(r),{replace:!0})}else v("../breeds/images/search?breed_ids=".concat(n.filterByBreed),{replace:!0})}),[n.limitItems,m,t,n.filterByBreed]),(0,r.useEffect)((function(){f((0,c._I)());var e=new URLSearchParams(g.search),t=e.get("breed_ids"),r=Number(e.get("limit")),a=r<5?5:r>20?20:5*Math.ceil(r/5),i=a?"&limit=".concat(a):"",s=Number(e.get("page")),o=e.get("order")?"DESC":"ASC",u="DESC"===o?"order=".concat(o):"";v(t?"../breeds/images/search?breed_ids=".concat(t):"../breeds?page=".concat(s).concat(i).concat(u),{replace:!0});var l={filterByBreed:t||n.filterByBreed,limitItems:a};f((0,c.Qn)(l,s,o))}),[]);return(0,l.jsxs)(l.Fragment,{children:[d&&(0,l.jsx)(o.Z,{}),!d&&(0,l.jsx)(u.Z,{breedsList:e,getItemsCount:s.Y4,prevNext:function(e){return"prev"===e?--m:++m,(0,c.Qn)(n,m,t)},photosFromGallery:!1,getCurrentPage:s.FZ,getFilter:s.zK})]})}},4593:function(e,t,n){n.d(t,{Vj:function(){return r},We:function(){return s},Y8:function(){return c},ab:function(){return a},mY:function(){return i}});var r=function(e){return e.voting.breedImage},a=function(e){return e.voting.isFetching},i=function(e){return e.voting.userActions},c=function(e){return e.voting.favourites},s=function(e){return e.voting.favByImageId}}}]);
//# sourceMappingURL=571.7d5d34f3.chunk.js.map