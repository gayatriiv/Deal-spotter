import React, { useEffect, useState } from 'react';
import { Star, X } from 'lucide-react';

interface PointsNotificationProps {
  points: number;
  reason: string;
  isVisible: boolean;
  onClose: () => void;
}

export const PointsNotification: React.FC<PointsNotificationProps> = ({
  points,
  reason,
  isVisible,
  onClose,
}) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldShow(true);
      const timer = setTimeout(() => {
        setShouldShow(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`fixed top-20 right-4 z-50 transition-all duration-300 ${
      shouldShow ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl shadow-lg p-4 max-w-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold">🎉 Points Earned!</h4>
              <p className="text-sm text-orange-100">
                +{points} points for {reason}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShouldShow(false)}
            className="text-white hover:text-orange-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};