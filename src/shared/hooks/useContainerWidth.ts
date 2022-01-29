import { useEffect, useState } from 'react'
import { LAYOUT } from 'shared/constants'

export function useContainerWidth() {
	const [width, setWidth] = useState(LAYOUT.MAX_CONTAINER_WIDTH)

	useEffect(() => {
		const onResize = () => {
			const percentage =
				window.innerWidth * LAYOUT.CONTAINER_PERCENTAGE_FROM_WINDOW

			const newWidth = Math.min(percentage, LAYOUT.MAX_CONTAINER_WIDTH)
			setWidth(newWidth)
		}

		onResize()

		window.addEventListener('resize', onResize)

		return () => window.removeEventListener('resize', onResize)
	}, [setWidth])

	return width
}
