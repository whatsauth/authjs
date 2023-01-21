/*jslint browser */
/*global process */
// /*config in html login page*/
const using_click = true;
const id_user = 'user_name';
const id_pass = 'user_pass';
const id_form = 'loginform';
const id_button = 'login';

const auth_ws = 'd3NzOi8vYXV0aC51bGJpLmFjLmlkL3dzL3doYXRzYXV0aC9xcg==';
const keyword = 'aHR0cHM6Ly93YS5tZS82MjgxMTIwMDAyNzk/dGV4dD13aDR0NWF1dGgw';

const interval = 30;
const maxqrwait = 90;

const id_qr = "whatsauthqr";
const id_counter = "whatsauthcounter";
// /*end of config in html login page*/


const apphost = btoa(document.location.host);
let jsonres;
let rto =0;
let countdown=0;
let uuid;
let wsocket=0;
let mobile;
let waurl;

var refreshbutton=`
<svg onclick="location.reload()" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 496.166 496.166" xml:space="preserve" fill="#000000">
<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
<g id="SVGRepo_iconCarrier"> 
<path style="fill:#32BEA6;" d="M0.005,248.087C0.005,111.063,111.073,0,248.079,0c137.014,0,248.082,111.062,248.082,248.087 c0,137.002-111.068,248.079-248.082,248.079C111.073,496.166,0.005,385.089,0.005,248.087z"></path> 
<path style="fill:#F7F7F7;" d="M400.813,169.581c-2.502-4.865-14.695-16.012-35.262-5.891 c-20.564,10.122-10.625,32.351-10.625,32.351c7.666,15.722,11.98,33.371,11.98,52.046c0,65.622-53.201,118.824-118.828,118.824 c-65.619,0-118.82-53.202-118.82-118.824c0-61.422,46.6-111.946,106.357-118.173v30.793c0,0-0.084,1.836,1.828,2.999 c1.906,1.163,3.818,0,3.818,0l98.576-58.083c0,0,2.211-1.162,2.211-3.436c0-1.873-2.211-3.205-2.211-3.205l-98.248-57.754 c0,0-2.24-1.605-4.23-0.826c-1.988,0.773-1.744,3.481-1.744,3.481v32.993c-88.998,6.392-159.23,80.563-159.23,171.21 c0,94.824,76.873,171.696,171.693,171.696c94.828,0,171.707-76.872,171.707-171.696 C419.786,219.788,412.933,193.106,400.813,169.581z"></path>
</g></svg>
`;

var whatsappbutton=`
<svg onclick="window.open(waurl)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.216 175.552"><defs><linearGradient id="b" x1="85.915" x2="86.535" y1="32.567" y2="137.092" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#57d163"/><stop offset="1" stop-color="#23b33a"/></linearGradient><filter id="a" width="1.115" height="1.114" x="-.057" y="-.057" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="3.531"/></filter></defs><path fill="#b3b3b3" d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0" filter="url(#a)"/><path fill="#fff" d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"/><path fill="url(#linearGradient1780)" d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"/><path fill="url(#b)" d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"/><path fill="#fff" fill-rule="evenodd" d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"/></svg>
`;


if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    mobile = true;
  }else{
    mobile = false;
  }


