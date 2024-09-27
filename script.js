const form = document.getElementById('form');

if (form) {

    form.addEventListener('submit', function(event){

        event.preventDefault();
      
        const name = document.getElementById('name').value.trim();
        const age = document.getElementById('age').value.trim();
        const title = document.getElementById('title').value.trim();
        const hometown = document.getElementById('hometown').value.trim();

        let isValid = true;
        const nameField = document.getElementById('name');
        let nameErrorField = nameField.nextElementSibling;
        nameField.classList.remove('error');
        nameErrorField.textContent = "";
        nameErrorField.style.display = "none";
        

        if (!name)
        {
            isValid = false;            
            nameField.classList.add('error');
            
            nameErrorField.textContent = "Name is required.";
            nameErrorField.style.display = "block";
        
        } else if (!/^[A-Za-z\s]+$/.test(name)) {

            isValid = false;
            nameField.classList.add('error');
            nameErrorField.innerHTML = "Please enter a valid name.";
            nameErrorField.style.display = "block";
        }

        const ageField = document.getElementById('age');
        ageField.classList.remove('error');
        let ageErrorField = ageField.nextElementSibling;

        if (!age || isNaN(age) || age <= 0)
        {
            isValid = false;            
            ageField.classList.add('error');            
            ageErrorField.innerHTML = "Please enter a valid age.";
            ageErrorField.style.display = "block";
        }

        if (isValid)
        {
            const submission = {name, age, title, hometown};    
            let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
        
            submissions.push(submission);
            localStorage.setItem('submissions', JSON.stringify(submissions));
        
            window.location.href = 'submissions.html';
        }
    })
}

//fetch from localstorage and display on html
const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
const table = document.getElementById('dataTable');
const body = document.getElementById('data');

if (body)
{
    let data = "";
    if (submissions.length > 0)
    {
        
        submissions.forEach(submission => {
            data += `
            <tr>
                <td>${submission.name}</td>
                <td>${submission.age}</td>
                <td>${submission.title}</td>
                <td>${submission.hometown}</td>
            </tr>
            `;
        })

        body.innerHTML = data;
        table.style.display = 'table';
        msg.style.display = 'none';  
    }
    else
    {
        msg.innerHTML = "No any data found";      
        msg.style.display = 'block';  
        table.style.display = 'none';
    }

    
}

//clear data
const clear = document.getElementById('clear');
if (clear)
{
    clear.addEventListener('click', function(){
        localStorage.removeItem('submissions');
        location.reload();
    });
}




