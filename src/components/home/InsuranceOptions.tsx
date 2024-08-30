// import { ChevronRight } from "lucide-react";

import healthIcon from "../../assets/health-icon.svg";
import homeIcon from "../../assets/home-icon.svg";
import motorIcon from "../../assets/motor-icon.svg";
import travelIcon from "../../assets/travel-icon.svg";
import { useNavigate } from "react-router-dom";

interface Props {
  data: any;
}

const InsuranceOption = ({
  icon,
  text,
  navigate,
}: {
  icon: any;
  text: any;
  navigate: any;
}) => (
  <div
    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-[20px]"
    onClick={() => navigate("/reachout")}
  >
    <div className="flex items-center">
      {icon}
      <span className="ml-4 text-lg">{text}</span>
    </div>
    {/* <ChevronRight className="text-orange-400" /> */}
  </div>
);

const InsuranceOptions = ({ data }: Props) => {
  const navigate = useNavigate();

  function getIcon(type: string) {
    switch (type) {
      case "healthIcon":
        return healthIcon;
      case "homeIcon":
        return homeIcon;
      case "motorIcon":
        return motorIcon;
      case "travelIcon":
        return travelIcon;
      default:
        break;
    }
  }
  return (
    <div className="max-w-md mx-auto bg-white overflow-hidden mt-[12px]">
      {data &&
        data.map((d: any, index: number) => (
          <InsuranceOption
            key={index}
            icon={
              <div key={index}>
                <img src={getIcon(d.icon)} alt="" className="max-h-[54px]" />
              </div>
            }
            text={d.name}
            navigate={navigate}
          />
        ))}
    </div>
  );
};

export default InsuranceOptions;
