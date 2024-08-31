import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./TemplateRendererLayout.css"
import OccassionCard from "./OccassionCard"

const TemplateRenderer: React.FC = () => {
	const { id } = useParams<{ id: string }>() // Get the template ID from the URL
	const [template, setTemplate] = useState<{
		message: any
		imgUrl: string
	} | null>(null)

	useEffect(() => {
		// Fetch the template data from localStorage based on the ID
		if (id) {
			const storedMessage = localStorage.getItem(`message-${id}`)
			const storedImgUrl = localStorage.getItem(`imgUrl-${id}`)

			// Set the template data if it exists
			if (storedMessage || storedImgUrl) {
				setTemplate({
					message: storedMessage ? JSON.parse(storedMessage) : null,
					imgUrl: storedImgUrl || "",
				})
			}
		}
	}, [id])

	const renderJson = (obj: any) => {
		console.log(template?.message?.wishes, "djkcdjdkcjkdjkdjk")
		if (typeof obj === "object" && obj !== null) {
			return (
				<ul>
					{Object.entries(obj).map(([key, value]) => (
						<li key={key}>
							<strong>{key}:</strong>
							{typeof value === "object" ? renderJson(value) : ` ${value}`}
						</li>
					))}
				</ul>
			)
		}
		return <span>{obj}</span>
	}

	return (
		<OccassionCard
			wishes={template?.message.wishes}
			message={template?.message.message}
			discountPercentage={template?.message.discountPercentage}
			customerName={template?.message.customerName}
			purchaseLink={template?.message.purchaseLink}
			service={template?.message?.service}
			imgUrl={template?.imgUrl}
		/>
	)
}

export default TemplateRenderer
