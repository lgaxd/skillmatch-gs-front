export interface User {
  id: number;
  nome: string;
  dataNascimento: string;
  // Propriedades opcionais que podem não estar na API inicial
  email?: string;
  dataCadastro?: string;
  genero?: string;
  telefone?: string;
}

export interface UserCredentials {
  email: string;
  password: string;
  remember: boolean;
}

export interface UserRegistration extends UserCredentials {
  nomeCompleto: string;
  telefone?: string;
  dataNascimento: string;
  genero?: string;
  escolaridade?: string;
  areaAtuacao?: string;
}