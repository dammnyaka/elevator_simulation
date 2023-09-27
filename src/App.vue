<template>
  <div id="app">
    <div class="wrapper">
      <div class="elevators"><elevator-shaft></elevator-shaft></div>

      <div class="floors"><floor></floor></div>
      <div class="instruments"><Instruments></Instruments></div>
    </div>
  </div>
</template>

<script>
import ElevatorShaft from "@/components/ElevatorShaft/";
import Floor from "@/components/Floor/";
import Instruments from "@/components/Instruments/";

export default {
  name: "App",
  components: {
    ElevatorShaft,
    Floor,
    Instruments,
  },
};
</script>

<style></style>
