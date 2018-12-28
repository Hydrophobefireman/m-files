import{arrayBufferToBase64,base64ToArrayBuffer}from"./utils.js";import{uploadFile}from"./upload.js";const _alg="AES-GCM",root=document.getElementById("root");export async function encrypt(t){const e=new Response(t),a=await e.arrayBuffer(),r=await crypto.getRandomValues(new Uint8Array(50)),o=await crypto.subtle.generateKey({name:_alg,length:256},!0,["encrypt","decrypt"]),n=await arrayBufferToBase64(await crypto.subtle.exportKey("raw",o)),c={name:_alg,iv:r},p=await crypto.subtle.encrypt(c,o,a);uploadFile(p,t.name,await arrayBufferToBase64(r),n,t.type||"application/octet-stream")}export async function decrypt(t,e,a,r,o="application/octet-stream"){const n=await base64ToArrayBuffer(a);try{const a=await crypto.subtle.importKey("raw",n,_alg,!0,["encrypt","decrypt"]),o=await crypto.subtle.decrypt({name:_alg,iv:e},a,t),c=new Blob([o],{type:"application/octet-stream"}),p=URL.createObjectURL(c),y=document.createElement("a");y.href=p,y.download=r,y.style.margin="20px",y.textContent="download your file",root.appendChild(y)}catch(t){alert(t)}}