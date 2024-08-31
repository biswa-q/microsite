import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TemplateRendererLayout.css";
import OccassionCard from "./OccassionCard";
import DiscountCard from "./DiscountCard";
import InformativeCard from "./InformativeCard";
import rightArrow from "../../assets/right-arrow.svg";
import lineLogo from "../../assets/line-icon.svg";

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
    insuranceType: "",
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
];

const TemplateRenderer: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the template ID from the URL
  const [template, setTemplate] = useState<{
    message: any;
    image?: string;
  } | null>(null);

  useEffect(() => {
    // Fetch the template data from localStorage based on the ID
    if (id) {
      const storedMessage = templates.find((t: any) => t.id === id)
        ? templates.find((t: any) => t.id === id)
        : localStorage.getItem(`message-${id}`);

      console.log(
        "storedMessage",
        storedMessage && typeof storedMessage === "string"
          ? JSON.parse(storedMessage)
          : storedMessage || null
      );

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
        });
      }
    }
  }, [id]);

  const renderJson = (obj: any) => {
    console.log(template?.message?.wishes, "djkcdjdkcjkdjkdjk");
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
      );
    }
    return <span>{obj}</span>;
  };

  function shareLink() {
    const shareUrl = `${window.location.href}`; // The URL you want to share
    const message = `${template?.message?.wishes} ${template?.message?.message} `; // The text you want to share
    console.log(shareUrl);
    // Construct the LINE share link with both URL and text
    const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(message)}`;
    window.open(lineShareUrl, "_blank");
  }

  function shareContent() {
    if (navigator.share) {
      navigator
        .share({
          title: `${template?.message?.wishes} `,
          text: `${template?.message?.message}`,
          url: `${window.location.href}`,
        })
        .then(() => console.log("Content shared successfully"))
        .catch((error) => console.error("Error sharing content:", error));
    } else {
      alert("Web Share API is not supported in your browser.");
    }
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
      ) : template?.message?.templateType === "info" ? (
        <InformativeCard
          message={template?.message?.message}
          insuranceType={template?.message?.insuranceType}
          service={template?.message?.service || []}
          purchaseLink={template?.message?.purchaseLink}
          imgUrl={template?.image}
        />
      ) : null}
      <button
        className="mb-[24px] w-[calc(100%-24px)] rounded-[10px] bg-[#111111] flex justify-start items-center py-[6px] px-[12px] m-auto mt-[44px] relative"
        style={{ boxShadow: "0px 4px 36px 10px rgba(0, 0, 0, 0.25)" }}
        onClick={shareLink}
      >
        <img src={lineLogo} alt="" />
        <span className="text-white text-center text-[22px] leading-[20px] mr-[20px] ml-[12px] grow-[1]">
          Share template
        </span>
        <img
          src={rightArrow}
          alt=""
          className="absolute right-[0px] top-[6px]"
        />
      </button>
      <button
        className="w-[calc(100%-24px)] rounded-[10px] bg-[#111111] flex justify-start items-center py-[6px] px-[12px] m-auto mt-[44px] relative"
        style={{ boxShadow: "0px 4px 36px 10px rgba(0, 0, 0, 0.25)" }}
        onClick={shareContent}
      >
        <span className="text-white text-center text-[22px] leading-[20px] mr-[20px] ml-[12px] grow-[1]">
          Share
        </span>
        <img
          src={rightArrow}
          alt=""
          className="absolute right-[0px] top-[6px]"
        />
      </button>
    </>
  );
};

export default TemplateRenderer;
