import {Color, Mesh, Object3D} from "three";
import {CSS3DObject} from "three/examples/jsm/renderers/CSS3DRenderer";
import * as THREE from "three";
import Shadows from "@/domain/scene/Shadows";

export default class ObjectFactory {

    private static readonly HEIGHT = 88;

    private static readonly WIDTH = 63;

    private static readonly DEPTH = 1;

    private static readonly PX = "px";

    private static readonly IMG_EL = "img";

    private static readonly IMG_SRC = "https://c1.scryfall.com/file/scryfall-cards/large/front/d/1/d1c9cde8-0124-476b-a807-b231b352678e.jpg?1605329010";

    private static readonly OPACITY = 0.1;

    private static readonly GROUND_SIZE = 2000;

    public static createTestCard(x?: number, y?: number, z?: number): Object3D {
        const root = new THREE.Object3D();
        root.add(this.createCssImg(x, y, z));
        root.add(this.createPlane(x, y, z));

        return root;
    }

    public static createGround() {
        const groundMesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(ObjectFactory.GROUND_SIZE, ObjectFactory.GROUND_SIZE),
            new THREE.MeshPhongMaterial({
                color: 0xafafff,
                flatShading: true,
                blending: THREE.NoBlending,
                side: THREE.DoubleSide
            })
        );
        groundMesh.receiveShadow = Shadows.getInstance().areEnabled();

        return groundMesh;
    }

    private static createCssImg(x?: number, y?: number, z?: number) {
        const img = document.createElement(ObjectFactory.IMG_EL);
        img.style.width = ObjectFactory.WIDTH + ObjectFactory.PX;
        img.style.height = ObjectFactory.HEIGHT + ObjectFactory.PX;
        img.src = ObjectFactory.IMG_SRC;

        const css3DObject = new CSS3DObject(img);
        css3DObject.position.x = x ? x : 0;
        css3DObject.position.y = y ? y : 0;
        css3DObject.position.z = z ? z : 0;
        return css3DObject;
    }

    private static createPlane(x?: number, y?: number, z?: number) {
        const material = new THREE.MeshPhongMaterial({
            opacity: ObjectFactory.OPACITY,
            color: new Color(0x111111),
            blending: THREE.NoBlending,
            side: THREE.DoubleSide
        });
        const geometry = new THREE.BoxGeometry(ObjectFactory.WIDTH, ObjectFactory.HEIGHT, ObjectFactory.DEPTH);
        const planeObject = new THREE.Mesh(geometry, material);
        planeObject.castShadow = Shadows.getInstance().areEnabled();
        planeObject.receiveShadow = Shadows.getInstance().areEnabled();
        planeObject.position.x = x ? x : 0;
        planeObject.position.y = y ? y : 0;
        planeObject.position.z = z ? z : 0;
        return planeObject;
    }
}