!function($,r){"use strict";for(var _="length",e=[null,[[10,7,17,13],[1,1,1,1],[]],[[16,10,28,22],[1,1,1,1],[4,16]],[[26,15,22,18],[1,1,2,2],[4,20]],[[18,20,16,26],[2,1,4,2],[4,24]],[[24,26,22,18],[2,1,4,4],[4,28]],[[16,18,28,24],[4,2,4,4],[4,32]],[[18,20,26,18],[4,2,5,6],[4,20,36]],[[22,24,26,22],[4,2,6,6],[4,22,40]],[[22,30,24,20],[5,2,8,8],[4,24,44]],[[26,18,28,24],[5,4,8,8],[4,26,48]],[[30,20,24,28],[5,4,11,8],[4,28,52]],[[22,24,28,26],[8,4,11,10],[4,30,56]],[[22,26,22,24],[9,4,16,12],[4,32,60]],[[24,30,24,20],[9,4,16,16],[4,24,44,64]],[[24,22,24,30],[10,6,18,12],[4,24,46,68]],[[28,24,30,24],[10,6,16,17],[4,24,48,72]],[[28,28,28,28],[11,6,19,16],[4,28,52,76]],[[26,30,28,28],[13,6,21,18],[4,28,54,80]],[[26,28,26,26],[14,7,25,21],[4,28,56,84]],[[26,28,28,30],[16,8,25,20],[4,32,60,88]],[[26,28,30,28],[17,8,25,23],[4,26,48,70,92]],[[28,28,24,30],[17,9,34,23],[4,24,48,72,96]],[[28,30,30,30],[18,9,30,25],[4,28,52,76,100]],[[28,30,30,30],[20,10,32,27],[4,26,52,78,104]],[[28,26,30,30],[21,12,35,29],[4,30,56,82,108]],[[28,28,30,28],[23,12,37,34],[4,28,56,84,112]],[[28,30,30,30],[25,12,40,34],[4,32,60,88,116]],[[28,30,30,30],[26,13,42,35],[4,24,48,72,96,120]],[[28,30,30,30],[28,14,45,38],[4,28,52,76,100,124]],[[28,30,30,30],[29,15,48,40],[4,24,50,76,102,128]],[[28,30,30,30],[31,16,51,43],[4,28,54,80,106,132]],[[28,30,30,30],[33,17,54,45],[4,32,58,84,110,136]],[[28,30,30,30],[35,18,57,48],[4,28,56,84,112,140]],[[28,30,30,30],[37,19,60,51],[4,32,60,88,116,144]],[[28,30,30,30],[38,19,63,53],[4,28,52,76,100,124,148]],[[28,30,30,30],[40,20,66,56],[4,22,48,74,100,126,152]],[[28,30,30,30],[43,21,70,59],[4,26,52,78,104,130,156]],[[28,30,30,30],[45,22,74,62],[4,30,56,82,108,134,160]],[[28,30,30,30],[47,24,77,65],[4,24,52,80,108,136,164]],[[28,30,30,30],[49,25,81,68],[4,28,56,84,112,140,168]]],t=/^\d*$/,n=/^[A-Za-z0-9 $%*+\-./:]*$/,a=/^[A-Z0-9 $%*+\-./:]*$/,o=[],u=[-1],f=0,i=1;f<255;++f)o.push(i),u[i]=f,i=2*i^(i>=128?285:0);for(var l=[[]],c=0;c<30;++c){for(var s=l[c],v=[],x=0;x<=c;++x){var h=x<c?o[s[x]]:0,d=o[(c+(s[x-1]||0))%255];v.push(u[h^d])}l.push(v)}for(var p={},g=0;g<45;++g)p["0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:".charAt(g)]=g;var m=[function($,r){return($+r)%2==0},function($){return $%2==0},function($,r){return r%3==0},function($,r){return($+r)%3==0},function($,r){return(($/2|0)+(r/3|0))%2==0},function($,r){return $*r%2+$*r%3==0},function($,r){return($*r%2+$*r%3)%2==0},function($,r){return(($+r)%2+$*r%3)%2==0}],w=function $(r){return r>6},b=function $(r){var t=e[r],n=16*r*r+128*r+64;return w(r)&&(n-=36),t[2][_]&&(n-=25*t[2][_]*t[2][_]-10*t[2][_]-55),n},F=function $(r,_){var t=-8&b(r),n=e[r];return t-8*n[0][_]*n[1][_]},N=function $(r,_){switch(_){case 1:return r<10?10:r<27?12:14;case 2:return r<10?9:r<27?11:13;case 4:return r<10?8:16;case 8:return r<10?8:r<27?10:12}},A=function $(r,_,e){var t=F(r,e)-4-N(r,_);switch(_){case 1:return(t/10|0)*3+(t%10<4?0:t%10<7?1:2);case 2:return(t/11|0)*2+(t%11<6?0:1);case 4:return t/8|0;case 8:return t/13|0}},C=function $(r,e){switch(r){case 1:if(!e.match(t))return null;return e;case 2:if(!e.match(n))return null;return e.toUpperCase();case 4:if("string"!=typeof e)return e;for(var a=[],o=0;o<e[_];++o){var u=e.charCodeAt(o);u<128?a.push(u):u<2048?a.push(192|u>>6,128|63&u):u<65536?a.push(224|u>>12,128|u>>6&63,128|63&u):a.push(240|u>>18,128|u>>12&63,128|u>>6&63,128|63&u)}return a}},S=function $(r,e,t,n){var a=[],o=0,u=8,f=t[_],i=function $(r,_){if(_>=u){for(a.push(o|r>>(_-=u));_>=8;)a.push(r>>(_-=8)&255);o=0,u=8}_>0&&(o|=(r&(1<<_)-1)<<(u-=_))},l=N(r,e);switch(i(e,4),i(f,l),e){case 1:for(var c=2;c<f;c+=3)i(parseInt(t.substring(c-2,c+1),10),10);i(parseInt(t.substring(c-2),10),[0,4,7][f%3]);break;case 2:for(var s=1;s<f;s+=2)i(45*p[t.charAt(s-1)]+p[t.charAt(s)],11);f%2==1&&i(p[t.charAt(s-1)],6);break;case 4:for(var v=0;v<f;++v)i(t[v],8)}for(i(0,4),u<8&&a.push(o);a[_]+1<n;)a.push(236,17);return a[_]<n&&a.push(236),a},y=function $(r,e){for(var t=r.slice(0),n=r[_],a=e[_],f=0;f<a;++f)t.push(0);for(var i=0;i<n;){var l=u[t[i++]];if(l>=0)for(var c=0;c<a;++c)t[i+c]^=o[(l+e[c])%255]}return t.slice(n)},E=function $(r,e,t){for(var n=[],a=r[_]/e|0,o=0,u=e-r[_]%e,f=0;f<u;++f)n.push(o),o+=a;for(var i=u;i<e;++i)n.push(o),o+=a+1;n.push(o);for(var l=[],c=0;c<e;++c)l.push(y(r.slice(n[c],n[c+1]),t));for(var s=[],v=r[_]/e|0,x=0;x<v;++x)for(var h=0;h<e;++h)s.push(r[n[h]+x]);for(var d=u;d<e;++d)s.push(r[n[d+1]-1]);for(var p=0;p<t[_];++p)for(var g=0;g<e;++g)s.push(l[g][p]);return s},k=function $(r,_,e,t){for(var n=r<<t,a=_-1;a>=0;--a)n>>t+a&1&&(n^=e<<a);return r<<t|n},L=function $(r){for(var t,n=e[r],a=4*(t=r)+17,o=[],u=[],f=0;f<a;++f)o.push([]),u.push([]);var i=function $(r,_,e,t,n){for(var a=0;a<e;++a)for(var f=0;f<t;++f)o[r+a][_+f]=n[a]>>f&1,u[r+a][_+f]=1};i(0,0,9,9,[127,65,93,93,93,65,383,0,64]),i(a-8,0,8,9,[256,127,65,93,93,93,65,127]),i(0,a-8,9,8,[254,130,186,186,186,130,254,0,0]);for(var l=9;l<a-8;++l)o[6][l]=o[l][6]=1&~l,u[6][l]=u[l][6]=1;for(var c=n[2],s=c[_],v=0;v<s;++v)for(var x=0===v||v===s-1?1:0,h=0===v?s-1:s,d=x;d<h;++d)i(c[v],c[d],5,5,[31,17,21,17,31]);if(w(r))for(var p=k(r,6,7973,12),g=0,m=0;m<6;++m)for(var b=0;b<3;++b)o[m][a-11+b]=o[a-11+b][m]=p>>g++&1,u[m][a-11+b]=u[a-11+b][m]=1;return{matrix:o,reserved:u}},R=function $(r,e,t){for(var n=r[_],a=0,o=-1,u=n-1;u>=0;u-=2){6===u&&--u;for(var f=o<0?n-1:0,i=0;i<n;++i){for(var l=u;l>u-2;--l)!e[f][l]&&(r[f][l]=t[a>>3]>>(7&~a)&1,++a);f+=o}o=-o}return r},z=function $(r,e,t){for(var n=m[t],a=r[_],o=0;o<a;++o)for(var u=0;u<a;++u)e[o][u]||(r[o][u]^=n(o,u));return r},G=function $(r,e,t,n){for(var a=r[_],o=21522^k(t<<3|n,5,1335,10),u=0;u<15;++u){var f=[0,1,2,3,4,5,7,8,a-7,a-6,a-5,a-4,a-3,a-2,a-1][u],i=[a-1,a-2,a-3,a-4,a-5,a-6,a-7,a-8,7,5,4,3,2,1,0][u];r[f][8]=r[8][i]=o>>u&1}return r},U=function $(r){for(var e=function $(r){for(var e=0,t=0;t<r[_];++t)r[t]>=5&&(e+=3+(r[t]-5));for(var n=5;n<r[_];n+=2){var a=r[n];r[n-1]===a&&r[n-2]===3*a&&r[n-3]===a&&r[n-4]===a&&(r[n-5]>=4*a||r[n+1]>=4*a)&&(e+=40)}return e},t=r[_],n=0,a=0,o=0;o<t;++o){var u,f,i,l=r[o];u=[0];for(var c=0;c<t;){for(f=0;c<t&&l[c];++f)++c;for(u.push(f),f=0;c<t&&!l[c];++f)++c;u.push(f)}n+=e(u),u=[0];for(var s=0;s<t;){for(i=0;s<t&&r[s][o];++i)++s;for(u.push(i),i=0;s<t&&!r[s][o];++i)++s;u.push(i)}n+=e(u);var v=r[o+1]||[];a+=l[0];for(var x=1;x<t;++x){var h=l[x];a+=h,l[x-1]===h&&v[x]===h&&v[x-1]===h&&(n+=3)}}return n+10*(Math.abs(a/t/t-.5)/.05|0)},D=function $(r,_,t,n,a){var o=e[_],u=S(_,t,r,F(_,n)>>3);u=E(u,o[1][n],l[o[0][n]]);var f=L(_),i=f.matrix,c=f.reserved;if(R(i,c,u),a<0){z(i,c,0),G(i,c,n,0);var s=0,v=U(i);for(z(i,c,0),a=1;a<8;++a){z(i,c,a),G(i,c,n,a);var x=U(i);v>x&&(v=x,s=a),z(i,c,a)}a=s}return z(i,c,a),G(i,c,n,a),i},H={generate:function $(r,e){var n=e||{},o=n.version||-1,u={L:1,M:0,Q:3,H:2}[(n.ecclevel||"L").toUpperCase()],f=n.mode?({numeric:1,alphanumeric:2,octet:4})[n.mode.toLowerCase()]:-1,i="mask"in n?n.mask:-1;if(f<0)f="string"==typeof r?r.match(t)?1:r.match(a)?2:4:4;else if(!(1===f||2===f||4===f))throw"invalid or unsupported mode";if(null===(r=C(f,r)))throw"invalid data format";if(u<0||u>3)throw"invalid ECC level";if(o<0){for(o=1;o<=40&&!(r[_]<=A(o,f,u));++o);if(o>40)throw"too large data"}else if(o<1||o>40)throw"invalid version";if(-1!==i&&(i<0||i>8))throw"invalid mask";return D(r,o,f,u,i)},generateHTML:function $(e,t){for(var n=t||{},a=n.fillcolor?n.fillcolor:"#FFFFFF",o=n.textcolor?n.textcolor:"#000000",u=H.generate(e,n),f=Math.max(n.modulesize||5,.5),i=Math.max(null!==n.margin?n.margin:4,0),l=r.createElement("div"),c=u[_],s=['<table border="0" cellspacing="0" cellpadding="0" style="border:'+f*i+"px solid "+a+";background:"+a+'">'],v=0;v<c;++v){s.push("<tr>");for(var x=0;x<c;++x)s.push('<td style="width:'+f+"px;height:"+f+"px"+(u[v][x]?";background:"+o:"")+'"></td>');s.push("</tr>")}l.className="qrcode";var h=r.createRange();h.selectNodeContents(l);var d=h.createContextualFragment(s.join("")+"</table>");return l.appendChild(d),l},generateSVG:function $(e,t){var n=t||{},a=n.fillcolor?n.fillcolor:"#FFFFFF",o=n.textcolor?n.textcolor:"#000000",u=H.generate(e,n),f=u[_],i=Math.max(n.modulesize||5,.5),l=Math.max(n.margin?n.margin:4,0),c=i*(f+2*l),s=r.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttributeNS(null,"viewBox","0 0 "+c+" "+c),s.setAttributeNS(null,"style","shape-rendering:crispEdges");var v="qrcode"+Date.now();s.setAttributeNS(null,"id",v);var x=r.createDocumentFragment(),h=r.createElementNS("http://www.w3.org/2000/svg","style");h.appendChild(r.createTextNode("#"+v+" .bg{fill:"+a+"}#"+v+" .fg{fill:"+o+"}")),x.appendChild(h);var d=function $(_,e,t,n,a){var o=r.createElementNS("http://www.w3.org/2000/svg","rect")||"";return o.setAttributeNS(null,"class",_),o.setAttributeNS(null,"fill",e),o.setAttributeNS(null,"x",t),o.setAttributeNS(null,"y",n),o.setAttributeNS(null,"width",a),o.setAttributeNS(null,"height",a),o};x.appendChild(d("bg","none",0,0,c));for(var p=l*i,g=0;g<f;++g){for(var m=l*i,w=0;w<f;++w)u[g][w]&&x.appendChild(d("fg","none",m,p,i)),m+=i;p+=i}return s.appendChild(x),s},generatePNG:function $(e,t){var n,a=t||{},o=a.fillcolor||"#FFFFFF",u=a.textcolor||"#000000",f=H.generate(e,a),i=Math.max(a.modulesize||5,.5),l=Math.max(null!==a.margin&&void 0!==a.margin?a.margin:4,0),c=f[_],s=i*(c+2*l),v=r.createElement("canvas");if(v.width=v.height=s,!(n=v.getContext("2d")))throw"canvas support is needed for PNG output";n.fillStyle=o,n.fillRect(0,0,s,s),n.fillStyle=u;for(var x=0;x<c;++x)for(var h=0;h<c;++h)f[x][h]&&n.fillRect(i*(l+h),i*(l+x),i,i);return v.toDataURL()}};$.QRCode=H}("undefined"!=typeof window?window:this,document);


