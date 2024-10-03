# Instruções para Instalar Docker, Criar `.env` e Rodar Docker Compose

## Passo 1: Baixar e instalar o Docker

1. **Acesse o site oficial do Docker**:
   - Vá para [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/).

2. **Baixar Docker Desktop**:
   - Escolha a versão correta para o seu sistema operacional (Windows, macOS ou Linux).
   
3. **Instalar o Docker Desktop**:
   - Execute o instalador baixado e siga as instruções para completar a instalação.

4. **Verificar instalação**:
   - Após a instalação, abra o terminal e execute o comando abaixo para verificar se o Docker foi instalado corretamente:
     ```bash
     docker --version
     ```
   - Isso deve retornar a versão do Docker instalada.

## Passo 2: Criar um arquivo `.env`

1. **Crie um arquivo `.env` na raiz do seu projeto**:
   - No diretório do seu projeto, crie um arquivo chamado `.env`. Esse arquivo será usado para armazenar variáveis de ambiente.
   
2. **Adicionar variáveis de ambiente no `.env`**:
   - Abra o arquivo `.env` em um editor de texto e adicione as variáveis de ambiente necessárias para o seu projeto. Um exemplo de arquivo `.env` pode ser:
     ```bash
      TZ=UTC
      PORT=3000
      DATABASE_HOST=tech_interview_database
      DATABASE_USER=root
      DATABASE_PASSWORD=root
      DATABASE_PORT=3306
      DATABASE_NAME=vehicle_notification
     ```

## Passo 3: Rodar o Docker Compose com o arquivo `.env`

1. **Rodar o comando no terminal**:
   - No diretório onde está o arquivo `docker-compose.yml` e o arquivo `.env`, execute o seguinte comando para iniciar os serviços com o Docker Compose, utilizando as variáveis de ambiente do `.env`:
     ```bash
     docker compose --env-file .env up --build
     ```
   - O parâmetro `--env-file .env` especifica que o Docker Compose deve carregar as variáveis de ambiente do arquivo `.env`.
   - O parâmetro `--build` força a reconstrução dos serviços especificados no `docker-compose.yml`.

2. **Acompanhar a execução**:
   - O comando irá construir as imagens Docker e iniciar os containers definidos no arquivo `docker-compose.yml`. Você poderá ver os logs dos serviços sendo executados no terminal.
   
## Passo 4: Parar os serviços (opcional)

1. Para parar e remover os containers quando quiser interromper a execução, use o comando:
   ```bash
   docker compose down
