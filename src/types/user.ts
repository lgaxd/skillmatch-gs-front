export interface User {
  id_usuario: number;
  nome_usuario: string;
  email_usuario: string;
  data_nascimento: string;
  data_cadastro: string;
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