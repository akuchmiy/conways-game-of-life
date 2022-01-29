import React, { FC } from 'react'
import { Button } from 'shared/ui/Button'
import { TILES } from 'shared/constants'
import styled from 'styled-components'

const Controls = styled.div`
	display: flex;
	justify-content: center;
	gap: 1em;
`

interface TileSizeControlsProps {
	size: number
	setSize: (size: number) => void
	className?: string
}

export const TileSizeControls: FC<TileSizeControlsProps> = ({
	size,
	setSize,
	className = '',
}) => {
	function changeSize(direction: 'UP' | 'DOWN') {
		if (direction === 'UP') return setSize(size + TILES.TILE_SIZE_STEP)

		setSize(size - TILES.TILE_SIZE_STEP)
	}

	return (
		<Controls className={className}>
			<Button
				onClick={() => changeSize('UP')}
				disabled={size == TILES.MAX_TILE_SIZE}
			>
				Increase size
			</Button>
			<Button
				onClick={() => changeSize('DOWN')}
				disabled={size == TILES.MIN_TILE_SIZE}
			>
				Decrease size
			</Button>
		</Controls>
	)
}
