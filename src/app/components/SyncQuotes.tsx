import { Button } from "./ui/button";
import { useState } from "react";
import { RefreshCw, CheckCircle2, XCircle, Database, Eye, TestTube, AlertCircle } from "lucide-react";

export function SyncQuotes() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [showQuotes, setShowQuotes] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<Date | null>(null);

  // Listen for form submissions
  useState(() => {
    const handleSubmission = () => {
      setLastSubmission(new Date());
    };
    window.addEventListener('quoteSubmitted', handleSubmission);
    return () => window.removeEventListener('quoteSubmitted', handleSubmission);
  });

  const handleSync = async () => {
    setIsSyncing(true);
    setResult(null);

    try {
      const response = await fetch(
        `/api/make-server-b5281c63/sync-quotes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      const data = await response.json();
      setResult(data);
      console.log("Sync result:", data);

    } catch (error) {
      console.error("Sync error:", error);
      setResult({ 
        status: "error", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleViewQuotes = async () => {
    setIsViewing(true);
    try {
      const response = await fetch(
        `/api/make-server-b5281c63/quotes`,
        {
          headers: {}
        }
      );

      const data = await response.json();
      setQuotes(data.data || []);
      setShowQuotes(true);
      console.log("Quotes in DB:", data);

    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setIsViewing(false);
    }
  };

  const handleTestWebhook = async () => {
    setIsTesting(true);
    setResult(null);

    try {
      // Generate Quote ID
      const timestamp = new Date();
      const dateStr = timestamp.toISOString().slice(0, 10).replace(/-/g, '');
      const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      const quoteId = `EXP-${dateStr}-${randomNum}`;
      
      // Test data with ALL 18 NEW FIELDS (snake_case to match Make.com)
      const testData = {
        quote_id: quoteId,
        business_name: `DEBUG TEST ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`,
        contact_name: "Debug Panel Test User",
        email: "debug@expedicargo.com",
        phone: "+1-555-DEBUG",
        shipment_type: "Sea Freight",
        origin: "Port of Houston, TX",
        destination: "Port of Barcelona, Spain",
        port_or_airport_departure: "Port of Houston, TX",
        port_or_airport_arrival: "Port of Barcelona, Spain",
        cargo_type: "DEBUG: Test cargo from debug panel",
        merchandise_description: "DEBUG: Test cargo from debug panel",
        company: `DEBUG TEST ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`,
        quantity: "10 containers",
        dimensions: "600cm x 240cm x 260cm",
        weight: "30000 kg",
        is_dangerous: "No",
        needs_insurance: "Yes",
        insurance_value: "25000",
        timestamp: timestamp.toISOString()
      };

      console.log("🧪 DEBUG PANEL TEST - Sending to Make.com webhook:");
      console.log("URL: https://hook.us2.make.com/wusgmbryj3mz01ngwmm12ip93a9k4p7b");
      console.log("Quote ID:", quoteId);
      console.log("Data (ALL 20 FIELDS INCLUDING INSURANCE):", testData);

      // Send directly to Make.com webhook (bypass server)
      const makeResponse = await fetch("https://hook.us2.make.com/wusgmbryj3mz01ngwmm12ip93a9k4p7b", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(testData)
      });

      const makeBody = await makeResponse.text();

      console.log("✅ Make.com Response:", {
        status: makeResponse.status,
        statusText: makeResponse.statusText,
        body: makeBody
      });

      setResult({
        status: "test",
        message: `Direct test to Make.com webhook (18 FIELDS + Quote ID: ${quoteId})`,
        data: {
          makeResponse: {
            status: makeResponse.status,
            statusText: makeResponse.statusText,
            body: makeBody
          },
          sent: testData,
          nextSteps: "Check Google Sheet in 5-10 seconds. If no data appears, the issue is in Make.com mapping."
        }
      });

    } catch (error) {
      console.error("❌ Test webhook error:", error);
      setResult({ 
        status: "error", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-lg z-50 max-h-[90vh] overflow-y-auto">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <Database className="w-5 h-5" />
        🔧 Debug Panel - 18 Fields + Quote ID
      </h3>

      {lastSubmission && (
        <div className="mb-3 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-xs">
          <div className="font-semibold text-green-700 dark:text-green-300">
            ✓ Last form submission: {lastSubmission.toLocaleTimeString()}
          </div>
          <div className="text-green-600 dark:text-green-400 text-xs mt-1">
            Check browser console for detailed logs
          </div>
        </div>
      )}
      
      <div className="space-y-2 mb-3">
        <div className="flex gap-2">
          <Button 
            onClick={handleViewQuotes} 
            disabled={isViewing}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            {isViewing ? (
              <>
                <Database className="w-4 h-4 mr-2 animate-pulse" />
                Loading...
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                View DB
              </>
            )}
          </Button>

          <Button 
            onClick={handleTestWebhook} 
            disabled={isTesting}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            {isTesting ? (
              <>
                <TestTube className="w-4 h-4 mr-2 animate-pulse" />
                Testing...
              </>
            ) : (
              <>
                <TestTube className="w-4 h-4 mr-2" />
                Test (18 Fields)
              </>
            )}
          </Button>
        </div>

        <Button 
          onClick={handleSync} 
          disabled={isSyncing}
          size="sm"
          className="w-full"
        >
          {isSyncing ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Syncing All Quotes...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync All to Sheets
            </>
          )}
        </Button>
      </div>

      {showQuotes && (
        <div className="mb-3 p-3 rounded bg-blue-50 dark:bg-blue-900/20 text-sm max-h-40 overflow-y-auto">
          <div className="font-semibold mb-2">Quotes in DB: {quotes.length}</div>
          {quotes.map((q, i) => (
            <div key={i} className="text-xs mb-1 pb-1 border-b border-blue-200 dark:border-blue-800">
              {q.business_name || 'No business'} - {q.email}
            </div>
          ))}
        </div>
      )}

      {result && (
        <div className="p-3 rounded bg-gray-50 dark:bg-gray-900 text-sm">
          {result.status === "ok" ? (
            <div className="space-y-1">
              <div className="flex items-center text-green-600 dark:text-green-400">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                <span className="font-semibold">Sync Complete</span>
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                <div>Total: {result.total}</div>
                <div>✓ Synced: {result.synced}</div>
                {result.failed > 0 && (
                  <div className="text-red-600 dark:text-red-400">
                    ✗ Failed: {result.failed}
                  </div>
                )}
              </div>
              {result.errors && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-red-600 dark:text-red-400 text-xs">
                    View Errors
                  </summary>
                  <pre className="mt-1 text-xs overflow-x-auto">
                    {JSON.stringify(result.errors, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ) : result.status === "test" ? (
            <div className="space-y-2">
              <div className="flex items-center text-blue-600 dark:text-blue-400">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                <span className="font-semibold">Test Sent (18 Fields + Quote ID)</span>
              </div>
              
              {/* Make.com Response Status */}
              <div className="bg-white dark:bg-gray-950 p-2 rounded border border-gray-200 dark:border-gray-700">
                <div className="text-xs font-semibold mb-1">Make.com HTTP Status:</div>
                <div className={`text-lg font-mono font-bold ${
                  result.data?.makeResponse?.status === 200 
                    ? 'text-green-600 dark:text-green-400' 
                    : result.data?.makeResponse?.status === 202
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {result.data?.makeResponse?.status || 'No response'}
                  {result.data?.makeResponse?.status === 200 && ' ✓ OK'}
                  {result.data?.makeResponse?.status === 202 && ' ✓ Accepted'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Response: {result.data?.makeResponse?.body || 'Empty'}
                </div>
              </div>

              {/* Data Sent */}
              <details className="mt-2" open>
                <summary className="cursor-pointer text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  📤 Data Sent to Make.com (ALL 18 FIELDS + QUOTE_ID)
                </summary>
                <pre className="mt-1 text-xs overflow-x-auto max-h-32 bg-blue-50 dark:bg-blue-950 p-2 rounded border border-blue-200 dark:border-blue-800">
                  {JSON.stringify(result.data?.sent, null, 2)}
                </pre>
              </details>

              {/* Full Response */}
              <details className="mt-2">
                <summary className="cursor-pointer text-xs font-semibold text-gray-700 dark:text-gray-300">
                  📥 Full Response from Server
                </summary>
                <pre className="mt-1 text-xs overflow-x-auto max-h-40 bg-gray-50 dark:bg-gray-950 p-2 rounded">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </details>

              {/* UPDATED Troubleshooting Instructions - 18 FIELDS */}
              <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-xs">
                <div className="font-semibold mb-2 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  🔍 If Status 200 but NO data in Sheet = MAPPING ISSUE
                </div>
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded p-2 mb-2">
                  <div className="font-semibold text-red-700 dark:text-red-300">The webhook receives data but doesn't write to Sheet</div>
                </div>
                <div className="font-semibold mb-1">✅ NEW Data Format (18 Fields + Quote ID):</div>
                <div className="ml-2 mb-2 text-xs bg-white dark:bg-gray-800 p-2 rounded border">
                  We send data in <strong>snake_case</strong> format:<br/>
                  <span className="font-mono text-[10px] leading-relaxed">
                    <strong className="text-green-600">quote_id (NEW!)</strong>, business_name, contact_name, email, phone, shipment_type, 
                    <strong className="text-green-600">origin (NEW!)</strong>, <strong className="text-green-600">destination (NEW!)</strong>, 
                    port_or_airport_departure, port_or_airport_arrival, 
                    <strong className="text-green-600">cargo_type (NEW!)</strong>, merchandise_description, 
                    <strong className="text-green-600">company (NEW!)</strong>, quantity, dimensions, weight, 
                    is_dangerous, timestamp
                  </span>
                </div>
                <div className="font-semibold mb-1">🔧 Make.com Mapping (Columns A-R):</div>
                <ol className="space-y-1 text-gray-700 dark:text-gray-300 list-decimal list-inside ml-1">
                  <li>Go to Make.com → Open scenario</li>
                  <li>Click Webhook → <strong>"Re-determine data structure"</strong></li>
                  <li>Click Test button above to send fresh data</li>
                  <li>Map fields in Google Sheets module:
                    <div className="ml-4 mt-1 font-mono text-[10px] bg-white dark:bg-gray-800 p-2 rounded border leading-relaxed">
                      <span className="text-green-600 font-bold">A → quote_id (NEW!)</span><br/>
                      B → business_name<br/>
                      C → contact_name<br/>
                      D → email<br/>
                      E → phone<br/>
                      F → shipment_type<br/>
                      <span className="text-green-600 font-bold">G → origin (NEW!)</span><br/>
                      <span className="text-green-600 font-bold">H → destination (NEW!)</span><br/>
                      I → port_or_airport_departure<br/>
                      J → port_or_airport_arrival<br/>
                      <span className="text-green-600 font-bold">K → cargo_type (NEW!)</span><br/>
                      L → merchandise_description<br/>
                      <span className="text-green-600 font-bold">M → company (NEW!)</span><br/>
                      N → quantity<br/>
                      O → dimensions<br/>
                      P → weight<br/>
                      Q → is_dangerous<br/>
                      R → timestamp
                    </div>
                  </li>
                  <li>Save and test again</li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="flex items-center text-red-600 dark:text-red-400">
              <XCircle className="w-4 h-4 mr-2" />
              <span>Error: {result.error}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}