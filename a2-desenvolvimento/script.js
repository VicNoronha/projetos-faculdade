document.addEventListener('DOMContentLoaded', () => {
    // --- Funções de Navegação entre Seções ---
    const sections = document.querySelectorAll('main section');

    window.showSection = (id) => {
        sections.forEach(section => {
            if (section.id === id) {
                section.classList.remove('hidden');
                section.classList.add('active');
            } else {
                section.classList.add('hidden');
                section.classList.remove('active');
            }
        });
    };

    // --- Funções de Validação de Campos ---

    // Função genérica para exibir mensagem de erro
    const displayError = (elementId, message) => {
        const errorElement = document.getElementById(`error-${elementId}`);
        if (errorElement) {
            errorElement.textContent = message;
        }
    };

    // Função genérica para limpar mensagem de erro
    const clearError = (elementId) => {
        const errorElement = document.getElementById(`error-${elementId}`);
        if (errorElement) {
            errorElement.textContent = '';
        }
    };

    // Validação de campo obrigatório
    const validateRequired = (inputElement) => {
        if (inputElement.value.trim() === '') {
            displayError(inputElement.id, 'Este campo é obrigatório.');
            return false;
        }
        clearError(inputElement.id);
        return true;
    };

    // Validação de CPF (formato simples)
    const validateCpf = (inputElement) => {
        const value = inputElement.value.trim();
        if (!validateRequired(inputElement)) return false;

        // Remove tudo que não for dígito e verifica se tem 11 dígitos
        if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value) && !/^\d{11}$/.test(value)) {
            displayError(inputElement.id, 'CPF inválido. Use 11 dígitos ou formato XXX.XXX.XXX-XX.');
            return false;
        }
        clearError(inputElement.id);
        return true;
    };

    // Validação de Telefone (formato simples)
    const validatePhone = (inputElement) => {
        const value = inputElement.value.trim();
        if (!validateRequired(inputElement)) return false;

        // Aceita (XX) XXXXX-XXXX, (XX) XXXX-XXXX, ou apenas dígitos
        if (!/^(\(\d{2}\)\s?)?\d{4,5}-?\d{4}$/.test(value) && !/^\d{8,11}$/.test(value)) {
            displayError(inputElement.id, 'Telefone inválido. Use (XX) XXXXX-XXXX ou apenas dígitos.');
            return false;
        }
        clearError(inputElement.id);
        return true;
    };

    // Validação de E-mail
    const validateEmail = (inputElement) => {
        const value = inputElement.value.trim();
        if (!validateRequired(inputElement)) return false;

        if (!/\S+@\S+\.\S+/.test(value)) {
            displayError(inputElement.id, 'E-mail inválido.');
            return false;
        }
        clearError(inputElement.id);
        return true;
    };

    // Validação de Senha (mínimo 6 caracteres)
    const validatePassword = (inputElement) => {
        const value = inputElement.value;
        if (!validateRequired(inputElement)) return false;

        if (value.length < 6) {
            displayError(inputElement.id, 'A senha deve ter no mínimo 6 caracteres.');
            return false;
        }
        clearError(inputElement.id);
        return true;
    };

    // Validação de URL (para foto do produto)
    const validateUrl = (inputElement) => {
        const value = inputElement.value.trim();
        if (value === '') { // Não obrigatório, mas se preenchido, deve ser válido
            clearError(inputElement.id);
            return true;
        }
        try {
            new URL(value); // Tenta criar um objeto URL, se falhar, não é uma URL válida
            clearError(inputElement.id);
            return true;
        } catch (e) {
            displayError(inputElement.id, 'URL inválida.');
            return false;
        }
    };

    // Validação de Número Positivo (preço, prazo de entrega)
    const validatePositiveNumber = (inputElement) => {
        const value = parseFloat(inputElement.value);
        if (!validateRequired(inputElement)) return false;

        if (isNaN(value) || value <= 0) {
            displayError(inputElement.id, 'Deve ser um número positivo.');
            return false;
        }
        clearError(inputElement.id);
        return true;
    };

    // --- Gerenciamento de Feedback do Formulário ---
    const showFormFeedback = (formId, message, isSuccess) => {
        const form = document.getElementById(formId);
        let feedbackDiv = form.querySelector('.form-feedback');
        if (!feedbackDiv) {
            feedbackDiv = document.createElement('div');
            feedbackDiv.classList.add('form-feedback');
            form.insertBefore(feedbackDiv, form.firstChild); // Insere antes do primeiro elemento
        }
        feedbackDiv.textContent = message;
        feedbackDiv.classList.remove('success', 'error');
        feedbackDiv.classList.add(isSuccess ? 'success' : 'error');
        setTimeout(() => feedbackDiv.remove(), 5000); // Remove a mensagem após 5 segundos
    };

    // --- Gerenciamento de Formulários ---

    // Formulário de Consumidor
    const formConsumidor = document.getElementById('form-consumidor');
    if (formConsumidor) {
        formConsumidor.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o envio padrão do formulário
            let isValid = true;

            isValid = validateRequired(document.getElementById('nomeConsumidor')) && isValid;
            isValid = validateCpf(document.getElementById('cpfConsumidor')) && isValid;
            isValid = validateRequired(document.getElementById('enderecoConsumidor')) && isValid;
            isValid = validatePhone(document.getElementById('telefoneConsumidor')) && isValid;
            isValid = validateEmail(document.getElementById('emailConsumidor')) && isValid;
            isValid = validatePassword(document.getElementById('senhaConsumidor')) && isValid;

            if (isValid) {
                const dados = {
                    nome: document.getElementById('nomeConsumidor').value,
                    cpf: document.getElementById('cpfConsumidor').value,
                    endereco: document.getElementById('enderecoConsumidor').value,
                    telefone: document.getElementById('telefoneConsumidor').value,
                    email: document.getElementById('emailConsumidor').value,
                    senha: document.getElementById('senhaConsumidor').value
                };
                console.log('Dados do Consumidor Válidos:', dados);
                alert('Consumidor cadastrado com sucesso! (Dados enviados para o console)');
                formConsumidor.reset(); // Limpa o formulário
                showFormFeedback('form-consumidor', 'Consumidor cadastrado com sucesso!', true);
            } else {
                showFormFeedback('form-consumidor', 'Por favor, corrija os erros no formulário.', false);
            }
        });
    }

    // Formulário de Vendedor
    const formVendedor = document.getElementById('form-vendedor');
    if (formVendedor) {
        formVendedor.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            isValid = validateRequired(document.getElementById('nomeVendedor')) && isValid;
            isValid = validateCpf(document.getElementById('cpfVendedor')) && isValid;
            isValid = validateRequired(document.getElementById('enderecoVendedor')) && isValid;
            isValid = validatePhone(document.getElementById('telefoneVendedor')) && isValid;
            isValid = validateEmail(document.getElementById('emailVendedor')) && isValid;
            isValid = validatePassword(document.getElementById('senhaVendedor')) && isValid;
            isValid = validateRequired(document.getElementById('bancoVendedor')) && isValid;
            isValid = validateRequired(document.getElementById('agenciaVendedor')) && isValid;
            isValid = validateRequired(document.getElementById('contaVendedor')) && isValid;

            if (isValid) {
                const dados = {
                    nome: document.getElementById('nomeVendedor').value,
                    cpf: document.getElementById('cpfVendedor').value,
                    endereco: document.getElementById('enderecoVendedor').value,
                    telefone: document.getElementById('telefoneVendedor').value,
                    email: document.getElementById('emailVendedor').value,
                    senha: document.getElementById('senhaVendedor').value,
                    banco: document.getElementById('bancoVendedor').value,
                    agencia: document.getElementById('agenciaVendedor').value,
                    conta: document.getElementById('contaVendedor').value
                };
                console.log('Dados do Vendedor Válidos:', dados);
                alert('Vendedor cadastrado com sucesso! (Dados enviados para o console)');
                formVendedor.reset();
                showFormFeedback('form-vendedor', 'Vendedor cadastrado com sucesso!', true);
            } else {
                showFormFeedback('form-vendedor', 'Por favor, corrija os erros no formulário.', false);
            }
        });
    }

    // --- Gerenciamento de Produtos ---
    const listaProdutosDiv = document.getElementById('lista-produtos');
    const formProduto = document.getElementById('form-produto');
    const produtoIdInput = document.getElementById('produtoId');
    const fotoProdutoInput = document.getElementById('fotoProduto');
    const previewFotoProduto = document.getElementById('previewFotoProduto');
    const nomeProdutoInput = document.getElementById('nomeProduto');
    const descricaoProdutoInput = document.getElementById('descricaoProduto');
    const precoProdutoInput = document.getElementById('precoProduto');
    const prazoEntregaInput = document.getElementById('prazoEntrega');
    const disponivelVendaInput = document.getElementById('disponivelVenda');
    const btnSalvarProduto = document.getElementById('btn-salvar-produto');
    const btnLimparProduto = document.getElementById('btn-limpar-produto');

    let produtosFicticios = JSON.parse(localStorage.getItem('produtosFicticios')) || [
        { id: 'prod1', foto: 'https://via.placeholder.com/100x100?text=Produto+1', nome: 'Smartphone XYZ', descricao: 'Smartphone Android com câmera 48MP e bateria de longa duração.', preco: 1200.50, prazo: 5, disponivel: true },
        { id: 'prod2', foto: 'https://via.placeholder.com/100x100?text=Produto+2', nome: 'Fone Bluetooth ABC', descricao: 'Fone de ouvido sem fio com cancelamento de ruído.', preco: 350.00, prazo: 2, disponivel: false },
        { id: 'prod3', foto: 'https://via.placeholder.com/100x100?text=Produto+3', nome: 'Livro "A Arte da Programação"', descricao: 'Um clássico para programadores de todos os níveis.', preco: 85.90, prazo: 7, disponivel: true }
    ];

    const renderProdutos = () => {
        listaProdutosDiv.innerHTML = ''; // Limpa a lista antes de renderizar
        if (produtosFicticios.length === 0) {
            listaProdutosDiv.innerHTML = '<p>Nenhum produto cadastrado ainda.</p>';
            return;
        }

        produtosFicticios.forEach(produto => {
            const produtoItem = document.createElement('div');
            produtoItem.classList.add('produto-item');
            
            const disponibilidadeClass = produto.disponivel ? '' : 'indisponivel';
            const disponibilidadeText = produto.disponivel ? 'Disponível' : 'Indisponível';
            const toggleButtonText = produto.disponivel ? 'Desativar Venda' : 'Ativar Venda';

            produtoItem.innerHTML = `
                <img src="${produto.foto}" alt="${produto.nome}">
                <div class="info">
                    <h4>${produto.nome} (${produto.id})</h4>
                    <p>${produto.descricao}</p>
                    <p>Preço: R$ ${produto.preco.toFixed(2)} | Prazo: ${produto.prazo} dias</p>
                    <p>Status: <span class="${disponibilidadeClass}">${disponibilidadeText}</span></p>
                </div>
                <button class="edit-btn" data-id="${produto.id}">Alterar</button>
                <button class="delete-btn" data-id="${produto.id}">Excluir</button>
                <button class="disponibilidade-btn ${disponibilidadeClass}" data-id="${produto.id}">${toggleButtonText}</button>
            `;
            listaProdutosDiv.appendChild(produtoItem);
        });

        // Adicionar event listeners aos botões de alteração/exclusão/disponibilidade
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const idToEdit = e.target.dataset.id;
                const produtoToEdit = produtosFicticios.find(p => p.id === idToEdit);
                if (produtoToEdit) {
                    produtoIdInput.value = produtoToEdit.id;
                    fotoProdutoInput.value = produtoToEdit.foto;
                    previewFotoProduto.src = produtoToEdit.foto;
                    previewFotoProduto.style.display = 'block';
                    nomeProdutoInput.value = produtoToEdit.nome;
                    descricaoProdutoInput.value = produtoToEdit.descricao;
                    precoProdutoInput.value = produtoToEdit.preco;
                    prazoEntregaInput.value = produtoToEdit.prazo;
                    disponivelVendaInput.checked = produtoToEdit.disponivel;
                    btnSalvarProduto.textContent = 'Atualizar Produto';
                    window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo do formulário
                }
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const idToDelete = e.target.dataset.id;
                if (confirm(`Tem certeza que deseja excluir o produto ${idToDelete}?`)) {
                    produtosFicticios = produtosFicticios.filter(p => p.id !== idToDelete);
                    localStorage.setItem('produtosFicticios', JSON.stringify(produtosFicticios)); // Salva no LocalStorage
                    renderProdutos();
                    showFormFeedback('form-produto', `Produto ${idToDelete} excluído com sucesso!`, true);
                }
            });
        });

        document.querySelectorAll('.disponibilidade-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const idToToggle = e.target.dataset.id;
                const produtoIndex = produtosFicticios.findIndex(p => p.id === idToToggle);
                if (produtoIndex !== -1) {
                    produtosFicticios[produtoIndex].disponivel = !produtosFicticios[produtoIndex].disponivel;
                    localStorage.setItem('produtosFicticios', JSON.stringify(produtosFicticios)); // Salva no LocalStorage
                    renderProdutos();
                    showFormFeedback('form-produto', `Status de disponibilidade do produto ${idToToggle} alterado!`, true);
                }
            });
        });
    };

    // Preencher preview da imagem ao digitar URL
    fotoProdutoInput.addEventListener('input', () => {
        if (fotoProdutoInput.value.trim() !== '') {
            previewFotoProduto.src = fotoProdutoInput.value.trim();
            previewFotoProduto.style.display = 'block';
        } else {
            previewFotoProduto.src = '';
            previewFotoProduto.style.display = 'none';
        }
    });

    // Submissão do Formulário de Produto
    if (formProduto) {
        formProduto.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Validações dos campos
            isValid = validateUrl(fotoProdutoInput) && isValid;
            isValid = validateRequired(nomeProdutoInput) && isValid;
            isValid = validateRequired(descricaoProdutoInput) && isValid;
            isValid = validatePositiveNumber(precoProdutoInput) && isValid;
            isValid = validatePositiveNumber(prazoEntregaInput) && isValid;

            if (isValid) {
                const currentId = produtoIdInput.value;
                const isEditing = currentId !== '';

                const novoProduto = {
                    id: isEditing ? currentId : 'prod' + Date.now(), // Gera um ID único para novos produtos
                    foto: fotoProdutoInput.value.trim(),
                    nome: nomeProdutoInput.value.trim(),
                    descricao: descricaoProdutoInput.value.trim(),
                    preco: parseFloat(precoProdutoInput.value),
                    prazo: parseInt(prazoEntregaInput.value),
                    disponivel: disponivelVendaInput.checked
                };

                if (isEditing) {
                    // Atualizar produto existente
                    const index = produtosFicticios.findIndex(p => p.id === currentId);
                    if (index !== -1) {
                        produtosFicticios[index] = novoProduto;
                        showFormFeedback('form-produto', 'Produto atualizado com sucesso!', true);
                    }
                } else {
                    // Adicionar novo produto
                    produtosFicticios.push(novoProduto);
                    showFormFeedback('form-produto', 'Produto cadastrado com sucesso!', true);
                }

                localStorage.setItem('produtosFicticios', JSON.stringify(produtosFicticios)); // Salva no LocalStorage
                formProduto.reset(); // Limpa o formulário após salvar
                produtoIdInput.value = ''; // Limpa o ID após salvar
                previewFotoProduto.src = ''; // Limpa preview
                previewFotoProduto.style.display = 'none';
                btnSalvarProduto.textContent = 'Salvar Produto'; // Volta o texto do botão
                renderProdutos(); // Renderiza a lista atualizada
            } else {
                showFormFeedback('form-produto', 'Por favor, corrija os erros no formulário de produto.', false);
            }
        });
    }

    // Limpar Formulário de Produto
    if (btnLimparProduto) {
        btnLimparProduto.addEventListener('click', () => {
            formProduto.reset();
            produtoIdInput.value = '';
            previewFotoProduto.src = '';
            previewFotoProduto.style.display = 'none';
            btnSalvarProduto.textContent = 'Salvar Produto';
            // Limpa todas as mensagens de erro do formulário de produto
            formProduto.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        });
    }

    // --- Inicialização ---
    showSection('cadastro-consumidor'); // Mostra a seção de consumidor ao carregar
    renderProdutos(); // Renderiza os produtos fictícios ao carregar
});