export async function uploadFile(e,t,n,o,s){const r=document.getElementById("data"),d=JSON.parse(await upload(e,t,n,s)),a=document.createElement("div"),l=document.createElement("div");l.className=a.className="btn-k",l.style.userSelect=a.style.userSelect="unset",a.style.width=l.style.width="auto",a.style.padding=l.style.padding="10px",l.innerHTML=`File Link: ${absURL("/f/?i="+encodeURIComponent(d.file))}`,a.textContent=`passkey:  ${o}`,a.style.height="auto",a.style.overflowWrap="break-word",r.appendChild(l),r.appendChild(a)}function absURL(e){const t=document.createElement("a");return t.href=e,t.href}function upload(e,t,n,o){return new Promise((s,r)=>{const d=new XMLHttpRequest;d.onload=(e=>{d.readyState===d.DONE&&s(d.response)}),d.onerror=(e=>{r(e)}),d.open("POST","/upload/"),d.setRequestHeader("x-file-name",t),d.setRequestHeader("x-init-vector",n),d.setRequestHeader("x-mime-type",o),d.upload.onprogress=reportProgress,d.send(e)})}function reportProgress(e){document.getElementById("progress-button").style.visibility="visible";const t=`${(e.loaded/e.total*100).toFixed(2)}%`;document.getElementById("prog-perc").textContent=`${t} complete`,document.getElementById("progress-button").style.width=t}