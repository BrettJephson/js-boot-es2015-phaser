precision mediump float;

varying vec2 vTextureCoord;
varying vec4 vColor;

uniform sampler2D uSampler;
uniform float customUniform;

void main(void)
{
   vec2 uv = vTextureCoord.xy;
   vec4 fg = vec4(uv.y, uv.x, 1.0, 1.0);
   gl_FragColor = fg;
}
