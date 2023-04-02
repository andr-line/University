// calculate area
function calculateArea() {
    var shape = document.getElementById("shape").value;
    var radius = parseFloat(document.getElementById("radius").value);
    var area;

    if (shape === "circle") {
        area = Math.PI * radius * radius;
    } else if (shape === "square") {
        area = radius * radius;
    } else if (shape === "rectangle") {
        var width = parseFloat(prompt("Enter width:"));
        area = radius * width;
    } else if (shape === "triangle") {
        var height = parseFloat(prompt("Enter height:"));
        area = 0.5 * radius * height;
    }

    document.getElementById("result").value = area;
}