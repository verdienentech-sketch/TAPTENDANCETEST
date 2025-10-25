// Mock data
let sessions = JSON.parse(localStorage.getItem('sessions')) || [];
let attendance = JSON.parse(localStorage.getItem('attendance')) || [];
let currentUser = null;

// Panels
const panels = {
    login: document.getElementById('login-panel'),
    admin: document.getElementById('admin-panel'),
    student: document.getElementById('student-panel'),
    scanner: document.getElementById('scanner-panel')
};

function showPanel(panel) {
    Object.values(panels).forEach(p => p.classList.remove('active'));
    panels[panel].classList.add('active');
}

// Login
document.getElementById('login-btn').addEventListener('click', () => {
    const role = document.getElementById('role-select').value;
    currentUser = { role, id: 1, name: 'Demo User' }; // Mock
    showPanel(role);
    if (role === 'admin') renderAdmin();
    else renderStudent();
});

// Admin: Sessions
document.getElementById('session-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('session-name').value;
    sessions.push({ id: Date.now(), name, active: true });
    localStorage.setItem('sessions', JSON.stringify(sessions));
    renderAdmin();
});

function renderAdmin() {
    const list = document.getElementById('sessions-list');
    list.innerHTML = sessions.map(s => `<li>${s.name} <button onclick="toggleSession(${s.id})">${s.active ? 'Deactivate' : 'Activate'}</button></li>`).join('');
    renderAttendance();
}

function toggleSession(id) {
    const session = sessions.find(s => s.id === id);
    session.active = !session.active;
    localStorage.setItem('sessions', JSON.stringify(sessions));
    renderAdmin();
}

// Attendance
function renderAttendance() {
    const table = document.getElementById('attendance-table');
    table.innerHTML = '<tr><th>Session</th><th>Student</th><th>Time</th></tr>' +
        attendance.map(a => `<tr><td>${a.sessionName}</td><td>${a.studentName}</td><td>${a.time}</td></tr>`).join('');
}

// Student: Sessions
function renderStudent() {
    const select = document.getElementById('session-select');
    select.innerHTML = sessions.filter(s => s.active).map(s => `<option value="${s.id}">${s.name}</option>`).join('');
}