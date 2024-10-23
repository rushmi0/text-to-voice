let voices = [];
let voiceSelect = document.querySelector("select");
let speech = new SpeechSynthesisUtterance();

// ฟังก์ชันเพื่ออัปเดตตัวเลือกเสียง
function updateVoiceOptions() {
    voices = window.speechSynthesis.getVoices();
    
    // เคลียร์ตัวเลือกก่อน
    voiceSelect.innerHTML = '';

    // เพิ่มเสียงทั้งหมดใน select element
    voices.forEach((voice, i) => {
        console.log(voice);
        let option = new Option(voice.name, i);
        voiceSelect.appendChild(option);
    });

    // ตั้งค่าเสียงเริ่มต้น (เสียงไทยถ้ามี)
    const thaiVoice = voices.find(voice => voice.lang.includes('th'));
    speech.voice = thaiVoice || voices[0]; // ใช้เสียงไทยถ้ามี ถ้าไม่มีก็ใช้เสียงแรก
}

// เมื่อเสียงเปลี่ยนแปลง (onvoiceschanged) ให้ดึงเสียงที่มีอยู่
window.speechSynthesis.onvoiceschanged = updateVoiceOptions;

// ตั้งค่าเสียงเมื่อผู้ใช้เลือก
voiceSelect.addEventListener('change', () => {
    speech.voice = voices[voiceSelect.value];
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

// เรียกใช้ฟังก์ชันอัปเดตเสียงเมื่อโหลดหน้า
window.addEventListener('load', updateVoiceOptions);
