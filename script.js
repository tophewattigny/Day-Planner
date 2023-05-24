
const currentDay = dayjs().format('dddd, MMMM D');
document.getElementById('currentDay').textContent = currentDay;


let currentTime = dayjs().format('H');

let savedEvents = JSON.parse(localStorage.getItem('events')) || {};


function updateTimeBlockColors() {
  const timeBlocks = document.querySelectorAll('.time-block');

  timeBlocks.forEach((block) => {
    const blockTime = parseInt(block.id.split('-')[1]);

    block.classList.remove('past', 'present', 'future');

    if (blockTime < currentTime) {
      block.classList.add('past');
    } else if (blockTime == currentTime) {
      block.classList.add('present');
    } else {
      block.classList.add('future');
    }
  });
}


updateTimeBlockColors();


const timeBlocks = document.querySelectorAll('.time-block');
timeBlocks.forEach((block) => {
  const blockTime = parseInt(block.id.split('-')[1]);
  const savedEvent = savedEvents[blockTime];

  block.querySelector('.description').value = savedEvent || '';

  block.querySelector('.saveBtn').addEventListener('click', () => {
    const eventText = block.querySelector('.description').value;
    savedEvents[blockTime] = eventText;
    localStorage.setItem('events', JSON.stringify(savedEvents));
  });
});


function updateCurrentTime() {
  const newTime = dayjs().format('H');
  if (newTime !== currentTime) {
    currentTime = newTime;
    updateTimeBlockColors();
  }
}


setInterval(updateCurrentTime, 60000);
