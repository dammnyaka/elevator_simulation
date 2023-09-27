<template>
  <div class="shaft" :style="{ height: `${floorsNumber * floorHeight}px` }">
    <div class="elevator" :style="elevatorStyle">
      <div class="elevator_navigation">
        <span class="elevator_navigation-up" v-if="elevator.direction === 'up' && true"> </span>
        <span class="elevator_navigation-down" v-if="elevator.direction === 'down' && true"> </span>
        <span class="elevator_navigation-target">{{ elevator.targetFloor }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    floorsNumber: {
      required: true,
    },
    currentFloor: {
      required: true,
    },
    elevator: {
      required: true,
    },
  },
  data() {
    return {
      floorHeight: 100,
    };
  },
  computed: {
    elevatorStyle() {
      let position = (this.currentFloor - 1) * this.floorHeight;
      let animationElevator = this.elevator.status === "resting" ? "restingAnimate 1s infinite linear" : "";
      return {
        bottom: `${position}px`,
        transition: "bottom 1s ease-in-out",
        animation: animationElevator,
      };
    },
  },
};
</script>
<style lang="css">
.shaft {
  position: relative;
  width: 100px;
  border: 1px solid black;
  margin: 20px;
}

.elevator {
  position: absolute;
  width: 100%;
  height: 100px;
  background-color: #eee;
}
.elevator_navigation {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: #97e2ff;
  width: 40px;
  height: 40px;
}

.elevator_navigation-up {
  width: 10px;
  height: 10px;
  border-top: 2px solid #000000;
  border-right: 2px solid #000000;
  transform: translateY(0px) rotate(-45deg);
}
.elevator_navigation-down {
  position: relative;
  top: -5px;
  width: 10px;
  height: 10px;
  border-top: 2px solid #000000;
  border-right: 2px solid #000000;
  transform: translateY(0px) rotate(135deg);
}

@keyframes restingAnimate {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
