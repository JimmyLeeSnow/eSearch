const { ipcRenderer } = require("electron");
ipcRenderer.on("img", (event, url) => {
    document.getElementById("ding_photo").src = url;
});
ipcRenderer.on("window_name", (event, name) => {
    window_name = name;
});
ipcRenderer.on("window_size", (event, size) => {
    window_size = size;
});
ipcRenderer.on("window_position", (event, position) => {
    window_position = position;
});
窗口透明度 = document.getElementById("透明度");
窗口透明度.oninput = () => {
    document.getElementById("ding_photo").style.opacity = `${窗口透明度.value / 100}`;
};
document.querySelector("#size").oninput = () => {
    document.querySelector("#size_p").innerHTML = `${document.querySelector("#size").value}%`;
    zoom = (document.querySelector("#size").value - 0) / 100;
    ipcRenderer.send("ding_resize", window_name, [
        Math.round(window_size[0] * zoom),
        Math.round(window_size[1] * zoom),
    ]);
};
window.onresize = () => {
    document.querySelector("#size").value = (window.innerWidth / window_size[0]) * 100;
    document.querySelector("#size_p").innerHTML = `${((window.innerWidth / window_size[0]) * 100).toFixed(0)}%`;
};
document.querySelector("#minimize").onclick = () => {
    ipcRenderer.send("ding_minimize", window_name);
};
document.querySelector("#back_position").onclick = () => {
    ipcRenderer.send("ding_back_position", window_name, window_position);
};

document.querySelector("#close").onclick = () => {
    ipcRenderer.send("ding_close", window_name);
};

document.querySelector("img").onmousedown = () => {
    ipcRenderer.send("move", window_name, "down");
};
document.querySelector("img").onmouseup = () => {
    ipcRenderer.send("move", window_name, "up");
};
