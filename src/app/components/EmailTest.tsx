import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';

export function EmailTest() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const sendTestEmail = async () => {
    setLoading(true);
    setResult(null);

    try {
      const testQuoteData = {
        quote_id: 'EXP-TEST-001',
        business_name: 'Test Company',
        contact_name: 'Test User',
        email: email,
        phone: '+1234567890',
        shipment_type: 'Sea Freight',
        origin: 'Port of Los Angeles',
        destination: 'Port of Barcelona',
        merchandise_description: 'Electronics and machinery',
        quantity: '10 Pallets',
        packaging_type: 'Pallets',
        dimensions: '120cm x 100cm x 150cm',
        weight: '500 kg',
        is_dangerous: 'No',
        needs_insurance: 'Yes',
        insurance_value: '50000',
        language: 'en',
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(
        `/api/make-server-b5281c63/send-quote-emails`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(testQuoteData),
        }
      );

      const data = await response.json();
      setResult({ success: response.ok, data });
    } catch (error: any) {
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto my-8">
      <h2 className="text-xl font-bold mb-4">Test Email System</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="testEmail">Your Email Address</Label>
          <Input
            id="testEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="test@example.com"
          />
        </div>
        <Button onClick={sendTestEmail} disabled={!email || loading} className="w-full">
          {loading ? 'Sending...' : 'Send Test Email'}
        </Button>
        {result && (
          <div
            className={`p-4 rounded ${
              result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            <pre className="text-xs overflow-auto">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </Card>
  );
}
