// 片断着色器没有默认精度，所以我们需要设置一个精度
  // mediump是一个不错的默认值，代表“medium precision”（中等精度）
  precision mediump float;

  void main() {
    // gl_FragColor是一个片断着色器主要设置的变量
    gl_FragColor = vec4(0.8, 0, 0.8, 0.4); // 返回“瑞迪施紫色”
  }