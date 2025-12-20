'use client';

import { Room } from '@/lib/types';
import { calculateTotalArea, calculateBounds, formatArea } from '@/lib/floor-plan-utils';
import { Loader2, Home, Ruler } from 'lucide-react';

interface FloorPlanCanvasProps {
  rooms: Room[];
  specifications: {
    overallWidth: number;
    overallHeight: number;
    wallThickness: number;
    ceilingHeight: number;
    unit: 'meters' | 'feet';
  };
  loading: boolean;
}

export default function FloorPlanCanvas({ rooms, specifications, loading }: FloorPlanCanvasProps) {
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading floor plan...</p>
        </div>
      </div>
    );
  }

  if (!rooms || rooms?.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50">
        <div className="text-center text-slate-500">
          <Home className="h-12 w-12 mx-auto mb-4 text-slate-400" />
          <p>No floor plan available</p>
        </div>
      </div>
    );
  }

  const bounds = calculateBounds(rooms);
  const totalArea = calculateTotalArea(rooms);
  
  // Calculate SVG viewBox with padding
  const padding = 1;
  const viewBoxWidth = (bounds?.width ?? 0) + (padding * 2);
  const viewBoxHeight = (bounds?.height ?? 0) + (padding * 2);
  const wallThickness = (specifications?.wallThickness ?? 15) / 100; // Convert cm to meters

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Info Bar */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">Total Area:</span>
              <span className="text-sm font-semibold text-blue-600">
                {formatArea(totalArea, specifications?.unit ?? 'meters')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700">Dimensions:</span>
              <span className="text-sm font-semibold text-slate-900">
                {bounds?.width?.toFixed?.(1) ?? '0.0'} × {bounds?.height?.toFixed?.(1) ?? '0.0'} {specifications?.unit ?? 'meters'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700">Wall Thickness:</span>
              <span className="text-sm font-semibold text-slate-900">
                {specifications?.wallThickness ?? 15} cm
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto">
          <svg
            viewBox={`${-padding} ${-padding} ${viewBoxWidth} ${viewBoxHeight}`}
            className="w-full h-auto shadow-lg rounded-lg bg-white"
            style={{ maxHeight: '80vh' }}
          >
            {/* Grid Pattern */}
            <defs>
              <pattern
                id="grid"
                width="1"
                height="1"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 1 0 L 0 0 0 1"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="0.02"
                />
              </pattern>
            </defs>

            {/* Background grid */}
            <rect
              x="0"
              y="0"
              width={bounds?.width ?? 0}
              height={bounds?.height ?? 0}
              fill="url(#grid)"
            />

            {/* Render rooms */}
            {rooms?.map?.((room) => (
              <g key={room?.id ?? 'room'}>
                {/* Room fill */}
                <rect
                  x={room?.x ?? 0}
                  y={room?.y ?? 0}
                  width={room?.width ?? 0}
                  height={room?.height ?? 0}
                  fill={room?.color ?? '#F0F0F0'}
                  stroke="#334155"
                  strokeWidth={wallThickness}
                  className="transition-all duration-300"
                />
                
                {/* Room label */}
                <text
                  x={(room?.x ?? 0) + ((room?.width ?? 0) / 2)}
                  y={(room?.y ?? 0) + ((room?.height ?? 0) / 2) - 0.2}
                  textAnchor="middle"
                  className="font-semibold"
                  fontSize="0.35"
                  fill="#1e293b"
                >
                  {room?.name ?? 'Room'}
                </text>
                
                {/* Room dimensions */}
                <text
                  x={(room?.x ?? 0) + ((room?.width ?? 0) / 2)}
                  y={(room?.y ?? 0) + ((room?.height ?? 0) / 2) + 0.3}
                  textAnchor="middle"
                  fontSize="0.25"
                  fill="#64748b"
                >
                  {room?.width?.toFixed?.(1) ?? '0.0'} × {room?.height?.toFixed?.(1) ?? '0.0'} m
                </text>
                
                {/* Area */}
                <text
                  x={(room?.x ?? 0) + ((room?.width ?? 0) / 2)}
                  y={(room?.y ?? 0) + ((room?.height ?? 0) / 2) + 0.65}
                  textAnchor="middle"
                  fontSize="0.22"
                  fill="#64748b"
                >
                  {formatArea((room?.width ?? 0) * (room?.height ?? 0), specifications?.unit ?? 'meters')}
                </text>
              </g>
            )) ?? null}

            {/* Outer boundary */}
            <rect
              x="0"
              y="0"
              width={bounds?.width ?? 0}
              height={bounds?.height ?? 0}
              fill="none"
              stroke="#0f172a"
              strokeWidth={wallThickness * 1.5}
            />
          </svg>

          {/* Legend */}
          <div className="mt-6 bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Room Types</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { type: 'living', label: 'Living Room', color: '#D4E6F1' },
                { type: 'bedroom', label: 'Bedroom', color: '#E8DAEF' },
                { type: 'kitchen', label: 'Kitchen', color: '#FCF3CF' },
                { type: 'bathroom', label: 'Bathroom', color: '#D5F4E6' },
                { type: 'balcony', label: 'Balcony', color: '#FADBD8' },
                { type: 'entrance', label: 'Entrance', color: '#E8F4F8' },
                { type: 'study', label: 'Study', color: '#FAD7A0' },
                { type: 'dining', label: 'Dining', color: '#D6EAF8' },
              ]?.map?.((item) => (
                <div key={item?.type ?? 'type'} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded border border-slate-300"
                    style={{ backgroundColor: item?.color ?? '#F0F0F0' }}
                  />
                  <span className="text-xs text-slate-700">{item?.label ?? 'Room'}</span>
                </div>
              )) ?? null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
