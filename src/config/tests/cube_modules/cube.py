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

    def rotate_face(self, face, clockwise=True):
        if clockwise:
            self.faces[face] = numpy.rot90(self.faces[face], -1)  # Rotate the face clockwise

            if face == "top":  # 'U' face
                front_prev = self.faces['front'].copy()
                self.faces['front'][0, :] = self.faces['left'][0, :]
                self.faces['left'][0, :] = self.faces['back'][0, :]
                self.faces['back'][0, :] = self.faces['right'][0, :]
                self.faces['right'][0, :] = front_prev[0, :]

            elif face == "bottom":  # 'D' face
                front_prev = self.faces['front'].copy()
                self.faces['front'][2, :] = self.faces['right'][2, :]
                self.faces['right'][2, :] = self.faces['back'][2, :]
                self.faces['back'][2, :] = self.faces['left'][2, :]
                self.faces['left'][2, :] = front_prev[2, :]

            elif face == "left":  # 'L' face
                front_prev = self.faces['front'].copy()
                self.faces['front'][:, 0] = self.faces['top'][:, 0]
                self.faces['top'][:, 0] = self.faces['back'][::-1, 2]
                self.faces['back'][:, 2] = self.faces['bottom'][::-1, 0]
                self.faces['bottom'][:, 0] = front_prev[:, 0]

            elif face == "right":  # 'R' face
                front_prev = self.faces['front'].copy()
                self.faces['front'][:, 2] = self.faces['bottom'][:, 2]
                self.faces['bottom'][:, 2] = self.faces['back'][::-1, 0]
                self.faces['back'][:, 0] = self.faces['top'][::-1, 2]
                self.faces['top'][:, 2] = front_prev[:, 2]

            elif face == "front":  # 'F' face
                upper_prev = self.faces['top'].copy()
                self.faces['front'] = numpy.rot90(self.faces['front'], -1)
                self.faces['top'][2, :] = self.faces['left'][::-1, 2]
                self.faces['left'][:, 2] = self.faces['bottom'][0, :]
                self.faces['bottom'][0, :] = self.faces['right'][::-1, 0]
                self.faces['right'][:, 0] = upper_prev[2, :]

            elif face == "back":  # 'B' face
                upper_prev = self.faces['top'].copy()
                self.faces['back'] = numpy.rot90(self.faces['back'], -1)
                self.faces['top'][0, :] = self.faces['right'][:, 2]
                self.faces['right'][:, 2] = self.faces['bottom'][2, ::-1]
                self.faces['bottom'][2, :] = self.faces['left'][:, 0]
                self.faces['left'][:, 0] = upper_prev[0, ::-1]

        elif not clockwise:
            self.faces[face] = numpy.rot90(self.faces[face], 1)  # Rotate the face counter-clockwise

            if face == "top":  # 'U' face
                front_prev = self.faces['front'].copy()
                self.faces['front'][0, :] = self.faces['right'][0, :]
                self.faces['right'][0, :] = self.faces['back'][0, :]
                self.faces['back'][0, :] = self.faces['left'][0, :]
                self.faces['left'][0, :] = front_prev[0, :]

            elif face == "bottom":  # 'D' face
                front_prev = self.faces['front'].copy()
                self.faces['front'][2, :] = self.faces['left'][2, :]
                self.faces['left'][2, :] = self.faces['back'][2, :]
                self.faces['back'][2, :] = self.faces['right'][2, :]
                self.faces['right'][2, :] = front_prev[2, :]

            elif face == "left":  # 'L' face
                front_prev = self.faces['front'].copy()
                self.faces['front'][:, 0] = self.faces['bottom'][:, 0]
                self.faces['bottom'][:, 0] = self.faces['back'][::-1, 2]
                self.faces['back'][:, 2] = self.faces['top'][::-1, 0]
                self.faces['top'][:, 0] = front_prev[:, 0]

            elif face == "right":  # 'R' face
                front_prev = self.faces['front'].copy()
                self.faces['front'][:, 2] = self.faces['top'][:, 2]
                self.faces['top'][:, 2] = self.faces['back'][::-1, 0]
                self.faces['back'][:, 0] = self.faces['bottom'][::-1, 2]
                self.faces['bottom'][:, 2] = front_prev[:, 2]

            elif face == "front":  # 'F' face
                upper_prev = self.faces['top'].copy()
                self.faces['front'] = numpy.rot90(self.faces['front'], 1)
                self.faces['top'][2, :] = self.faces['right'][:, 0]
                self.faces['right'][:, 0] = self.faces['bottom'][0, ::-1]
                self.faces['bottom'][0, :] = self.faces['left'][:, 2]
                self.faces['left'][:, 2] = upper_prev[2, ::-1]

            elif face == "back":  # 'B' face
                upper_prev = self.faces['top'].copy()
                self.faces['back'] = numpy.rot90(self.faces['back'], 1)
                self.faces['top'][0, :] = self.faces['left'][::-1, 0]
                self.faces['left'][:, 0] = self.faces['bottom'][2, :]
                self.faces['bottom'][2, :] = self.faces['right'][::-1, 2]
                self.faces['right'][:, 2] = upper_prev[0, ::-1]