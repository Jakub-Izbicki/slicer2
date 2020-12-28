<template>
  <img :src="src" class="cardComponent">
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

@Component
export default class CardComponent extends Vue {

  @Prop({type: String, required: true})
  private src!: string;
}
</script>
