import { createProgram } from "./createProgram";
import { mat4 } from "gl-matrix";
import "./index.css";

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple two-dimensional square.
//
function initBuffers(gl) {
  // Create a buffer for the square's positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the square.

  const positions = [-0.5, -0.5, 0.5, -0.5, 0, 0.5];

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return {
    position: positionBuffer
  };
}

function main() {
  const webglDom = document.getElementById("webgl");
  const gl = webglDom.getContext("webgl");

  // Only continue if WebGL is available and working
  if (!gl) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  const vs = `
    attribute vec2 pos;
    void main(){
      gl_Position = vec4(pos,0,1);
    }
  `;

  const fs = `
    precision mediump float;
    uniform vec4 u_color;
    void main(){
      gl_FragColor = u_color;
    }
  `;

  // 着色器程序
  const shaderProgram = createProgram(gl, vs, fs);
  gl.useProgram(shaderProgram);

  // 获取着色器中变量的位置
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosAttrib: gl.getAttribLocation(shaderProgram, "pos")
    }
  };

  initBuffers(gl);

  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosAttrib);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosAttrib,
    2,
    gl.FLOAT,
    false,
    0,
    0
  );

  const u_color = gl.getUniformLocation(shaderProgram, "u_color");

  gl.uniform4f(u_color, 1, 0, 0, 1);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  const progress = document.getElementById("progress");
  progress.addEventListener("change", e => {
    const sliderValue = e.target.value;
    gl.uniform4f(u_color, sliderValue / 100, 0, 0, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  });
}

main();
