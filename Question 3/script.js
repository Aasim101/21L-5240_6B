document.getElementById('jobApplicationForm').addEventListener('submit', function (event) {
  event.preventDefault();
  if (validateForm()) {
      const formData = getFormData();
      console.log('Form submitted successfully!', formData);
      alert('Application submitted successfully!');
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
            formData[element.name] = element.value;
        }
    }
    return formData;
}

function viewApplicationsAsTable() {
  const applicationsTable = document.getElementById('applicationsTable');
  const ap = [
      { firstName: 'John', lastName: 'Doe', email: 'john@example.com', phoneNumber: '123-456-7890', resume: 'link-to-resume.pdf', coverLetter: 'Lorem ipsum...', whyWorkHere: 'I am interested in the company values...', agreeTerms: true, privacyPolicy: true },
  ];
  const formData = getFormData();
    const applications = [formData];
    if (applications.length === 0) {
        alert('No applications to display.');
        return;
    }
    saveFormData(formData);
    const table = document.createElement('table');
    const headerRow = table.insertRow(0);
    Object.keys(applications[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    applications.forEach(application => {
        const row = table.insertRow();
        Object.values(application).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });
    });
    applicationsTable.innerHTML = '';
    applicationsTable.appendChild(table);
    document.getElementById('jobApplicationForm').reset();
}

function saveFormData(formData) {
  console.log('Data saved:', formData);
}
