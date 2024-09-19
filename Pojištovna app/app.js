document.addEventListener('DOMContentLoaded', () => {
    let insureds = JSON.parse(localStorage.getItem('insureds')) || [];  // Načtení pojištěnců z localStorage
    let editingIndex = null;

    renderTable();

    document.getElementById('insuredForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const age = parseInt(document.getElementById('age').value);
        const phoneNumber = document.getElementById('phoneNumber').value;

        if (editingIndex !== null) {
            insureds[editingIndex] = { firstName, lastName, age, phoneNumber };
            editingIndex = null;
        } else {
            insureds.push({ firstName, lastName, age, phoneNumber });
        }

        localStorage.setItem('insureds', JSON.stringify(insureds));
        renderTable();
        clearForm();
    });

    document.getElementById('cancelEdit').addEventListener('click', function() {
        clearForm();
    });

    function renderTable() {
        const insuredTableBody = document.querySelector('#insuredTable tbody');
        insuredTableBody.innerHTML = '';  // Vymaže předchozí obsah tabulky

        insureds.forEach((insured, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${insured.firstName}</td>
                <td>${insured.lastName}</td>
                <td>${insured.phoneNumber}</td>
                <td>${insured.age}</td>
                <td>
                    <button class="edit-btn" onclick="startEditInsuredPerson(${index})">Upravit</button>
                    <button class="delete-btn" onclick="removeInsuredPerson(${index})">Smazat</button>
                </td>
            `;

            insuredTableBody.appendChild(row);
        });
    }

    window.startEditInsuredPerson = function(index) {
        const insured = insureds[index];
        document.getElementById('firstName').value = insured.firstName;
        document.getElementById('lastName').value = insured.lastName;
        document.getElementById('age').value = insured.age;
        document.getElementById('phoneNumber').value = insured.phoneNumber;

        document.getElementById('form-title').textContent = 'Upravit pojištěnce';
        editingIndex = index;
        document.getElementById('cancelEdit').style.display = 'inline-block';
    }

    window.removeInsuredPerson = function(index) {
        insureds.splice(index, 1);
        localStorage.setItem('insureds', JSON.stringify(insureds));
        renderTable();
    }

    function clearForm() {
        document.getElementById('insuredForm').reset();
        document.getElementById('form-title').textContent = 'Nový pojištěnec';
        editingIndex = null;
        document.getElementById('cancelEdit').style.display = 'none';
    }
});
