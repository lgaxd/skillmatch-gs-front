# SkillMatch – Plataforma de Requalificação Profissional com IA

## Objetivo
Auxiliar pessoas em processo de requalificação e recolocação profissional por meio de inteligência artificial, trilhas de aprendizado personalizadas e gamificação.

## Visão Geral
O SkillMatch é uma plataforma desenvolvida como parte da Global Solution FIAP 2025/2, com o propósito de apoiar trabalhadores que desejam migrar de carreira ou fortalecer suas competências em áreas emergentes do mercado.

A solução utiliza técnicas de Machine Learning (KNN) para recomendar carreiras com base no perfil profissional do usuário e oferece uma jornada estruturada de aprendizado composta por skills, cursos, e um sistema de progressão baseada em pontos (XP).

O projeto busca democratizar o acesso à orientação profissional, conectando tecnologia, educação e impacto social.

## ✨ Principais Funcionalidades

### 1. Mapeamento de Perfil Profissional
- Questionário abrangendo:
  - Experiência prévia
  - Estilo de trabalho
  - Interesses e competências
- Processamento via API de Machine Learning (atualmente mockado com API Java)
- Cálculo de coordenadas representativas do perfil
- Modelo KNN para identificação de carreiras semelhantes

### 2. Recomendação Inteligente de Carreiras
- Top 5 carreiras mais alinhadas ao perfil
- Informações por carreira:
  - Área de atuação
  - Nível de demanda no mercado
  - Descrição detalhada
- Seleção da carreira para início da jornada

### 3. Jornada de Skills
- Conjunto estruturado de habilidades essenciais por carreira
- 2 cursos confiáveis curados por skill
- Funcionalidades:
  - Marcação de cursos concluídos
  - Evolução no progresso da carreira
  - Dashboard de acompanhamento em tempo real

### 4. Gamificação e Ranking
- Sistema de pontos (XP) por avanço nas skills
- Mecânicas de engajamento:
  - Progresso percentual da jornada
  - Conquista de medalhas
  - Ranking mensal de usuários

### 5. Aderência a ODS (Objetivos de Desenvolvimento Sustentável)
- **ODS 4**: Educação de qualidade
- **ODS 8**: Trabalho decente e crescimento econômico
- **ODS 9**: Inovação e infraestrutura
- **ODS 10**: Redução das desigualdades

## 🏗️ Arquitetura da Solução

### Front-end
- React + Vite + TypeScript
- Tailwind CSS

### Back-end
- Java (Quarkus)

### Machine Learning
- Python (Flask)
- Algoritmo KNN

### Banco de Dados
- Oracle

### DevOps
- **Versionamento**: GitHub
- **Deploy**: Vercel (front-end), Servidor On-Premises (back-end), Oracle Cloud (banco de dados)

## 🎯 Público-Alvo
- Profissionais buscando requalificação
- Jovens em transição de carreira
- Pessoas impactadas pela automação ou mudanças no mercado
- Instituições que desejam oferecer trilhas personalizadas de desenvolvimento

## 👥 Equipe
Projeto desenvolvido por alunos da FIAP como parte da Global Solution 2025/2. Contém contribuições multidisciplinares envolvendo:

- Engenharia de Software
- Inteligência Artificial
- DDD (Domain-Driven Design)
- Banco de Dados
- UX/UI
- Computational Thinking