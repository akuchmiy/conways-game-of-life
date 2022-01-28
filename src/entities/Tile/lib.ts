import { Coordinates } from 'shared/domain'

export function drawTile(
	ctx: CanvasRenderingContext2D,
	coords: Coordinates,
	size: number
) {
	ctx.fillRect(coords.x, coords.y, size, size)
}
