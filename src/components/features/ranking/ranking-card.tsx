import React from 'react';
import { Card } from '../../ui/layout/card';

interface RankingCardProps {
  ranking: any;
  onVerRanking: () => void;
}

export const RankingCard: React.FC<RankingCardProps> = ({
  ranking,
  onVerRanking
}) => {
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
        {ranking && (
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
              <div className="font-bold text-gray-800">{ranking.pontuacao_total} XP</div>
              <div className="text-xs text-gray-600">
                {ranking.posicao === 1 ? 'Líder' :
                 ranking.posicao <= 3 ? 'Top 3' : 'Em progresso'}
              </div>
            </div>
          </div>
        )}

        {/* Top 3 do ranking */}
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
                {posicao === 1 ? 'Amanda Ferreira' :
                 posicao === 2 ? 'Fernanda Rocha' : 'Ana Costa'}
              </span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-700">
                {posicao === 1 ? '5000' : posicao === 2 ? '4500' : '3800'} XP
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};