interface Shape {
  type: string;
}

interface Circle extends Shape {
  type: "circle";
  radius: number;
}

interface Rectangle extends Shape {
  type: "rectangle";
  width: number;
  height: number;
}

interface Triangle extends Shape {
  type: "triangle";
  base: number;
  height: number;
}

type Shapes = Circle | Triangle | Rectangle;

const getElement = (id: string): HTMLElement => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element not found: ${id}`);
  return el;
};

let shapeTypeSelect: HTMLSelectElement;

let propertyGroups: {
  circle: HTMLElement;
  rectangle: HTMLElement;
  triangle: HTMLElement;
};

let propertyInputs: {
  radius: HTMLInputElement;
  width: HTMLInputElement;
  height: HTMLInputElement;
  base: HTMLInputElement;
  triangleHeight: HTMLInputElement;
};

let resultText: HTMLElement;
let resultCard: HTMLElement;

const chooseShape = (shapeType: string) => {
  Object.entries(propertyGroups).forEach(([name, group]) => {
    if (name === shapeType) {
      group.classList.remove("hidden");
    } else {
      group.classList.add("hidden");
    }
  });
};

const toggleResultCard = (show: boolean) => {
  if (show) {
    resultCard.classList.add("visible");
  } else {
    resultCard.classList.remove("visible");
  }
};

const calculateArea = (shape: Shapes): string => {
  switch (shape.type) {
    case "circle":
      return `Area of Circle: ${(Math.PI * shape.radius ** 2).toFixed(2)}`;
    case "rectangle":
      return `Area of Rectangle: ${(shape.width * shape.height).toFixed(2)}`;
    case "triangle":
      return `Area of Triangle: ${(0.5 * shape.base * shape.height).toFixed(2)}`;
    default:
      const _nonExistent: never = shape;
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
  let result: string = "";

  if (shape === "circle") {
    const radius = Number(propertyInputs.radius.value);
    if (!isNaN(radius)) {
      result = calculateArea({
        type: "circle",
        radius: radius,
      });
      toggleResultCard(true);
    } else {
      toggleResultCard(false);
    }
  } else if (shape === "rectangle") {
    const width = Number(propertyInputs.width.value);
    const height = Number(propertyInputs.height.value);
    if (!isNaN(width) && !isNaN(height)) {
      result = calculateArea({
        type: "rectangle",
        width: width,
        height: height,
      });
      toggleResultCard(true);
    } else {
      toggleResultCard(false);
    }
  } else if (shape === "triangle") {
    const base = Number(propertyInputs.base.value);
    const height = Number(propertyInputs.triangleHeight.value);
    if (!isNaN(base) && !isNaN(height)) {
      result = calculateArea({
        type: "triangle",
        base: base,
        height: height,
      });
      toggleResultCard(true);
    } else {
      toggleResultCard(false);
    }
  }

  resultText.textContent = result;
}

const handleShapeSelect = (e: Event) => {
  e.preventDefault();
  clearInputFields();

  const val = e.currentTarget as HTMLSelectElement;
  if (!val) {
    return "target value not found";
  }

  const hasSelection = Boolean(val.value);
  toggleResultCard(hasSelection);

  chooseShape(val.value);
  
  // Clear result text when shape changes
  resultText.textContent = "";
};

const handleInput = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const value = Number(input.value);

  if (value < 0) {
    alert("Negative values are not allowed.");
    input.value = "0";
    updateResult();
  } else {
    updateResult();
  }
};

function initializeApp() {
  shapeTypeSelect = getElement("shape-type") as HTMLSelectElement;
  
  propertyGroups = {
    circle: getElement("circle-props") as HTMLElement,
    rectangle: getElement("rectangle-props") as HTMLElement,
    triangle: getElement("triangle-props") as HTMLElement
  };
  
  propertyInputs = {
    radius: getElement("radius") as HTMLInputElement,
    width: getElement("width") as HTMLInputElement,
    height: getElement("height") as HTMLInputElement,
    base: getElement("base") as HTMLInputElement,
    triangleHeight: getElement("triangle-height") as HTMLInputElement
  };
  
  resultText = getElement("result-text") as HTMLElement;
  resultCard = getElement("result-card") as HTMLElement;
  
  shapeTypeSelect.addEventListener("input", handleShapeSelect);
  
  for (const [, input] of Object.entries(propertyInputs)) {
    input.addEventListener("input", handleInput);
  }
}

document.addEventListener("DOMContentLoaded", initializeApp);