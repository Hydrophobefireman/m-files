export async function uploadFile(file, filename, iv) {
    console.log(await upload(file, filename, iv))
};

function upload(data, fn, iv) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest;
        xhr.onload = e => {
            if (xhr.readyState === xhr.DONE) {
                resolve(xhr.response)
            }
        };
        xhr.onerror = e => {
            reject(e)
        };

        xhr.open("POST", "/upload/");
        xhr.setRequestHeader("x-file-name", fn)
        xhr.setRequestHeader("x-init-vector", iv)
        xhr.upload.onprogress = reportProgress
        xhr.send(data)
    });
}
/**
 * 
 * @param {ProgressEvent} event 
 */
function reportProgress(event) {
    document.getElementById("progress-button").style.visibility = "visible";
    const done = event.loaded;
    const total = event.total;
    const percent = `${((done / total) * 100).toFixed(2)}%`
    document.getElementById("prog-perc").textContent = `${percent} complete`;
    document.getElementById("progress-button").style.width = percent;

}