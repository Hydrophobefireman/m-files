import {
    encrypt,
    decrypt
} from "./filetools.js"
const button = document.getElementById("main");
const file = document.getElementById("file");
button.addEventListener("click", () => {
    file.click()
});
let data;
file.onchange = function () {
	document.getElementById("data").innerHTML=""
    data = file.files[0];
    encrypt(data);
}