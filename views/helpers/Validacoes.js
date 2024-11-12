import validator from 'validator';

function EmailValido(email) {
    return validator.isEmail(email);
}

// Remove todos os pontos (.) e traços (-)
function cleanCPF(cpf) {
    return cpf.replace(/[.\-]/g, '');
}

// Validação se o CPF é válido
function cpfValido(cpf) {
    // Limpa o CPF antes de validar
    const cleanedCPF = cleanCPF(cpf);
    return validator.isTaxID(cleanedCPF, 'pt-BR');
}

export { EmailValido, cpfValido };
