// Test component for Calendly integration
// Import this in App.tsx temporarily to test the integration

import { useCalendly } from '../hooks/useCalendly';
import { Button } from './ui/button';
import { Calendar, Check, Loader2 } from 'lucide-react';

export function CalendlyTest() {
  const { openCalendly, isLoaded } = useCalendly();

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl border-2 border-blue-500 max-w-sm z-50">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">Calendly Test</h3>
          {isLoaded ? (
            <div className="flex items-center gap-2 text-green-600">
              <Check className="h-4 w-4" />
              <span className="text-sm">Loaded</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-yellow-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Loading...</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Button
            onClick={() => openCalendly()}
            disabled={!isLoaded}
            className="w-full"
            variant="default"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Test Basic Modal
          </Button>

          <Button
            onClick={() => openCalendly({
              prefill: {
                name: 'Test User',
                email: 'test@example.com'
              },
              utmMedium: 'test',
              utmCampaign: 'integration-test'
            })}
            disabled={!isLoaded}
            className="w-full"
            variant="outline"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Test with Prefill
          </Button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Remove this component after testing
        </p>
      </div>
    </div>
  );
}
