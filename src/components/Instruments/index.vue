<template>
  <div class="instruments">
    <div style="margin-bottom: 10px">
      Queue
      <div style="display: flex; flex-wrap: wrap">
        <div style="margin: 0 2px" v-for="queue in queue" :key="queue.floor">
          {{ queue.floor }}
        </div>
      </div>
    </div>
    <div>
      <slot name="floor" />
      <div class="btn_add">
        <button @click="removeFloor" class="btn_add-floor">-</button>
        <button @click="addFloor" class="btn_add-floor">+</button>
      </div>
    </div>
    <div>
      <slot name="elevator" />
      <div class="btn_add">
        <button @click="removeElevator" class="btn_add-elevator">-</button>
        <button @click="addElevator" class="btn_add-elevator">+</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    queue: {
      required: true,
    },
  },
  methods: {
    addFloor() {
      this.$emit("add-floor");
    },
    removeFloor() {
      this.$emit("remove-floor");
    },

    addElevator() {
      this.$emit("add-elevator");
    },
    removeElevator() {
      this.$emit("remove-elevator");
    },
  },
};
</script>
<style lang="css">
.btn_add {
  position: relative;
  display: flex;
  justify-content: space-evenly;
}
.btn_add-floor {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
