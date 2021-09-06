"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = []; //creating an array

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
    console.log(jsonObject);

    const student = Object.create(Student); // new object with cleaned data

    student.firstName = getStudentsName(jsonObject.fullname.trim());
    student.lastName = getStudentsLastName(jsonObject.fullname.trim());
    student.middleName = getStudentsMiddleName(jsonObject.fullname.trim());
    student.house = getHouse(jsonObject.house.trim());
    allStudents.push(student); //adding students to the allStudents array
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

function getStudentsMiddleName(fullName) {
  if (fullName.includes(" ") == true) {
    const middleSpace = fullName.slice(fullName.indexOf(" ") + 1, fullName.lastIndexOf(" "));
    const firstCharacter = middleSpace.slice(0, 1);
    if (firstCharacter !== '"') {
      const cleanMiddleName = clean(middleSpace);
      return cleanMiddleName;
    }
  }
}
function getHouse(dataHouse) {
  const house = clean(dataHouse);
  return house;
}

//function getStudentsNickname(fullName) {}

function clean(name) {
  const firstLetter = name.slice(0, 1).toUpperCase();
  const restOfName = name.slice(1).toLowerCase();
  const cleanName = firstLetter + restOfName;
  return cleanName;
}
