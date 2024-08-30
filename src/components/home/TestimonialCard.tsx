import React from "react";

interface TestimonialCardProps {
  name: string;
  comment: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, comment }) => {
  return (
    <div className="bg-[#F4F4F4] p-4 rounded-lg max-w-md mx-auto flex items-start space-x-4 mb-[16px] border">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600 mt-1">{comment}</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="mt-[12px]">
      <TestimonialCard
        name="Adam"
        comment="I trust John Smith. Lorem Ipsum Lorem Ipsum Lorem Ipsum."
      />
      <TestimonialCard
        name="Adam"
        comment="I trust John Smith. Lorem Ipsum Lorem Ipsum Lorem Ipsum."
      />
      <TestimonialCard
        name="Adam"
        comment="I trust John Smith. Lorem Ipsum Lorem Ipsum Lorem Ipsum."
      />
    </div>
  );
};

export default App;
