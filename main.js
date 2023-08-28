const form = document.getElementById("dateForm");
const dayInput = document.getElementById("day");
const dayLabel = document.getElementById("day-label");
const dayError = document.getElementById("day-text-error");
const monthInput = document.getElementById("month");
const monthLabel = document.getElementById("month-label");
const monthError = document.getElementById("month-text-error");
const yearInput = document.getElementById("year");
const yearLabel = document.getElementById("year-label");
const yearError = document.getElementById("year-text-error");
const yearsResult = document.getElementById("years-result");
const monthsResult = document.getElementById("months-result");
const daysResult = document.getElementById("days-result");

// When the form is submitted it will calculate the date difference
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const dayValue = parseInt(dayInput.value, 10);
  const monthValue = parseInt(monthInput.value, 10);
  const yearValue = parseInt(yearInput.value, 10);

  // Checks if the value is missing
  if (isNaN(dayValue) || isNaN(monthValue) || isNaN(yearValue)) {
    dayInput.classList.add("input-field-error");
    dayLabel.classList.add("input-label-error");
    dayError.textContent = "This field is required";

    monthInput.classList.add("input-field-error");
    monthLabel.classList.add("input-label-error");
    monthError.textContent = "This field is required";

    yearInput.classList.add("input-field-error");
    yearLabel.classList.add("input-label-error");
    yearError.textContent = "This field is required";

    return;
  }

  // Creates a Date object from the input values
  const inputDate = new Date(yearValue, monthValue - 1, dayValue);

  // Creates today Date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Checks if the inputDate is valid
  if (!isNaN(inputDate) && inputDate < today) {
    dayInput.classList.remove("input-field-error");
    dayLabel.classList.remove("input-label-error");
    dayError.textContent = "";

    monthInput.classList.remove("input-field-error");
    monthLabel.classList.remove("input-label-error");
    monthError.textContent = "";

    yearInput.classList.remove("input-field-error");
    yearLabel.classList.remove("input-label-error");
    yearError.textContent = "";

    // Calculates the date difference
    let yearsDifference = today.getFullYear() - inputDate.getFullYear();
    let monthsDifference = today.getMonth() - inputDate.getMonth();
    let daysDifference = today.getDate() - inputDate.getDate();

    if (daysDifference < 0) {
      monthsDifference--;
      const daysInLastMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      daysDifference = daysInLastMonth + daysDifference;
    }

    if (monthsDifference < 0) {
      yearsDifference--;
      monthsDifference = 12 + monthsDifference;
    }

    yearsResult.textContent = yearsDifference;
    monthsResult.textContent = monthsDifference;
    daysResult.textContent = daysDifference;
  }
  // Checks for invalid input dates
  else if (
    inputDate.getFullYear() !== yearValue ||
    inputDate.getMonth() !== monthValue - 1 ||
    inputDate.getDate() !== dayValue
  ) {
    dayInput.classList.add("input-field-error");
    dayLabel.classList.add("input-label-error");
    dayError.textContent = "Must be a valid day";

    monthInput.classList.add("input-field-error");
    monthLabel.classList.add("input-label-error");
    monthError.textContent = "Must be a valid month";

    yearInput.classList.add("input-field-error");
    yearLabel.classList.add("input-label-error");
    yearError.textContent = "Must be in the past";
  }
});
