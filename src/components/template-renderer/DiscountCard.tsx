import React from "react"

interface DiscountCardProps {
	description: string
	percentage: number
	insuranceType: string
	service: string[]
	purchaseLink: string
	imgUrl: string
}

const DiscountCard: React.FC<DiscountCardProps> = ({
	description,
	percentage,
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
			<h1 className="text-3xl font-bold mb-4">Special Discount Offer</h1>

			<p className="text-xl mb-4">
				<span className="font-bold text-lg">{percentage}% OFF</span> on{" "}
				{insuranceType}
			</p>

			<p className="mb-6 text-base">{description}</p>

			<div className="mb-6 text-left">
				<h3 className="font-bold mb-2">WHAT'S INCLUDED</h3>
				<ul className="text-sm list-disc list-inside">
					{service && service.length > 0 ? (
						service.map((item, index) => <li key={index}>{item}</li>)
					) : (
						<>
							<li>Personal Accident Cover</li>
							<li>Comprehensive Own Damage Insurance Protection</li>
							<li>Against Accidental Damages</li>
							<li>24/7 Roadside Assistance</li>
						</>
					)}
				</ul>
			</div>

			<a
				href={purchaseLink}
				className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-6 hover:bg-blue-500 transition-colors">
				Claim Your Discount
			</a>
		</div>
	)
}

export default DiscountCard
