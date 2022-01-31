import React, { FC, useContext } from 'react'
import { ToggleThemeContext } from './model'
import { THEMES } from 'shared/constants'
import { useTheme } from 'styled-components'
import { Switcher } from 'shared/ui/Switcher'

interface ThemeToggleProps {
	className?: string
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ className = '' }) => {
	const theme = useTheme()
	const toggleTheme = useContext(ToggleThemeContext)

	return (
		<Switcher
			onSwitch={toggleTheme}
			active={theme == THEMES.dark}
			className={className}
			aria-label={'Toggle different theme'}
		/>
	)
}
