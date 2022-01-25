import React from 'react'
import styled from 'styled-components'
import { ThemeToggle } from 'features/toggle-theme'
import { Button } from 'shared/ui/Button'

const Container = styled.div`
	width: min(70vw, 1170px);
	margin: 0 auto;
	text-align: center;
`

export const Home = () => {
	return (
		<Container>
			Text
			<ThemeToggle />
			<Button>Click me!</Button>
		</Container>
	)
}
