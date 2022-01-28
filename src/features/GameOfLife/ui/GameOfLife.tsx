import React, { FC, useRef } from 'react'
import styled from 'styled-components'
import { useCanvasContext } from '../model'
import { GameGrid } from './GameGrid'

const StyledCanvas = styled.canvas`
	display: block;
	border: 2px solid ${(props) => props.theme.color};
`

interface GameOfLifeProps {
	width: number
	height: number
	className?: string
	tileSize: number
}

export const GameOfLife: FC<GameOfLifeProps> = ({
	width,
	height,
	tileSize,
	className = '',
}) => {
	const canvas = useRef<HTMLCanvasElement>(null)
	const ctx = useCanvasContext(canvas.current)

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
			{ctx && (
				<GameGrid
					ctx={ctx}
					tilesX={tilesX}
					tilesY={tilesY}
					tileSize={tileSize}
				/>
			)}
		</>
	)
}
