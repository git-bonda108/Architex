'use client';

import { BHKType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Save, Download, Home, Ruler, Layers, Droplets } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ControlsPanelProps {
  bhkType: BHKType;
  onBhkTypeChange: (type: BHKType) => void;
  specifications: {
    overallWidth: number;
    overallHeight: number;
    wallThickness: number;
    ceilingHeight: number;
    unit: 'meters' | 'feet';
  };
  onSpecificationsChange: (specs: any) => void;
}

export default function ControlsPanel({
  bhkType,
  onBhkTypeChange,
  specifications,
  onSpecificationsChange
}: ControlsPanelProps) {
  return (
    <div className="p-6 space-y-6">
      {/* BHK Type Selection */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Home className="h-4 w-4 text-blue-600" />
          <Label className="text-base font-semibold">Layout Type</Label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={bhkType === '2BHK' ? 'default' : 'outline'}
            className={bhkType === '2BHK' ? 'bg-blue-600 hover:bg-blue-700' : ''}
            onClick={() => onBhkTypeChange('2BHK')}
          >
            2 BHK
          </Button>
          <Button
            variant={bhkType === '3BHK' ? 'default' : 'outline'}
            className={bhkType === '3BHK' ? 'bg-blue-600 hover:bg-blue-700' : ''}
            onClick={() => onBhkTypeChange('3BHK')}
          >
            3 BHK
          </Button>
        </div>
      </div>

      <Separator />

      {/* Dimensions */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Ruler className="h-4 w-4 text-blue-600" />
          <Label className="text-base font-semibold">Overall Dimensions</Label>
        </div>
        <div className="space-y-3">
          <div>
            <Label htmlFor="width" className="text-sm text-slate-600">Width ({specifications?.unit ?? 'meters'})</Label>
            <Input
              id="width"
              type="number"
              value={specifications?.overallWidth ?? 12}
              onChange={(e) => onSpecificationsChange?.({ 
                ...specifications, 
                overallWidth: parseFloat(e?.target?.value ?? '12') 
              })}
              step="0.1"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="height" className="text-sm text-slate-600">Length ({specifications?.unit ?? 'meters'})</Label>
            <Input
              id="height"
              type="number"
              value={specifications?.overallHeight ?? 10}
              onChange={(e) => onSpecificationsChange?.({ 
                ...specifications, 
                overallHeight: parseFloat(e?.target?.value ?? '10') 
              })}
              step="0.1"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Wall Specifications */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Layers className="h-4 w-4 text-blue-600" />
          <Label className="text-base font-semibold">Wall Specifications</Label>
        </div>
        <div className="space-y-3">
          <div>
            <Label htmlFor="wallThickness" className="text-sm text-slate-600">Wall Thickness (cm)</Label>
            <Input
              id="wallThickness"
              type="number"
              value={specifications?.wallThickness ?? 15}
              onChange={(e) => onSpecificationsChange?.({ 
                ...specifications, 
                wallThickness: parseFloat(e?.target?.value ?? '15') 
              })}
              step="0.5"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="ceilingHeight" className="text-sm text-slate-600">Ceiling Height ({specifications?.unit ?? 'meters'})</Label>
            <Input
              id="ceilingHeight"
              type="number"
              value={specifications?.ceilingHeight ?? 3}
              onChange={(e) => onSpecificationsChange?.({ 
                ...specifications, 
                ceilingHeight: parseFloat(e?.target?.value ?? '3') 
              })}
              step="0.1"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Drainage & Sewage (Placeholder for future) */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Droplets className="h-4 w-4 text-blue-600" />
          <Label className="text-base font-semibold">Drainage & Sewage</Label>
        </div>
        <p className="text-sm text-slate-500 italic">
          Advanced specifications coming in next update
        </p>
      </div>

      <Separator />

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled>
          <Save className="h-4 w-4 mr-2" />
          Save Design
        </Button>
        <Button variant="outline" className="w-full" disabled>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <p className="text-xs text-slate-500 text-center mt-2">
          Save and Export features coming soon
        </p>
      </div>
    </div>
  );
}
