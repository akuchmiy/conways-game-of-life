import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

export const withRouter = (component: () => React.ReactNode) =>
	function WithRouter() {
		return (
			<BrowserRouter>
				<Suspense fallback={'Loading...'}>{component()}</Suspense>
			</BrowserRouter>
		)
	}
