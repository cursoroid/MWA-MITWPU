document.addEventListener('DOMContentLoaded', function () {
  generateParkingSpots();
});

function generateParkingSpots() {
  const parkingLot = document.getElementById('parking-lot');

  for (let i = 1; i <= 20; i++) {
    const parkingSpot = document.createElement('div');
    parkingSpot.classList.add('parking-spot');
    parkingSpot.dataset.spotNumber = i;
    parkingSpot.innerHTML = i;
    parkingSpot.addEventListener('click', selectParkingSpot);
    parkingLot.appendChild(parkingSpot);
  }
}

function selectParkingSpot(event) {
  const selectedSpot = event.target;

  // Toggle the 'selected' class to visually indicate the selection
  if (!selectedSpot.classList.contains('occupied')) {
    selectedSpot.classList.toggle('selected');
  } else {
    alert('This spot is already occupied. Please choose another spot.');
  }
}

function checkVehicleNumberFormat(vehicleNumber) {
  // Check if the vehicle number follows a specific pattern (e.g., "KA01RE1234")
  const vehicleNumberPattern = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
  return vehicleNumberPattern.test(vehicleNumber);
}

function checkVehicleNumber(vehicleNumber) {
  // Check if the vehicle number is unique
  return !revenue.charges.some(charge => charge.vehicleNumber === vehicleNumber);
}

function assignParkingSpot() {
  const selectedSpot = document.querySelector('.parking-spot.selected');
  if (selectedSpot) {
    const spotNumber = selectedSpot.dataset.spotNumber;
    const vehicleNumber = document.getElementById('vehicleNumber').value;
    const vehicleTypeSelect = document.getElementById('vehicleType');
    const vehicleType = vehicleTypeSelect.options[vehicleTypeSelect.selectedIndex].value;

    if (
      vehicleNumber.trim() !== '' &&
      checkVehicleNumberFormat(vehicleNumber) &&
      (vehicleType === '2' || vehicleType === '4')
    ) {
      if (checkVehicleNumber(vehicleNumber)) {
        const parkingCharge = vehicleType === '2' ? 30 : 50;

        selectedSpot.classList.add('occupied');
        selectedSpot.classList.remove('selected');
        selectedSpot.classList.add(vehicleType === '2' ? 'two-wheeler' : 'four-wheeler');
        selectedSpot.innerHTML = vehicleNumber;

        // Store charge information in the revenue object
        revenue.charges.push({
          spotNumber,
          vehicleNumber,
          vehicleType,
          charge: parkingCharge,
        });

        // Update the total revenue
        revenue.total += parkingCharge;
        document.getElementById('totalRevenue').innerText = revenue.total;

        // Display charges in the window
        displayCharges();

        alert(`Your ${vehicleType}-wheeler is parked at spot ${spotNumber}.`);
      } else {
        alert('This vehicle number is already parked. Please enter a unique vehicle number.');
      }
    } else {
      alert('Please enter a valid vehicle number and select the vehicle type.');
    }
  } else {
    alert('Please select a parking spot before assigning.');
  }
}
