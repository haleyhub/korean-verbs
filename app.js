const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const irregFilter = document.getElementById("irregFilter");
const tableBody = document.getElementById("tableBody");
const resultCount = document.getElementById("resultCount");

function renderTable() {
  const query = searchInput.value.trim().toLowerCase();
  const typeVal = typeFilter.value;
  const irregVal = irregFilter.value;

  const filtered = words.filter(w => {
    const matchesQuery =
      w.base.includes(query) ||
      w.eng.toLowerCase().includes(query) ||
      w.polite.includes(query);
    const matchesType = typeVal === "all" || w.type === typeVal;
    const matchesIrreg =
      irregVal === "all" ||
      (irregVal === "Regular" && w.pattern === "Regular") ||
      (irregVal === "Irregular" && w.pattern.startsWith("Irregular"));
    return matchesQuery && matchesType && matchesIrreg;
  });

  resultCount.textContent = `Showing ${filtered.length} of ${words.length} entries`;
  tableBody.innerHTML = filtered.map(w => `
    <tr>
      <td>
        <span class="hangul">${w.base}</span>
        <span class="irreg">${w.pattern}</span>
      </td>
      <td>${w.eng}</td>
      <td><span class="badge ${w.type === "Verb" ? "verb" : "adj"}">${w.type}</span></td>
      <td>${w.polite}</td>
      <td>${w.formal}</td>
      <td>${w.past}</td>
      <td>${w.future}</td>
      <td>${w.casual}</td>
    </tr>
  `).join("");
}

searchInput.addEventListener("input", renderTable);
typeFilter.addEventListener("change", renderTable);
irregFilter.addEventListener("change", renderTable);
renderTable();
