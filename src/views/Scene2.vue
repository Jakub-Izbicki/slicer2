<template>
  <SceneEmpty1></SceneEmpty1>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import SceneEmpty1 from "@/components/SceneEmpty1.vue";

@Component({
  components: {SceneEmpty1}
})
export default class Scene2 extends Vue {
}
</script>
