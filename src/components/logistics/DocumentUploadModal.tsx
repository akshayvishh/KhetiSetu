import React, { useState } from 'react';
import { FileText, Upload, Check, Eye, AlertCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { DeliveryRequest } from '../../types';
import { useApp } from '../../context/AppContext';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  delivery: DeliveryRequest;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  onClose,
  delivery,
}) => {
  const { uploadDeliveryDocument, showToast } = useApp();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDocType, setSelectedDocType] = useState<'invoice' | 'receipt' | 'weightSlip' | 'lrCopy'>('lrCopy');
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);

  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const fakeFileName =
      selectedFile?.name ||
      `${selectedDocType.toUpperCase()}-${delivery.orderNumber}-${Math.floor(100 + Math.random() * 900)}.pdf`;

    uploadDeliveryDocument(delivery.id, selectedDocType, fakeFileName);
    setSelectedFile(null);
  };

  const handleViewSimulatedDoc = (docName: string, title: string) => {
    setPreviewDoc(`[Simulated Document View]\n\nDocument: ${title}\nFile: ${docName}\nConsignment: ${delivery.cropDetails}\nCarrier: ${delivery.assignedDriverName || 'Sachin Jadhav'} (${delivery.vehicleNumber || 'MH 15 GH 4821'})\nStatus: Verified Digital Copy\n\nNote: In production, this renders the cryptographic signed PDF from the APMC Weighbridge or GST e-Way portal.`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Logistics Documents — Order ${delivery.orderNumber}`}
      subtitle="Upload and manage mandatory freight compliance documents."
      maxWidth="680px"
      footer={
        <button onClick={onClose} className="btn btn-primary">
          Done
        </button>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Upload simulated form */}
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface-low)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          <h4 style={{ fontSize: '1rem', marginBottom: '12px' }}>Attach Transit Record</h4>
          <form onSubmit={handleSimulatedUpload} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div>
                <label className="form-label">Document Category</label>
                <select
                  className="form-select"
                  value={selectedDocType}
                  onChange={(e) => setSelectedDocType(e.target.value as any)}
                >
                  <option value="lrCopy">Lorry Receipt (LR Copy)</option>
                  <option value="weightSlip">APMC Weighbridge Slip</option>
                  <option value="invoice">Commercial Tax Invoice / e-Way Bill</option>
                  <option value="receipt">Toll & Mandi User Cess Receipt</option>
                </select>
              </div>

              <div>
                <label className="form-label">Select File (PDF or Image)</label>
                <input
                  type="file"
                  className="form-input"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  accept=".pdf,.png,.jpg,.jpeg"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }}>
              <Upload size={15} />
              <span>Upload Document (Simulated)</span>
            </button>
          </form>
        </div>

        {/* Existing Attached Documents List */}
        <div>
          <h4 style={{ fontSize: '1rem', marginBottom: '12px' }}>Verified Consignment Records</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* LR Copy */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-surface-lowest)',
                border: '1px solid var(--color-border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileText size={20} color="var(--color-primary)" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Lorry Receipt (LR Copy)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)' }}>
                    {delivery.documents.lrCopyUploaded
                      ? delivery.documents.lrCopyName || 'LorryReceipt-MH15GH.pdf'
                      : 'Pending Upload'}
                  </div>
                </div>
              </div>

              {delivery.documents.lrCopyUploaded ? (
                <button
                  onClick={() =>
                    handleViewSimulatedDoc(
                      delivery.documents.lrCopyName || 'LorryReceipt-MH15GH.pdf',
                      'Lorry Receipt (LR Copy)'
                    )
                  }
                  className="btn btn-outline btn-sm"
                >
                  <Eye size={14} />
                  <span>Preview</span>
                </button>
              ) : (
                <span className="badge badge-warning">Awaiting</span>
              )}
            </div>

            {/* Weighbridge Slip */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-surface-lowest)',
                border: '1px solid var(--color-border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileText size={20} color="var(--color-secondary)" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Weighbridge Weight Slip</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)' }}>
                    {delivery.documents.weightSlipUploaded
                      ? delivery.documents.weightSlipName || 'Weighbridge-Certified-Slip.pdf'
                      : 'Pending Tare/Gross Weighing'}
                  </div>
                </div>
              </div>

              {delivery.documents.weightSlipUploaded ? (
                <button
                  onClick={() =>
                    handleViewSimulatedDoc(
                      delivery.documents.weightSlipName || 'Weighbridge-Certified-Slip.pdf',
                      'Weighbridge Weight Slip'
                    )
                  }
                  className="btn btn-outline btn-sm"
                >
                  <Eye size={14} />
                  <span>Preview</span>
                </button>
              ) : (
                <span className="badge badge-warning">Awaiting</span>
              )}
            </div>

            {/* Invoice */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-surface-lowest)',
                border: '1px solid var(--color-border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileText size={20} color="var(--color-primary)" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Tax Invoice & e-Way Bill</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)' }}>
                    {delivery.documents.invoiceUploaded
                      ? delivery.documents.invoiceName || 'TaxInvoice-KS.pdf'
                      : 'Optional for intra-state below threshold'}
                  </div>
                </div>
              </div>

              {delivery.documents.invoiceUploaded ? (
                <button
                  onClick={() =>
                    handleViewSimulatedDoc(
                      delivery.documents.invoiceName || 'TaxInvoice-KS.pdf',
                      'Tax Invoice & e-Way Bill'
                    )
                  }
                  className="btn btn-outline btn-sm"
                >
                  <Eye size={14} />
                  <span>Preview</span>
                </button>
              ) : (
                <span className="badge badge-secondary">Optional</span>
              )}
            </div>
          </div>
        </div>

        {/* Preview Viewer Modal or Text Area */}
        {previewDoc && (
          <div
            style={{
              padding: '16px',
              backgroundColor: '#1b1b17',
              color: '#d6dfd8',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              whiteSpace: 'pre-wrap',
              lineHeight: 1.5,
              position: 'relative',
            }}
          >
            <button
              onClick={() => setPreviewDoc(null)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '12px',
                color: '#ffffff',
                fontSize: '0.75rem',
                textDecoration: 'underline',
              }}
            >
              Close Preview
            </button>
            {previewDoc}
          </div>
        )}
      </div>
    </Modal>
  );
};
