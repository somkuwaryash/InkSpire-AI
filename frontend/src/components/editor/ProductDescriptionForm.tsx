import React from 'react';

interface ProductDescriptionFormProps {
  productName: string;
  features: string[];
  benefits: string[];
  onProductNameChange: (productName: string) => void;
  onFeaturesChange: (features: string[]) => void;
  onBenefitsChange: (benefits: string[]) => void;
}

const ProductDescriptionForm: React.FC<ProductDescriptionFormProps> = ({
  productName,
  features,
  benefits,
  onProductNameChange,
  onFeaturesChange,
  onBenefitsChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => onProductNameChange(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="features" className="block text-sm font-medium text-gray-700">Features (comma-separated)</label>
        <input
          type="text"
          id="features"
          value={features.join(', ')}
          onChange={(e) => onFeaturesChange(e.target.value.split(',').map(f => f.trim()))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">Benefits (comma-separated)</label>
        <input
          type="text"
          id="benefits"
          value={benefits.join(', ')}
          onChange={(e) => onBenefitsChange(e.target.value.split(',').map(b => b.trim()))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default ProductDescriptionForm;