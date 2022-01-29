import { TileStatus } from 'shared/domain'

export const GAME_SPEED = 50

export const COUNT_NEIGHBORS_OFFSET = 1

export const NEIGHBORS_TO_SURVIVE_FOR_LIVE = [2, 3]
export const NEIGHBORS_TO_ALIVE_FOR_DEAD = [3]

export const CELLS_TO_SURVIVE = {
	[TileStatus.ALIVE]: NEIGHBORS_TO_SURVIVE_FOR_LIVE,
	[TileStatus.DEAD]: NEIGHBORS_TO_ALIVE_FOR_DEAD,
}
