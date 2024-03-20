function ErrorModal({ message, onClose }) {
    return (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <img src="C:\Users\Lenovo\Desktop\D3XTRA\d3xtra-electron\resources\icons\error.png" alt="Error Icon" style={styles.icon} />
          <h2>Error</h2>
          <p>{message || 'An error occurred.'}</p>
          <button onClick={onClose} style={styles.closeButton}>Close</button>
        </div>
      </div>
    );
  }
  
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999, // Ensure modal is on top
    },
    modal: {
      backgroundColor: '#fff',
      padding: '20px',
      border: '2px solid #ff0000',
      borderRadius: '8px',
      textAlign: 'center',
    },
    icon: {
      width: '64px',
      height: '64px',
      margin: '0 auto',
      marginBottom: '10px',
    },
    closeButton: {
      backgroundColor: '#ff0000',
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 16px',
      cursor: 'pointer',
      fontSize: '16px',
    }
  };
  
  export default ErrorModal;
  