export interface AuthResponse {
  accessToken: string;
  funcionario: Funcionario;
  expiresAt: string;
}

export interface Funcionario {
  id: number;      // <- era "1"
  nome: string;
  email: string;
  perfil: string;
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}
