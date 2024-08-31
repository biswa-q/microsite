import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./TemplateRendererLayout.css"
import OccassionCard from "./OccassionCard"
import DiscountCard from "./DiscountCard"
import InformativeCard from "./InformativeCard"

const templates: any = [
	{
		templateType: "occasion",
		wishes: "Happy Birthday!",
		message:
			"We hope you have a wonderful day filled with joy and celebrations.",
		discountPercentage: 10,
		customerName: "John Doe",
		insuranceType: "Motor Insurance",
		purchaseLink: "https://www.insurancecompany.com/motor-insurance-offer",
		service: [
			"Comprehensive Motor Insurance",
			"Third Party Liability Cover",
			"24/7 Roadside Assistance",
		],
		image:
			"https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/generations/03923f03-f5fc-40a5-9058-0f69cf67a837-0.png",
		url: "http://localhost:5173/template-renderer/ee07b1f8-f9b8-4641-bc7f-e6d4a56d0868",
		id: "9a570242-00f7-4bed-b5ac-783f43e4e78c",
	},
	{
		templateType: "discount",
		discountPercentage: "5",
		description:
			"Enjoy a special 5% discount on our motor insurance plans as a birthday offer!",
		services: [
			"24/7 roadside assistance",
			"Accident coverage",
			"Theft protection",
			"Personal liability coverage",
		],
		purchaseLink: "https://www.insurancecompany.com/motor-insurance-offer",
		image:
			"https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/generations/afe5d07e-6e4b-46e4-a6fc-bd1d73c40dfe-0.png",
		url: "http://localhost:5173/template-renderer/061f66a9-e768-4fbd-b6c7-3154db5cc1e6",
		id: "9a570242-00f7-4bed-b5ac-783f43e4e78c",
	},
	{
		templateId: "info",
		insurancetype: "motor",
		message: "",
		servicesTitle: "WHAT'S INCLUDED",
		services: [
			"Personal Accident Cover",
			"Comprehensive Own Damage Insurance",
			"Protection Against Accidental Damages",
			"24/7 Roadside Assistance",
		],
		purchaseLink:
			"https://staging.fairdee.co.th/voluntary-insurance?affiliate=1878",
		image:
			"https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/generations/276c694e-4d2c-4d8e-8d9c-488b95d920b3-0.png",
		url: "http://localhost:5173/template-renderer/9a570242-00f7-4bed-b5ac-783f43e4e78c",
		id: "9a570242-00f7-4bed-b5ac-783f43e4e78c",
	},
]

const TemplateRenderer: React.FC = () => {
	const { id } = useParams<{ id: string }>() // Get the template ID from the URL
	const [template, setTemplate] = useState<{
		message: any
		image?: string
	} | null>(null)

	useEffect(() => {
		// Fetch the template data from localStorage based on the ID
		if (id) {
			const storedMessage = templates.find((t: any) => t.id === id)
				? templates.find((t: any) => t.id === id)
				: localStorage.getItem(`message-${id}`)

			console.log(
				"storedMessage",
				storedMessage && typeof storedMessage === "string"
					? JSON.parse(storedMessage)
					: storedMessage || null
			)

			// Set the template data if it exists
			if (storedMessage) {
				setTemplate({
					message:
						storedMessage && typeof storedMessage === "string"
							? JSON.parse(storedMessage)
							: storedMessage || null,
					image:
						storedMessage && typeof storedMessage === "string"
							? JSON.parse(storedMessage).image
							: storedMessage.image || "",
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
		<>
			{template?.message?.templateType === "occasion" ? (
				<OccassionCard
					wishes={template?.message?.wishes}
					message={template?.message?.message}
					discountPercentage={template?.message?.discountPercentage}
					customerName={template?.message?.customerName}
					purchaseLink={template?.message?.purchaseLink}
					insuranceType={template?.message?.insuranceType}
					service={template?.message?.service || []} // Default to empty array if undefined
					imgUrl={template?.image}
				/>
			) : template?.message?.templateType === "discount" ? (
				<DiscountCard
					description={template?.message?.description}
					percentage={template?.message?.discountPercentage}
					insuranceType={template?.message?.insuranceType}
					service={template?.message?.service || []}
					purchaseLink={template?.message?.purchaseLink}
					imgUrl={template?.image || ""}
				/>
			) : (
				<InformativeCard
					message={template?.message?.message}
					insuranceType={template?.message?.insuranceType}
					service={template?.message?.service || []}
					purchaseLink={template?.message?.purchaseLink}
					imgUrl={template?.image}
				/>
			)}
		</>
	)
}

export default TemplateRenderer
