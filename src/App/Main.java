package App;

import model.Aviao;
import model.Navio;
import model.Transporte;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        Transporte[] lista = new Transporte[20];


        for (int i = 0; i < 10; i++) {
            lista[i] = new Aviao();
            ((Aviao) lista[i]).entrada(sc);
        }


        for (int i = 10; i < 20; i++) {
            lista[i] = new Navio();
            ((Navio) lista[i]).entrada(sc);
        }


        for (Transporte t : lista) {
            if (t instanceof Aviao) {
                ((Aviao) t).imprimir();
            } else if (t instanceof Navio) {
                ((Navio) t).imprimir();
            }
            System.out.println("-------------------");
        }

        sc.close();
    }
}
