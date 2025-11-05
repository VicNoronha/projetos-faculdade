#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Definição do Nó
typedef struct No {
    int dado;
    struct No *proximo;
} No;

// Cria um novo nó
No* criarNo(int valor) {
    No *novo = (No*)malloc(sizeof(No));
    if (novo == NULL) exit(1);
    novo->dado = valor;
    novo->proximo = NULL;
    return novo;
}

// INCLUSÃO 

No* incluir(No *lista, int valor) {
    No *novo = criarNo(valor);
    novo->proximo = lista;
    printf("Valor %d incluido no inicio.\n", valor);
    return novo;
}


// CONSULTA / BUSCA

No* consultar(No *lista, int valor) {
    No *atual = lista;
    while (atual != NULL) {
        if (atual->dado == valor) return atual;
        atual = atual->proximo;
    }
    return NULL;
}


// ALTERAÇÃO

bool alterar(No *lista, int valorAntigo, int novoValor) {
    No *no = consultar(lista, valorAntigo);
    if (no != NULL) {
        no->dado = novoValor;
        return true;
    }
    return false;
}


// REMOÇÃO

No* remover(No *lista, int valor) {
    No *atual = lista;
    No *anterior = NULL;

    // 1. Caso de lista vazia
    if (lista == NULL) {
        printf("Lista vazia.\n");
        return NULL;
    }

    // 2. Procura o elemento
    while (atual != NULL && atual->dado != valor) {
        anterior = atual;
        atual = atual->proximo;
    }

    // 3. Elemento não encontrado
    if (atual == NULL) {
        printf("Valor %d nao encontrado.\n", valor);
        return lista;
    }

    // 4. Elemento encontrado (atual != NULL)
    if (anterior == NULL) {
        // Remoção da cabeça
        lista = atual->proximo;
    } else {
        // Remoção no meio ou fim
        anterior->proximo = atual->proximo;
    }

    free(atual);
    printf("Valor %d removido com sucesso.\n", valor);
    return lista;
}


// LISTAGEM

void listar(No *lista) {
    if (lista == NULL) {
        printf("Lista vazia.\n");
        return;
    }
    No *atual = lista;
    printf("\n[LISTA]: ");
    while (atual != NULL) {
        printf("[%d]", atual->dado);
        if (atual->proximo != NULL) printf(" -> ");
        atual = atual->proximo;
    }
    printf("\n\n");
}


// PRINCIPAL (MAIN)

int main() {
    No *lista = NULL;
    int opcao, v, nv;

    do {
        printf("\n--- Operacoes na Lista Encadeada ---\n");
        printf("1. Incluir (Inicio)\n2. Consultar\n3. Alterar\n4. Remover\n5. Listar\n0. Sair\n> ");
        if (scanf("%d", &opcao) != 1) { 
    while(getchar() != '\n') { /* Limpa o buffer: Corpo vazio intencional */ } 
    opcao = -1;
}

        switch (opcao) {
            case 1:

                printf("Valor para incluir: "); scanf("%d", &v);
                lista = incluir(lista, v);
                break;
            case 2:
                printf("Valor para consultar: "); scanf("%d", &v);
                if (consultar(lista, v) != NULL) printf("Valor %d ENCONTRADO.\n", v);
                else printf("Valor %d NAO encontrado.\n", v);
                break;
            case 3:
                printf("Valor antigo: "); scanf("%d", &v);
                printf("Novo valor: "); scanf("%d", &nv);
                if (alterar(lista, v, nv)) printf("Alteracao realizada.\n");
                else printf("Valor %d nao encontrado. Alteracao falhou.\n", v);
                break;
            case 4:
                printf("Valor para remover: "); scanf("%d", &v);
                lista = remover(lista, v);
                break;
            case 5: listar(lista); break;
            case 0: break;
            default: printf("Opcao invalida.\n");
        }
    } while (opcao != 0);

    // Liberação de memória
    No *temp;
    while (lista != NULL) {
        temp = lista;
        lista = lista->proximo;
        free(temp);
    }
    printf("Memoria liberada. Fim.\n");
    return 0;
}