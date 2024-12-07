import { genSalt, hash } from 'bcrypt';
import { Login } from '../models/login_model.js';

async function createDefaultAdminUser() {
    const senha = '123';
    const email = 'teste@gmail.com';

    try {
        // Verificação se o usuário já existe pelo email
        const usuarioExiste = await Login.findOne({ where: { email } });

        if (!usuarioExiste) {
            // Criando e criptografando a senha
            const salt = await genSalt(12);
            const senhaHash = await hash(senha, salt);

            // Criando usuário
            await Login.create({
                senha: senhaHash,
                email,
            });

            console.log('Usuário admin criado com sucesso.');
        } else {
            console.log('Usuário admin já existe.');
        }
    } catch (error) {
        console.error('Erro ao criar o usuário admin:', error);
    }
}

export default createDefaultAdminUser;
