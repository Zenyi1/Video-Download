var convertBtn = document.querySelector('.convert-button');
var convertAud = document.querySelector('.convert-button2')
var URLinput = document.querySelector('.URL-input');
convertBtn.addEventListener('click', () => {
    console.log(`URL: ${URLinput.value}`);
    sendURL(URLinput.value);
});
function sendURL(URL) {
    window.location.href = `video-download-indol.vercel.app/api/download?URL=${URL}`;
}
