
const API_URL= 'https://www.khanbank.com/api/back/rates';


const amountUSD = document.getElementById('amountUSD');
const convertBtn = document.getElementById('convertBtn');
const displayMNT = document.getElementById('displayMNT');

let usdRate = null;

async function fetchRates() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network error');
    }
    const data = await response.json();
 console.log(data[0])
    const usdRateData = data[0].midRate;
    console.log(usdRateData)

    usdRate = usdRateData;
  } catch (error) {
    console.error('Fetching rate failed:', error);
    // Handle error gracefully, e.g., show a message to the user
  }
}

convertBtn.addEventListener('click', () => {
  if (usdRate) {
    const usdValue = parseFloat(amountUSD.value);
    const convertedAmount = usdValue * usdRate;
    displayMNT.textContent = convertedAmount.toLocaleString('en-US', {
      maximumFractionDigits: 2,
    });
  } else {
    console.log('Rates not loaded yet.');
    // Optionally show a message to the user
  }
});

window.onload = () => {
  fetchRates();
};

