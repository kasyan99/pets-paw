"use strict";(self.webpackChunkpets_paw=self.webpackChunkpets_paw||[]).push([[591],{6524:function(e,n,t){t.d(n,{D:function(){return g}});var r=t(8214),a=t(5861),i=t(2791),c=t(9434),s=t(6871),l=t(1633),o=t(429),u=t(4593),d=t(1456),m=t(184),g=function(e){var n=e.getItemsCount,t=e.prevNext,r=e.getCurrentPage,a=e.getFilter,i=(0,c.I0)(),o=(0,s.TH)(),u=new URLSearchParams(o.search).get("breed_ids"),g=(0,c.v9)(r),f=(0,c.v9)(a),v=(0,c.v9)(n),h=Math.floor(v/f.limitItems),p=(0,c.v9)(l.v);return(0,m.jsx)("div",{className:"".concat(d.Z.paginator," ").concat(p&&d.Z.black),children:!u&&(0,m.jsxs)("div",{children:[g>0&&(0,m.jsx)("button",{type:"button",className:"".concat(d.Z.element," ").concat(d.Z.btn," ").concat(d.Z.btn_prev),onClick:function(){return g>0&&t&&i(t("prev"))},children:"PREV"}),g<h&&(0,m.jsx)("button",{type:"button",className:"".concat(d.Z.element," ").concat(d.Z.btn," ").concat(d.Z.btn_next),onClick:function(){return g<h&&t&&i(t("next"))},children:"NEXT"})]})})};n.Z=function(e){var n=e.breedsList,t=e.getItemsCount,f=e.photosFromGallery,v=e.prevNext,h=e.getCurrentPage,p=e.getFilter,x=(0,s.s0)(),j="/gallery"===(0,s.TH)().pathname,_=(0,c.I0)(),b=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(n){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_((0,o.lU)(n));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),N=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(n,t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_((0,o.Wm)(n,t));case 2:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}(),y=(0,c.v9)(u.Y8),C=(0,c.v9)(u.We);(0,i.useEffect)((function(){_((0,o.on)())}),[]);var F=(0,c.v9)(l.v);return(0,m.jsxs)("div",{className:d.Z.breedsList,children:[(0,m.jsx)("div",{className:"".concat(d.Z.grid__layout," ").concat(F&&d.Z.black),children:f?n.length>0?n.map((function(e){var n=e.favourite?C[e.id]:"";return(0,m.jsxs)("div",{className:"".concat(d.Z.grid__item," ").concat(j?d.Z.grid__item_gallery:""),children:[(0,m.jsx)("img",{src:e.url,alt:e.id}),(0,m.jsx)("div",{children:j?y.includes(e.id)?(0,m.jsx)("button",{onClick:function(){return N(n,e.id)},className:d.Z.remove,children:"remove to favourite"}):(0,m.jsx)("button",{onClick:function(){return b(e.id)},className:d.Z.add,children:"add to favourite"}):(0,m.jsx)("span",{children:e.id})})]},e.id)})):(0,m.jsx)(m.Fragment,{}):n.length>0?n.map((function(e){if(e.image&&e.image.url)return(0,m.jsxs)("div",{className:d.Z.grid__item,onClick:function(e){return function(e){x("../breeds/info/".concat(e.target.id),{replace:!0})}(e)},children:[(0,m.jsx)("img",{src:e.image.url,alt:""===e.alt_names?e.name:e.alt_names}),(0,m.jsx)("div",{id:e.id,children:(0,m.jsx)("span",{children:e.name})})]},e.id);var n=e.breeds?e.breeds[0].name:"",t=e.url?e.url:"https://s5.favim.com/orig/151213/avatar-kot-profil-gav-Favim.ru-3761175.jpg",r=e.name?e.name:n,a=e.alt_names?e.alt_names:e.name?e.name:n;return(0,m.jsxs)("div",{className:d.Z.grid__item,children:[(0,m.jsx)("img",{src:t,alt:e.alt_names?a:r}),(0,m.jsx)("div",{children:(0,m.jsx)("span",{children:(0,m.jsx)("span",{children:r})})})]},e.id)})):(0,m.jsx)(m.Fragment,{})}),(0,m.jsx)(g,{getItemsCount:t,prevNext:v,getCurrentPage:h,getFilter:p})]})}},2591:function(e,n,t){t.r(n),t.d(n,{default:function(){return Z}});var r=t(2791),a=t(9434),i=t(6871),c=t(244),s=function(e){return e.images.imagesList},l=function(e){return e.images.currentPage},o=function(e){return e.images.filter},u=function(e){return e.images.totalImagesCount},d=function(e){return e.images.isFetching},m=t(2831),g=t(6524),f=t(5705),v=t(722),h=t(8764),p=t(1633),x="GalleryFilterForm_galleryFilterForm__72d6H",j="GalleryFilterForm_update__QBAXH",_="GalleryFilterForm_fieldWrapper__JHNpO",b="GalleryFilterForm_selectField__OtinP",N="GalleryFilterForm_element__eRq-i",y="GalleryFilterForm_black__MBJ7V",C=t(184),F=function(){var e=(0,a.I0)();(0,r.useEffect)((function(){e((0,v.kw)())}),[]);for(var n=(0,a.v9)(o),t=n.order,i=n.type,s=n.filterByBreed,l=n.limitItems,u=[],d=5;d<=20;d+=5)u.push(d);var m=(0,a.v9)(h.SR),g=(0,a.v9)(p.v);return(0,C.jsx)("div",{className:"".concat(x," ").concat(g&&y),children:(0,C.jsx)(f.J9,{enableReinitialize:!0,initialValues:{order:t,type:i,filterByBreed:s,limitItems:l},onSubmit:function(n){e((0,c.bO)(n,0))},children:function(e){return(0,C.jsxs)("form",{onSubmit:e.handleSubmit,children:[(0,C.jsxs)("div",{className:_,children:[(0,C.jsx)("label",{children:"ORDER"}),(0,C.jsxs)(f.gN,{as:"select",name:"order",className:"".concat(b," ").concat(N),onChange:e.handleChange,children:[(0,C.jsx)("option",{value:"RANDOM",children:"Random"}),(0,C.jsx)("option",{value:"DESC",children:"Desc"}),(0,C.jsx)("option",{value:"ASC",children:"Asc"})]})]}),(0,C.jsxs)("div",{className:_,children:[(0,C.jsx)("label",{children:"TYPE"}),(0,C.jsxs)(f.gN,{as:"select",name:"type",className:"".concat(b," ").concat(N),onChange:e.handleChange,children:[(0,C.jsx)("option",{value:"all",children:"All"}),(0,C.jsx)("option",{value:"static",children:"Static"}),(0,C.jsx)("option",{value:"animated",children:"Animated"})]})]}),(0,C.jsxs)("div",{className:_,children:[(0,C.jsx)("label",{children:"BREED"}),(0,C.jsxs)(f.gN,{as:"select",name:"filterByBreed",className:"".concat(b," ").concat(N),onChange:e.handleChange,children:[(0,C.jsx)("option",{value:"",children:"None"}),Object.keys(m).map((function(e){return(0,C.jsx)("option",{value:e,children:m[e]},e)}))]})]}),(0,C.jsxs)("div",{className:_,children:[(0,C.jsx)("label",{children:"LIMIT"}),(0,C.jsx)(f.gN,{component:"select",name:"limitItems",className:"".concat(b," ").concat(N),onChange:e.handleChange,children:u.map((function(e){return(0,C.jsx)("option",{value:"".concat(e),children:"".concat(e," items per page")},"".concat(e))}))}),(0,C.jsx)("button",{type:"submit",className:"".concat(j," ").concat(N),children:"submit"})]})]})}})})},Z=function(){var e=(0,a.v9)(s),n=(0,a.v9)(l),t=(0,a.v9)(o),f=(0,a.I0)(),v=(0,i.s0)(),h=(0,i.TH)();(0,r.useEffect)((function(){var e=t.order,r=t.filterByBreed,a=t.limitItems,i=t.type,c=r?"&breed_id=".concat(r):"";v("../gallery?page=".concat(n,"&limit=").concat(a,"&order=").concat(e,"&mime_types=").concat(function(){switch(i){case"static":return"jpg,png";case"animated":return"gif";default:return"gif,jpg,png"}}()).concat(c),{replace:!0})}),[t,n]),(0,r.useEffect)((function(){var e=new URLSearchParams(h.search),n=Number(e.get("limit")?e.get("limit"):5),t="ASC"===e.get("order")?"ASC":"DESC"===e.get("order")?"DESC":"RANDOM",r=String(e.get("breed_id")?e.get("breed_id"):""),a=function(){switch(e.get("mime_types")){case"gif":return"animated";case"jpg,png":return"static";default:return"all"}}(),i=Number(e.get("page")),s={filterByBreed:r,limitItems:n,order:t,type:a};v("../gallery?page=".concat(i,"&limit=").concat(n,"&order=").concat(t,"&mime_types=").concat(a),{replace:!0}),f((0,c.bO)(s,i))}),[]);var p=(0,a.v9)(d);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(F,{}),p&&(0,C.jsx)(m.Z,{}),!p&&(0,C.jsx)(g.Z,{breedsList:e,getItemsCount:u,photosFromGallery:!0,prevNext:function(e){return"prev"===e?--n:++n,(0,c.bO)(t,n)},getCurrentPage:l,getFilter:o})]})}},4593:function(e,n,t){t.d(n,{Vj:function(){return r},We:function(){return s},Y8:function(){return c},ab:function(){return a},mY:function(){return i}});var r=function(e){return e.voting.breedImage},a=function(e){return e.voting.isFetching},i=function(e){return e.voting.userActions},c=function(e){return e.voting.favourites},s=function(e){return e.voting.favByImageId}}}]);
//# sourceMappingURL=591.c17560a0.chunk.js.map