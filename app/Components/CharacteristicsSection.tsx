import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Info } from 'lucide-react';

export interface Characteristic {
  id: string;
  key: string;
  value: string;
}

interface CharacteristicsSectionProps {
  characteristics: Characteristic[];
  onChange: (characteristics: Characteristic[]) => void;
}

const CharacteristicsSection: React.FC<CharacteristicsSectionProps> = ({ 
  characteristics, 
  onChange 
}) => {
  const addCharacteristic = () => {
    const newCharacteristic = {
      id: `char_${Date.now()}`,
      key: '',
      value: ''
    };
    onChange([...characteristics, newCharacteristic]);
  };

  const removeCharacteristic = (id: string) => {
    onChange(characteristics.filter(char => char.id !== id));
  };

  const updateCharacteristic = (id: string, field: 'key' | 'value', value: string) => {
    onChange(
      characteristics.map(char => 
        char.id === id ? { ...char, [field]: value } : char
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            Caractéristiques du produit 
            <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              Optionnel
            </span>
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Ajoutez des détails spécifiques comme la couleur, la taille, la marque, etc.
          </p>
        </div>
        
        <motion.button
          type="button"
          onClick={addCharacteristic}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 shadow-sm hover:shadow-md transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="h-5 w-5" />
        </motion.button>
      </div>

      {characteristics.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start shadow-sm">
          <Info className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            Ajoutez des caractéristiques pour mieux décrire votre produit. Par exemple: Couleur, Taille, Marque, etc.
          </p>
        </div>
      )}

      <AnimatePresence>
        {characteristics.map((char) => (
          <motion.div
            key={char.id}
            className="grid grid-cols-[1fr,1fr,auto] gap-3 items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <input
                type="text"
                value={char.key}
                onChange={(e) => updateCharacteristic(char.id, 'key', e.target.value)}
                placeholder="Caractéristique (ex: Couleur)"
                className="w-full p-3 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
              />
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={char.value}
                onChange={(e) => updateCharacteristic(char.id, 'value', e.target.value)}
                placeholder="Valeur (ex: Rouge)"
                className="w-full p-3 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
              />
            </div>
            
            <motion.button
              type="button"
              onClick={() => removeCharacteristic(char.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Supprimer cette caractéristique"
            >
              <Trash2 className="h-5 w-5" />
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {characteristics.length > 0 && (
        <motion.button
          type="button"
          onClick={addCharacteristic}
          className="mt-2 flex items-center justify-center w-full py-2 px-4 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-orange-500 hover:border-orange-300 transition-colors duration-200"
          whileHover={{ scale: 1.01, backgroundColor: 'rgba(249, 115, 22, 0.05)' }}
          whileTap={{ scale: 0.99 }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une autre caractéristique
        </motion.button>
      )}
    </div>
  );
};

export default CharacteristicsSection;