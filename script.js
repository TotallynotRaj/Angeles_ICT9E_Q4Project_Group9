document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.pathname.split("/").pop();
    const menuLinks = document.querySelectorAll('.sidebar ul li a');

    menuLinks.forEach(link => {
        link.classList.remove("active");
        
        const linkPage = link.getAttribute("href");
        if (currentPage === linkPage || (currentPage === "" && linkPage === "dashboard.html")) {
            link.classList.add("active");
        }
    });
});

/* The login thingy */
function login() {
    const u = document.getElementById('user')?.value;
    const p = document.getElementById('pass')?.value;

    if (u === "Admin" && p === "1234") {
        sessionStorage.setItem("isLoggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        alert("❌ Invalid Credentials");
    }
}

function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}

/*Profile*/
function initProfile() {
    const uploadInput = document.getElementById("uploadPFP");
    const profileImg = document.querySelector(".profile-avatar img");
    const studentName = document.getElementById("studentName");

    const savedPFP = localStorage.getItem("pfp");
    if (savedPFP && profileImg) profileImg.src = savedPFP;

    if (uploadInput && profileImg) {
        uploadInput.addEventListener("change", function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function () {
                    profileImg.src = reader.result;
                    localStorage.setItem("pfp", reader.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (studentName) {
        const savedName = localStorage.getItem("studentName");
        if (savedName) studentName.innerText = savedName;

        studentName.addEventListener("input", function () {
            localStorage.setItem("studentName", this.innerText);
        });
    }
}

window.onload = initProfile;

/* notebooks */
const teachers = {
    "Filipino": { 
        name: "WINMHAR SALAZAR", 
        img: "Filipino.jpg",
        topic: "National Identity & Literature",
        desc: "Mastering the Filipino language through the lens of history, culture, and the profound symbolism of Jose Rizal's works." 
    },
    "English": { 
        name: "ROGELIO JR ALEGRID", 
        img: "english.jpg",
        topic: "Global Communication & World Lit",
        desc: "Developing a global voice through critical analysis of world masterpieces and advanced rhetorical composition." 
    },
    "Math": { 
        name: "ANGELINA CRISTOBAL", 
        img: "math.jpg",
        topic: "Advanced Logical Reasoning",
        desc: "A rigorous journey through Algebra and Geometry, turning complex equations into tools for real-world problem solving." 
    },
    "Social Studies": { 
        name: "RUEL ROQUE", 
        img: "ss.jpg",
        topic: "Civics & Global Perspectives",
        desc: "Analyzing the forces of history and economics to understand our role as citizens in an interconnected world." 
    },
    "Science": { 
        name: "AILENE GALANG", 
        img: "science.jpg",
        topic: "Inquiry & Empirical Discovery",
        desc: "Unlocking the secrets of the physical and biological world through evidence-based research and laboratory experimentation." 
    },
    "ICT": { 
        name: "LUISITO BALAJADIA", 
        img: "ict.jpg",
        topic: "Digital Architecture & Innovation",
        desc: "Equipping 9-Emerald with the technical prowess and ethical framework to lead in the digital 21st century." 
    },
    "Values Education": { 
        name: "SEAN PATRICK MERCADO", 
        img: "ve.jpg",
        topic: "Character & Ethical Leadership",
        desc: "Refining personal integrity and moral judgment to become a person of substance and conscience." 
    },
    "Music & Arts": { 
        name: "AMELIA AGUIRRE", 
        img: "music.jpg",
        topic: "Aesthetic Appreciation & Theory",
        desc: "Exploring the soul of humanity through harmonic theory and the evolution of visual artistic movements." 
    },
    "TLE": { 
        name: "ROSELLE SARMIENTO", 
        img: "tle.jpg",
        topic: "Practical Arts & Entrepreneurship",
        desc: "Transforming theoretical knowledge into livelihood skills, focusing on innovation and practical life management." 
    }
};

function openNotebook(subject) {
    const popup = document.getElementById("notebookPopup");
    const title = document.getElementById("popupTitle");
    const desc = document.getElementById("popupDesc");
    const img = document.getElementById("popupImage");

    if (!popup) return;

    const data = teachers[subject];
    if (data) {
        title.innerText = subject;
        img.src = data.img;
        desc.innerHTML = `
            <div style="font-weight: 800; color: #d4af37; letter-spacing: 2px; margin-bottom: 5px;">${data.topic.toUpperCase()}</div>
            <div style="font-size: 0.9rem; margin-bottom: 20px; color: #888;">INSTRUCTOR: ${data.name}</div>
            <p style="padding: 0 20px; font-style: italic;">"${data.desc}"</p>
            <div style="margin-top: 25px; border-top: 1px solid #eee; padding-top: 20px;">
                <span style="background: #f0f0f0; padding: 8px 15px; border-radius: 20px; font-size: 0.8rem;">9-Emerald SY 2025-2026</span>
            </div>
        `;
    }
    popup.style.display = "flex";
}
function closePopup() {
    const popup = document.getElementById("notebookPopup");
    if (popup) {
        popup.style.display = "none";
    }
}

window.addEventListener("click", function(event) {
    const popup = document.getElementById("notebookPopup");
    if (event.target === popup) {
        closePopup();
    }
});

window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closePopup();
    }
});
