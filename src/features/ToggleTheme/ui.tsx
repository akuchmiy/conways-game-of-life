import React, { FC, useContext } from 'react'
import { ToggleThemeContext } from './model'
import { THEMES } from 'shared/constants'
import styled, { useTheme } from 'styled-components'
import cn from 'classnames'

const Switcher = styled.button`
	cursor: pointer;
	display: inline-block;
	position: relative;
	width: 50px;
	aspect-ratio: 2 / 1;

	outline: none;
	border: 2px solid transparent;
	border-radius: 2em;

	background-color: ${(props) => props.theme.color};
	transition: background-color 200ms ease;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		aspect-ratio: 1;
		border-radius: 50%;

		background-color: ${(props) => props.theme.bg};
		transition: background-color 200ms ease, left 200ms, transform 200ms;
	}

	&:focus::before {
		box-shadow: 0 0 3px 4px #ff97aa;
	}

	&.active::before {
		left: 100%;

		transform: translateX(-100%);
	}
`

interface ThemeToggleProps {
	className?: string
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ className = '' }) => {
	const theme = useTheme()
	const toggleTheme = useContext(ToggleThemeContext)

	return (
		<Switcher
			onClick={toggleTheme}
			className={cn({ active: theme == THEMES.dark }, className)}
			aria-label={'Toggle different theme'}
		/>
	)
}
