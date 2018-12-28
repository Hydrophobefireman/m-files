import { XHRpromise, base64ToArrayBuffer } from "./utils.js";

import { decrypt } from "./filetools.js";

(async function() {
    function getKey() {
        return new Promise((resolve, reject) => {
            document.getElementById("root").style.display = "none";
            const div = document.createElement("div");
            div.style.position = "absolute";
            div.style.height = "20%";
            div.style.width = "60%";
            div.style.backgroundColor = "#e3e3e3";
            div.style.borderRadius = "20px";
            div.textContent = "Enter Your Password";
            div.style.textAlign = "center";
            div.style.padding = "8px";
            div.style.left = "0";
            div.style.right = 0;
            div.style.top = 0;
            div.style.bottom = 0;
            div.style.margin = "auto";
            document.body.appendChild(div);
            const inp = document.createElement("input");
            inp.style.outline = "none";
            inp.style.borderRadius = "20px";
            inp.style.padding = "3px";
            inp.style.border = "2px solid #e3e3e3";
            div.appendChild(inp);
            const bt = document.createElement("button");
            bt.className = "btn-m";
            bt.textContent = "Submit";
            bt.style.height = "30px";
            div.appendChild(bt);
            bt.addEventListener("click", () => {
                const k = inp.value.trim();
                if (k) {div.remove()
                    return resolve(k);
                }
            });
        });
    }
    const key = (await getKey());
    const root = document.getElementById("root");
    root.style.display = "block";
    root.style.textAlign = "center";
    const params = new URLSearchParams(location.search);
    const id = params.get("i");
    const xhr = new XHRpromise();
    const bar = document.createElement("button");
    const drv = document.createElement("div");
    bar.className = "btn-k";
    bar.style.width = "0px";
    bar.style.minWidth = "0px";
    bar.style.maxWidth = "100%";
    bar.style.display = "none";
    bar.style.margin = "auto";
    drv.style.margin = "auto";
    root.appendChild(drv);
    root.appendChild(bar);
    function reportHook(e) {
        bar.style.display = "block";
        const done = e.loaded, total = e.total;
        const percent = parseInt(done / total * 100);
        const _ = `${percent}%`;
        drv.textContent = _;
        bar.style.width = _;
    }
    let err, resp;
    try {
        const data = await xhr.get(`/req/dl/?f=${encodeURIComponent(id)}`);
        resp = JSON.parse(data.target.response);
    } catch (e) {
        err = !0;
    }
    if (resp.error) {
        err = !0;
    }
    if (err) {
        return root.textContent = "The file you requested does not exist";
    }
    const name = resp.name;
	//const tpe = resp.mt;
    const iv = await base64ToArrayBuffer(resp.iv);
    const evt = await xhr.get(`/get-file/?f=${id}`, {}, reportHook, "arraybuffer");
    const file = evt.target.response;
    if (!file) {
        return root.textContent = "An Unknown Error occurred";
    }
    const dataF = await decrypt(file, iv, key,name);
})();