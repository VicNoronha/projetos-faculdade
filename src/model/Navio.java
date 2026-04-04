package model;

import java.util.Scanner;

public class Navio extends Transporte {
    private String nome;
    private int numeroTripulantes;
    private String dataLancamento;


    public Navio() {}

    public Navio(String nome) {
        this.nome = nome;
    }

    public Navio(String nome, int numeroTripulantes) {
        this.nome = nome;
        this.numeroTripulantes = numeroTripulantes;
    }

    public Navio(String nome, int numeroTripulantes, String dataLancamento) {
        this.nome = nome;
        this.numeroTripulantes = numeroTripulantes;
        this.dataLancamento = dataLancamento;
    }

    public Navio(String nome, int numeroTripulantes, String dataLancamento,
                 int capacidadeTanque, int numeroPassageiros, double preco) {
        super(capacidadeTanque, numeroPassageiros, preco);
        this.nome = nome;
        this.numeroTripulantes = numeroTripulantes;
        this.dataLancamento = dataLancamento;
    }

    public void entrada(Scanner sc) {
        try {
            System.out.print("Nome: ");
            nome = sc.nextLine();

            System.out.print("Data Lançamento: ");
            dataLancamento = sc.nextLine();

            System.out.print("Tripulantes: ");
            numeroTripulantes = sc.nextInt();

            System.out.print("Capacidade Tanque: ");
            capacidadeTanque = sc.nextInt();

            System.out.print("Passageiros: ");
            numeroPassageiros = sc.nextInt();

            System.out.print("Preço: ");
            preco = sc.nextDouble();

            sc.nextLine();

        } catch (Exception e) {
            System.out.println("Erro!");
            sc.nextLine();
        }
    }

    public void imprimir() {
        System.out.println("NAVIO");
        System.out.println("Nome: " + nome);
        System.out.println("Tripulantes: " + numeroTripulantes);
        System.out.println("Data Lançamento: " + dataLancamento);
        System.out.println("Capacidade Tanque: " + capacidadeTanque);
        System.out.println("Passageiros: " + numeroPassageiros);
        System.out.println("Preço: " + preco);
    }

    public double passageirosPorTripulantes() {
        if (numeroTripulantes == 0) return 0;
        return (double) numeroPassageiros / numeroTripulantes;
    }
}