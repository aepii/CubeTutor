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
