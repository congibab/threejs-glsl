precision mediump float;
precision mediump int;

varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 ViewDir;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D texture3;
uniform sampler2D texture4;

uniform float time;

void main()
{
    vec4 Distort = texture2D(texture3, vUv);
    vec4 result = texture2D(texture4, vec2(vUv.x - Distort.g, vUv.y - Distort.r - (time)));
    float gradient = mix(0.0, 1.0, vNormal.y);
    vec3 color = vec3(0.8588, 0.6667, 0.2118);

    gl_FragColor = vec4(result.xyz * color, gradient * 2.0);
}