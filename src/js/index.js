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
        let imageData1 = ctx.getImageData(0, 0, 1920, 1080);
        const source = imageData1.data.slice();
        // let imageData2 = ctx.getImageData(0, 0, 1920, 1080);

        const render = (radius) => {
            bytes.set(source, 8192);
            if (radius >= 2) m.exports.blur(1920, 1080, radius);
            imageData1.data.set(bytes.subarray(8192, 8192 + 1920 * 1080 * 4));
            ctx.putImageData(imageData1, 0, 0);          
        };
        render(slider.value);
        slider.onchange = () => {
            render(slider.valueAsNumber);
        };

        // let idata = {data: iu8buff.slice(8192, 8192 + 1920 * 1080 * 4)}
        // StackBlur.imageDataRGB(imageData2, 0, 0, 1920, 1080, 10);
        // console.log(imageData2.data.every((x, i) => {
        //     return x === subarr[i];
        // }));
        // StackBlur.canvasRGB(canvas, 0, 0, 1920, 1080, 100);
        // imageData.data.set(idata.data);
    };
});