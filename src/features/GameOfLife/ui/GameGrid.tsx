import { FC, useEffect, useState } from 'react'
import {
	createGameGrid,
	createGridNeighborsBoundaries,
	drawGrid,
	generateUpdatedGrid,
	Grid,
	GridTileNeighborsBoundaries,
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
	const [gridTileNeighborsBoundaries, setGridTileNeighborsBoundaries] =
		useState<GridTileNeighborsBoundaries>([])
	const theme = useTheme()

	useEffect(
		function createNewGrid() {
			const newGrid = createGameGrid({ tilesX, tilesY, tileSize, random: true })
			const newBoundaries = createGridNeighborsBoundaries(newGrid)

			setGrid(newGrid)
			setGridTileNeighborsBoundaries(newBoundaries)
		},
		[ctx, tileSize, tilesX, tilesY]
	)

	useEffect(
		function drawNewGrid() {
			drawGrid({
				ctx,
				grid,
				tileSize,
				colors: {
					[TileStatus.ALIVE]: theme.color,
					[TileStatus.DEAD]: theme.bg,
				},
			})
		},
		[ctx, grid, theme]
	)

	useEffect(
		function updateGridOnTimeout() {
			if (!grid.length || grid.length !== gridTileNeighborsBoundaries.length)
				return
			if (!isPlaying) return

			const updateGrid = () => {
				const updatedGrid = generateUpdatedGrid(
					grid,
					gridTileNeighborsBoundaries
				)

				setGrid(updatedGrid)
			}

			const timeoutId = setTimeout(updateGrid, GAME.GAME_SPEED)

			return () => clearTimeout(timeoutId)
		},
		[ctx, grid, gridTileNeighborsBoundaries, theme, isPlaying]
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
