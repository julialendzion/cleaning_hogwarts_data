"use strict";

window.addEventListener("DOMContentLoaded", start);
const allStudents = [];
let Student = {
  firstName: "",
  lastName: "",
  middleName: "",
  nickname: "",
  img: "",
  house: "",
};

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch(`https://petlatkea.dk/2021/hogwarts/students.json`)
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      console.log(jsonData);
      prepareObjects(jsonData);
    });
}
function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    // TODO: Create new object with cleaned data - and store that in the allAnimals array
    // TODO: MISSING CODE HERE !!!
    console.log(jsonObject);
    const student = Object.create(Student); // o co tu chodzi?
    student.firstName = getStudentsName(jsonObject.fullname.trim());
    student.lastName = getStudentsLastName(jsonObject.fullname.trim());
    allStudents.push(student);
  });
  console.table(allStudents);
}
function getStudentsName(fullName) {
  const name = fullName.substring(0, fullName.indexOf(" "));
  const firstName = clean(name);
  return firstName;
}

function getStudentsLastName(fullName) {
  const last = fullName.slice(fullName.lastIndexOf(" ") + 1);
  const lastName = clean(last);
  return lastName;
}

function clean(name) {
  const firstLetter = name.slice(0, 1).toUpperCase();
  const restOfName = name.slice(1).toLowerCase();
  const cleanName = firstLetter + restOfName;
  return cleanName;
}
