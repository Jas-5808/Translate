const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LanguageSwitcher-CdE5WNON.js","assets/index-DMOjk18q.js","assets/index-Cn18mLjp.css","assets/react-select.esm-D7xumVL8.js","assets/defineProperty-DJACW-dl.js","assets/typeof-QjJsDpFa.js","assets/Helmet-w-JA7pje.js","assets/Description-5auFE1Wt.js"])))=>i.map(i=>d[i]);
import{r,_ as f,u as F,a as H,j as e,c as u}from"./index-DMOjk18q.js";import{F as S}from"./index-DnKkpXTu.js";const O=r.lazy(()=>f(()=>import("./LanguageSwitcher-CdE5WNON.js"),__vite__mapDeps([0,1,2,3,4,5]))),V=r.lazy(()=>f(()=>import("./Helmet-w-JA7pje.js"),__vite__mapDeps([6,1,2])).then(x=>({default:x.Helmet}))),B=r.lazy(()=>f(()=>import("./Description-5auFE1Wt.js"),__vite__mapDeps([7,1,2]))),Y=()=>{const x=r.useRef(null),[m,j]=r.useState("#ffffff"),[b,k]=r.useState("rgb(255, 255, 255)"),[c,_]=r.useState(null),[w,C]=r.useState(!1),[g,I]=r.useState(1),[v,R]=r.useState({x:0,y:0}),[y,E]=r.useState(!1),{t:h}=F(),$=H(),z=$.pathname.split("/")[1]||"en",D=n=>{var i;const t=(i=n.target.files)==null?void 0:i[0];if(t){const o=x.current,a=o==null?void 0:o.getContext("2d"),l=new Image;l.src=URL.createObjectURL(t),l.onload=()=>{o&&a&&(_(l),o.width=l.width,o.height=l.height,a.drawImage(l,0,0))}}},L=n=>{var i;const t=(i=n.clipboardData)==null?void 0:i.items;if(t)for(let o=0;o<t.length;o++){const a=t[o];if(a.type.indexOf("image")===0){const l=a.getAsFile();if(l){const s=new Image,p=new FileReader;p.onloadend=()=>{s.src=p.result,s.onload=()=>{const d=x.current,P=d==null?void 0:d.getContext("2d");d&&P&&(_(s),d.width=s.width,d.height=s.height,P.drawImage(s,0,0))}},p.readAsDataURL(l)}}}};r.useEffect(()=>(document.addEventListener("paste",L),()=>{document.removeEventListener("paste",L)}),[]);const A=n=>{if(!c||w)return;const t=x.current,i=t==null?void 0:t.getContext("2d"),o=t==null?void 0:t.getBoundingClientRect();if(o&&i){const a=(n.clientX-o.left)*(c.width/o.width),l=(n.clientY-o.top)*(c.height/o.height),s=i.getImageData(a,l,1,1).data,p=`#${((1<<24)+(s[0]<<16)+(s[1]<<8)+s[2]).toString(16).slice(1)}`,d=`rgb(${s[0]}, ${s[1]}, ${s[2]})`;j(p),k(d),R({x:a,y:l}),y||E(!0)}},M=n=>{if(c)if(w)C(!1);else{C(!0);const t=x.current,i=t==null?void 0:t.getContext("2d"),o=t==null?void 0:t.getBoundingClientRect();if(o&&i){const a=(n.clientX-o.left)*(c.width/o.width),l=(n.clientY-o.top)*(c.height/o.height),s=i.getImageData(a,l,1,1).data,p=`#${((1<<24)+(s[0]<<16)+(s[1]<<8)+s[2]).toString(16).slice(1)}`,d=`rgb(${s[0]}, ${s[1]}, ${s[2]})`;j(p),k(d)}}},N=n=>{const t=n==="hex"?m:b;navigator.clipboard.writeText(t).then(()=>{alert(`Copied ${t} to clipboard!`)})},T=n=>{n.preventDefault();const t=g+n.deltaY*-.01;I(Math.min(Math.max(1,t),3))};return e.jsxs("div",{className:"container p-0",children:[e.jsxs("div",{className:u.title,children:[e.jsxs("div",{className:u.title_content,children:[e.jsx("h3",{children:h("define_pixel_color")}),e.jsx(r.Suspense,{fallback:null,children:e.jsx(O,{})})]}),e.jsx("ul",{children:e.jsx("li",{children:e.jsxs("a",{href:"/colorMixer",children:[e.jsx("i",{className:"material-symbols-outlined",translate:"no",children:"colors"}),e.jsxs("p",{children:[h("color_blending")," ",e.jsx("span",{children:h("up_to_10_colors")})," "]})]})})})]}),e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"position-relative",onWheel:T,children:e.jsx("canvas",{ref:x,onMouseMove:A,onClick:M,className:"w-100 border rounded shadow bg-white",style:{maxHeight:"500px",cursor:"crosshair"}})})}),e.jsx("div",{className:"col-md-4",children:e.jsxs("div",{className:"p-3 border rounded shadow bg-white",children:[e.jsx("p",{children:h("color_picker_result")}),e.jsx("div",{className:"mb-3",style:{height:"50px",backgroundColor:m,border:"1px solid #ddd"}}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"HEX:"})," ",e.jsx("span",{children:m})]}),e.jsx("button",{className:"btn btn-sm btn-secondary",onClick:()=>N("hex"),children:e.jsx(S,{})})]}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"RGB:"})," ",e.jsx("span",{children:b})]}),e.jsx("button",{className:"btn btn-sm btn-secondary",onClick:()=>N("rgb"),children:e.jsx(S,{})})]}),e.jsx("div",{children:c&&y&&e.jsx("div",{className:"zoomed-area",style:{position:"static",marginTop:"20px",width:"150px",height:"150px",backgroundImage:`url(${c.src})`,backgroundSize:`${c.width*g}px ${c.height*g}px`,backgroundPosition:`-${v.x*g-75}px -${v.y*g-75}px`,border:"2px solid #ccc",borderRadius:"8px",boxShadow:"0px 0px 10px rgba(0,0,0,0.2)",pointerEvents:"none",transition:"opacity 0.3s ease-in-out",display:"flex",justifyContent:"center",alignItems:"center"},children:e.jsx("div",{style:{fontSize:"36px",color:"white",pointerEvents:"none"},children:"+"})})})]})})]}),e.jsxs("div",{className:"mt-5",children:[e.jsx("input",{type:"file",accept:"image/*",id:"upload",onChange:D,className:"d-none"}),e.jsx("label",{htmlFor:"upload",className:u.uploadButton,children:h("upload_image")})]}),e.jsx(r.Suspense,{fallback:null,children:e.jsx(B,{title:"select_color_from_image",description:"color_picker_description"})}),e.jsx(r.Suspense,{fallback:null,children:e.jsxs(V,{children:[e.jsx("html",{lang:z}),e.jsx("title",{children:h("select_color_from_image")}),e.jsx("meta",{name:"description",content:h("color_picker_description")}),e.jsx("meta",{name:"keywords",content:h("colorPicker_page_keywords")}),e.jsx("link",{rel:"alternate",href:"https://sneptool.com/en/colorPicker",hrefLang:"en"}),e.jsx("link",{rel:"alternate",href:"https://sneptool.com/ru/colorPicker",hrefLang:"ru"}),e.jsx("link",{rel:"alternate",href:"https://sneptool.com/uz/colorPicker",hrefLang:"uz"}),e.jsx("link",{rel:"alternate",href:"https://sneptool.com/tr/colorPicker",hrefLang:"tr"}),e.jsx("link",{rel:"alternate",href:"https://sneptool.com/ky/colorPicker",hrefLang:"ky"}),e.jsx("link",{rel:"alternate",href:"https://sneptool.com/fr/colorPicker",hrefLang:"fr"}),e.jsx("link",{rel:"alternate",href:"https://sneptool.com/es/colorPicker",hrefLang:"es"}),e.jsx("link",{rel:"alternate",href:"https://sneptool.com/de/colorPicker",hrefLang:"de"}),e.jsx("link",{rel:"alternate",href:"https://sneptool.com/zh/colorPicker",hrefLang:"zh"}),e.jsx("link",{rel:"alternate",href:"https://sneptool.com/ar/colorPicker",hrefLang:"ar"}),e.jsx("link",{rel:"alternate",href:"https://sneptool.com/cs/colorPicker",hrefLang:"cs"})]})})]})};export{Y as default};