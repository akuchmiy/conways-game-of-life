export interface Coordinates {
	x: number
	y: number
}

export enum TileStatus {
	DEAD = 'dead',
	ALIVE = 'alive',
}

export interface GameTile {
	coords: Coordinates
	status: TileStatus
}
