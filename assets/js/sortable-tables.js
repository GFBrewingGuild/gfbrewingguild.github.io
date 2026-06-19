document.addEventListener("DOMContentLoaded", function () {
  const tables = document.querySelectorAll("table");

  tables.forEach((table) => {
    const headers = table.querySelectorAll("th");

    headers.forEach((header, columnIndex) => {
      header.style.cursor = "pointer";
      header.title = "Click to sort";

      header.addEventListener("click", () => {
        const tbody = table.querySelector("tbody");
        const rows = Array.from(tbody.querySelectorAll("tr"));
        const currentDirection = header.getAttribute("data-sort-direction");
        const ascending = currentDirection !== "asc";

        headers.forEach((h) => h.removeAttribute("data-sort-direction"));
        header.setAttribute("data-sort-direction", ascending ? "asc" : "desc");

        rows.sort((a, b) => {
          const aText = a.children[columnIndex]?.innerText.trim() || "";
          const bText = b.children[columnIndex]?.innerText.trim() || "";

          const aNum = parseFloat(aText.replace(/[^0-9.-]/g, ""));
          const bNum = parseFloat(bText.replace(/[^0-9.-]/g, ""));

          if (!isNaN(aNum) && !isNaN(bNum) && aText.match(/\d/) && bText.match(/\d/)) {
            return ascending ? aNum - bNum : bNum - aNum;
          }

          return ascending
            ? aText.localeCompare(bText)
            : bText.localeCompare(aText);
        });

        rows.forEach((row) => tbody.appendChild(row));
      });
    });
  });
});
