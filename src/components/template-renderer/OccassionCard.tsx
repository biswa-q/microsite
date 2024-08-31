import React from "react";
import qoalaIcon from "../../assets/qoala-logo.svg";

interface Occasion {
	wishes?: string
	message?: string
	discountPercentage?: number
	insuranceType?: string
	customerName?: string
	purchaseLink?: string
	imgUrl?: string // URL for the background image
	service?: string[]
}

const OccasionCard: React.FC<Occasion> = ({
	wishes = "Happy Birthday!",
	message = "We hope you have a wonderful day and an amazing year ahead!",
	discountPercentage = 5,
	insuranceType = "motor",
	customerName = "Valued Customer",
	purchaseLink = "#",
	imgUrl = "",
	service = [],
}) => {
  const formattedWishes = `${wishes} ${customerName}`;
  const formattedMessage = `${message} ${customerName}`;
  console.log("imgUrl", imgUrl);

  return (
    <div
      className="relative max-w-md mx-auto p-6 text-center"
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
      }}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        style={{ borderRadius: "15px" }}
      ></div>
      <div className="relative z-10">
        <h1 className="text-4xl font-bold mb-4">{formattedWishes}</h1>

        <p className="mb-6 text-sm">{formattedMessage}</p>

        <div className="bg-yellow-600 text-black p-4 rounded-lg mb-6">
          <h2 className="font-bold text-lg mb-2 underline text-[#000]">
            EXCLUSIVE BIRTHDAY OFFER
          </h2>
          <p className="text-sm">
            Get a special {discountPercentage}% discount on your motor
            <br />
            insurance as our birthday gift to you!
          </p>
        </div>

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
          className="inline-block bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg mb-6 hover:bg-yellow-500 transition-colors"
        >
          Claim your {discountPercentage}% discount
        </a>

        <p className="text-sm mb-6">
          Wishing you all the best on your special day!
          <br />
          With love, The Celebrations Insurance Team
        </p>

        <div className="text-sm mb-4">
          <p>Insurance Company</p>
          <p>Phone: 1-800-123-4567</p>
          <p>Email: support@insurancecompany.com</p>
          <p>Website: www.insurancecompany.com</p>
        </div>

        <img
          src={qoalaIcon}
          alt="Insurance Company logo"
          className="w-16 h-16 mx-auto rounded-full object-contain"
        />
      </div>
    </div>
  );
};

export default OccasionCard;
