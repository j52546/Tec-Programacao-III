package br.edu.univas.tp4.si4.aula01;

import java.io.IOException;
import java.util.jar.JarInputStream;

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
		frame.setSize(800, 600);
		frame.setVisible(true);
		
		button.setText("teste");
		button.setSize(100,100);
		button.setVisible(true);
		
		frame.getContentPane().add(button, panel);
		//panel.add(button);
		//frame.add(panel);
		
		
		
	}
}
