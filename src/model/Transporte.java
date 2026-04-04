package model;

public class Transporte {
    protected int capacidadeTanque;
    protected int numeroPassageiros;
    protected double preco;


    public Transporte() {}


    public Transporte(int capacidadeTanque, int numeroPassageiros, double preco) {
        this.capacidadeTanque = capacidadeTanque;
        this.numeroPassageiros = numeroPassageiros;
        this.preco = preco;
    }


    public int getCapacidadeTanque() { return capacidadeTanque; }
    public void setCapacidadeTanque(int capacidadeTanque) { this.capacidadeTanque = capacidadeTanque; }

    public int getNumeroPassageiros() { return numeroPassageiros; }
    public void setNumeroPassageiros(int numeroPassageiros) { this.numeroPassageiros = numeroPassageiros; }

    public double getPreco() { return preco; }
    public void setPreco(double preco) { this.preco = preco; }
}
