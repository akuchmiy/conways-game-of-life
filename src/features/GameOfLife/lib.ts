import { GameTile, TileStatus } from 'shared/domain'
import { drawTile } from 'entities/Tile'
import { game } from 'shared/constants'

export type Grid = GameTile[][]

interface CreateGameGridParams {
	tilesX: number
	tilesY: number
	tileSize: number
	random: boolean
}
export function createGameGrid({
	tilesX,
	tilesY,
	tileSize,
	random = false,
}: CreateGameGridParams): Grid {
	const grid: Grid = []

	for (let i = 0; i < tilesY; i++) {
		grid.push([])
		for (let j = 0; j < tilesX; j++) {
			grid[i].push({
				coords: {
					x: j * tileSize,
					y: i * tileSize,
				},
				status: random ? getRandomStatus() : TileStatus.DEAD,
			})
		}
	}

	return grid
}

export function generateUpdatedGrid(grid: Grid): Grid {
	return grid.map((tileRow, row) =>
		tileRow.map((tile, col) => {
			return {
				coords: tile.coords,
				status: getTileNextStatus(grid, row, col),
			}
		})
	)
}

interface DrawGridParams {
	ctx: CanvasRenderingContext2D
	grid: Grid
	tileSize: number
	colors: Record<TileStatus, string>
}

export function drawGrid({ ctx, grid, tileSize, colors }: DrawGridParams) {
	grid.forEach((tileRow) => {
		tileRow.forEach((tile) => {
			ctx.fillStyle = colors[tile.status]
			drawTile(ctx, tile.coords, tileSize)
		})
	})
}

export function clearGrid(ctx: CanvasRenderingContext2D) {
	ctx.clearRect(0, 0, 999999, 999999)
}

function getTileNextStatus(grid: Grid, row: number, col: number): TileStatus {
	const aliveNeighbors = countAliveTileNeighbors(grid, row, col)

	if (game.NEIGHBORS_TO_SURVIVE.includes(aliveNeighbors))
		return TileStatus.ALIVE

	return TileStatus.DEAD
}

function countAliveTileNeighbors(grid: Grid, row: number, col: number): number {
	const { rowFrom, rowTo, colFrom, colTo } = calculateNeighborsBoxBoundaries(
		grid,
		row,
		col
	)

	let aliveCounter = -1 // actual tile in center does not count

	for (let rowI = rowFrom; rowI <= rowTo; rowI++) {
		for (let colI = colFrom; colI <= colTo; colI++) {
			if (grid[rowI][colI].status === TileStatus.ALIVE) aliveCounter += 1
		}
	}

	return aliveCounter
}

function calculateNeighborsBoxBoundaries(grid: Grid, row: number, col: number) {
	const maxRow = grid.length - 1
	const maxCol = grid[0].length - 1

	const rowFrom = Math.max(row - game.COUNT_NEIGHBORS_OFFSET, 0)
	const colFrom = Math.max(col - game.COUNT_NEIGHBORS_OFFSET, 0)
	const rowTo = Math.min(row + game.COUNT_NEIGHBORS_OFFSET, maxRow)
	const colTo = Math.min(col + game.COUNT_NEIGHBORS_OFFSET, maxCol)

	return {
		rowFrom,
		rowTo,
		colFrom,
		colTo,
	}
}

function getRandomStatus() {
	return getRandBool() ? TileStatus.ALIVE : TileStatus.DEAD
}

function getRandBool() {
	return Math.random() > 0.5
}
