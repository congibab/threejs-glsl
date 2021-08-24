precision mediump float;
precision mediump int;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 ViewDir;

uniform sampler2D texture1;
uniform float time;

float Fresnel(vec3 Normal,vec3 ViewDir,float Power)
{
    
    float test2=dot(normalize(ViewDir),normalize(Normal));
    float test1=clamp(test2,0.,1.);
    
    return pow(1.-test1,Power);
}

void main()
{
    float _FresnelEffect=Fresnel(vNormal,ViewDir,2.);
    gl_FragColor=vec4(0.,1.,1.,_FresnelEffect)*texture2D(texture1,fract(vUv*2.));
}