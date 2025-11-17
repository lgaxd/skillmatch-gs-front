import React from 'react';
import { Card } from '../../ui/layout/card';

interface Atividade {
  tipo: 'curso_concluido' | 'curso_andamento' | 'jornada_iniciada';
  titulo: string;
  descricao: string;
  tempo: string;
  xp?: number;
}

export const AtividadesRecentes: React.FC = () => {
  const atividades: Atividade[] = [
    {
      tipo: 'curso_concluido',
      titulo: 'Curso concluído',
      descricao: 'HTML5 e CSS3 Fundamentos',
      tempo: 'Há 2 horas',
      xp: 100
    },
    {
      tipo: 'curso_andamento',
      titulo: 'Curso em andamento',
      descricao: 'CSS Grid e Flexbox',
      tempo: '65% concluído • Continuar estudando'
    },
    {
      tipo: 'jornada_iniciada',
      titulo: 'Jornada iniciada',
      descricao: 'Desenvolvedor Front-end',
      tempo: '15 de Janeiro de 2024'
    }
  ];

  const getConfigAtividade = (tipo: string) => {
    switch (tipo) {
      case 'curso_concluido':
        return {
          icone: '✅',
          cor: 'green',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'curso_andamento':
        return {
          icone: '📚',
          cor: 'blue',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
      case 'jornada_iniciada':
        return {
          icone: '🎯',
          cor: 'purple',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200'
        };
      default:
        return {
          icone: '📝',
          cor: 'gray',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Atividades Recentes</h2>

      <div className="space-y-4">
        {atividades.map((atividade, index) => {
          const config = getConfigAtividade(atividade.tipo);
          
          return (
            <div 
              key={index}
              className={`flex items-center gap-4 p-3 ${config.bgColor} rounded-lg border ${config.borderColor}`}
            >
              <div className={`w-10 h-10 ${config.bgColor.replace('50', '100')} rounded-full flex items-center justify-center`}>
                <span className={`text-${config.color}-600`}>{config.icone}</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{atividade.titulo}</p>
                <p className="text-sm text-gray-600">{atividade.descricao}</p>
                <p className="text-xs text-gray-500">
                  {atividade.tempo}
                  {atividade.xp && ` • +${atividade.xp} XP`}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {atividades.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📝</div>
          <p className="text-gray-600">Nenhuma atividade recente</p>
          <p className="text-sm text-gray-500 mt-1">Complete cursos para ver suas atividades aqui</p>
        </div>
      )}
    </Card>
  );
};