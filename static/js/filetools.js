import {
    arrayBufferToBase64,base64ToArrayBuffer
} from "./utils.js"
import {
    uploadFile
} from "./upload.js";
const _alg = "AES-GCM";
const root=document.getElementById("root");
export async function encrypt(_data) {
    const a = new Response(_data)
    const data = await a.arrayBuffer()
    const iv = await crypto.getRandomValues(new Uint8Array(50))
    const key = await crypto.subtle.generateKey({
        name: _alg,
        length: 256
    }, true, ["encrypt", "decrypt"]);
    const saveKey = await arrayBufferToBase64(await crypto.subtle.exportKey("raw", key))
    const alg = {
        name: _alg,
        iv
    }
    const enc = await crypto.subtle.encrypt(alg, key, data)
    uploadFile(enc, _data.name, await arrayBufferToBase64(iv),saveKey,_data.type||"application/octet-stream");
}
export async function decrypt(file,iv,_key,name,type="application/octet-stream") {
const keybuf=await base64ToArrayBuffer(_key);
try{const key=await crypto.subtle.importKey("raw",keybuf,_alg,!0,["encrypt","decrypt"]);
const dfile=await crypto.subtle.decrypt({name:_alg,iv},key,file);
const fin=new Blob([dfile],{type:"application/octet-stream"});
const url=URL.createObjectURL(fin);
const link=document.createElement("a");
link.href=url;link.download=name;link.style.margin="20px";
link.textContent="download your file";
root.appendChild(link)
}catch(e){alert(e)}

}