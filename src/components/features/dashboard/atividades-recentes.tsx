import React from 'react';
import { Card } from '../../ui/layout/card';
import { useThemeClasses } from '../../../hooks/use-theme-classes';

interface Atividade {
  tipo: 'curso_concluido' | 'curso_andamento' | 'jornada_iniciada';
  titulo: string;
  descricao: string;
  tempo: string;
  xp?: number;
}

export const AtividadesRecentes: React.FC = () => {
  const themeClasses = useThemeClasses();
  
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
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
          textColor: 'text-green-600 dark:text-green-400'
        };
      case 'curso_andamento':
        return {
          icone: '📚',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          textColor: 'text-blue-600 dark:text-blue-400'
        };
      case 'jornada_iniciada':
        return {
          icone: '🎯',
          bgColor: 'bg-purple-50 dark:bg-purple-900/20',
          borderColor: 'border-purple-200 dark:border-purple-800',
          textColor: 'text-purple-600 dark:text-purple-400'
        };
      default:
        return {
          icone: '📝',
          bgColor: 'bg-gray-50 dark:bg-gray-800',
          borderColor: 'border-gray-200 dark:border-gray-700',
          textColor: 'text-gray-600 dark:text-gray-400'
        };
    }
  };

  return (
    <Card>
      <h2 className={`text-xl font-bold ${themeClasses.text.primary} mb-6`}>Atividades Recentes</h2>

      <div className="space-y-4">
        {atividades.map((atividade, index) => {
          const config = getConfigAtividade(atividade.tipo);
          
          return (
            <div 
              key={index}
              className={`flex items-center gap-4 p-3 ${config.bgColor} rounded-lg border ${config.borderColor}`}
            >
              <div className={`w-10 h-10 ${config.bgColor.replace('50', '100').replace('/20', '/30')} rounded-full flex items-center justify-center`}>
                <span className={config.textColor}>{config.icone}</span>
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${themeClasses.text.primary}`}>{atividade.titulo}</p>
                <p className={`text-sm ${themeClasses.text.secondary}`}>{atividade.descricao}</p>
                <p className={`text-xs ${themeClasses.text.muted}`}>
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
          <p className={themeClasses.text.secondary}>Nenhuma atividade recente</p>
          <p className={`text-sm ${themeClasses.text.muted} mt-1`}>Complete cursos para ver suas atividades aqui</p>
        </div>
      )}
    </Card>
  );
};