import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";
import { Shield, CheckCircle2, AlertCircle } from "lucide-react";

export function InsuranceFieldTest() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const sendTestData = async () => {
    setLoading(true);
    setResult(null);

    const timestamp = new Date().toISOString();
    const dateStr = timestamp.slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const quoteId = `EXP-${dateStr}-${randomNum}`;

    // Exact data format that the frontend sends
    const testData = {
      quote_id: quoteId,
      business_name: "INSURANCE TEST COMPANY",
      contact_name: "Insurance Test User",
      email: "insurance-test@expedicargo.com",
      phone: "+1-555-INSURANCE",
      shipment_type: "Sea Freight",
      origin: "Port of Los Angeles, CA",
      destination: "Port of Rotterdam, Netherlands",
      port_or_airport_departure: "Port of Los Angeles, CA (USLAX)",
      port_or_airport_arrival: "Port of Rotterdam, Netherlands (NLRTM)",
      cargo_type: "INSURANCE TEST - Electronics",
      merchandise_description: "INSURANCE TEST - Electronics",
      company: "INSURANCE TEST COMPANY",
      quantity: "5 20' Container",
      packaging_type: "20' Container",
      dimensions: "589cm x 235cm x 239cm",
      weight: "28000 kg",
      is_dangerous: "No",
      needs_insurance: "Yes",           // ← INSURANCE FIELD 1
      insurance_value: "50000",         // ← INSURANCE FIELD 2
      timestamp: timestamp
    };

    try {
      console.log("🧪 INSURANCE FIELD TEST");
      console.log("=" .repeat(50));
      console.log("📋 Complete Test Data:");
      console.log(JSON.stringify(testData, null, 2));
      console.log("=" .repeat(50));
      console.log("🎯 INSURANCE FIELDS:");
      console.log("  needs_insurance:", testData.needs_insurance);
      console.log("  insurance_value:", testData.insurance_value);
      console.log("=" .repeat(50));

      // Send to Make.com webhook
      const response = await fetch("https://hook.us2.make.com/wusgmbryj3mz01ngwmm12ip93a9k4p7b", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testData)
      });

      const responseText = await response.text();

      console.log("✅ Make.com Response:", {
        status: response.status,
        statusText: response.statusText,
        body: responseText
      });

      setResult({
        success: response.ok,
        status: response.status,
        data: testData,
        response: responseText
      });
    } catch (error) {
      console.error("❌ Error:", error);
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <Shield className="w-8 h-8 text-green-600" />
            Insurance Fields Test
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Send test data with insurance fields to verify Make.com can see them
          </p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Test Data Includes:
            </h3>
            <div className="space-y-2 text-sm text-green-800 dark:text-green-200">
              <div className="flex items-start gap-2">
                <span className="font-semibold min-w-[180px]">needs_insurance:</span>
                <code className="bg-green-100 dark:bg-green-900 px-2 py-0.5 rounded">"Yes"</code>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold min-w-[180px]">insurance_value:</span>
                <code className="bg-green-100 dark:bg-green-900 px-2 py-0.5 rounded">"50000"</code>
              </div>
              <div className="text-xs text-green-700 dark:text-green-300 mt-3 p-2 bg-green-100 dark:bg-green-900/50 rounded">
                Plus all other standard fields (quote_id, business_name, email, etc.)
              </div>
            </div>
          </div>

          <Button
            onClick={sendTestData}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Shield className="w-4 h-4 mr-2 animate-pulse" />
                Sending Insurance Test Data...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />
                Send Insurance Test to Make.com
              </>
            )}
          </Button>
        </Card>

        {result && (
          <Card className="p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {result.success ? (
              <>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-semibold">Test Data Sent Successfully!</span>
                </div>

                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                    HTTP Status: {result.status}
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {result.status === 200 ? "✅ Accepted and processed" : 
                     result.status === 202 ? "✅ Accepted for processing" :
                     "⚠️ Received but check status"}
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                    🎯 Insurance Fields Sent:
                  </h4>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">needs_insurance:</span>
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-blue-800 dark:text-blue-200 font-bold">
                        "{result.data.needs_insurance}"
                      </code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">insurance_value:</span>
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-blue-800 dark:text-blue-200 font-bold">
                        "{result.data.insurance_value}"
                      </code>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Next Steps in Make.com:
                  </h4>
                  <ol className="text-sm text-yellow-800 dark:text-yellow-200 space-y-2 list-decimal list-inside">
                    <li>Go to your Make.com scenario</li>
                    <li>Click the <strong>Webhooks - Custom webhook</strong> module</li>
                    <li>You should now see <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">needs_insurance</code> in the available fields</li>
                    <li>You should now see <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">insurance_value</code> in the available fields</li>
                    <li>In the <strong>Google Sheets - Add a Row</strong> module:</li>
                    <li className="ml-6">Map <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">1. needs_insurance</code> to your "Needs Insurance" column</li>
                    <li className="ml-6">Map <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">1. insurance_value</code> to your "Insurance Value (USD)" column</li>
                    <li>Save your scenario</li>
                    <li>Check Google Sheets for the new row with insurance data!</li>
                  </ol>
                </div>

                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    📋 View Complete Test Data Sent
                  </summary>
                  <pre className="mt-2 text-xs overflow-x-auto bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </details>
              </>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-semibold">Error Sending Test</span>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    {result.error}
                  </p>
                </div>
              </div>
            )}
          </Card>
        )}

        <Card className="p-4 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm">
            💡 What This Test Does:
          </h4>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Sends test data with <strong>needs_insurance = "Yes"</strong></li>
            <li>• Sends test data with <strong>insurance_value = "50000"</strong></li>
            <li>• Uses the exact same format as the real quote form</li>
            <li>• Logs everything to browser console (press F12 to see)</li>
            <li>• Creates a test row in Google Sheets with email: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">insurance-test@expedicargo.com</code></li>
            <li>• You can delete this test row after verifying the insurance fields appear</li>
          </ul>
        </Card>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
