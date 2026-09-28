# Piona Consórcios — Landing Page

Landing page consultiva da Piona Consórcios. HTML, CSS e JavaScript puros, sem dependências nem etapa de build.

## Estrutura

```
index.html                  Página
css/style.css               Estilos (tokens de cor, tipografia, layout responsivo, animações)
js/main.js                  Menu mobile, navegação ativa, animações de rolagem, máscara e validação do formulário
assets/img/favicon.png      Favicon (símbolo da marca)
assets/img/logo-simbolo.png Símbolo da logo (fundo transparente)
assets/img/logo-nome.png    Nome "piona Consórcios" (fundo transparente)
assets/img/hero-familia.jpg Foto de fundo do topo (expandida para telas largas)
.nojekyll                   Faz o GitHub Pages servir os arquivos como estão
```

Fontes: Montserrat e Inter, carregadas do Google Fonts.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie o conteúdo desta pasta para a raiz dele (o `index.html` precisa ficar na raiz).
2. No repositório, vá em **Settings → Pages**.
3. Em **Source**, escolha **Deploy from a branch**, selecione a branch `main` e a pasta `/ (root)` e salve.
4. Em alguns minutos a página fica disponível em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Para usar um domínio próprio, informe o domínio em **Settings → Pages → Custom domain**.

## Formulário

O formulário valida os campos e mostra a confirmação, mas **ainda não envia os dados para lugar nenhum**. Para receber os leads, conecte o envio no `js/main.js`, no ponto marcado com o comentário `// Integração:` (CRM, webhook, Formspree, RD Station etc.). Os campos enviados são: nome, whatsapp, email, objetivo e valor.

## Pendências

- Incluir no rodapé os dados de contato do cliente (WhatsApp, e-mail, CNPJ, redes sociais).
- Conferir o direito de uso da foto do topo.
