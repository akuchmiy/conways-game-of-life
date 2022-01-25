import React, { FC, useContext } from 'react'
import { ToggleThemeContext } from './model'
import { themes } from 'shared/constants'
import styled, { useTheme } from 'styled-components'

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

	&.active::before {
		left: 100%;

		transform: translateX(-100%);
	}
`

export const ThemeToggle: FC = () => {
	const theme = useTheme()
	const toggleTheme = useContext(ToggleThemeContext)

	return (
		<Switcher
			onClick={toggleTheme}
			className={theme == themes.dark ? 'active' : ''}
			aria-label={'Toggle different theme'}
		/>
	)
}
