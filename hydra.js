try {
    const hydraCanvas = document.createElement('canvas');
    hydraCanvas.id = 'hydra-bg-canvas';
    hydraCanvas.style.position = 'fixed';
    hydraCanvas.style.left = '0';
    hydraCanvas.style.top = '0';
    hydraCanvas.style.width = '100vw';
    hydraCanvas.style.height = '100vh';
    hydraCanvas.style.zIndex = '-1';
    hydraCanvas.style.pointerEvents = 'none';

    const dpr = window.devicePixelRatio || 1;
    hydraCanvas.width = window.innerWidth * dpr;
    hydraCanvas.height = window.innerHeight * dpr;

    document.body.prepend(hydraCanvas);

    var hydra = new Hydra({
        detectAudio: false,
        canvas: hydraCanvas,
        pixelRatio: dpr
    });

voronoi(350,0.15)
  	.modulateScale(osc(8).rotate(Math.sin(time)),.5)
  	.thresh(.8)
	.modulateRotate(osc(7),.4)
	.thresh(.7)
  	.diff(src(o0).scale(1.8))
	.modulateScale(osc(2).modulateRotate(o0,.74))
	.diff(src(o0).rotate([-.012,.01,-.002,0]).scrollY(0,[-1/199800,0].fast(0.7)))
	.brightness([-.02,-.17].smooth().fast(.5))
	.out()

    window.addEventListener('resize', () => {
        const dpr = window.devicePixelRatio || 1;
        hydraCanvas.width = window.innerWidth * dpr;
        hydraCanvas.height = window.innerHeight * dpr;
        hydraCanvas.style.width = '100vw';
        hydraCanvas.style.height = '100vh';
        if (hydra.setResolution) {
            hydra.setResolution(hydraCanvas.width, hydraCanvas.height);
        }
    });
} catch (e) {
    document.body.classList.add('no-hydra');
}