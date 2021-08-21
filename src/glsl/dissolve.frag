precision mediump float;
precision mediump int;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 ViewDir;

uniform float time;

#pragma glslify:snoise=require(glsl-noise/simplex/3d.glsl)

vec4 InverseLerp(vec4 A, vec4 B, vec4 T)
{
    return (T - A)/(B - A);
}


void main()
{
    //float noise = snoise(vPosition * 5.0);
    float noise =  snoise(vPosition * 5.0) + vPosition.y;
    float test1 =  step(sin(time) * 1.5 , noise);
    float test2 =  step(sin(time) * 1.5  + 0.2, noise);
    
    vec3 color = mix( vec3(1.0), vec3(0.3176, 0.898, 0.9216), (test1 - test2));
    gl_FragColor= vec4(color, test1);
}