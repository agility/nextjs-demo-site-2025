import React from "react"
import { ContentZone } from "@agility/nextjs"
import { getModule } from "../agility-components"

const MainTemplate = (props: any) => {
	return (

		<ContentZone name="main-content-zone" {...props} getModule={getModule} />

	)
}

export default MainTemplate
