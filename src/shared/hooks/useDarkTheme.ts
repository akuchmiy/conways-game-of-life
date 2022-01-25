import { useState } from 'react'
import { themes } from 'shared/constants'
import { usesDarkTheme } from '../lib'

export function useDarkTheme() {
	const initialTheme = usesDarkTheme() ? themes.dark : themes.light
	const [theme, setTheme] = useState(initialTheme)

	function toggleTheme() {
		if (theme === themes.light) return setTheme(themes.dark)

		setTheme(themes.light)
	}

	return { theme, toggleTheme }
}
