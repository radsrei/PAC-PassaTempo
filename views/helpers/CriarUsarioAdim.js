import { genSalt, hash } from 'bcrypt';
import Usuario from '../models/usuario';

async function createDefaultAdminUser() {
    const senha = '123';
    const email = 'teste@gmail.com';

    try {
        // Verificação se o usuario já existe
        const usuarioExiste = await Usuario.findOne({ where: { NM_USUARIO } });
        if (!usuarioExiste) {
            // Criando e criptografando a senha
            const salt = await genSalt(12);
            const senhaHash = await hash(SENHA, salt);

            // Criando usuário
            await Usuario.create({
                SENHA: senhaHash,
                EMAIL,
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
