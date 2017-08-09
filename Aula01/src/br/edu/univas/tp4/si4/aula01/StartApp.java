package br.edu.univas.tp4.si4.aula01;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class StartApp {

	public static void main(String[] arg){
		
		JFrame frame = new JFrame();
		JButton button = new JButton();
		JPanel panel = new JPanel();
		
		
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		frame.setTitle("Primeira Aula de Java Swing");
		frame.setSize(300, 300);
		frame.setVisible(true);
		
		button.setText("Clique aqui");
		button.setSize(15,15);
		button.setVisible(true);
		
		panel.add(button);
		frame.add(panel);
		
		
		
	}
}
