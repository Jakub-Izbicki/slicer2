<template>
  <div class="h-full w-full relative"
       ref="sceneContainer">
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import RenderScene from "@/domain/scene/RenderScene";

@Component
export default class SceneContainer extends Vue {

  private renderScene!: RenderScene;

  mounted() {
    const sceneContainer = this.$refs.sceneContainer as HTMLElement;
    this.renderScene = RenderScene.newScene(sceneContainer);
    this.renderScene.start();
  }
}
</script>

<style scoped>

</style>
