let timer; // To store the interval of the stopwatch
let running = false; // To track if the stopwatch is running
let startTime; // To store the start time of the stopwatch
let currentTime; // To store the current time of the stopwatch
let elapsedTime = 0; // To store the elapsed time
let laps = []; // To store lap times

function startPause() {
  if (!running) {
    // Start the stopwatch
    running = true;
    document.getElementById('startPause').innerText = 'Pause';
    startTime = new Date().getTime() - elapsedTime;
    timer = setInterval(updateTime, 10); // Update time every 10 milliseconds
  } else {
    // Pause the stopwatch
    running = false;
    document.getElementById('startPause').innerText = 'Resume';
    clearInterval(timer);
  }
}

function reset() {
  // Reset the stopwatch
  running = false;
  clearInterval(timer);
  document.getElementById('startPause').innerText = 'Start';
  elapsedTime = 0;
  updateDisplay(0);
  laps = [];
  updateLaps();
}

function updateTime() {
  // Update the elapsed time and display
  currentTime = new Date().getTime();
  elapsedTime = currentTime - startTime;
  updateDisplay(elapsedTime);
}

function updateDisplay(time) {
  // Format the time and display in the stopwatch
  let milliseconds = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
  let seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
  let minutes = Math.floor((time / (1000 * 60)) % 60).toString().padStart(2, '0');
  
  document.getElementById('milliseconds').innerText = milliseconds;
  document.getElementById('seconds').innerText = seconds;
  document.getElementById('minutes').innerText = minutes;
}

function lap() {
  // Record lap time
  if (running) {
    laps.push(elapsedTime);
    updateLaps();
  }
}

function updateLaps() {
  // Display laps in the UI
  let lapsList = document.getElementById('laps');
  lapsList.innerHTML = '';
  for (let i = 0; i < laps.length; i++) {
    let lapTime = laps[i];
    let milliseconds = Math.floor((lapTime % 1000) / 10).toString().padStart(2, '0');
    let seconds = Math.floor((lapTime / 1000) % 60).toString().padStart(2, '0');
    let minutes = Math.floor((lapTime / (1000 * 60)) % 60).toString().padStart(2, '0');
    
    let lapItem = document.createElement('li');
    lapItem.innerText = `Lap ${i + 1}: ${minutes}:${seconds}.${milliseconds}`;
    lapsList.appendChild(lapItem);
  }
  
  // Update total laps count
  document.getElementById('totalLaps').innerText = `Total Laps: ${laps.length}`;
}

function clearLaps() {
  // Clear all recorded laps
  laps = [];
  updateLaps();
}