varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

varying vec3 ViewDir;
uniform float time;

void main()
{
  vUv = uv;
  vNormal = normal;
  vPosition = position;

  vec4 worldPostion = modelMatrix * vec4(position, 1.0 );
  ViewDir = cameraPosition - worldPostion.xyz;
  
  gl_Position = projectionMatrix*modelViewMatrix* vec4( position, 1.0 );
}
