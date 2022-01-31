import React, { useState } from 'react'
import styled from 'styled-components'
import { ThemeToggle } from 'features/ToggleTheme'
import { GameOfLife } from 'features/GameOfLife'
import { TileSizeControls } from 'features/TileSizeControls'
import { ToggleGamePlay } from 'features/ToggleGamePlay'
import { Container } from 'shared/ui/Container'
import { Switcher } from 'shared/ui/Switcher'
import { TILES } from 'shared/constants'
import { useContainerWidth } from 'shared/hooks/useContainerWidth'

const StyledContainer = styled(Container)`
	padding-top: 3em;
`

const StyledThemeToggle = styled(ThemeToggle)`
	&& {
		position: absolute;
		top: 1em;
		right: 0;
	}
`

const StyledGame = styled(GameOfLife)`
	margin: 0 auto 0.5em;
`

const Title = styled.h1`
	text-align: center;
`

const Controls = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 1em;

	margin-top: 1em;
`

const RandomSwitcherContainer = styled.div`
	display: inline-flex;
	align-items: center;
	margin-left: 1em;
`

const StyledRandomSwitcher = styled(Switcher)`
	margin-left: 1em;
`

export const Home = () => {
	const [size, setSize] = useState(
		TILES.MIN_TILE_SIZE + TILES.TILE_SIZE_STEP * 2
	)
	const [isPlaying, setIsPlaying] = useState(true)
	const [isRandom, setIsRandom] = useState(true)
	const containerWidth = useContainerWidth()

	return (
		<StyledContainer>
			<StyledGame
				width={containerWidth}
				height={containerWidth}
				tileSize={size}
				isPlaying={isPlaying}
				isInitialRandom={isRandom}
			/>
			<Title>Current size: {size}</Title>
			<Controls>
				<div>
					<ToggleGamePlay isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
					<RandomSwitcherContainer>
						Is random
						<StyledRandomSwitcher
							onSwitch={() => setIsRandom(!isRandom)}
							active={isRandom}
						/>
					</RandomSwitcherContainer>
				</div>
				<TileSizeControls size={size} setSize={setSize} />
			</Controls>
			<StyledThemeToggle />
		</StyledContainer>
	)
}
