const greeting= document.getElementById("greeting");

const nameInput= document.getElementById("nameInput");

const greetButton= document.getElementById("greetButton");

greetButton.addEventListener("click", function() {
    const name= nameInput.value;
    greeting.textContent= "Hello, "+ name;
});

const redBox = document.getElementById("red");
const blueBox = document.getElementById("blue");
const greenBox = document.getElementById("green");
const yellowBox = document.getElementById("yellow");

redBox.addEventListener("click", function() {
    redBox.style.backgroundColor = "red";
});

blueBox.addEventListener("click", function() {
    blueBox.style.backgroundColor = "blue";
});

greenBox.addEventListener("click", function() {
    greenBox.style.backgroundColor = "green";
});

yellowBox.addEventListener("click", function() {
    yellowBox.style.backgroundColor = "yellow";
});