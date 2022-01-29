import React, { FC } from 'react'
import styled from 'styled-components'
import { LAYOUT } from 'shared/constants'

const StyledContainer = styled.div`
	position: relative;
	width: min(
		${LAYOUT.CONTAINER_PERCENTAGE_FROM_WINDOW * 100}%,
		${LAYOUT.MAX_CONTAINER_WIDTH}px
	);
	margin: 0 auto;
`

interface ContainerProps {
	className?: string
}

export const Container: FC<ContainerProps> = ({ children, className = '' }) => {
	return <StyledContainer className={className}>{children}</StyledContainer>
}
