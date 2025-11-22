import React from 'react';
import { Card } from '../../ui/layout/card';
import { useThemeClasses } from '../../../hooks/use-theme-classes';

interface RankingUsuario {
  posicao: number;
  pontuacao_total: number;
  mes_referencia: string;
}

interface Top3Usuario {
  posicao: number;
  nome: string;
  pontuacao: number;
}

interface RankingCardProps {
  ranking: RankingUsuario | null;
  top3Ranking?: Top3Usuario[];
  onVerRanking: () => void;
}

export const RankingCard: React.FC<RankingCardProps> = ({
  ranking,
  top3Ranking = [],
  onVerRanking
}) => {
  const themeClasses = useThemeClasses();

  // Se não há dados de ranking, mostrar estado vazio
  if (!ranking) {
    return (
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold ${themeClasses.text.primary}`}>Ranking Mensal</h2>
          <button
            onClick={onVerRanking}
            className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold text-sm cursor-pointer"
          >
            Ver ranking completo
          </button>
        </div>

        <div className="text-center py-8">
          <div className="text-4xl mb-2">🏆</div>
          <p className={themeClasses.text.secondary}>Nenhum dado de ranking disponível</p>
          <p className={`text-sm ${themeClasses.text.muted} mt-1`}>
            Complete cursos para entrar no ranking
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-bold ${themeClasses.text.primary}`}>Ranking Mensal</h2>
        <button
          onClick={onVerRanking}
          className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold text-sm cursor-pointer"
        >
          Ver ranking completo
        </button>
      </div>

      <div className="space-y-3">
        {/* Posição do usuário */}
        <div className={`flex items-center justify-between p-3 rounded-lg border ${
          ranking.posicao <= 3
            ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-700'
            : `${themeClasses.background} border ${themeClasses.border}`
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
              ranking.posicao === 1 ? 'bg-yellow-500' :
              ranking.posicao === 2 ? 'bg-gray-500 dark:bg-gray-600' :
              ranking.posicao === 3 ? 'bg-orange-500' : 'bg-blue-500 dark:bg-blue-600'
            }`}>
              {ranking.posicao}º
            </div>
            <span className={`font-semibold ${themeClasses.text.primary}`}>Você</span>
          </div>
          <div className="text-right">
            <div className={`font-bold ${themeClasses.text.primary}`}>{ranking.pontuacao_total.toLocaleString()} XP</div>
            <div className={`text-xs ${themeClasses.text.secondary}`}>
              {ranking.posicao === 1 ? 'Líder' :
               ranking.posicao <= 3 ? 'Top 3' : 'Em progresso'}
            </div>
          </div>
        </div>

        {/* Top 3 do ranking - usando dados da API */}
        {top3Ranking.map((usuario) => (
          <div key={usuario.posicao} className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                usuario.posicao === 1 ? 'bg-yellow-500' :
                usuario.posicao === 2 ? 'bg-gray-500 dark:bg-gray-600' :
                'bg-orange-500'
              }`}>
                {usuario.posicao}º
              </div>
              <span className={`${themeClasses.text.primary} truncate max-w-[120px]`}>
                {usuario.nome}
              </span>
            </div>
            <div className="text-right">
              <div className={`font-semibold ${themeClasses.text.primary}`}>
                {usuario.pontuacao.toLocaleString()} XP
              </div>
            </div>
          </div>
        ))}

        {/* Fallback se não houver top3 da API */}
        {top3Ranking.length === 0 && (
          <>
            {[1, 2, 3].map(posicao => (
              <div key={posicao} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    posicao === 1 ? 'bg-yellow-500' :
                    posicao === 2 ? 'bg-gray-500 dark:bg-gray-600' :
                    'bg-orange-500'
                  }`}>
                    {posicao}º
                  </div>
                  <span className={themeClasses.text.primary}>
                    {posicao === 1 ? 'Carregando...' :
                     posicao === 2 ? 'Carregando...' : 'Carregando...'}
                  </span>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${themeClasses.text.primary}`}>
                    {posicao === 1 ? '...' : posicao === 2 ? '...' : '...'} XP
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </Card>
  );
};