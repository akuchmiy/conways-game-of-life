import { useState } from 'react'
import { THEMES } from 'shared/constants'
import { usesDarkTheme } from '../lib'

export function useDarkTheme() {
	const initialTheme = usesDarkTheme() ? THEMES.dark : THEMES.light
	const [theme, setTheme] = useState(initialTheme)

	function toggleTheme() {
		if (theme === THEMES.light) return setTheme(THEMES.dark)

		setTheme(THEMES.light)
	}

	return { theme, toggleTheme }
}
