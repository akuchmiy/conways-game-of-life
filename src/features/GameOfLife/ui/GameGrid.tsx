import { FC, useEffect, useState } from 'react'
import {
	clearGrid,
	createGameGrid,
	drawGrid,
	generateUpdatedGrid,
	Grid,
} from '../lib'
import { TileStatus } from 'shared/domain'
import { useTheme } from 'styled-components'
import { game } from 'shared/constants'

interface GameGridProps {
	ctx: CanvasRenderingContext2D
	tilesX: number
	tilesY: number
	tileSize: number
}

export const GameGrid: FC<GameGridProps> = ({
	ctx,
	tilesX,
	tilesY,
	tileSize,
}) => {
	const [grid, setGrid] = useState<Grid | null>(null)
	const theme = useTheme()

	useEffect(() => {
		const newGrid = createGameGrid({ tilesX, tilesY, tileSize, random: true })

		setGrid(newGrid)
	}, [ctx, tileSize, tilesX, tilesY])

	useEffect(() => {
		if (!grid) return

		drawGrid({
			ctx,
			grid,
			tileSize,
			colors: { [TileStatus.ALIVE]: theme.color, [TileStatus.DEAD]: theme.bg },
		})

		const updateGrid = () => {
			const updatedGrid = generateUpdatedGrid(grid)

			setGrid(updatedGrid)
		}

		const timeoutId = setTimeout(updateGrid, game.GAME_SPEED)

		return () => {
			clearGrid(ctx)
			clearTimeout(timeoutId)
		}
	}, [ctx, grid, theme])

	return null
}
