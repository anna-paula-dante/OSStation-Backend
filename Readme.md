# 🚀 OS-Station - Processador de Pedidos

Uma API REST robusta, desenvolvida com Node.js e Express, para processar, normalizar e persistir dados de pedidos a partir de arquivos de texto. A aplicação é projetada para ser cumulativa, atualizando e adicionando novos registros de forma inteligente a cada novo upload.

## 🛠️ Tecnologias e Arquitetura

Stack Principal: Node.js, Express.js.

ORM e Banco de Dados: Prisma como ORM para uma interação segura e tipada com o banco de dados. O banco utilizado é SQLite, garantindo portabilidade e simplicidade sem a necessidade de serviços externos.

Arquitetura: O projeto segue uma arquitetura em camadas (Controllers, Services) que isola as responsabilidades. A camada de acesso a dados é elegantemente gerenciada pelo Prisma Client, que substitui a necessidade de um repositório manual.

Testes: Suíte de testes com Jest para testes unitários e Supertest para testes de integração de ponta a ponta da API.

## ✨ Features Principais

Upload de Arquivos: Endpoint para processamento de arquivos de texto (.txt) com layout de largura fixa.

Normalização e Persistência: Transforma dados desnormalizados em uma estrutura relacional limpa no banco de dados.

Lógica Cumulativa (Upsert): Em vez de substituir, a API inteligentemente insere ou atualiza (upsert) usuários, pedidos e produtos, permitindo o processamento de múltiplos arquivos ao longo do tempo.

Identificadores de Negócio: Utiliza o nome do usuário como identificador único, permitindo que os IDs originais ou repetido do arquivo original variem.

Consulta com Filtros: Endpoint de consulta flexível para buscar pedidos por ID (do arquivo), e intervalo de datas.

Ambiente Testado: Cobertura de testes unitários e de integração para garantir a confiabilidade da lógica de negócio.

## ⚙️ Como Executar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/anna-paula-dante/OSStation-Backend
cd OSStation-Backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as Variáveis de Ambiente:
   Crie um novo arquivo chamado .env na raiz do projeto com o seguinte conteúdo:

````Snippet de código
# Define o caminho para o arquivo do banco de dados SQLite que o Prisma irá gerenciar.

DATABASE_URL="file:./prisma/dev.db"
````

4. Aplique as Migrações do Banco de Dados:
   Este comando irá ler o schema.prisma, criar o banco de dados SQLite e montar todas as tabelas necessárias.

```Bash
npx prisma migrate dev
````

5. Inicie o servidor de desenvolvimento:

```Bash
npm run dev
```

O servidor estará rodando em http://localhost:3001 (ou a porta que você configurar).

## 🧪 Como Rodar os Testes

Para executar todos os testes unitários e de integração:

```Bash
npm test
```
