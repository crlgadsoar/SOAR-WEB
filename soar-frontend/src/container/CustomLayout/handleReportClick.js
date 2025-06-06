import { Modal, DatePicker, Spin, message, Progress, Row, Col, Card, Typography, Button, Checkbox } from "antd";
import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { generateIncidentReport } from 'api/api';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
const { Group } = Checkbox;

const useHandleReportClick = () => {
  return () => {
    Modal.info({
      title: "Generate Report",
      icon: null,
      width: 800,
      content: <ReportModalContent />,
      okText: "Close",
      onOk() {
        console.log("Closing report modal");
      },
    });
  };
};

const ReportModalContent = () => {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [selectedSeverities, setSelectedSeverities] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const severityOptions = [
    { label: 'Critical', value: 'critical' },
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' },
    { label: 'Info', value: 'info' }
  ];

  const statusOptions = [
    { label: 'Mitigated', value: 'mitigated' },
    { label: 'Under Investigation', value: 'under_investigation' },
    { label: 'Manually Mitigated', value: 'manually_mitigated' }
  ];

  const generateReport = async () => {
    setLoading(true);
    try {
      const data = await generateIncidentReport({
        dateRange,
        severities: selectedSeverities,
        statuses: selectedStatuses
      });
    
      setReportData(data);
      message.success("Report data loaded successfully");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
  const input = document.getElementById('report-content');
  
  if (!input) {
    message.error('Report content not found');
    return;
  }

  setLoading(true);
  message.info('Generating PDF... This may take a moment', 5);

  try {
    // Create a temporary container with fixed width
    const container = document.createElement('div');
    container.style.width = '794px'; // A4 width in pixels (210mm)
    container.style.maxWidth = '794px';
    container.style.overflow = 'hidden';
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.backgroundColor = 'white';
    container.style.padding = '24px'; // Match your content padding
    container.appendChild(input.cloneNode(true));
    document.body.appendChild(container);

    // Wait for layout to stabilize and fonts to load
    await new Promise(resolve => setTimeout(resolve, 500));

    // Enhanced html2canvas options
    const options = {
      scale: 2, // Double the scale for higher quality
      width: 794,
      height: container.scrollHeight, // Capture full height
      windowWidth: 794,
      logging: false, // Disable logging for production
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      letterRendering: true, // Better text rendering
      dpi: 300, // Higher DPI for better quality
      quality: 1, // Maximum quality
      onclone: (clonedDoc) => {
        // Ensure all fonts are visible during rendering
        clonedDoc.getElementById('report-content').style.fontFamily = 'Arial, sans-serif';
      }
    };

    const canvas = await html2canvas(container, options);
    document.body.removeChild(container);

    if (!canvas || canvas.width <= 0 || canvas.height <= 0) {
      throw new Error('Canvas rendering failed');
    }

    // Create PDF with higher quality settings
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
      hotfixes: ['px_scaling'] // Fix PDF.js scaling issues
    });
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate how many pages we need
    const imgHeight = (canvas.height * pageWidth) / canvas.width;
    const totalPages = Math.ceil(imgHeight / pageHeight);
    
    for (let i = 0; i < totalPages; i++) {
      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }
      
      const position = -i * pageHeight;
      
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0), // Highest quality JPEG
        'JPEG',
        0,
        position,
        pageWidth,
        imgHeight,
        undefined,
        'FAST' // 'FAST' or 'SLOW' (SLOW is better quality)
      );
    }

    pdf.save(`incident_report_${new Date().toISOString().split('T')[0]}.pdf`);
    message.success('PDF generated successfully');
  } catch (error) {
    console.error('PDF generation error:', error);
    message.error(`Failed to generate PDF: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

  const renderSeverityChart = () => {
    if (!reportData) return null;
    
    const total = reportData.totalIncidents;
    const colors = {
      critical: '#ff4d4f',
      high: '#ff7a45',
      medium: '#ffa940',
      low: '#ffc53d',
      info: '#36cfc9'
    };

    return (
      <Card title="Incidents by Severity" bordered={false}>
        {Object.entries(reportData.severityData).map(([key, value]) => (
          <div key={key} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
              <Text>{value} ({Math.round((value / total) * 100)}%)</Text>
            </div>
            <Progress 
              percent={Math.round((value / total) * 100)} 
              strokeColor={colors[key]}
              status="active"
              showInfo={false}
            />
          </div>
        ))}
      </Card>
    );
  };

  const renderStatusChart = () => {
    if (!reportData) return null;
    
    const total = reportData.totalIncidents;
    const colors = {
      mitigated: '#36cfc9',
      under_investigation: '#597ef7',
      manually_mitigated: '#9254de'
    };

    return (
      <Card title="Incidents by Status" bordered={false}>
        {Object.entries(reportData.statusData).map(([key, value]) => (
          <div key={key} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>
                {key.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}
              </Text>
              <Text>{value} ({Math.round((value / total) * 100)}%)</Text>
            </div>
            <Progress 
              percent={Math.round((value / total) * 100)} 
              strokeColor={colors[key]}
              status="active"
              showInfo={false}
            />
          </div>
        ))}
      </Card>
    );
  };

  const renderIncidentList = () => {
  if (!reportData?.incidents) return null;

  return (
    <Card title="Incident Details" bordered={false} style={{ marginTop: 24 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ width: '15%', padding: '8px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ width: '15%', padding: '8px', border: '1px solid #ddd' }}>Date</th>
            <th style={{ width: '10%', padding: '8px', border: '1px solid #ddd' }}>Severity</th>
            <th style={{ width: '15%', padding: '8px', border: '1px solid #ddd' }}>Status</th>
            <th style={{ width: '45%', padding: '8px', border: '1px solid #ddd' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {reportData.incidents.map((incident, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
              <td style={{ 
                padding: '8px', 
                border: '1px solid #ddd',
                wordWrap: 'break-word',
                whiteSpace: 'normal'
              }}>
                {incident.incidentid}
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{incident.datetimestamp}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textTransform: 'capitalize' }}>
                {incident.severity}
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textTransform: 'capitalize' }}>
                {incident.status ? incident.status.replace(/_/g, ' ') : 'N/A'}
              </td>                
              <td style={{ 
                padding: '8px', 
                border: '1px solid #ddd',
                wordWrap: 'break-word',
                whiteSpace: 'normal'
              }}>
                {incident.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <Text strong>Date Range</Text>
          <RangePicker 
            style={{ width: '100%', marginTop: 8 }}
            onChange={setDateRange}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <Text strong>Severity</Text>
          <Group
            options={severityOptions}
            onChange={setSelectedSeverities}
            value={selectedSeverities}
            style={{ width: '100%', marginTop: 8 }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <Text strong>Status</Text>
          <Group
            options={statusOptions}
            onChange={setSelectedStatuses}
            value={selectedStatuses}
            style={{ width: '100%', marginTop: 8 }}
          />
        </div>
        
        <Button
          type="primary"
          onClick={generateReport}
          disabled={loading}
          style={{ marginTop: 16 }}
        >
          {loading ? <Spin size="small" /> : "Generate Report"}
        </Button>
      </div>

      {reportData && (
        <>
          <div id="report-content" style={{ background: 'white', padding: 24, borderRadius: 8 }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Title level={3}>Incident Analysis Report</Title>
              <Text type="secondary">
                {dateRange ? 
                  `Date Range: ${dateRange[0].format('YYYY-MM-DD')} to ${dateRange[1].format('YYYY-MM-DD')}` : 
                  'All Time Period'}
              </Text>
              <div style={{ marginTop: 8 }}>
                <Text strong>Total Incidents: {reportData.totalIncidents}</Text>
              </div>
              {selectedSeverities.length > 0 && (
                <div style={{ marginTop: 4 }}>
                  <Text>Severities: {selectedSeverities.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')}</Text>
                </div>
              )}
              {selectedStatuses.length > 0 && (
                <div style={{ marginTop: 4 }}>
                  <Text>
  Statuses: {selectedStatuses.map(s =>
    s.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  ).join(', ')}
</Text>

                </div>
              )}
            </div>
            
            <Row gutter={24}>
              <Col span={12}>
                {renderSeverityChart()}
              </Col>
              <Col span={12}>
                {renderStatusChart()}
              </Col>
            </Row>

            {reportData.incidents && renderIncidentList()}
            
            <div style={{ textAlign: 'center', marginTop: 24, color: '#888' }}>
              <Text>Generated on: {new Date().toLocaleString()}</Text>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Button
              type="primary"
              onClick={downloadPDF}
              disabled={loading}
              style={{ background: '#52c41a', borderColor: '#52c41a' }}
            >
              {loading ? <Spin size="small" /> : "Download PDF"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default useHandleReportClick;
