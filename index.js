"use strict";
const getElement = (id) => {
    const el = document.getElementById(id);
    if (!el)
        throw new Error(`Element not found: ${id}`);
    return el;
};
let shapeTypeSelect;
let propertyGroups;
let propertyInputs;
let resultText;
let resultCard;
const chooseShape = (shapeType) => {
    Object.entries(propertyGroups).forEach(([name, group]) => {
        if (name === shapeType) {
            group.classList.remove("hidden");
        }
        else {
            group.classList.add("hidden");
        }
    });
};
const toggleResultCard = (show) => {
    if (show) {
        resultCard.classList.add("visible");
    }
    else {
        resultCard.classList.remove("visible");
    }
};
const calculateArea = (shape) => {
    switch (shape.type) {
        case "circle":
            return `Area of Circle: ${(Math.PI * shape.radius ** 2).toFixed(2)}`;
        case "rectangle":
            return `Area of Rectangle: ${(shape.width * shape.height).toFixed(2)}`;
        case "triangle":
            return `Area of Triangle: ${(0.5 * shape.base * shape.height).toFixed(2)}`;
        default:
            const _nonExistent = shape;
            return _nonExistent;
    }
};
const clearInputFields = () => {
    document.querySelectorAll("input").forEach((input) => {
        input.value = "";
    });
};
function updateResult() {
    const shape = shapeTypeSelect.value;
    let result = "";
    if (shape === "circle") {
        const radius = Number(propertyInputs.radius.value);
        if (!isNaN(radius)) {
            result = calculateArea({
                type: "circle",
                radius: radius,
            });
            toggleResultCard(true);
        }
        else {
            toggleResultCard(false);
        }
    }
    else if (shape === "rectangle") {
        const width = Number(propertyInputs.width.value);
        const height = Number(propertyInputs.height.value);
        if (!isNaN(width) && !isNaN(height)) {
            result = calculateArea({
                type: "rectangle",
                width: width,
                height: height,
            });
            toggleResultCard(true);
        }
        else {
            toggleResultCard(false);
        }
    }
    else if (shape === "triangle") {
        const base = Number(propertyInputs.base.value);
        const height = Number(propertyInputs.triangleHeight.value);
        if (!isNaN(base) && !isNaN(height)) {
            result = calculateArea({
                type: "triangle",
                base: base,
                height: height,
            });
            toggleResultCard(true);
        }
        else {
            toggleResultCard(false);
        }
    }
    resultText.textContent = result;
}
const handleShapeSelect = (e) => {
    e.preventDefault();
    clearInputFields();
    const val = e.currentTarget;
    if (!val) {
        return "target value not found";
    }
    const hasSelection = Boolean(val.value);
    toggleResultCard(hasSelection);
    chooseShape(val.value);
    // Clear result text when shape changes
    resultText.textContent = "";
};
const handleInput = (e) => {
    const input = e.target;
    const value = Number(input.value);
    if (value < 0) {
        alert("Negative values are not allowed.");
        input.value = "0";
        updateResult();
    }
    else {
        updateResult();
    }
};
function initializeApp() {
    shapeTypeSelect = getElement("shape-type");
    propertyGroups = {
        circle: getElement("circle-props"),
        rectangle: getElement("rectangle-props"),
        triangle: getElement("triangle-props")
    };
    propertyInputs = {
        radius: getElement("radius"),
        width: getElement("width"),
        height: getElement("height"),
        base: getElement("base"),
        triangleHeight: getElement("triangle-height")
    };
    resultText = getElement("result-text");
    resultCard = getElement("result-card");
    shapeTypeSelect.addEventListener("input", handleShapeSelect);
    for (const [, input] of Object.entries(propertyInputs)) {
        input.addEventListener("input", handleInput);
    }
}
document.addEventListener("DOMContentLoaded", initializeApp);
