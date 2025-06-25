//property-description.tsx
import React from 'react';

export interface PropertyDescriptionProps {
  title: string;
  description: string;
  required: boolean;
  mytype: string;
  defaultValue?: string;
  availableOptions?: string;
  min?: number;
  max?: number;
}

const PropertyDescription: React.FC<PropertyDescriptionProps> = ({
  title,
  description,
  required,
  mytype,
  defaultValue,
  availableOptions,
  min,
  max,
}) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <span className="font-mono text-white sm:mr-8 font-bold text-lg break-all">{title}</span>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 text-sm rounded bg-gray-600/40 text-gray-300">{mytype}</span>
          {defaultValue && (
            <div className="px-3 py-1 text-sm rounded bg-gray-600/40 text-gray-300">
              <span className="font-mono text-gray-500 text-sm mr-2">Default:</span>
              <span className="px-3 py-1 text-sm rounded">
                {defaultValue}
              </span>
            </div>
          )}
          {required && (
            <span className="px-3 py-1 text-sm rounded bg-red-600/40 text-red-300">required</span>
          )}
        </div>
      </div>
      
      <p className="text-gray-400 text-sm my-3">{description}</p>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
        {availableOptions && (
          <div className="space-y-1">
            <span className="text-gray-300 text-sm mr-4">Available options:</span>
            <span className="px-3 py-1 text-sm rounded bg-gray-600/40 text-gray-300 break-all">{availableOptions}</span>
          </div>
        )}

        {(min !== undefined || max !== undefined) && (
          <div className="space-y-1">
            <span className="text-gray-300 text-sm mr-4">range:</span>
            <span className="px-3 py-1 text-sm rounded bg-gray-600/40 text-gray-300">
              {min !== undefined && `min: ${min}`}
              {min !== undefined && max !== undefined && ' | '}
              {max !== undefined && `max: ${max}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDescription;