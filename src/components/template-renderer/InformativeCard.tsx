import React from "react";
import qoalaIcon from "../../assets/qoala-logo.svg";

interface InformativeCardProps {
  message: string;
  insuranceType: string;
  service: string[];
  purchaseLink: string;
  imgUrl?: string; // URL for the background image
}

const InformativeCard: React.FC<InformativeCardProps> = ({
  message = "Stay informed about your insurance options!",
  insuranceType = "motor",
  service = [],
  purchaseLink = "#",
  imgUrl = "",
}) => {
  // Format the insurance type and message
  const formattedMessage = message;
  const formattedInsuranceType = `${insuranceType.toUpperCase()} INSURANCE`;

  return (
    <div
      className="relative max-w-md mx-auto p-6 text-center"
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        borderRadius: "15px", // Ensuring consistent rounded corners
      }}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"
        style={{ borderRadius: "15px" }}
      ></div>

      <div className="relative z-10">
        {/* Display the formatted insurance type */}
        <h1 className="text-4xl font-bold mb-4">{formattedInsuranceType}</h1>

        {/* Display the main message */}
        <p className="mb-6 text-sm">{formattedMessage}</p>

        {/* Display the list of included services */}
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

        {/* Call to action button */}
        <a
          href={purchaseLink}
          className="inline-block bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg mb-6 hover:bg-yellow-500 transition-colors"
        >
          Learn More
        </a>

        {/* Company contact information */}
        <div className="text-sm mb-4">
          <p>Insurance Company</p>
          <p>Phone: 1-800-123-4567</p>
          <p>Email: support@insurancecompany.com</p>
          <p>Website: www.insurancecompany.com</p>
        </div>

        {/* Company logo */}
        <img
          src={qoalaIcon}
          alt="Insurance Company logo"
          className="w-16 h-16 mx-auto rounded-full object-contain"
        />
      </div>
    </div>
  );
};

export default InformativeCard;
