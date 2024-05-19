
console.log("js loading");

$(document).ready(function () {
  // Initializes side nav from Materialize
  $('.sidenav').sidenav();
  // Initializes modals from Materialize
  $('.modal').modal();
  // Initializes datepicker from Materialize
  let datepicker = document.querySelectorAll(".datepicker");
  M.Datepicker.init(datepicker, {
    format: "dd mmmm, yyyy",
    i18n: { done: "Select" }
  });
  // Initializes select from Materialize
  let selects = document.querySelectorAll("select");
  M.FormSelect.init(selects);
  // Initializes collapsibles from Materialize
  $('.collapsible').collapsible();
});