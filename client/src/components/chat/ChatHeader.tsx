import { MessageCircle } from "lucide-react";

export default function ChatHeader() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-chat-primary rounded-full flex items-center justify-center">
            <MessageCircle className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Asistente de Comunicación</h1>
            <p className="text-sm text-gray-500">Especializado en temas de comunicación</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600 hidden sm:inline">En línea</span>
        </div>
      </div>
    </header>
  );
}
