import jwt from "jsonwebtoken";

const CriarUsuarioToken = async (usuario, req, res) => {
    const token = jwt.sign(
        { email: usuario.email }, // Use "email" explicitamente para consistência
        "nossosecret",
        { expiresIn: '7h' }
    );

    res.status(200).json({
        message: 'Você está autenticado!',
        token: token,
        email: usuario.email,
    });
};

export default CriarUsuarioToken;
