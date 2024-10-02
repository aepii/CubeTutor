import numpy

class Cube:

    FACE_NAMES = ['front', 'back', 'left', 'right', 'top', 'bottom']

    def __init__(self, empty=True):
        self.faces = {}

        if empty:
            for face in Cube.FACE_NAMES:
                self.faces[face] = numpy.zeros((3, 3), dtype=int)
        else:
            for face in Cube.FACE_NAMES:
                self.set_face(face)

    def set_face(self, face, entry=None):

        default_matrices = {
            'front': numpy.full((3, 3), fill_value=1, dtype=int),
            'back': numpy.full((3, 3), fill_value=2, dtype=int),
            'left': numpy.full((3, 3), fill_value=3, dtype=int),
            'right': numpy.full((3, 3), fill_value=4, dtype=int),
            'top': numpy.full((3, 3), fill_value=5, dtype=int),
            'bottom': numpy.full((3, 3), fill_value=6, dtype=int)
        }

        if entry is None:
            self.faces[face] = default_matrices[face]
        else:
            self.faces[face] = entry

