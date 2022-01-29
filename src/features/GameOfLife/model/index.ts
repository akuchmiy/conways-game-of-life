import { useEffect, useState } from 'react'

export function useCanvasContext(canvas: HTMLCanvasElement) {
	const [ctx, setCtx] = useState<CanvasRenderingContext2D>(
		canvas.getContext('2d') as CanvasRenderingContext2D
	)

	useEffect(() => {
		if (!canvas) return

		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

		setCtx(ctx)
	}, [canvas])

	return ctx
}
