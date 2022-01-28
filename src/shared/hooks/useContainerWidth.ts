import { useEffect, useState } from 'react'
import { layout } from 'shared/constants'

export function useContainerWidth() {
	const [width, setWidth] = useState(layout.MAX_CONTAINER_WIDTH)

	useEffect(() => {
		const onResize = () => {
			const percentage =
				window.innerWidth * layout.CONTAINER_PERCENTAGE_FROM_WINDOW

			const newWidth = Math.min(percentage, layout.MAX_CONTAINER_WIDTH)

			console.log(window.innerWidth)
			setWidth(newWidth)
		}

		onResize()

		window.addEventListener('resize', onResize)

		return () => window.removeEventListener('resize', onResize)
	}, [setWidth])

	return width
}
