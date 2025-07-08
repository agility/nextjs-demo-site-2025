import React from "react"
import { ContentZone } from "@agility/nextjs"
import { getModule } from "../agility-components"
import { GradientBackground } from "../gradient"
import { Container } from "../container"
import { Navbar } from "../header/navbar"
import Link from "next/link"
import { ChevronRightIcon } from "@heroicons/react/24/solid"

const MainTemplate = (props: any) => {
	return (

		<ContentZone name="main-content-zone" {...props} getModule={getModule} />

	)
}

export default MainTemplate
