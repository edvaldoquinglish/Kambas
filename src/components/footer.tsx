
import { Github, Twitter, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <span className="text-2xl font-black text-white tracking-tighter mb-6 block">
              KAMBAS
            </span>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              O marketplace de talentos angolanos que conecta o país. De Cabinda ao Cunene, um só povo, muitos talentos.
            </p>
            <div className="flex gap-4">
              <Instagram className="w-5 h-5 text-gray-400 hover:text-orange-500 cursor-pointer" />
              <Facebook className="w-5 h-5 text-gray-400 hover:text-orange-500 cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-orange-500 cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Categorias</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Design Gráfico</a></li>
              <li><a href="#" className="hover:text-white">Programação & Tech</a></li>
              <li><a href="#" className="hover:text-white">Escrita & Tradução</a></li>
              <li><a href="#" className="hover:text-white">Vídeo & Animação</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Sobre</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Como funciona</a></li>
              <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white">Contactos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Suporte</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Centro de Ajuda</a></li>
              <li><a href="#" className="hover:text-white">Segurança</a></li>
              <li><a href="#" className="hover:text-white">Unitel Money Info</a></li>
              <li><a href="#" className="hover:text-white">Afri Money Info</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs text-center">
            &copy; {new Date().getFullYear()} Kambas Angola. Todos os direitos reservados. Feito com orgulho em Angola.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <span>Luanda, Angola</span>
            <span>Made in AO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
