function calculate() {
  // GET INPUTS
  let top = Number(document.getElementById("top").value);
  let bottom = Number(document.getElementById("bottom").value);
  let left = Number(document.getElementById("left").value);
  let right = Number(document.getElementById("right").value);

  // UPDATE DIAGRAM VALUES
  document.getElementById("topDisplay1").innerText = `${top}°`;
  document.getElementById("topDisplay2").innerText = `${top}°`;

  document.getElementById("bottomDisplay1").innerText = `${bottom}°`;
  document.getElementById("bottomDisplay2").innerText = `${bottom}°`;

  document.getElementById("leftDisplay1").innerText = `${left}°`;
  document.getElementById("leftDisplay2").innerText = `${left}°`;

  document.getElementById("rightDisplay1").innerText = `${right}°`;
  document.getElementById("rightDisplay2").innerText = `${right}°`;

  if (isNaN(top) || isNaN(bottom) || isNaN(left) || isNaN(right)) {
    alert("Please fill in all boundary temperatures.");
    return;
  }

  // CREATE AUGMENTED MATRIX
  let matrix = [
    [4, -1, 0, -1, top + left],
    [-1, 4, -1, 0, top + right],
    [0, -1, 4, -1, bottom + right],
    [-1, 0, -1, 4, bottom + left],
  ];

  let n = 4;

  document.getElementById("matrixOutput").innerText = `
[ 4   -1    0   -1  | ${top + left} ]
[ -1   4   -1    0  | ${top + right} ]
[ 0   -1    4   -1  | ${bottom + right} ]
[ -1   0   -1    4  | ${bottom + left} ]
`;

  // GAUSSIAN ELIMINATION
  for (let i = 0; i < n; i++) {
    // PIVOT
    let pivot = matrix[i][i];

    for (let j = 0; j < n + 1; j++) {
      matrix[i][j] /= pivot;
    }

    // ELIMINATION
    for (let k = i + 1; k < n; k++) {
      let factor = matrix[k][i];

      for (let j = 0; j < n + 1; j++) {
        matrix[k][j] -= factor * matrix[i][j];
      }
    }
  }

  // BACK SUBSTITUTION
  let x = new Array(n);

  for (let i = n - 1; i >= 0; i--) {
    x[i] = matrix[i][n];

    for (let j = i + 1; j < n; j++) {
      x[i] -= matrix[i][j] * x[j];
    }
  }

  // DISPLAY RESULTS
  document.getElementById("t1Result").innerText = `${x[0].toFixed(2)} °C`;

  document.getElementById("t2Result").innerText = `${x[1].toFixed(2)} °C`;

  document.getElementById("t3Result").innerText = `${x[2].toFixed(2)} °C`;

  document.getElementById("t4Result").innerText = `${x[3].toFixed(2)} °C`;
}

function resetFields() {
  document.getElementById("topDisplay1").innerText = "20°";
  document.getElementById("topDisplay2").innerText = "20°";

  document.getElementById("bottomDisplay1").innerText = "30°";
  document.getElementById("bottomDisplay2").innerText = "30°";

  document.getElementById("leftDisplay1").innerText = "10°";
  document.getElementById("leftDisplay2").innerText = "10°";

  document.getElementById("rightDisplay1").innerText = "40°";
  document.getElementById("rightDisplay2").innerText = "40°";
}

function startApp() {
  // CONFETTI
  confetti({
    particleCount: 150,
    spread: 100,
    origin: {
      y: 0.6,
    },
  });

  // CLOSE MODAL
  document.getElementById("welcomeModal").style.display = "none";
}
