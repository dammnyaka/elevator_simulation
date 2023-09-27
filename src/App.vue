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
      <div class="instruments">
        <instruments
          :floor="floors"
          :elevators="elevators"
          :moveElevator="moveElevator"
          :queue="queue"
          @remove-floor="removeFloor"
          @add-floor="addFloor"
          @add-elevator="addElevator"
          @remove-elevator="removeElevator"
        >
          <template v-slot:floor>Floor</template>
          <template v-slot:elevator>Elevator</template>
        </instruments>
      </div>
    </div>
  </div>
</template>

<script>
import ElevatorShaft from "@/components/ElevatorShaft/";
import Floor from "@/components/Floor/";
import Instruments from "@/components/Instruments/";

import * as data from "./components/data/";

import { handleUpdateQueue, handleCallElevator, moveElevator } from "./components/composition/elevatorServices";

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
  created() {
    this.elevators.map((elevator) => {
      const loadElevatorFloor = parseInt(localStorage.getItem(`elevator${elevator.id}CurrentFloor`), 10);

      if (!isNaN(loadElevatorFloor)) {
        elevator.currentFloor = loadElevatorFloor;
      }
    });
  },
  methods: {
    addFloor() {
      const newFloor = { number: this.floor.length + 1, activeFloor: false };
      this.floors.push(newFloor);
    },
    removeFloor() {
      this.elevators.map((i) => {
        if (
          i.currentFloor > this.floors.length - 1 ||
          (i.targetFloor > this.floors.length - 1 && (i.status = "moving"))
        ) {
          clearInterval(i.moving);
          i.status = "idle";
          i.targetFloor = null;
          i.moving = null;
          i.direction = null;
          i.targetFloor = null;
          i.currentFloor = this.floors.length - 1;
          localStorage.setItem(`elevator${i.id}CurrentFloor`, i.currentFloor);
        }
      });

      this.floors.pop();
      this.queue = handleUpdateQueue(this.queue, this.floors.length);
    },
    addElevator() {
      const newElevator = {
        id: this.elevators.length + 1,
        currentFloor: 1,
        direction: null,
        status: "idle",
        moving: null,
        targetFloor: null,
      };
      this.elevators.push({ ...newElevator });
    },
    removeElevator() {
      this.elevators.pop();
    },

    handleCallElevator(floorNumber) {
      handleCallElevator(floorNumber, this.elevators, this.queue, this.floors, this.moveElevator);
    },

    moveElevator(index) {
      moveElevator(index, this.elevators, this.queue, this.floors, this.moveElevator);
    },
  },
};
</script>

<style lang="css">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.elevators {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
.floors {
  display: flex;
  flex-direction: column-reverse;
}
.instruments {
  position: relative;
  width: 100px;
  margin-left: 10px;
  background-color: #eee;
  text-align: center;
}
</style>
