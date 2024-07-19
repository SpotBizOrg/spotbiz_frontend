import React, { useState } from 'react';

const categoriesData = [
  { type: 'Stationary', tags: ['Books', 'Pens', 'Notebooks', 'Markers', 'Pencils'] },
  { type: 'Hotels', tags: ['Luxury', 'Budget', 'Family', 'Business', 'Boutique'] },
  { type: 'Food', tags: ['Fruits', 'Vegetables', 'Meats', 'Snacks', 'Desserts'] },
  { type: 'Computer Shops', tags: ['Laptops', 'Desktops', 'Monitors', 'Printers', 'Accessories'] },
  { type: 'Electronic Shops', tags: ['TVs', 'Smartphones', 'Tablets', 'Cameras', 'Speakers'] },
];

const CategoriesTable: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAddTag = () => {
    if (selectedCategory && newTag) {
      const category = categoriesData.find(cat => cat.type === selectedCategory);
      if (category) {
        category.tags.push(newTag);
      }
      setShowForm(false);
      setNewTag('');
    }
  };

  return (
    <div className="bg-gray p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-primary font-semibold">Categories</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-customBlue3 text-white py-2 px-4 rounded-custom2"
        >
          Add More
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-primary">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-medium leading-4 text-gray-600 tracking-wider">Business Type</th>
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-medium leading-4 text-gray-600 tracking-wider">Tags</th>
            </tr>
          </thead>
          <tbody>
            {categoriesData.map((category, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-300 text-sm">{category.type}</td>
                <td className="py-2 px-4 border-b border-gray-300 text-sm">
                  {category.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-medium mr-2 mb-2">{tag}</span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <div className="mt-4 bg-gray p-4 text-primary rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Add Tag</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
            <select
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Business Type</option>
              {categoriesData.map((category, index) => (
                <option key={index} value={category.type}>{category.type}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
            <input
              type="text"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
          </div>
          <button
            onClick={handleAddTag}
            className="bg-customBlue3 text-white py-2 px-4 rounded-custom2"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoriesTable;
