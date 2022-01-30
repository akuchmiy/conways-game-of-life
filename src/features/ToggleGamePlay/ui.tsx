import React, { FC } from 'react'
import { Button } from 'shared/ui/Button'

interface ToggleGamePlayProps {
	isPlaying: boolean
	setIsPlaying: (isPlaying: boolean) => void
	className?: string
}

export const ToggleGamePlay: FC<ToggleGamePlayProps> = ({
	isPlaying,
	setIsPlaying,
	className,
}) => {
	return (
		<Button onClick={() => setIsPlaying(!isPlaying)} className={className}>
			{isPlaying ? 'Pause' : 'Play'}
		</Button>
	)
}
