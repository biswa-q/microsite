import { Clock, FileText, Gift, Star, TrendingUp, Users } from "lucide-react";
import React, { useState } from "react";

interface ContactDetails {
  email: string;
  phone: string;
}

interface Location {
  city: string;
  state: string;
  country: string;
}

interface Review {
  review_id: string;
  customer_name: string;
  rating: number;
  comment: string;
  date: string;
}

interface Interaction {
  interaction_id: string;
  customer_name: string;
  date: string;
  channel: string;
  type: string;
}

interface Offer {
  offer_id: string;
  description: string;
  valid_until: string;
}

interface PerformanceMetrics {
  conversion_rate: string;
  total_communications: number;
  positive_feedback_ratio: string;
}

interface AgentData {
  agent_id: string;
  name: string;
  contact_details: ContactDetails;
  location: Location;
  total_policies_sold: number;
  happy_customers_served: number;
  average_response_time: string;
  customer_reviews: Review[];
  recent_interactions: Interaction[];
  special_offers: Offer[];
  performance_metrics: PerformanceMetrics;
}

const agentData: AgentData = {
  agent_id: "A001",
  name: "Arjun Sharma",
  contact_details: {
    email: "arjun.sharma@example.com",
    phone: "+919876543210",
  },
  location: {
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
  },
  total_policies_sold: 31,
  happy_customers_served: 265,
  average_response_time: "2 hours",
  customer_reviews: [
    {
      review_id: "R001",
      customer_name: "John Doe",
      rating: 5,
      comment: "Excellent service and support!",
      date: "2024-08-01",
    },
    {
      review_id: "R002",
      customer_name: "Jane Smith",
      rating: 4,
      comment: "Great offers and easy to understand policies.",
      date: "2024-08-10",
    },
    {
      review_id: "R003",
      customer_name: "Amit Kumar",
      rating: 4,
      comment: "Good service, but could improve response time.",
      date: "2024-08-18",
    },
    {
      review_id: "R004",
      customer_name: "Sneha Patel",
      rating: 5,
      comment: "Highly recommend, very responsive and helpful.",
      date: "2024-08-22",
    },
    {
      review_id: "R005",
      customer_name: "Rahul Gupta",
      rating: 4,
      comment: "Good service, but policy details could be clearer.",
      date: "2024-08-24",
    },
  ],
  recent_interactions: [
    {
      interaction_id: "I001",
      customer_name: "John Doe",
      date: "2024-08-25",
      channel: "WhatsApp",
      type: "Policy inquiry",
    },
    {
      interaction_id: "I002",
      customer_name: "Jane Smith",
      date: "2024-08-20",
      channel: "WhatsApp",
      type: "Policy renewal reminder",
    },
    {
      interaction_id: "I003",
      customer_name: "Amit Kumar",
      date: "2024-08-21",
      channel: "WhatsApp",
      type: "New policy introduction",
    },
    {
      interaction_id: "I004",
      customer_name: "Sneha Patel",
      date: "2024-08-23",
      channel: "Line",
      type: "Discount offer on birthday",
    },
    {
      interaction_id: "I005",
      customer_name: "Rahul Gupta",
      date: "2024-08-26",
      channel: "WhatsApp",
      type: "Policy renewal offer",
    },
  ],
  special_offers: [
    {
      offer_id: "O001",
      description: "20% discount on health insurance for customers aged 30-40.",
      valid_until: "2024-09-30",
    },
    {
      offer_id: "O002",
      description: "Special birthday discount of 15% on all policies.",
      valid_until: "2024-12-31",
    },
  ],
  performance_metrics: {
    conversion_rate: "15%",
    total_communications: 150,
    positive_feedback_ratio: "90%",
  },
};

const MetricCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
}> = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className="text-blue-500">{icon}</div>
    </div>
  </div>
);

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
    <div className="flex justify-between items-center mb-2">
      <p className="font-semibold">{review.customer_name}</p>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating ? "text-yellow-400" : "text-gray-300"
            } fill-current`}
          />
        ))}
      </div>
    </div>
    <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
    <p className="text-xs text-gray-400">{review.date}</p>
  </div>
);

const InteractionCard: React.FC<{ interaction: Interaction }> = ({
  interaction,
}) => (
  <div className="bg-white p-3 rounded-lg shadow-md flex justify-between items-center transition-all duration-300 hover:shadow-lg">
    <div>
      <p className="font-semibold">{interaction.customer_name}</p>
      <p className="text-sm text-gray-500">{interaction.type}</p>
    </div>
    <div className="text-right">
      <p className="text-sm text-blue-500">{interaction.channel}</p>
      <p className="text-xs text-gray-400">{interaction.date}</p>
    </div>
  </div>
);

const OfferCard: React.FC<{ offer: Offer }> = ({ offer }) => (
  <div className="bg-yellow-50 p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
    <p className="font-semibold text-yellow-700 mb-2">{offer.description}</p>
    <p className="text-sm text-gray-500">Valid until: {offer.valid_until}</p>
  </div>
);

const HomeLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"reviews" | "interactions">(
    "reviews"
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Insurance Agent Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>{agentData.name}</span>
            <span className="bg-blue-500 px-2 py-1 rounded text-sm">
              {agentData.agent_id}
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard
              title="Policies Sold"
              value={agentData.total_policies_sold}
              icon={<FileText className="w-6 h-6" />}
            />
            <MetricCard
              title="Happy Customers"
              value={agentData.happy_customers_served}
              icon={<Users className="w-6 h-6" />}
            />
            <MetricCard
              title="Avg Response Time"
              value={agentData.average_response_time}
              icon={<Clock className="w-6 h-6" />}
            />
            <MetricCard
              title="Conversion Rate"
              value={agentData.performance_metrics.conversion_rate}
              icon={<TrendingUp className="w-6 h-6" />}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="flex border-b">
              <button
                className={`flex-1 py-2 px-4 text-center ${
                  activeTab === "reviews"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Customer Reviews
              </button>
              <button
                className={`flex-1 py-2 px-4 text-center ${
                  activeTab === "interactions"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveTab("interactions")}
              >
                Recent Interactions
              </button>
            </div>
            <div className="p-4">
              {activeTab === "reviews" ? (
                <div className="space-y-4">
                  {agentData.customer_reviews.map((review) => (
                    <ReviewCard key={review.review_id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {agentData.recent_interactions.map((interaction) => (
                    <InteractionCard
                      key={interaction.interaction_id}
                      interaction={interaction}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <h2 className="text-xl font-semibold p-4 bg-blue-500 text-white flex items-center">
              <Gift className="w-6 h-6 mr-2" /> Special Offers
            </h2>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {agentData.special_offers.map((offer) => (
                <OfferCard key={offer.offer_id} offer={offer} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeLayout;
