import React, { useState } from 'react'
import styled from 'styled-components'
import { ThemeToggle } from 'features/ToggleTheme'
import { GameOfLife } from 'features/GameOfLife'
import { TileSizeControls } from 'features/TileSizeControls'
import { tiles, layout } from 'shared/constants'
import { useContainerWidth } from 'shared/hooks/useContainerWidth'

const Container = styled.div`
	position: relative;
	width: min(
		${layout.CONTAINER_PERCENTAGE_FROM_WINDOW * 100}%,
		${layout.MAX_CONTAINER_WIDTH}px
	);
	padding-top: 3em;
	margin: 0 auto;
	text-align: center;
`

const AbsoluteToggle = styled(ThemeToggle)`
	position: absolute;
	top: 1em;
	right: 0;
`

const StyledGame = styled(GameOfLife)`
	margin: 0 auto 0;
`

const StyledTileControls = styled(TileSizeControls)`
	margin-top: 1em;
`

export const Home = () => {
	const [size, setSize] = useState(tiles.MIN_TILE_SIZE)
	const containerWidth = useContainerWidth()

	function changeSize(direction: 'UP' | 'DOWN') {
		if (direction === 'UP') return setSize(size + tiles.TILE_SIZE_STEP)

		setSize(size - tiles.TILE_SIZE_STEP)
	}

	return (
		<Container>
			<StyledGame
				width={containerWidth}
				height={containerWidth}
				tileSize={size}
			/>
			<StyledTileControls size={size} changeSize={changeSize} />
			<AbsoluteToggle />
		</Container>
	)
}