function main() {
  qrController();

}


function connect(id) {
  return new Promise(function(resolve, reject) {
      let wsconn = new WebSocket(atob(auth_ws));
      wsconn.onopen = function() {
        wsconn.send(id);
        console.log("connected and set id");
        resolve(wsconn);
      };
      wsconn.onerror = function(err) {
        console.log("socket error rejected");
        reject(err);
      };
      wsconn.onclose = function (evt) {
        console.log("connection closed");
      };
      wsconn.onmessage = function (evt) {
        let messages = evt.data;
        console.log("incoming message");
        catcher(messages);
      };

  });
}

function openWebSocketSetId(id){
  if (window["WebSocket"]) { //check browser support
    connect(id).then(function(server) {
      wsocket=server;
    }).catch(function(err) {
      console.log("socket error");
    });
  } else {
      alert("Please Update Your browser to the latest version.");
  }
}

function closeWebSocket(){
  if (wsocket !== 0){
    wsocket.close();
  }
}

function sendMessagetoWebSocket(msg){
  if (wsocket.readyState === WebSocket.OPEN){
    wsocket.send(msg);
  }
}

function generatePassword() {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var passwordLength = 17;
  var password = "";
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber +1);
   }
  return password;
}

function generateUUID(){
  let a=crypto.randomUUID()+"."+generatePassword()+"."+crypto.randomUUID()+"."+generatePassword()+"."+crypto.randomUUID()+"."+generatePassword()+"."+crypto.randomUUID()+"."+apphost;
  return a;
}

