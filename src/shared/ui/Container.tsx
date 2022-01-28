import React, { FC } from 'react'
import styled from 'styled-components'
import { layout } from 'shared/constants'

const StyledContainer = styled.div`
	position: relative;
	width: min(
		${layout.CONTAINER_PERCENTAGE_FROM_WINDOW * 100}%,
		${layout.MAX_CONTAINER_WIDTH}px
	);
	margin: 0 auto;
`

interface ContainerProps {
	className?: string
}

export const Container: FC<ContainerProps> = ({ children, className = '' }) => {
	return <StyledContainer className={className}>{children}</StyledContainer>
}
