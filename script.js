let voices = [];
let voiceDelect = document.querySelector("select");
let speech = new SpeechSynthesisUtterance();

// เมื่อเสียงเปลี่ยนแปลง (onvoiceschanged) ให้ดึงเสียงที่มีอยู่
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    
    // เคลียร์ตัวเลือกก่อน
    voiceDelect.innerHTML = '';

    // เพิ่มเสียงทั้งหมดใน select element
    voices.forEach((voice, i) => {
        let option = new Option(voice.name, i);
        voiceDelect.appendChild(option);
    });

    // ตั้งค่าเสียงเริ่มต้น (เสียงไทยถ้ามี)
    const thaiVoice = voices.find(voice => voice.lang.includes('th'));
    speech.voice = thaiVoice || voices[0]; // ใช้เสียงไทยถ้ามี ถ้าไม่มีก็ใช้เสียงแรก
};

// ตั้งค่าเสียงเมื่อผู้ใช้เลือก
voiceDelect.addEventListener('change', () => {
    speech.voice = voices[voiceDelect.value];
});

// ฟังก์ชันสำหรับพูด
function speak(text) {
    speech.text = text; // กำหนดข้อความที่ต้องการให้พูด
    window.speechSynthesis.speak(speech); // เริ่มพูด
}

// เพิ่มการฟังปุ่มเมื่อคลิก
document.querySelector("button").addEventListener("click", () => {
    const text = document.querySelector("textarea").value; // ดึงข้อความจาก textarea
    speak(text); // เรียกใช้ฟังก์ชัน speak
});
