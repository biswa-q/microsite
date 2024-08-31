import React, { useState } from "react";
import "./TemplateGenerator.css";
import { useNavigate } from "react-router-dom";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";

const apiKey = "your-api-key";
const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
});
const TemplateGeneratorLayout: React.FC = () => {
  const [templateType, setTemplateType] = useState<string>("");
  const [customOccasion, setCustomOccasion] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<number | "">("");
  const [insuranceType, setInsuranceType] = useState<string>("");
  const navigate = useNavigate();

  const handleTemplateTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTemplateType(e.target.value);
    setCustomOccasion("");
    setDiscountPercentage("");
  };

  const handleCustomerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(e.target.value);
  };

  const handleDiscountPercentageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDiscountPercentage(Number(e.target.value) || "");
  };

  const handleInsuranceTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInsuranceType(e.target.value);
  };

  const handleCustomOccasionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomOccasion(e.target.value);
  };

  const jsonTemplate = [
    {
      templateType: "occasion",
      wishes: "",
      message: "",
      discountPercentage: "",
      customerName: "",
      insuranceType: "",
      purchaseLink: "https://www.insurancecompany.com/motor-insurance-offer",
      service: [],
    },
    {
      templateType: "discount",
      discountOffer: {
        percentage: 5,
        description:
          "Enjoy a special 5% discount on our motor insurance plans as a birthday offer!",
      },
      services: [
        "24/7 roadside assistance",
        "Accident coverage",
        "Theft protection",
        "Personal liability coverage",
      ],
      purchaseLink: "https://www.insurancecompany.com/motor-insurance-offer",
    },
    {
      templateType: "info",
      insurancetype: "",
      message: "",
      servicesTitle: "WHAT'S INCLUDED",
      services: [
        "Personal Accident Cover",
        "Comprehensive Own Damage Insurance",
        "Protection Against Accidental Damages",
        "24/7 Roadside Assistance",
      ],
      buylink:
        "https://staging.fairdee.co.th/voluntary-insurance?affiliate=1878",
    },
  ];

  async function generateTemplate(choice: string): Promise<any> {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant, and you will respond in JSON.",
          },
          {
            role: "user",
            content: getPromptForChoice(choice),
          },
        ],
      });

      const birthdayGreeting = completion.choices[0].message.content;
      console.log("Generated Birthday Greeting JSON:", birthdayGreeting);
      return JSON.parse(birthdayGreeting || "{}");
    } catch (error) {
      console.error("Error generating birthday greeting:", error);
      return null;
    }
  }

  function getPromptForChoice(choice: string): string {
    switch (choice) {
      case "occasion":
        return `Create a JSON template for a personalized greeting from an insurance company.
                Ocassion  is ${customOccasion}, a ${discountPercentage} discount offer on ${insuranceType} insurance, information should set int the json template form 
                There should not be any text in the image also services that insurance company provide according to ${insuranceType}   ${JSON.stringify(
          jsonTemplate[0]
        )} output should be without string wrapper`;
      case "discount":
        return `Create a JSON template for a discount from an insurance company with  a ${discountPercentage} percentage on ${insuranceType} insurance
                There should not be any text in the image The structure of the JSON should be as follows: 
                  ${JSON.stringify(
                    jsonTemplate[1]
                  )} output should be without string wrapper`;
      case "info":
        return `Create a JSON template for informative blog for ${insuranceType} insurance. 
                There should not be any text in the image The structure of the JSON should be as follows: 
                  ${JSON.stringify(
                    jsonTemplate[2]
                  )} output should be without string wrapper`;
      default:
        return "Invalid choice. Please select a valid option.";
    }
  }

  async function generateImageFromText(prompt: string): Promise<string | null> {
    try {
      const myHeaders = new Headers({
        "Content-Type": "application/json",
      });
      const payload = {
        key: "your-key",
        prompt: prompt,
        negative_prompt: "bad quality",
        width: 512,
        height: 512,
        safety_checker: false,
        seed: null,
        samples: 1,
        base64: false,
        webhook: null,
        track_id: null,
      };
      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: "follow",
      };

      const response = await fetch(
        "https://modelslab.com/api/v6/realtime/text2img",
        requestOptions
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      return result.output[0] || null;
    } catch (error) {
      console.error("Error generating image:", error);
      return null;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const uniqueId = uuidv4();
    let textMessagesObj: any = await generateTemplate(templateType);

    let prompt: string = "";
    if (templateType === "occasion") {
      prompt = `Generate the image according to ${customOccasion}`;
    } else if (templateType === "discount") {
      prompt = `Generate the image such that the insurance company gives a ${discountPercentage}% discount`;
    } else {
      prompt = `Generate the image such that it's informative for ${insuranceType} insurance to influence customers to purchase this specific insurance`;
    }

    if (!textMessagesObj.image) {
      const imgUrl: any = await generateImageFromText(prompt);
      textMessagesObj.imgUrl = imgUrl;
    }

    localStorage.setItem(
      `message-${uniqueId}`,
      JSON.stringify(textMessagesObj)
    );
    // localStorage.setItem(`imgUrl-${uniqueId}`, imgUrl);

    const existingIds = JSON.parse(localStorage.getItem("templateIds") || "[]");
    localStorage.setItem(
      "templateIds",
      JSON.stringify([...existingIds, uniqueId])
    );

    navigate(`/template-renderer/${uniqueId}`);
  }

  return (
    <div className="container">
      <h1 className="header">Template Information Form</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="formGroup">
          <label className="label">Template Type:</label>
          <select
            value={templateType}
            onChange={handleTemplateTypeChange}
            className="select"
          >
            <option value="">Select Template Type</option>
            <option value="occasion">Occasion</option>
            <option value="discount">Discount</option>
            <option value="info">Info</option>
          </select>
        </div>

        {templateType === "occasion" && (
          <>
            <div className="formGroup">
              <label className="label">Custom Occasion:</label>
              <input
                type="text"
                value={customOccasion}
                onChange={handleCustomOccasionChange}
                className="input"
              />
            </div>
            <div className="formGroup">
              <label className="label">Customer Name:</label>
              <input
                type="text"
                value={customerName}
                onChange={handleCustomerNameChange}
                className="input"
              />
            </div>
            <div className="formGroup">
              <label className="label">Discount Percentage:</label>
              <input
                type="number"
                value={discountPercentage}
                onChange={handleDiscountPercentageChange}
                className="input"
              />
            </div>
            <div className="formGroup">
              <label className="label">Insurance Type:</label>
              <select
                value={insuranceType}
                onChange={handleInsuranceTypeChange}
                className="select"
              >
                <option value="">Select Insurance Type</option>
                <option value="fire">Fire</option>
                <option value="pa">Personal Accident</option>
                <option value="travel">Travel</option>
                <option value="motor">Motor</option>
              </select>
            </div>
          </>
        )}

        {templateType === "discount" && (
          <div className="formGroup">
            <label className="label">Discount Percentage:</label>
            <input
              type="number"
              value={discountPercentage}
              onChange={handleDiscountPercentageChange}
              className="input"
            />
          </div>
        )}
        {templateType === "info" && (
          <>
            <div className="formGroup">
              <label className="label">Insurance Type:</label>
              <select
                value={insuranceType}
                onChange={handleInsuranceTypeChange}
                className="select"
              >
                <option value="">Select Insurance Type</option>
                <option value="fire">Fire</option>
                <option value="pa">Personal Accident</option>
                <option value="travel">Travel</option>
                <option value="motor">Motor</option>
              </select>
            </div>
          </>
        )}
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TemplateGeneratorLayout;
