import * as THREE from "three";
import {CSS3DRenderer} from "three/examples/jsm/renderers/CSS3DRenderer";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import {Camera, PerspectiveCamera, Scene} from "three";

export default class RenderScene {

    private static readonly ABSOLUTE = "absolute";

    private static readonly TOP_0 = "0";

    private static readonly FOV = 75;

    private static readonly NEAR_CLIPPING = 0.1;

    private static readonly FAR_CLIPPING = 1000;

    private static readonly MAX_ZOOM_OUT = 2000;

    private static readonly MAX_ZOOM_IN = 10;

    private static readonly POLAR_ANGLE = Math.PI / 2;

    private static readonly FPS_COUNTER = 0;

    private readonly START_ERROR = "Destroyed RenderScene cannot be reused!";

    private destroyed = false;

    constructor(readonly cssRenderer: CSS3DRenderer,
                readonly scene: THREE.Scene,
                readonly camera: Camera,
                readonly controls: OrbitControls,
                readonly stats: Stats,
                readonly container: HTMLElement) {
    }

    public static newScene(container: HTMLElement): RenderScene {
        const css3DRenderer = this.createCssRenderer(container);
        const scene = this.createScene();
        const camera = this.createCamera(container);
        const controls = this.createControls(camera, css3DRenderer);
        const stats = this.createStats();

        return new RenderScene(css3DRenderer, scene, camera, controls, stats, container);
    }

    public start(): void {
        if (this.destroyed) {
            throw this.START_ERROR;
        }

        // set on window resize event,
        this.container.appendChild(this.cssRenderer.domElement);
        // append stats, etc.. to parent container
        this.animate();
    }

    public destroy(): void {
        this.destroyed = true;

        // dispose of all objects?, materials?, meshes? etc..
        // dispose of scene? renderer?
        console.error("destroy() not yet implemented");
    }

    private animate(): void {
        requestAnimationFrame(this.animate);

        // include stats
        this.stats.begin();
        this.cssRenderer.render(this.scene, this.camera);
        this.stats.end();
    }

    private static createCssRenderer(container: HTMLElement): CSS3DRenderer {
        const css3dRenderer = new CSS3DRenderer();
        css3dRenderer.setSize(container.offsetWidth, container.offsetHeight);
        css3dRenderer.domElement.style.position = this.ABSOLUTE;
        css3dRenderer.domElement.style.top = this.TOP_0;

        return css3dRenderer;
    }

    private static createScene(): Scene {
        return new THREE.Scene();
    }

    private static createCamera(container: HTMLElement): PerspectiveCamera {
        return new THREE.PerspectiveCamera(this.FOV, container.offsetWidth / container.offsetHeight,
            this.NEAR_CLIPPING, this.FAR_CLIPPING);
    }

    private static createControls(camera: Camera, cssRenderer: CSS3DRenderer): OrbitControls {
        const controls = new OrbitControls(camera, cssRenderer.domElement);
        controls.screenSpacePanning = false;
        controls.maxDistance = this.MAX_ZOOM_OUT;
        controls.minDistance = this.MAX_ZOOM_IN;
        controls.maxPolarAngle = this.POLAR_ANGLE;

        return controls;
    }

    private static createStats(): Stats {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const stats = new Stats();
        stats.showPanel(this.FPS_COUNTER);
        return stats;
    }
}
