package model;

import java.util.Scanner;

public class Aviao extends Transporte {
    private String prefixo;
    private String dataRevisao;

    public Aviao() {}

    public Aviao(String prefixo, String dataRevisao, int capacidadeTanque, int numeroPassageiros, double preco) {
        super(capacidadeTanque, numeroPassageiros, preco);
        this.prefixo = prefixo;
        this.dataRevisao = dataRevisao;
    }

    public void entrada(Scanner sc) {
        try {
            System.out.print("Prefixo: ");
            prefixo = sc.nextLine();

            System.out.print("Data Revisão: ");
            dataRevisao = sc.nextLine();

            System.out.print("Capacidade Tanque: ");
            capacidadeTanque = sc.nextInt();

            System.out.print("Número Passageiros: ");
            numeroPassageiros = sc.nextInt();

            System.out.print("Preço: ");
            preco = sc.nextDouble();

            sc.nextLine(); // limpar buffer

        } catch (Exception e) {
            System.out.println("Erro de entrada! Digite novamente.");
            sc.nextLine();
        }
    }

    public void imprimir() {
        System.out.println("AVIÃO");
        System.out.println("Prefixo: " + prefixo);
        System.out.println("Data Revisão: " + dataRevisao);
        System.out.println("Capacidade Tanque: " + capacidadeTanque);
        System.out.println("Passageiros: " + numeroPassageiros);
        System.out.println("Preço: " + preco);
    }

    public void reajustarPreco(double percentual) {
        preco += preco * (percentual / 100);
    }
}