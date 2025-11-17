import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BackgroundPrincipal } from "../components/background-principal";
import BotaoPersonalizado from "../components/ui/buttons/botao-personalizado";
import { InputPersonalizado } from "../components/ui/forms/input-personalizado";
import { SelectPersonalizado } from "../components/ui/forms/select-personalizado";
import { PasswordStrength } from "../components/ui/forms/password-strength";

interface FormData {
  nomeCompleto: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  genero: string;
  escolaridade: string;
  areaAtuacao: string;
  senha: string;
  confirmarSenha: string;
}

interface FormErrors {
  [key: string]: string;
}

export function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    nomeCompleto: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    genero: "",
    escolaridade: "",
    areaAtuacao: "",
    senha: "",
    confirmarSenha: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const generos = [
    { value: "masculino", label: "Masculino" },
    { value: "feminino", label: "Feminino" },
    { value: "outro", label: "Outro" },
    { value: "prefiro_nao_informar", label: "Prefiro não informar" }
  ];

  const escolaridades = [
    { value: "ensino_medio", label: "Ensino Médio" },
    { value: "tecnico", label: "Técnico" },
    { value: "graduacao", label: "Graduação" },
    { value: "pos_graduacao", label: "Pós-graduação" },
    { value: "mestrado", label: "Mestrado" },
    { value: "doutorado", label: "Doutorado" }
  ];

  const areasAtuacao = [
    { value: "tecnologia", label: "Tecnologia" },
    { value: "saude", label: "Saúde" },
    { value: "educacao", label: "Educação" },
    { value: "financas", label: "Finanças" },
    { value: "marketing", label: "Marketing" },
    { value: "vendas", label: "Vendas" },
    { value: "rh", label: "Recursos Humanos" },
    { value: "outra", label: "Outra" }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validações básicas
    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = "Nome completo é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.senha) {
      newErrors.senha = "Senha é obrigatória";
    } else if (formData.senha.length < 8) {
      newErrors.senha = "A senha deve ter pelo menos 8 caracteres";
    }

    if (!formData.confirmarSenha) {
      newErrors.confirmarSenha = "Confirme sua senha";
    } else if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Remove erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulação de chamada API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aqui você faria a chamada real para a API
      console.log("Dados do cadastro:", formData);
      
      // Redireciona para a página de perfil ou dashboard após cadastro
      navigate("/formulario-perfil");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      setErrors({ submit: "Erro ao realizar cadastro. Tente novamente." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoltar = () => {
    navigate("/");
  };

  return (
    <div className="relative min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <BackgroundPrincipal />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Crie sua conta no SkillMatch
          </h1>
          <p className="text-xl text-white opacity-90">
            Comece sua jornada de requalificação profissional
          </p>
        </div>

        {/* Formulário */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informações Pessoais */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Informações Pessoais
                </h3>
              </div>

              <InputPersonalizado
                label="Nome Completo"
                type="text"
                value={formData.nomeCompleto}
                onChange={(value) => handleInputChange('nomeCompleto', value)}
                placeholder="Digite seu nome completo"
                required
                error={errors.nomeCompleto}
              />

              <InputPersonalizado
                label="E-mail"
                type="email"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                placeholder="seu@email.com"
                required
                error={errors.email}
              />

              <InputPersonalizado
                label="Telefone"
                type="tel"
                value={formData.telefone}
                onChange={(value) => handleInputChange('telefone', value)}
                placeholder="(11) 99999-9999"
              />

              <InputPersonalizado
                label="Data de Nascimento"
                type="date"
                value={formData.dataNascimento}
                onChange={(value) => handleInputChange('dataNascimento', value)}
              />

              <SelectPersonalizado
                label="Gênero"
                value={formData.genero}
                onChange={(value) => handleInputChange('genero', value)}
                options={generos}
              />

              {/* Informações Profissionais */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Informações Profissionais
                </h3>
              </div>

              <SelectPersonalizado
                label="Escolaridade"
                value={formData.escolaridade}
                onChange={(value) => handleInputChange('escolaridade', value)}
                options={escolaridades}
              />

              <SelectPersonalizado
                label="Área de Atuação"
                value={formData.areaAtuacao}
                onChange={(value) => handleInputChange('areaAtuacao', value)}
                options={areasAtuacao}
              />

              {/* Segurança */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Segurança
                </h3>
              </div>

              <InputPersonalizado
                label="Senha"
                type="password"
                value={formData.senha}
                onChange={(value) => handleInputChange('senha', value)}
                placeholder="Mínimo 8 caracteres"
                required
                error={errors.senha}
              />

              <InputPersonalizado
                label="Confirmar Senha"
                type="password"
                value={formData.confirmarSenha}
                onChange={(value) => handleInputChange('confirmarSenha', value)}
                placeholder="Digite novamente sua senha"
                required
                error={errors.confirmarSenha}
              />
            </div>

            {/* Força da senha */}
            <PasswordStrength password={formData.senha} />

            {/* Erro geral */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <BotaoPersonalizado
                texto={isLoading ? "Cadastrando..." : "Criar minha conta"}
                onClick={() => {}} // Submit é feito pelo form
                className="flex-1"
              />
              
              <button
                type="button"
                onClick={handleVoltar}
                className="px-8 py-3 text-lg font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Voltar
              </button>
            </div>

            {/* Link para login */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Já tem uma conta?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-indigo-600 hover:text-indigo-500 font-semibold cursor-pointer"
                >
                  Fazer login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}