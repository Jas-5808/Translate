const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Description-5auFE1Wt.js","assets/index-DMOjk18q.js","assets/index-Cn18mLjp.css","assets/LanguageSwitcher-CdE5WNON.js","assets/react-select.esm-D7xumVL8.js","assets/defineProperty-DJACW-dl.js","assets/typeof-QjJsDpFa.js","assets/Helmet-w-JA7pje.js"])))=>i.map(i=>d[i]);
import{r as h,_ as R,u as ie,a as ue,j as t,c as d}from"./index-DMOjk18q.js";import{S as q}from"./react-select.esm-D7xumVL8.js";import{F,a as $}from"./index-DnKkpXTu.js";import"./defineProperty-DJACW-dl.js";import"./typeof-QjJsDpFa.js";var P={},ce=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var a=document.activeElement,l=[],n=0;n<e.rangeCount;n++)l.push(e.getRangeAt(n));switch(a.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":a.blur();break;default:a=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||l.forEach(function(r){e.addRange(r)}),a&&a.focus()}},pe=ce,G={"text/plain":"Text","text/html":"Url",default:"Text"},fe="Copy to clipboard: #{key}, Enter";function de(e){var a=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,a)}function he(e,a){var l,n,r,s,f,i,u=!1;a||(a={}),l=a.debug||!1;try{r=pe(),s=document.createRange(),f=document.getSelection(),i=document.createElement("span"),i.textContent=e,i.ariaHidden="true",i.style.all="unset",i.style.position="fixed",i.style.top=0,i.style.clip="rect(0, 0, 0, 0)",i.style.whiteSpace="pre",i.style.webkitUserSelect="text",i.style.MozUserSelect="text",i.style.msUserSelect="text",i.style.userSelect="text",i.addEventListener("copy",function(v){if(v.stopPropagation(),a.format)if(v.preventDefault(),typeof v.clipboardData>"u"){l&&console.warn("unable to use e.clipboardData"),l&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var b=G[a.format]||G.default;window.clipboardData.setData(b,e)}else v.clipboardData.clearData(),v.clipboardData.setData(a.format,e);a.onCopy&&(v.preventDefault(),a.onCopy(v.clipboardData))}),document.body.appendChild(i),s.selectNodeContents(i),f.addRange(s);var m=document.execCommand("copy");if(!m)throw new Error("copy command was unsuccessful");u=!0}catch(v){l&&console.error("unable to copy using execCommand: ",v),l&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(a.format||"text",e),a.onCopy&&a.onCopy(window.clipboardData),u=!0}catch(b){l&&console.error("unable to copy using clipboardData: ",b),l&&console.error("falling back to prompt"),n=de("message"in a?a.message:fe),window.prompt(n,e)}}finally{f&&(typeof f.removeRange=="function"?f.removeRange(s):f.removeAllRanges()),i&&document.body.removeChild(i),r()}return u}var ve=he;function T(e){"@babel/helpers - typeof";return T=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},T(e)}Object.defineProperty(P,"__esModule",{value:!0});P.CopyToClipboard=void 0;var O=J(h),ge=J(ve),be=["text","onCopy","options","children"];function J(e){return e&&e.__esModule?e:{default:e}}function W(e,a){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),l.push.apply(l,n)}return l}function V(e){for(var a=1;a<arguments.length;a++){var l=arguments[a]!=null?arguments[a]:{};a%2?W(Object(l),!0).forEach(function(n){N(e,n,l[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):W(Object(l)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(l,n))})}return e}function ye(e,a){if(e==null)return{};var l=me(e,a),n,r;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],!(a.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}function me(e,a){if(e==null)return{};var l={},n=Object.keys(e),r,s;for(s=0;s<n.length;s++)r=n[s],!(a.indexOf(r)>=0)&&(l[r]=e[r]);return l}function xe(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}function je(e,a){for(var l=0;l<a.length;l++){var n=a[l];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function Ce(e,a,l){return a&&je(e.prototype,a),Object.defineProperty(e,"prototype",{writable:!1}),e}function _e(e,a){if(typeof a!="function"&&a!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(a&&a.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),a&&E(e,a)}function E(e,a){return E=Object.setPrototypeOf||function(n,r){return n.__proto__=r,n},E(e,a)}function we(e){var a=Oe();return function(){var n=k(e),r;if(a){var s=k(this).constructor;r=Reflect.construct(n,arguments,s)}else r=n.apply(this,arguments);return Se(this,r)}}function Se(e,a){if(a&&(T(a)==="object"||typeof a=="function"))return a;if(a!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return X(e)}function X(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Oe(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function k(e){return k=Object.setPrototypeOf?Object.getPrototypeOf:function(l){return l.__proto__||Object.getPrototypeOf(l)},k(e)}function N(e,a,l){return a in e?Object.defineProperty(e,a,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[a]=l,e}var Y=function(e){_e(l,e);var a=we(l);function l(){var n;xe(this,l);for(var r=arguments.length,s=new Array(r),f=0;f<r;f++)s[f]=arguments[f];return n=a.call.apply(a,[this].concat(s)),N(X(n),"onClick",function(i){var u=n.props,m=u.text,v=u.onCopy,b=u.children,z=u.options,x=O.default.Children.only(b),_=(0,ge.default)(m,z);v&&v(m,_),x&&x.props&&typeof x.props.onClick=="function"&&x.props.onClick(i)}),n}return Ce(l,[{key:"render",value:function(){var r=this.props;r.text,r.onCopy,r.options;var s=r.children,f=ye(r,be),i=O.default.Children.only(s);return O.default.cloneElement(i,V(V({},f),{},{onClick:this.onClick}))}}]),l}(O.default.PureComponent);P.CopyToClipboard=Y;N(Y,"defaultProps",{onCopy:void 0,options:void 0});var ke=P,D=ke.CopyToClipboard;D.CopyToClipboard=D;var Z=D;const j=[{value:"auto",label:"Detect Language"},{value:"en",label:"English"},{value:"ru",label:"Russian"},{value:"uz",label:"Uzbek"},{value:"fr",label:"French"},{value:"es",label:"Spanish"},{value:"af",label:"Afrikaans"},{value:"sq",label:"Albanian"},{value:"am",label:"Amharic"},{value:"ar",label:"Arabic"},{value:"hy",label:"Armenian"},{value:"az",label:"Azerbaijani"},{value:"eu",label:"Basque"},{value:"be",label:"Belarusian"},{value:"bn",label:"Bengali"},{value:"bs",label:"Bosnian"},{value:"bg",label:"Bulgarian"},{value:"ca",label:"Catalan"},{value:"ceb",label:"Cebuano"},{value:"ny",label:"Chichewa"},{value:"zh",label:"Chinese"},{value:"zh-CN",label:"Chinese (Simplified)"},{value:"zh-TW",label:"Chinese (Traditional)"},{value:"co",label:"Corsican"},{value:"hr",label:"Croatian"},{value:"cs",label:"Czech"},{value:"da",label:"Danish"},{value:"nl",label:"Dutch"},{value:"eo",label:"Esperanto"},{value:"et",label:"Estonian"},{value:"tl",label:"Filipino"},{value:"fi",label:"Finnish"},{value:"fy",label:"Frisian"},{value:"gl",label:"Galician"},{value:"ka",label:"Georgian"},{value:"de",label:"German"},{value:"el",label:"Greek"},{value:"gu",label:"Gujarati"},{value:"ht",label:"Haitian Creole"},{value:"ha",label:"Hausa"},{value:"haw",label:"Hawaiian"},{value:"iw",label:"Hebrew"},{value:"hi",label:"Hindi"},{value:"hmn",label:"Hmong"},{value:"hu",label:"Hungarian"},{value:"is",label:"Icelandic"},{value:"ig",label:"Igbo"},{value:"id",label:"Indonesian"},{value:"ga",label:"Irish"},{value:"it",label:"Italian"},{value:"ja",label:"Japanese"},{value:"jw",label:"Javanese"},{value:"kn",label:"Kannada"},{value:"kk",label:"Kazakh"},{value:"km",label:"Khmer"},{value:"ko",label:"Korean"},{value:"ku",label:"Kurdish (Kurmanji)"},{value:"ky",label:"Kyrgyz"},{value:"lo",label:"Lao"},{value:"la",label:"Latin"},{value:"lv",label:"Latvian"},{value:"lt",label:"Lithuanian"},{value:"lb",label:"Luxembourgish"},{value:"mk",label:"Macedonian"},{value:"mg",label:"Malagasy"},{value:"ms",label:"Malay"},{value:"ml",label:"Malayalam"},{value:"mt",label:"Maltese"},{value:"mi",label:"Maori"},{value:"mr",label:"Marathi"},{value:"mn",label:"Mongolian"},{value:"my",label:"Myanmar (Burmese)"},{value:"ne",label:"Nepali"},{value:"no",label:"Norwegian"},{value:"ps",label:"Pashto"},{value:"fa",label:"Persian"},{value:"pl",label:"Polish"},{value:"pt",label:"Portuguese"},{value:"pa",label:"Punjabi"},{value:"ro",label:"Romanian"},{value:"sm",label:"Samoan"},{value:"gd",label:"Scots Gaelic"},{value:"sr",label:"Serbian"},{value:"st",label:"Sesotho"},{value:"sn",label:"Shona"},{value:"sd",label:"Sindhi"},{value:"si",label:"Sinhala"},{value:"sk",label:"Slovak"},{value:"sl",label:"Slovenian"},{value:"so",label:"Somali"},{value:"su",label:"Sundanese"},{value:"sw",label:"Swahili"},{value:"sv",label:"Swedish"},{value:"tg",label:"Tajik"},{value:"ta",label:"Tamil"},{value:"te",label:"Telugu"},{value:"th",label:"Thai"},{value:"tr",label:"Turkish"},{value:"uk",label:"Ukrainian"},{value:"ur",label:"Urdu"},{value:"vi",label:"Vietnamese"},{value:"cy",label:"Welsh"},{value:"xh",label:"Xhosa"},{value:"yi",label:"Yiddish"},{value:"yo",label:"Yoruba"},{value:"zu",label:"Zulu"}],Pe=h.lazy(()=>R(()=>import("./Description-5auFE1Wt.js"),__vite__mapDeps([0,1,2]))),Le=h.lazy(()=>R(()=>import("./LanguageSwitcher-CdE5WNON.js"),__vite__mapDeps([3,1,2,4,5,6]))),Te=h.lazy(()=>R(()=>import("./Helmet-w-JA7pje.js"),__vite__mapDeps([7,1,2])).then(e=>({default:e.Helmet}))),Ie=()=>{const[e,a]=h.useState(j[0]),[l,n]=h.useState(""),[r,s]=h.useState([{id:1,targetLanguage:j.find(o=>o.value==="en"),translation:""}]),[f,i]=h.useState(!1);h.useState(null);const{t:u}=ie(),m=ue(),[v,b]=h.useState({sourceLanguage:!1,targetLanguage:!1}),x=m.pathname.split("/")[1]||"en",_=h.useRef([]),C=h.useRef(null),Q=o=>new DOMParser().parseFromString(o,"text/html").body.textContent,L=o=>{const c=_.current[o];c&&(c.style.height="auto",c.style.height=`${c.scrollHeight}px`)},ee=o=>{n(o.target.value),e.value==="auto"&&o.target.value.trim()&&le(o.target.value)},ae=o=>{a(o)},te=(o,c)=>{const p=[...r];p[o].targetLanguage=c,s(p)},le=async o=>{const p="https://translation.googleapis.com/language/translate/v2/detect?key=AIzaSyCiConrcZiaumOPZRNOxbryaUH-3udEODc";try{const B=(await(await fetch(p,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({q:o})})).json()).data.detections[0][0].language,w=j.find(S=>S.value===B);w&&a(w)}catch(g){console.error("Ошибка определения языка:",g)}},ne=()=>{r.length<10&&s([...r,{id:r.length+1,targetLanguage:j.find(o=>o.value==="en"),translation:""}])},re=async()=>{if(!e||!l.trim()){alert("Пожалуйста, выберите исходный язык и введите текст.");return}const c="https://translation.googleapis.com/language/translate/v2?key=AIzaSyCiConrcZiaumOPZRNOxbryaUH-3udEODc",p=l.split(`
`),g=await Promise.all(r.map(async y=>{if(y.targetLanguage){const w=(await Promise.all(p.map(async S=>{const H=e.value,K=y.targetLanguage.value;if(H===K)return S;const oe={q:S.trim(),source:H,target:K};try{const se=await(await fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(oe)})).json();return Q(se.data.translations[0].translatedText)}catch(U){return console.error("Ошибка перевода строки:",U),l}}))).join(`
`);return{...y,translation:w}}return y}));s(g)},A=o=>{console.log("Текст скопирован:",o)},I=(o,c,p)=>{if(v[p])window.speechSynthesis.cancel(),b(g=>({...g,[p]:!1}));else{const g=new SpeechSynthesisUtterance(o);g.lang=c,g.onend=()=>{b(y=>({...y,[p]:!1}))},window.speechSynthesis.speak(g),b(y=>({...y,[p]:!0}))}};h.useEffect(()=>{r.forEach((o,c)=>L(c)),C.current&&(C.current.style.height="auto",C.current.style.height=`${C.current.scrollHeight}px`)},[r,l]);const M=o=>o.replace(/\s+/g,"").length;return t.jsxs("div",{children:[t.jsxs("div",{className:d.title,children:[t.jsxs("div",{className:d.title_content,children:[t.jsx("h3",{children:u("free_online_translator")}),t.jsx(Le,{})]}),t.jsx("ul",{children:t.jsx("li",{children:t.jsxs("a",{href:"/file",children:[t.jsx("i",{className:"fa fa-file-text-o"}),t.jsxs("p",{children:[u("translate_file")," ",t.jsx("span",{children:".pdf, .docx, .txt"})," "]})]})})})]}),t.jsxs("div",{className:d.language_box,children:[t.jsxs("div",{className:d.microphone,children:[t.jsx(q,{value:e,onChange:ae,options:j,className:d.languageSelector}),t.jsxs("div",{className:d.text_box,children:[t.jsx("textarea",{ref:C,value:l,onChange:ee,onInput:()=>L(0),rows:"1",cols:"50",placeholder:u("placeholder_enter_text"),style:{resize:"none",overflow:"hidden",width:"100%"}}),t.jsxs("div",{className:d.equipments,children:[t.jsxs("p",{children:[u("char_count"),M(l)," "]}),t.jsxs("div",{className:d.eq_leftside,children:[t.jsx(Z.CopyToClipboard,{text:l,onCopy:()=>A(l),children:t.jsx("button",{children:t.jsx(F,{})})}),t.jsxs("button",{onClick:()=>I(l,e.value,"sourceLanguage"),children:[t.jsx($,{})," ",f]})]})]})]})]}),r.map((o,c)=>t.jsxs("div",{className:d.microphone,children:[t.jsx(q,{value:o.targetLanguage,onChange:p=>te(c,p),options:j,className:d.languageSelector}),t.jsxs("div",{className:d.text_box,children:[t.jsx("textarea",{ref:p=>_.current[c]=p,value:o.translation,onChange:p=>{const g=[...r];g[c].translation=p.target.value,s(g)},onInput:()=>L(c),rows:"4",cols:"50",placeholder:u("translated_text"),style:{resize:"none",width:"100%"}}),t.jsxs("div",{className:d.equipments,children:[t.jsxs("p",{children:[u("char_count"),M(o.translation)," "]}),t.jsxs("div",{className:d.eq_leftside,children:[t.jsx(Z.CopyToClipboard,{text:o.translation,onCopy:()=>A(o.translation),children:t.jsx("button",{children:t.jsx(F,{})})}),t.jsxs("button",{onClick:()=>I(o.translation,o.targetLanguage.value,"targetLanguage"),children:[t.jsx($,{})," ",f]})]})]})]})]},o.id))]}),t.jsxs("div",{class:"d-flex gap-3 mb-3",children:[t.jsx("button",{onClick:ne,className:d.uploadButton2,children:u("add_language")}),t.jsx("button",{onClick:re,className:d.uploadButton,children:u("translate")})]}),t.jsx(h.Suspense,{fallback:null,children:t.jsx(Pe,{title:"multilingual_translator",description:"multilingual_description"})}),t.jsx(h.Suspense,{fallback:null,children:t.jsxs(Te,{children:[t.jsx("html",{lang:x}),t.jsx("title",{children:u("multilingual_translator")}),t.jsx("meta",{name:"description",content:u("multilingual_description")}),t.jsx("meta",{name:"keywords",content:u("multilingual_page_keywords")}),t.jsx("link",{rel:"alternate",href:"https://sneptool.com/en/",hrefLang:"en"}),t.jsx("link",{rel:"alternate",href:"https://sneptool.com/ru/",hrefLang:"ru"}),t.jsx("link",{rel:"alternate",href:"https://sneptool.com/uz/",hrefLang:"uz"}),t.jsx("link",{rel:"alternate",href:"https://sneptool.com/tr/",hrefLang:"tr"}),t.jsx("link",{rel:"alternate",href:"https://sneptool.com/ky/",hrefLang:"ky"}),t.jsx("link",{rel:"alternate",href:"https://sneptool.com/fr/",hrefLang:"fr"}),t.jsx("link",{rel:"alternate",href:"https://sneptool.com/es/",hrefLang:"es"}),t.jsx("link",{rel:"alternate",href:"https://sneptool.com/de/",hrefLang:"de"}),t.jsx("link",{rel:"alternate",href:"https://sneptool.com/zh/",hrefLang:"zh"}),t.jsx("link",{rel:"alternate",href:"https://sneptool.com/ar/",hrefLang:"ar"}),t.jsx("link",{rel:"alternate",href:"https://sneptool.com/cs/",hrefLang:"cs"})]})})]})};export{Ie as default};