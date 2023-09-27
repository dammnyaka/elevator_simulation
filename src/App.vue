<template>
  <div id="app">
    <div class="wrapper">
      <div class="elevators" v-for="elevator in elevators" :key="elevator.id">
        <elevator-shaft
          :floors-number="floors.length"
          :current-floor="elevator.currentFloor"
          :queue="queue"
          :elevator="elevator"
        ></elevator-shaft>
      </div>

      <div class="floors">
        <floor
          v-for="floor in floors"
          :key="floor.number"
          :number="floor.number"
          :activeFloor="floor.activeFloor"
          @call-elevator="handleCallElevator"
        ></floor>
      </div>
      <div class="instruments"><Instruments></Instruments></div>
    </div>
  </div>
</template>

<script>
import ElevatorShaft from "@/components/ElevatorShaft/";
import Floor from "@/components/Floor/";
import Instruments from "@/components/Instruments/";

import * as data from "./components/data/";

export default {
  name: "App",
  components: {
    ElevatorShaft,
    Floor,
    Instruments,
  },
  data() {
    return {
      floors: data.floorsData,
      elevators: data.elevatorsData,
      queue: data.queueData,
    };
  },
  created() {},
  methods: {
    handleCallElevator() {},
  },
};
</script>

<style></style>
