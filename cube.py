import numpy as np


class Cube:

    def __init__(self):
        self.front = None
        self.back = None
        self.left = None
        self.right = None
        self.upper = None
        self.lower = None

    def set_front(self, entry=None):

        if entry is None:
            self.front = np.array([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
        else:
            if isinstance(entry, list):
                self.front = np.array(entry)
            elif isinstance(entry, np.ndarray):
                self.front = entry
            else:
                raise ValueError("Unsupported type for 'entry'. Must be a list or a numpy.ndarray.")

    def set_back(self, entry=None):

        if entry is None:
            self.back = np.array([[1, 1, 1], [1, 1, 1], [1, 1, 1]])
        else:
            if isinstance(entry, list):
                self.back = np.array(entry)
            elif isinstance(entry, np.ndarray):
                self.back = entry
            else:
                raise ValueError("Unsupported type for 'entry'. Must be a list or a numpy.ndarray.")

    def set_left(self, entry=None):
        if entry is None:
            self.left = np.array([[2, 2, 2], [2, 2, 2], [2, 2, 2]])
        else:
            if isinstance(entry, list):
                self.left = np.array(entry)
            elif isinstance(entry, np.ndarray):
                self.left = entry
            else:
                raise ValueError("Unsupported type for 'entry'. Must be a list or a numpy.ndarray.")

    def set_right(self, entry=None):
        if entry is None:
            self.right = np.array([[3, 3, 3], [3, 3, 3], [3, 3, 3]])
        else:
            if isinstance(entry, list):
                self.right = np.array(entry)
            elif isinstance(entry, np.ndarray):
                self.right = entry
            else:
                raise ValueError("Unsupported type for 'entry'. Must be a list or a numpy.ndarray.")

    def set_upper(self, entry=None):
        if entry is None:
            self.upper = np.array([[4, 4, 4], [4, 4, 4], [4, 4, 4]])
        else:
            if isinstance(entry, list):
                self.upper = np.array(entry)
            elif isinstance(entry, np.ndarray):
                self.upper = entry
            else:
                raise ValueError("Unsupported type for 'entry'. Must be a list or a numpy.ndarray.")

    def set_lower(self, entry=None):
        if entry is None:
            self.lower = np.array([[5, 5, 5], [5, 5, 5], [5, 5, 5]])
        else:
            if isinstance(entry, list):
                self.lower = np.array(entry)
            elif isinstance(entry, np.ndarray):
                self.lower = entry
            else:
                raise ValueError("Unsupported type for 'entry'. Must be a list or a numpy.ndarray.")

    def __repr__(self):

        return (f"Cube Object: {id(self)}\n"
                f"Front:\n{self.front}\n"
                f"Back:\n{self.back}\n"
                f"Left:\n{self.left}\n"
                f"Right:\n{self.right}\n"
                f"Up:\n{self.upper}\n"
                f"Down:\n{self.lower}"
                )


