import React, { useState } from 'react'
import styled from 'styled-components'
import { ThemeToggle } from 'features/ToggleTheme'
import { GameOfLife } from 'features/GameOfLife'
import { TileSizeControls } from 'features/TileSizeControls'
import { Container } from 'shared/ui/Container'
import { tiles } from 'shared/constants'
import { useContainerWidth } from 'shared/hooks/useContainerWidth'

const StyledContainer = styled(Container)`
	padding-top: 3em;
`

const StyledThemeToggle = styled(ThemeToggle)`
	position: absolute;
	top: 1em;
	right: 0;
`

const StyledGame = styled(GameOfLife)`
	margin: 0 auto 0.5em;
`

const Title = styled.h1`
	text-align: center;
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
		<StyledContainer>
			<StyledGame
				width={containerWidth}
				height={containerWidth}
				tileSize={size}
			/>
			<Title>Current size: {size}</Title>
			<StyledTileControls size={size} changeSize={changeSize} />
			<StyledThemeToggle />
		</StyledContainer>
	)
}
