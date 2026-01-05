// shifts
let shifts = JSON.parse(localStorage.getItem("kn_shifts") || "[]");
const shiftForm = document.getElementById("shiftForm");
const shiftList = document.getElementById("shiftList");

function renderShifts() {
  shiftList.innerHTML = "";
  shifts.forEach(s => {
    const li = document.createElement("li");
    li.textContent = `${s.date} — ${s.employee} — ${s.hours} год.`;
    shiftList.appendChild(li);
  });
}
renderShifts();

shiftForm.addEventListener("submit", e => {
  e.preventDefault();
  const employee = document.getElementById("employee").value;
  const date = document.getElementById("date").value;
  const hours = parseInt(document.getElementById("hours").value);
  shifts.push({ employee, date, hours });
  localStorage.setItem("kn_shifts", JSON.stringify(shifts));
  renderShifts();
  shiftForm.reset();
});

// logistic demo
const cargoList = document.getElementById("cargoList");
const cargos = [
  { id: 1, route: "Київ → Львів", status: "В дорозі" },
  { id: 2, route: "Одеса → Харків", status: "Доставлено" }
];
cargos.forEach(c => {
  const li = document.createElement("li");
  li.textContent = `${c.route} — ${c.status}`;
  cargoList.appendChild(li);
});