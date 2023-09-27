export function handleUpdateQueue(queue, fl) {
  return queue.filter((i) => i.floor !== fl);
}

export function findClosestElevator(array, target) {
  if (array.length === 0) {
    return;
  }

  return array.reduce((prev, curr) => (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev));
}

export function handleCallElevator(floorNumber, elevators, queue, floors, moveElevator) {
  const elevatorOnFloor = elevators.find(
    (elevator) => elevator.currentFloor === floorNumber || elevator.targetFloor === floorNumber
  );

  const floorInQueue = queue.some((call) => call.floor === floorNumber);

  if (elevatorOnFloor || floorInQueue) {
    return;
  } else {
    queue.push({ floor: floorNumber });
    floors[floorNumber - 1].activeFloor = true;

    const freeElevator = elevators.filter((elevator) => elevator.status === "idle");
    if (freeElevator) {
      const closestFloor = findClosestElevator(
        freeElevator.map((elevator) => elevator.currentFloor),
        floorNumber
      );
      const closestElev = elevators.find((i) => i.currentFloor === closestFloor);
      const freElev = elevators.find((i) => i.status === "idle");
      if (closestElev && closestElev.status === "idle") {
        moveElevator(closestElev.id - 1);
      } else if (freElev) {
        moveElevator(elevators.indexOf(freElev));
      }
    }
  }
}

export function moveElevator(index, elevators, queue, floors, moveElevator) {
  const elevator = elevators[index];

  if (queue.length > 0) {
    const floorNumber = queue[0].floor;
    const direction = floorNumber > elevator.currentFloor ? "up" : "down";
    elevator.targetFloor = floorNumber;
    elevator.status = "moving";
    elevator.direction = direction;
    queue.shift();
  }

  elevator.moving = setInterval(() => {
    if (elevator.currentFloor === elevator.targetFloor) {
      elevator.status = "resting";
      elevator.direction = null;
      floors[elevator.targetFloor - 1].activeFloor = false;
      elevator.targetFloor = null;

      setTimeout(() => {
        return queue.length > 0 ? moveElevator(index) : (elevator.status = "idle");
      }, 3000);
      return clearInterval(elevator.moving);
    }

    elevator.currentFloor += elevator.direction === "up" ? 1 : -1;
    localStorage.setItem(`elevator${elevator.id}CurrentFloor`, elevator.currentFloor);
  }, 1000);
}
