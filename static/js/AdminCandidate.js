// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    })
})()


document.querySelector("#btnAddNewCandidate").addEventListener("click", function () {
    resetForm(); // Reset form fields before showing the popup
    document.querySelector(".popup").classList.add("active");
});
function resetForm() {
    const form = document.querySelector('.popup form');
    if (form) {
        form.reset(); // Use the built-in reset method of the form element
    }
}
document.querySelector(".popup .close-btn").addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active")
    window.location.reload(); // Reloads the current page

});

function deleteCandidate(id) {
    // Confirm deletion (optional)
    console.log(id);
    const confirmation = confirm("Are you sure you want to delete this candidate?");
    if (confirmation) {
        // Make a DELETE request to the API endpoint to delete the election
        fetch(`/candidate/delete/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    // Remove the corresponding row from the table
                    const rowToRemove = document.getElementById(`candidateRow_${id}`);
                    if (rowToRemove) {
                        rowToRemove.remove();
                    }
                } else {
                    // Handle unsuccessful deletion (optional)
                    console.error('Failed to delete the Party');
                }

            })
            .catch(error => console.error('Error:', error));
    }
}
function editCandidate(id, firstName, lastName,dob,cnic,phoneNumber,province,city,region,address,createdBy) {

    // Set the form fields with the provided data
    document.getElementById('validationCustom01').value = firstName || '';
    document.getElementById('validationCustom02').value = lastName || '';
    document.getElementById('validationCustom03').value = formatDate(dob) || '';
    document.getElementById('validationCustom04').value = cnic || '';
    document.getElementById('validationCustom05').value = phoneNumber || '';
    document.getElementById('validationCustom09').value = address || '';

  // Set select elements for province, city, and region
  const selectProvince = document.getElementById('validationCustom06');
  if (selectProvince) {
    selectProvince.value = province || '';
  }

  const selectCity = document.getElementById('validationCustom07');
  if (selectCity) {
    selectCity.value = city || '';
  }

  const selectRegion = document.getElementById('validationCustom08');
  if (selectRegion) {
    selectRegion.value = region || '';
  }    // Set the popup to edit mode
    const popup = document.querySelector(".popup");
    popup.setAttribute("data-mode", "edit");
    popup.classList.add("active");

    // Handle form submission
    const form = document.querySelector('.popup form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const formData = new FormData(form);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        // Make a PUT request to the edit API endpoint
        fetch(`/candidate/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    // Handle successful update (if needed)
                    console.log('Candidate updated successfully');
                } else {
                    // Handle unsuccessful update (if needed)
                    console.error('Failed to update the election');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
}


function formatDate(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}
