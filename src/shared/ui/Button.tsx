import React, { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
	cursor: pointer;
	position: relative;
	z-index: 1;

	font-size: 1em;
	padding: 0.5em 1em;

	border: 0.2em solid ${(props) => props.theme.color};
	outline: none;
	box-shadow: none;

	font-weight: 600;
	color: ${(props) => props.theme.color};
	background-color: ${(props) => props.theme.bg};

	&:hover,
	&:focus {
		color: ${(props) => props.theme.bg};
	}

	transition: color 100ms ease-out, background 100ms ease-out;

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;

		display: block;
		background-color: ${(props) => props.theme.color};

		transform: scaleX(0);
		transform-origin: left;
		transition: transform 200ms ease;
	}

	&:hover::before,
	&:focus::before {
		transform: scaleX(1);
	}
`

export const Button: FC<HTMLAttributes<HTMLButtonElement>> = ({
	children,
	...rest
}) => {
	return <StyledButton {...rest}>{children}</StyledButton>
}
