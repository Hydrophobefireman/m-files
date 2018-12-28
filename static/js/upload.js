export async function uploadFile(file, filename, iv, key,mtt) {
    const dat = document.getElementById("data");
    const result = JSON.parse(await upload(file, filename, iv,mtt));
    const button0 = document.createElement("div");
    const button = document.createElement("div");
    button.className = button0.className = "btn-k";
    button.style.userSelect = button0.style.userSelect = "unset";
    button0.style.width = button.style.width = "auto";
    button0.style.padding = button.style.padding = "10px";
    button.innerHTML = `File Link: ${absURL("/f/?i=" + encodeURIComponent(result.file))}`;
    button0.textContent = `passkey:  ${key}`;
	button0.style.height="auto";
	button0.style.overflowWrap="break-word";
    dat.appendChild(button);
    dat.appendChild(button0);
}

function absURL(fn) {
    const _ = document.createElement("a");
    _.href = fn;
    return _.href;
}

function upload(data, fn, iv,mimetype) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = (e => {
            if (xhr.readyState === xhr.DONE) {
                resolve(xhr.response);
            }
        });
        xhr.onerror = (e => {
            reject(e);
        });
        xhr.open("POST", "/upload/");
        xhr.setRequestHeader("x-file-name", fn);
        xhr.setRequestHeader("x-init-vector", iv);
		xhr.setRequestHeader("x-mime-type",mimetype);
        xhr.upload.onprogress = reportProgress;
        xhr.send(data);
    });
}

function reportProgress(event) {
    document.getElementById("progress-button").style.visibility = "visible";
    const done = event.loaded;
    const total = event.total;
    const percent = `${(done / total * 100).toFixed(2)}%`;
    document.getElementById("prog-perc").textContent = `${percent} complete`;
    document.getElementById("progress-button").style.width = percent;
}