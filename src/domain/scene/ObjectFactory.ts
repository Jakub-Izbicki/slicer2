import {Color, Object3D} from "three";
import {CSS3DObject} from "three/examples/jsm/renderers/CSS3DRenderer";
import * as THREE from "three";
import Shadows from "@/domain/scene/Shadows";
import {Vue} from "vue-property-decorator";
import CardComponent from "@/components/card/CardComponent.vue";

export default class ObjectFactory {

    private static readonly HEIGHT = 88;

    private static readonly WIDTH = 63;

    private static readonly OFFSET = 0.5;

    private static readonly DEPTH = 0.01;

    private static readonly IMG_SRC = "https://c1.scryfall.com/file/scryfall-cards/large/front/d/1/d1c9cde8-0124-476b-a807-b231b352678e.jpg?1605329010";

    private static readonly OPACITY = 0.1;

    private static readonly GROUND_SIZE = 2000;

    private static readonly SHININESS = 0;

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
                color: 0xffffff,
                flatShading: true,
                blending: THREE.NoBlending,
                side: THREE.DoubleSide,
                shininess: ObjectFactory.SHININESS
            })
        );
        groundMesh.receiveShadow = Shadows.getInstance().areEnabled();

        return groundMesh;
    }

    private static createCssImg(x?: number, y?: number, z?: number) {
        const cardComponent = new (Vue.extend(CardComponent))({propsData: {src: ObjectFactory.IMG_SRC}});
        cardComponent.$mount();

        const css3DObject = new CSS3DObject(cardComponent.$el as HTMLElement);
        css3DObject.position.x = x ? x : 0;
        css3DObject.position.y = y ? y : 0;
        css3DObject.position.z = z ? z : 0;
        return css3DObject;
    }

    private static createPlane(x?: number, y?: number, z?: number) {
        const material = new THREE.MeshPhongMaterial({
            opacity: ObjectFactory.OPACITY,
            color: 0x000000,
            blending: THREE.NoBlending,
            side: THREE.DoubleSide,
            shininess: ObjectFactory.SHININESS
        });
        const geometry = new THREE.BoxGeometry(ObjectFactory.WIDTH - ObjectFactory.OFFSET,
            ObjectFactory.HEIGHT - ObjectFactory.OFFSET, ObjectFactory.DEPTH);
        const planeObject = new THREE.Mesh(geometry, material);
        planeObject.castShadow = Shadows.getInstance().areEnabled();
        planeObject.receiveShadow = Shadows.getInstance().areEnabled();
        planeObject.position.x = x ? x : 0;
        planeObject.position.y = y ? y : 0;
        planeObject.position.z = z ? z : 0;
        return planeObject;
    }
}
