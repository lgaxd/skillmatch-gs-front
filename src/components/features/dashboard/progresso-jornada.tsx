import React from 'react';
import { Card } from '../../ui/layout/card';
import { ProgressBar } from '../../ui/layout/progress-bar';
import BotaoPersonalizado from '../../ui/buttons/botao-personalizado';
import type { CarreiraUsuario } from '../../../types/api';

interface ProgressoCursos {
  cursos_concluidos: number;
  cursos_andamento: number;
  cursos_pendentes: number;
  total_cursos: number;
}

interface ProgressoJornadaProps {
  carreira: CarreiraUsuario;
  progressoCursos: ProgressoCursos;
  onContinuarJornada: () => void;
}

export const ProgressoJornada: React.FC<ProgressoJornadaProps> = ({
  carreira,
  progressoCursos,
  onContinuarJornada
}) => {
  const mapearStatusJornada = (idStatus: number) => {
    switch (idStatus) {
      case 1: return 'Não Iniciada';
      case 2: return 'Em Andamento';
      case 3: return 'Concluída';
      case 4: return 'Pausada';
      default: return 'Em Andamento';
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Sua Jornada</h2>
        <span className="text-sm font-semibold text-indigo-600">
          {carreira.progresso}% Concluído
        </span>
      </div>

      <div className="mb-6">
        <ProgressBar 
          value={carreira.progresso}
          label="Progresso Geral"
          showLabel
          size="md"
          color="green"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{progressoCursos.cursos_concluidos}</div>
          <div className="text-sm text-blue-800">Cursos Concluídos</div>
          <div className="text-xs text-blue-600">de {progressoCursos.total_cursos}</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{progressoCursos.cursos_andamento}</div>
          <div className="text-sm text-green-800">Cursos em Andamento</div>
          <div className="text-xs text-green-600">de {progressoCursos.total_cursos}</div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">Status da Jornada</h3>
        <p className="text-gray-600 mb-3">{mapearStatusJornada(carreira.idStatusJornada)}</p>
        <BotaoPersonalizado
          texto="Continuar Jornada"
          onClick={onContinuarJornada}
          className="w-full"
        />
      </div>
    </Card>
  );
};