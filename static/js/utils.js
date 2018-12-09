export function arrayBufferToBase64(buffer) {
    return new Promise((resolve, _) => {
        const blob = new Blob([buffer], {
            type: 'application/octet-binary'
        });
        const reader = new FileReader();
        reader.onload = evt => {
            const dataurl = evt.target.result;
            resolve(dataurl.substr(dataurl.indexOf(',') + 1));
        };
        reader.readAsDataURL(blob);
    });
}