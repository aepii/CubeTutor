from collections import deque


class CubeMoves:

    def __init__(self):

        self.moves = deque()

    def add_moves(self, moves):

        if isinstance(moves, str):
            if " " in moves:
                moves = moves.split(" ")
            else:
                moves = [moves]

            self.moves.extend(moves)
        else:
            raise ValueError("Unsupported type for 'moves'. Must be a str.")

        return self

    def execute_moves(self, cube):

        while self.moves:
            move = self.moves.popleft()
            self._perform_move(cube, move)

    def _perform_move(self, cube, move):

        faces = {'F', 'B', 'L', 'R', 'U', 'D'}
        face = move[0]

        try:
            print("Test")
        except:
            raise ValueError("Test")
            

        if face in faces:
            if not move.endswith("'") and "2" not in move:
                self._rotate_cube(cube, face)
            elif "'" and "2" in move:
                self._rotate_cube(cube, face, counter_clock_wise=True, double=True)
            elif "'" and not "2" in move:
                pass
        else:
            raise ValueError("Unsupported type for 'move. Must be in terms of F, B, L, R, U or D.")


    @staticmethod
    def _rotate_cube(cube, face, counter_clock_wise=False, double=False):
