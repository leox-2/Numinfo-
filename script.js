const carrierNameEl = document.getElementById('carrierName');
const phoneTypeEl = document.getElementById('phoneType');
const simCompanyEl = document.getElementById('simCompany');
const carrierBadgeEl = document.getElementById('carrierBadge');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Hide previous results and errors
    error.style.display = 'none';
    result.style.display = 'none';

    // Validate phone number input
    const phoneNumber = phoneInput.value.trim();
    if (!phoneNumber.match(/^\d+$/)) {
        error.textContent = '❌ Please enter a valid phone number with digits only.';
        error.style.display = 'block';
        return;
    }

    // Show loading
    loading.style.display = 'block';
    lookupBtn.disabled = true;

    try {
        // Example API endpoint (replace with your real API)
        // Here, just simulating with a mock response for demonstration.
        // const response = await fetch(`https://api.example.com/lookup?number=${phoneNumber}`);
        // const data = await response.json();

        // Mock data for demo
        const data = mockLookup(phoneNumber);

        if (!data || !data.carrier) {
            throw new Error('No data found');
        }

        // Update UI with results
        simCompanyEl.textContent = `📡 SIM Company: ${data.simCompany || 'Unknown'}`;
        carrierNameEl.textContent = data.carrier.name || '-';
        phoneTypeEl.textContent = data.type || '-';
        carrierBadgeEl.textContent = data.carrier.badge || '-';
        carrierImage.src = data.carrier.logo || '';
        carrierImage.alt = data.carrier.name || 'Carrier Logo';

        // Show result container
        result.style.display = 'block';
    } catch (err) {
        error.textContent = '❌ Unable to fetch number information. Please check the number and try again.';
        error.style.display = 'block';
    } finally {
        loading.style.display = 'none';
        lookupBtn.disabled = false;
    }
});

// Mock lookup function to simulate an API response
function mockLookup(number) {
    // Simple logic: if number starts with "88017", show Grameenphone data, else default
    if (number.startsWith('88017')) {
        return {
            simCompany: 'Grameenphone',
            carrier: {
                name: 'Grameenphone',
                badge: 'GP',
                logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/64/Grameenphone_Logo.svg/1200px-Grameenphone_Logo.svg.png'
            },
            type: 'Mobile'
        };
    } else if (number.startsWith('88019')) {
        return {
            simCompany: 'Banglalink',
            carrier: {
                name: 'Banglalink',
                badge: 'BL',
                logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Banglalink_logo.svg/1200px-Banglalink_logo.svg.png'
            },
            type: 'Mobile'
        };
    } else {
        // Unknown carrier example
        return {
            simCompany: 'Unknown',
            carrier: {
                name: 'Unknown Carrier',
                badge: '?',
                logo: ''
            },
            type: 'Unknown'
        };
    }
          }
