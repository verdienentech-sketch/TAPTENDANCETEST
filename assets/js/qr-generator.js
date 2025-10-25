document.getElementById('session-select').addEventListener('change', function() {
    const sessionId = this.value;
    const data = `session:${sessionId},student:${currentUser.id}`;
    document.getElementById('qrcode').innerHTML = '';
    new QRCode(document.getElementById("qrcode"), data);
});