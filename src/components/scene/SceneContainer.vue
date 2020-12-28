<template>
  <div class="h-full w-full relative" ref="sceneContainer"></div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import RenderScene from "@/domain/scene/RenderScene";
import TestObjectFactory from "@/domain/scene/TestObjectFactory";

@Component
export default class SceneContainer extends Vue {

  private renderScene!: RenderScene;

  mounted() {
    const sceneContainer = this.$refs.sceneContainer as HTMLElement;
    this.renderScene = RenderScene.newScene(sceneContainer);
    this.renderScene.start();

    setTimeout(() => {
      const side = 1;
      [...new Array(side).keys()].forEach(i => {
        [...new Array(side).keys()].forEach(j => {
          this.renderScene.scene.add(TestObjectFactory.getTestCard(i * 100, j * -100, i));
        });
      });
    }, 100);
  }
}
</script>

<style scoped>

</style>
