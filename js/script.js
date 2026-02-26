// ===============================
// Course Data
// ===============================
const courses = [
    "Devops + AI (AWS, Azure)",
    "Microsoft Dynamics CRM 365",
    "Power Automate & Copilot AI",
    "AI + ML",
    ".NET Fullstack + AI",
    "Python Fullstack + AI",
    "Java Fullstack + AI",
    "React Developer",
    "Linux Admin",
    "ServiceNow",
    "Terraform + Azure"
];

const images = [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1551434678-e076c223a692",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd"
];

// ===============================
// DOM Elements
// ===============================
const courseList = document.getElementById("courseList");
const courseDropdown = document.getElementById("course");
const requestSection = document.getElementById("requestSection");
const requestForm = document.getElementById("requestForm");

// ===============================
// Load Courses
// ===============================
courses.forEach((course, index) => {

    // Create Course Cards
    courseList.innerHTML += `
        <div class="col-md-4 mb-4">
            <div class="card shadow h-100">
                <img src="${images[index % images.length]}" class="course-img">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${course}</h5>
                    <button class="btn btn-outline-primary mt-auto"
                        onclick="selectCourse('${course}')">
                        Request Info
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add to dropdown
    courseDropdown.innerHTML += `<option value="${course}">${course}</option>`;
});

// ===============================
// Select Course + Smooth Scroll
// ===============================
function selectCourse(course) {

    // Set dropdown value
    courseDropdown.value = course;

    // Scroll to request section
    requestSection.scrollIntoView({ behavior: "smooth" });

    // Focus on Name field after small delay
    setTimeout(() => {
        document.getElementById("name").focus();
    }, 600);

    // Add temporary highlight effect
    requestForm.classList.add("shadow-lg", "border", "border-primary");

    setTimeout(() => {
        requestForm.classList.remove("shadow-lg", "border", "border-primary");
    }, 2000);
}

// ===============================
// Form Submit
// ===============================
requestForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const course = courseDropdown.value;

    if (!name || !email || !phone || !course) {
        alert("Please fill all fields.");
        return;
    }

    const newRequest = { name, email, phone, course };

    // Simulated storage (frontend only)
    fetch('data/requests.json')
        .then(response => response.json())
        .then(data => {
            data.push(newRequest);

            document.getElementById("message").innerText =
                "Thank you! Our team will contact you soon.";

            requestForm.reset();

            console.log("Stored Locally:", data);
        })
        .catch(() => {
            console.log("Local JSON simulation only.");
        });
});