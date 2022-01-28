import React, { FC } from 'react'
import { Button } from 'shared/ui/Button'
import { tiles } from 'shared/constants'
import styled from 'styled-components'

const Controls = styled.div`
	display: flex;
	justify-content: center;
	gap: 1em;
`

interface TileSizeControlsProps {
	size: number
	changeSize: (direction: 'UP' | 'DOWN') => void
	className?: string
}

export const TileSizeControls: FC<TileSizeControlsProps> = ({
	size,
	changeSize,
	className = '',
}) => {
	return (
		<Controls className={className}>
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
	)
}
