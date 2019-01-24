import { createProgram } from "./createProgram";
import triangle_f from "./shaders/triangle_f.glsl";
import triangle_v from "./shaders/triangle_v.glsl";
import "./index.css";

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

  // Set clear color to black, fully opaque
  gl.clearColor(0.0, 0.5, 1.0, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
  console.log(gl.COLOR_BUFFER_BIT, gl);

  // for (let key in gl) {
  //   console.log(key, gl[key]);
  // }

  //   常量名称	值	说明
  // DEPTH_BUFFER_BIT	0x00000100	通过 clear 来清除深度缓冲区。
  // STENCIL_BUFFER_BIT	0x00000400	通过 clear 来清除当前模板缓冲区。
  // COLOR_BUFFER_BIT	0x00004000	通过 clear 来清除颜色缓冲区。
}

main();
