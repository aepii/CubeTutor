from cube import CubeBuilder
from cube_moves import CubeMoves

myCube = CubeBuilder().Cube
print(myCube)
myCubeMoves = CubeMoves().add_moves("R2 L2 L' R")
print(myCubeMoves.moves)