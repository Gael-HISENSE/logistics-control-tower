import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';

const NavBar = () => (
  <nav className="bg-teal-500 text-white p-4 flex justify-between items-center">
    <div className="text-2xl font-bold">Hisense</div>
    <div className="flex space-x-6">
      <a href="#" className="hover:underline">TELEVISIÓN</a>
      <a href="#" className="hover:underline">LÍNEA BLANCA</a>
      <a href="#" className="hover:underline">AUDIO</a>
      <a href="#" className="hover:underline">AC</a>
      <a href="#" className="hover:underline">CONTACTO</a>
      <Search className="cursor-pointer" />
    </div>
  </nav>
);

const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white bg-opacity-90 p-6 rounded-xl max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-teal-600">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors">
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
};

const ProcessNode = ({ title, items, color, definitions }) => {
  const [expanded, setExpanded] = useState(false);
  const [modalInfo, setModalInfo] = useState({ isOpen: false, title: '', content: '' });
  
  const handleItemClick = (item) => {
    setModalInfo({
      isOpen: true,
      title: item,
      content: definitions[item] || 'Definición no disponible'
    });
  };
  
  return (
    <div className="flex flex-col items-center mb-8 transform transition-all duration-300 hover:scale-105">
      <button 
        onClick={() => setExpanded(!expanded)} 
        className={`p-3 rounded-lg text-white font-bold mb-3 w-48 shadow-lg ${color} hover:shadow-xl transition-all duration-300`}
      >
        {title}
      </button>
      {expanded && (
        <div className="flex flex-col items-center space-y-2 animate-fadeIn">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item)}
              className={`p-2 rounded-md text-white w-40 text-sm ${color} hover:opacity-80 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      <Modal
        isOpen={modalInfo.isOpen}
        onClose={() => setModalInfo({ ...modalInfo, isOpen: false })}
        title={modalInfo.title}
        content={modalInfo.content}
      />
    </div>
  );
};

const LogisticsControlTower = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const definitions = {
    "Entrada": "Responsable: Patieros. Registro de ingreso con información del operador y unidad.",
    "Salida": "Responsable: Patieros. Registro de salida de la unidad.",
    "Verificación": "Responsable: Recibo. Clasificación de producto y registro de tiempos.",
    "RDR & Pedimento": "Responsable: Recibo. Documentación de unidad y descarga en PDF.",
    "Avance operativo": "Responsable: Embarques y Distribución. Estatus de surtido y ETAs de unidades.",
    "Fin de carga": "Responsable: Embarques. Registro de cortes y tiempos.",
    "Diagramas de carga": "Responsable: Embarques. Documentación de carga de la unidad.",
    "Inicio de ruta": "Responsable: Monitoreo. Registro de inicio a ruta cliente de la unidad.",
    "Monitoreo transito": "Responsable: Monitoreo. Monitoreo activo de unidades en tránsito.",
    "POD": "Responsable: Distribución y Monitoreo. Documentación de entrega a cliente.",
    "Análisis del rechazo": "Responsabilidad: Logística Inversa. Registro de evidencias del rechazo.",
    "Registro": "Responsable: Distribución y Logística Inversa. Registro de unidades con siniestro.",
    "Documentación": "Responsable: Distribución y Monitoreo. Adjuntos de evidencias solicitadas por la aseguradora."
  };

  const processes = [
    { title: "Recibo", items: ["Entrada", "Inicio de descarga", "Fin de descarga", "Verificación", "Salida", "RDR & Pedimento"], color: "bg-blue-500" },
    { title: "Embarques", items: ["Avance operativo", "Entrada", "Inicio de carga", "Fin de carga", "Documentos", "Salida", "Diagramas de carga"], color: "bg-green-500" },
    { title: "Entregas", items: ["Inicio de ruta", "Monitoreo transito", "Arribo a cliente", "Entrega a cliente", "POD"], color: "bg-orange-500" },
    { title: "Rechazo", items: ["Entrada", "Inicio de descarga", "Fin de descarga", "Salida", "Análisis del rechazo"], color: "bg-purple-500" },
    { title: "Siniestros", items: ["Registro", "Documentación"], color: "bg-red-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-teal-700">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <div className={`text-white mb-12 transition-all duration-1000 ${animate ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-10'}`}>
          <h1 className="text-5xl font-bold mb-4">Descubre nuestra</h1>
          <h2 className="text-6xl font-extrabold">Torre de Control Logística</h2>
        </div>
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 shadow-2xl">
          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {processes.map((process, index) => (
              <ProcessNode 
                key={index} 
                title={process.title} 
                items={process.items} 
                color={process.color} 
                definitions={definitions}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticsControlTower;
