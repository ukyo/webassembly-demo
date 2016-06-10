let img = new Image();
img.src = "./img/image.jpg";
img.onload = () => {
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, 1920, 1080);
    let imageData = ctx.getImageData(0, 0, 1920, 1080);
    const source = imageData.data.slice();
    const render = (radius) => {
        imageData.data.set(source);
        if (radius >= 2) {
            let start = Date.now();
            StackBlur.imageDataRGB(imageData, 0, 0, 1920, 1080, radius);
            console.log(Date.now() - start);
        }
        ctx.putImageData(imageData, 0, 0);          
    };
    render(slider.valueAsNumber);
    slider.onchange = () => {
        render(slider.valueAsNumber);
    };
};