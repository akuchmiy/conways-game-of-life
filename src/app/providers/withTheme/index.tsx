import React from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './global'
import { useDarkTheme } from 'shared/hooks/useDarkTheme'
import { themeModel } from 'features/ToggleTheme'

export const withTheme = (component: () => React.ReactNode) =>
	function WithTheme() {
		const { theme, toggleTheme } = useDarkTheme()

		return (
			<>
				<ThemeProvider theme={theme}>
					<themeModel.ToggleThemeContext.Provider value={toggleTheme}>
						<GlobalStyle />
						{component()}
					</themeModel.ToggleThemeContext.Provider>
				</ThemeProvider>
			</>
		)
	}
