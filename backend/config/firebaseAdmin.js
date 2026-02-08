
import admin from 'firebase-admin';

// Inicializa o SDK do Firebase Admin. 
// O Firebase gerencia a configuração automaticamente quando a função é implantada.
try {
  admin.initializeApp();
} catch (error) {
  // Evita erros de inicialização dupla durante o desenvolvimento ou testes locais
  if (error.code !== 'app/duplicate-app') {
    console.error('Firebase Admin initialization error:', error);
  }
}

export default admin;
