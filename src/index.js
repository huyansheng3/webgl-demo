import { createProgram } from "./createProgram";
import triangle_f from "./shaders/triangle_f.glsl";
import triangle_v from "./shaders/triangle_v.glsl";
import "./index.css";

const webglDom = document.getElementById("webgl");
const gl = webglDom.getContext("webgl");

const program = createProgram(gl, triangle_v, triangle_f);
console.log(program);
const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
console.log(positionAttributeLocation);
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

console.log(gl.ARRAY_BUFFER);

const positions = [0, 0, 0, 0.5, 0.7, 0];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

webglUtils.resizeCanvasToDisplaySize(gl.canvas);
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.useProgram(program);

gl.enableVertexAttribArray(positionAttributeLocation);

// 告诉属性怎么从positionBuffer中读取数据 (ARRAY_BUFFER)
var size = 2; // 每次迭代运行提取两个单位数据
var type = gl.FLOAT; // 每个单位的数据类型是32位浮点型
var normalize = false; // 不需要归一化数据
var stride = 0; // 0 = 移动单位数量 * 每个单位占用内存（sizeof(type)）
// 每次迭代运行运动多少内存到下一个数据开始点
var offset = 0; // 从缓冲起始位置开始读取
gl.vertexAttribPointer(
  positionAttributeLocation,
  size,
  type,
  normalize,
  stride,
  offset
);

var primitiveType = gl.TRIANGLES;
var offset = 0;
var count = 3;
gl.drawArrays(primitiveType, offset, count);
