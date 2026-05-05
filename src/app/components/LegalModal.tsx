import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Shield, FileText, Cookie } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface LegalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'terms' | 'privacy' | 'cookies';
}

export function LegalModal({ open, onOpenChange, defaultTab = 'terms' }: LegalModalProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            {t('Información Legal', 'Legal Information')}
          </DialogTitle>
          <DialogDescription>
            {t(
              'Términos de servicio, política de privacidad y uso de cookies.',
              'Terms of service, privacy policy, and cookie usage.'
            )}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 px-6">
            <TabsTrigger value="terms" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {t('Términos', 'Terms')}
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              {t('Privacidad', 'Privacy')}
            </TabsTrigger>
            <TabsTrigger value="cookies" className="flex items-center gap-2">
              <Cookie className="h-4 w-4" />
              Cookies
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[500px] px-6 py-4">
            {/* Terms of Service */}
            <TabsContent value="terms" className="space-y-4 mt-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('Términos de Servicio', 'Terms of Service')}
              </h3>
              
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  {t(
                    'Última actualización: 30 de octubre de 2024',
                    'Last updated: October 30, 2024'
                  )}
                </p>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('1. Aceptación de Términos', '1. Acceptance of Terms')}
                  </h4>
                  <p>
                    {t(
                      'Al acceder y usar el sitio web de Expedicargo, usted acepta cumplir con estos Términos de Servicio. Si no está de acuerdo con alguno de estos términos, por favor no use nuestro sitio.',
                      'By accessing and using the Expedicargo website, you agree to comply with these Terms of Service. If you do not agree with any of these terms, please do not use our site.'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('2. Descripción del Servicio', '2. Service Description')}
                  </h4>
                  <p>
                    {t(
                      'Expedicargo es un facilitador logístico que conecta clientes con transportistas. No operamos almacenes ni requerimos contratos a largo plazo. Facilitamos conexiones entre partes para servicios de carga aérea, marítima y terrestre.',
                      'Expedicargo is a logistics facilitator that connects clients with carriers. We do not operate warehouses nor require long-term contracts. We facilitate connections between parties for air, sea, and ground freight services.'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('3. Cotizaciones', '3. Quotes')}
                  </h4>
                  <p>
                    {t(
                      'Las cotizaciones proporcionadas son estimaciones basadas en la información que usted proporciona. Los precios finales pueden variar según las condiciones del mercado, disponibilidad y otros factores. Todas las cotizaciones son válidas por 7 días desde la fecha de emisión.',
                      'Quotes provided are estimates based on the information you provide. Final prices may vary based on market conditions, availability, and other factors. All quotes are valid for 7 days from the date of issue.'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('4. Responsabilidades del Usuario', '4. User Responsibilities')}
                  </h4>
                  <p>
                    {t(
                      'Usted es responsable de proporcionar información precisa y completa sobre su carga. Debe declarar correctamente si la carga es peligrosa o requiere manejo especial. La información falsa o incompleta puede resultar en cargos adicionales o cancelación del servicio.',
                      'You are responsible for providing accurate and complete information about your cargo. You must correctly declare if cargo is dangerous or requires special handling. False or incomplete information may result in additional charges or service cancellation.'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('5. Seguros', '5. Insurance')}
                  </h4>
                  <p>
                    {t(
                      'Ofrecemos opciones de seguro para proteger su carga. El seguro es opcional pero altamente recomendado para envíos de alto valor. Los términos específicos del seguro serán proporcionados por nuestros socios aseguradores.',
                      'We offer insurance options to protect your cargo. Insurance is optional but highly recommended for high-value shipments. Specific insurance terms will be provided by our insurance partners.'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('6. Limitación de Responsabilidad', '6. Limitation of Liability')}
                  </h4>
                  <p>
                    {t(
                      'Expedicargo actúa como facilitador y no asume responsabilidad directa por pérdidas o daños durante el transporte, a menos que esté específicamente cubierto por seguro contratado a través de nosotros. Nuestra responsabilidad se limita a facilitar la conexión entre las partes.',
                      'Expedicargo acts as a facilitator and does not assume direct responsibility for losses or damages during transport, unless specifically covered by insurance contracted through us. Our liability is limited to facilitating the connection between parties.'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('7. Modificaciones', '7. Modifications')}
                  </h4>
                  <p>
                    {t(
                      'Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en nuestro sitio web.',
                      'We reserve the right to modify these terms at any time. Changes will take effect immediately upon posting to our website.'
                    )}
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Privacy Policy */}
            <TabsContent value="privacy" className="space-y-4 mt-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('Política de Privacidad', 'Privacy Policy')}
              </h3>
              
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  {t(
                    'Última actualización: 30 de octubre de 2024',
                    'Last updated: October 30, 2024'
                  )}
                </p>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('1. Información que Recopilamos', '1. Information We Collect')}
                  </h4>
                  <p>
                    {t(
                      'Recopilamos información que usted proporciona voluntariamente al solicitar una cotización o usar nuestros servicios, incluyendo: nombre de negocio, nombre de contacto, correo electrónico, teléfono, detalles de envío (origen, destino, tipo de carga, dimensiones, peso) y preferencias de servicio.',
                      'We collect information you voluntarily provide when requesting a quote or using our services, including: business name, contact name, email, phone, shipment details (origin, destination, cargo type, dimensions, weight), and service preferences.'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('2. Cómo Usamos su Información', '2. How We Use Your Information')}
                  </h4>
                  <p>
                    {t(
                      'Usamos su información para: proporcionar cotizaciones personalizadas, coordinar servicios logísticos, comunicarnos con usted sobre su envío, mejorar nuestros servicios, y cumplir con requisitos legales y regulatorios.',
                      'We use your information to: provide personalized quotes, coordinate logistics services, communicate with you about your shipment, improve our services, and comply with legal and regulatory requirements.'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('3. Compartir Información', '3. Information Sharing')}
                  </h4>
                  <p>
                    {t(
                      'Compartimos su información únicamente con socios logísticos y transportistas necesarios para completar su envío. No vendemos su información personal a terceros. Podemos compartir información agregada y anonimizada para análisis de mercado.',
                      'We share your information only with logistics partners and carriers necessary to complete your shipment. We do not sell your personal information to third parties. We may share aggregated and anonymized information for market analysis.'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('4. Seguridad de Datos', '4. Data Security')}
                  </h4>
                  <p>
                    {t(
                      'Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, pérdida o alteración. Usamos cifrado SSL/TLS para todas las transmisiones de datos.',
                      'We implement technical and organizational security measures to protect your personal information against unauthorized access, loss, or alteration. We use SSL/TLS encryption for all data transmissions.'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('5. Retención de Datos', '5. Data Retention')}
                  </h4>
                  <p>
                    {t(
                      'Retenemos su información personal durante el tiempo necesario para proporcionar nuestros servicios y cumplir con obligaciones legales. Las cotizaciones se almacenan por un período mínimo de 3 años para fines de registro.',
                      'We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Quotes are stored for a minimum of 3 years for record-keeping purposes.'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('6. Sus Derechos', '6. Your Rights')}
                  </h4>
                  <p>
                    {t(
                      'Tiene derecho a acceder, corregir o eliminar su información personal. Puede solicitar una copia de los datos que tenemos sobre usted o solicitar la eliminación de su información contactándonos directamente.',
                      'You have the right to access, correct, or delete your personal information. You can request a copy of the data we have about you or request deletion of your information by contacting us directly.'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('7. Contacto', '7. Contact')}
                  </h4>
                  <p>
                    {t(
                      'Para preguntas sobre privacidad o para ejercer sus derechos, contáctenos a través del formulario de contacto en nuestro sitio web o envíe un correo electrónico a privacy@expedicargo.com.',
                      'For privacy questions or to exercise your rights, contact us through the contact form on our website or email privacy@expedicargo.com.'
                    )}
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Cookie Policy */}
            <TabsContent value="cookies" className="space-y-4 mt-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('Política de Cookies', 'Cookie Policy')}
              </h3>
              
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  {t(
                    'Última actualización: 30 de octubre de 2024',
                    'Last updated: October 30, 2024'
                  )}
                </p>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('1. ¿Qué son las Cookies?', '1. What are Cookies?')}
                  </h4>
                  <p>
                    {t(
                      'Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Nos ayudan a proporcionar una mejor experiencia al recordar sus preferencias y analizar el uso del sitio.',
                      'Cookies are small text files stored on your device when you visit our website. They help us provide a better experience by remembering your preferences and analyzing site usage.'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('2. Cookies que Usamos', '2. Cookies We Use')}
                  </h4>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>
                      <strong>{t('Cookies Esenciales:', 'Essential Cookies:')}</strong>{' '}
                      {t(
                        'Necesarias para el funcionamiento básico del sitio (preferencias de idioma, tema oscuro/claro, aceptación de términos legales).',
                        'Necessary for basic site functionality (language preference, dark/light theme, legal terms acceptance).'
                      )}
                    </li>
                    <li>
                      <strong>{t('Cookies de Funcionalidad:', 'Functionality Cookies:')}</strong>{' '}
                      {t(
                        'Recuerdan sus elecciones y preferencias para mejorar su experiencia.',
                        'Remember your choices and preferences to enhance your experience.'
                      )}
                    </li>
                    <li>
                      <strong>{t('Cookies de Integración:', 'Integration Cookies:')}</strong>{' '}
                      {t(
                        'Usadas por servicios de terceros como Calendly para programación de citas.',
                        'Used by third-party services like Calendly for appointment scheduling.'
                      )}
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('3. Cookies de Terceros', '3. Third-Party Cookies')}
                  </h4>
                  <p>
                    {t(
                      'Usamos servicios de terceros que pueden establecer cookies, incluyendo: Calendly (programación de consultas), Make.com (procesamiento de formularios), y Supabase (almacenamiento de datos).',
                      'We use third-party services that may set cookies, including: Calendly (consultation scheduling), Make.com (form processing), and Supabase (data storage).'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('4. Almacenamiento Local', '4. Local Storage')}
                  </h4>
                  <p>
                    {t(
                      'Además de cookies, usamos almacenamiento local del navegador para guardar: preferencia de idioma (español/inglés), preferencia de tema (oscuro/claro), y estado de aceptación de términos legales.',
                      'In addition to cookies, we use browser local storage to save: language preference (Spanish/English), theme preference (dark/light), and legal terms acceptance status.'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('5. Gestión de Cookies', '5. Cookie Management')}
                  </h4>
                  <p>
                    {t(
                      'Puede controlar y eliminar cookies a través de la configuración de su navegador. Sin embargo, deshabilitar ciertas cookies puede afectar la funcionalidad del sitio. Las cookies esenciales no se pueden deshabilitar si desea usar el sitio.',
                      'You can control and delete cookies through your browser settings. However, disabling certain cookies may affect site functionality. Essential cookies cannot be disabled if you wish to use the site.'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('6. Duración de las Cookies', '6. Cookie Duration')}
                  </h4>
                  <p>
                    {t(
                      'Usamos cookies de sesión (que se eliminan cuando cierra el navegador) y cookies persistentes (que permanecen hasta que las elimine o expiren). Las cookies persistentes se usan principalmente para recordar sus preferencias.',
                      'We use session cookies (deleted when you close the browser) and persistent cookies (remain until you delete them or they expire). Persistent cookies are primarily used to remember your preferences.'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('7. Actualizaciones', '7. Updates')}
                  </h4>
                  <p>
                    {t(
                      'Esta política de cookies puede actualizarse ocasionalmente. Cualquier cambio será publicado en esta página con una fecha de actualización revisada.',
                      'This cookie policy may be updated occasionally. Any changes will be posted on this page with a revised update date.'
                    )}
                  </p>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}