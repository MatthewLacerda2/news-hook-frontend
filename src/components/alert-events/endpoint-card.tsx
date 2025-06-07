//endpoint-card.tsx
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import PropertyDescription, { PropertyDescriptionProps } from './property-description';

interface EndpointCardProps {
  url: string;
  description: string;
  method: string;
  properties?: PropertyDescriptionProps[];
}

const EndpointCard: React.FC<EndpointCardProps> = ({
  url,
  description,
  method,
  properties,
}) => {
  const methodColors = {
    GET: 'bg-blue-900 text-blue-300',
    POST: 'bg-green-900 text-green-300',
    PUT: 'bg-yellow-900 text-yellow-300',
    DELETE: 'bg-red-900 text-red-300',
    PATCH: 'bg-purple-900 text-purple-300',
  };

  const methodColor = methodColors[method as keyof typeof methodColors] || methodColors.GET;

  return (
    <Card className="mb-8 bg-zinc-900 border-zinc-800">
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 text-sm rounded ${methodColor}`}>
            {method.toUpperCase()}
          </span>
          <CardTitle className="ml-1 text-gray-200 text-lg">{url}</CardTitle>
        </div>
        <CardDescription className="text-gray-400 text-base mt-6 mb-2">{description}</CardDescription>
        <hr className="w-full border-t border-white/10 mt-4 mb-2" />
      </CardHeader>
      {properties && properties.length > 0 && (
        <CardContent>
          <div>
            {properties.map((prop, index) => (
              <div key={index}>
                <PropertyDescription {...prop} />
                <hr className="w-full border-t border-white/20 my-10" />
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default EndpointCard;