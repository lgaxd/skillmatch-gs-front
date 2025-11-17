import React from 'react';
import { Card } from '../../ui/layout/card';
import { calcularNivel } from '../../../utils/calculations';
import type { CarreiraUsuario, ProgressoCursos } from '../../../types/api';

interface EstatisticasCarreiraProps {
  carreira: CarreiraUsuario;
  progressoCursos: ProgressoCursos;
}

export const EstatisticasCarreira: React.FC<EstatisticasCarreiraProps> = ({
  carreira,
  progressoCursos
}) => {
  const nivelAtual = calcularNivel(carreira.xp_total);

  const estatisticas = [
    {
      label: 'XP Total',
      valor: carreira.xp_total.toLocaleString(),
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
          <span className="font-semibold text-gray-800">{carreira.nome_carreira}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Área:</span>
          <span className="font-semibold text-gray-800">{carreira.area_atuacao}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span className={`font-semibold ${
            carreira.status_jornada === 'Em Andamento' ? 'text-green-600' :
            carreira.status_jornada === 'Concluída' ? 'text-blue-600' :
            carreira.status_jornada === 'Pausada' ? 'text-yellow-600' : 'text-gray-600'
          }`}>
            {carreira.status_jornada}
          </span>
        </div>
        {carreira.data_inicio && (
          <div className="flex justify-between">
            <span className="text-gray-600">Início:</span>
            <span className="font-semibold text-gray-800">
              {new Date(carreira.data_inicio).toLocaleDateString('pt-BR')}
            </span>
          </div>
        )}
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
            : '💡 Inicie um novo curso para progredir!'}
        </p>
      </div>
    </Card>
  );
};