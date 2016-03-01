precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec2 resolution;
uniform float time;

vec2 curve(vec2 uv)
{
	uv = (uv - 0.5) * 2.0;
	uv *= 1.1;
	uv.x *= 1.0 + pow((abs(uv.y) / 5.0), 2.0);
	uv.y *= 1.0 + pow((abs(uv.x) / 4.0), 2.0);
	uv  = (uv / 2.0) + 0.5;
	uv =  uv *0.92 + 0.04;
	return uv;
}

void main() {
  vec2 uv = curve(vTextureCoord.xy);

  float d = length(uv - vec2(0.5));

  float blur = 0.0;
  blur = 1.0 + sin(time*3.20) * 0.5;
  blur *= 1.0 + sin(time * 16.0) * 0.5;
  blur = pow(blur, 3.0);
  blur *= 0.05;
  blur *= d;

  vec3 col = texture2D(uSampler, uv).rgb;
  col.r = texture2D(uSampler, vec2(uv.x+blur, uv.y)).r;
  col.g = texture2D(uSampler, uv).g;
  col.b = texture2D(uSampler, vec2(uv.x-blur, uv.y)).b;

  float vig = (-0.03 + 1.0 * 16.0 * uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y));
	col *= vec3(pow(vig,0.3));

  float scanline = sin((uv.y + 0.025 * time) * 800.0)*0.04;
  col -= scanline;

  col *= 1.0 - d * 0.5;

  gl_FragColor = vec4(col, 1.0);
}
