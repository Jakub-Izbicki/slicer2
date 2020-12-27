<template>
  <SceneContainer></SceneContainer>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import SceneContainer from "@/components/scene/SceneContainer.vue"

@Component({
  components: {SceneContainer}
})
export default class Main extends Vue {
}
</script>
