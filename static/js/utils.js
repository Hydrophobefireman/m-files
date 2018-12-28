export function arrayBufferToBase64(buffer) {
    return new Promise((resolve, _) => {
        const blob = new Blob([ buffer ], {
            type: "application/octet-binary"
        });
        const reader = new FileReader();
        reader.onload = (evt => {
            const dataurl = evt.target.result;
            resolve(dataurl.substr(dataurl.indexOf(",") + 1));
        });
        reader.readAsDataURL(blob);
    });
}

export class XHRpromise {
    constructor() {
        
    }
    get(url, headers = {}, onprogress = null,rt="") {
		this.xhr = new XMLHttpRequest();
		this.xhr.responseType=rt
        return new Promise((resolve, reject) => {
            this.xhr.open("GET", url);
            for (const key of Object.keys(headers)) {
                this.xhr.setRequestHeader(key, headers[key]);
            }
            this.xhr.onload = (e => resolve(e));
            this.xhr.onerror = (e => reject(e));
            if (onprogress) {
                this.xhr.onprogress = onprogress;
            }
            this.xhr.send();
        });
    }
}

export async function base64ToArrayBuffer(b64) {
    const data = await fetch(`data:application/octect-stream;base64,${b64}`);
    return await data.arrayBuffer()
}