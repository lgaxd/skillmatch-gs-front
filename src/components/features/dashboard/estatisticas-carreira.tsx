import React from 'react';
import { Card } from '../../ui/layout/card';
import { calcularNivel } from '../../../utils/calculations';
import type { CarreiraUsuario } from '../../../types/api';

interface ProgressoCursos {
  cursos_concluidos: number;
  cursos_andamento: number;
  cursos_pendentes: number;
  total_cursos: number;
}

interface EstatisticasCarreiraProps {
  carreira: CarreiraUsuario;
  progressoCursos: ProgressoCursos;
}

export const EstatisticasCarreira: React.FC<EstatisticasCarreiraProps> = ({
  carreira,
  progressoCursos
}) => {
  const nivelAtual = calcularNivel(carreira.xp);

  const mapearStatusJornada = (idStatus: number) => {
    switch (idStatus) {
      case 1: return 'Não Iniciada';
      case 2: return 'Em Andamento';
      case 3: return 'Concluída';
      case 4: return 'Pausada';
      default: return 'Em Andamento';
    }
  };

  const estatisticas = [
    {
      label: 'XP Total',
      valor: carreira.xp.toLocaleString(),
      icone: '⭐',
      cor: 'text-yellow-600'
    },
    {
      label: 'Cursos Concluídos',
      valor: progressoCursos.cursos_concluidos,
      icone: '✅',
      cor: 'text-green-600'
    },
    {
      label: 'Nível Atual',
      valor: nivelAtual,
      icone: '📊',
      cor: 'text-blue-600'
    },
    {
      label: 'Cursos em Andamento',
      valor: progressoCursos.cursos_andamento,
      icone: '🔄',
      cor: 'text-orange-600'
    }
  ];

  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Sua Carreira</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Carreira:</span>
          <span className="font-semibold text-gray-800">{carreira.carreira.nome}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Área:</span>
          <span className="font-semibold text-gray-800">{carreira.carreira.descricao}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span className={`font-semibold ${
            carreira.idStatusJornada === 2 ? 'text-green-600' :
            carreira.idStatusJornada === 3 ? 'text-blue-600' :
            carreira.idStatusJornada === 4 ? 'text-yellow-600' : 'text-gray-600'
          }`}>
            {mapearStatusJornada(carreira.idStatusJornada)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Progresso:</span>
          <span className="font-semibold text-gray-800">{carreira.progresso}%</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Estatísticas</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {estatisticas.map((estatistica, index) => (
            <div 
              key={index}
              className="text-center p-3 bg-gray-50 rounded-lg"
            >
              <div className={`text-lg font-bold ${estatistica.cor} mb-1`}>
                {estatistica.valor}
              </div>
              <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                <span>{estatistica.icone}</span>
                <span>{estatistica.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dica de produtividade */}
      <div className="mt-6 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
        <p className="text-sm text-indigo-800 text-center">
          {progressoCursos.cursos_andamento > 0 
            ? '💡 Continue com os cursos em andamento!' 
            : progressoCursos.cursos_concluidos > 0
            ? '💡 Parabéns pelos cursos concluídos! Continue assim!'
            : '💡 Inicie um novo curso para progredir!'}
        </p>
      </div>
    </Card>
  );
};