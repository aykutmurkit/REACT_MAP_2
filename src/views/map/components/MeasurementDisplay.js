import React from 'react'
import { MdClose, MdStraighten, MdSquareFoot } from 'react-icons/md'

const MeasurementDisplay = ({ measurements, onClose, onClearMeasurement }) => {
  if (!measurements || measurements.length === 0) {
    return null
  }

  const measurementContainerStyle = {
    backgroundColor: 'var(--fd-bg-light)',
    backdropFilter: 'blur(var(--fd-blur))',
    WebkitBackdropFilter: 'blur(var(--fd-blur))',
    border: '1px solid var(--fd-border)',
    borderRadius: '6px',
    boxShadow: 'var(--fd-shadow-2)',
    fontFamily: 'var(--fd-font-family)',
    fontSize: 'var(--fd-font-size-base)',
    color: 'var(--fd-text-primary)',
    minWidth: '250px',
    maxWidth: '350px',
    zIndex: 1000
  }

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--fd-space-md)',
    paddingBottom: 'var(--fd-space-sm)',
    borderBottom: '1px solid var(--fd-border)'
  }

  const titleStyle = {
    fontSize: 'var(--fd-font-size-md)',
    fontWeight: 'var(--fd-font-weight-semibold)',
    margin: 0
  }

  const closeButtonStyle = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 'var(--fd-space-xs)',
    borderRadius: '2px',
    color: 'var(--fd-text-secondary)',
    transition: 'all var(--fd-duration-fast) var(--fd-ease)'
  }

  const measurementItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: 'var(--fd-space-sm)',
    marginBottom: 'var(--fd-space-xs)',
    backgroundColor: 'rgba(0,120,212,0.05)',
    borderRadius: '4px',
    border: '1px solid rgba(0,120,212,0.1)'
  }

  const iconStyle = {
    marginRight: 'var(--fd-space-sm)',
    color: 'var(--fd-accent)'
  }

  const measurementTextStyle = {
    flex: 1,
    fontSize: 'var(--fd-font-size-base)',
    fontWeight: 'var(--fd-font-weight-regular)'
  }

  const valueStyle = {
    fontWeight: 'var(--fd-font-weight-semibold)',
    color: 'var(--fd-accent)'
  }

  const clearButtonStyle = {
    background: 'var(--fd-accent)',
    color: 'var(--fd-text-on-accent)',
    border: 'none',
    padding: 'var(--fd-space-xs) var(--fd-space-sm)',
    borderRadius: '2px',
    cursor: 'pointer',
    fontSize: 'var(--fd-font-size-sm)',
    fontWeight: 'var(--fd-font-weight-semibold)',
    marginTop: 'var(--fd-space-sm)',
    width: '100%',
    transition: 'background-color var(--fd-duration-fast) var(--fd-ease)'
  }

  const renderMeasurement = (measurement, index) => {
    const icon = measurement.type === 'distance' ? MdStraighten : MdSquareFoot
    const label = measurement.type === 'distance' ? 'Mesafe' : 'Alan'
    
    return (
      <div key={index} className="d-flex align-items-center p-2 mb-2" style={measurementItemStyle}>
        {React.createElement(icon, {
          size: 16,
          style: iconStyle,
          className: 'me-2'
        })}
        <div className="flex-grow-1" style={measurementTextStyle}>
          <div>{label}</div>
          <div style={valueStyle}>{measurement.value}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="position-fixed" style={{ top: '20px', left: '20px', zIndex: 1000 }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            <div className="card" style={measurementContainerStyle}>
              {/* Header */}
              <div className="card-header d-flex justify-content-between align-items-center p-3" style={headerStyle}>
                <h5 className="card-title mb-0" style={titleStyle}>Ölçümler</h5>
                <button 
                  className="btn btn-sm p-1" 
                  style={closeButtonStyle}
                  onClick={onClose}
                  title="Kapat"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(0,0,0,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                  }}
                >
                  <MdClose size={18} />
                </button>
              </div>
              
              {/* Content */}
              <div className="card-body p-3">
                {measurements.map(renderMeasurement)}
                <button 
                  className="btn w-100 mt-2"
                  style={clearButtonStyle}
                  onClick={onClearMeasurement}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--fd-accent-hover)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'var(--fd-accent)'
                  }}
                >
                  Ölçümleri Temizle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeasurementDisplay 