let submittedApplications = [];

document.getElementById('jobApplicationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    if (validateForm()) {
        const formData = getFormData();
        console.log('Form submitted successfully!', formData);
        alert('Application submitted successfully!');
        saveFormData(formData);
        submittedApplications.push(formData);
        document.getElementById('jobApplicationForm').reset();
    }
});

function validateForm() {
    const formElements = document.getElementById('jobApplicationForm').elements;
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.hasAttribute('required') && element.value.trim() === '') {
            alert(`Please fill out the required field: ${element.name}`);
            return false;
        }
        if (element.type === 'email' && !validateEmail(element.value)) {
            alert('Please enter a valid email address.');
            return false;
        }
    }
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function getFormData() {
    const formData = {};
    const formElements = document.getElementById('jobApplicationForm').elements;
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.type !== 'submit') {
            if (element.type === 'checkbox') {
                formData[element.name] = element.checked;
            } else {
                formData[element.name] = element.value;
            }
        }
    }
    return formData;
}

function saveFormData(formData) {
    console.log('Data saved:', formData);
}

function viewApplicationsAsTable() {
    const applicationsTable = document.getElementById('applicationsTable');
    if (submittedApplications.length === 0) {
        alert('No applications to display.');
        return;
    }
    const table = document.createElement('table');
    const headerRow = table.insertRow(0);
    Object.keys(submittedApplications[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    submittedApplications.forEach(application => {
        const row = table.insertRow();
        Object.values(application).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });
    });
    applicationsTable.innerHTML = '';
    applicationsTable.appendChild(table);
}