import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CheckCircle2, XCircle, Loader2, Send } from "lucide-react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

export function WebhookTester() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const sendTestWebhook = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b5281c63/test-webhook`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || "Failed to send test webhook");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Webhook Test Tool
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Send test data to Make.com to refresh available webhook fields
          </p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                📋 Test Data Includes:
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>✓ All standard quote fields</li>
                <li>✓ <strong>needs_insurance</strong>: "Yes"</li>
                <li>✓ <strong>insurance_value</strong>: "25000"</li>
              </ul>
            </div>

            <Button
              onClick={sendTestWebhook}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending Test Data to Make.com...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Test Webhook
                </>
              )}
            </Button>
          </div>

          {result && (
            <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">Success!</span>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  Data Sent to Make.com:
                </h4>
                <pre className="text-xs bg-white dark:bg-gray-900 p-3 rounded border border-green-200 dark:border-green-800 overflow-x-auto">
                  {JSON.stringify(result.sent, null, 2)}
                </pre>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Make.com Response:
                </h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Status:</strong> {result.makeResponse?.status}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Response:</strong> {result.makeResponse?.body || "Accepted"}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  🎯 Next Steps in Make.com:
                </h4>
                <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-2 list-decimal list-inside">
                  <li>Go to your Make.com scenario</li>
                  <li>Click on the "Webhooks - Custom webhook" module</li>
                  <li>Look for these new fields in the dropdown:
                    <ul className="ml-6 mt-1 space-y-1">
                      <li>• <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">needs_insurance</code></li>
                      <li>• <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">insurance_value</code></li>
                    </ul>
                  </li>
                  <li>Map them to your Google Sheets columns</li>
                  <li>Save your scenario</li>
                </ol>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-2">
                <XCircle className="w-5 h-5" />
                <span className="font-semibold">Error</span>
              </div>
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
            ⚠️ Important Notes:
          </h3>
          <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-2">
            <li>• This sends real data to your Make.com webhook</li>
            <li>• It will create a test entry in your Google Sheet</li>
            <li>• The test entry has email: <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">test@example.com</code></li>
            <li>• You can delete the test row from your sheet after mapping is complete</li>
            <li>• After sending, refresh your Make.com scenario to see the new fields</li>
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
