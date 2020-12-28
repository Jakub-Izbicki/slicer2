<template>
  <div class="h-full w-full">
    <button @click="call">Call page</button>
    <SceneContainer></SceneContainer>
  </div>

</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import SceneContainer from "@/components/scene/SceneContainer.vue"
import axios from "axios";

@Component({
  components: {SceneContainer}
})
export default class Main extends Vue {

  call(): void {
    axios.get("https://google.com/")
        .then((response => console.info(response)))
        .catch((error) => console.warn(error));
  }
}
</script>
