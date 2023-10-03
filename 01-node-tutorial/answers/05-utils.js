function ceoPrinter(ceos) {
  console.log("CEOs:");
  for (const [company, ceo] of Object.entries(ceos)) {
    console.log(`${company}: ${ceo}`);
  }
}

module.exports = ceoPrinter;
