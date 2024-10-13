function signUp() {
    const fullName = document.getElementById('fullName').value;
    const role = document.getElementById('role').value;

    if (fullName && role) {
        localStorage.setItem('userRole', role);
        window.location.href = "site.html";
    } else {
        alert('Please fill in all fields.');
    }
}

function checkRole() {
    const storedRole = localStorage.getItem('userRole');

    if (storedRole === 'editor') {
        document.getElementById('editorTools').style.display = 'block';
    }

    loadStudents(storedRole);
}

function addStudent() {
    const name = document.getElementById('student').value;
    const parent = document.getElementById('parent').value;
    const score = document.getElementById('studentScore').value;

    if (name && parent && score) {
        const newStudent = document.createElement('li');
        newStudent.textContent = `${name}│${parent}│${score}│`;

        const storedRole = localStorage.getItem('userRole');
        if (storedRole === 'editor') {
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => {
                newStudent.remove();
                saveStudents();
            };
            newStudent.appendChild(deleteButton);
        }

        document.getElementById('studentList').appendChild(newStudent);

        saveStudents();

        document.getElementById('student').value = '';
        document.getElementById('parent').value = '';
        document.getElementById('studentScore').value = '';
    } else {
        alert('Please fill in all fields.');
    }
}

function saveStudents() {
    const students = [];
    const studentListItems = document.querySelectorAll('#studentList li');
    studentListItems.forEach(item => {
        students.push(item.textContent.replace('Delete', '').trim());
    });
    localStorage.setItem('students', JSON.stringify(students));
}

function loadStudents(role) {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = student;

        if (role === 'editor') {
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => {
                li.remove();
                saveStudents();
            };
            li.appendChild(deleteButton);
        }

        document.getElementById('studentList').appendChild(li);
    });
}
