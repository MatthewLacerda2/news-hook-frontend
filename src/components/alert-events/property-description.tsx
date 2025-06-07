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
    <div className="space-y-2 mb-10">

      <hr className="w-full border-t border-white/20 mb-8" />

      <div className="flex items-center gap-4">
        <span className="font-mono text-white mr-10 font-bold text-lg">{title}</span>
        <span className="px-3 py-1 text-sm rounded bg-gray-600/40 text-gray-300">{mytype}</span>
        {defaultValue && (
          <div className="px-3 py-1 text-sm rounded bg-gray-600/40 text-gray-300">
            <span className="font-mono text-gray-500 text-sm mr-2">Default value:</span>
            <span className="px-3 py-1 text-sm rounded">
              {defaultValue}
            </span>
          </div>
        )}
        {required && (
          <span className="px-3 py-1 text-sm rounded bg-red-600/40 text-red-300">required</span>
        )}
      </div>
      
      <p className="text-gray-400 text-sm my-8">{description}</p>

      <div className="flex gap-8">
        {availableOptions && (
          <div className="space-y-1">
            <span className="text-gray-300 text-sm mr-4">Available options:</span>
            <span className="px-3 py-1 text-sm rounded bg-gray-600/40 text-gray-300">{availableOptions}</span>
          </div>
        )}

        {(min !== undefined || max !== undefined) && (
          <div className="space-y-1">
            <span className="text-gray-300 text-sm mr-4">Range:</span>
            <span className="px-3 py-1 text-sm rounded bg-gray-600/40 text-gray-300">
              {min !== undefined && `min: ${min}`}
            </span>
            {min !== undefined && max !== undefined && ' | '}
            <span className="px-3 py-1 text-sm rounded bg-gray-600/40 text-gray-300">
              {max !== undefined && `max: ${max}`}
            </span>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default PropertyDescription;