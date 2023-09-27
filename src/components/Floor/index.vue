<template>
  <div class="floor">
    <h2>Floor {{ number }}</h2>
    <button
      class="floor_btn"
      :class="activeFloor ? 'floor_btn-active' : 'floor_btc-inactive'"
      @click="callElevator(number)"
    ></button>
  </div>
</template>
<script>
export default {
  props: {
    number: {
      required: true,
    },
    activeFloor: {
      required: true,
    },
  },
  methods: {
    callElevator(floorNumber) {
      this.$emit("call-elevator", floorNumber);
    },
  },
};
</script>

<style lang="css">
.floor {
  position: relative;
  width: 150px;
  height: 100px;
  background-color: #eee;
  border-bottom: 1px solid #888;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.floor_btn {
  width: 30%;
  height: 100%;
  border: none;
  cursor: pointer;
}
.floor_btn::before {
  content: "X";
  widows: 20px;
  height: 20px;
  position: relative;
  color: black;
}
.floor button.floor_btc-inactive:hover {
  background-color: #57cfff;
}

.floor_btn-active {
  background-color: #283eff;
  cursor: default;
}
.floor_btc-inactive {
  background-color: #97e1ff;
}
</style>
