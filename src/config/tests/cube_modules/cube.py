import numpy

class Cube:

    FACE_NAMES = ['front', 'back', 'left', 'right', 'upper', 'lower']

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
            'upper': numpy.full((3, 3), fill_value=5, dtype=int),
            'lower': numpy.full((3, 3), fill_value=6, dtype=int)
        }

        if entry is None:
            self.faces[face] = default_matrices[face]
        else:
            self.faces[face] = entry

    def rotate_face(self, face, clockwise=True):
        print(face, clockwise)
        if clockwise:

            if face == "upper":

                front_prev = self.faces['front'].copy()

                self.faces['upper'] = numpy.rot90(self.faces['upper'], 1, (1, 0))

                self.faces['front'][0] = self.faces['right'][0]
                self.faces['right'][0] = self.faces['back'][0]
                self.faces['back'][0] = self.faces['left'][0]
                self.faces['left'][0] = front_prev[0]

            elif face == "lower":

                front_prev = self.faces['front'].copy()

                self.faces['lower'] = numpy.rot90(self.faces['lower'], 1, (1, 0))

                self.faces['front'][2] = self.faces['left'][2]
                self.faces['left'][2] = self.faces['back'][2]
                self.faces['back'][2] = self.faces['right'][2]
                self.faces['right'][2] = front_prev[2]

            elif face == "left":

                front_prev = self.faces['front'].copy()

                self.faces['left'] = numpy.rot90(self.faces['left'], 1, (1, 0))

                self.faces['front'][:, 0] = self.faces['upper'][:, 0]
                self.faces['upper'][:, 0] = self.faces['back'][::-1, 2]
                self.faces['back'][:, 2] = self.faces['lower'][::-1, 0]
                self.faces['lower'][:, 0] = front_prev[:, 0]

            elif face == "right":

                front_prev = self.faces['front'].copy()

                self.faces['right'] = numpy.rot90(self.faces['right'], 1, (1, 0))

                self.faces['front'][:, 2] = self.faces['lower'][:, 2]
                self.faces['lower'][:, 2] = self.faces['back'][::-1, 0]
                self.faces['back'][:, 0] = self.faces['upper'][::-1, 2]
                self.faces['upper'][:, 2] = front_prev[:, 2]

            elif face == "front":

                upper_prev = self.faces['upper'].copy()

                self.faces['front'] = numpy.rot90(self.faces['front'], 1, (1, 0))

                self.faces['upper'][2] = self.faces['left'][::-1, 2]
                self.faces['left'][:, 2] = self.faces['lower'][0]
                self.faces['lower'][0] = self.faces['right'][::-1, 0]
                self.faces['right'][:, 0] = upper_prev[2]

            elif face == "back":

                upper_prev = self.faces['upper'].copy()

                self.faces['back'] = numpy.rot90(self.faces['back'], 1, (1, 0))

                self.faces['upper'][0] = self.faces['right'][:, 2]
                self.faces['right'][:, 2] = self.faces['lower'][2, ::-1]
                self.faces['lower'][2] = self.faces['left'][:, 0]
                self.faces['left'][:, 0] = upper_prev[0, ::-1]


        elif not clockwise:
            self.faces[face] = numpy.rot90(self.faces[face], 1, (0,1))  # Rotate the face counter-clockwise

            if face == "upper":  # 'U' face
                front_prev = self.faces['front'].copy()
                self.faces['front'][0, :] = self.faces['right'][0, :]
                self.faces['right'][0, :] = self.faces['back'][0, :]
                self.faces['back'][0, :] = self.faces['left'][0, :]
                self.faces['left'][0, :] = front_prev[0, :]

            elif face == "lower":  # 'D' face
                front_prev = self.faces['front'].copy()
                self.faces['front'][2, :] = self.faces['left'][2, :]
                self.faces['left'][2, :] = self.faces['back'][2, :]
                self.faces['back'][2, :] = self.faces['right'][2, :]
                self.faces['right'][2, :] = front_prev[2, :]

            elif face == "left":  # 'L' face
                front_prev = self.faces['front'].copy()
                self.faces['front'][:, 0] = self.faces['lower'][:, 0]
                self.faces['lower'][:, 0] = self.faces['back'][::-1, 2]
                self.faces['back'][:, 2] = self.faces['upper'][::-1, 0]
                self.faces['upper'][:, 0] = front_prev[:, 0]

            elif face == "right":  # 'R' face
                front_prev = self.faces['front'].copy()
                self.faces['front'][:, 2] = self.faces['upper'][:, 2]
                self.faces['upper'][:, 2] = self.faces['back'][::-1, 0]
                self.faces['back'][:, 0] = self.faces['lower'][::-1, 2]
                self.faces['lower'][:, 2] = front_prev[:, 2]

            elif face == "front":  # 'F' face
                upper_prev = self.faces['upper'].copy()
                self.faces['upper'][2, :] = self.faces['right'][:, 0]
                self.faces['right'][:, 0] = self.faces['lower'][0, ::-1]
                self.faces['lower'][0, :] = self.faces['left'][:, 2]
                self.faces['left'][:, 2] = upper_prev[2, ::-1]

            elif face == "back":  # 'B' face
                upper_prev = self.faces['upper'].copy()
                self.faces['upper'][0, :] = self.faces['left'][::-1, 0]
                self.faces['left'][:, 0] = self.faces['lower'][2, :]
                self.faces['lower'][2, :] = self.faces['right'][::-1, 2]
                self.faces['right'][:, 2] = upper_prev[0, ::-1]


    def __repr__(self):
        value_to_color = {
            0: "Grey",
            1: "Green",
            2: "Blue",
            3: "Orange",
            4: "Red",
            5: "White",
            6: "Yellow"
        }

        faces = {
            'Front': self.faces['front'],
            'Back': self.faces['back'],
            'Left': self.faces['left'],
            'Right': self.faces['right'],
            'Up': self.faces['upper'],
            'Down': self.faces['lower']
        }

        result = f"Cube Object: {id(self)}\n"

        for face, matrix in faces.items():
            colors = numpy.array([[value_to_color[val] for val in row] for row in matrix])
            result += f"{face}:\n{colors}\n"

        return result