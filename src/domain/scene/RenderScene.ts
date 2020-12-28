import * as THREE from "three";
import {CSS3DRenderer} from "three/examples/jsm/renderers/CSS3DRenderer";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import {AmbientLight, Camera, DirectionalLight, PerspectiveCamera, Renderer, Scene, WebGLRenderer} from "three";
import Shadows from "@/domain/scene/Shadows";

export default class RenderScene {

    private static readonly ABSOLUTE = "absolute";

    private static readonly TOP_0 = "0";

    private static readonly FOV = 75;

    private static readonly NEAR_CLIPPING = 0.1;

    private static readonly FAR_CLIPPING = 1000;

    private static readonly MAX_ZOOM_OUT = 2000;

    private static readonly MAX_ZOOM_IN = 10;

    private static readonly POLAR_ANGLE = Math.PI / 2;

    private static readonly CAMERA_START_Z = 200;

    private static readonly FPS_COUNTER = 0;

    private readonly START_ERROR = "Destroyed RenderScene cannot be reused!";

    private destroyed = false;

    constructor(readonly cssRenderer: CSS3DRenderer,
                readonly glRenderer: WebGLRenderer,
                readonly scene: THREE.Scene,
                readonly directionalLight: DirectionalLight,
                readonly camera: Camera,
                readonly controls: OrbitControls,
                readonly stats: Stats,
                readonly container: HTMLElement) {
    }

    public static newScene(container: HTMLElement): RenderScene {
        const css3DRenderer = this.createCssRenderer(container);
        const glRenderer = this.createWebGlRenderer(container);
        const scene = this.createScene();
        const directionalLight = this.createDirectionalLight();
        const camera = this.createCamera(container);
        const controls = this.createControls(camera, glRenderer);
        const stats = this.createStats();

        return new RenderScene(css3DRenderer, glRenderer, scene, directionalLight, camera, controls, stats, container);
    }

    public start(): void {
        if (this.destroyed) {
            throw this.START_ERROR;
        }

        this.container.appendChild(this.cssRenderer.domElement);
        this.container.appendChild(this.glRenderer.domElement);
        this.container.appendChild(this.stats.dom);
        this.scene.add(this.directionalLight);
        // this.scene.add(RenderScene.createAmbientLight());
        // this.scene.add(new THREE.CameraHelper(this.directionalLight.shadow.camera));
        // this.scene.add(new THREE.DirectionalLightHelper(this.directionalLight));

        this.addOnWindowResize();
        this.animate();
    }

    public destroy(): void {
        this.destroyed = true;

        // todo: stop requested animation frame
        // todo: dispose of all objects?, materials?, meshes? etc..
        // todo: dispose of scene? renderer?
        console.error("destroy() not yet implemented");
    }

    private animate(): void {
        // todo: stop request animation frame when destroying scene
        const doAnimate = () => {
            requestAnimationFrame(doAnimate);

            this.stats.begin();
            this.glRenderer.render(this.scene, this.camera);
            this.cssRenderer.render(this.scene, this.camera);
            this.stats.end();
        }

        doAnimate();
    }

    private addOnWindowResize(): void {
        // todo: add event handle so it can be removed when destroying scene later?
        window.addEventListener('resize', this.onWindowResize, false);
    }

    // todo: implement
    private onWindowResize(): void {
        // @ts-ignore
        // this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
        // this.camera.updateMatrixWorld();
        // this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
        // this.cssRenderer.render(this.scene, this.camera);
    }

    private static createCssRenderer(container: HTMLElement): CSS3DRenderer {
        const css3dRenderer = new CSS3DRenderer();
        css3dRenderer.setSize(container.offsetWidth, container.offsetHeight);
        css3dRenderer.domElement.style.position = this.ABSOLUTE;
        css3dRenderer.domElement.style.top = this.TOP_0;

        return css3dRenderer;
    }

    private static createWebGlRenderer(container: HTMLElement): WebGLRenderer {
        const glRenderer: WebGLRenderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        glRenderer.setSize(container.offsetWidth, container.offsetHeight);
        glRenderer.domElement.style.position = this.ABSOLUTE;
        glRenderer.domElement.style.top = this.TOP_0;

        if (Shadows.getInstance().areEnabled()) {
            glRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
            glRenderer.shadowMap.enabled = true;
        }

        return glRenderer;
    }

    private static createScene(): Scene {
        return new THREE.Scene();
    }

    private static createAmbientLight(): AmbientLight {
        return new THREE.AmbientLight(0x666666);
    }

    private static createDirectionalLight(): DirectionalLight {
        const light = new THREE.DirectionalLight(0xdedede, 1);
        const cameraRange = 500;

        light.position.set(0, 0, 300);

        if (Shadows.getInstance().areEnabled()) {
            light.shadow.bias = -0.001;
            light.castShadow = Shadows.getInstance().areEnabled();
            light.position.multiplyScalar(1.3);
            light.shadow.mapSize.width = 2048;
            light.shadow.mapSize.height = 2048;
            light.shadow.camera.left = -cameraRange;
            light.shadow.camera.right = cameraRange;
            light.shadow.camera.top = cameraRange;
            light.shadow.camera.bottom = -cameraRange;
            light.shadow.camera.far = cameraRange;
        }

        return light;
    }

    private static createCamera(container: HTMLElement): PerspectiveCamera {
        const camera = new THREE.PerspectiveCamera(this.FOV, container.offsetWidth / container.offsetHeight,
            this.NEAR_CLIPPING, this.FAR_CLIPPING);
        camera.position.z = this.CAMERA_START_Z;

        return camera;
    }

    private static createControls(camera: Camera, renderer: Renderer): OrbitControls {
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.screenSpacePanning = false;
        controls.maxDistance = this.MAX_ZOOM_OUT;
        controls.minDistance = this.MAX_ZOOM_IN;
        // controls.maxPolarAngle = this.POLAR_ANGLE;

        return controls;
    }

    private static createStats(): Stats {
        // @ts-ignore
        const stats = new Stats();
        stats.showPanel(this.FPS_COUNTER);
        return stats;
    }
}
