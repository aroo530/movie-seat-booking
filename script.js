const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const occupiedSeats = document.querySelectorAll('.row .seat.occupied');
const seatCount = document.querySelector('.seat-count');
const totalCost = document.querySelector('.total-cost');
const movieSelect = document.querySelector('#movies');
const resetButton = document.getElementById('reset');
const saveButton = document.getElementById('save');

populateUI()
let ticketPrice = +movieSelect.value;

function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected');
      }
    }); 
  }
}

function updateSelecedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex= [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  seatCount.innerText = selectedSeatsCount;
  totalCost.innerText = selectedSeatsCount * ticketPrice;
}

movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  localStorage.setItem('selectedMovieIndex', e.target.selectedIndex);
  localStorage.setItem('selectedMovie', e.target.value);
  updateSelecedCount();
})

container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelecedCount(); 
  }
});

resetButton.addEventListener('click', () => {
  
  seats.forEach(seat => {
    seat.classList.remove('selected');
  });
  updateSelecedCount();
});

saveButton.addEventListener('click', () => {
  seats.forEach(seat => {
    if (seat.classList.contains('selected')) {
    seat.classList.add('occupied');
    seat.classList.remove('selected');
    }
  });
  updateSelecedCount();
});
