// src/modules/Reservations/components/PaymentProofsModal.tsx
import React from 'react';
import { X, Download, FileText, Receipt, RefreshCw } from 'lucide-react';
import type { Reservation, PaymentProof } from '../types/reservation.types';

interface PaymentProofsModalProps {
  isOpen: boolean;
  reservation: Reservation | null;
  onClose: () => void;
}

export const PaymentProofsModal: React.FC<PaymentProofsModalProps> = ({
  isOpen,
  reservation,
  onClose
}) => {
  if (!isOpen || !reservation) return null;

  const getProofIcon = (type: PaymentProof['type']) => {
    switch(type) {
      case 'receipt': return <Receipt className="w-5 h-5 text-green-400" />;
      case 'invoice': return <FileText className="w-5 h-5 text-blue-400" />;
      case 'refund': return <RefreshCw className="w-5 h-5 text-[#F27E7E]" />;
      default: return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const getProofTypeLabel = (type: PaymentProof['type']) => {
    switch(type) {
      case 'receipt': return 'Recibo de Pago';
      case 'invoice': return 'Factura';
      case 'refund': return 'Comprobante de Reembolso';
      default: return 'Documento';
    }
  };

  const handleDownload = (proof: PaymentProof) => {
    if (proof.url) {
      // Simular descarga
      const link = document.createElement('a');
      link.href = proof.url;
      link.download = `${getProofTypeLabel(proof.type)}_${proof.reference}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0D0D0D]/90 backdrop-blur-sm border border-[#8C0303]/30 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#8C0303]/30">
          <div>
            <h3 className="text-xl font-semibold text-white">Comprobantes de Pago</h3>
            <p className="text-sm text-gray-400 mt-1">
              Reserva #{reservation.id.toString().padStart(3, '0')} - {reservation.guestName}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#8C0303]/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {reservation.paymentProofs.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
              <h4 className="text-lg font-medium text-white mb-2">No hay comprobantes disponibles</h4>
              <p className="text-gray-400">
                Los comprobantes de pago aparecerán aquí una vez que se procesen los pagos.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reservation.paymentProofs.map((proof) => (
                <div 
                  key={proof.id}
                  className="bg-[#8C0303]/10 border border-[#8C0303]/20 rounded-lg p-4 hover:bg-[#8C0303]/15 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-[#0D0D0D]/50 rounded-lg">
                        {getProofIcon(proof.type)}
                      </div>
                      <div>
                        <h5 className="font-medium text-white">{getProofTypeLabel(proof.type)}</h5>
                        <p className="text-sm text-gray-400">Referencia: {proof.reference}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-400">
                            Fecha: {proof.date}
                          </span>
                          <span className="text-sm text-gray-400">
                            Método: {proof.method}
                          </span>
                          <span className="text-sm font-medium text-green-400">
                            ${proof.amount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(proof)}
                      className="p-2 bg-[#F20C1F]/20 hover:bg-[#F20C1F]/30 text-[#F27E7E] hover:text-[#F20C1F] rounded-lg transition-all duration-200 flex items-center space-x-2"
                      title="Descargar comprobante"
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-sm">Descargar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Resumen de pagos */}
          <div className="mt-6 pt-6 border-t border-[#8C0303]/30">
            <div className="bg-[#8C0303]/10 border border-[#8C0303]/20 rounded-lg p-4">
              <h5 className="font-medium text-white mb-3">Resumen de Pagos</h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Total de la reserva:</span>
                  <p className="font-medium text-white">${reservation.total.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-400">Estado del pago:</span>
                  <p className={`font-medium ${
                    reservation.paymentStatus === 'Pagado' ? 'text-green-400' :
                    reservation.paymentStatus === 'Pendiente' ? 'text-yellow-400' :
                    reservation.paymentStatus === 'Parcial' ? 'text-orange-400' :
                    'text-[#F27E7E]'
                  }`}>
                    {reservation.paymentStatus}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Método de pago:</span>
                  <p className="font-medium text-white">{reservation.paymentMethod}</p>
                </div>
                <div>
                  <span className="text-gray-400">Comprobantes:</span>
                  <p className="font-medium text-white">{reservation.paymentProofs.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-3 pt-6">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-[#0D0D0D]/80 border border-[#8C0303]/30 rounded-lg text-gray-400 hover:text-white hover:bg-[#8C0303]/20 transition-colors duration-200"
            >
              Cerrar
            </button>
            <button 
              onClick={() => {
                reservation.paymentProofs.forEach(proof => handleDownload(proof));
              }}
              className="px-6 py-2 bg-gradient-to-r from-[#F20C1F] to-[#8C0303] text-white rounded-lg hover:from-[#F20C1F]/90 hover:to-[#8C0303]/90 transition-all duration-200 flex items-center space-x-2"
              disabled={reservation.paymentProofs.length === 0}
            >
              <Download className="w-4 h-4" />
              <span>Descargar Todos</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
