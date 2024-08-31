import React from "react"
import qoalaIcon from "../../assets/qoala-logo.svg"

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
	percentage = 10,
	insuranceType = "motor",
	service = [],
	purchaseLink = "#",
	imgUrl = "",
}) => {
	const formattedDiscount = `${percentage}% OFF ON ${insuranceType.toUpperCase()} INSURANCE`
	const formattedDescription = `${description}`

	return (
		<div
			className="relative max-w-md mx-auto p-6 text-center"
			style={{
				backgroundImage: `url(${imgUrl})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				color: "white",
			}}>
			<div
				className="absolute inset-0 bg-black bg-opacity-50"
				style={{ borderRadius: "15px" }}></div>
			<div className="relative z-10">
				<h1 className="text-4xl font-bold mb-4">{formattedDiscount}</h1>

				<p className="mb-6 text-sm">{formattedDescription}</p>

				<div className="bg-purple-300 text-black p-4 rounded-lg mb-6">
					<h2 className="font-bold text-lg mb-2 underline text-[#000]">
						EXCLUSIVE DISCOUNT OFFER
					</h2>
					<p className="text-sm">
						Get a special {percentage}% discount on your {insuranceType}
						<br />
						insurance as part of our special offer!
					</p>
				</div>

				<div className="mb-6 text-left">
					<h3 className="font-bold mb-2">WHAT'S INCLUDED</h3>
					<ul className="text-sm list-disc list-inside">
						{service && service.length > 0 ? (
							service.map((item, index) => <li key={index}>{item}</li>)
						) : (
							<>
								<li>24/7 Roadside Assistance</li>
								<li>Accident Coverage</li>
								<li>Theft Protection</li>
								<li>Personal Liability Coverage</li>
							</>
						)}
					</ul>
				</div>

				<a
					href={purchaseLink}
					className="inline-block bg-purple-300 text-white font-bold py-2 px-4 rounded-lg mb-6 hover:bg-blue-500 transition-colors">
					Claim your {percentage}% discount
				</a>

				<p className="text-sm mb-6">
					Don't miss out on this special offer!
					<br />
					With regards, Qoala Team
				</p>

				<div className="text-sm mb-4">
					<p>Qoala</p>
					<p>Phone: 1-800-123-4567</p>
					<p>Email: support@qoala.com</p>
					<p>Website: www.qoala.com</p>
				</div>

				<img
					src={qoalaIcon}
					alt="Insurance Company logo"
					className="w-16 h-16 mx-auto rounded-full object-contain"
				/>
			</div>
		</div>
	)
}

export default DiscountCard
