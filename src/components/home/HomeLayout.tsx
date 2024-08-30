import React, { useEffect, useState } from "react";

import authorDp from "../../assets/agent-dp.svg";
import lineLogo from "../../assets/line-icon.svg";
import rightArrow from "../../assets/right-arrow.svg";
import InsuranceOptions from "./InsuranceOptions";
import InsuranceStats from "./InsuranceStats";
import InsuranceDiscounts from "./InsuranceDiscounts";
import TestimonialCard from "./TestimonialCard";
import axios from "axios";

const HomeLayout: React.FC = () => {
  const [agentObject, setAgentObject] = useState<any>({});
  async function getAgentData() {
    let res = await axios.get(`json/agent.json`);
    setAgentObject(res.data);
  }

  useEffect(() => {
    getAgentData();
  }, []);

  useEffect(() => {
    textToImage();
  }, []);

  function textToImage() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw: any = JSON.stringify({
      key: "6bEnvzO1EG5Po6oF4gqtQWYIvbseAFjZLrRltjbuHtizjK01orOJmj9sT7Ke",
      prompt:
        "Birthday celeration image that can be used as birthday template background image",
      negative_prompt: "bad quality",
      width: "512",
      height: "512",
      safety_checker: false,
      seed: null,
      samples: 1,
      base64: false,
      webhook: null,
      track_id: null,
    });

    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://modelslab.com/api/v6/realtime/text2img", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  }

  // function shareLink() {
  //   const shareUrl = "https://biswa.staging.fairdee.co.th/"; // The URL you want to share
  //   const message = "Check out this amazing content!"; // The text you want to share

  //   // Construct the LINE share link with both URL and text
  //   const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
  //     shareUrl
  //   )}&text=${encodeURIComponent(message)}`;
  //   window.open(lineShareUrl, "_blank");
  // }

  function shareViaLineApp() {
    const text = "Check out this amazing content!";
    const url = "https://biswa.staging.fairdee.co.th/"; // The URL you want to share
    const lineShareUrl = `line://msg/text/${encodeURIComponent(
      text + " " + url
    )}`;

    console.log("lineShareUrl", lineShareUrl);

    // Open the LINE app with the content
    window.location.href = lineShareUrl;
  }

  return (
    <div className="">
      <div className="bg-[url('./assets/hero.svg')] bg-no-repeat h-[500px] w-full pt-[60px]">
        <p className="text-black text-center text-[18px] font-medium leading-[27px]">
          Hello
        </p>
        <p className="text-black text-center text-[18px] font-medium leading-[27px]">
          I am {agentObject.name}
        </p>
        <img src={authorDp} alt="" className="mx-auto mb-[16px] mt-[8px]" />
        <p className="text-black text-[20px] font-semibold leading-[27px] text-center">
          Your
        </p>
        <p className="text-black text-[24px] font-semibold leading-[27px] text-center">
          {agentObject.title}
        </p>
        <button
          className="w-[calc(100%-24px)] rounded-[10px] bg-[#111111] flex justify-start items-center py-[6px] px-[12px] m-auto mt-[44px] relative"
          style={{ boxShadow: "0px 4px 36px 10px rgba(0, 0, 0, 0.25)" }}
          onClick={shareViaLineApp}
        >
          <img src={lineLogo} alt="" />
          <span className="text-white text-center text-[22px] font-semibold leading-[20px] mr-[20px] ml-[12px] grow-[1]">
            Contact me
          </span>
          <img
            src={rightArrow}
            alt=""
            className="absolute right-[0px] top-[6px]"
          />
        </button>
      </div>
      <div className="mt-[60px] px-[26px]">
        <p className="text-black text-[18px] font-medium leading-[20px]">
          I specialize in
        </p>
        <InsuranceOptions data={agentObject.specialisations} />
        {agentObject.total_policies_sold &&
        agentObject.happy_customers_served &&
        agentObject.average_response_time ? (
          <InsuranceStats
            data={[
              agentObject.total_policies_sold,
              agentObject.happy_customers_served,
              agentObject.average_response_time,
            ]}
          />
        ) : null}

        <p className="text-black text-[18px] font-medium leading-[20px]">
          Special Offers for you
        </p>
        <InsuranceDiscounts data={agentObject.offers} />
        <p className="text-black text-[18px] font-medium leading-[20px]">
          Recent Reviews
        </p>
        <TestimonialCard />
      </div>
    </div>
  );
};

export default HomeLayout;
