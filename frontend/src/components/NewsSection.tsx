
import { NewsItem } from '../types';
import { Newspaper } from 'lucide-react';

interface Props {
  news: NewsItem[];
}

export const NewsSection: React.FC<Props> = ({ news }) => {
  const formatTime = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Newspaper className="w-6 h-6 text-gray-600 mr-2" />
        <h2 className="text-xl font-semibold">Market News</h2>
      </div>
      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
            <h3 className="text-lg font-medium mb-1">
              <a href={item.url} className="text-indigo-600 hover:text-indigo-800">
                {item.title}
              </a>
            </h3>
            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium">{item.source}</span>
              <span className="mx-2">•</span>
              <span>{formatTime(item.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};