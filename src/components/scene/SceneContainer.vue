<template>
  <div class="h-full w-full relative"
       ref="sceneContainer">
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import RenderScene from "@/domain/scene/RenderScene";
import * as THREE from "three";
import {CSS3DObject} from "three/examples/jsm/renderers/CSS3DRenderer";

@Component
export default class SceneContainer extends Vue {

  private static readonly HEIGHT = '88px';

  private static readonly WIDTH = '63px';

  private static readonly DIV_EL = "div";

  private static readonly MSG = "Hello world";

  private renderScene!: RenderScene;

  mounted() {
    const sceneContainer = this.$refs.sceneContainer as HTMLElement;
    this.renderScene = RenderScene.newScene(sceneContainer);
    this.renderScene.start();

    setTimeout(() => {
      const side = 1;
      [...new Array(side).keys()].forEach(i => {
        [...new Array(side).keys()].forEach(j => {
          this.renderScene.scene.add(this.createTestHtmlObject(i * 100, j * -100, i));
        });
      });
    }, 100);
  }

  private createTestHtmlObject(x?: number, y?: number, z?: number): CSS3DObject {
    // const element = document.createElement(SceneContainer.DIV_EL);
    const element = document.createElement("img");
    element.style.width = SceneContainer.WIDTH;
    element.style.height = SceneContainer.HEIGHT;
    // element.style.background = new THREE.Color(
    //     Math.random() * 0.21568627451 + 0.462745098039,
    //     Math.random() * 0.21568627451 + 0.462745098039,
    //     Math.random() * 0.21568627451 + 0.462745098039
    // ).getStyle();
    element.src = "https://c1.scryfall.com/file/scryfall-cards/large/front/d/1/d1c9cde8-0124-476b-a807-b231b352678e.jpg?1605329010";
    // element.textContent = SceneContainer.MSG;

    const object = new CSS3DObject(element);
    object.position.x = x ? x : 0;
    object.position.y = y ? y : 0;
    object.position.z = z ? z : 0;

    return object;
  }
}
</script>

<style scoped>

</style>
