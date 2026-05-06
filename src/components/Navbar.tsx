
import { Link, useNavigate } from 'react-router-dom';
import { Search, User as UserIcon, LogOut, Menu, X, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        return; // User closed the popup, do nothing
      }
      if (error.code === 'auth/unauthorized-domain') {
        alert("Este domínio não está autorizado no Firebase. Por favor, adicione este URL aos 'Domínios Autorizados' na consola do Firebase (Auth > Settings).");
        return;
      }
      if (error.code === 'auth/network-request-failed') {
        alert("Erro de rede: Não foi possível contactar o Firebase. Verifica a tua ligação à internet ou se algum adblocker está a bloquear o acesso.");
        return;
      }
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-black text-orange-600 tracking-tighter">
              KAMBAS
            </Link>
            
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-1.5 w-96">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="O que estás a procurar hoje?" 
                className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/explore" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">
              Explorar
            </Link>
            {user ? (
              <>
                <Link to="/messages" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">
                  Mensagens
                </Link>
                <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">
                  Painel
                </Link>
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                  <Link to={`/u/${user.uid}`} className="flex flex-col items-end group">
                    <span className="text-xs font-bold text-gray-900 leading-none group-hover:text-orange-600 transition-colors">{profile?.fullName || user.displayName}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">{profile?.role || 'Visitante'}</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <button 
                  onClick={handleLogin}
                  className="text-sm font-semibold text-gray-900 hover:text-orange-600"
                >
                  Entrar
                </button>
                <button 
                  onClick={handleLogin}
                  className="bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-all active:scale-95"
                >
                  Registar-se
                </button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4 shadow-xl"
          >
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="O que estás a procurar?" 
                className="bg-transparent border-none focus:ring-0 text-sm w-full"
              />
            </div>
            <div className="flex flex-col gap-4">
              <Link to="/explore" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium">Explorar</Link>
              {user ? (
                <>
                  <Link to="/messages" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium">Mensagens</Link>
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium">Painel</Link>
                  <button onClick={handleLogout} className="text-red-600 font-medium text-left">Sair</button>
                </>
              ) : (
                <button 
                  onClick={handleLogin}
                  className="bg-orange-600 text-white px-5 py-3 rounded-xl text-center font-bold"
                >
                  Começar agora
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
