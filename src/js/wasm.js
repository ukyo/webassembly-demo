fetch("./wast/blur.wasm")
.then(res => res.arrayBuffer())
.then(buffer => {
    let m = Wasm.instantiateModule(new Uint8Array(buffer), {});
    let bytes = new Uint8Array(m.exports.memory);
    let img = new Image();
    img.src = "./img/image.jpg";
    img.onload = () => {
        let canvas = document.querySelector("canvas");
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, 1920, 1080);
        let imageData = ctx.getImageData(0, 0, 1920, 1080);
        const source = imageData.data.slice();
        const render = (radius) => {
            bytes.set(source, 8192);
            if (radius >= 2) {
                let start = Date.now();
                m.exports.blur(1920, 1080, radius);
                console.log(Date.now() - start);
            }
            imageData.data.set(bytes.subarray(8192, 8192 + 1920 * 1080 * 4));
            ctx.putImageData(imageData, 0, 0);          
        };
        render(slider.valueAsNumber);
        slider.onchange = () => {
            render(slider.valueAsNumber);
        };
    };
});