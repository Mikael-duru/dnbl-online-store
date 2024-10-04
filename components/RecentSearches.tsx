import React from 'react';

interface RecentSearchesProps {
  searches: string[];
  onClear: () => void;
  onSelect: (search: string) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ searches, onClear, onSelect }) => {
  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold">Recent Searches</h3>
        <button onClick={onClear} className="text-sm text-blue-500">
          Clear all
        </button>
      </div>
      <ul>
        {searches.map((search, index) => (
          <li key={index} className="flex items-center mb-1">
            <button
              onClick={() => onSelect(search)}
              className="text-sm text-gray-600 hover:text-blue-500"
            >
              {search}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;