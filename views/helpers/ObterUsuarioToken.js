import jwt from "jsonwebtoken";
import { Login } from "../models/login_model.js";

const ObterUsuarioToken = async (token) => {
  if (!token) {
    throw new Error('Acesso Negado!');
  }

  // Verificar e decodificar o token
  const decoded = jwt.verify(token, "nossosecret");

  // Usar decoded.email em vez de decoded.id para encontrar o usuário pelo email
  const email = decoded.email;

  const usuario = await Login.findOne({ where: { email: email } });

  if (!usuario) {
    throw new Error('Usuário não encontrado!');
  }

  return usuario;
};

// Exportação correta para ES Modules
export default ObterUsuarioToken;
