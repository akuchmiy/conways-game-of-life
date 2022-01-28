import React, { useState } from 'react'
import styled from 'styled-components'
import { ThemeToggle } from 'features/ToggleTheme'
import { Button } from 'shared/ui/Button'
import { GameOfLife } from 'features/GameOfLife'
import { tiles } from 'shared/constants'

const Container = styled.div`
	position: relative;
	width: min(70vw, 1170px);
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

const Controls = styled.div`
	display: flex;

	margin-top: 1em;
	justify-content: center;
	gap: 1em;
`

export const Home = () => {
	const [size, setSize] = useState(tiles.MIN_TILE_SIZE)

	function changeSize(direction: 'UP' | 'DOWN') {
		if (direction === 'UP') return setSize(size + tiles.TILE_SIZE_STEP)

		setSize(size - tiles.TILE_SIZE_STEP)
	}

	return (
		<Container>
			<StyledGame width={700} height={700} tileSize={size} />
			<Controls>
				<Button
					onClick={() => changeSize('UP')}
					disabled={size == tiles.MAX_TILE_SIZE}
				>
					Increase size
				</Button>
				<Button
					onClick={() => changeSize('DOWN')}
					disabled={size == tiles.MIN_TILE_SIZE}
				>
					Decrease size
				</Button>
			</Controls>
			<AbsoluteToggle />
		</Container>
	)
}
