const dropzone = document.getElementById("dropzone");
const imageInput = document.getElementById("imageInput");
const uploadBtn = document.getElementById("uploadBtn");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.getElementById("progressContainer");
const imageLink = document.getElementById("imageLink");
const result = document.getElementById("result");
const themeToggle = document.getElementById("themeToggle");

// Handle drag & drop
dropzone.addEventListener("click", () => imageInput.click());

dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropzone.style.backgroundColor = "rgba(255,255,255,0.1)";
});

dropzone.addEventListener("dragleave", () => {
  dropzone.style.backgroundColor = "transparent";
});

dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropzone.style.backgroundColor = "transparent";
  imageInput.files = e.dataTransfer.files;
});

// Handle upload
uploadBtn.addEventListener("click", async () => {
  const file = imageInput.files[0];
  if (!file) {
    alert("Please select an image first.");
    return;
  }

  const formData = new FormData();
  formData.append("reqtype", "fileupload");
  formData.append("fileToUpload", file);

  progressContainer.style.display = "block";
  progressBar.style.width = "0%";

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://catbox.moe/user/api.php");

  xhr.upload.onprogress = (e) => {
    const percent = (e.loaded / e.total) * 100;
    progressBar.style.width = `${percent}%`;
  };

  xhr.onload = () => {
    if (xhr.status === 200) {
      imageLink.value = xhr.responseText;
      result.style.display = "block";
    } else {
      alert("Upload failed. Try again.");
    }
    progressBar.style.width = "100%";
  };

  xhr.onerror = () => {
    alert("Network error.");
  };

  xhr.send(formData);
});

// Copy to clipboard
function copyLink() {
  imageLink.select();
  document.execCommand("copy");
  alert("Link copied!");
}

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});