attribute vec3 Target;

varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;

varying vec3 ViewDir;
varying float vTime;

uniform float time;

void main()
{
  vUv = uv;
  vNormal = normal;
  vPosition = position;
  vTime = time;
  vec4 worldPostion = modelMatrix * vec4(position, 1.0 );
  ViewDir = cameraPosition - worldPostion.xyz;

  vec3 _normal = normalize(position.xyz);
  vec3 OutPosition = mix(position, _normal, abs(sin(time)));

  gl_Position = projectionMatrix*modelViewMatrix* vec4( OutPosition , 1.0 );
}
