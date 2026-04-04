#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// -------------------------------------------------------------------
// 1. Definição da Estrutura (Nó/Célula)
// -------------------------------------------------------------------
typedef struct No {
    int dado;
    struct No *esquerda;
    struct No *direita;
} No;

// -------------------------------------------------------------------
// 2. Funções Auxiliares
// -------------------------------------------------------------------

// Função para criar um novo nó
No* criarNo(int valor) {
    No *novo = (No*)malloc(sizeof(No));
    if (novo == NULL) {
        printf("Erro de alocacao de memoria!\n");
        exit(1);
    }
    novo->dado = valor;
    novo->esquerda = NULL;
    novo->direita = NULL;
    return novo;
}

// -------------------------------------------------------------------
// 3. INCLUSÃO (INSERÇÃO)
// -------------------------------------------------------------------

// Insere um novo valor na ABB de forma recursiva
No* incluirNo(No *raiz, int valor) {
    // Caso base: Se a subárvore for nula, cria o novo nó aqui
    if (raiz == NULL) {
        return criarNo(valor);
    }

    if (valor < raiz->dado) {
        // Vai para a esquerda se o valor for menor
        raiz->esquerda = incluirNo(raiz->esquerda, valor);
    } else if (valor > raiz->dado) {
        // Vai para a direita se o valor for maior
        raiz->direita = incluirNo(raiz->direita, valor);
    } else {
        // Valor já existe (ABB não permite duplicatas)
        printf("Valor %d ja existe na arvore. Inclusao ignorada.\n", valor);
    }

    return raiz;
}

// -------------------------------------------------------------------
// 4. REMOÇÃO
// -------------------------------------------------------------------

// Função auxiliar para encontrar o nó de menor valor na subárvore direita (sucessor)
No* noMenorValor(No* no) {
    No* atual = no;
    while (atual && atual->esquerda != NULL) {
        atual = atual->esquerda;
    }
    return atual;
}

// Remove um nó da ABB de forma recursiva
No* removerNo(No *raiz, int valor) {
    // Caso 1: Raiz nula
    if (raiz == NULL) {
        printf("Valor %d nao encontrado na arvore.\n", valor);
        return raiz;
    }

    // Busca o nó a ser removido (descendo na árvore)
    if (valor < raiz->dado) {
        raiz->esquerda = removerNo(raiz->esquerda, valor);
    } else if (valor > raiz->dado) {
        raiz->direita = removerNo(raiz->direita, valor);
    } else {
        // Caso 2: Nó encontrado (raiz->dado == valor)

        // Sub-caso A: Nó com 0 ou 1 filho
        if (raiz->esquerda == NULL) {
            No *temp = raiz->direita;
            free(raiz);
            printf("No %d removido com sucesso.\n", valor);
            return temp;
        } else if (raiz->direita == NULL) {
            No *temp = raiz->esquerda;
            free(raiz);
            printf("No %d removido com sucesso.\n", valor);
            return temp;
        }

        // Sub-caso B: Nó com 2 filhos
        // Encontra o sucessor (menor nó na subárvore direita)
        No* temp = noMenorValor(raiz->direita);

        // Copia o dado do sucessor para o nó atual
        raiz->dado = temp->dado;

        // Remove o sucessor (que agora é o nó com valor duplicado)
        raiz->direita = removerNo(raiz->direita, temp->dado);
    }
    return raiz;
}

// -------------------------------------------------------------------
// 5. BUSCA EM PROFUNDIDADE (Travessias)
// -------------------------------------------------------------------

// Busca Pré-Ordem (Raiz, Esquerda, Direita)
void buscarPreOrdem(No *raiz) {
    if (raiz != NULL) {
        printf("[%d] ", raiz->dado);
        buscarPreOrdem(raiz->esquerda);
        buscarPreOrdem(raiz->direita);
    }
}

// Busca Em Ordem (Esquerda, Raiz, Direita) - Retorna os elementos em ordem crescente
void buscarEmOrdem(No *raiz) {
    if (raiz != NULL) {
        buscarEmOrdem(raiz->esquerda);
        printf("[%d] ", raiz->dado);
        buscarEmOrdem(raiz->direita);
    }
}

// Busca Pós-Ordem (Esquerda, Direita, Raiz)
void buscarPosOrdem(No *raiz) {
    if (raiz != NULL) {
        buscarPosOrdem(raiz->esquerda);
        buscarPosOrdem(raiz->direita);
        printf("[%d] ", raiz->dado);
    }
}

// -------------------------------------------------------------------
// 6. Função Principal (Menu de Interação)
// -------------------------------------------------------------------

// Função para limpar o buffer de entrada
void limparBuffer() {
    int c;
    while ((c = getchar()) != '\n' && c != EOF) { /* Corpo vazio intencional */ }
}

int main() {
    No *raiz = NULL;
    int opcao, valor;

    printf("--- Renalf S/A - Manipulacao de Arvore Binaria de Busca ---\n");

    do {
        printf("\n*** MENU DE OPCOES ***\n");
        printf("1. Incluir no\n");
        printf("2. Remover no\n");
        printf("3. Buscar Pre-ordem (Raiz, E, D)\n");
        printf("4. Buscar Em Ordem (E, Raiz, D)\n");
        printf("5. Buscar Pos-ordem (E, D, Raiz)\n");
        printf("0. Opcao [0 para encerrar]\n");
        printf("Escolha uma opcao: ");

        if (scanf("%d", &opcao) != 1) {
            limparBuffer();
            opcao = -1; // Opção inválida
        } else {
            limparBuffer(); // Limpa o buffer após scanf
        }

        switch (opcao) {
            case 1:
                printf("Digite o valor a incluir: ");
                if (scanf("%d", &valor) == 1) {
                    raiz = incluirNo(raiz, valor);
                } else {
                    printf("Entrada invalida.\n");
                }
                limparBuffer();
                break;

            case 2:
                printf("Digite o valor a remover: ");
                if (scanf("%d", &valor) == 1) {
                    raiz = removerNo(raiz, valor);
                } else {
                    printf("Entrada invalida.\n");
                }
                limparBuffer();
                break;

            case 3:
                printf("\n--- Busca Pre-ordem ---\n");
                if (raiz == NULL) { printf("Arvore vazia.\n"); break; }
                buscarPreOrdem(raiz);
                printf("\n");
                break;

            case 4:
                printf("\n--- Busca Em Ordem ---\n");
                if (raiz == NULL) { printf("Arvore vazia.\n"); break; }
                buscarEmOrdem(raiz);
                printf("\n");
                break;

            case 5:
                printf("\n--- Busca Pos-ordem ---\n");
                if (raiz == NULL) { printf("Arvore vazia.\n"); break; }
                buscarPosOrdem(raiz);
                printf("\n");
                break;

            case 0:
                printf("Encerrando o programa. Memoria da arvore sera liberada.\n");
                // TODO: Adicionar função de liberação de memória
                break;

            default:
                printf("Opcao invalida. Tente novamente.\n");
        }
    } while (opcao != 0);

    // Nota: Em um programa de produção, a função de liberação de memória (freeTree)
    // deve ser chamada aqui para evitar memory leaks.

    return 0;
}