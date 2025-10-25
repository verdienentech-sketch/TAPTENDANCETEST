let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
scanner.addListener('scan', function (content) {
    const [session, student] = content.split(',').map(s => s.split(':')[1]);
    const sessionObj = sessions.find(s => s.id == session);
    attendance.push({
        sessionName: sessionObj.name,
        studentName: currentUser.name,
        time: new Date().toLocaleString()
    });
    localStorage.setItem('attendance', JSON.stringify(attendance));
    alert('Attendance recorded');
    showPanel('admin'); // Or back to student
});

// Camera toggle
document.getElementById('camera-toggle').addEventListener('click', function() {
    Instascan.Camera.getCameras().then(function (cameras) {
        const current = scanner.camera;
        const next = cameras[(cameras.indexOf(current) + 1) % cameras.length];
        scanner.stop().then(() => scanner.start(next));
    });
});

// Back button
document.getElementById('back-btn').addEventListener('click', () => showPanel(currentUser.role));

// Start scanner when entering panel (add to app.js showPanel)
if (panel === 'scanner') {
    Instascan.Camera.getCameras().then(cameras => scanner.start(cameras[0]));
}