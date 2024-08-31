import React from "react"

interface InformativeCardProps {
	message: string
	insuranceType: string
	service: string[]
	purchaseLink: string
	imgUrl?: string // URL for the background image
}

const InformativeCard: React.FC<InformativeCardProps> = ({
	message,
	insuranceType,
	service,
	purchaseLink,
	imgUrl,
}) => {
	return (
		<div
			className="bg-gray-100 text-gray-800 font-sans max-w-md mx-auto p-6 text-center"
			style={{
				backgroundImage: `url(${imgUrl})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				padding: "20px",
				borderRadius: "10px",
				color: "white",
			}}>
			<h1 className="text-2xl font-bold mb-4">{insuranceType}</h1>
			<p className="mb-6 text-base">{message}</p>

			<div className="bg-white text-black p-4 rounded-lg mb-6">
				<h2 className="font-bold text-lg mb-2 underline">WHAT'S INCLUDED</h2>
				<ul className="text-sm list-disc list-inside">
					{service.length > 0 ? (
						service.map((item, index) => <li key={index}>{item}</li>)
					) : (
						<li>No services available.</li>
					)}
				</ul>
			</div>

			<a
				href={purchaseLink}
				className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-6 hover:bg-blue-500 transition-colors">
				Learn More
			</a>
		</div>
	)
}

export default InformativeCard
