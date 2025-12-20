'use client';

import { useState, useEffect } from 'react';
import { Room, BHKType } from '@/lib/types';
import ControlsPanel from './controls-panel';
import FloorPlanCanvas from './floor-plan-canvas';

export default function DesignerWorkspace() {
  const [bhkType, setBhkType] = useState<BHKType>('2BHK');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [specifications, setSpecifications] = useState({
    overallWidth: 12,
    overallHeight: 10,
    wallThickness: 15,
    ceilingHeight: 3,
    unit: 'meters' as 'meters' | 'feet'
  });

  useEffect(() => {
    fetchTemplate(bhkType);
  }, [bhkType]);

  const fetchTemplate = async (type: BHKType) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/templates/${type}`);
      if (response?.ok) {
        const template = await response?.json?.();
        if (template?.roomsData) {
          setRooms(template?.roomsData as Room[]);
        }
      }
    } catch (error) {
      console.error('Error fetching template:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex">
      {/* Controls Panel - Left Side */}
      <div className="w-80 border-r bg-white overflow-y-auto">
        <ControlsPanel
          bhkType={bhkType}
          onBhkTypeChange={setBhkType}
          specifications={specifications}
          onSpecificationsChange={setSpecifications}
        />
      </div>

      {/* Floor Plan Canvas - Right Side */}
      <div className="flex-1 overflow-hidden">
        <FloorPlanCanvas
          rooms={rooms}
          specifications={specifications}
          loading={loading}
        />
      </div>
    </div>
  );
}
