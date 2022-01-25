import React from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './global'
import { useDarkTheme } from 'shared/hooks/useDarkTheme'

export const withTheme = (component: () => React.ReactNode) =>
	function WithTheme() {
		const { theme, toggleTheme } = useDarkTheme()

		return (
			<>
				<ThemeProvider theme={theme}>
					<GlobalStyle />
					{component()}
					<button onClick={toggleTheme}>Click me</button>
				</ThemeProvider>
			</>
		)
	}