function getUUID(){
  uuid = getCookie("uuid");
  if (uuid === "") {
    setCookieWithExpireSecond("uuid",generateUUID(),interval);
    uuid = getCookie("uuid");
  }
  return uuid
}

function qrController() {
  setCounterandQR();
  rto++;
  if (rto < maxqrwait){
    setTimeout('qrController()',1000);
  }else{
	var svg = document.getElementById(id_qr);
	svg.innerHTML=refreshbutton;
    document.getElementById(id_counter).innerHTML = "Refresh Your Browser to get QR";
  }
}

function setCounterandQR(){
  document.getElementById(id_counter).innerHTML = countdown;
  if (countdown === 0) {
    closeWebSocket();
    countdown=interval;
    uuid = generateUUID();
    waurl=atob(keyword)+uuid;
    showQR(waurl);
    openWebSocketSetId(uuid);
  }
  countdown--;
}

function makeQrCode(text){
    qr = QRCode.generateSVG(text, {
        ecclevel: "M",
        fillcolor: "#FFFFFF",
        textcolor: "#000000",
        margin: 4,
        modulesize: 8
    });
    var svg = document.getElementById(id_qr);
	if (mobile) {
		svg.innerHTML=whatsappbutton;
	}else{
		svg.replaceChild(qr,svg.firstElementChild);
	}
}

function showQR(text){
  if (typeof text === 'string' && text.length === 0) {
    document.getElementById('qrcode').style.display = 'none';
  } else {
    makeQrCode(text);
  }
}

function setCookieWithExpireDay(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function setCookieWithExpireHour(cname, cvalue, exhour) {
  const d = new Date();
  d.setTime(d.getTime() + (exhour * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function setCookieWithExpireSecond(cname, cvalue, exsecs) {
  const d = new Date();
  d.setTime(d.getTime() + (exsecs * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function deleteCookie(cname) {
  document.cookie = cname + "= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function fillformLogin(resjson){
  document.getElementById(id_user).value = resjson.user_name;
  document.getElementById(id_pass).value = resjson.user_pass;
}

function submitLogin(){
  document.getElementById(id_qr).innerHTML = "Success Login, Please Wait...";
  if (using_click) {
    document.getElementById(id_button).click();
  }else{
    document.getElementById(id_form).submit();
  }
}

function catcher(result){
  if (result.length > 2){
    jsonres = JSON.parse(result);
    console.log("catcher runner");
    setCookieWithExpireHour("login",jsonres.login,2);
    fillformLogin(jsonres);
    submitLogin();
  }
}


main();
