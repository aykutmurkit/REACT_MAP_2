// Harita portal overlay stilleri (Gerçek fullscreen için)
export const portalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: '#000000',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // Fullscreen API için gerekli
  overflow: 'hidden'
}

// Harita kapsayıcı stilleri
export const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
  position: 'relative',
  borderRadius: '0px', // Fullscreen'de border radius kaldır
  overflow: 'hidden',
  boxShadow: 'none' // Fullscreen'de gölge kaldır
}

// Harita div stilleri
export const mapDivStyle = {
  width: '100%',
  height: '100%'
}

// Fluent Design portal kapatma düğmesi stilleri
export const closeButtonStyle = {
  position: 'absolute',
  top: '20px',
  left: '20px',
  width: '48px',
  height: '48px',
  backgroundColor: 'rgba(255,255,255,0.8)',
  backdropFilter: 'blur(30px)',
  WebkitBackdropFilter: 'blur(30px)',
  border: '1px solid rgba(0,0,0,0.12)',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  fontWeight: '600',
  color: '#212121',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
  transition: 'background-color 150ms ease-in-out, box-shadow 150ms ease-in-out',
  zIndex: 10000,
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
}

// Fluent Design portal kapatma düğmesi hover stilleri
export const closeButtonHoverStyle = {
  backgroundColor: 'rgba(255,255,255,0.9)',
  boxShadow: '0 4px 8px rgba(0,0,0,0.16)'
}

// Harita bilgi metni stilleri
export const mapInfoTextStyle = {
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '8px 12px',
  borderRadius: '6px',
  fontSize: '12px',
  color: '#424242',
  fontWeight: '500',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(8px)',
  zIndex: 1000
}

// Fluent Design dashboard kart stilleri
export const dashboardCardStyle = {
  backgroundColor: 'rgba(255,255,255,0.6)',
  backdropFilter: 'blur(30px)',
  WebkitBackdropFilter: 'blur(30px)',
  border: '1px solid rgba(0,0,0,0.12)',
  borderRadius: '6px',
  padding: '24px',
  cursor: 'pointer',
  transition: 'box-shadow 300ms ease-in-out',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}

// Fluent Design dashboard kart hover stilleri
export const dashboardCardHoverStyle = {
  boxShadow: '0 4px 8px rgba(0,0,0,0.16)'
}

// Dashboard kart başlık stilleri
export const dashboardCardTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#323130',
  marginBottom: '8px',
  textAlign: 'center'
}

// Dashboard kart açıklama stilleri
export const dashboardCardDescriptionStyle = {
  fontSize: '14px',
  color: '#605e5c',
  textAlign: 'center',
  lineHeight: '1.4'
}

// Dashboard kart ikon stilleri
export const dashboardCardIconStyle = {
  fontSize: '48px',
  color: '#0078d4',
  marginBottom: '16px'
} 