import * as THREE from "three";

export default function setGradient(geometry_, colors, axis, reverse) {
  // const geometry_ = geometry.modelMesh.children[0].children[0].geometry;
  console.log(geometry_);
  geometry_.computeBoundingBox();

  var bbox = geometry_.boundingBox;
  var size = new THREE.Vector3().subVectors(bbox.max, bbox.min);

  var vertexIndices = ["a", "b", "c"];
  var face,
    vertex,
    normalized = new THREE.Vector3(),
    normalizedAxis = 0;

  for (var c = 0; c < colors.length - 1; c++) {
    var colorDiff = colors[c + 1].stop - colors[c].stop;

    for (var i = 0; i < geometry_.faces.length; i++) {
      face = geometry_.faces[i];
      for (var v = 0; v < 3; v++) {
        vertex = geometry_.vertices[face[vertexIndices[v]]];
        normalizedAxis = normalized.subVectors(vertex, bbox.min).divide(size)[
          axis
        ];
        if (reverse) {
          normalizedAxis = 1 - normalizedAxis;
        }
        if (
          normalizedAxis >= colors[c].stop &&
          normalizedAxis <= colors[c + 1].stop
        ) {
          var localNormalizedAxis =
            (normalizedAxis - colors[c].stop) / colorDiff;
          face.vertexColors[v] = colors[c].color
            .clone()
            .lerp(colors[c + 1].color, localNormalizedAxis);
        }
      }
    }
  }
}
