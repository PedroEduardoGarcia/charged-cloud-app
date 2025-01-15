export const ERROR_MESSAGES = {
  EMPTY_QUERY: "Por favor, digite um CNPJ válido.",
  NOT_FOUND: "Empresa não encontrada.",
  OFFLINE: "Dados offline recuperados.",
  GENERAL: "Ocorreu um erro.",
  FETCH_FAILED: "Falha ao buscar empresas do servidor.",
  UPDATE_FAILED: "Falha no update",
  DELETE_FAILED: "Falha no delete",
};

export const getErrorMessage = (error: any): string => {
  if (error instanceof TypeError) {
    return "Problema de conexão. Verifique sua internet.";
  }
  return error.message || ERROR_MESSAGES.GENERAL;
};