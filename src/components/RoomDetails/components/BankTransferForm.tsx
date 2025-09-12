import React, { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Building2, Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BankTransferFormProps {
  paymentDetails: {
    transferenceReference: string;
  };
  setPaymentDetails: (details: any) => void;
  errors: { [key: string]: string };
}

const BankTransferForm: React.FC<BankTransferFormProps> = ({
  paymentDetails,
  setPaymentDetails,
  errors
}) => {
  const [copiedField, setCopiedField] = React.useState<string>('');

  const bankAccounts = [
    {
      bank: 'Banco de Venezuela',
      accountType: 'Cuenta Corriente',
      accountNumber: '0102-0000-00000000000',
      holder: 'Hotel Paradise C.A.',
      rif: 'J-12345678-9'
    },
    {
      bank: 'Banesco',
      accountType: 'Cuenta Corriente', 
      accountNumber: '0134-0000-00000000000',
      holder: 'Hotel Paradise C.A.',
      rif: 'J-12345678-9'
    }
  ];

  const copyToClipboard = useCallback(async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  }, []);

  const handleReferenceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    setPaymentDetails(prev => ({
      ...prev,
      transferenceReference: value
    }));
  }, [setPaymentDetails]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          Transferencia Bancaria
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Instrucciones */}
        <Alert>
          <AlertDescription>
            Realiza la transferencia a cualquiera de nuestras cuentas y luego ingresa el número de referencia.
          </AlertDescription>
        </Alert>

        {/* Cuentas Bancarias */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Nuestras Cuentas:</h3>
          {bankAccounts.map((account, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg">{account.bank}</h4>
                    <p className="text-gray-600">{account.accountType}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div>
                    <Label className="text-xs text-gray-500">Número de Cuenta</Label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{account.accountNumber}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(account.accountNumber, `account-${index}`)}
                        className="h-6 w-6 p-0"
                      >
                        {copiedField === `account-${index}` ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-xs text-gray-500">Titular</Label>
                    <p className="font-semibold text-sm">{account.holder}</p>
                    <p className="text-xs text-gray-500">RIF: {account.rif}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Formulario de Referencia */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="transferenceReference">
              Número de Referencia de la Transferencia *
            </Label>
            <Input
              id="transferenceReference"
              type="text"
              placeholder="Ej: 123456789"
              value={paymentDetails.transferenceReference}
              onChange={handleReferenceChange}
              className={errors.transferenceReference ? 'border-red-500' : ''}
              maxLength={20}
            />
            {errors.transferenceReference && (
              <p className="text-red-500 text-sm">{errors.transferenceReference}</p>
            )}
            <p className="text-gray-500 text-xs">
              Ingresa el número de referencia que aparece en tu comprobante de transferencia
            </p>
          </div>
        </div>

        {/* Información Adicional */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Importante:</h4>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>• La transferencia debe ser por el monto exacto de la reserva</li>
            <li>• Guarda el comprobante de transferencia</li>
            <li>• La confirmación puede tardar hasta 24 horas hábiles</li>
            <li>• En caso de dudas, contacta a nuestro equipo de soporte</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default BankTransferForm;
