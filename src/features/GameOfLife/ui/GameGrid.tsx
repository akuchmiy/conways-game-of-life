import { FC, useEffect, useState } from 'react'
import {
	clearGrid,
	createGameGrid,
	drawGrid,
	generateUpdatedGrid,
	Grid,
	updateTileOnCoordinates,
} from '../lib'
import { TileStatus } from 'shared/domain'
import { useTheme } from 'styled-components'
import { GAME } from 'shared/constants'
import { useCanvasContext } from '../model'

interface GameGridProps {
	canvas: HTMLCanvasElement
	tilesX: number
	tilesY: number
	tileSize: number
	isPlaying: boolean
}

enum Buttons {
	LEFT = 0,
	MIDDLE = 1,
	RIGHT = 2,
}

export const GameGrid: FC<GameGridProps> = ({
	canvas,
	tilesX,
	tilesY,
	tileSize,
	isPlaying,
}) => {
	const ctx = useCanvasContext(canvas)
	const [grid, setGrid] = useState<Grid>([])
	const theme = useTheme()

	useEffect(
		function createANewGridOnNewContextAndProps() {
			const newGrid = createGameGrid({ tilesX, tilesY, tileSize, random: true })

			setGrid(newGrid)
		},
		[ctx, tileSize, tilesX, tilesY]
	)

	useEffect(
		function drawGridAndUpdateOnTimeout() {
			if (!grid.length) return

			drawGrid({
				ctx,
				grid,
				tileSize,
				colors: {
					[TileStatus.ALIVE]: theme.color,
					[TileStatus.DEAD]: theme.bg,
				},
			})

			if (!isPlaying) return () => clearGrid(ctx)

			const updateGrid = () => {
				const updatedGrid = generateUpdatedGrid(grid)

				setGrid(updatedGrid)
			}

			const timeoutId = setTimeout(updateGrid, GAME.GAME_SPEED)

			return () => {
				clearGrid(ctx)
				clearTimeout(timeoutId)
			}
		},
		[ctx, grid, theme, isPlaying]
	)

	useEffect(
		function attachCanvasOnMouseMoveListener() {
			if (!grid.length) return

			let isMouseDown = false
			let mouseButton = Buttons.LEFT

			const onMouseDown = (event: MouseEvent) => {
				mouseButton = event.button
				isMouseDown = true
			}
			const onMouseUp = () => (isMouseDown = false)

			const onMouseMove = (event: MouseEvent) => {
				if (!isMouseDown || mouseButton === Buttons.MIDDLE) return

				setGrid((grid) => {
					if (!grid || !grid.length) return grid

					const { x: canvasX, y: canvasY } = canvas.getBoundingClientRect()
					const coords = {
						x: event.clientX - canvasX,
						y: event.clientY - canvasY,
					}

					return updateTileOnCoordinates({
						grid,
						coords,
						tileSize,
						tileStatus:
							mouseButton === Buttons.LEFT ? TileStatus.ALIVE : TileStatus.DEAD,
					})
				})
			}

			const disableContextMenu = (event: MouseEvent) => event.preventDefault()

			canvas.addEventListener('mousedown', onMouseDown)
			canvas.addEventListener('mouseup', onMouseUp)
			canvas.addEventListener('mousemove', onMouseMove)
			canvas.addEventListener('contextmenu', disableContextMenu)

			return () => {
				canvas.removeEventListener('mousedown', onMouseDown)
				canvas.removeEventListener('mouseup', onMouseUp)
				canvas.removeEventListener('mousemove', onMouseMove)
				canvas.removeEventListener('contextmenu', disableContextMenu)
			}
		},
		[canvas, ctx, tileSize]
	)

	return null
}
