import React from 'react';
import { Card } from '../../ui/layout/card';

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
  // Se não há dados de ranking, mostrar estado vazio
  if (!ranking) {
    return (
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Ranking Mensal</h2>
          <button
            onClick={onVerRanking}
            className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm cursor-pointer"
          >
            Ver ranking completo
          </button>
        </div>

        <div className="text-center py-8">
          <div className="text-4xl mb-2">🏆</div>
          <p className="text-gray-600">Nenhum dado de ranking disponível</p>
          <p className="text-sm text-gray-500 mt-1">
            Complete cursos para entrar no ranking
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Ranking Mensal</h2>
        <button
          onClick={onVerRanking}
          className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm cursor-pointer"
        >
          Ver ranking completo
        </button>
      </div>

      <div className="space-y-3">
        {/* Posição do usuário */}
        <div className={`flex items-center justify-between p-3 rounded-lg border ${
          ranking.posicao <= 3
            ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200'
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
              ranking.posicao === 1 ? 'bg-yellow-500' :
              ranking.posicao === 2 ? 'bg-gray-400' :
              ranking.posicao === 3 ? 'bg-orange-500' : 'bg-blue-500'
            }`}>
              {ranking.posicao}º
            </div>
            <span className="font-semibold text-gray-800">Você</span>
          </div>
          <div className="text-right">
            <div className="font-bold text-gray-800">{ranking.pontuacao_total.toLocaleString()} XP</div>
            <div className="text-xs text-gray-600">
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
                usuario.posicao === 1 ? 'bg-yellow-400' :
                usuario.posicao === 2 ? 'bg-gray-400' :
                'bg-orange-400'
              }`}>
                {usuario.posicao}º
              </div>
              <span className="text-gray-700 truncate max-w-[120px]">
                {usuario.nome}
              </span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-700">
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
                    posicao === 1 ? 'bg-yellow-400' :
                    posicao === 2 ? 'bg-gray-400' :
                    'bg-orange-400'
                  }`}>
                    {posicao}º
                  </div>
                  <span className="text-gray-700">
                    {posicao === 1 ? 'Carregando...' :
                     posicao === 2 ? 'Carregando...' : 'Carregando...'}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-700">
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