import {
    arrayBufferToBase64
} from "./utils.js"
import {
    uploadFile
} from "./upload.js";
export async function encrypt(_data) {
    const a = new Response(_data)
    const data = await a.arrayBuffer()
    const iv = await crypto.getRandomValues(new Uint8Array(50))
    const _alg = "AES-GCM";
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
    uploadFile(enc, _data.name, await arrayBufferToBase64(iv));
}
export async function decrypt(_data) {}