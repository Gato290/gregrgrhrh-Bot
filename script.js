const pasteInput = document.getElementById("pasteInput");
const saveBtn = document.getElementById("saveBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const pasteList = document.getElementById("pasteList");

// Load saved pastes
function loadPastes() {
  const pastes = JSON.parse(localStorage.getItem("pastes") || "[]");
  pasteList.innerHTML = "";
  pastes.forEach((p, index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = p.slice(0, 50) + (p.length > 50 ? "..." : "");
    const openBtn = document.createElement("button");
    openBtn.textContent = "Open";
    openBtn.onclick = () => (pasteInput.value = p);
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.style.background = "#ff1744";
    delBtn.onclick = () => {
      pastes.splice(index, 1);
      localStorage.setItem("pastes", JSON.stringify(pastes));
      loadPastes();
    };
    li.appendChild(span);
    li.appendChild(openBtn);
    li.appendChild(delBtn);
    pasteList.appendChild(li);
  });
}

saveBtn.onclick = () => {
  const text = pasteInput.value.trim();
  if (!text) return alert("Paste is empty!");
  const pastes = JSON.parse(localStorage.getItem("pastes") || "[]");
  pastes.unshift(text);
  localStorage.setItem("pastes", JSON.stringify(pastes));
  loadPastes();
  pasteInput.value = "";
};

copyBtn.onclick = () => {
  navigator.clipboard.writeText(pasteInput.value);
  alert("Copied to clipboard!");
};

clearBtn.onclick = () => {
  pasteInput.value = "";
};

loadPastes();
