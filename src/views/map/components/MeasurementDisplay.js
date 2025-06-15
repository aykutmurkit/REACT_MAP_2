import React from 'react'
import { MdClose, MdStraighten, MdSquareFoot } from 'react-icons/md'

const MeasurementDisplay = ({ measurements, onClose, onClearMeasurement }) => {
  if (!measurements || measurements.length === 0) {
    return null
  }

  const measurementContainerStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    backgroundColor: 'var(--fd-bg-light)',
    backdropFilter: 'blur(var(--fd-blur))',
    WebkitBackdropFilter: 'blur(var(--fd-blur))',
    border: '1px solid var(--fd-border)',
    borderRadius: '6px',
    boxShadow: 'var(--fd-shadow-2)',
    padding: 'var(--fd-space-md)',
    minWidth: '250px',
    maxWidth: '350px',
    zIndex: 1000,
    fontFamily: 'var(--fd-font-family)',
    fontSize: 'var(--fd-font-size-base)',
    color: 'var(--fd-text-primary)'
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
    
    return React.createElement('div', {
      key: index,
      style: measurementItemStyle
    }, [
      React.createElement(icon, {
        key: 'icon',
        size: 16,
        style: iconStyle
      }),
      React.createElement('div', {
        key: 'text',
        style: measurementTextStyle
      }, [
        React.createElement('div', {
          key: 'label'
        }, label),
        React.createElement('div', {
          key: 'value',
          style: valueStyle
        }, measurement.value)
      ])
    ])
  }

  return React.createElement('div', {
    style: measurementContainerStyle
  }, [
    React.createElement('div', {
      key: 'header',
      style: headerStyle
    }, [
      React.createElement('h3', {
        key: 'title',
        style: titleStyle
      }, 'Ölçümler'),
      React.createElement('button', {
        key: 'close',
        style: closeButtonStyle,
        onClick: onClose,
        title: 'Kapat'
      }, React.createElement(MdClose, { size: 18 }))
    ]),
    React.createElement('div', {
      key: 'measurements'
    }, measurements.map(renderMeasurement)),
    React.createElement('button', {
      key: 'clear',
      style: clearButtonStyle,
      onClick: onClearMeasurement,
      onMouseEnter: (e) => {
        e.target.style.backgroundColor = 'var(--fd-accent-hover)'
      },
      onMouseLeave: (e) => {
        e.target.style.backgroundColor = 'var(--fd-accent)'
      }
    }, 'Ölçümleri Temizle')
  ])
}

export default MeasurementDisplay 