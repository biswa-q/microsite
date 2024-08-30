import React from "react";
import badgeIcon from "../../assets/badge-icon.svg";
import happyIcon from "../../assets/happy-icon.svg";
import timeIcon from "../../assets/time-icon.svg";

interface StatProps {
  value: any;
  label: string;
  icon: React.ReactNode;
}

const Stat: React.FC<StatProps> = ({ value, label, icon }) => (
  <div className="flex items-start justify-between py-4 border border-[#F5F5F5] mb-[32px] px-[18px] pt-[24px] pb-[12px] bg-[#F5F5F5] rounded-[10px]">
    <div>
      <div className="flex items-baseline">
        <span className="text-4xl font-bold">{value}</span>
      </div>
      <div className="text-gray-600 text-lg">{label}</div>
    </div>
    <div className="text-gray-400">{icon}</div>
  </div>
);

const InsuranceStats: React.FC<{ data: any }> = ({ data }) => {
  console.log("InsuranceStats", data);
  function getIcon(type: string) {
    switch (type) {
      case "badgeIcon":
        return badgeIcon;
      case "happyIcon":
        return happyIcon;
      case "timeIcon":
        return timeIcon;
      default:
        break;
    }
  }
  return (
    <div className="max-w-sm mx-auto rounded-lg overflow-hidden">
      {data &&
        data.length &&
        data.map((d: any, index: number) => (
          <Stat
            key={index}
            value={
              <p>
                {d.text} <span className="text-[#FEB804]">{d.span}</span>
              </p>
            }
            label={""}
            icon={
              <div>
                <img src={getIcon(d.icon)} alt="" />
              </div>
            }
          />
        ))}
    </div>
  );
};

export default InsuranceStats;
