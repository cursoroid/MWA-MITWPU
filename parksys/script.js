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
    parkingSpot.setAttribute('aria-label', `Parking Spot ${i}`);
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

function assignParkingSpot() {
  const selectedSpot = document.querySelector('.parking-spot.selected');

  if (selectedSpot) {
    const spotNumber = selectedSpot.dataset.spotNumber;
    const vehicleNumberInput = document.getElementById('vehicleNumber');
    const vehicleNumber = vehicleNumberInput.value.trim();
    const vehicleTypeSelect = document.getElementById('vehicleType');
    const vehicleType = vehicleTypeSelect.options[vehicleTypeSelect.selectedIndex].value;

    // Regex pattern for a vehicle number plate like AB01BC1234
    const vehicleNumberPattern = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;

    if (vehicleNumberPattern.test(vehicleNumber) && (vehicleType === '2' || vehicleType === '4')) {
      const parkingCharge = (vehicleType === '2') ? 30 : 50;

      selectedSpot.classList.add('occupied');
      selectedSpot.classList.remove('selected');
      selectedSpot.classList.add((vehicleType === '2') ? 'two-wheeler' : 'four-wheeler');
      selectedSpot.innerHTML = vehicleNumber;

      // Store charge information in the revenue object
      revenue.charges.push({
        spotNumber,
        vehicleNumber,
        vehicleType,
        charge: parkingCharge
      });

      // Update the total revenue
      revenue.total += parkingCharge;
      document.getElementById('totalRevenue').innerText = revenue.total;

      // Display charges in the window
      displayCharges();

      alert(`Your ${vehicleType}-wheeler is parked at spot ${spotNumber}.`);
    } else {
      alert('Please enter a valid vehicle number and select the vehicle type.');
    }
  } else {
    alert('Please select a parking spot before assigning.');
  }
}

function checkout() {
  const vehicleNumberInput = document.getElementById('vehicleNumber');
  const vehicleNumber = vehicleNumberInput.value.trim();

  // Find the parking spot with the given vehicle number
  const parkingSpot = document.querySelector(`.parking-spot[data-vehicle-number="${vehicleNumber}"]`);

  if (parkingSpot && parkingSpot.classList.contains('occupied')) {
    const spotNumber = parkingSpot.dataset.spotNumber;

    // Find the corresponding charge information
    const chargeInfo = revenue.charges.find(charge => charge.spotNumber === spotNumber);

    if (chargeInfo) {
      const confirmation = confirm(`Checkout for vehicle ${vehicleNumber} at spot ${spotNumber} with a charge of ${chargeInfo.charge} Rupees?`);

      if (confirmation) {
        // Clear the parking spot
        parkingSpot.classList.remove('occupied', 'two-wheeler', 'four-wheeler');
        parkingSpot.innerHTML = spotNumber;

        // Remove charge information from the revenue object
        const chargeIndex = revenue.charges.indexOf(chargeInfo);
        revenue.charges.splice(chargeIndex, 1);

        // Update the total revenue
        revenue.total -= chargeInfo.charge;
        document.getElementById('totalRevenue').innerText = revenue.total;

        // Display updated charges in the window
        displayCharges();

        alert(`Checkout successful for vehicle ${vehicleNumber} at spot ${spotNumber}.`);
      }
    } else {
      alert('No charge information found for the specified vehicle number.');
    }
  } else {
    alert('No occupied spot found for the specified vehicle number.');
  }
}

