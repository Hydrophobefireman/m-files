import{XHRpromise,base64ToArrayBuffer}from"./utils.js";import{decrypt}from"./filetools.js";!async function(){const e=await new Promise((e,t)=>{document.getElementById("root").style.display="none";const n=document.createElement("div");n.style.position="absolute",n.style.height="20%",n.style.width="60%",n.style.backgroundColor="#e3e3e3",n.style.borderRadius="20px",n.textContent="Enter Your Password",n.style.textAlign="center",n.style.padding="8px",n.style.left="0",n.style.right=0,n.style.top=0,n.style.bottom=0,n.style.margin="auto",document.body.appendChild(n);const o=document.createElement("input");o.style.outline="none",o.style.borderRadius="20px",o.style.padding="3px",o.style.border="2px solid #e3e3e3",n.appendChild(o);const s=document.createElement("button");s.className="btn-m",s.textContent="Submit",s.style.height="30px",n.appendChild(s),s.addEventListener("click",()=>{const t=o.value.trim();if(t)return n.remove(),e(t)})}),t=document.getElementById("root");t.style.display="block",t.style.textAlign="center";const n=new URLSearchParams(location.search).get("i"),o=new XHRpromise,s=document.createElement("button"),r=document.createElement("div");let l,a;s.className="btn-k",s.style.width="0px",s.style.minWidth="0px",s.style.maxWidth="100%",s.style.display="none",s.style.margin="auto",r.style.margin="auto",t.appendChild(r),t.appendChild(s);try{const e=await o.get(`/req/dl/?f=${encodeURIComponent(n)}`);a=JSON.parse(e.target.response)}catch(e){l=!0}if(a.error&&(l=!0),l)return t.textContent="The file you requested does not exist";const i=a.name,d=await base64ToArrayBuffer(a.iv),c=(await o.get(`/get-file/?f=${n}`,{},function(e){s.style.display="block";const t=e.loaded,n=e.total,o=`${parseInt(t/n*100)}%`;r.textContent=o,s.style.width=o},"arraybuffer")).target.response;if(!c)return t.textContent="An Unknown Error occurred";await decrypt(c,d,e,i)}();