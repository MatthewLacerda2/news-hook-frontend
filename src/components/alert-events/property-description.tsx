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
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="font-mono text-white">{title}</span>
        <span className="font-mono text-gray-400">{mytype}</span>
        {required && (
          <span className="font-mono text-red-500">required</span>
        )}
      </div>
      
      <p className="text-gray-400 text-sm">{description}</p>
      
      {defaultValue && (
        <div className="space-y-1">
          <span className="text-gray-300 text-sm">Default value:</span>
          <div className="font-mono text-gray-400 text-sm">{defaultValue}</div>
        </div>
      )}

      {availableOptions && (
        <div className="space-y-1">
          <span className="text-gray-300 text-sm">Available options:</span>
          <div className="font-mono text-gray-400 text-sm">{availableOptions}</div>
        </div>
      )}

      {(min !== undefined || max !== undefined) && (
        <div className="space-y-1">
          <span className="text-gray-300 text-sm">Range:</span>
          <div className="font-mono text-gray-400 text-sm">
            {min !== undefined && `min: ${min}`}
            {min !== undefined && max !== undefined && ' | '}
            {max !== undefined && `max: ${max}`}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDescription;