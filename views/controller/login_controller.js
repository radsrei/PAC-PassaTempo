import { Login } from "../models/login_model.js";
import bcrypt from "bcrypt";
import { EmailValido } from "../helpers/Validacoes.js";
import CriarUsuarioToken from "../helpers/CriarUsuarioToken.js";
import ObterToken from "../helpers/ObterToken.js";
import ObterUsuarioToken from "../helpers/ObterUsuarioToken.js";

const createUser = async (req, res) => {
  const { email, senha } = req.body;

  // Validações
  if (!email) return res.status(422).json({ message: "O email é obrigatório" });
  if (!senha) return res.status(422).json({ message: "A senha é obrigatória" });

  try {
    const emailExiste = await Login.findOne({ where: { email } });
    if (emailExiste) {
      return res.status(422).json({ message: "E-mail já está em uso" });
    }
    if (!EmailValido(email)) {
      return res.status(422).json({ message: "Este e-mail não é válido" });
    }

    // Criptografando a senha
    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Criando usuário
    const novoUsuario = await Login.create({ email, senha: senhaHash });

    // Gera token e responde com sucesso
    await CriarUsuarioToken(novoUsuario, req, res);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao cadastrar o Usuário",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  // Validações
  if (!email) return res.status(422).json({ message: "O e-mail de usuário é obrigatório" });
  if (!senha) return res.status(422).json({ message: "A senha é obrigatória" });

  try {
    // Verifica se o usuário existe
    const usuario = await Login.findOne({ where: { email } });
    if (!usuario) {
      return res.status(422).json({ message: "Não há usuário cadastrado com este e-mail!" });
    }

    // Verifica a senha
    const checarSenha = await bcrypt.compare(senha, usuario.senha);
    if (!checarSenha) {
      return res.status(422).json({ message: "Senha inválida!" });
    }

    // Gera token e responde com sucesso
    await CriarUsuarioToken(usuario, req, res);
  } catch (error) {
    return res.status(500).json({
      message: "Erro no servidor. Tente novamente mais tarde.",
    });
  }
};

export { createUser, login };
