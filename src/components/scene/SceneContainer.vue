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

  private static readonly SIZE = '100px';

  private static readonly DIV_EL = "div";

  private static readonly MSG = "Hello world";

  private renderScene!: RenderScene;

  mounted() {
    const sceneContainer = this.$refs.sceneContainer as HTMLElement;
    this.renderScene = RenderScene.newScene(sceneContainer);
    this.renderScene.start();

    setTimeout(() => {
      this.renderScene.scene.add(this.createTestHtmlObject());
    }, 100);
  }

  private createTestHtmlObject(): CSS3DObject {
    const element = document.createElement(SceneContainer.DIV_EL);
    element.style.width = SceneContainer.SIZE;
    element.style.height = SceneContainer.SIZE;
    element.style.background = new THREE.Color(
        Math.random() * 0.21568627451 + 0.462745098039,
        Math.random() * 0.21568627451 + 0.462745098039,
        Math.random() * 0.21568627451 + 0.462745098039
    ).getStyle();
    element.textContent = SceneContainer.MSG;

    return new CSS3DObject(element);
  }
}
</script>

<style scoped>

</style>
