import React, { FC, useRef } from 'react'
import styled from 'styled-components'
import { GameGrid } from './GameGrid'

const StyledCanvas = styled.canvas`
	display: block;
	border: 2px solid ${(props) => props.theme.color};
`

interface GameOfLifeProps {
	width: number
	height: number
	tileSize: number
	isPlaying?: boolean
	isClear?: boolean
	className?: string
}

export const GameOfLife: FC<GameOfLifeProps> = ({
	width,
	height,
	tileSize,
	isPlaying = true,
	className = '',
	isClear = true,
}) => {
	const canvas = useRef<HTMLCanvasElement>(null)

	const tilesX = width / tileSize
	const tilesY = height / tileSize

	return (
		<>
			<StyledCanvas
				width={width}
				height={height}
				ref={canvas}
				className={className}
			/>
			{canvas.current && (
				<GameGrid
					canvas={canvas.current}
					tilesX={tilesX}
					tilesY={tilesY}
					tileSize={tileSize}
					isPlaying={isPlaying}
					isClear={isClear}
				/>
			)}
		</>
	)
}
