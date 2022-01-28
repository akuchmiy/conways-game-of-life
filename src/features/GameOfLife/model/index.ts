import { useEffect, useState } from 'react'

export function useCanvasContext(canvas: HTMLCanvasElement | null) {
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

	useEffect(() => {
		if (!canvas) return

		const ctx = canvas.getContext('2d')

		setCtx(ctx)
	}, [canvas])

	return ctx
}
