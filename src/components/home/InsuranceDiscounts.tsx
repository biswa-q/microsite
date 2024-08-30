import React from "react";

import offerIcon from "../../assets/offer-icon.svg";

interface DiscountCouponProps {
  percentage: string;
  insuranceType: string;
}

const DiscountCoupon: React.FC<DiscountCouponProps> = ({
  percentage,
  insuranceType,
}) => (
  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-[24px] flex items-center bg-gray-50">
    <img src={offerIcon} alt="" />
    <div className="ml-4">
      <h2 className="text-2xl font-bold">{percentage} OFF</h2>
      <p className="text-gray-600">{insuranceType}</p>
    </div>
  </div>
);

const InsuranceDiscounts: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="max-w-md mx-auto mt-[12px]">
      {data &&
        data.length &&
        data.map((d: any, index: number) => (
          <DiscountCoupon
            key={index}
            percentage={d.discount}
            insuranceType={d.type}
          />
        ))}
    </div>
  );
};

export default InsuranceDiscounts;
